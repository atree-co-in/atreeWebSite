package app.utility;

public class CreateAdditionalQueryString {
	public String getAdditionalQueryString(ATableParamBean tblBean)
	{
		String extraString="";
		if(tblBean.getWhere() != null && !tblBean.getWhere().isEmpty())
		{
			extraString=" where "+tblBean.getWhere();
		}
		if(tblBean.getOrderBy() != null && !tblBean.getOrderBy().isEmpty())
		{
			extraString=extraString+" order by "+tblBean.getOrderBy() +" " + tblBean.getOrderType();
		}
		if(tblBean.getItems() != null && !tblBean.getItems().isEmpty() )
		{
			if( tblBean.getPage() != null && !tblBean.getPage().isEmpty())
			{
				int pgNum = Integer.parseInt(tblBean.getPage());
				int items = Integer.parseInt(tblBean.getItems());
				int offset=items * (pgNum - 1);
				extraString=extraString+" LIMIT "+offset+" , "+tblBean.getItems();
				
			}
			else
			{
				extraString=extraString+" LIMIT "+tblBean.getItems();
			}
		}		
		return extraString;		
	}
}
