<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" errorPage="../error.jsp" 
import="java.util.List, java.util.ArrayList,com.companyname.userRoleFunction.bean.SysFunction"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>


<!-- sysFunctionlist -->
<html>
<head>
	<title> 菜单列表 </title>
  	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  	<meta http-equiv="Pragma" content="no-cache">
  	<meta http-equiv="Cache-Control" content="no-cache">
  	<meta http-equiv="Expires" content="0">
  	<link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/css/list.css">
  	<link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/css/tabletree/tabletree4j.css" />
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/bootstrap.min.css" />
	<script type="text/javascript" src="${pageContext.request.contextPath }/js/jquery-1.6.1.min.js"></script>
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/yksStore.css" />
  	<script src="${pageContext.request.contextPath}/script/uitis/sys/menu.js"></script>
	<script src="${pageContext.request.contextPath}/script/TableTree4j.js"></script>
	<script src="${pageContext.request.contextPath}/script/uitis.js"></script>
</head>

<body>
	<div class="page-head" style="padding-top:7px;padding-left:5px;"><span >系统管理&nbsp;>&nbsp;菜单信息</span></div>
	<div id="menuTableTreeContainer" class="clear"></div>
	
	<!-- 有时间将这段代码改为c标签的，js写java这样写不太规范 -->
	
	<script type="text/javascript">
		var gridTree;
		(function(ctx){
			gridTree=new TableTree4J("gridTree",'${pageContext.request.contextPath}/css/tabletree/');
			gridTree.config.rootNodeBtn=false;
			gridTree.tableDesc='<table width="100%">';
		
			//var headerDataList=new Array('节点名称','节点路径','起停状态','操作');
			var headerDataList=new Array('节点名称','节点路径','节点代码','操作');
			var widthList=new Array("20%","20%","20%","20%","20%");
			//参数: arrayHeader,id,headerWidthList,booleanOpen,classStyle,hrefTip,hrefStatusText,icon,iconOpen
			gridTree.setHeader(headerDataList,'rootparent',widthList,true,"GridHead",null,null,"","");				
			//设置列样式
			gridTree.gridHeaderColStyleArray=new Array("","centerClo","centerClo","centerClo");
			gridTree.gridDataCloStyleArray=new Array("","gridtHeightTdLeft","gridtHeightTd","gridtHeightTd");
			<%
		  	int id = 0;
			int pid = 0;
			String name = "";
			String pageUrl = ""; 
			String code = "";
			int flag = 0;
			
			SysFunction sysFunction;
			String parent_id_string = "";
			
			List<SysFunction> sysFunctionlist = (List<SysFunction>)request.getAttribute("sysFunctionlist");
			for (int i=0, len=sysFunctionlist.size(); i<len; i++) {
				sysFunction = sysFunctionlist.get(i);
			    id = sysFunction.getId();
				pid = sysFunction.getPid();
				code = sysFunction.getCode();
				if(pid == 0){
					parent_id_string = "rootparent";
				}else{
					parent_id_string = ""+pid;
				}
				name = sysFunction.getName();
				pageUrl = sysFunction.getPage();
			%>
			var operatecodes = "";
			if("rootparent" == "<%=parent_id_string%>"){
			 operatecodes = '<a href="${pageContext.request.contextPath}/menu/toUpdatePage.do?id=<%=id%>">修改</a>'
							+ ' | <a href="javascript:deleteFunctionById(<%=id%>);">删除</a>'
							+ ' | <a href="${pageContext.request.contextPath}/menu/toAddFunction.do?id=<%=id%>" >添加子菜单</a>'
							+ ' | <a href="${pageContext.request.contextPath}/menu/toAddFunction.do?pid=<%=pid%>">添加同级菜单</a>';
			}else{
				operatecodes = '<a href="${pageContext.request.contextPath}/menu/toUpdatePage.do?id=<%=id%>">修改</a>'
				+ ' | <a href="javascript:deleteFunctionById(<%=id%>);">删除</a>';
			}
			<%--//var dataList=new Array("<%=menu_name%>","<%=link_url%>","<%=activeStatus_string%>",operatecodes);--%>			
 			var dataList=new Array("<%=name%>","<%=pageUrl%>","<%=code%>",operatecodes);
			var dataResList = new Array("<%=id%>","<%=pageUrl%>","<%=code%>","<%=parent_id_string%>");
			gridTree.addGirdNode(dataList,'<%=id%>','<%=parent_id_string%>',true,1,'','_blank','','','gridtHeight',null,null,dataResList);
			<%
				}
			%>	
			gridTree.printTableTreeToElement("menuTableTreeContainer");
			})();
	
	
	//首先校验一下是否有子节点，如果有先给人家提示，先删除子节点再能删除父节点
	function deleteFunctionById(id){
		var gnl=confirm("此条数据若被删除不能恢复，你真的确定要删除吗?");   
		if (gnl==true){  
			$.ajax({
		        url : '${pageContext.request.contextPath }/menu/deleteFunctionById.do',
		        data : {id:id},
		        type : 'post',
		        dataType : 'text',
		        success : function(data) {
		            if ('yes' == data) {
		                alert("请先删除子菜单！");
		            }else {
		            	window.location.reload();
		            }
		        },
		        error : function() {
			       alert("服务器错误，校验是否含有子节点失败-----") 
		        }
		    }); 
		} 
	}
	</script>
</body>
</html>
