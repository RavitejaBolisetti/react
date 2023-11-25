/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ApportionDetailsMaster } from '@components/FinancialAccounting/CreditDebitNote/ApportionDetails/ApportionDetailsMaster';
import customRender from '@utils/test-utils';
import { Provider } from 'react-redux';
// eslint-disable-next-line jest/no-mocks-import
import createMockStore from '__mocks__/store';

afterEach(() => {
    jest.restoreAllMocks();
});

jest.mock('store/actions/data/financialAccounting/invoiceDetails', ()=>({
    invoiceDetailsDataAction:{}
}));

const fetchInvoiceList = jest.fn();
const fetchDocumentTypeList = jest.fn();

describe('ApportionDetailsMaster component', () => {

    it('plus image', () => {
        const apportionTableData = [{documentType:'a', documentNumber:'12', documentAmount:'34', settledAmount:'12', balancedAmount:'21', writeOffAmount:'23', apportionAmount:'7', id:'123'}]
        customRender(<ApportionDetailsMaster apportionTableData={apportionTableData} fetchDocumentTypeList={fetchDocumentTypeList} />);
        
        const plusImg = screen.getAllByRole('img', {name:"plus"});
        fireEvent.click(plusImg[0]);
    });

    it("cancelBtn", ()=>{
        const documentTypeData = [{
            applicationId: "FINA-03",
            applicationName: "Financial Reports",
            documentCode: "Dv45"
        }]
        const mockStore = createMockStore({
            auth: { userId:123 },
            data:{
                FinancialAccounting:{
                    DocumentDescription:{isLoaded:false, isLoading:false, data:documentTypeData}
                }
            }
        })
        const fetchInvoiceList = jest.fn();
        const fetchDocumentTypeList = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <ApportionDetailsMaster isVisible={true} fetchInvoiceList={fetchInvoiceList} fetchDocumentTypeList={fetchDocumentTypeList} handleCancel={jest.fn()} />
            </Provider>
        )

        const plusAddBtn = screen.getByRole('button', {name:"plus Add"});
        fireEvent.click(plusAddBtn);

        const cancelBtn = screen.getByRole('button', {name:"Cancel"});
        fireEvent.click(cancelBtn);
    });

    it("saveBtn", ()=>{
        const documentTypeData = [{applicationId: "FINA-03", applicationName: "Financial Reports", documentCode: "Dv45"}];

        const mockStore = createMockStore({
            auth: { userId:123 },
            data:{ FinancialAccounting:{ DocumentDescription:{isLoaded:false, isLoading:false, data:documentTypeData} } }
        });

        customRender(
            <Provider store={mockStore}>
                <ApportionDetailsMaster isVisible={true} fetchInvoiceList={fetchInvoiceList} fetchDocumentTypeList={fetchDocumentTypeList} onFinish={jest.fn()} />
            </Provider>
        )

        const plusAddBtn = screen.getByRole('button', {name:"plus Add"});
        fireEvent.click(plusAddBtn);

        const saveBtn = screen.getByRole('button', {name:"Save"});
        fireEvent.click(saveBtn);
    });
});
