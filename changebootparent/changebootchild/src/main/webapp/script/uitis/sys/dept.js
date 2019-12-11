function initDataForm(ctx) {
  document.DataForm.reset();
  document.DataForm["deptInfo.deptName"].focus();

  var oDeptCode=document.DataForm["deptInfo.deptCode"];
  var checkDeptCode=function() {
    var v = oDeptCode.value;
    v=v.replace(/ +/g, "");
	if (v!=oDeptCode.value){
		oDeptCode.value=v;
	}
    var cv=oDeptCode.getAttribute("checkValue");
    if (cv) {
      if (cv==v) {
        return;
      }
    }
    oDeptCode.setAttribute("checkValue",v);

    var deptCodeTip = document.getElementById("deptCodeTip");
    if (deptCodeTip==null) {
      deptCodeTip = document.createElement("label");
      deptCodeTip.setAttribute("id", "deptCodeTip");
      oDeptCode.parentNode.insertBefore(deptCodeTip, oDeptCode.nextSibling);
    }
    if (v=="") {
      deptCodeTip.innerHTML="<font color='red'>输入部门编码</font>";
      return;
    }
    if (v.length<6) {
      deptCodeTip.innerHTML="<font color='red'>输入至少6位长度的部门编码，当前长度 "+v.length+"</font>";
      return;
    }
    var url= ctx + "/sys/dept/"+oDeptCode.value;
    var oTid=document.DataForm["deptInfo.tid"];
	if (oTid) {
		url+=("," + oTid.value);
	}
    var data = null;

    var callbackFunction = function(param, xmlHttp) {
      var rs = param.replace(/\"/g,'').split(',');

      var isRepeatDeptCode = document.getElementById("isRepeatDeptCode");
      if (rs[0]>0){
        deptCodeTip.innerHTML="<font color='red'>重复的部门编码</font>";
        isRepeatDeptCode.value = "true";
      } else {
        deptCodeTip.innerHTML="<font color='green'>可用的部门编码</font>";
        isRepeatDeptCode.value = "false";
      }
    };
    var progressFunction = function(readyState, status) {
        deptCodeTip.innerHTML="<font color='red'>检查中...</font>";
    };
    var post = new com.uitis.util.HttpPut();
    post.setCallback( callbackFunction )
        .setProgressFunction( progressFunction )
        .setResponseValueType('t') // x: xml; t: text; s: stream; b: integer array; others: XMLHttpRequest
        .setAsyncRequest(true) // true [default, 异步请求] / false
        .fire(url,data);
  };

  var bindEventName;
  if (oDeptCode.addEventListener) {
	  bindEventName = "input";
  } else {
	  bindEventName = "propertychange";
  }
  com.uitis.util.bindEvent(oDeptCode, bindEventName, checkDeptCode);
}

function doCreateDept() {
  var fm = document.DataForm;

  var vd=com.uitis.validation;
/*
  if (!vd.validateData(fm["deptInfo.parentName"], "上级部门", 50, 2)) {
    return;
  }
*/
  if (!vd.validateData(fm["deptInfo.deptName"], "部门名称", 50, 2)) {
    return;
  }
  if (!vd.validateData(fm["deptInfo.deptCode"], "部门编码", 30, 6, vd.ValueType.letter_number)) {
    return;
  }
  var isRepeatDeptCode = document.getElementById("isRepeatDeptCode");
  if (isRepeatDeptCode.value=="true") {
    alert("部门编码重复");
    fm["deptInfo.deptCode"].focus();
    return;
  }

  if (!vd.validateData(fm["deptInfo.serialNo"], "部门顺序", 5, 0, vd.ValueType.positive)) {
    return;
  }
  if (!vd.validateData(fm["deptInfo.memoInfo"], "备注信息", 200, 0)) {
    return;
  }
  if (confirm("确认提交表单？")) {
    fm.submit();
  }
}

function doUpdateDept() {
  var fm = document.DataForm;

  var vd=com.uitis.validation;
/*
  if (!vd.validateData(fm["deptInfo.parentName"], "上级部门", 50, 2)) {
    return;
  }
*/
  if (!vd.validateData(fm["deptInfo.deptName"], "部门名称", 50, 2)) {
    return;
  }
  if (!vd.validateData(fm["deptInfo.deptCode"], "部门编码", 30, 6, vd.ValueType.letter_number)) {
    return;
  }
  var isRepeatDeptCode = document.getElementById("isRepeatDeptCode");
  if (isRepeatDeptCode.value=="true") {
    alert("部门编码重复");
    fm["deptInfo.deptCode"].focus();
    return;
  }

  if (!vd.validateData(fm["deptInfo.serialNo"], "部门顺序", 5, 0, vd.ValueType.positive)) {
    return;
  }
  if (!vd.validateData(fm["deptInfo.memoInfo"], "备注信息", 200, 0)) {
    return;
  }
  if (confirm("确认提交表单？")) {
    fm.submit();
  }
}


function deleteDepts(ctx) {

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
    alert("请选择需要删除的部门。");
    return;
  }

  deleteDept(ctx, tids);
}
function deleteDept(ctx, tids) {
  if (tids=="") {
    alert("请选择需要删除的部门。");
    return;
  }

  if (!confirm("确定删除选定的部门？\n\n提示：此操作不可逆转；部门下的子部门也将一并删除。")) {
    return;
  }

  var url= ctx + "/sys/dept/"+tids;
  var data = null;

  var callbackFunction = function(param, xmlHttp) {
    var rs = param.replace(/\"/g,'').split(',');
    if (rs[0]=='OK') {
      if (rs[1]>1) {
        alert("成功删除选定的多个部门。");
      } else {
        alert("成功删除选定的部门。");
      }
      location.href = location.href;
    }
    /*
    var rs = eval('(' + param + ')');// {'result':'OK','num':1,'len':1}
    if (rs.result == 'OK') {
      if (rs.num>1) {
        if (rs.num == rs.len) {
          alert("成功删除选定的全部部门。");
        } else {
          alert("成功删除选定的多个部门。");
        }
      } else {
        alert("成功删除选定的部门。");
      }
      location.href = location.href;
    } else {
      alert("typeof: " + (typeof rs) + ", param: " + param + ", result: " + rs.result);
    }
    */
  };
  var failedFunction = function(status, xmlHttp) {
    alert("删除部门失败，请重试或联系管理员。\n\nstatus: " + status);
  };

  var post = new com.uitis.util.HttpDelete();
  post.setCallback( callbackFunction )
      .setFailedFunction( failedFunction )
      .setResponseValueType('t') // x: xml; t: text; s: stream; b: integer array; others: XMLHttpRequest
      .setAsyncRequest(true) // true [default, 异步请求] / false
      .fire(url,data);
}