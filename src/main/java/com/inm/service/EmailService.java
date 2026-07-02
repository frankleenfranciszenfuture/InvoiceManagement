package com.inm.service;

public interface EmailService {
    void sendWelcomeEmail(String toEmail, String name);
    void sendResetOtpEmail(String toEmail, String otp);
    void sendOtpEmail(String toEmail, String otp);
}
