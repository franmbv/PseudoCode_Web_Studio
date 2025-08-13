package com.pseudocodewebstudio.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**") // Aplica esta configuración a todas las rutas bajo /api/
                        .allowedOrigins("http://localhost:5173") // Permite peticiones SOLO desde esta URL
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Métodos HTTP permitidos
                        .allowedHeaders("*") // Permite cualquier encabezado en la petición
                        .allowCredentials(true); // Permite el envío de cookies (útil para la autenticación futura)
            }
        };
    }
}