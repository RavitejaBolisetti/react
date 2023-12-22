/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { combineReducers } from 'redux';
import { TaxCharges } from './taxCharges';
import { TaxChargesCategory } from './taxChargesCategory';
import { TaxChargesCode } from './taxChargesCode';
import { FinancialAccountHead } from './financialAccountHead';
import { DocumentDescription } from './documentDescription';
import { TaxChargeCategoryType } from './taxChargeType';
import { CreditDebitNoteSearch } from './creditDebitNoteSearch';
import { AccountCategory } from './accountCategory/accountCategory';
import { ApplicationMenu } from './accountCategory/appilcationMenu';
import { AccountCategoryDocumentDescription } from './accountCategory/accountCategoryDocumentDescription';
import { DocumentTypeLedger } from './documentTypeLedger';
import { DealerBranchDetails } from './dealerBranchAccess';
import { DealerGstDetails } from './dealerGstDetails';
import { GstIrnTransactionDetails } from './gstIrnTransactionDetails';
// import { ChartOfAccountHierarchy } from './chartOfAccount/chartOfAccountHierarchy';
// import { ChartOfAccount } from './chartOfAccount/chartOfAccount';
import { ChartOfAccountMaster } from './chartOfAccount';
import { GstIRNTransaction } from './gstIRNTransactionPending/gstIRNTransaction';
import { InvoiceDetails } from './invoiceDetails';

import { GstToDocDetails } from './selectGstToDocDetails';
export const FinancialAccounting = combineReducers({
    TaxCharges,
    TaxChargesCategory,
    TaxChargesCode,
    FinancialAccountHead,
    DocumentDescription,
    TaxChargeCategoryType,
    CreditDebitNoteSearch,
    AccountCategory,
    ApplicationMenu,
    AccountCategoryDocumentDescription,
    DocumentTypeLedger,
    DealerBranchDetails,
    DealerGstDetails,
    GstIrnTransactionDetails,
    // ChartOfAccountHierarchy,
    // ChartOfAccount,
    ChartOfAccountMaster,
    GstIRNTransaction,
    GstToDocDetails,
    InvoiceDetails,
});
