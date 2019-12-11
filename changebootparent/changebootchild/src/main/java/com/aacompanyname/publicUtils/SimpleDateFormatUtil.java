package com.aacompanyname.publicUtils;

import java.text.SimpleDateFormat;
import java.util.Date;

public class SimpleDateFormatUtil {
	public static String format(Date date){
		SimpleDateFormat myFmt2=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String result = myFmt2.format(date);
		return result;
	}
	
	
	
	
}
