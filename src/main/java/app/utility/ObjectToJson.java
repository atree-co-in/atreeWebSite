package app.utility;

import java.util.List;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class ObjectToJson {
	
	public String ObjToJson(List<Object> obj)
	{
	    GsonBuilder builder = new GsonBuilder(); 
	    builder.setPrettyPrinting(); 
	    Gson gson = builder.create();
	    String jsonString = gson.toJson(obj); 
	    return jsonString;
	}
}
