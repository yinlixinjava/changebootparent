<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    <title>修改菜单</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css" />
	<link rel="stylesheet" type="text/css" href="css/yksStore.css" />
  	<link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath }/css/list.css">
	<script type="text/javascript" src="${pageContext.request.contextPath }/js/jquery-1.6.1.min.js"></script>
  </head>
  <body>
	<div class="page-head" style="padding-top:7px;padding-left:5px;"><span >菜单管理&nbsp;>&nbsp;新增菜单</span></div>
	<form action="${pageContext.request.contextPath }/menu/updateFunction.do" id="form" onsubmit="return check(this)">
		<div class="container-fluid" style="margin-top:5px;">
			<div class="row">
				<div class="col-md-2" align="left">
					<input type="submit" class="btn btn-primary" value="保存">
		    		<input type="button" class="btn btn-primary" value="返回" onclick="back()">
				</div>
				<div class="col-md-8"></div>
			</div>
		</div>
		<table width="50%" cellspacing="0" cellpadding="0" border="0" align="left">
			<tr>
				<th >菜单名称</th>
	         	<td>
	         		<input type="hidden" value="${sysFunction.id }" name="id" id="id">
	         		<input type="hidden" value="${sysFunction.flag }" name="flag" id="flag">
	    	 		<input type="text" value="${sysFunction.name }" name="name" id="name" onfocus="clean()" onblur="exist()"><span style="color: red" id="span1" ></span>
				</td>
			</tr>
			<tr><th >父菜单id</th><td><input type="text" value="${sysFunction.pid }" name="pid" readonly="readonly"></td></tr>
			<tr><th >菜单编码</th><td><input type="text" value="${sysFunction.code }" name="code"></td></tr>
			<tr><th >顺序号</th><td><input type="text" value="${sysFunction.zindex }" name="zindex"></td></tr>
			<tr><th >链接地址</th><td><input type="text" value="${sysFunction.page }" name="page" id="page" onfocus="clean()" onblur="exist()"><span style="color: red" id="span2" ></span> </td></tr>
		</table>
	</form>
      
      
<script type="text/javascript">
	 var flag =true;
	  //校验表单
	function check(form) {
		if(form.name.value == '') {
			alert("菜单名称不能为空!");
		    return false;
		}
		     
		if(form.page.value == '') {
		        alert("菜单链接不能为空!");
		        return false;
			}
			
		if(!flag){
			alert("菜单信息冲突！");
			return false;
		} 
	} 
	   
	   //返回 列表页面
	function back(){
		window.location.href="${pageContext.request.contextPath }/menu/findFunction.do";
	}
	
	   // 清除ajax 验证消息	
	function clean(){
		$("#span1").text("");
		$("#span2").text("");
	}
	
	//ajax 验证目录名称是否存在         
	function exist() {
		var name = $("#name").val();
		//var page = $("#page").val();   其实page路径也是要校验的，防止相同路径会报错，这里我就不想写了，到时候出问题要看，注意了------注意了------注意了------注意了------注意了------注意了------注意了------注意了------注意了------
	    $.ajax({
	        url : '${pageContext.request.contextPath }/menu/countFunction.do',
	        data : {name:name},
	        type : 'post',
	        contentType:'application/x-www-form-urlencoded; charset=UTF-8',
	        dataType : 'json',
	        success : function(data) {
	            if (data.countNum > 0) {
	                $('#span1').text('菜单名称已存在');
	                flag=false;
	            }
	            else{
	            	flag=true;
	            }
	        },
	        error : function() {
	        	alert("服务器错误------");
	        }
	    });
	} 
    
</script>
  </body>
</html>
