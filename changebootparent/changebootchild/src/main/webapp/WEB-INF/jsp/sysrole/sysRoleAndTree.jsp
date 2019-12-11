<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%
String treenodes = (String) request.getAttribute("treenodes");
String selectMenuIdLast = (String) request.getAttribute("selectMenuIdLast");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>角色授权</title>
	<script type="text/javascript" src="${pageContext.request.contextPath }/script/ztree/jquery-1.6.1.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath }/script/ztree/jquery.ztree.all-3.5.js" ></script>
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/css/bootstrap.min.css" />
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/script/ztree/zTreeStyle.css" />

	<script type="text/javascript">
		
		$(function(){
			// ========================================== 简单树
			// 对ztree 进行配置 
			var setting = {
				data: {
					simpleData :{
						enable : true // 启用简单数据
					}
				},
				check: {
					enable: true
				},
				
				view: {
					showIcon: false
				},
				callback : {
					onClick : function(event, treeId, treeNode, clickFlag){
						if(treeNode.page != undefined ){
							window.parent.window.setValue(treeNode.page);
						}
					},
					onCheck:onCheck
				}
			};
			
			// 编写节点数据 
			    /* var zNodes = [{"tid":"1", "id":1,"pId":0,"name":"用户管理","page":"","flag":"1"},
				{"id":4,"pId":1,"name":"删除用户","page":"","flag":"1"},
				{"id":2,"pId":0,"name":"权限管理","page":"","flag":"1"},
				{"id":5,"pId":0,"name":"百度","page":"http://www.baidu.com","flag":"1"},
				{"id":6,"pId":0,"name":"网易","page":"http://www.163.com","flag":"1"},
				{"id":7,"pId":0,"name":"主页","page":"${pageContext.request.contextPath}/index.jsp","flag":"1"},
				{"id":3,"pId":1,"name":"尹立新","page":"","flag":"1"}]; */
			var zNodes = <%=treenodes%>;
			// 初始化ztree
			$.fn.zTree.init($("#simpleMenu"), setting, zNodes);
			/* var treeObj=$.fn.zTree.getZTreeObj("simpleMenu");
			treeObj.selectNode(treeObj.getNodeByParam("id",3, true)); */
			// 
			function onCheck(e,treeId,treeNode){
				var menu_ids="";
	            var treeObj=$.fn.zTree.getZTreeObj("simpleMenu"),
	            nodes=treeObj.getCheckedNodes(true);
	            for(var i=0;i<nodes.length;i++){
	            	menu_ids+=","+nodes[i].id;//获取选中节点的值
	            };
	      		document.getElementById("hidden_menuid").value = menu_ids;
	 		};
		});
		
		// 
		$(document).ready(function(){ 
	     	setTimeout('check()',0); //1秒=1000，这里是3秒
	        var treeObj = $.fn.zTree.getZTreeObj("simpleMenu");
	        treeObj.expandAll(true); 
       	});

		// 
		function check(){
	   		var treeObj = $.fn.zTree.getZTreeObj("simpleMenu");
	   		var selectMenuIdLast = document.getElementById("selectMenuIdLast").value;
	    	var selectMenuIdLast_array = selectMenuIdLast.split(",");
	        var nodes = treeObj.getNodes();
	        var nodesLength = treeObj.transformToArray(nodes);
			// 
			for(var i=0; i<nodesLength.length; i++){
				for(var j=0; j<selectMenuIdLast_array.length; j++){
					if(selectMenuIdLast_array[j] == nodesLength[i].id){
						nodesLength[i].checked=true;
						treeObj.updateNode(nodesLength[i]);
					};
				};
			};
			// 
			for(var a=0; a<nodesLength.length; a++){
				treeObj.updateNode(nodes[a]);
			};
		};
		
		// 保存
		function saveMenu(){
			var roleId = document.getElementById("roleId").innerHTML;
            var menu_ids = document.getElementById("hidden_menuid").value;
            if("" == menu_ids){
            	alert("您没做任何操作或者没有选中任何菜单节点，所以无需保存");
            	return;
            }
         	window.location.href="${pageContext.request.contextPath}/sysRoleController/deleteRoleAndFunctionAfterAdd.do?menu_ids="+menu_ids+"&roleId="+roleId;
		};
	</script>

</head>
<body>
	<input type="hidden" id="selectMenuIdLast" value="${selectMenuIdLast }">
	<table class="table table-bordered">
			<thead style="background-color:#abceed">
			<tr align="center" class="listTitle">
				<td style="width:20%;">角色ID</td>
				<td style="width:20%;">角色名称</td>
				<td style="width:20%;">角色代码</td>
				<td style="width:25%;">角色描述</td>
			</tr>
			<tbody align="center">
				<tr>
					<td align="left" id="roleId"> ${sysRole.id }</td>
		    	 	<td align="left"> ${sysRole.name }</td>
		    	 	<td align="left"> ${sysRole.code }</td>
		    	 	<td align="left"> ${sysRole.description }</td>
				</tr>
			</tbody>
		</table>
	<button type="button" class="btn btn-primary" onclick="saveMenu()">保存</button>
	<div>
		<input type="hidden" id="hidden_menuid" value="">
		<!-- 基于简单json数据的菜单 -->
		<ul class="ztree" id="simpleMenu"></ul>
	</div>
</body>
</html>