<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
    <base href="<%=basePath%>">
    <title>BIM运维管理平台</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1" />  <!-- 支持IE样式 -->
	<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css" />
	<link rel="stylesheet" type="text/css" href="css/yksStore.css" />
	<script type="text/javascript" src="js/jquery.min.js"></script>
	<script type="text/javascript" src="js/getParam.js"></script>
	<script type="text/javascript" src="js/bootstrap.min.js"></script>
	<style type="text/css">
		.brand {
		    display: block;
		    float: left;
		    padding: 10px 20px 10px;
		    margin-left: -20px;
		    font-size: 20px;
		    font-weight: 200;
		    color: #777777;
		    text-shadow: 0 1px 0 #ffffff;
		}
	</style>
</head>



<body style="overflow-y: hidden">
	<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
   	<div class="modal-dialog">
      <div class="modal-content">
         <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="myModalLabel"> 修改密码 </h4>
         </div>
         <div class="modal-body">
            <form action="login/updatepsw.do" method="post">
			   <input type="hidden" id="hiddeninput" value="" name="hiddeninput">
			   <div class="form-group">
			      <label for="name">原密码</label>
			      <input type="password" class="form-control" id="pwd_old" name="pwd_old" onblur="exist()" placeholder="原密码"> <span style="color: red" id="span1" ></span>
			   </div>
            	<div class="form-group">
			      <label for="name">新密码</label>
			      <input type="text" class="form-control" id="pwd_new" name="pwd_new" placeholder="新密码">
			   </div>
            	<div class="form-group">
			      <label for="name">确认密码</label>
			      <input type="text" class="form-control" id="pwd_repeat" name="pwd_repeat" placeholder="确认密码">
			   </div>
            	<div class="modal-footer">
		            <input value ="确定" class="btn btn-primary" style="width:60px;" onclick="updatePwd()">
		            <button type="button" class="btn btn-primary" id="closebutton" data-dismiss="modal">关闭</button>
				</div>
            </form>
         </div>
      </div>
</div>
</div>  
    <div class="desktop-top">
      	<div class="navbar navbar-inverse navbar-fixed-top" style="background-color:#FFFFFF">
		<div class="navbar-inner">
			<div class="container-fluid">
				<div class="brand">BIM运维管理平台</div>
					<div style="vertical-align:middle;padding-right:5px;margin-top:13px;" align="right">
						<a style="color: blue;cursor: hand;" data-toggle="modal" data-target="#myModal">修改密码</a><span>&nbsp;&nbsp;|&nbsp;</span>
						<a style="color: blue;cursor: hand;" href="javascript:void(0);" onclick="logout()">退出</a>
					</div>
				</div>
			</div>
		</div>
	</div>
    <div class="desktop-middle">
        <div class="desktop-left">
            <iframe style="width:100%; height:100%;" frameborder="0"src="" name="leftframe" id="leftframe"></iframe>
        </div>
        <div class="desktop-right">
            <iframe style="width:100%; height:100%;" frameborder="0" src="view.jsp" name="rightframe"></iframe>
        </div>
    </div>
</body>

<script type="text/javascript">
	
    var username='${username}';
	$(document).ready(function(){
		$("#leftframe").attr("src","menu/menuInfo.do?username="+username);
		$("#hiddeninput").attr("value",username);
	});
	
	//退出
	function logout(){
		if(confirm("确定退出？")){
			/* var serverName = '${pageContext.request.serverName}';
			var path = "${pageContext.request.contextPath}";
			var scheme = '${pageContext.request.scheme}';
			var serverPort = '${pageContext.request.serverPort}'; */
			window.location.href= "${pageContext.request.contextPath}";
		}
	}
	
	
	//ajax        
	function updatePwd() {
		if(($("#pwd_new").val() == $("#pwd_repeat").val()) && ($("#pwd_new").val()!=null || $.trim($("#pwd_new").val())!="")){
			$.ajax({
		        url : 'login/updatepsw.do',
		        data : {username:$("#hiddeninput").val(),
		        		pwd_new:$("#pwd_new").val()},
		        type : 'post',
		        dataType : 'json',
		        success : function(data) {
		            switch(data.status){
		            	case '1':{
		            		alert("密码修改成功");
		            		$('#myModal').modal('hide');
		            	};break;
		            	case '0':{
		            		alert("密码修改失败");
		            		$('#myModal').modal('hide');
		            	};break;
		            	default:{
		            	};
		            }
		        },
		        error : function() {
		          	alert("-----修改密码时发生错误-----");
		          	$('#myModal').modal('hide');
		        }
		    });
		}else{
			alert("密码不一致");
		}
		
		 
	}
	
	//ajax 验证 账号是否存在      
	function exist(){
		$.ajax({
	        url : 'login/checkpsw.do',
	        data : {password:$("#pwd_old").val(),
	        		username:$("#hiddeninput").val()},
	        type : 'post',
	        dataType : 'json',
	        success : function(data) {
	        	alert(data.status);
	            if ('0' == data.stuts) {
	                $('#span1').text('原密码不正确');
	            }
	        },
	        error : function() {
	        	alert("-----校验密码时发生异常-----");
	        }
	    });
	}
</script>
</html>
