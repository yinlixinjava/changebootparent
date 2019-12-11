package com.companyname.userRoleFunction.controller;

import com.aacompanyname.publicUtils.MD5keyBean;
import com.aacompanyname.publicUtils.PrintWriterJsonUtils;
import com.companyname.publicbase.service.MapperService;
import com.companyname.userRoleFunction.bean.SysUser;
import com.companyname.userRoleFunction.service.SysUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/login")
public class LoginSystemController {
	@Autowired
	private MapperService mapperService;
	
	@Autowired
	private SysUserService sysUserService;



	/**
	 * yinlixin
	 * 根据用户名去找密码  判断用户名和密码是否正确
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/skipPage.do")
	public String skipPage(HttpServletRequest request, HttpServletResponse response){
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		MD5keyBean m = new MD5keyBean();
		password = m.getkeyBeanofStr(password);
		String json;
		String stat = "com.companyname.userRoleFunction.bean.SysUserMapper.findPassword";
		Map<String,String> map = new HashMap<String,String>();  
		map.put("username",username);  
		SysUser user = mapperService.selectOneObject(stat, map);
		if(user != null){
			String password_find = user.getPassword();
			if(password.equals(password_find)){
				json = "{\"status\":true,\"message\":\"登录成功\",\"username\":\""+user.getUsername()+"\"}";
				request.getSession().setAttribute("username",user.getUsername());
				PrintWriterJsonUtils.printWriter(response, json);
				return null;
			}else{
				json = "{\"status\":false,\"message\":\"密码不符\"}";
				PrintWriterJsonUtils.printWriter(response, json);
				return null;
			}
		}else{
			json = "{\"status\":false,\"message\":\"用户名不存在\"}";
			PrintWriterJsonUtils.printWriter(response, json);
			return null;
		}
	}
	
	
	
	@RequestMapping("/checkpsw.do")
	public @ResponseBody
    Map<String,String> checkpsw(HttpServletRequest request, HttpServletResponse response){
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		MD5keyBean m = new MD5keyBean();
		password = m.getkeyBeanofStr(password);
		Map<String,String> resultMap = new HashMap<String,String>();
		String stat = "com.companyname.userRoleFunction.bean.SysUserMapper.findPassword";
		Map<String,String> map = new HashMap<String,String>();  
		map.put("username",username);  
		SysUser user = mapperService.selectOneObject(stat, map);
		if(user != null){
			String password_find = user.getPassword();
			if(password.equals(password_find)){
				resultMap.put("status", "1");
				resultMap.put("message", "密码检验成功");
				return resultMap;
			}else{
				resultMap.put("status", "0");
				resultMap.put("message", "密码不符");
				return resultMap;
			}
		}else{
			resultMap.put("message", "用户不存在");
			return resultMap;
		}
	}
	
	
	@RequestMapping("/updatepsw.do")
	public @ResponseBody
    Map<String,String> updatepsw(HttpServletRequest request, HttpServletResponse response){
		String username = request.getParameter("username");
		String password = request.getParameter("pwd_new");
		MD5keyBean m = new MD5keyBean();
		password = m.getkeyBeanofStr(password);
		Map<String,String> resultMap = new HashMap<String,String>();
		Map<String,String> map = new HashMap<String,String>();  
		map.put("username",username);  
		map.put("password",password);
		int result = sysUserService.updatepwd(map);
		if(result == 1){
			resultMap.put("status", "1");
			resultMap.put("message", "密码修改成功");
			return resultMap;
		}else{
			resultMap.put("status", "0");
			resultMap.put("message", "密码修改失败");
			return resultMap;
		}
	}

	@RequestMapping("/welcome.do")
	public String welcome(HttpServletRequest request, HttpServletResponse response){
		System.out.println(11111232);
		return "myindex";
	}


	@RequestMapping("/defaultHtml.do")
	public String defaultHtml(HttpServletRequest request, HttpServletResponse response){
		System.out.println(123456);
		return "welcome";
	}
}
