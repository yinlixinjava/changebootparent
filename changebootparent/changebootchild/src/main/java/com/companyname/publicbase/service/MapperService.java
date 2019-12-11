package com.companyname.publicbase.service;

import java.util.List;
import java.util.Map;

/**
 * @think 写公共的baseService，以后就不用写每个dao和service了
 * 		    两种形式，第一 map形式     第二对象形式  每个方法都有着两种形式
 * @author yinlixin
 *
 */
public interface MapperService {
	//插入 按照对象进行插入
	public int insert(String statement, Object entity);	//包含了map和对象两种
	
	//批量删除  一般是多选删除
	public int deleteBatch(String statement, Object ob);	//包含了map和对象两种
	
	//修改 按照条件进行修改
	public int update(String statement, Object ob);	//包含了map和对象两种
	
	//查询一条 返回Map
	public Map<String, Object> selectOneMap(String statement, Object ob);//包含了map和对象两种
	
	//查询一条 返回对象
	public <T> T selectOneObject(String statement, Object ob);
	
	//查询多条   不分页map
	public List<Map<String,Object>> selectAllMap(String statement, Object ob);
	
	//查询多条   不分页对象类型
	public <E> List<E> selectAllObject(String statement, Object ob);
	
	//分页查询
	@SuppressWarnings("rawtypes")
	public List pageQuery(String statement, Object ob, int pageNum, int pageSize);
}
