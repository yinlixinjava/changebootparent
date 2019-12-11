<%@ page language="java" import="java.util.*" pageEncoding="utf-8" contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    <title>添加用户</title>
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
 	<div class="page-head" style="padding-top:7px;padding-left:5px;z-index:1000;"><span >用户管理&nbsp;>&nbsp;添加用户</span></div>
 	
 	<form action="${pageContext.request.contextPath }/sysUserController/updateUserAndRoleRelationship.do" id="form" >
		<div class="container-fluid" style="margin-top:5px;">
	  		<div class="row">
	  		   	<div class="col-md-2" align="left">
	  		   	 	<input type="submit" class="btn btn-primary" value="保存">
	    			<input type="button" class="btn btn-primary" value="返回" onclick="back()">
			  	</div>
			  	<div class="col-md-8"></div>
			</div>
		</div>
	  	
	  	
	  	<table width="70%" cellspacing="0" cellpadding="0" border="0" align="left" style="margin:5px 0px 0px 10px;">
			<tr align="center" class="listTitle"><td align="center" colspan="3">用户信息</td></tr>
	   		<tr>
         		<td width="100px" align="right" nowrap>用户名称：</td>
         		<td width="50%">
	         		<input type="hidden" value="${userId }"  name="userId">
	    	 		<input type="text" style="width:50%;" value="${username }" name="username" id="username" onfocus="cleanusername()" onblur="existusername()"><span style="color: red" id="span1" ></span> 
				</td>
				<td></td>
            </tr>
            
            <tr>
         		<td width="100px" align="right" nowrap>手机号：</td>
         		<td width="50%"><input type="text" style="width:50%;" value="${telephone }" name="telephone" id="telephone" onfocus="cleantelephone()" onblur="existtelephone()"><span style="color: red" id="span2" ></span></td>
				<td></td>
            </tr>
            
			<tr>
        	 	<td width="100px" align="right" nowrap>备注信息：</td>
    	 		<td><input type="text" style="width:50%;" value="${remark }" name="remark"></td>
				<td></td>
			</tr>
		
			<tr>
				<td width="100px" align="right" nowrap>选择角色：</td>
			</tr>
			<tr class="listTitle">
				<td style="padding: 0px 0px 0px 0px;width:100px" align="center">
					<input align="top" type="checkbox" id="selectAll" onclick="chooseAll()">
				</td>
				<td align="center">角色名称</td>
				<td align="center">角色描述</td>
			</tr>
			<input type="hidden" id="sysRoleListIdByUserId" value="${sysRoleListIdByUserId }"/>
			<c:forEach items="${sysRoleList}" var="sysRoleList_every">
			<tr>
				<td style="padding: 0px 0px 0px 0px;width:100px" align="center">
				<input align="middle" type="checkbox" name="roles" value="${sysRoleList_every.id }"></td>
				<td>${sysRoleList_every.name }</td>
				<td>${sysRoleList_every.description }</td>
			</tr>
			</c:forEach>
     	 </table>
      </form>
      
      
      
      
<script type="text/javascript">
    // 全选
	function chooseAll(){
  			// 
			var selectAll = document.getElementById("selectAll").checked;
			if(selectAll){
				// 
				var ids = document.getElementsByName("roles");
				for(var j=0;j<ids.length;j++) {
					ids[j].checked = true;
				}
			} else {
				var ids = document.getElementsByName("roles");
				for(var j=0;j<ids.length;j++){
					ids[j].checked = false;
				}
			}
		} 
	// 
	function back(){
		window.location.href="${pageContext.request.contextPath }/sysUserController/findUser.do";
	}
	
	window.onload = function(){
		var arr = [];
		var temp = document.getElementById("sysRoleListIdByUserId").value;
		if(temp.indexOf(",")!=-1){
			arr = temp.split(",");
			var ids = document.getElementsByName("roles");
			for(var j=0;j<ids.length;j++) {
				if($.inArray(ids[j].value, arr)!=-1){
					ids[j].checked = true;
				}else{
					ids[j].checked = false;
				}
			}
		}
		
	}
	</script>
  </body>
</html>
