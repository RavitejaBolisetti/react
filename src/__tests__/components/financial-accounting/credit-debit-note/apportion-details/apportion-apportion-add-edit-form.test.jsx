/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ApportionAddEditForm } from '@components/FinancialAccounting/CreditDebitNote/ApportionDetails/ApportionAddEditForm';
import customRender from '@utils/test-utils';
import { Form } from 'antd';

const FormWrapper = (props) =>{
    const [apportionForm] = Form.useForm();
    const myMock = {
        ...apportionForm,
        setFieldsValue:jest.fn(),
        validateFields:jest.fn()
    }
    return <ApportionAddEditForm apportionForm={myMock} {...props} />
}

afterEach(() => {
    jest.restoreAllMocks();
});

describe('ApportionAddEditForm component', () => {
    it('apportionTableData',()=>{
        const documentTypeOptions = [{voucherNumber:'123', voucherType:'CRN'}];
        const apportionTableData = [{documentType:'abc00', documentDescription:'test60'}];

        customRender(<FormWrapper isVisible={true} apportionTableData={apportionTableData} documentTypeOptions={documentTypeOptions} setDocumentTypeOptions={jest.fn()} />);

    })
    it('apportionTableFormData', ()=>{
        const apportionTableFormData = {documentType:'ac00', documentNumber:'4001', documentAmount:'67', settledAmount:'97', balancedAmount:'74', writeOffAmount:'76', apportionAmount:'70', id:'123'};

        customRender(<FormWrapper isVisible={true} apportionTableFormData={apportionTableFormData} />);
    })
    
    it("close button",()=>{
        customRender(<ApportionAddEditForm isVisible={true} />);

        const closeBtn = screen.getByRole('button', {name:"Close"});
        fireEvent.click(closeBtn);
    });

    it("search button",()=>{
        customRender(<ApportionAddEditForm isVisible={true} />);

        const searchBtn = screen.getByRole('button', {name:"search"});
        fireEvent.click(searchBtn);
    });
})