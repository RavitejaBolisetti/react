/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

export const REPORT_TYPE = 'Report';
export const DOCUMENT_TYPE = 'Document';
export const EMBEDDED_REPORTS = {
    OTF: {
        id: 1,
        key: 'OTF_Report',
        title: 'Booking Report',
        type: 'Report',
        slug: 'booking-report',
    },

    VEHICLE_DELIVERY_NOTE: {
        id: 2,
        key: 'Vehicle_Delivery_Note_Report',
        title: 'Vehicle Delivery Note Report',
        type: 'Report',
        slug: 'vehicle-delivery-note-report',
    },

    VDC_PENDING_REPORT: {
        id: 3,
        key: 'VDC_Pending_Report',
        title: 'VDC Pending Report',
        type: 'Report',
        slug: 'vdc-pending-report',
    },

    AREA_WISE_SALES_REPORT: {
        id: 4,
        key: 'Area_wise_sales_report',
        title: 'Area Wise Sales Report',
        type: 'Report',
        slug: 'area-wise-sales-report',
    },

    SO_MAPPING: {
        id: 5,
        key: 'Deleted_SO_mapped_to_OTF_Report',
        title: 'Deleted SO mapped to OTF Report',
        type: 'Report',
        slug: 'so-mapping-report',
    },

    STOCK_STATUS_REPORT: {
        id: 6,
        key: 'Stock_Status_Report',
        title: 'Stock Status Report',
        type: 'Report',
        slug: 'stock-status-report',
    },

    AMC_CETRIFICATE_DOCUMENT: {
        id: 7,
        key: 'AMC-Certificate_Document',
        title: 'AMC Certificate Document',
        type: 'Report',
        slug: 'amc-certificate-document',
    },
    POSO: {
        id: 8,
        key: 'POSO',
        title: 'POSO',
        type: 'Report',
        slug: 'POSO',
    },
    STOCK_TRANSFER_REPORT: {
        id: 9,
        key: 'Stock_Transfer_Report_(Vehicle)',
        title: 'Stock Transfer Report',
        type: 'Report',
        slug: 'stock-transfer-report',
    },
    EVR_DETAIL_ANALYSIS_REPORT: {
        id: 10,
        key: 'EVR_Detail_Analysis_Report',
        title: 'EVR Detail Analysis Report ',
        type: 'Report',
        slug: 'evr-detail-analysis-report',
    },
    VEHICLE_STOCK_AVAILABILITY_REPORT: {
        id: 10,
        key: 'Vehicle_Stock_Availability_Report',
        title: 'Vehicle Stock Availability Report ',
        type: 'Report',
        slug: 'vehicle-stock-availability-report',
    },
    VOUCHER_REPORT: {
        id: 10,
        key: 'Voucher_Export_Report',
        title: 'Voucher Report ',
        type: 'Report',
        slug: 'voucher-report',
    },

    STOCK_TRANSFER_ISSUE_NOTE_DOCUMENT: {
        id: 13,
        key: 'Stock_Transfer_Issue_Note',
        title: 'Stock Transfer Issue Note Document',
        type: 'Document',
        slug: 'stock-transfer-issue-note-document',
    },

    RECIEPT_DOCUMENT: {
        id: 14,
        key: 'Receipt_Note',
        title: 'Reciept Document',
        type: 'Document',
        slug: '',
    },
    INVOICE_DOCUMENT: {
        id: 15,
        key: 'Invoice_Document',
        title: 'Invoice Document',
        type: 'Document',
        slug: '',
    },
    DEBIT_DOCUMENT: {
        id: 16,
        key: 'Debit_Note',
        title: 'Credit Debit Document',
        type: 'Document',
        slug: '',
    },
    CREDIT_DOCUMENT: {
        id: 17,
        key: 'credit_note_document',
        title: 'Credit Debit Document',
        type: 'Document',
        slug: '',
    },
    DELIVERY_NOTE_DOCUMENT: {
        id: 18,
        key: 'Delivery_Note_Document',
        title: 'Delivery Note Document',
        type: 'Document',
        slug: '',
    },

    FORM_21_DOCUMENT: {
        id: 19,
        key: 'Form21',
        title: 'Form 21 Document',
        type: 'Document',
        slug: '',
    },
    STOCK_TRANSFER_RECIEVE_NOTE_DOCUMENT: {
        id: 20,
        key: 'Stock_Transfer_Receipt_Note',
        title: 'Stock Transfer Recieve Note Document',
        type: 'Document',
        slug: '',
    },
    CO_DEALER_INVOICE_REPORT: {
        id: 21,
        key: 'Co_Dealer_Invoice_Report',
        title: 'Co Dealer Invoice Report ',
        type: 'Report',
        slug: 'co-dealer-invoice-report',
    },
    ON_ROAD_PRICE_DETAIL_SUMMARY_REPORT: {
        id: 22,
        key: 'On_Road_Price_Detail_Summary_Report',
        title: 'On Road Price Detail Summary Report ',
        type: 'Report',
        slug: 'on-road-price-detail-summary-report',
    },
    RSA_REPORT: {
        id: 23,
        key: 'RSA_Report',
        title: 'RSA Report ',
        type: 'Report',
        slug: 'rsa-report',
    },
    AMC_REGISTRATION_INVOICE_DOCUMENT: {
        id: 24,
        key: 'AMC_Certificate_Document',
        title: 'AMC Registration Invoice Document ',
        type: 'Document',
    },
    CHALLAN_DOCUMENT: {
        id: 25,
        key: 'Challan_Document',
        title: 'Challan Document',
        type: 'Document',
        slug: '',
    },
    SHIELD_REGISTRATION_INVOICE_DOCUMENT: {
        id: 26,
        key: 'Shield_Document',
        title: 'Shield Registration Invoice Document ',
        type: 'Document',
    },
    DELIVERY_CHALLAN_REPORT: {
        id: 27,
        key: 'Delivery_Challan_Report',
        title: 'Delivery Challan Report ',
        type: 'Report',
        slug: 'delivery-challan-report',
    },
    OTF_SO_NOT_MAPPED_REPORT: {
        id: 28,
        key: 'OTF_SO_Not_Mapped_Report',
        title: 'OTF SO Not Mapped Report ',
        type: 'Report',
        slug: 'otf_so_not_mapped_report',
    },
    Vehicle_Receipt_Report: {
        id: 29,
        key: 'Vehicle_Receipt_Report',
        title: 'Vehicle Receipt Report ',
        type: 'Report',
        slug: 'vehicle_receipt_report',
    },
    Credit_Note_Service_Document: {
        id: 30,
        key: 'Credit_Note_Service_Document',
        title: 'Credit Note Service Document ',
        type: 'Document',
    },
    Enrolment_Transaction_Report: {
        id: 31,
        key: 'Enrolment_Transaction_Report',
        title: 'Enrolment Transaction Report ',
        type: 'Report',
        slug: 'enrolment_transaction_report',
    },
    SO_Mapping_Unmapping_Report: {
        id: 32,
        key: 'SO_Mapping_Unmapping_Report',
        title: 'SO Mapping Unmapping Report ',
        type: 'Report',
        slug: 'so_mapping_unmapping_report',
    },
    Pool_Stock_Report: {
        id: 33,
        key: 'Pool_stock_report',
        title: 'Pool Stock Report ',
        type: 'Report',
        slug: 'pool_stock_report',
    },
    IBND_Report: {
        id: 34,
        key: 'IBND_Report',
        title: 'IBND Report ',
        type: 'Report',
        slug: 'ibnd_report',
    },
    Shield_Report: {
        id: 35,
        key: 'Shield_Report',
        title: 'Shield Report ',
        type: 'Report',
        slug: 'shield_report',
    },
    RSA_REGISTRATION_INVOICE_DOCUMENT: {
        id: 36,
        key: 'RSA_Registration_Invoice_Document',
        title: 'RSA Registration Invoice Document ',
        type: 'Document',
    },
    RSA_CERTIFICATE_DOCUMENT: {
        id: 37,
        key: 'RSA_Certificate_Document',
        title: 'RSA Certificate Document ',
        type: 'Document',
    },
    SHIELD_REGISTRATION_CERTIFICATE_DOCUMENT: {
        id: 38,
        key: 'Shield_Certificate_Document',
        title: 'Shield Registration Certificate Document ',
        type: 'Document',
    },
};
