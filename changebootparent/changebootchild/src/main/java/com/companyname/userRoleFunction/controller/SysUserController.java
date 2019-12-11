package com.companyname.userRoleFunction.controller;
import com.aacompanyname.publicUtils.MD5keyBean;
import com.aacompanyname.publicUtils.PrintWriterJsonUtils;
import com.companyname.publicbase.service.MapperService;
import com.companyname.userRoleFunction.bean.SysRole;
import com.companyname.userRoleFunction.bean.SysUser;
import com.companyname.userRoleFunction.service.SysUserService;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
@RequestMapping("/sysUserController")
public class SysUserController {
	@Autowired
	private MapperService mapperService;
	
	@Autowired
	private SysUserService sysUserService;
	
	
	/**
	 * @author lixin
	 * @param request
	 * @param response
	 * @return
	 * 
	 */
	// 启动时加载菜单信息 
	@RequestMapping("/findUser.do")
	public String findUser(HttpServletRequest request, HttpServletResponse response){
		int pageNum = 1;//开始页面
		int pageSize = 10;//页面长度
		if(request.getParameter("pageNum")!=null){
			pageNum = Integer.parseInt((String) request.getParameter("pageNum"));
		}
		//单纯查询所有的用户
		String statement = "com.companyname.userRoleFunction.bean.SysUserMapper.findUser";
		List<SysUser> sysUserList = mapperService.pageQuery(statement, null, pageNum, pageSize);
		request.setAttribute("sysUserList", sysUserList);
		return "sysuser/sysUserList";
	}

	
	
	
	//跳转到新加页面   yinlixin
	@RequestMapping("/addToPage.do")
	public String add(HttpServletRequest request, HttpServletResponse response){
		//单纯查询所有的用户
		String statement = "com.companyname.userRoleFunction.bean.SysRoleMapper.findRole";
		List<SysRole> sysRoleList = mapperService.selectAllObject(statement, null);
		request.setAttribute("sysRoleList", sysRoleList);
		return "sysuser/addUserPage";
	}
	
	
	
	
	//删除账号
	@RequestMapping("/deteleUser.do")
	public String deleteUser(HttpServletRequest request, HttpServletResponse response, int id){
		//删除用户表
		String deteleUser = "com.companyname.userRoleFunction.bean.SysUserMapper.updateByPrimaryKey";
		//删除用户角色关联表
		String deteleRelationship="com.companyname.userRoleFunction.bean.SysUserRoleMapper.deleteByPrimaryKey";
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("id", id);
		SimpleDateFormat myFmt2=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String newTime = myFmt2.format(new Date());
		map.put("newTime", newTime);
		
		sysUserService.deleteUserAndRoleRelationship(deteleUser, deteleRelationship, map);
		return "redirect:findUser.do";
	}
	
		//校验用户名是否存在
		@RequestMapping("/countUser.do")
		public String countUser(HttpServletRequest request, HttpServletResponse response, String username){
			//单纯查询所有的用户
			String statement = "com.companyname.userRoleFunction.bean.SysUserMapper.countUser";
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("username", username);
			Map<String, Object> userCountMap = mapperService.selectOneMap(statement, map);
			Gson gson = new Gson();
			String json = gson.toJson(userCountMap);
			PrintWriterJsonUtils.printWriter(response, json);
			return null;
		}
	
		
		
		//校验手机号是否存在
		@RequestMapping("/countTelephone.do")
		public String countTelephone(HttpServletRequest request, HttpServletResponse response, String telephone){
			//单纯查询所有的用户
			String statement = "com.companyname.userRoleFunction.bean.SysUserMapper.countTelephone";
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("telephone", telephone);	
			Map<String, Object> userCountMap = mapperService.selectOneMap(statement, map);
			Gson gson = new Gson();
			String json = gson.toJson(userCountMap);
			PrintWriterJsonUtils.printWriter(response, json);
			return null;
		}
	
	
	
	
		//跳转到新加页面   yinlixin
		@RequestMapping("/addUserAndRoleRelationship.do")
		public String addUserAndRoleRelationship(HttpServletRequest request, HttpServletResponse response, SysUser sysuser, Integer[] roles){
			SimpleDateFormat myFmt2=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String newTime = myFmt2.format(new Date());
			sysuser.setCreatetime(newTime);
			sysuser.setPassword(new MD5keyBean().getkeyBeanofStr("123456"));
			//添加用户
			String addUser = "com.companyname.userRoleFunction.bean.SysUserMapper.addUser";
			//添加用户与角色之间的关系
			String addUserAndRoleRelationship = "com.companyname.userRoleFunction.bean.SysUserRoleMapper.addUserAndRoleRelationship";
			//String[] role_id = request.getParameterValues("roles");
			List<Integer> role_id_list = Arrays.asList(roles);
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("role_id_list", role_id_list);
			sysUserService.addUserAndRoleRelationship(addUser, addUserAndRoleRelationship, sysuser, map);
			return "redirect:findUser.do";
		}
		
		
		
		
		//跳转到新加页面   yinlixin
		@RequestMapping("/updateToPage.do")
		public String updateToPage(HttpServletRequest request, HttpServletResponse response, int id, String telephone, String remark, String username){
			//单纯查询所有的用户
			String statement = "com.companyname.userRoleFunction.bean.SysRoleMapper.findRole";
			List<SysRole> sysRoleList = mapperService.selectAllObject(statement, null);
			request.setAttribute("sysRoleList", sysRoleList);
			
			//需要查询出已经选择的角色，在前面的checkbox展示出来  根据用户id去查被分配的角色
			String findRoleByUserId = "com.companyname.userRoleFunction.bean.SysRoleMapper.findRoleByUserId";
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("id", id);
			List<Integer> sysRoleListIdByUserIdAll = mapperService.selectAllObject(findRoleByUserId, id);
			String sysRoleListIdByUserIdTemp = "";
			for (int i = 0; i < sysRoleListIdByUserIdAll.size(); i++) {
				sysRoleListIdByUserIdTemp += ","+sysRoleListIdByUserIdAll.get(i);
			}
			String sysRoleListIdByUserId = sysRoleListIdByUserIdTemp;
			request.setAttribute("sysRoleListIdByUserId", sysRoleListIdByUserId);
			request.setAttribute("userId", id);
			request.setAttribute("telephone", telephone);
			request.setAttribute("remark", remark);
			request.setAttribute("username", username);
			return "sysuser/updateUserPage";
		}
		
		
		
		
		//跳转到新加页面   yinlixin
		@RequestMapping("/updateUserAndRoleRelationship.do")
		public String updateUserAndRoleRelationship(HttpServletRequest request, HttpServletResponse response, SysUser sysuser, Integer[] roles, Integer userId){
			
			
			//修改本身用户
			String updateUser = "com.companyname.userRoleFunction.bean.SysUserMapper.updateUser";
			
			//删除用户与角色之间的关系
			String deteleUserAndRoleRelationshipByUserId = "com.companyname.userRoleFunction.bean.SysUserRoleMapper.deteleUserAndRoleRelationshipByUserId";
			
			//重新添加添加用户与角色之间的关系
			String addUserAndRoleRelationship = "com.companyname.userRoleFunction.bean.SysUserRoleMapper.addUserAndRoleRelationship";
			
			List<Integer> role_id_list = Arrays.asList(roles);
			
			sysuser.setId(userId); //mapperDao.update(updateUser, sysuser);
			SimpleDateFormat myFmt2=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String newTime = myFmt2.format(new Date());
			sysuser.setCreatetime(newTime);
			
			Map<String, Object> map = new HashMap<String, Object>();
			
			map.put("role_id_list", role_id_list);//role_id_list给这个方法用mapperDao.insert(insertUserAndRoleRelationship, map)
			map.put("user_id", userId);//user_id给mapperDao.insert(insertUserAndRoleRelationship, map)和mapperDao.deleteBatch(deteleUserAndRoleRelationship, map)方法用
			
			sysUserService.updateUserAndRoleRelationship(updateUser, deteleUserAndRoleRelationshipByUserId, addUserAndRoleRelationship, sysuser, map);
			return "redirect:findUser.do";
		}

}
