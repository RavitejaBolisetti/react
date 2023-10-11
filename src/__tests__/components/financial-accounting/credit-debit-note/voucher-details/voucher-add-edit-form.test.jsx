/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { VoucherAddEditForm } from '@components/FinancialAccounting/CreditDebitNote/VoucherDetails/VoucherAddEditForm';
import customRender from '@utils/test-utils';
import { Form } from 'antd';

afterEach(() => {
    jest.restoreAllMocks();
});

const FormWrapper = (props) =>{
    const [voucherForm] = Form.useForm();
    const myMock = {
        ...voucherForm,
        setFieldsValue:jest.fn(),
        resetFields:jest.fn()
    }

    return <VoucherAddEditForm voucherForm={myMock} {...props} />
}

describe('AddEditForm component', () => {
    it('saveBtn', () => {
        customRender(<FormWrapper isVisible={true} onFinish={jest.fn()} onFinishFailed={jest.fn()} handleAccountChange ={jest.fn()} setIsAccountHeadValidated={jest.fn()} />);

        const accountHead = screen.getByRole('textbox', {name:'Account Head'});
        fireEvent.change(accountHead, {target:{value:'test'}})

        const saveBtn = screen.getByRole('button', {name:'Save'});
        fireEvent.click(saveBtn);
    });

    it('cancelBtn', () => {
        customRender(<FormWrapper isVisible={true} handleCancel={jest.fn()}/>);

        const cancelBtn = screen.getByRole('button', {name:'Cancel'});
        fireEvent.click(cancelBtn);
    });

    it('closeBtn', () => {
        customRender(<FormWrapper isVisible={true} />);

        const closeBtn = screen.getByRole('button', {name:'Close'});
        fireEvent.click(closeBtn);
    });

    it('searchBtn', () => {
        customRender(<FormWrapper isVisible={true} />);

        const searchBtn = screen.getByRole('button', {name:'search'});
        fireEvent.click(searchBtn);
    });
});
