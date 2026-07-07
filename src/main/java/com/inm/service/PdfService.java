package com.inm.service;

import com.inm.entity.Invoice;

public interface PdfService {

    byte[] generateInvoicePdf(Invoice invoice);
}
