package com.aacompanyname.publicUtils;


import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class PrintWriterJsonUtils {
	public static void printWriter(HttpServletResponse response, String json) {
		response.setContentType("application/json;charset=utf-8");
		PrintWriter out;
		try {
			out = response.getWriter();
			out.write(json);
			out.flush();
			out.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}
}
