package com.example.GestorInventario.config;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;
import org.springframework.stereotype.Component;

@Component
@Validated
@ConfigurationProperties(prefix = "app.info")
public class AppInfoProperties {

    @NotBlank
    private String name;
    @NotBlank
    private String version;
    @NotBlank
    private String description;
    @NotBlank
    private String developer;
    @NotBlank
    @Email
    private String email;
    @NotBlank
    private String environment;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getVersion() { return version; }
    public void setVersion(String version) { this.version = version; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getDeveloper() { return developer; }
    public void setDeveloper(String developer) { this.developer = developer; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getEnvironment() { return environment; }
    public void setEnvironment(String environment) { this.environment = environment; }
}
