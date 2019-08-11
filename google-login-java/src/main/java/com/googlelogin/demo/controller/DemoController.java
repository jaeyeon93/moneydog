package com.googlelogin.demo.controller;

import com.googlelogin.demo.api.GoogleApi;
import com.googlelogin.demo.dao.GoogleUserInfo;
import com.googlelogin.demo.service.GmailListener;

import com.googlelogin.demo.util.JsonParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class DemoController{

  @Autowired public GmailListener gmailListener;
  @Autowired public GoogleApi googleApi;
  @Autowired public JsonParser jsonParser;

  @GetMapping("/")
  public String index() {
    return "google oauth api";
  }

  @CrossOrigin("*")
  @PostMapping("/tokensignin")
  public Map<String, String> getClientTonken(@RequestBody String data) {

    GoogleUserInfo googleUserInfo = jsonParser.getUserInfo(data);

    return gmailListener.gMailBodyContents(googleUserInfo);
  }
}