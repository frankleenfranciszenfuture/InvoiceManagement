package com.inm.service.impl;

import com.inm.dto.auth.AuthRequest;
import com.inm.dto.auth.AuthResponse;
import com.inm.dto.auth.ResetPasswordRequest;
import com.inm.entity.UserEntity;
import com.inm.repository.UserRepository;
import com.inm.service.AppUserDetailsService;
import com.inm.service.AuthService;
import com.inm.service.ProfileService;
import com.inm.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import jakarta.servlet.http.HttpServletResponse;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final AppUserDetailsService appUserDetailsService;
    private final JwtUtil jwtUtil;
    private final ProfileService profileService;
    private final UserRepository userRepository;

    @Override
    public ResponseEntity<?> login(AuthRequest request) {

        try {

            authenticate(request.getEmail(), request.getPassword());

            UserDetails userDetails =
                    appUserDetailsService.loadUserByUsername(request.getEmail());

            String jwtToken = jwtUtil.generateToken(userDetails);

            UserEntity user = userRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            ResponseCookie cookie = ResponseCookie.from("jwt", jwtToken)
                    .httpOnly(true)
                    .path("/")
                    .maxAge(Duration.ofDays(1))
                    .sameSite("Strict")
                    .build();

            return ResponseEntity.ok()
                    .header(HttpHeaders.SET_COOKIE, cookie.toString())
                    .body(new AuthResponse(
                            user.getName(),
                            user.getEmail(),
                            jwtToken
                    ));

        } catch (BadCredentialsException ex) {

            Map<String, Object> error = new HashMap<>();
            error.put("error", true);
            error.put("message", "Email or Password Incorrect");

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);

        } catch (DisabledException ex) {

            Map<String, Object> error = new HashMap<>();
            error.put("error", true);
            error.put("message", "Account is disabled");

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);

        } catch (Exception ex) {

            Map<String, Object> error = new HashMap<>();
            error.put("error", true);
            error.put("message", "Authentication Failed");

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }
    }

    private void authenticate(String email, String password) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password)
        );
    }

    @Override
    public ResponseEntity<Boolean> isAuthenticated(String email) {
        return ResponseEntity.ok(email != null);
    }

    @Override
    public void sendResetOtp(String email) {
        profileService.sendResetOtp(email);
    }

    @Override
    public void resetPassword(ResetPasswordRequest request) {
        profileService.resetPassword(
                request.getEmail(),
                request.getOtp(),
                request.getNewPassword()
        );
    }

    @Override
    public void sendVerifiedOtp(String email) {
        profileService.sendOtp(email);
    }

    @Override
    public void verifyOtp(Map<String, Object> request, String email) {

        if (request.get("otp") == null) {
            throw new RuntimeException("Missing details");
        }

        profileService.verifyOtp(email, request.get("otp").toString());
    }

    @Override
    public ResponseEntity<?> logout(HttpServletResponse response) {

        ResponseCookie cookie = ResponseCookie.from("jwt", "")
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(0)
                .sameSite("Strict")
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body("Logged out successfully");
    }
}