function initDataForm(ctx, isCreate) {
  document.DataForm.reset();
  document.DataForm["userInfo.userName"].focus();

	if (isCreate) {
		_regCheckRepeatValueEvent4LoginName(ctx);
	}
	_regCheckRepeatValueEvent4UserNo(ctx);
}

function doCreateUser() {
  var fm = document.DataForm;
  var vd=com.uitis.validation;
  if (!vd.validateData(fm["userInfo.userName"], "姓名", 50, 2)) {
    return;
  }
  if (!vd.validateData(fm["userInfo.deptId"], "所在部门", 36, 1)) {
    return;
  }

  if (!vd.validateData(fm["userInfo.loginName"], "用户登录名", 30, 2, vd.ValueType.letter_number)) {
    return;
  }
  var isRepeatLoginName = document.getElementById("isRepeatLoginName");
  if (isRepeatLoginName.value=="true") {
    alert("用户登录名重复");
    fm["userInfo.loginName"].focus();
    return;
  }

  if (!vd.validateData(fm["userInfo.password"], "用户登录密码", 100, 6, vd.ValueType.password)) {
    return;
  }
  if (fm["userInfo.password"].value!=fm["userInfo.confirmPwd"].value) {
    alert("用户登录密码与确认密码不一致。");
    fm["userInfo.confirmPwd"].focus();
    return;
  }
  if (!vd.validateData(fm["userInfo.userNo"], "用户编号", 16, 1)) {
    return;
  }
  var isRepeatUserNo = document.getElementById("isRepeatUserNo");
  if (isRepeatUserNo.value=="true") {
    alert("用户编号重复");
    fm["userInfo.userNo"].focus();
    return;
  }

  if (!vd.validateData(fm["userInfo.email"], "电子邮件地址", 50, 0, vd.ValueType.email)) {
    return;
  }
  if (!vd.validateData(fm["userInfo.sex"], "性别", 1, 1)) {
    return;
  }
  if (!vd.validateData(fm["userInfo.idcardNumber"], "身份证号码", 18, 0, vd.ValueType.idcard)) {
    return;
  }
  var idcardNum = fm["userInfo.idcardNumber"].value;
  if (idcardNum.length>0 && idcardNum.length!=18) {
    alert("身份证号码长度不是18位，请修改为18位长度。");
    fm["userInfo.idcardNumber"].focus();
    return;
  }

  if (!vd.validateData(fm["userInfo.telephone"], "联系电话", 30, 0)) {
    return;
  }
  var userTypeArray = document.getElementsByName("userInfo.accountType");
  var userTypeVal;
  if(userTypeArray != null){
	  for(var i = 0;i < userTypeArray.length;i ++){
		  if(userTypeArray[i].checked == true){
			  userTypeVal = userTypeArray[i].value;
		  }
	  }
  }
  if (!vd.validateData(fm["userInfo.cellPhone"], "移动电话", 11, userTypeVal)) {
    return;
  }
  if (!vd.validateData(fm["userInfo.address"], "联系地址", 200, 0)) {
    return;
  }
  if (!vd.validateData(fm["userInfo.zipCode"], "邮政编码", 6, 0)) {
    return;
  }
  if (!vd.validateData(fm["userInfo.memoInfo"], "备注信息", 200, 0)) {
    return;
  }
  if (confirm("确认提交表单？")) {
    fm.submit();
  }
}

function doUpdateUser() {
  var fm = document.DataForm;

  var vd=com.uitis.validation;
  if (!vd.validateData(fm["userInfo.userName"], "姓名", 50, 2)) {
    return;
  }
  if (!vd.validateData(fm["userInfo.deptId"], "所在部门", 36, 1)) {
    return;
  }
  if (!vd.validateData(fm["userInfo.userNo"], "用户编号", 16, 1)) {
    return;
  }
  var isRepeatUserNo = document.getElementById("isRepeatUserNo");
  if (isRepeatUserNo.value=="true") {
    alert("用户编号重复");
    fm["userInfo.userNo"].focus();
    return;
  }
  if (!vd.validateData(fm["userInfo.email"], "电子邮件地址", 50, 0, vd.ValueType.email)) {
    return;
  }
  if (!vd.validateData(fm["userInfo.sex"], "性别", 1, 1)) {
    return;
  }
  if (!vd.validateData(fm["userInfo.idcardNumber"], "身份证号码", 18, 0, vd.ValueType.idcard)) {
    return;
  }
  if (!vd.validateData(fm["userInfo.telephone"], "联系电话", 30, 0)) {
    return;
  }
  var userTypeArray = document.getElementsByName("userInfo.accountType");
  var userTypeVal;
  if(userTypeArray != null){
	  for(var i = 0;i < userTypeArray.length;i ++){
		  if(userTypeArray[i].checked == true){
			  userTypeVal = userTypeArray[i].value;
		  }
	  }
  }
  if (!vd.validateData(fm["userInfo.cellPhone"], "移动电话", 11, userTypeVal)) {
    return;
  }
  if (!vd.validateData(fm["userInfo.address"], "联系地址", 200, 0)) {
    return;
  }
  if (!vd.validateData(fm["userInfo.zipCode"], "邮政编码", 6, 0)) {
    return;
  }
  if (!vd.validateData(fm["userInfo.memoInfo"], "备注信息", 200, 0)) {
    return;
  }
  if (confirm("确认提交表单？")) {
    fm.submit();
  }
}


function deleteUsers(ctx) {

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
    alert("请选择需要删除的用户。");
    return;
  }

  if (!confirm("确定删除选定的用户？\n\n提示：此操作不可逆转")) {
    return;
  }

  var url= ctx + "/sys/user/"+tids;
  var data = null;

  var callbackFunction = function(param, xmlHttp) {
    var rs = param.replace(/\"/g,'').split(',');
    if (rs[0]=='OK') {
      if (rs[1]>1) {
        alert("成功删除选定的多个用户。");
      } else {
        alert("成功删除选定的用户。");
      }
      location.href = location.href;
    }
    /*
    var rs = eval('(' + param + ')');// {'result':'OK','num':1,'len':1}
    if (rs.result == 'OK') {
      if (rs.num>1) {
        if (rs.num == rs.len) {
          alert("成功删除选定的全部用户。");
        } else {
          alert("成功删除选定的多个用户。");
        }
      } else {
        alert("成功删除选定的用户。");
      }
      location.href = location.href;
    } else {
      alert("typeof: " + (typeof rs) + ", param: " + param + ", result: " + rs.result);
    }
    */
  };
  var failedFunction = function(status, xmlHttp) {
    alert("删除用户失败，请重试或联系管理员。\n\nstatus: " + status);
  };

  var post = new com.uitis.util.HttpDelete();
  post.setCallback( callbackFunction )
      .setFailedFunction( failedFunction )
      .setResponseValueType('t') // x: xml; t: text; s: stream; b: integer array; others: XMLHttpRequest
      .setAsyncRequest(true) // true [default, 异步请求] / false
      .fire(url,data);
}

function _regCheckRepeatValueEvent4LoginName(ctx) {

  var oLoginName=document.DataForm["userInfo.loginName"];

  var bindEventName;
  if (oLoginName.addEventListener) {
	  bindEventName = "input";
  } else {
	  bindEventName = "propertychange";
  }
  com.uitis.util.bindEvent(oLoginName, bindEventName, function() {
    var v = oLoginName.value;
    v=v.replace(/ +/g, "");
		if (v!=oLoginName.value) {
			oLoginName.value=v;
		}
    var cv=oLoginName.getAttribute("checkValue");
    if (cv) {
      if (cv==v) {
        return;
      }
    }

    var loginNameTip = document.getElementById("loginNameTip");
    if (loginNameTip==null) {
      loginNameTip = document.createElement("label");
      loginNameTip.setAttribute("id", "loginNameTip");
      oLoginName.parentNode.insertBefore(loginNameTip, oLoginName.nextSibling);
    }
    if (v=="") {
      loginNameTip.innerHTML="<font color='red'>输入至少2位长度的登录名</font>";
      return;
    }
    var url= ctx + "/sys/user/loginName,"+oLoginName.value;
    var oTid=document.DataForm["userInfo.tid"];
		if (oTid) {
			url+=("," + oTid.value);
		}
    var data = null;

    var callbackFunction = function(param, xmlHttp) {
      var rs = param.replace(/\"/g,'').split(',');

      var isRepeatLoginName = document.getElementById("isRepeatLoginName");
      if (rs[0]>0){
        loginNameTip.innerHTML="<font color='red'>重复的登录名</font>";
        isRepeatLoginName.value = "true";
      } else {
        loginNameTip.innerHTML="<font color='green'>可用的登录名</font>";
        isRepeatLoginName.value = "false";
      }
    }
    var progressFunction = function(readyState, status) {
        loginNameTip.innerHTML="<font color='red'>检查中...</font>";
    };
    var post = new com.uitis.util.HttpPut();
    post.setCallback( callbackFunction )
        .setProgressFunction( progressFunction )
        .setResponseValueType('t') // x: xml; t: text; s: stream; b: integer array; others: XMLHttpRequest
        .setAsyncRequest(true) // true [default, 异步请求] / false
        .fire(url,data);
  });
}

function _regCheckRepeatValueEvent4UserNo(ctx) {

  var oUserNo=document.DataForm["userInfo.userNo"];

  var bindEventName;
  if (oUserNo.addEventListener) {
	  bindEventName = "input";
  } else {
	  bindEventName = "propertychange";
  }
  com.uitis.util.bindEvent(oUserNo, bindEventName, function() {
    var v = oUserNo.value;
    v=v.replace(/ +/g, "");
		if (v!=oUserNo.value) {
			oUserNo.value=v;
		}
    var cv=oUserNo.getAttribute("checkValue");
    if (cv) {
      if (cv==v) {
        return;
      }
    }

    var userNoTip = document.getElementById("userNoTip");
    if (userNoTip==null) {
      userNoTip = document.createElement("label");
      userNoTip.setAttribute("id", "userNoTip");
      oUserNo.parentNode.insertBefore(userNoTip, oUserNo.nextSibling);
    }
    if (v=="") {
      userNoTip.innerHTML="<font color='red'>输入用户编号</font>";
      return;
    }
    var url= ctx + "/sys/user/userNo,"+oUserNo.value;
    var oTid=document.DataForm["userInfo.tid"];
		if (oTid) {
			url+=("," + oTid.value);
		}
    var data = null;

    var callbackFunction = function(param, xmlHttp) {
      var rs = param.replace(/\"/g,'').split(',');

      var isRepeatUserNo = document.getElementById("isRepeatUserNo");
      if (rs[0]>0){
        userNoTip.innerHTML="<font color='red'>重复的用户编号</font>";
        isRepeatUserNo.value = "true";
      } else {
        userNoTip.innerHTML="<font color='green'>可用的用户编号</font>";
        isRepeatUserNo.value = "false";
      }
    }
    var progressFunction = function(readyState, status) {
        userNoTip.innerHTML="<font color='red'>检查中...</font>";
    };
    var post = new com.uitis.util.HttpPut();
    post.setCallback( callbackFunction )
        .setProgressFunction( progressFunction )
        .setResponseValueType('t') // x: xml; t: text; s: stream; b: integer array; others: XMLHttpRequest
        .setAsyncRequest(true) // true [default, 异步请求] / false
        .fire(url,data);
  });
}

function checkDynamicPasswordUser(e) {
	if (e == 1) {
		document.getElementById("cellPhone").className = "must";
	} else if (e == 0) {
		document.getElementById("cellPhone").className = "";
	}
}