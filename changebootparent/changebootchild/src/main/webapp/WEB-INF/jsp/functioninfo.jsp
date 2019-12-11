<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title></title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="http://sandbox.runjs.cn/uploads/rs/408/gjeegkdb/ace.min.css">
  <script type="text/javascript" src="http://sandbox.runjs.cn/uploads/rs/408/gjeegkdb/jquery.min.js">
	</script>
	<script type="text/javascript" src="http://sandbox.runjs.cn/uploads/rs/408/gjeegkdb/bootstrap.min.js">
	</script>
	<script type="text/javascript" src="http://sandbox.runjs.cn/uploads/rs/408/gjeegkdb/ace.min.js">
	</script>
  </head>
  
  <body style="background-color:#CAE1FF">
  
  	<ul class="nav nav-list">
  		<li>
  			<a class="dropdown-toggle" style="background-color:#CDC1C5">
				<i class="icon-desktop"></i>
				<span class="menu-text" >系统菜单</span>
			</a>
  		</li>
  	</ul>
	<ul class="nav nav-list">
	<c:forEach items="${sysFunctionlist}" var="sysFunction_every" varStatus="status">
		<c:if test="${sysFunction_every.pid == sysFunction_every.minpid}">
			<li>
				<a href="#" class="dropdown-toggle">
					<i class="icon-desktop"></i>
					<span class="menu-text">${sysFunction_every.name}</span>
					<b class="arrow icon-angle-down"></b>
				</a>
				
				<ul class="submenu">
					<c:forEach items="${sysFunctionlist}" var="sysFunction_every2">
						<c:if test="${sysFunction_every2.pid == sysFunction_every.id}">
						<li>
							<a href="${pageContext.request.contextPath}${sysFunction_every2.page}" target="rightframe">
								<i class="icon-double-angle-right"></i>
								${sysFunction_every2.name}
							</a>
						</li>
					 </c:if>
					</c:forEach>
			 	</ul>
		    </li>
	    </c:if>
	</c:forEach>
</ul>

  </body>

</html>
