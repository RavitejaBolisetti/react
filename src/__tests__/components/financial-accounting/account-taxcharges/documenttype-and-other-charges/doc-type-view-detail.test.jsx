/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { ViewDetail } from '@components/FinancialAccounting/AccountTaxCharges/DocumentTypeOtherCharges/ViewDetail';

describe('ViewDetail component', ()=>{
    it('docTypeLedger', ()=>{
        const docTypeLedger = {
            applicationName: "Financial Accounting", documentType: null, documentTypeCode: "REC", documentTypeId: "698", documentTypeName: "Receipts(Finance)",
            accountLedgerMappingDtoList:[{
                chargeCode: "CCRD",chargeCodeDesc: "Credit Card", financialAccountHeadCode: null, financialAccountHeadDesc: "BIMALJEET", financialAccountHeadId: "437",id: "563"
            }]
        }

        customRender(<ViewDetail styles={{}} docTypeLedger={docTypeLedger}/>);
    });
})