package com.companyname.userRoleFunction.controller;

import com.aacompanyname.publicUtils.PrintWriterJsonUtils;
import com.companyname.publicbase.service.MapperService;
import com.companyname.userRoleFunction.bean.SysFunction;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/menu")
public class FunctionController{

	@Autowired
	private MapperService mapperService;
	
	
	// 启动时加载菜单信息 
	@RequestMapping("/menuInfo.do")
	public String menuInfo(HttpServletRequest request, HttpServletResponse response){
		String username = request.getParameter("username");
		//通过username 查找 对应的 菜单信息
		String stat = "com.companyname.userRoleFunction.bean.SysFunctionMapper.findrolemenu";
		Map<String, String> map = new HashMap<String, String>();
		map.put("username", username);
		List<SysFunction> sysFunctionlist = mapperService.selectAllObject(stat,map);
		request.setAttribute("sysFunctionlist", sysFunctionlist);
		return "functioninfo";
	}
	
	
	
	// 启动时加载菜单信息 
	@RequestMapping("/findFunction.do")
	public String findFunction(HttpServletRequest request, HttpServletResponse response){
		//单纯查询所有的节点
		String findAllFunction = "com.companyname.userRoleFunction.bean.SysFunctionMapper.findAllFunction";
		List<SysFunction> sysFunctionlist = mapperService.selectAllObject(findAllFunction,null);
		request.setAttribute("sysFunctionlist", sysFunctionlist);
		return "sysfunction/sysfunctionDtree";
	}
	
	
	//toUpdatePage  带着id跳转到修改页面
	@RequestMapping("/toUpdatePage.do")
	public String toUpdatePage(HttpServletRequest request, HttpServletResponse response, Integer id){
		//单纯查询所有的节点
		String toUpdatePage = "com.companyname.userRoleFunction.bean.SysFunctionMapper.toUpdatePage";
		SysFunction sysFunction = mapperService.selectOneObject(toUpdatePage, id);
		request.setAttribute("sysFunction", sysFunction);
		return "sysfunction/toUpdatePage";
	}
	
	
	//countFunction 校验菜单的名称或路径是否存在
	@RequestMapping("/countFunction.do")
	public String countFunction(HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException{
		request.setCharacterEncoding("utf-8");
		String name = request.getParameter("name");
		//单纯查询所有的节点
		String countFunction = "com.companyname.userRoleFunction.bean.SysFunctionMapper.countFunction";
		Map<String, String> map = new HashMap<String, String>();
		map.put("name", name);
		Map<String, Object> countNumMap = mapperService.selectOneMap(countFunction, map);
		Gson gson = new Gson();
		String json = gson.toJson(countNumMap);
		PrintWriterJsonUtils.printWriter(response, json);
		return null;
	}
	
	
	
		//updateFunction 根据id去修改菜单属性值
		@RequestMapping("/updateFunction.do")
		public String updateFunction(HttpServletRequest request, HttpServletResponse response, SysFunction sysFunction) throws UnsupportedEncodingException{
			SimpleDateFormat myFmt2=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String newTime = myFmt2.format(new Date());
			sysFunction.setOperatetime(newTime);
			
			//单纯查询所有的节点
			String updateFunction = "com.companyname.userRoleFunction.bean.SysFunctionMapper.updateFunction";
			mapperService.update(updateFunction, sysFunction);
			return "redirect:findFunction.do";
		}
	
		
		
		// 删除角色  先要校验一下是否有是否有子节点
		@RequestMapping("/deleteFunctionById.do")
		public String delete(HttpServletRequest request, HttpServletResponse response, int id){
			//这个传过来的是  点击父节点时时父节点id   传回来的时子节点时是子节点的id
			String isHaschild = "com.companyname.userRoleFunction.bean.SysFunctionMapper.isHaschild"; //先校验是否有子节点
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("id", id);
			Map<String, Object> isHaschild_map = mapperService.selectOneMap(isHaschild, map);
			Long countNum = (Long) isHaschild_map.get("countNum");
			if(countNum > 0){
				String haschild="yes";
				response.setCharacterEncoding("utf-8");
				response.setContentType("text/html;charset=UTF-8");
				//输出
				try {
					response.getWriter().print(haschild);
				} catch (IOException e) {
					e.printStackTrace();
				}	
				 return null;
			}else{
				String stat_del = "com.companyname.userRoleFunction.bean.SysFunctionMapper.deleteFunctionById";
				SimpleDateFormat myFmt2=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				String newTime = myFmt2.format(new Date());
				map.put("operatetime", newTime);
				map.put("flag", 0);
				mapperService.deleteBatch(stat_del, map);
				return "redirect:findFunction.do";
			}
		}
		
		
		
		//toAddFunction 带着id或父id跳转到添加页面   id或父id一个为空一个不为空
		@RequestMapping("/toAddFunction.do")
		public String toAddFunction(HttpServletRequest request, HttpServletResponse response, Integer id, Integer pid){
			request.setAttribute("id", id);
			request.setAttribute("pid", pid);
			return "sysfunction/toAddFunction";
		}
		
		
		
		//addFunction 添加function
		@RequestMapping("/addFunction.do")
		public String addFunction(HttpServletRequest request, HttpServletResponse response, SysFunction sysFunction) throws UnsupportedEncodingException{
			SimpleDateFormat myFmt2=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String newTime = myFmt2.format(new Date());
			sysFunction.setOperatetime(newTime);
			String addFunction = "com.companyname.userRoleFunction.bean.SysFunctionMapper.addFunction";
			//证明添加的子节点， else是添加同级节点
			if(sysFunction.getId() != null && !"".equals(sysFunction.getId())){
				sysFunction.setPid(sysFunction.getId());
				sysFunction.setId(null);
				sysFunction.setFlag(1);
				mapperService.insert(addFunction, sysFunction);
				return "redirect:findFunction.do";
			}else{
				sysFunction.setFlag(1);
				mapperService.insert(addFunction, sysFunction);
				return "redirect:findFunction.do";
			}
		}
}
