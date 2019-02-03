package app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import app.dao.DaoLayerForTable;
import app.utility.ATableParamBean;
import app.utility.CreateAdditionalQueryString;
import app.utility.ObjectToJson;

@Service
public class BaseService {
	
	@Autowired
	DaoLayerForTable dao;
	
	CreateAdditionalQueryString addStringObj=new CreateAdditionalQueryString();
	ObjectToJson gsonObj = new ObjectToJson();
	
	public String runQuery(ATableParamBean tblParam) throws Exception
	{
        String addStr =	addStringObj.getAdditionalQueryString(tblParam);
		StockHisRowMapper rowMap=new StockHisRowMapper();
		List<Object> tableBody = dao.runSelectQuery("select * from stockhistorytable " + addStr, rowMap);
		//List<Object> tableHeader = 
		String returnString = gsonObj.ObjToJson(tableBody);
		return returnString;
	}
	
	
}
