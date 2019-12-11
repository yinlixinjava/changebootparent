<%@tag pageEncoding="UTF-8"%>
<%@attribute name="page" required="true" type="com.github.pagehelper.Page"%>



<ul class="pager">
  <li id="pageNo">当前第<%=page.getPageNum()%>页</li>
<% 
	if(page.getPageNum() != 1 && page.getPages()!=0){
%>
	<li ><a onclick="prePage()" id="prePage" style="cursor:pointer">上一页</a></li>
<%
	}
%>
<% 
	if(page.getPageNum() != page.getPages() && page.getPages()!=0 ){
%>
	<li ><a onclick="nextPage()" id="nextPage" style="cursor:pointer">下一页 </a></li>
<%
	}
%>
  <li>共<%=page.getPages()%>页</li>
</ul> 
<form action="" method="post" id="pagefrom">
  <input type="hidden" id="pageNum" value="<%=page.getPageNum()%>" name="pageNum"/>
</form>
<script type="text/javascript">
	var url = location.href;
	var flag = 1;
	document.getElementById("pagefrom").action=url;
	function prePage(){
		if(flag==1){
			var pageNo=document.getElementById("pageNum").value;
			document.getElementById("pageNum").value=parseInt(pageNo)-1;
			document.getElementById("pagefrom").submit();
			flag=2;
		}
		
	}
	function nextPage(){
		if(flag==1){
			var pageNo=document.getElementById("pageNum").value;
			document.getElementById("pageNum").value=parseInt(pageNo)+1;
			document.getElementById("pagefrom").submit();
			flag=2;
		}
		
	}
</script>
