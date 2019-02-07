package app.service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;

import app.dto.StockHistory;

public class StockHisRowMapper implements ResultSetExtractor {

/*
	@Override
	public Object mapRow(ResultSet rs, int arg1) throws SQLException {
		// TODO Auto-generated method stub
		if (arg1 == 0) {
			StockHistory he = new StockHistory();
			System.out.println(rs.getMetaData().getColumnName(1) + rs.getMetaData().getColumnTypeName(1));
			he.setSTOCKNAME(rs.getMetaData().getColumnName(1) + "," + rs.getMetaData().getColumnTypeName(1));
			he.setPDATE(rs.getMetaData().getColumnName(2) + "," + rs.getMetaData().getColumnTypeName(2));
			he.setVOLUME(rs.getMetaData().getColumnName(3) + "," + rs.getMetaData().getColumnTypeName(3));
			he.setCLOSEPRICE(rs.getMetaData().getColumnName(4) + "," + rs.getMetaData().getColumnTypeName(4));
			he.setADJCLOSE(rs.getMetaData().getColumnName(5) + "," + rs.getMetaData().getColumnTypeName(5));
			he.setHIGHPRICE(rs.getMetaData().getColumnName(6) + "," + rs.getMetaData().getColumnTypeName(6));
			return he;
		}

		StockHistory e = new StockHistory();
		e.setSTOCKNAME(rs.getString(1));
		e.setPDATE(rs.getString(2));
		e.setVOLUME(rs.getString(3));
		e.setCLOSEPRICE(rs.getString(4));
		e.setADJCLOSE(rs.getString(5));
		e.setHIGHPRICE(rs.getString(6));
		return e;
	}*/


	public Object extractData(ResultSet rs) throws SQLException, DataAccessException {
		// TODO Auto-generated method stub
		List<StockHistory> list = new ArrayList<StockHistory>();
		StockHistory he = new StockHistory();

		he.setSTOCKNAME(rs.getMetaData().getColumnName(1) + "," + rs.getMetaData().getColumnTypeName(1));
		he.setPDATE(rs.getMetaData().getColumnName(2) + "," + rs.getMetaData().getColumnTypeName(2));
		he.setVOLUME(rs.getMetaData().getColumnName(3) + "," + rs.getMetaData().getColumnTypeName(3));
		he.setCLOSEPRICE(rs.getMetaData().getColumnName(4) + "," + rs.getMetaData().getColumnTypeName(4));
		he.setADJCLOSE(rs.getMetaData().getColumnName(5) + "," + rs.getMetaData().getColumnTypeName(6));
		list.add(he);

		while (rs.next()) {
			StockHistory e = new StockHistory();
			e.setSTOCKNAME(rs.getString(1));
			e.setPDATE(rs.getString(2));
			e.setVOLUME(rs.getString(3));
			e.setCLOSEPRICE(rs.getString(4));
			e.setADJCLOSE(rs.getString(5));
			e.setHIGHPRICE(rs.getString(6));
			list.add(e);
		}
		return list;
	}

}
