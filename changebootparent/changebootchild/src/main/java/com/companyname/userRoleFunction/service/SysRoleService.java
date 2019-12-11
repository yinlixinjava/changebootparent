package com.companyname.userRoleFunction.service;

import java.util.Map;

public interface SysRoleService {
	void deleteRoleAndFunctionAfterAdd(String statement_role_id1, Integer role_id, String statement_role_id2, Map<String, Object> map);
}
