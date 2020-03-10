package com.sandnul.controller;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

/**
 * Created with IntelliJ IDEA.
 * User: Jimmy
 * Date: 2020/3/8
 * Description:全局错误处理
 */
@ControllerAdvice
public class ExceptionController {
    @ExceptionHandler(value=Exception.class)
    public String handleAllException(Exception e,Model model){
        model.addAttribute("msg",e.toString());
        return "allerror";
    }
}
