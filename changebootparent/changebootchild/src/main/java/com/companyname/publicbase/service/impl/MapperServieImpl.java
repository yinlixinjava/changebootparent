package com.companyname.publicbase.service.impl;

import com.companyname.publicbase.dao.MapperDao;
import com.companyname.publicbase.service.MapperService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class MapperServieImpl implements MapperService {

	@Autowired
	private MapperDao mapperDao;
	
	@Override
	public int insert(String statement,Object entity) {

		return mapperDao.insert(statement,entity);
	}
	
	
	@Override
	public int deleteBatch(String statement, Object ob) {
		
		return mapperDao.deleteBatch(statement,ob);
	}

	
	@Override
	public int update(String statement, Object ob) {

		return mapperDao.update(statement, ob);
	}
	
	@Override
	public Map<String, Object> selectOneMap(String statement, Object ob) {
		return mapperDao.selectOneMap(statement, ob);
	}
	
	@Override
	public <T> T selectOneObject(String statement, Object ob) {
		return mapperDao.selectOneObject(statement, ob);
	}
	
	@Override
	public List<Map<String, Object>> selectAllMap(String statement, Object ob) {
		return mapperDao.selectAllMap(statement, ob);
	}

	@Override
	public <E> List<E> selectAllObject(String statement, Object ob) {
		return mapperDao.selectAllObject(statement, ob);
	}
	
	@SuppressWarnings({"rawtypes"})
	@Override
	public List pageQuery(String statement, Object ob,int pageNum,int pageSize) {
		List list = mapperDao.pageQuery(statement, ob, pageNum, pageSize);
		return list;
	}

}
