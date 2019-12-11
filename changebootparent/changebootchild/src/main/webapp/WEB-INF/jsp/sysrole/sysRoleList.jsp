<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib tagdir="/WEB-INF/tags" prefix="tags" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";

/* List<Role> roleInfolist =(List<Role>)request.getAttribute("roleInfolist"); */
/* Role role; */
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    <title>角色管理</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css" />
	<link rel="stylesheet" type="text/css" href="css/yksStore.css" />
  	<link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath }/css/list.css">
	<script type="text/javascript" src="${pageContext.request.contextPath }/js/jquery-1.6.1.min.js"></script>
  </head>
  
  <body style="background: #FFFFFF;overflow-x:hidden;">
  	<div class="page-head" style="padding-top:7px;padding-left:5px;"><span >系统管理&nbsp;>&nbsp;角色信息</span></div>
	<div class="container-fluid" style="margin-top:5px;">
  		<div class="row">
  		   	<div class="col-md-2" align="left">
				<input type="button" class="btn btn-primary" value="新增" onclick="toRoleAdd()" /> <!-- 触发a标签 -->
				<input type="button" class="btn btn-primary" value="授权" onclick="setAuthority()" />
		  	</div>
		  	<div class="col-md-8"></div>
		</div>
	</div>
	<div style="margin:5px 10px 0 10px;">
		<table class="table table-bordered">
			<thead style="background-color:#abceed">
			<tr align="center" class="listTitle">
				<td style="width:50px;">选择</td>
				<td style="width:50px;">序号</td>
				<td style="width:20%;">角色名称</td>
				<td style="width:20%;">角色代码</td>
				<td style="width:25%;">角色描述</td>
				<td colspan="2" style="width:20%;">操作</td>
			</tr>
			<tbody align="center">
				<c:forEach items="${sysRoleList}" var="sysRoleList_every" varStatus="status">
				<tr>
		    	 	<td><input name="gender" type="radio" value= "${sysRoleList_every.id }" /></td>
		    	 	<td align="center"> <c:out value="${status.index+1}"></c:out></td>
		    	 	<td align="left"> ${sysRoleList_every.name }</td>
		    	 	<td align="left"> ${sysRoleList_every.code }</td>
		    	 	<td align="left"> ${sysRoleList_every.description }</td>
		    	 	<td align=center>&nbsp;<a id="update" style="color: blue;" href="javascript:;" onclick="toRoleUpdate('${sysRoleList_every.id}','${sysRoleList_every.name }','${sysRoleList_every.code }','${sysRoleList_every.description }','${sysRoleList_every.operatetime }')">修改</a>&nbsp;</td>
					<td align=center>&nbsp;<a style="color: blue;" href="javascript:;" onclick="roleDelete('${sysRoleList_every.id}')">删除</a>&nbsp;</td>
				</tr>
				</c:forEach>
			</tbody>
		</table>
        </div>
        <tags:page page="${sysRoleList}"></tags:page>
        
        
        <script type="text/javascript">
        	// 角色授权
        	function setAuthority(){
				var id="";
			 	var radio=document.getElementsByName("gender");
			 	for(var i=0;i<radio.length;i++){
					if(radio[i].checked==true){
						id=radio[i].value;
						break;
					}
			 	}
			 	if("" == id){
				 	alert("请选择一条角色记录。");
				 	return;
			 	}
			 	window.location.href="${pageContext.request.contextPath}/sysRoleController/toSysRoleAndTree.do?id="+id;
			}
        	
        	
        	
        	function chuafaAbiaoqian(){
        		$("#update").click();
        	};
        	
        	//跳转到roleDelete
        	function roleDelete(id){
        		var gnl=confirm("确定删除？");   
        			if (gnl==true){   
        			window.location.href="${pageContext.request.contextPath }/sysRoleController/sysRoleDelete.do?id="+id;
        		}
        	}
        	
        	//跳转到roleUpData
        	function toRoleUpdate(id,name,code,description,operatetime){
        		window.location.href="${pageContext.request.contextPath }/sysRoleController/toRoleAddOrUpdate.do?id="+id+"&name="+name+"&code="+code+"&description="+description+"&operatetime="+operatetime;
        	}
        	
        	//跳转到roleUpData
        	function toRoleAdd(){
        		window.location.href="${pageContext.request.contextPath }/sysRoleController/toRoleAddOrUpdate.do?id=";
        	}
        </script>
  </body>
</html>
