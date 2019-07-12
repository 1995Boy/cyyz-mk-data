package com.chuangyun.common.utils;

import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServlet;
import java.io.File;
import java.io.IOException;

/**
 * 文件上传下载工具类
 *
 * @author Jerry Yu
 * @date 2017/11/9 15:46
 */
public class FileUtils extends HttpServlet {

    /**
	 * 
	 */
	private static final long serialVersionUID = -2252286021072946028L;

	/**
     * 保存文件
     *
     * @param file
     * @param savePath
     * @throws IOException
     */
    public static String upload(MultipartFile file, String savePath) throws IOException {

        File parentPath = new File(savePath);// savePath: E:/js_hx_control/temp/headUrl
        String fileName = file.getOriginalFilename();// fileName: 7777777777777777.jpg
        // 判断上级路径是否存在，不存在就创建
        if (!parentPath.exists()) {
            parentPath.mkdirs();
        }

        String ref = savePath + "/" + UUIDUtil.generateId() + "." + file.getOriginalFilename().split("\\.")[1];
        // File.separator ：\ 
        //获取文件存储路径
        File fileToSave = new File(ref);// ref: E:/js_hx_control/temp/headUrl/0A61E16F34B54DAFB7DED60C0232D8F4.jpg
        //保存文件
        file.transferTo(fileToSave);// fileToSave: E:\js_hx_control\temp\headUrl\0A61E16F34B54DAFB7DED60C0232D8F4.jpg

        return ref;
    }

}
