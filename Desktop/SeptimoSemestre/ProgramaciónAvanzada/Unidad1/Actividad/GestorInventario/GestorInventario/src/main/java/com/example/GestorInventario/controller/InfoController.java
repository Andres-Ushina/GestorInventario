package com.example.GestorInventario.controller;

import com.example.GestorInventario.config.AppInfoProperties;
import com.example.GestorInventario.dto.AppInfoResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class InfoController {

    private final AppInfoProperties appInfo;

    public InfoController(AppInfoProperties appInfo) {
        this.appInfo = appInfo;
    }

    @GetMapping({"/api/info", "/api/v1/info"})
    public AppInfoResponse info() {
        return new AppInfoResponse(
                appInfo.getName(), appInfo.getVersion(), appInfo.getDescription(),
                appInfo.getDeveloper(), appInfo.getEmail(), appInfo.getEnvironment());
    }
}
