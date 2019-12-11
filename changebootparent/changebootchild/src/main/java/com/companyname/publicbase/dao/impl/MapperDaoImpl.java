package com.companyname.publicbase.dao.impl;

import com.companyname.publicbase.dao.MapperDao;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class MapperDaoImpl implements MapperDao {

	@Autowired
	SqlSessionTemplate sqlSessionTemplate;

	@Override
	public int insert(String statement,Object entity) {

		return sqlSessionTemplate.insert(statement,entity);
	}
	
	
	@Override
	public int deleteBatch(String statement, Object ob) {
		
		return sqlSessionTemplate.delete(statement,ob);
	}

	
	@Override
	public int update(String statement, Object ob) {

		return sqlSessionTemplate.update(statement, ob);
	}

	
	@SuppressWarnings("unchecked")
	@Override
	public Map<String, Object> selectOneMap(String statement, Object ob) {
		/*if(this.getSqlSession().selectOne(statement, ob)==null){
			return null;
		}else{
			return (Map<String, Object>) this.getSqlSession().selectOne(statement, ob);
		}*/
		return (Map<String, Object>) sqlSessionTemplate.selectOne(statement, ob);
	}
	
	@Override
	public <T> T selectOneObject(String statement, Object ob) {
		return sqlSessionTemplate.selectOne(statement, ob);
	}
	
	@Override
	public List<Map<String, Object>> selectAllMap(String statement, Object ob) {
		return sqlSessionTemplate.selectList(statement, ob);
	}

	@Override
	public <E> List<E> selectAllObject(String statement, Object ob) {
		return sqlSessionTemplate.selectList(statement, ob);
	}
	
	@SuppressWarnings({ "rawtypes"})
	@Override
	public List pageQuery(String statement, Object ob,int pageNum,int pageSize) {
		int limit,offset;
		if(pageSize==0){
			offset = 10;
		}else{
			offset = pageSize;
		}
		limit = pageNum;
		PageHelper.startPage(limit, offset);
		//List list = this.getSqlSession().selectList(statement, ob,new RowBounds(limit, offset));
		List list = sqlSessionTemplate.selectList(statement, ob);
		PageInfo page = new PageInfo(list);
		return list;
	}

}
