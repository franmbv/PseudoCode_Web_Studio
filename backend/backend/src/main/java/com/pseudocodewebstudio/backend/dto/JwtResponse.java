package com.pseudocodewebstudio.backend.dto;

import ch.qos.logback.core.model.INamedModel;

public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private Long id;
    private String username;
    private String email;
    private Integer progress;

    public JwtResponse(String accessToken, Long id, String username, String email, Integer progress) {
        this.token = accessToken;
        this.id = id;
        this.username = username;
        this.email = email;
        this.progress = progress;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getProgress() {
        return  progress;
    }

    public void setProgress(Integer progress) {
        this.progress = progress;
    }

}
