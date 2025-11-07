package in.aakash.mams.filter;

import in.aakash.mams.Util.JwtUtil;
import in.aakash.mams.service.impl.AppUserDetailsService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;


@Component
@RequiredArgsConstructor
public class JwtRequestFilter extends OncePerRequestFilter {
    private final AppUserDetailsService  appUserDetailsService;
    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        final String autherizationHeader = request.getHeader("Authorization");
        String email = null;
        String jwt = null;
        if (autherizationHeader != null && autherizationHeader.startsWith("Bearer ")) {
            jwt = autherizationHeader.substring(7);
           email = jwtUtil.extractUsername(jwt);
           if(email!=null&& SecurityContextHolder.getContext().getAuthentication()==null){
              UserDetails userDetails= userDetailsService.loadUserByUsername(email);
              if(jwtUtil.validateToken(jwt,userDetails)){
                  UsernamePasswordAuthenticationToken authenticationToken =
                          new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                  authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                  SecurityContextHolder.getContext().setAuthentication(authenticationToken);

              }
           }
        }
        filterChain.doFilter(request,response);

    }

}
