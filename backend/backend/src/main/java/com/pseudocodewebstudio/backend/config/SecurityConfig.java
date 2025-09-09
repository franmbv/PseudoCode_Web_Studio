// src/config/SecurityConfig.java
package com.pseudocodewebstudio.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    // 2. Definimos la cadena de filtros de
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                // 3. Desactivamos CSRF (Cross-Site Request Forgery) porque usaremos JWT
                .csrf(csrf -> csrf.disable())

                // 4. Establecemos la política de creación de sesiones a STATELESS
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                // 5. Configuramos las reglas de autorización para los endpoints
                .authorizeHttpRequests(auth -> auth
                        // 5a. Endpoints Públicos: Permitir acceso a todos
                        .requestMatchers("/api/auth/**").permitAll() // Nuestro futuro AuthController
                        .requestMatchers("/api/exercises/**").permitAll() // Dejamos los ejercicios públicos por ahora

                        // 5b. Endpoints Privados: Requerir autenticación para cualquier otra petición
                        .anyRequest().authenticated()
                );

        return http.build();
    }
}