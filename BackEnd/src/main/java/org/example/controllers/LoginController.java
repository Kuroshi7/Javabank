package org.example.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class LoginController {

    @GetMapping("/")
    public ModelAndView index(){
        ModelAndView mv = new ModelAndView();
        mv.setViewName("index");
        return mv;
    }

    @GetMapping("/cadastrar")
    public ModelAndView cadastrar(){
        ModelAndView mv = new ModelAndView();
        mv.setViewName("pages/cadastrar");
        return mv;
    }

}


