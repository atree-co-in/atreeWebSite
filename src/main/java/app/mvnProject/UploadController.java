package app.mvnProject;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.springframework.stereotype.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.oracle.common.collections.LongArray.Iterator;

@Controller
public class UploadController {
 
    @RequestMapping(value = "/uploadMyFile", method = RequestMethod.POST)
    public String handleFileUpload(HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        	boolean isMultipart = ServletFileUpload.isMultipartContent(request);
        	System.out.println(request.getParameter("extraField"));
            if(isMultipart)
            	{
            	return request.getParameter("extraField");
            	}
            return "failed";
    }

    public String toJson(Object data)
    {
        ObjectMapper mapper=new ObjectMapper();
        StringBuilder builder=new StringBuilder();
        try {
            builder.append(mapper.writeValueAsString(data));
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return builder.toString();
    }
}
