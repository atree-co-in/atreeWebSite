package app.dao;
import java.util.List;

import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.jdbc.core.RowMapper;



public class DaoLayerForTable extends BaseDao{
/*	JdbcTemplate template;  
	  
	public void setTemplate(JdbcTemplate template) {  
	    this.template = template;  
	}  
	*/
	
	public List<Object> runSelectQuery(String query, ResultSetExtractor rowMapper) throws Exception
	{
		return (List<Object>) template.query(query, rowMapper); 
	}
	

}
