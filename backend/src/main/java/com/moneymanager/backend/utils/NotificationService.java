package com.moneymanager.backend.utils;

import com.moneymanager.backend.dto.ExpenseDto;
import com.moneymanager.backend.models.Category;
import com.moneymanager.backend.models.User;
import com.moneymanager.backend.repositories.CategoryRepository;
import com.moneymanager.backend.repositories.UserRepository;
import com.moneymanager.backend.services.ExpenseService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationService {

    private final UserRepository userRepository;
    private final EmailService emailService;
    private final ExpenseService expenseService;
    private final CategoryRepository categoryRepository;

    @Value("${app.frontend-url}")
    private String frontendUrl;


    @Async
    @Scheduled(cron = "0 0 22 * * *", zone = "Africa/Kigali")
    public void sendDailyReminder() {
        log.info("Sending Daily Reminder...");
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
            log.info("Daily reminder sent to: {}", user.getEmail());
        }
    }


    @Async
    @Scheduled(cron = "0 0 23 * * *", zone = "Africa/Kigali")
    public void sendDailyExpenseSummary() {
        log.info("Sending Daily Expense Summary...");
        List<User> users = userRepository.findAll();

        for (User user : users) {
            var expenses = expenseService.getExpensesForDate(user.getId(), LocalDate.now());
            if (expenses.isEmpty()) {
                continue; // skip users with no expenses today
            }

            StringBuilder table = new StringBuilder();
            table.append("<table style='border-collapse: collapse; width: 100%; font-family: Arial, sans-serif;'>");
            table.append("<tr style='background-color: #1a73e8; color: #fff;'>")
                    .append("<th style='border: 1px solid #ddd; padding: 8px;'>#</th>")
                    .append("<th style='border: 1px solid #ddd; padding: 8px;'>Name</th>")
                    .append("<th style='border: 1px solid #ddd; padding: 8px;'>Amount (RWF)</th>")
                    .append("<th style='border: 1px solid #ddd; padding: 8px;'>Category</th>")
                    .append("<th style='border: 1px solid #ddd; padding: 8px;'>Date</th>")
                    .append("</tr>");

            int i = 1;
            for (ExpenseDto expenseDto : expenses) {
                String categoryName = "N/A";
                if (expenseDto.categoryId() != null) {
                    categoryName = categoryRepository.findById(expenseDto.categoryId())
                            .map(Category::getName)
                            .orElse("N/A");
                }

                table.append("<tr style='background-color: #f9f9f9;'>")
                        .append("<td style='border: 1px solid #ddd; padding: 8px;'>").append(i++).append("</td>")
                        .append("<td style='border: 1px solid #ddd; padding: 8px;'>").append(expenseDto.name()).append("</td>")
                        .append("<td style='border: 1px solid #ddd; padding: 8px;'>").append(expenseDto.amount()).append("</td>")
                        .append("<td style='border: 1px solid #ddd; padding: 8px;'>").append(categoryName).append("</td>")
                        .append("<td style='border: 1px solid #ddd; padding: 8px;'>").append(expenseDto.date()).append("</td>")
                        .append("</tr>");
            }

            table.append("</table>");

            String body = """
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;
                        max-width: 600px; margin: 0 auto; padding: 20px;
                        border: 1px solid #ddd; border-radius: 8px;">
                <h2 style="color: #1a73e8;">Your Daily Expense Summary</h2>
                <p>Hi %s,</p>
                <p>Here is a summary of your expenses recorded today (%s):</p>
                %s
                <p style="margin-top: 20px;">Keep tracking your spending to achieve your financial goals!</p>
                <p style="margin-top: 30px;">Best regards,<br>The Money Manager Team</p>
            </div>
            """.formatted(user.getFullName(), LocalDate.now(), table);

            emailService.sendEmail(user.getEmail(), "Your Daily Expense Summary", body);
            log.info("Expense summary sent to: {}", user.getEmail());
        }
    }

}
