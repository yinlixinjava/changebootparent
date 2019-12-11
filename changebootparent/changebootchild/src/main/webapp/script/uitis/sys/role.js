function initDataForm(ctx) {
  document.DataForm.reset();
  document.DataForm["roleInfo.roleName"].focus();

  var oRoleCode=document.DataForm["roleInfo.roleCode"];
  var checkRoleCode=function() {
    var v = oRoleCode.value;
    v=v.replace(/ +/g, "");
	if (v!=oRoleCode.value) {
		oRoleCode.value=v;
	}
    var cv=oRoleCode.getAttribute("checkValue");
    if (cv) {
      if (cv==v) {
        return;
      }
    }
    oRoleCode.setAttribute("checkValue",v);

    var roleCodeTip = document.getElementById("roleCodeTip");
    if (roleCodeTip==null) {
      roleCodeTip = document.createElement("label");
      roleCodeTip.setAttribute("id", "roleCodeTip");
      oRoleCode.parentNode.insertBefore(roleCodeTip, oRoleCode.nextSibling);
    }
    if (v=="") {
      roleCodeTip.innerHTML="<font color='red'>输入角色编码</font>";
      return;
    }
    if (v.length<6) {
      roleCodeTip.innerHTML="<font color='red'>输入至少6位长度的角色编码，当前长度 "+v.length+"</font>";
      return;
    }
    var url= ctx + "/sys/role/"+oRoleCode.value;
    var oTid=document.DataForm["roleInfo.tid"];
	if (oTid) {
		url+=("," + oTid.value);
	}
    var data = null;

    var callbackFunction = function(param, xmlHttp) {
      var rs = param.replace(/\"/g,'').split(',');

      var isRepeatRoleCode = document.getElementById("isRepeatRoleCode");
      if (rs[0]>0){
        roleCodeTip.innerHTML="<font color='red'>重复的角色编码</font>";
        isRepeatRoleCode.value = "true";
      } else {
        roleCodeTip.innerHTML="<font color='green'>可用的角色编码</font>";
        isRepeatRoleCode.value = "false";
      }
    };
    var progressFunction = function(readyState, status) {
        roleCodeTip.innerHTML="<font color='red'>检查中...</font>";
    };
    var post = new com.uitis.util.HttpPut();
    post.setCallback( callbackFunction )
        .setProgressFunction( progressFunction )
        .setResponseValueType('t') // x: xml; t: text; s: stream; b: integer array; others: XMLHttpRequest
        .setAsyncRequest(true) // true [default, 异步请求] / false
        .fire(url,data);
  };

  var bindEventName;
  if (oRoleCode.addEventListener) {
	  bindEventName = "input";
  } else {
	  bindEventName = "propertychange";
  }
  com.uitis.util.bindEvent(oRoleCode, bindEventName, checkRoleCode);
}

function doCreateRole() {
  var fm = document.DataForm;

  var vd=com.uitis.validation;
  if (!vd.validateData(fm["roleInfo.roleName"], "角色名称", 50, 2)) {
    return;
  }
  if (!vd.validateData(fm["roleInfo.roleCode"], "角色编码", 30, 6, vd.ValueType.letter_number)) {
    return;
  }
  var isRepeatRoleCode = document.getElementById("isRepeatRoleCode");
  if (isRepeatRoleCode.value=="true") {
    alert("角色编码重复");
    fm["roleInfo.roleCode"].focus();
    return;
  }

  if (!vd.validateData(fm["roleInfo.serialNo"], "角色顺序", 5, 0, vd.ValueType.positive)) {
    return;
  }
  if (!vd.validateData(fm["roleInfo.memoInfo"], "备注信息", 200, 0)) {
    return;
  }
  if (confirm("确认提交表单？")) {
    fm.submit();
  }
}

function doUpdateRole() {
  var fm = document.DataForm;

  var vd=com.uitis.validation;
  if (!vd.validateData(fm["roleInfo.roleName"], "角色名称", 50, 2)) {
    return;
  }
  if (!vd.validateData(fm["roleInfo.roleCode"], "角色编码", 30, 6, vd.ValueType.letter_number)) {
    return;
  }
  var isRepeatRoleCode = document.getElementById("isRepeatRoleCode");
  if (isRepeatRoleCode.value=="true") {
    alert("角色编码重复");
    fm["roleInfo.roleCode"].focus();
    return;
  }

  if (!vd.validateData(fm["roleInfo.serialNo"], "角色顺序", 5, 0, vd.ValueType.positive)) {
    return;
  }
  if (!vd.validateData(fm["roleInfo.memoInfo"], "备注信息", 200, 0)) {
    return;
  }
  if (confirm("确认提交表单？")) {
    fm.submit();
  }
}


function deleteRoles(ctx) {

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
    alert("请选择需要删除的角色。");
    return;
  }

  if (!confirm("确定删除选定的角色？\n\n提示：此操作不可逆转")) {
    return;
  }

  var url= ctx + "/sys/role/"+tids;
  var data = null;

  var callbackFunction = function(param, xmlHttp) {
    var rs = param.replace(/\"/g,'').split(',');
    if (rs[0]=='OK') {
      if (rs[1]>1) {
        alert("成功删除选定的多个角色。");
      } else {
        alert("成功删除选定的角色。");
      }
      location.href = location.href;
    }
    /*
    var rs = eval('(' + param + ')');// {'result':'OK','num':1,'len':1}
    if (rs.result == 'OK') {
      if (rs.num>1) {
        if (rs.num == rs.len) {
          alert("成功删除选定的全部角色。");
        } else {
          alert("成功删除选定的多个角色。");
        }
      } else {
        alert("成功删除选定的角色。");
      }
      location.href = location.href;
    } else {
      alert("typeof: " + (typeof rs) + ", param: " + param + ", result: " + rs.result);
    }
    */
  };
  var failedFunction = function(status, xmlHttp) {
    alert("删除角色失败，请重试或联系管理员。\n\nstatus: " + status);
  };

  var post = new com.uitis.util.HttpDelete();
  post.setCallback( callbackFunction )
      .setFailedFunction( failedFunction )
      .setResponseValueType('t') // x: xml; t: text; s: stream; b: integer array; others: XMLHttpRequest
      .setAsyncRequest(true) // true [default, 异步请求] / false
      .fire(url,data);
}