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
        setFieldsValue:jest.fn()
    }
    return <ApportionAddEditForm apportionForm={myMock} {...props} />
}

afterEach(() => {
    jest.restoreAllMocks();
});

describe('ApportionAddEditForm component', () => {
    
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

    it("Cancel button",()=>{
        customRender(<ApportionAddEditForm isVisible={true} />);

        const cancelBtn = screen.getByRole('button', {name:"Cancel"});
        fireEvent.click(cancelBtn);
    })

    it('render textbox and save Button', ()=>{
        const documentTypeOptions = [{documentDescription:'abc', documentCode:'123', documentType:'test'}];
        customRender(<FormWrapper isVisible={true}  documentTypeOptions={documentTypeOptions} setDocumentTypeOptions={jest.fn()} />);
    })
})