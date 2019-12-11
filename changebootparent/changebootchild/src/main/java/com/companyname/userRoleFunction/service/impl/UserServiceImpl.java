package com.companyname.userRoleFunction.service.impl;

import com.companyname.publicbase.dao.MapperDao;
import com.companyname.userRoleFunction.bean.SysUser;
import com.companyname.userRoleFunction.service.SysUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@Repository
public class UserServiceImpl implements SysUserService {
	@Autowired
	public MapperDao mapperDao;


	@Transactional
	@Override
	public void deleteUserAndRoleRelationship(String deteleUser, String deteleRelationship, Map<String, Object> map) {
		//删除用户表
		mapperDao.deleteBatch(deteleUser, map);
		
		//删除用户角色关联表
		mapperDao.deleteBatch(deteleRelationship, map);
	}

	/**
	 * 添加用户和角色之间的关系
	 */
	@Transactional
	@Override
	public void addUserAndRoleRelationship(String addUser, String addUserAndRoleRelationship, SysUser sysuser, Map<String, Object> map) {
		//新增一个用户
		mapperDao.insert(addUser, sysuser);
		//增加用户和角色之间的关系
		map.put("user_id", sysuser.getId());
		mapperDao.insert(addUserAndRoleRelationship, map);
	}

	@Transactional
	@Override
	public void updateUserAndRoleRelationship(String updateUser, String deteleUserAndRoleRelationship,
                                              String insertUserAndRoleRelationship, SysUser sysuser, Map<String, Object> map) {
		
		//单纯修改用户信息
		mapperDao.update(updateUser, sysuser);
		
		mapperDao.deleteBatch(deteleUserAndRoleRelationship, map);
		mapperDao.insert(insertUserAndRoleRelationship, map);
		
		
	}

	@Transactional
	@Override
	public int updatepwd(Map<String, String> mapParam) {
		int result = mapperDao.update("com.companyname.userRoleFunction.bean.SysUserMapper.updatepwd", mapParam);
		return result;
	}
}
