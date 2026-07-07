package com.inm.service.impl;

import com.inm.entity.Invoice;
import com.inm.entity.InvoiceItem;
import com.inm.service.PdfService;
import com.lowagie.text.Document;
import com.lowagie.text.Font;
import com.lowagie.text.FontFactory;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Phrase;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class PdfServiceImpl implements PdfService {

    @Override
    public byte[] generateInvoicePdf(Invoice invoice) {

        try {

            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

            Document document = new Document();

            PdfWriter.getInstance(document, outputStream);

            document.open();

            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);

            Font headingFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12);

            Font bodyFont = FontFactory.getFont(FontFactory.HELVETICA, 11);

            document.add(new Paragraph("INVOICE", titleFont));
            document.add(new Paragraph(" "));

            document.add(new Paragraph(
                    "Invoice Number : " + invoice.getInvoiceNumber(),
                    bodyFont));

            document.add(new Paragraph(
                    "Invoice Date : " + invoice.getInvoiceDate(),
                    bodyFont));

            document.add(new Paragraph(
                    "Due Date : " + invoice.getDueDate(),
                    bodyFont));

            document.add(new Paragraph(
                    "Customer : " + invoice.getCustomer().getDisplayName(),
                    bodyFont));

            document.add(new Paragraph(
                    "Sales Person : " + invoice.getSalesPerson().getSalesPersonName(),
                    bodyFont));

            document.add(new Paragraph(" "));

            PdfPTable table = new PdfPTable(6);

            table.setWidthPercentage(100);

            table.setWidths(new float[]{4,2,2,2,2,2});

            addHeader(table, "Item");
            addHeader(table, "Qty");
            addHeader(table, "Rate");
            addHeader(table, "Discount");
            addHeader(table, "Tax%");
            addHeader(table, "Amount");

            for (InvoiceItem item : invoice.getItems()) {

                table.addCell(value(item.getItem().getItemName()));
                table.addCell(value(item.getQuantity()));
                table.addCell(value(item.getRate()));
                table.addCell(value(item.getDiscount()));
                table.addCell(value(item.getTaxPercent()));
                table.addCell(value(item.getAmount()));
            }

            document.add(table);

            document.add(new Paragraph(" "));

            document.add(new Paragraph(
                    "Sub Total : " + invoice.getSubTotal(),
                    headingFont));

            document.add(new Paragraph(
                    "Tax : " + invoice.getTaxAmount(),
                    headingFont));

            document.add(new Paragraph(
                    "Grand Total : " + invoice.getTotalAmount(),
                    headingFont));

            document.close();

            return outputStream.toByteArray();

        } catch (Exception e) {

            throw new RuntimeException("Unable to generate invoice PDF", e);

        }

    }

    private void addHeader(PdfPTable table, String text) {

        PdfPCell cell = new PdfPCell(new Phrase(text));

        table.addCell(cell);

    }

    private String value(String value) {
        return value == null ? "" : value;
    }

    private String value(BigDecimal value) {
        return value == null ? "0" : value.toPlainString();
    }

}