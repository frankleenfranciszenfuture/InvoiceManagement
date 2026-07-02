package com.inm.service;

import com.inm.dto.auth.AuthRequest;
import com.inm.dto.auth.ResetPasswordRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;

import java.util.Map;

public interface AuthService {

    ResponseEntity<?> login(AuthRequest request);

    ResponseEntity<Boolean> isAuthenticated(String email);

    void sendResetOtp(String email);

    void resetPassword(ResetPasswordRequest request);

    void sendVerifiedOtp(String email);

    void verifyOtp(Map<String, Object> request, String email);

    ResponseEntity<?> logout(HttpServletResponse response);
}