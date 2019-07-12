package com.chuangyun.modules.sys.controller;

import com.alibaba.fastjson.JSONObject;
import com.chuangyun.common.utils.IsMobilePC;
import com.chuangyun.common.utils.R;
import com.chuangyun.common.utils.ShiroUtils;
import com.chuangyun.modules.sys.entity.SysUserEntity;
import com.chuangyun.modules.sys.service.SysUserService;
import com.chuangyun.modules.sys.service.SysUserTokenService;
import com.google.code.kaptcha.Constants;
import com.google.code.kaptcha.Producer;
import org.apache.commons.io.IOUtils;
import org.apache.shiro.crypto.hash.Sha256Hash;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.imageio.ImageIO;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.Map;

/**
 * 登录相关
 *
 * @author Jerry YU
 * @date 2016年11月1日 下午1:15:31
 */
@RestController
public class SysLoginController extends AbstractController {
    @Autowired
    private Producer producer;
    @Autowired
    private SysUserService sysUserService;
    @Autowired
    private SysUserTokenService sysUserTokenService;

    /**
     * 验证码
     */
    @RequestMapping("captcha.jpg")
    public void captcha(HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Cache-Control", "no-store, no-cache");
        response.setContentType("image/jpeg");

        //生成文字验证码
        String text = producer.createText();
        //生成图片验证码
        BufferedImage image = producer.createImage(text);
        //保存到shiro session
        ShiroUtils.setSessionAttribute(Constants.KAPTCHA_SESSION_KEY, text);

        ServletOutputStream out = response.getOutputStream();
        ImageIO.write(image, "jpg", out);
        IOUtils.closeQuietly(out);
    }

    /**
     * 登录
     */
    @RequestMapping(value = "/sys/login", method = RequestMethod.POST)
    public Map<String, Object> login(String username, String password, String captcha, HttpServletRequest request) throws IOException {
        //本项目已实现，前后端完全分离，但页面还是跟项目放在一起了，所以还是会依赖session
        //如果想把页面单独放到nginx里，实现前后端完全分离，则需要把验证码注释掉(因为不再依赖session了)
        boolean isMobile = IsMobilePC.isMobileDevice(request);
        //用户信息
        SysUserEntity user = sysUserService.queryByUserName(username);
        if(isMobile){
            //账号不存在、密码错误
            if (user == null || !user.getPassword().equals(new Sha256Hash(password, user.getSalt()).toHex())) {
                return R.error("账号或密码不正确");
            }
            //账号锁定
            if (user.getStatus() == 0) {
                return R.error("账号已被锁定,请联系管理员");
            }
        }else{
            String kaptcha = ShiroUtils.getKaptcha(Constants.KAPTCHA_SESSION_KEY);
            if (!captcha.equalsIgnoreCase(kaptcha)) {
                return R.error("验证码不正确");
            }
            //账号不存在、密码错误
            if (user == null || !user.getPassword().equals(new Sha256Hash(password, user.getSalt()).toHex())) {
                return R.error("账号或密码不正确");
            }
            //账号锁定
            if (user.getStatus() == 0) {
                return R.error("账号已被锁定,请联系管理员");
            }
        }
        //生成token，并保存到数据库
        R r = sysUserTokenService.createToken(user.getUserId());
        return r;
    }
    /**
     * APP端登录
     */
    @RequestMapping(value="/sys/appLogin",method = RequestMethod.GET)
    public Object appLogin(String username, String password,HttpServletRequest request){
        SysUserEntity user = sysUserService.queryByUserName(username);
        String mes = null;
        //账号不存在、密码错误
        if (user == null || !user.getPassword().equals(new Sha256Hash(password, user.getSalt()).toHex())) {
           mes="账号或密码不正确";
        }
        //账号锁定
        if (user.getStatus() == 0) {
            mes="账号已被锁定,请联系管理员";
        }
        String success_jsonpCallback = request.getParameter("success_jsonpCallback");
        return success_jsonpCallback+"("+JSONObject.toJSONString(mes) +")";
    }

    /**
     * 退出
     */
    @RequestMapping(value = "/sys/logout", method = RequestMethod.POST)
    public R logout() {
        sysUserTokenService.logout(getUserId());
        return R.ok();
    }

}
