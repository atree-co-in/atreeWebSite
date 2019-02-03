package app.controller;


import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import app.service.BaseService;
import app.utility.ATableParamBean;

@RestController
public class TableDisplayController {

    @Autowired
	BaseService obj;
    
	@RequestMapping(value = "/getTableData", method = RequestMethod.GET)//MediaType.APPLICATION_JSON_UTF8_VALUE)
	public void getTableData(@ModelAttribute ATableParamBean tblParam, HttpServletResponse res) throws Exception   {
		String returnString = null;
			returnString = obj.runQuery(tblParam);
			res.getWriter().println(returnString);
	}
}
