/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { DocumentTypeOtherChargesMaster } from '@components/FinancialAccounting/AccountTaxCharges/DocumentTypeOtherCharges/DocumentTypeOtherChargesMaster';
import customRender from '@utils/test-utils';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';

afterEach(() => {
    jest.restoreAllMocks();
});

jest.mock('store/actions/data/financialAccounting/financialAccountHead', ()=>({
    financialAccountHeadDataActions:{}
}));

const fetchFinancialAccountHead = jest.fn();

const fetchDocTypeLedger = jest.fn();

describe('DocumentTypeOtherChargesMaster components', () => {
    it('edit and view button', async() => {
        
        const mockStore = createMockStore({
            auth: { userId:123 },
            data: {
                FinancialAccounting: {
                    DocumentTypeLedger: { isLoaded: false, isLoading: false, data: { pageNumber:1, pageSize:10, totalRecords:1, paginationData: [{applicationId: "Finac", applicationName: "test", documentType: "REC", documentTypeCode: "REC", documentTypeId: "153"}] } }
                }
            }
        });

        customRender(
            <Provider store={mockStore}>
                <DocumentTypeOtherChargesMaster fetchFinancialAccountHead={fetchFinancialAccountHead} fetchDocTypeLedger={fetchDocTypeLedger} />
            </Provider>
        );

        // fetchFinancialAccountHead.mock.calls[0][0].onSuccessAction();

        // const tableText = await screen.findByText(/test/i);
        // expect(tableText).toBeTruthy();

        // const editIcon = screen.getByTestId('edit');
        // fireEvent.click(editIcon);

        // const applicationMenuTextbox = screen.getByRole('textbox', {name:'Application Menu'});
        // fireEvent.change(applicationMenuTextbox, {target:{value:'test'}});
        // expect(applicationMenuTextbox.value).toBe('test');

        // const cancelBtn = screen.getByRole('button', {name:'Cancel'});
        // fireEvent.click(cancelBtn);

        // const eyeIcon = screen.getByRole('button', {name:'ai-view'});
        // fireEvent.click(eyeIcon);

    });
});
