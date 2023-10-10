/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { DocumentTypeOtherChargesMaster } from '@components/FinancialAccounting/AccountTaxCharges/DocumentTypeOtherCharges/DocumentTypeOtherChargesMaster';
import customRender from '@utils/test-utils';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
import { tblActionColumn } from 'utils/tableColumn';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('DocumentTypeOtherChargesMaster components', () => {
    it('veiw and edit button', () => {
        
        const mockStore = createMockStore({
            auth: { userId:123 },
            data: {
                FinancialAccounting: {
                    DocumentTypeLedger: { isLoaded: false, isLoading:false, data: [{
                        applicationId: "Finac", applicationName: "Financial Accounting", documentType: "REC", documentTypeCode: "REC", documentTypeId: "765",
                    }] },
                },
            },
        });

        customRender(
            <Provider store={mockStore}>
                <DocumentTypeOtherChargesMaster />
            </Provider>
        );

    });
});
