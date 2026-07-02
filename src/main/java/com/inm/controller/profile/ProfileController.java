package com.inm.controller.profile;

import com.inm.dto.auth.profile.ProfileRequest;
import com.inm.dto.auth.profile.ProfileResponse;
import com.inm.service.EmailService;
import com.inm.service.ProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;
    private final EmailService emailService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public ProfileResponse register(@Valid @RequestBody ProfileRequest request) {
        ProfileResponse response= profileService.createProfile(request);
        emailService.sendWelcomeEmail(response.getEmail(), response.getName());
        //TODO: Send welcome email
        return response;
    }

    @GetMapping("/profile")
    public ProfileResponse getProfile
            (@CurrentSecurityContext(expression = "authentication?.name") String email) {
        return profileService.getProfile(email);
    }
}
