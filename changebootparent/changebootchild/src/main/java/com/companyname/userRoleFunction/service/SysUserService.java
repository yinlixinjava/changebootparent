package com.companyname.userRoleFunction.service;

import com.companyname.userRoleFunction.bean.SysUser;

import java.util.Map;

public interface SysUserService {
	/**
	 * 删除用户和用户与角色的关系
	 */
	public void deleteUserAndRoleRelationship(String deteleUser, String deteleRelationship, Map<String, Object> map);

	public void addUserAndRoleRelationship(String addUser, String addUserAndRoleRelationship, SysUser sysuser, Map<String, Object> map);

	public void updateUserAndRoleRelationship(String updateUser, String deteleUserAndRoleRelationship,
                                              String insertUserAndRoleRelationship, SysUser sysuser, Map<String, Object> map);
	
	public int updatepwd(Map<String, String> mapParam);
}
