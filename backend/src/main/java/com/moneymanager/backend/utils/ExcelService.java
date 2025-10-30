package com.moneymanager.backend.utils;

import com.moneymanager.backend.dto.ExpenseDto;
import com.moneymanager.backend.dto.IncomeDto;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.OutputStream;
import java.util.List;
import java.util.stream.IntStream;

@Service
public class ExcelService {

    public void writeIncomesToExcel(OutputStream os, List<IncomeDto> incomes) throws IOException {
        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Incomes");
            Row header = sheet.createRow(0);
            header.createCell(0).setCellValue("S.No");
            header.createCell(1).setCellValue("Name");
            header.createCell(2).setCellValue("Category");
            header.createCell(3).setCellValue("Amount");
            header.createCell(4).setCellValue("Date");
            IntStream.range(0, incomes.size()).forEach(i -> {
                IncomeDto income = incomes.get(i);
                Row row = sheet.createRow(i + 1);
                row.createCell(0).setCellValue(i+1);
                row.createCell(1).setCellValue(income.name() != null ?  income.name() : "N/A");
                row.createCell(2).setCellValue(income.categoryId() != null ? income.categoryName() : "N/A");
                row.createCell(3).setCellValue(income.amount() != null ? income.amount().doubleValue() : 0);
                row.createCell(4).setCellValue(income.date() != null ? income.date().toString() : "N/A");
            });
            workbook.write(os);
        }
    }

    public void writeExpensesToExcel(OutputStream os, List<ExpenseDto> expenses) throws IOException {
        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Expenses");
            Row header = sheet.createRow(0);
            header.createCell(0).setCellValue("S.No");
            header.createCell(1).setCellValue("Name");
            header.createCell(2).setCellValue("Category");
            header.createCell(3).setCellValue("Amount");
            header.createCell(4).setCellValue("Date");
            IntStream.range(0, expenses.size()).forEach(i -> {
                ExpenseDto expense = expenses.get(i);
                Row row = sheet.createRow(i + 1);
                row.createCell(0).setCellValue(i+1);
                row.createCell(1).setCellValue(expense.name() != null ?  expense.name() : "N/A");
                row.createCell(2).setCellValue(expense.categoryId() != null ? expense.categoryName() : "N/A");
                row.createCell(3).setCellValue(expense.amount() != null ? expense.amount().doubleValue() : 0);
                row.createCell(4).setCellValue(expense.date() != null ? expense.date().toString() : "N/A");
            });
            workbook.write(os);
        }
    }
}
