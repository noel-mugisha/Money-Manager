package com.moneymanager.backend.utils;

import com.moneymanager.backend.models.User;
import com.moneymanager.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationService {
    private final UserRepository userRepository;
    private final EmailService emailService;
    @Value("${app.frontend-url}")
    private String frontendUrl;

    @Async
    @Scheduled(cron = "* * 22 * * *", zone = "Africa/Kigali")
    public void sendDailyReminder() {
        log.info("Sending Daily Reminder");
        List<User> users = userRepository.findAll();
        for (User user : users) {
            String buttonText = "Go to My Dashboard";
            String body = "<div style='font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;'>"
                    + "<h2 style='color: #1a73e8;'>Daily Reminder from Money Manager</h2>"
                    + "<p>Hi " + user.getFullName() + ",</p>"
                    + "<p>This is a friendly reminder to **log your daily income and expenses** in your Money Manager account to keep your finances up-to-date.</p>"
                    + "<table role='presentation' cellspacing='0' cellpadding='0' border='0' style='margin: 20px 0;'>"
                    + "<tr>"
                    + "<td style='border-radius: 4px; background-color: #1a73e8;'>"
                    + "<a href='" + frontendUrl + "' target='_blank' style='display: inline-block; padding: 12px 25px; border-radius: 4px; color: #ffffff; font-size: 16px; font-weight: bold; text-decoration: none; border: 1px solid #1a73e8;'>"
                    + buttonText
                    + "</a>"
                    + "</td>"
                    + "</tr>"
                    + "</table>"
                    + "<p>Keeping a regular track of your transactions is the key to achieving your financial goals!</p>"
                    + "<p style='margin-top: 30px;'>Best regards,<br>"
                    + "The Money Manager Team</p>"
                    + "<hr style='border: 0; border-top: 1px solid #eee; margin: 20px 0;'>"
                    + "<p style='font-size: 12px; color: #999;'>If you have any questions, please do not reply to this automated email.</p>"
                    + "</div>";
            emailService.sendEmail(user.getEmail(), "Daily reminder: Add your income and expenses", body);
        }
    }
}
