package com.companyname.userRoleFunction.service.impl;

import com.companyname.publicbase.dao.MapperDao;
import com.companyname.userRoleFunction.service.SysRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Repository
public class SysRoleServiceImpl implements SysRoleService {
	@Autowired
	public MapperDao mapperDao;

	@Override
	public void deleteRoleAndFunctionAfterAdd(String statement_role_id1, Integer role_id, String statement_role_id2, Map<String, Object> map) {
		
		mapperDao.deleteBatch(statement_role_id1, role_id);
		
		mapperDao.insert(statement_role_id2, map);
		
	}
	
	
}
