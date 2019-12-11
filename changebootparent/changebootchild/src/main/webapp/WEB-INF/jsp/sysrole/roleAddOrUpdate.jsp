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
    
    <title>修改角色</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css" />
	<link rel="stylesheet" type="text/css" href="css/yksStore.css" />
  	<link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath }/css/list.css">
	<script type="text/javascript" src="${pageContext.request.contextPath }/js/jquery-1.6.1.min.js"></script>

  </head>
  
  <body style="background: #FFFFF3;">
 <div class="page-head" style="padding-top:7px;padding-left:5px;"><span >角色管理&nbsp;>&nbsp;修改角色</span></div>
	<div class="container-fluid" style="margin-top:5px;"></div>
	  <form action="${pageContext.request.contextPath }/sysRoleController/roleAddOrUpdate.do" id="form"  method = "post">
	    <div class="container-fluid" style="margin-top:5px;">
	  		<div class="row">
	  		   	<div class="col-md-2" align="left">
	  		   	 	<input type="submit" class="btn btn-primary" value="保存">
	    			<input type="button" class="btn btn-primary" value="返回" onclick="back()">
			  	</div>
			  	<div class="col-md-8"></div>
			</div>
		</div>
	   <table width="50%" cellspacing="0" cellpadding="0" border="0" align="left" style="text-align: center;">
	   	 <tr  align="center"><th style="text-align: center;" colspan="2">角色信息</th></tr>
	   	<tr>
         <th style="text-align: right;">角色名称</th>
         	<td style="text-align: left;">
         		<input type="hidden"value="${sysRole.id}" name="id" id="id">
    	 		<input type="text" value="${sysRole.name}" name="name" id="name" onfocus="clean()" onblur="exist()"><span  style="color: red; width: 100px" id="span1" ></span> 
			</td>
          </tr>
          <tr>
        	 <th style="text-align: right;">角色代码</th>
    	 	<td style="text-align: left;">
    	 		<input type="text" value="${sysRole.code}" name="code">
			</td>
			</tr>
			<tr>
        	 <th style="text-align: right;">角色备注</th>
    	 	<td style="text-align: left;">
    	 		<input type="text" value="${sysRole.description}" name="description">
			</td>
			</tr>
     	 </table>
     	
      </form>
      
      	<script type="text/javascript">
		// 返回角色信息页面
		function back(){
			window.location.href="${pageContext.request.contextPath }/sysRoleController/findRole.do";
		}
	</script>
  </body>
</html>
