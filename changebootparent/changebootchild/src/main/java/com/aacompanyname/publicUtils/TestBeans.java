package com.aacompanyname.publicUtils;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class TestBeans {
	public static void main(String[] args) {
		ApplicationContext context = new ClassPathXmlApplicationContext("classpath:applicationContext.xml");
		String[] names = context.getBeanDefinitionNames();
		for (int i = 0; i < names.length; i++) {
			System.out.println(names[i].toString());
		}
	}
}
