package com.companyname.userRoleFunction.controller;

import com.companyname.publicbase.service.MapperService;
import com.companyname.userRoleFunction.bean.SysFunction;
import com.companyname.userRoleFunction.bean.SysRole;
import com.companyname.userRoleFunction.service.SysRoleService;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
@RequestMapping("/sysRoleController")
public class SysRoleController {
	@Autowired
	private MapperService mapperService;
	
	@Autowired
	private SysRoleService sysRoleService;
		// 启动时加载菜单信息 yinlixin
		@RequestMapping("/findRole.do")
		public String findRole(HttpServletRequest request, HttpServletResponse response){
			int pageNum = 1;//开始页面
			int pageSize = 10;//页面长度
			if(request.getParameter("pageNum")!=null){
				pageNum = Integer.parseInt((String) request.getParameter("pageNum"));
			}
			//单纯查询所有的用户
			String statement = "com.companyname.userRoleFunction.bean.SysRoleMapper.findRole";
			List<SysRole> sysRoleList = mapperService.pageQuery(statement, null, pageNum, pageSize);
			request.setAttribute("sysRoleList", sysRoleList);
			return "sysrole/sysRoleList";
		}
		
		//删除一个角色，其实就是将其状态flag改为0    yinlixin
		@RequestMapping("/sysRoleDelete.do")
		public String sysRoleDelete(HttpServletRequest request, HttpServletResponse response, SysRole sysRole){
			
			//单纯查询所有的用户
			String statement = "com.companyname.userRoleFunction.bean.SysRoleMapper.sysRoleDelete";
			SimpleDateFormat myFmt2=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String newTime = myFmt2.format(new Date());
			sysRole.setOperatetime(newTime);
			sysRole.setFlag(0);
			mapperService.deleteBatch(statement, sysRole);
			return "redirect:findRole.do";
		}
		
		
		//携带者id  如果id为空那么说明是过来增加的，如果不为空是修改的    yinlixin
		@RequestMapping("/toRoleAddOrUpdate.do")
		public String toRoleAddOrUpdate(HttpServletRequest request, HttpServletResponse response, SysRole sysRole){
			request.setAttribute("sysRole", sysRole);
			return "sysrole/roleAddOrUpdate";
		}
		
		
		
		@RequestMapping("/roleAddOrUpdate.do")
		public String roleAddOrUpdate(HttpServletRequest request, HttpServletResponse response, SysRole sysRole){
			SimpleDateFormat myFmt2=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String newTime = myFmt2.format(new Date());
			sysRole.setOperatetime(newTime);
			//添加role
			if(sysRole.getId()==null || "".equals(sysRole.getId())){
				String addRole = "com.companyname.userRoleFunction.bean.SysRoleMapper.addRole";
				mapperService.insert(addRole, sysRole);
				return "redirect:findRole.do";
			}else{//修改role
				String updateRole = "com.companyname.userRoleFunction.bean.SysRoleMapper.updateRole";
				mapperService.update(updateRole, sysRole);
				return "redirect:findRole.do";
			}
		}
		
		
		
		//
		
		//yinlixin  树和角色关联
		@RequestMapping("/toSysRoleAndTree.do")
		public String toSysRoleAndTree(HttpServletRequest request, HttpServletResponse response, Integer id){
			/*String stat = "com.yksStore.model.role.toTree";
			List<Map<String, Object>> list_tree = baseService.selectAll(stat, null);*/
			
			String findRoleByid = "com.companyname.userRoleFunction.bean.SysRoleMapper.findRoleByid";
			SysRole sysRole = mapperService.selectOneObject(findRoleByid, id);
			request.setAttribute("sysRole", sysRole);
			
			//单纯查询所有的节点
			String findAllFunction = "com.companyname.userRoleFunction.bean.SysFunctionMapper.findAllFunction";
			List<SysFunction> sysFunctionlist = mapperService.selectAllObject(findAllFunction,null);
			
			Gson gson = new Gson();
			String treenodes = gson.toJson(sysFunctionlist);
			String treenodes1 = treenodes.replaceAll("pid", "pId");
			request.setAttribute("treenodes", treenodes1);
			
			/*String stat_roleSelectTree = "com.yksStore.model.role.roleSelectTree";
			Map roleSelectTree_map = new HashMap();
			String role_id = (String) request.getSession().getAttribute("role_id");
			roleSelectTree_map.put("role_id", role_id);
			List<Map<String, Object>> roleSelectTree = baseService.selectAll(stat_roleSelectTree, roleSelectTree_map);*/
			
			String roleAndMenuByRoleId = "com.companyname.userRoleFunction.bean.SysRoleFunctionMapper.roleAndMenuByRoleId";
			List<Map<String, Object>> roleSelectTree = mapperService.selectAllMap(roleAndMenuByRoleId, id);
			String selectMenuId = "";
			if(roleSelectTree != null){
				for (int i = 0; i < roleSelectTree.size(); i++) {
					selectMenuId += "," + roleSelectTree.get(i).get("MENU_ID");
				}
			}
			String selectMenuIdLast = selectMenuId.replaceFirst(",", "");
			request.setAttribute("selectMenuIdLast", selectMenuIdLast);
			System.out.println(selectMenuIdLast);
			
			return "sysrole/sysRoleAndTree";
		}
		
		
		
		
		@RequestMapping("/deleteRoleAndFunctionAfterAdd.do")
		public String deleteRoleAndFunctionAfterAdd(HttpServletRequest request, HttpServletResponse response, Integer roleId, String menu_ids){
			/*SimpleDateFormat myFmt2=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String newTime = myFmt2.format(new Date());
			sysRole.setOperatetime(newTime);
			//添加role
			if(sysRole.getId()==null || "".equals(sysRole.getId())){
				String addRole = "com.companyname.userRoleFunction.bean.SysRoleMapper.addRole";
				mapperService.insert(addRole, sysRole);
				return "redirect:findRole.do";
			}else{//修改role
				String updateRole = "com.companyname.userRoleFunction.bean.SysRoleMapper.updateRole";
				mapperService.update(updateRole, sysRole);
				return "redirect:findRole.do";
			}*/
			
			String deleteFunctionByRoleId = "com.companyname.userRoleFunction.bean.SysRoleFunctionMapper.deleteFunctionByRoleId";
			String addFunctionIdAndRoleId = "com.companyname.userRoleFunction.bean.SysRoleFunctionMapper.addFunctionIdAndRoleId";
			String functionIds = menu_ids.replaceFirst(",", "");
			
			String[] functionIds_string =functionIds.split(",");
			List<Integer> functionIds_list = new ArrayList<Integer>();
	        for(int i=0;i<functionIds_string.length;i++){  
	        	functionIds_list.add(Integer.valueOf(functionIds_string[i]));  
	        } 
			//第一部先删除--------第二部先再添加
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("role_id", roleId);
			map.put("functionIds_list", functionIds_list);
			sysRoleService.deleteRoleAndFunctionAfterAdd(deleteFunctionByRoleId, roleId, addFunctionIdAndRoleId, map);
			return "redirect:findRole.do";
		}
			
			
}
