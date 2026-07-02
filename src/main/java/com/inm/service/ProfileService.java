package com.inm.service;

import com.inm.dto.auth.profile.ProfileRequest;
import com.inm.dto.auth.profile.ProfileResponse;

public interface ProfileService {

    ProfileResponse createProfile(ProfileRequest request);
    ProfileResponse getProfile(String email);
    void sendResetOtp(String email);
    void resetPassword(String email, String otp, String newPassword);
    void sendOtp(String email);
    void verifyOtp(String email, String otp);


}
