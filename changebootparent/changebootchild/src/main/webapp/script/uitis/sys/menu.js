function initDataForm(ctx) {
  document.DataForm.reset();
  document.DataForm["menuInfo.menuName"].focus();

  var oMenuCode=document.DataForm["menuInfo.menuCode"];
  var checkMenuCode=function() {
    var v = oMenuCode.value;
    v=v.replace(/ +/g, "");
	if (v!=oMenuCode.value) {
		oMenuCode.value=v;
	}
    var cv=oMenuCode.getAttribute("checkValue");
    if (cv) {
      if (cv==v) {
        return;
      }
    }
    oMenuCode.setAttribute("checkValue",v);

    var menuCodeTip = document.getElementById("menuCodeTip");
    if (menuCodeTip==null) {
      menuCodeTip = document.createElement("label");
      menuCodeTip.setAttribute("id", "menuCodeTip");
      oMenuCode.parentNode.insertBefore(menuCodeTip, oMenuCode.nextSibling);
    }
    if (v=="") {
      menuCodeTip.innerHTML="<font color='red'>输入菜单编码</font>";
      return;
    }
    if (v.length<6) {
      menuCodeTip.innerHTML="<font color='red'>输入至少6位长度的菜单编码，当前长度 "+v.length+"</font>";
      return;
    }

    var url= ctx + "/sys/menu/"+oMenuCode.value;
    var oTid=document.DataForm["menuInfo.tid"];
	if (oTid) {
		url+=("," + oTid.value);
	}
    var data = null;

    var callbackFunction = function(param, xmlHttp) {
      var rs = param.replace(/\"/g,'').split(',');

      var isRepeatMenuCode = document.getElementById("isRepeatMenuCode");
      if (rs[0]>0){
        menuCodeTip.innerHTML="<font color='red'>重复的菜单编码</font>";
        isRepeatMenuCode.value = "true";
      } else {
        menuCodeTip.innerHTML="<font color='green'>可用的菜单编码</font>";
        isRepeatMenuCode.value = "false";
      }
    };
    var progressFunction = function(readyState, status) {
        menuCodeTip.innerHTML="<font color='red'>检查中...</font>";
    };
    var post = new com.uitis.util.HttpPut();
    post.setCallback( callbackFunction )
        .setProgressFunction( progressFunction )
        .setResponseValueType('t') // x: xml; t: text; s: stream; b: integer array; others: XMLHttpRequest
        .setAsyncRequest(true) // true [default, 异步请求] / false
        .fire(url,data);
  };

  var bindEventName;
  if (oMenuCode.addEventListener) {
	  bindEventName = "input";
  } else {
	  bindEventName = "propertychange";
  }
  com.uitis.util.bindEvent(oMenuCode, bindEventName, checkMenuCode);
}

function doCreateMenu() {
  var fm = document.DataForm;

  var vd=com.uitis.validation;
  if (!vd.validateData(fm["menuInfo.menuName"], "菜单名称", 50, 2)) {
    return;
  }
  if (!vd.validateData(fm["menuInfo.menuCode"], "菜单编码", 30, 6, vd.ValueType.letter_number)) {
    return;
  }
  var isRepeatMenuCode = document.getElementById("isRepeatMenuCode");
  if (isRepeatMenuCode.value=="true") {
    alert("菜单编码重复");
    fm["menuInfo.menuCode"].focus();
    return;
  }

  if (!vd.validateData(fm["menuInfo.serialNo"], "菜单顺序", 5, 0, vd.ValueType.positive)) {
    return;
  }
  if (!vd.validateData(fm["menuInfo.menuIcon"], "菜单图标", 36, 0)) {
    return;
  }
  if (!vd.validateData(fm["menuInfo.linkUrl"], "菜单链接地址", 200, 0)) {
    return;
  }
  if (!vd.validateData(fm["menuInfo.linkTarget"], "菜单链接目标", 20, 0)) {
    return;
  }
  if (!vd.validateData(fm["menuInfo.functionCode"], "菜单脚本功能", 200, 0)) {
    return;
  }
  if (confirm("确认提交表单？")) {
    fm.submit();
  }
}

function doUpdateMenu() {
  var fm = document.DataForm;

  var vd=com.uitis.validation;
  if (!vd.validateData(fm["menuInfo.menuName"], "菜单名称", 50, 2)) {
    return;
  }
  if (!vd.validateData(fm["menuInfo.menuCode"], "菜单编码", 30, 6, vd.ValueType.letter_number)) {
    return;
  }
  var isRepeatMenuCode = document.getElementById("isRepeatMenuCode");
  if (isRepeatMenuCode.value=="true") {
    alert("菜单编码重复");
    fm["menuInfo.menuCode"].focus();
    return;
  }

  if (!vd.validateData(fm["menuInfo.serialNo"], "菜单顺序", 5, 0, vd.ValueType.positive)) {
    return;
  }
  if (!vd.validateData(fm["menuInfo.menuIcon"], "菜单图标", 36, 0)) {
    return;
  }
  if (!vd.validateData(fm["menuInfo.linkUrl"], "菜单链接地址", 200, 0)) {
    return;
  }
  if (!vd.validateData(fm["menuInfo.linkTarget"], "菜单链接目标", 20, 0)) {
    return;
  }
  if (!vd.validateData(fm["menuInfo.functionCode"], "菜单脚本功能", 200, 0)) {
    return;
  }
  if (confirm("确认提交表单？")) {
    fm.submit();
  }
}


function deleteMenus(ctx) {

  var tids=empty="",comma=",";
  var arrayTids = document.getElementsByName("tids");
  for (var i=0, len=arrayTids.length; i<len; i++) {
    if (arrayTids[i].checked) {
      if (tids!=empty) {
        tids += comma;
      }
      tids += arrayTids[i].value;
    }
  }
  if (tids=="") {
    alert("请选择需要删除的菜单。");
    return;
  }

  deleteMenu(ctx, tids);
}

function deleteMenu(ctx,tids) {
  if (tids=="") {
    alert("菜单ID为空，因此不进行删除操作。");
    return;
  }
  if (!confirm("确定删除选定的菜单？\n\n提示：此操作不可逆转；菜单下的子菜单也将一并删除。")) {
    return;
  }
  var url= ctx + "/sys/menu/"+tids;
  var data = null;

  var callbackFunction = function(param, xmlHttp) {
    var rs = param.replace(/\"/g,'').split(',');
    if (rs[0]=='OK') {
      if (rs[1]>1) {
        alert("成功删除选定的多个菜单。");
      } else {
        alert("成功删除选定的菜单。");
      }
      location.href = location.href;
    }
  };
  var failedFunction = function(status, xmlHttp) {
    alert("删除菜单失败，请重试或联系管理员。\n\nstatus: " + status);
  };

  var post = new com.uitis.util.HttpDelete();
  post.setCallback( callbackFunction )
      .setFailedFunction( failedFunction )
      .setResponseValueType('t') // x: xml; t: text; s: stream; b: integer array; others: XMLHttpRequest
      .setAsyncRequest(true) // true [default, 异步请求] / false
      .fire(url,data);
}