/* 定义命名空间 define the namespace */
var com={};
com.uitis={};
com.uitis.util={}; /* 工具类包 */
com.uitis.pagination={}; /* 翻页类包 */
com.uitis.validation={}; /* 验证类包 */

var _contextPath_="";
(function(){
	var scriptFilePath = "/script/";
	var js=document.getElementsByTagName("script");
	var path=js[js.length-1].src;
	var idx=path.indexOf(scriptFilePath);
	if (idx>0){
		_contextPath_=path.substring(0, idx);
	}
})();

/* START package: com.uitis.util */

com.uitis.util.getBrowser=function() {
    // From: http://blog.csdn.net/fmideal/archive/2007/04/15/1565754.aspx
    var ua = navigator.userAgent.toLowerCase();

    var Browser = new Object();
    Browser.isMozilla = (typeof document.implementation != 'undefined')
      && (typeof document.implementation.createDocument != 'undefined')
      && (typeof HTMLDocument!='undefined');
    Browser.isIE = window.ActiveXObject ? true : false;
    Browser.isFirefox = (ua.indexOf("firefox")!=-1);
    Browser.isSafari = (ua.indexOf("Browser.isSafari")!=-1);
    Browser.isOpera = (typeof window.opera != 'undefined');

    return Browser;
};

com.uitis.util.bindEvent=function(oTarget, sEventType, fnHandler, argsObject) {
  var eventHandler = fnHandler;
  if(argsObject) {
		eventHandler = function(e) {
			fnHandler.call(argsObject, e);
		};
  }

	if (sEventType.indexOf("on")==0) {
		sEventType = sEventType.substring(2);
	}

  if (oTarget.addEventListener) {
    oTarget.addEventListener(sEventType, eventHandler, false);
  } else if (oTarget.attachEvent) {
    oTarget.attachEvent("on" + sEventType, eventHandler);
  } else {
    oTarget["on" + sEventType] = eventHandler;
  }
};

com.uitis.util.unbindEvent=function(oTarget, sEventType, fnHandler) {
  var eventHandler = fnHandler;
	if (sEventType.indexOf("on")==0) {
		sEventType = sEventType.substring(2);
	}
  if (oTarget.removeEventListener) {
    oTarget.removeEventListener(sEventType, eventHandler, false);
  } else if (oTarget.detachEvent) {
    oTarget.detachEvent("on" + sEventType, eventHandler);
  } else {
  	var noExe=function(){};
    oTarget["on" + sEventType] = noExe;
  }
};

/* 功能:停止事件冒泡 */
com.uitis.util.stopBubble=function(e){
  if ( e && e.stopPropagation){
	e.stopPropagation();
  } else {
    window.event.cancelBubble=true;
  }
};

com.uitis.util.closeWindow=function(win){
  if (win==null) {
    win = window;
  }
  if (win.opener) {
    win.opener=null;
  }
  win.close();
};

/* 判断是否为数组 */
com.uitis.util.isArray=function(obj){
	if (obj) {
		if (obj.length) {
			if (obj[0] && obj[0].getAttribute("type")=="radio") {
				return true;
			}
		}
		/* 3个等号表示值和类型均需要相同 */
		var s = Object.prototype.toString.apply(obj);
		var b = ((s === '[object Array]') || (s === '[object NodeList]'));
		return b;
	}
	return false;
};

/**
 * 清空表单的元素值(选定情况)
 *
 * @param form 表单Form对象
 * @param clearReadOnlyValue 是否清除表单中的只读对象的值（true-清除）
 */
com.uitis.util.clearForm = function(form, clearReadOnlyValue) {
  if (form==null || form.elements==null || form.elements.length==null) {
    return;
  }
	if (clearReadOnlyValue==null) {
		clearReadOnlyValue = false;
	}
  for (var i=0, len=form.elements.length; i<len; i++) {
    var e = form.elements[i];
    var objTagName = e.tagName.toLowerCase();
    if (objTagName == "input" || objTagName == "textarea") {
      var objType = e.getAttribute("type");
      if (objType=="text" || objType=="password" || objType=="hidden" || objType=="file" || objTagName == "textarea") {
        if (clearReadOnlyValue || !e.readOnly) {
          e.value = "";
        }
      } else if (objType=="checkbox" || objType=="radio") {
        e.checked = false;
      }
    } else if (objTagName == "select") {
      if (e.options && e.options.length) {
        if (e.multiple) {
          for (var j=0, optLen=e.options.length; j<optLen; j++) {
            e.options[j].selected = false;
          }
        } else {
          e.options[0].selected = true;
        }
      }
    }
  }
};

/*--- the follow is ListController script [start] ---*/

/**
 * 对外调用方法:
 *     初始化'全选/各选项'复选框的点击事件和'编辑/删除'按钮的使用状态
 *
 * 以下四个参数的指定规则：
 *     可以指定为以逗号为间隔符的多个名称、ID的字符串；
 *     或者指定为对象、对象数组；
 *     注意：不能混合指定为字符串和对象；即：既指定名称、ID字符串，又指定对象、对象数组
 *
 * @param selItem 名称：各选项复选框（1 - n个选项复选框）
 * @param selAll  名称：全选复选框（0 - n个全选复选框）
 * @param btnEdt  名称：编辑按钮（0 - n个编辑按钮）
 * @param btnDel  名称：删除按钮（0 - n个删除按钮）
 */
function initListController(selItem, selAll, btnEdt, btnDel) {
    var dataListOperator = new com.uitis.util.ListController(selItem, selAll, btnEdt, btnDel);
    dataListOperator.init();
}

/**
 * 封装类：对'全选/各选项'复选框的点击事件和'编辑/删除'按钮的使用状态进行初始化
 *
 *
 * 以下四个参数的指定规则：
 *     可以指定为以逗号为间隔符的多个名称、ID的字符串；
 *     或者指定为对象、对象数组；
 *     注意：不能混合指定为字符串和对象；即：既指定名称、ID字符串，又指定对象、对象数组
 *
 * @param selItem 名称：各选项复选框（1 - n个选项复选框）
 * @param selAll  名称：全选复选框（0 - n个全选复选框）
 * @param btnEdt  名称：编辑按钮（0 - n个编辑按钮）
 * @param btnDel  名称：删除按钮（0 - n个删除按钮）
 */
com.uitis.util.ListController=function(selItem, selAll, btnEdt, btnDel) {

    // 获得指定 名称、ID、对象 的对象数组
    // （该方法必须定义在使用之前）
    this.toObjectArray = function(objectORnames) {
        if (objectORnames==null || objectORnames=='') {
            return new Array();
        }
        if (typeof objectORnames == 'string') {
            // 去除全部空格(正则表达式中的 g 表示全部匹配, i表示忽略大小写)
            objectORnames = objectORnames.replace(new RegExp(' ','gi'), '');

            if (objectORnames=='') {
                return new Array();
            }

            var idx = objectORnames.indexOf(',');
            if (idx==-1) {
                var objs = document.getElementsByName(objectORnames);
                objectORnames = new Array();
                if (objs && objs.length) {
                    for (var i=0, len=objs.length; i<len; i++){
                        objectORnames[i] = objs[i];
                    }
                }
            } else {
                var names = objectORnames.split(',');
                objectORnames = new Array();
                for (var i=0, len=names.length; i<len; i++) {
                    var objName = names[i];
                    if (objName.length>0) {
                        var objects = document.getElementsByName(objName);
                        for (var j=0, jLen=objects.length; j<jLen; j++) {
                            objectORnames.push(objects[j]);
                        }
                    }
                }
            }
        } else {
            // objectORnames.length
            if (com.uitis.util.isArray(objectORnames)) {
                /* 已经是对象数组，不需要作任何处理 */
            } else {
                objectORnames = new Array(objectORnames);
            }
        }

        return objectORnames;
    };

    var THIS = this;
    this.selItem = this.toObjectArray(selItem);
    this.selAll  = this.toObjectArray(selAll);
    this.btnEdt  = this.toObjectArray(btnEdt);
    this.btnDel  = this.toObjectArray(btnDel);
    this.selAllTitle = "全选";

    /* [对外调用方法] 初始化方法 */
    this.init = function() {
        THIS._setBtnDisabled(THIS.btnEdt, true);
        THIS._setBtnDisabled(THIS.btnDel, true);
        THIS._initSelAll();
        THIS._initSelItem();
    };

    this.bindEventHandler = function(oTarget, sEventType, fnHandler) {
        if (oTarget.addEventListener) {
            oTarget.addEventListener(sEventType, fnHandler, false);
        } else if (oTarget.attachEvent) {
            oTarget.attachEvent("on" + sEventType, fnHandler);
        } else {
            oTarget["on" + sEventType] = fnHandler;
        }
    };

    /* [对外调用方法] 添加 复选框选项 */
    this.appendCheckbox = function(selItem) {
        if (selItem==null || selItem.type!="checkbox") {
            alert("[ListController][appendCheckbox(selItem)] 非法的复选框对象。");
            return;
        }

        THIS.selItem[THIS.selItem.length] = selItem;
        THIS.bindEventHandler(selItem, "click", THIS._clickItem);
        THIS._initItemTr(selItem);

        THIS._setSelAllStatus(false);//取消全选复选框的选定状态
    };

    this._initSelAll = function() {
        if (THIS.selAll==null) {
            return;
        }
        if(THIS.selItem == null) {
            return;
        }

        if (THIS.selAll.length) {
            for (var i=0, len=THIS.selAll.length; i<len; i++) {
                THIS.bindEventHandler(THIS.selAll[i], "click", THIS._clickSelAll);
                THIS.selAll[i].title = THIS.selAllTitle;
            }
        } else {
            THIS.bindEventHandler(THIS.selAll, "click", THIS._clickSelAll);
            THIS.selAll.title = THIS.selAllTitle;
        }
    };

    this._initSelItem = function() {
        if (THIS.selItem==null) {
            return;
        }

        if (THIS.selItem.length) {
            for (var i=0, len=THIS.selItem.length; i<len; i++) {
                THIS.bindEventHandler(THIS.selItem[i], "click", THIS._clickItem);
                THIS._initItemTr(THIS.selItem[i]);
            }
        } else {
            if (THIS.selItem.parentNode) {
                THIS.bindEventHandler(THIS.selItem, "click", THIS._clickItem);
                THIS._initItemTr(THIS.selItem);
            }
        }
    };

    this._initItemTr = function(item) {

        var tr = item.parentNode;
        while(tr.tagName.toLowerCase()!="tr") {
            tr = tr.parentNode;
        }

        if (tr.tagName.toLowerCase()=="tr") {
            THIS.bindEventHandler(tr, "dblclick", THIS._ondblclickItem);
        }
    };

    this._ondblclickItem = function(event) {

        var tr = event.srcElement || event.target;
        while(tr.tagName && tr.tagName.toLowerCase()!="tr") {
            tr = tr.parentNode;
        }

        if (tr.tagName && tr.tagName.toLowerCase()=="tr" && tr.cells.length>0) {
            var children = tr.cells[0].children || tr.cells[0].childNodes;
            if (children && children.length>0) {
                var selItemName = null;
                if (THIS.selItem && THIS.selItem.length>0) {
                    selItemName = THIS.selItem[0].name;
                }

                if (selItemName!=null) {
                    THIS._autoClickItem(children, selItemName);
                }
            }
        }
    };

    this._autoClickItem = function(children, n) {
        if (children && children.length) {
            for (var i=0, len=children.length; i<len; i++) {
                var sc = children[i];
                if (sc.name && sc.name==n) {
                    sc.click();
                    return;
                } else {
                    THIS._autoClickItem(sc.children || sc.childNodes, n);
                }
            }
        }
    };

    this._setBtnDisabled = function(btn, status) {
        if (btn==null) {
            return;
        }
        if (btn.length) {
            for (var i=0, len=btn.length; i<len; i++) {
                btn[i].disabled = status;
            }
        } else {
            btn.disabled = status;
        }
    };

    this._setSelAllStatus = function(status) {
        if (THIS.selAll==null) {
            return;
        }
        if (THIS.selAll.length) {
            for (var i=0, len=THIS.selAll.length; i<len; i++) {
                THIS.selAll[i].checked = status;
            }
        } else {
            THIS.selAll.checked = status;
        }
    };

    this._clickSelAll = function(event) {
        if (THIS.selAll==null) {
            return;
        }
        if(THIS.selItem == null) {
            return;
        }

        var srcObject = event.srcElement || event.target;

        /* 获得当前‘全选’复选框的选择状态 */
        var status = srcObject.checked; /* 当前触发事件的全选复选框的选择状态 */
        var num = 0;
        if(THIS.selItem.length) {
            for (var i=0, len=THIS.selItem.length; i<len; i++) {
                if (THIS.selItem[i].disabled==false) {
                    num++;
                    THIS.selItem[i].checked = status;
                }
            }
        } else {
            if (THIS.selItem.disabled==false) {
                num++;
                THIS.selItem.checked = status;
            }
        }

        if (num>0) {
            THIS._clickItem();
        } else {
            THIS._setSelAllStatus(status);/* 含有多个全选复选框时设置选定状态 */
        }
    };

    this._clickItem = function() {
        if(THIS.selItem == null) {
            return;
        }

        if(THIS.selItem.length) {
            var disabledNum = 0;
            var num = 0;
            for (var i=0, len=THIS.selItem.length; i<len; i++) {
                if (THIS.selItem[i].checked) {
                    num++;
                }
                if (THIS.selItem[i].disabled) {
                    disabledNum++;
                }
            }

            THIS._setBtnDisabled(THIS.btnEdt, num!=1);
            THIS._setBtnDisabled(THIS.btnDel, num<1);
            THIS._setSelAllStatus(num==(THIS.selItem.length-disabledNum));
        } else {
            THIS._setSelAllStatus(THIS.selItem.checked);
        }
    };
};//END ListController
/*--- the above is ListController script [ end ] ---*/

/* START -= HttpPost, HttpGet, HttpPut, HttpDelete, HttpHead, HttpTrace, HttpOptions =-*/
  /**
   * 可用对象: HttpPost, HttpGet, HttpPut, HttpDelete, HttpHead, HttpTrace, HttpOptions
   * 使用示例:

      var callbackFunction = function(param, xmlHttp) {
        alert("[callbackFunction]: " + param);
      };
      var failedFunction = function(status, xmlHttp) {
        alert("[failedFunction] status: " + status + ", xmlHttp: " + xmlHttp);
      };
      var progressFunction = function(readyState, status) {
        alert("[failedFunction] readyState: " + readyState + ", status: " + status);
      };

      var data = null;
      var post = new com.uitis.util.HttpPost();
      post.setCallback( callbackFunction )
          .setFailedFunction( failedFunction )
          .setProgressFunction( progressFunction )
          .setResponseValueType('x') // x: xml; t: text; s: stream; b: integer array; others: XMLHttpRequest
          .setAsyncRequest(true) // true [default, 异步请求] / false
          .addHeader("name1", "value1")
          .addHeader("name2", "value2")
          .fire(url,data); // this is a must&last invoke method, the above methods are optional invoke.
   */

  /* HTTP请求的基础封装类 */
  com.uitis.util.HttpHead=function(_contextPath, callback, failedFunction) {
    /* the default is assyn-request. 异步请求 */
    this.isAsyncRequest = true;

    /* 响应值类型。取值见下面的setResponseValueType()方法 */
    this.responseValueType = "t";

    /* 发起请求并响应成功后所调用的回调方法；方法参数为 param, xmlHttp */
    this.callback = callback;

    /* 发起请求后服务器端响应错误码时所调用的方法；方法参数为status, xmlHttp */
    this.failedFunction = failedFunction;

    /* 发起请求到接收响应之前所调用的进度方法；方法参数为请求对象的 readyState, status */
    this.progressFunction = null;

    this.headerNames = new Array();
    this.headerValues = new Array();

    this._getMethod = function(){ /* 获得请求方法类型 */
      return "HEAD";
    };

    this._initHeader = null; /* [POST方式时使用] 初始化请求头数据 */
    this._initUrlAndData = null; /* [GET方式时使用] 组合Data数据到Url中 */

    /* 上下文路径 */
	var contextPath=(_contextPath||_contextPath_||"");

	/* Ajax请求头、值和会话超时的响应值；这三个值需要与服务器端过滤器保持完全一致（包括大小写） */
	var ajaxHeaderName  = "AJAX";
	var ajaxHeaderValue = "YES";
	var ajaxSessionTimeOut = "SessionTimeOut";

	var THIS = this;

    /**
     * 设置响应值类型；
     *
     * 注意：本方法的参数值决定了callback方法第一个参数值类型；对应关系如下：
     *   t|txt|text --- 文本（竖线表示"或者"的意思）
     *   x|xml -------- XML的根对象
     *   s|stream ----- 响应流对象
     *   b|body ------- 无符号整数数组
     *   其他任意值 --- XMLHttpRequest对象
     */
    this.setResponseValueType = function(responseValueType){
      this.responseValueType = responseValueType;
      return this;
    };

    /* 设置是否使用同步请求 */
    this.setAsyncRequest = function(isAsyncRequest){
      this.isAsyncRequest = isAsyncRequest;
      return this;
    };

    /* 设置请求进度的方法 */
    this.setProgressFunction = function(progressFunction){
      this.progressFunction = progressFunction;
      return this;
    };

    /* 设置请求成功后的回调处理方法 */
    this.setCallback = function(callback){
      this.callback = callback;
      return this;
    };

    /* 设置请求失败后的处理方法 */
    this.setFailedFunction = function(failedFunction){
      this.failedFunction = failedFunction;
      return this;
    };

    /* 添加请求头信息 */
    this.addHeader = function(name, value) {
      if (name) {
        if (typeof name == 'string') {
          this.headerNames.push(name);
          this.headerValues.push(value);
        } else {
          /* 判断是否为数组；3个等号表示值和类型均需要相同 */
          if (com.uitis.util.isArray(name)) {
            if (com.uitis.util.isArray(value)) {
              for (var i=0, len=name.length; i<len; i++) {
                this.headerNames.push(name[i]);
                this.headerValues.push(value[i]);
              }
              return true;
            }
          }
        }
      }
      return this;
    };

    var _newXMLHttpRequest = function() {
      if(window.XMLHttpRequest) {
        /* Google Chrome, Firefox, Opera 8.0+, Safari, IE7+, etc. */
        return new XMLHttpRequest();
      }

      if(window.ActiveXObject) {
        /* IE6, IE5 (需MSXML4.0支持) */
        var activeXNames = ["MSXML2.XMLHTTP", "Microsoft.XMLHTTP"];
        for(var i=0,len=activeXNames.length; i<len; i++) {
          try {
            return new ActiveXObject(activeXNames[i]);
          } catch (e) {}
        }
      }
      alert("无法获取XMLHttpRequest, 所使用的浏览器不支持Ajax。");
      return null;
    };

    /**
     * [主调方法]触发请求
     *
     * @param url <必需参数项>请求访问的URL地址。
     * @param data [可选参数项]请求参数
     * @param loginName [可选参数项]用户的登录名
     * @param password [可选参数项]用户的登录密码
     */
    this.fire = function(url, data, loginName, password){

      if (url==null || url==undefined || url=="") {
        alert("Invalid value: null or empty");
        return false;
      }

      if (this._getMethod==null || this._getMethod==undefined) {
        alert("the subclass must implement the '_getMethod' function,"
            + " and can't use the 'HttpHead' directly");
        return false;
      }

      var method = this._getMethod();
      if (method==null || method==undefined || ((""+method).replace(/\s+/g, ""))=="") {
        alert("the subclass must override the '_getMethod' function"
            + " and return a valid HTTP method name, such as GET, POST, PUT, DELETE, etc.");
        return false;
      }
      method = (""+method).replace(/\s+/g, "").toUpperCase();

      /* 获得XMLHttp请求对象(XMLHttpRequest对象知识: http://baike.baidu.com/view/1806882.html ) */
      var xmlHttp = _newXMLHttpRequest();
      if (xmlHttp==null) {// 浏览器不支持Ajax */
        return false;
      }

	  var isAjaxSessionTimeOut = (top||window).uitis_ajaxSessionTimeOut;
	  if (isAjaxSessionTimeOut) {
	    return false;
	  }

      xmlHttp.onreadystatechange = function(){ //注册回调函数 */
        if(xmlHttp.readyState == 4) {
          /* 判断http的交互是否成功 */
          if(xmlHttp.status == 200) {
            if (THIS.callback) {
              if (xmlHttp.responseText==ajaxSessionTimeOut) {
			    if (!(top||window).uitis_ajaxSessionTimeOut) {
                  (top||window).uitis_ajaxSessionTimeOut=true;
				  alert("用户会话超时或服务器已重启，请重新登录。");
				  window.location.href=contextPath;
				}
				return;
              }

			  var param;

              var type = (THIS.responseValueType||"t").toLowerCase();
              if (type == "t" || type == "txt" || type == "text") {
                param = xmlHttp.responseText; /* 普通文本 */
              } else if (type == "x" || type == "xml") {
                param = xmlHttp.responseXML.documentElement; /* XML对象 */
                /* xmlHttp.responseXML.documentElement.getElementsByTagName('xxx')[0].firstChild.nodeValue; */
              } else if (type == "s" || type == "stream") {
                param = xmlHttp.responseStream; /* Stream流 */
              } else if (type == "b" || type == "body") {
                param = xmlHttp.responseBody; /* 无符号整数数组 */
              } else {
                param = xmlHttp;
              }

              // xmlHttp.getAllResponseHeaders(); // like server-type, content-type, date-modified, etc.
              // xmlHttp.getResponseHeader('Last-Modified'); //
              THIS.callback(param, xmlHttp);
            } else {
              //alert("no callback, " + this);
            }
          } else {
            if (THIS.failedFunction) {
              THIS.failedFunction(xmlHttp.status, xmlHttp);
            } else {
              alert("no failedFunction, " + this);
            }
          }
        } else if (this.progressFunction) {
          this.progressFunction(xmlHttp.readyState, xmlHttp.status);
        }
      };

      if (this._initUrlAndData) {
        url = this._initUrlAndData(url, data);
        data = null;
      }

      if (loginName) {
        xmlHttp.open(method, url, this.isAsyncRequest, loginName, password);
      } else {
        xmlHttp.open(method, url, this.isAsyncRequest);
      }

      if (this._initHeader) {
        this._initHeader(data);
      }

	  xmlHttp.setRequestHeader(ajaxHeaderName, ajaxHeaderValue);
      for (var i=0, len=this.headerNames.length; i<len; i++) {
		if (ajaxHeaderName == this.headerNames[i]) {
			continue;
		}
        xmlHttp.setRequestHeader(this.headerNames[i], this.headerValues[i]);
      }

      xmlHttp.send(data);

      return true;
    };
};

com.uitis.util.HttpPost=function() {
    com.uitis.util.HttpHead.apply(this,arguments);
    this._initHeader = function(data){
      //this.addHeader("Content-Length", data.length);
      this.addHeader("Content-Type", "application/x-www-form-urlencoded");
    };
    this._getMethod = function(){
      return "POST";
    };
};

com.uitis.util.HttpGet=function() {
    com.uitis.util.HttpHead.apply(this,arguments);
    this._initUrlAndData = function(url, data){
      if (data) {
        if(url.indexOf("?") < 0) {
          url = url + "?" + data;
        } else {
          url = url + "&" + data;
        }
      }
      return url;
    };
    this._getMethod = function(){
        return "GET";
    };
};

com.uitis.util.HttpPut=function() {
    com.uitis.util.HttpHead.apply(this,arguments);
    this._getMethod = function(){
        return "PUT";
    };
};

com.uitis.util.HttpDelete=function() {
    com.uitis.util.HttpHead.apply(this,arguments);
    this._getMethod = function(){
        return "DELETE";
    };
};

com.uitis.util.HttpTrace=function() {
    com.uitis.util.HttpHead.apply(this,arguments);
    this._getMethod = function(){
        return "TRACE";
    };
};

com.uitis.util.HttpOptions=function() {
    com.uitis.util.HttpHead.apply(this,arguments);
    this._getMethod = function(){
        return "OPTIONS";
    };
};
/* END   -= HttpPost, HttpGet, HttpPut, HttpDelete, HttpHead, HttpTrace, HttpOptions =-*/

/* END package: com.uitis.util */
///////////////////////////////////////////////////////////////////////////////




///////////////////////////////////////////////////////////////////////////////
/* START package: com.uitis.pagination */

/*--- the follow is PaginationInfo script [start] ---*/

if (com.uitis.pagination.PaginationInfo==null) {
  com.uitis.pagination.PaginationInfo = {
    pageSizeTitle     : "每页显示记录数",
    pageNoTitle       : "页号",
    inputValideNumber : "{title}：请输入有效的数字！",
    mustNumber        : "{title}必须是数字，请重新输入！",
    mustMoreThanZero  : "{title}必须是大于0的数字，请重新输入！",
    tooBigNumber      : "{title}设置数值太大，请重新输入！"
  };
}
com.uitis.pagination.gotoPage=function(xform, namePS, namePN, idPS, idPN, isPNId) {
  if (com.uitis.pagination.PaginationInfo==null) {
    alert("Please import the script file before use it,"
        + " which has declared the 'PaginationInfo' object."
        + "\n\n"
        + "url: " + location.href
        + "\n"
    );
    return;
  }
  var pi=com.uitis.pagination.PaginationInfo;
  var validator=function(obj,title,value) {
    if(value.length==0){
      alert(pi.inputValideNumber.replace("{title}",title));
      obj.select();
      return false;
    }
    var c,ok=true;
    for(var i=0,len=value.length;i<len;i++){
      c=value.charCodeAt(i);
      if (c<48||c>57){ok=false;break;}
    }
    if(!ok){
      alert(pi.mustNumber.replace("{title}",title));
      obj.select();
      return false;
    }
    return true;
  };

  var ops=document.getElementById(idPS);
  var pageSize=ops.value;

  var ss=(''+pageSize).replace(/^\\s+(.*?)\\s+$/,'$1');
  var ok=validator(ops,pi.pageSizeTitle,ss);
  if (!ok) {
    return;
  }
  pageSize=parseInt(ss);
  if(pageSize<=0){
    alert(pi.mustMoreThanZero.replace("{title}", pi.pageSizeTitle));
    ops.select();
    return;
  }
  if(pageSize>65535){
    alert(pi.tooBigNumber.replace("{title}", pi.pageSizeTitle));
    ops.select();
    return;
  }

  var pageNo;
  if (isPNId){
    var opn=document.getElementById(idPN);
    pageNo=opn.value;
    var sn=(''+pageNo).replace(/^\\s+(.*?)\\s+$/,'$1');
    ok=validator(opn,pi.pageNoTitle,sn);
    if(!ok) {
      return;
    }
    pageNo=parseInt(sn);
  }else{pageNo=idPN;}

  xform[namePS].value=pageSize;
  xform[namePN].value=pageNo;
  var url=location.href;
  var idx=url.indexOf("?");
  if(idx>0){
    url=url.substring(0,idx);
  }
  xform.action=url;
  xform.submit();
};

/*--- the above is PaginationInfo script [ end ] ---*/
/* END package: com.uitis.pagination */




///////////////////////////////////////////////////////////////////////////////
/* START package: com.uitis.validation */

/* the follow is validateData script [start] */

// 值类型
com.uitis.validation.ValueType = {
  any           : 0, /* [默认] 任意半角或全角字符 */
  number        : 1, /*         数字：只允许是数字，可带有+-号和小数点 */
  integer       : 11,/*         整数：只允许是数字，可带有+-号 */
  positive      : 12,/*       正整数：只允许是数字；加上长度限制就可用于验证邮政编码合法性 */
  letter        : 2, /*         字母：只允许是字母 */
  letter_number : 3, /*   字母和数字：只允许是字母和数字 */
  number_letter : 3, /*   数字和字母：只允许是字母和数字[冗余以方便使用] */
  email         : 4, /* 电子邮件地址：只允许是数字和字母、部分字符（连字符[减号]、下划线、英文句号[小数点]） */
  password      : 5, /*         密码：不允许中文 */
  idcard        : 6  /*   身份证号码：只允许是数字和字母X */
};

/**
 * 对外调用方法: 检查参数合法性:
 *     是否为必填项 / 是否为必选项;
 *     是否超过允许的最大长度 / 是否超过最多选择数量;
 *     是否输入允许的最少字符数量 / 是否选择允许的最少选项数量.
 *
 * @param obj 对象/对象数组
 * @param objName 对象名称
 * @param maxLen 允许输入的最大字符数量 / 允许选择的最大选择项数量
 *               当进行字符校验时,此参数为必须项;表示为最大字符数量;
 *               当进行选择校验时,此参数为可选项,表示为最大选择数量; 参数null表示不限制选择数量.
 *
 * @param minLen 此参数为可选项;允许输入的最少字符数量 / 允许选择的最少选择项数量;
 *               当进行输入的字符数量校验时:
 *                   等于0或无此参数: 表示为非必填项;
 *                   等于1: 表示必填项;
 *                   大于1: 表示最少需输入字符数量.
 *               当进行选择项数量校验时:
 *                   等于0或无此参数: 表示为非必选项;
 *                   等于1: 表示为必选项;
 *                   大于1: 表示允许选择的最少选项数量.
 *
 * @param isTrimSpace 此参数为可选项;表示是否删除首尾部空白字符;
 *                    当 minLen 参数为大于0时，此参数默认值为 true(即，不允许)
 *
 * @param valueType 此参数为可选项; 表示进行输入值校验时所允许输入的数据值类型（用于控制提示信息）;
 *                      等于0或无此参数: 任何半角或全角字符[默认值];
 *                      等于1: 数字;
 *                      等于2: 字母;
 *                      等于3: 数字和字母.
 *                  （此参数可扩展其他值）
 *
 * @return 数据校验合法时返回true; 否则返回false.
 */
com.uitis.validation.validateData=function(obj, objName, maxLen, minLen, valueType, isTrimSpace) {

    if (obj==null) {
        alert("参数非法：未提供验证对象。" + objName);
        return false;
    }
    if (objName==null) {
        alert("参数非法：未提供验证对象名称。" + obj);
        return false;
    }
    if (minLen==null) {
        minLen = 0;
    }
    if (valueType==null || valueType=="") {
        valueType = com.uitis.validation.ValueType.any;
    }

    var objArray = null;
    // 判断是否为 不是数组 或 下拉列表对象
    if ((!com.uitis.util.isArray(obj))
		|| (obj.tagName && obj.tagName.toLowerCase() == "select")) {
        objArray = new Array();
        objArray[0] = obj;
    } else {
        objArray = obj;
    }

    var object = objArray[0];
    var objTagName = object.tagName.toLowerCase();
    if (objTagName=="input" || objTagName=="textarea") {

        var objType = object.getAttribute("type");

        if (objType=="text" || objType=="password" || objType=="hidden" || objType=="file" || objTagName=="textarea") {
            if (maxLen==null) {
                alert("[ERROR] 未提供最大允许长度值。");
                return false;
            }
            return com.uitis.validation._validateInput(objArray, objName, maxLen, minLen, valueType, isTrimSpace);
        }

        if (objType=="checkbox" || objType=="radio") {
            if (maxLen==null) {
                maxLen = -1;
            }
            return com.uitis.validation._validateChoiceItem(objArray, objName, maxLen, minLen);
        }

        alert('[FATAL] unknow input type: ' + objType);
        return false;
    }

    if (objTagName=="select") {
        if (maxLen==null) {
            maxLen = -1;
        }
        return com.uitis.validation._validateSelect(objArray, objName, maxLen, minLen);
    }

    alert('[FATAL] unknow tagName: ' + tagName);
    return false;
};

com.uitis.validation._validateInput=function(objArray, objName, maxLen, minLen, valueType, isTrimSpace) {
    var ValueType=com.uitis.validation.ValueType;

	var isRemoveAnySpace = (
		(valueType == ValueType.number) || (valueType == ValueType.integer)
		 || (valueType == ValueType.positive) || (valueType == ValueType.letter)
		 || (valueType == ValueType.letter_number) || (valueType == ValueType.email)
		 || (valueType == ValueType.idcard)
	);

    var isUnlimitedMaxLen = maxLen!=-1;/* 表示是否为无限制最大长度 */
    var isMustHaveValue = minLen>0;
    for (var i=0, len=objArray.length; i<len; i++) {
        var v = objArray[i].value;

		if (isRemoveAnySpace) {
			v = v.replace(/\s+/,""); /* 不允许有空格 */
            objArray[i].value = v;
		} else if (isTrimSpace) {
            v = v.replace(/^\s+(.*?)\s+$/,"$1");
            objArray[i].value = v;
        }

        var strLen = com.uitis.validation.getStringLength(v);
		if (strLen>0) {
			if (isMustHaveValue && strLen<minLen) {
				var msg;
				if (valueType == ValueType.number) {
				  msg=objName + "：请输入至少"+minLen+"个数字字符的内容。";
				} else if (valueType == ValueType.integer) {
				  msg=objName + "：请输入至少"+minLen+"个数字字符的内容。";
				} else if (valueType == ValueType.positive) {
				  msg=objName + "：请输入至少"+minLen+"个数字字符的内容。";
				} else if (valueType == ValueType.letter) {
				  msg=objName + "：请输入至少"+minLen+"个字母字符的内容。";
				} else if (valueType == ValueType.letter_number) {
				  msg=objName + "：请输入至少"+minLen+"个字母或数字的内容。";
				} else if (valueType == ValueType.email) {
				  msg=objName + "：请输入至少"+minLen+"个字符的内容。";
				} else if (valueType == ValueType.password) {
				  msg=objName + "：请输入至少"+minLen+"位的密码内容，以确保账户安全。";
				} else if (valueType == ValueType.idcard) {
				  msg="请输入15或18位的" + objName +"。";
				} else {
				  msg=objName + "：请输入至少"+minLen+"个字符的内容。";
				}
				com.uitis.validation._showMsg(msg, objArray[i]);

				return false;
			}

			if (isUnlimitedMaxLen && strLen>maxLen) {
				var msg;
				if (valueType == ValueType.any) { // 任意半角或全角字符
				  msg = objName + "：输入内容超过允许的长度。最多允许" + maxLen + "个半角字符或" + (maxLen/2) + "个全角字符。";
				} else if (valueType == ValueType.number) { // 数字
				  msg = objName + "：输入内容超过允许的长度。最多允许" + maxLen + "个数字。";
				} else if (valueType == ValueType.integer) { // 数字
				  msg = objName + "：输入内容超过允许的长度。最多允许" + maxLen + "个数字。";
				} else if (valueType == ValueType.positive) { // 数字
				  msg = objName + "：输入内容超过允许的长度。最多允许" + maxLen + "个数字。";
				} else if (valueType == ValueType.letter) { // 英文字符
				  msg = objName + "：输入内容超过允许的长度。最多允许" + maxLen + "个英文字符。";
				} else if (valueType == ValueType.letter_number) { // 数字和字母
				  msg = objName + "：输入内容超过允许的长度。最多允许" + maxLen + "个数字和字母。";
				} else if (valueType == ValueType.email) { // 字符
				  msg = objName + "：输入内容超过允许的长度。最多允许" + maxLen + "个字符。";
				} else if (valueType == ValueType.password) { // 字符
				  msg = objName + "：输入内容超过允许的长度。最多允许" + maxLen + "个字符。";
				} else if (valueType == ValueType.idcard) { // 字符
				  msg = objName + "：输入内容超过允许的长度。最多允许" + maxLen + "个字符。";
				} else {
				  msg = objName + "：输入内容超过允许的长度。";
				}

				// 半角字符/全角字符
				com.uitis.validation._showMsg(msg, objArray[i]);

				return false;
			}

			if (valueType == ValueType.idcard && (strLen!=15 && strLen!=18)) {
				var msg="请输入15或18位的" + objName +"。";
				com.uitis.validation._showMsg(msg, objArray[i]);
				return false;
			}

			if (!com.uitis.validation.validateDataByValueType(objArray[i], objName, v, valueType)) {
				return false;
			}
		} else {
			if (isMustHaveValue) {
				var msg;
				if (objArray[i].readOnly) {
					msg = "请选择"+objName+"！";
				}else{
					if (isTrimSpace) {
					  msg = objName + "为必填信息，不允许为空或输入空白字符。";
					}else{
					  msg = objName + "为必填信息，请输入信息。";
					}
				}
				com.uitis.validation._showMsg(msg, objArray[i]);
				return false;
			}
		}
    }
    return true;
};

com.uitis.validation._validateChoiceItem=function(objArray, objName, maxLen, minLen) {
    if (minLen<=0) {
        return true;
    }

    var checkedItemNum = 0;
    for (var i=0, len=objArray.length; i<len; i++) {
        if (objArray[i].checked) {
            checkedItemNum++;
        }
    }
    var msg;
    if (checkedItemNum==0) {
        if (minLen>1) {
          msg = objName+"：至少选择"+minLen+"项。";
        } else {
          msg = "请选择"+objName+"！";
        }
    } else if (checkedItemNum<minLen) {
        msg = objName+"：至少选择"+minLen+"项。";
    } else if ((maxLen!=-1) && (maxLen<checkedItemNum)) {
        msg = objName+"最多允许选择"+maxLen+"项。";
    } else {
      return true;
    }
    com.uitis.validation._showMsg(msg, objArray[0]);
    return false;
};

com.uitis.validation._validateSelect=function(objArray, objName, maxLen, minLen) {
    if (minLen<=0) {
        return true;
    }

    var moreOneItem = minLen>1;
    var isHaveMaxLen = maxLen!=-1;
    for (var i=0, len=objArray.length; i<len; i++) {
        if (objArray[i].multiple) {
            var selectedItemNum = 0;
            for (var j=0, leng=objArray[i].options.length; j<leng; j++) {
                if (objArray[i].options[j].selected) {
                    selectedItemNum++;
                }
            }
            if (selectedItemNum == 0) {
                var msg;
                if (moreOneItem) {
                    msg = objName+"：请至少选择"+minLen+"项。";
                } else {
                    msg = "请选择"+objName+"。";
                }
                com.uitis.validation._showMsg(msg, objArray[i]);
                return false;
            }
            if (isHaveMaxLen && selectedItemNum>maxLen) {
                com.uitis.validation._showMsg(objName+"：最多允许选择"+maxLen+"项。", objArray[i]);
                return false;
            }
        } else {
            var value = objArray[i].options[objArray[i].selectedIndex].value;
            if (value == "") {
                com.uitis.validation._showMsg("请选择"+objName+"。", objArray[i]);
                return false;
            }
        }
    }
    return true;
};

com.uitis.validation.validateDataByValueType=function(obj, objName, value, valueType) {
    var ValueType=com.uitis.validation.ValueType;

    if (valueType == ValueType.any || valueType == ValueType.password) {
        return true;
    }
    if (value==null||value=="") {
        _showMsg(objName + "的值不允许为空", obj);
        return false; /* 无值则视为非法 */
    }

    var msg="",ok=true;
    if (valueType == ValueType.number) { /* 数字：只允许是数字，可带有+-号和小数点 */
        var patrn=/^[+-]?[0-9]+\.?[0-9]*$/;
        if (!patrn.exec(value)) {
            msg=objName + "：请输入合法的数据值（仅允许输入数字、小数点和正负号）。";
            ok=false;
        }
    } else if (valueType == ValueType.integer) { /* 整数：只允许是数字，可带有+-号 */
        var patrn=/^[+-]?[0-9]+$/;
        if (!patrn.exec(value)) {
            msg=objName + "：请输入合法的数据值（仅允许输入整数）。";
            ok=false;
        }
    } else if (valueType == ValueType.positive) { /* 正整数：只允许是数字 */
        obj.value = value = value.replace(/^[0]+([1-9]+[0-9]*)$/,"$1");
        var patrn=/^[1-9]+[0-9]*$/;
        if (!patrn.exec(value)) {
            msg=objName + "：请输入合法的数据值（仅允许输入大于0的整数）。";
            ok=false;
        }
    } else if (valueType == ValueType.letter) { /* 字母：只允许是字母 */
        var patrn=/^[a-z]+$/i;
        if (!patrn.exec(value)) {
            msg=objName + "仅允许输入英文字符。";
            ok=false;
        }
    } else if (valueType == ValueType.letter_number) { /* 字母和数字：只允许是字母和数字 */
        var patrn=/^[0-9a-z]+$/i;
        if (!patrn.exec(value)) {
            msg=objName + "仅允许输入英文字符和数字。";
            ok=false;
        }
    } else if (valueType == ValueType.idcard) { /* 身份证号码：只允许是数字和字母X */
        if (!com.uitis.validation.isIdcardNo(obj, objName)) {
            return false;
        }
    } else if (valueType == ValueType.email) {
        /* 电子邮件地址：只允许是数字和字母、部分字符（连字符[减号]、下划线、英文句号[小数点]） */
        if (!com.uitis.validation.isEmail(obj, objName)) {
            return false;
        }
    } else {
      msg=("未被支持的值类型：" + valueType + "\n\nThis message comes from the script file: uitis.js");
      ok=false;
    }
    if (ok) {
      return true;
    }
    com.uitis.validation._showMsg(msg, obj);
    return false;
};

/**
 * 获得指定字符串的长度(区分中英文)
 *
 * @param str 指定的字符串
 * @return 返回指定字符串的长度(区分中英文)
 */
com.uitis.validation.getStringLength=function(str) {
    if (str==null || str=="") {
        return 0;
    }
    var totalLength = 0;
    for (var i=0, len=str.length; i<len; i++) {
        if (str.charCodeAt(i)>127) {
            totalLength+=2;
        } else {
            totalLength++;
        }
    }
    return totalLength;
};

/**
 * 显示提示信息,设置对象输入焦点
 *
 * @param msg 提示信息内容
 * @param obj 用于接收输入焦点的对象
 * @return false
 */
com.uitis.validation._showMsg=function(msg, obj) {
    alert(msg);
    if (obj) {
        var objType = obj.getAttribute("type");
        if (objType!="hidden" && obj.style && obj.style.display!="none" && obj.style.visibility!="hidden") {
            try{
                obj.focus();
            }catch(e){};
        }
    }
    return false;
};

/* 验证身份证号码合法性 */
com.uitis.validation.isIdcardNo=function(obj,objName) {
  var num = obj.value;
  var len = (""+num).length;
  if (len!=15 && len!=18) {
    com.uitis.validation._showMsg('输入的'+objName+'长度不对，应为15或18位长度。\n\n已输入长度为 ' + len, obj);
    return false;
  }

  num=num.toUpperCase();
  //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
  if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {
    com.uitis.validation._showMsg('输入的'+objName+'不符合规定。\n15位号码应全为数字，18位号码末位可以为数字或X。', obj);
    return false;
  }

  var regions={
    11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",
    21:"辽宁",22:"吉林",23:"黑龙江",
    31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",
    41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",
    50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",
    61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",
    71:"台湾",81:"香港",82:"澳门",91:"国外"
  };
  var region=regions[parseInt(num.substr(0,2))];
  if(region==null){
    com.uitis.validation._showMsg('输入的'+objName+'中前两位的地区码不正确。', obj);
    return false;
  }
  regions=null;

  var getCheckCode=function(num){
    // 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
    var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
    var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
    var nTemp = 0;
    for(var i=0,seventeen=17;i<seventeen;i++) {
      nTemp+=(num.substr(i,1)*arrInt[i]);
    }
    return arrCh[nTemp%arrCh.length];
  };

  //下面分别分析出生日期和校验位
  if (len==15) {
    var re=new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
    var arrSplit=num.match(re);

    //检查生日日期是否正确
    var birth=new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
    var bGoodDay = (birth.getYear() ==Number(arrSplit[2]))
                && ((birth.getMonth()+1)==Number(arrSplit[3]))
                && (birth.getDate() == Number(arrSplit[4]));
    if (!bGoodDay) {
      com.uitis.validation._showMsg(objName+'中的出生日期不正确。', obj);
      return false;
    }

    // 将15位身份证转成18位
    var msg='输入的'+objName+'完全正确，是否转换为18位号码？\n\n转换操作：在年份前面添加19，末尾添加校验码。\n';
    if (confirm(msg)){
      num = num.substr(0,6) + '19' + num.substr(6,(num.length-6));
      num+=getCheckCode(num);
      obj.value=num;
    }
    return true;
  }

  if (len == 18) {
    var re=new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
    var arrSplit=num.match(re);

    //检查生日日期是否正确
    var birth=new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
    var bGoodDay = (birth.getFullYear() ==Number(arrSplit[2]))
                && ((birth.getMonth()+1)==Number(arrSplit[3]))
                && (birth.getDate() == Number(arrSplit[4]));
    if (!bGoodDay) {
      com.uitis.validation._showMsg(objName+'中的出生日期不正确。', obj);
      return false;
    }

    //检验18位身份证的校验码是否正确。
    var cc=getCheckCode(num);
    if (cc!=num.substr(17, 1)) {
      com.uitis.validation._showMsg('18位'+objName+'的校验码不正确。', obj);
      return false;
    }
    return true;
  }
  return false;
};

/**
 * 电子邮件地址验证
 *
 * @param obj        <必需参数项> 电子邮件地址输入栏对象
 * @param objName    <必需参数项> 电子邮件地址输入栏的标题
 * @param maxNameLen [可选参数项] 电子邮件地址的用户名部分的最大允许长度
 * @param minNameLen [可选参数项] 电子邮件地址的用户名部分的最小允许长度；
 *                   注意，如果提供了最大允许长度值，并且未提供最小允许长度值，则自动设置最小允许长度为1
 * @return true-合法；false-非法
 */
com.uitis.validation.isEmail=function(obj, objName, maxNameLen, minNameLen) {
  var pattern = /^([0-9a-z]+([\.|\-|\_][0-9a-z]+)*)\@[0-9a-z\-]{1,63}(\.[0-9a-z\-]{1,63})*\.[a-z]{2,3}$/i;
  var rs=pattern.exec(obj.value);
  if (!rs) {
    var msg = "非法的" + objName+"格式。\n\n"+objName+"的组成格式：用户名@邮件服务器域名。"
        + "\n\n用户名的组成格式要求是："
        + "\n  1、由字母a～z(不区分大小写)、数字0～9、点、减号和下划线组成；  "
        + "\n  2、只能以字母或数字开头和结尾，如：jack.2008"
        + "\n  3、点、减号和下划线不能连续的组合使用";
    if (maxNameLen && maxNameLen>0) {
      if (minNameLen && minNameLen>0) {
        msg += "\n  4、用户名允许的长度是 "+minNameLen+" 到 "+maxNameLen+" 个字符";
      }else{
        msg += "\n  4、用户名允许的最大长度是 "+maxNameLen+" 个字符";
      }
    }else if (minNameLen && minNameLen>0) {
      msg += "\n  4、用户名允许的最小长度是 "+minNameLen+" 个字符";
    }
    msg += "。";
    com.uitis.validation._showMsg(msg, obj);
    return false;
  }

  var len=rs[1].length;
  if (maxNameLen) {
    if(len>maxNameLen){
      var msg;
      if (minNameLen && minNameLen>0) {
        msg=objName+"的用户名长度不正确。\n\n用户名允许的长度是 "+minNameLen+" 到 "+maxNameLen+" 个字符。";
      } else {
        msg=objName+"的用户名长度不正确。\n\n用户名允许的最大长度是"+maxNameLen+"个字符。";
      }
      com.uitis.validation._showMsg(msg, obj);
      return false;
    }
  }
  if (minNameLen && minNameLen>0 && len<minNameLen) {
    var msg=objName+"的用户名长度不正确。\n\n用户名允许的最小长度是"+minNameLen+"个字符。";
    com.uitis.validation._showMsg(msg, obj);
    return false;
  }
  return true;
};
/* END package: com.uitis.validation */
///////////////////////////////////////////////////////////////////////////////

// 经纬度的修正偏差值
var latDeviation = -0.005985; // 南北（将值增大表示向北偏移）
var lngDeviation = -0.006544; // 东西（将值增大表示向东偏移）
function correctLatDeviation(lat) {//
	return (parseFloat(lat) + latDeviation);
}
function correctLngDeviation(lng) {
	return (parseFloat(lng) + lngDeviation);
}
/**
 * 外呼
 * @param phone
 */
function dialoutOnWorkspace(phone){
	var softPhoneContentWindow = window.parent.document.getElementById("content_frame").contentWindow;
	softPhoneContentWindow.dialoutForOuter(phone);
}

function dialoutOnWorkspace2(phone){
	if(phone == ""){
		alert("电话号码不能为空！");
		return;
	}
	var softPhoneContentWindow = opener.parent.document.getElementById("content_frame").contentWindow;
	softPhoneContentWindow.dialoutForOuter(phone);
}

function dialoutOnWorkspace3(phone){
	if(phone == ""){
		alert("电话号码不能为空！");
		return;
	}
	var softPhoneContentWindow = parent.opener.parent.document.getElementById("content_frame").contentWindow;
	softPhoneContentWindow.dialoutForOuter(phone);
}

function dialoutOnWorkspace4(phone){
	if(phone == ""){
		alert("电话号码不能为空！");
		return;
	}
	var softPhoneContentWindow = parent.parent.document.getElementById("content_frame").contentWindow;
	softPhoneContentWindow.dialoutForOuter(phone);
}
/**
 * 选择城市和公司
 * @param e
 */
function checkCity(e){
	var optionObjArray = e.getElementsByTagName("OPTION");
	for(var i = 0;i < optionObjArray.length;i ++){
		var optionObj = optionObjArray[i];
		if(optionObj.selected == true){
			var cityId = optionObj.value;
			var cn = optionObj.innerHTML;
			var companyInfoCityNameObj = document.getElementById("companyInfoCityName");
			if(optionObj.value != ""){
				companyInfoCityNameObj.value = cn;
			}else{
				companyInfoCityNameObj.value = "";
			}
		}
	}
}

function checkCompany(e){
	var optionObjArray = e.getElementsByTagName("OPTION");
	for(var i = 0;i < optionObjArray.length;i ++){
		var optionObj = optionObjArray[i];
		if(optionObj.selected == true){
			var companyName = optionObj.innerHTML;
			var companyNameObj = document.getElementById("companyName");
			if(optionObj.value != ""){
				companyNameObj.value = companyName;
			}else{
				companyNameObj.value = "";
			}
		}
	}
}
/**
 * 修改客户类型
 */
String.prototype.trim= function(){
    // 用正则表达式将前后空格
    // 用空字符串替代。
    return this.replace(/(^\s*)|(\s*$)/g, "");
}
String.prototype.endsWith=function(str){
	if(str==null||str==""||this.length==0||str.length>this.length)
		return false;
	if(this.substring(this.length-str.length)==str)
		return true;
	else
		return false;
	return true;
}

String.prototype.startsWith=function(str){
	if(str==null||str==""||this.length==0||str.length>this.length)
		return false;
	if(this.substr(0,str.length)==str)
		return true;
	else
		return false;
	return true;
}
/**
 * 查询增加回车事件
 * @param operMethod 查询调用的方法名
 */
function confirmEvent(operMethod){
	var event = arguments.callee.caller.arguments[0] || window.event;
	if(event.keyCode == 13){//判断是否按了回车，enter的keycode代码是13。
		operMethod();
	}
}