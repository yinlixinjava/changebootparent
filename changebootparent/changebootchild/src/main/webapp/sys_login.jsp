<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1.0" />
<meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1" />
<title>index</title>
<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css" />
<link rel="stylesheet" type="text/css" href="css/yksStore.css" />
</head>

<body style="overflow-y: hidden">
	<div class="box" style="background-color:#0db5ff;">
		<div class="t" style="background-color:#6ad1ff;"></div> <!-- header -->
		<div class="bottom" style="background-image:url(img/bottom.png);"></div> <!-- bottom -->
		<div class="login-box-all">
			<div style="background-image:url(img/denglu.png);width:150px;height:34px;position:relative;left:75px;top:26px;"></div>
			<div class="login-box-user">
				<label style="border-width: 0;background-color:#0db5ff;font-size:110%;position:absolute;top:5px;left:5px">
					<font color="#FFFFFF">&nbsp;用&nbsp;戶&nbsp;&nbsp;|</font>
				</label>
				<input type="text" id="username" name="username" align="right" style=" border-radius:0 5px 5px 0;border-width: 0;background-color:#0db5ff;width:139px;position:absolute;left:61px;top:1px;height:29px" value="">
			</div>

			<div style="width:200px;height:30px;position:relative;left:50px;top:64px;background-color:#0db5ff;border-radius:5px">
				<label style="border-width: 0;background-color:#0db5ff;font-size:110%;position:absolute;top:5px;left:5px">
					<font color="#FFFFFF">&nbsp;密&nbsp;码&nbsp;&nbsp;|</font>
				</label>
				<input
					type="password"
					id="password"
					name="password"
					align="right"
					style=" border-radius:0 5px 5px 0;border-width: 0;background-color:#0db5ff;width:139px;position:absolute;left:61px;top:1px;height:29px"
					value="">
			</div>

			<button
				type="button"
				style="border-width: 0;width:220px;height:40px;background-color:#e63617;position:relative;left:40px;top:98px;border-radius:5px;"
				id="submit">
				<font color="white" size="4pt">登&nbsp;&nbsp;&nbsp;录</font>
			</button>

		</div>

		<div
			style="position:absolute;right:50%;top:18%;">
			<div
				style="background-image:url(img/logo.png);width:170px;height:73px;position:relative;right:240px;top:0px;"></div>
		</div>

		<div
			style="position:absolute;right:50%;top:18%;">
			<div style="font-size:26pt;position:relative;right:-50px;top:-5px;">业务管理系统</div>
		</div>

		<div style="position:absolute;right:50%;top:30%;">
			<div style="background-image:url(img/tu.png);width:310px;height:260px;position:relative;right:100px;top:0px;"></div>
		</div>
		
		<form action="deskmain.jsp" method="post" id="hiddenfrom">
			<input type="hidden" name="username" value="" id="hiddenparam">
		</form>

	</div>

	<script type="text/javascript" src="js/MD5.js"></script>
	<script type="text/javascript" src="js/jquery.min.js"></script>
	<script type="text/javascript" src="js/getParam.js"></script>
	<script type="text/javascript">
	document.onkeydown = function (e){
	    var theEvent = window.event || e;
	    var code = theEvent.keyCode || theEvent.which;
	    if(code == 13){
	       document.getElementById("submit").click(); 
	    }
	}
	
	$(document).ready(function(){
		$("#submit").click(function(){
				var username = $("#username").val();
				var password = $("#password").val();
	            if(username.trim()==''){
	            	$("#username").attr("placeholder",'用户名为空');//填充内容
	            	$("#username").addClass("form-control-error");//填充内容
	            	return;
	            }
	            if(password.trim()==''){
	            	$("#password").attr("placeholder",'密码为空');//填充内容
	            	$("#password").addClass("form-control-error");//填充内容
	            	return;
	            }
	            $.ajax({
	             type: "post",
	             url: "login/skipPage.do",
	             data: {username:username,password:password},
	             datatype: "json",
				 success : function(data) {
					if (data.status == false) {
						alert(data.message);
					} else {
						var username = data.username;
						$("#hiddenparam").attr("value", username);
						$("#hiddenfrom").submit();
					}
				 },
				 error : function(data){
					 alert("后台系统发生错误----------");
				 }
				});
			});
		});
	</script>
	<div style="text-align:center;">CopyRight</div>
</body>

</html>