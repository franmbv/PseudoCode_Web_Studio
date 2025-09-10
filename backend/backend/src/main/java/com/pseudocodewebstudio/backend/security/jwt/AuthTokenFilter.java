package com.pseudocodewebstudio.backend.security.jwt;

import com.pseudocodewebstudio.backend.security.services.UserDetailsServiceImpl;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class AuthTokenFilter extends OncePerRequestFilter {

    private final JwtUtils jwtUtils;
    private final UserDetailsServiceImpl userDetailsService;

    private static final Logger logger = LoggerFactory.getLogger(AuthTokenFilter.class);

    public AuthTokenFilter(JwtUtils jwtUtils, UserDetailsServiceImpl userDetailsService) {
        this.jwtUtils = jwtUtils;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        try {
            // 1. Extraer el token de la cabecera 'Authorization'
            String jwt = parseJwt(request);

            // 2. Si hay un token y es válido...
            if (jwt != null && jwtUtils.validateJwtToken(jwt)) {
                // 3. ...extraer el nombre de usuario del token.
                String username = jwtUtils.getUserNameFromJwtToken(jwt);

                // 4. Cargar los detalles del usuario desde la base de datos.
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                // 5. Crear un objeto de autenticación.
                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null, // No se necesitan credenciales (contraseña) aquí
                                userDetails.getAuthorities());

                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // 6. ¡El paso más importante! Establecer la autenticación en el contexto de seguridad de Spring.
                // A partir de aquí, Spring sabe que el usuario actual está autenticado.
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (Exception e) {
            logger.error("No se pudo establecer la autenticación del usuario: {}", e.getMessage());
        }

        // 7. Continuar con el resto de la cadena de filtros.
        filterChain.doFilter(request, response);
    }

    /**
     * Método de ayuda para extraer el token JWT de la cabecera 'Authorization'.
     */
    private String parseJwt(HttpServletRequest request) {
        String headerAuth = request.getHeader("Authorization");

        if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
            // Devuelve el token sin el prefijo "Bearer "
            return headerAuth.substring(7);
        }

        return null;
    }
}