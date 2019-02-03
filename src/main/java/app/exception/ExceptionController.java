package app.exception;
import java.io.IOException;
import java.sql.SQLException;
import java.util.Date;

import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import app.controller.TableDisplayController;

@ControllerAdvice
@RestController
public class ExceptionController {

/*  @ExceptionHandler(Exception.class)
  @ResponseBody
  public void exceptionHandler(Exception ex, HttpServletResponse res) {
      System.out.println("hello word");
  }*/
  
/*	@ExceptionHandler(Exception.class)
	public void handleAllException( Exception ex , HttpServletResponse res) {
   System.out.println("hello");
		//return model;

	}*/

	private Logger logger = Logger.getLogger(TableDisplayController.class);
	
/*	@ExceptionHandler(Exception.class)
	public void handleAllException( Exception ex , HttpServletResponse res) {
       // logger.debug(ex);
		try {
			res.getWriter().print(ex.getMessage());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}*/
	
	  @ExceptionHandler(SQLException.class)
	  public final ResponseEntity<ErrorDetails> handleAllExceptions(Exception ex, WebRequest request) {
	    ErrorDetails errorDetails = new ErrorDetails(new Date(), ex.getMessage(),
	        request.getDescription(false));
	    return new ResponseEntity<>(errorDetails, HttpStatus.INTERNAL_SERVER_ERROR);
	  }
	

}
