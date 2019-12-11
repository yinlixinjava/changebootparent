function initDataForm(ctx) {
  document.DataForm.reset();
  document.DataForm["dictionaryInfo.dictName"].focus();

  var oDictCode=document.DataForm["dictionaryInfo.dictCode"];
  var checkDictCode=function() {
    var v = oDictCode.value;
    v=v.replace(/ +/g, "");
	if (v!=oDictCode.value) {
		oDictCode.value=v;
	}
    var cv=oDictCode.getAttribute("checkValue");
    if (cv) {
      if (cv==v) {
        return;
      }
    }
    oDictCode.setAttribute("checkValue",v);

    var dictCodeTip = document.getElementById("dictCodeTip");
    if (dictCodeTip==null) {
      dictCodeTip = document.createElement("label");
      dictCodeTip.setAttribute("id", "dictCodeTip");
      oDictCode.parentNode.insertBefore(dictCodeTip, oDictCode.nextSibling);
    }
    if (v=="") {
      dictCodeTip.innerHTML="<font color='red'>输入字典编码</font>";
      return;
    }
    if (v.length<6) {
      dictCodeTip.innerHTML="<font color='red'>输入至少6位长度的字典编码，当前长度 "+v.length+"</font>";
      return;
    }

    var url= ctx + "/sys/dictionary/"+oDictCode.value;
    var oTid=document.DataForm["dictionaryInfo.tid"];
	if (oTid) {
		url+=("," + oTid.value);
	}
    var data = null;

    var callbackFunction = function(param, xmlHttp) {
      var rs = param.replace(/\"/g,'').split(',');

      var isRepeatDictCode = document.getElementById("isRepeatDictCode");
      if (rs[0]>0){
        dictCodeTip.innerHTML="<font color='red'>重复的字典编码</font>";
        isRepeatDictCode.value = "true";
      } else {
        dictCodeTip.innerHTML="<font color='green'>可用的字典编码</font>";
        isRepeatDictCode.value = "false";
      }
    };
    var progressFunction = function(readyState, status) {
        dictCodeTip.innerHTML="<font color='red'>检查中...</font>";
    };
    var post = new com.uitis.util.HttpPut();
    post.setCallback( callbackFunction )
        .setProgressFunction( progressFunction )
        .setResponseValueType('t') // x: xml; t: text; s: stream; b: integer array; others: XMLHttpRequest
        .setAsyncRequest(true) // true [default, 异步请求] / false
        .fire(url,data);
  };

  var bindEventName;
  if (oDictCode.addEventListener) {
	  bindEventName = "input";
  } else {
	  bindEventName = "propertychange";
  }
  com.uitis.util.bindEvent(oDictCode, bindEventName, checkDictCode);
}

function doCreateDict() {
  var fm = document.DataForm;

  var vd=com.uitis.validation;
  if (!vd.validateData(fm["dictionaryInfo.dictType"], "字典类型", 2, 1)) {
    return;
  }
  if (!vd.validateData(fm["dictionaryInfo.dictName"], "字典名称", 50, 2)) {
    return;
  }
  if (!vd.validateData(fm["dictionaryInfo.dictCode"], "字典编码", 50, 6, vd.ValueType.letter_number)) {
    return;
  }
  if (!vd.validateData(fm["dictionaryInfo.dictValue"], "字典值", 50, 1)) {
    return;
  }
  var isRepeatDictCode = document.getElementById("isRepeatDictCode");
  if (isRepeatDictCode.value=="true") {
    alert("字典编码重复");
    fm["dictionaryInfo.dictCode"].focus();
    return;
  }
  if (!vd.validateData(fm["dictionaryInfo.serialNo"], "字典顺序", 5, 0, vd.ValueType.positive)) {
    return;
  }
  if (!vd.validateData(fm["dictionaryInfo.memoInfo"], "备注", 100, 0)) {
    return;
  }
  if (confirm("确认提交表单？")) {
    fm.submit();
  }
}

function doUpdateDict() {
  var fm = document.DataForm;

  var vd=com.uitis.validation;
  if (!vd.validateData(fm["dictionaryInfo.dictType"], "字典类型", 2, 1)) {
    return;
  }
  if (!vd.validateData(fm["dictionaryInfo.dictName"], "字典名称", 50, 2)) {
    return;
  }
  if (!vd.validateData(fm["dictionaryInfo.dictCode"], "字典编码", 30, 6, vd.ValueType.letter_number)) {
    return;
  }
  if (!vd.validateData(fm["dictionaryInfo.dictValue"], "字典值", 50, 1)) {
    return;
  }
  var isRepeatDictCode = document.getElementById("isRepeatDictCode");
  if (isRepeatDictCode.value=="true") {
    alert("字典编码重复");
    fm["dictionaryInfo.dictCode"].focus();
    return;
  }

  if (!vd.validateData(fm["dictionaryInfo.serialNo"], "字典顺序", 5, 0, vd.ValueType.positive)) {
    return;
  }
  if (!vd.validateData(fm["dictionaryInfo.memoInfo"], "备注", 100, 0)) {
    return;
  }
  if (confirm("确认提交表单？")) {
    fm.submit();
  }
}


function deleteDicts(ctx) {

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
    alert("请选择需要删除的字典。");
    return;
  }

  deleteDict(ctx, tids);
}

function deleteDict(ctx,tids) {
  if (tids=="") {
    alert("字典ID为空，因此不进行删除操作。");
    return;
  }
  if (!confirm("确定删除选定的字典？\n\n提示：此操作不可逆转；字典下的子字典也将一并删除。")) {
    return;
  }
  var url= ctx + "/sys/dictionary/"+tids;
  var data = null;

  var callbackFunction = function(param, xmlHttp) {
    var rs = param.replace(/\"/g,'').split(',');
    if (rs[0]=='OK') {
      if (rs[1]>1) {
        alert("成功删除选定的多个字典。");
      } else {
        alert("成功删除选定的字典。");
      }
      location.href = location.href;
    }
  };
  var failedFunction = function(status, xmlHttp) {
    alert("删除字典失败，请重试或联系管理员。\n\nstatus: " + status);
  };

  var post = new com.uitis.util.HttpDelete();
  post.setCallback( callbackFunction )
      .setFailedFunction( failedFunction )
      .setResponseValueType('t') // x: xml; t: text; s: stream; b: integer array; others: XMLHttpRequest
      .setAsyncRequest(true) // true [default, 异步请求] / false
      .fire(url,data);
}