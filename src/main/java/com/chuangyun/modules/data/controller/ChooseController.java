package com.chuangyun.modules.data.controller;

import com.chuangyun.modules.data.service.ChooseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/data/choose")
public class ChooseController {

    @Autowired
    private ChooseService chooseService;


}
