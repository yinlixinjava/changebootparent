<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib tagdir="/WEB-INF/tags" prefix="tags" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>统计客户奖励</title>
    
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="Pragma" content="no-cache">
	<meta http-equiv="Cache-Control" content="no-cache">
	<meta http-equiv="Expires" content="0">
	
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/css/bootstrap.min.css" />
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/css/yksStore.css" />
  	<link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath }/css/list.css">
	<script type="text/javascript" src="${pageContext.request.contextPath }/js/jquery-1.6.1.min.js"></script>
	
	<script type="text/javascript">
		// 跳转到用户添加
		function add(id){
			window.location.href="${pageContext.request.contextPath }/sysUserController/addToPage.do";
		}
		
		// 跳转到用户删除
		function delet(id){
			var gnl=confirm("确定删除？");   
			if (gnl==true){   
			window.location.href="${pageContext.request.contextPath }/sysUserController/deteleUser.do?id="+id;
			}
		}
		
		// 跳转到更新方法
		function update(id,telephone,remark,username){
			window.location.href="${pageContext.request.contextPath }/sysUserController/updateToPage.do?id="+id+"&telephone="+telephone+"&remark="+remark+"&username="+username;
		}
	</script>
	
  </head>

<body style="overflow-x:hidden;">
  	<div class="page-head" style="padding-top:7px;padding-left:5px;z-index:1000;"><span >系统管理&nbsp;>&nbsp;用户信息</span></div>
	<div class="container-fluid" style="margin-top:5px;">
  		<div class="row">
  		   	<div class="col-md-2" align="left">
				<input type="button" class="btn btn-primary" value="新增" onclick="add()">
		  	</div>
		  	<div class="col-md-8"></div>
		</div>
	</div>
		<div class="row container-fluid" style="margin:5px 1px 0 1px;">
			<table width="100%" class="table table-bordered" style="white-space:nowrap;">
				<thead style="background-color:#abceed">
			   	<tr align="center" class="listTitle" style="border-bottom:0;">
			  		<td style="width:5%;">序号</td>
						<td style="width:15%;">用户名称</td>
				   		<td style="width:15%;">手机号</td>
					<td style="width:15%;">创建日期</td>
			 		<td style="width:30%;">备注</td>
			 		<td colspan="2" style="width:20%;">操作</td>
		  		</tr>
		  		</thead>
				<tbody>
		    	 	<c:forEach items="${sysUserList}" var="sysUserList_every" varStatus="status">
		    	 <tr>
		    	 	<td align="center"><c:out value="${status.index+1}"></c:out></td>
		    	 	<td align="center">${sysUserList_every.username }</td>
	    	 		<td align="center">${sysUserList_every.telephone }</td>
			    	 	<td align="center">${sysUserList_every.createtime }</td>
			    	 	<td align="center">${sysUserList_every.remark }</td>
		    	 	<td align="center">&nbsp;<a style="color: blue;" href="javascript:;" onclick="update('${sysUserList_every.id }','${sysUserList_every.telephone }','${sysUserList_every.remark }','${sysUserList_every.username }')">修改</a>&nbsp;</td>
					<td align="center">&nbsp;<a style="color: blue;" href="javascript:;" onclick="delet('${sysUserList_every.id }')">删除</a>&nbsp;</td>
		    	 </tr>
		    	 	</c:forEach>
				</tbody>
     		 </table>
        </div>
	<tags:page page="${sysUserList}"></tags:page>
  </body>
</html>
