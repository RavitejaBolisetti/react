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
});
