/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { VoucherAddEditForm } from '@components/FinancialAccounting/CreditDebitNote/VoucherDetails/VoucherAddEditForm';
import customRender from '@utils/test-utils';
import { Form } from 'antd';

jest.mock('store/actions/data/financialAccounting/financialAccountHead', () =>({
    financialAccountHeadDataActions:jest.fn()
}));

const fetchFinancialAccountList = jest.fn();

afterEach(() => {
    jest.restoreAllMocks();
});

const FormWrapper = (props) =>{
    const [voucherForm] = Form.useForm();
    const myMock = {
        ...voucherForm,
        setFieldsValue:jest.fn(),
        resetFields:jest.fn(),
        validateFields:jest.fn().mockResolvedValue([{accountCode:'ac00', accountNarration:'test', amount:'567', id:'123'}]),
    }

    return <VoucherAddEditForm voucherForm={myMock} {...props} />
}

describe('AddEditForm component', () => {

    it('voucherTableFormData', ()=>{
        const voucherTableFormData = [{accountCode:'ac00', accountNarration:'test', amount:'567', id:'123'}];

        customRender(<FormWrapper isVisible={true} setIsAccountHeadValidated={jest.fn()} voucherTableFormData={voucherTableFormData} itemOptions={[{ name: 'Test' }]} setitemOptions={jest.fn()} />);
    });

    it('onErrorAction', () => {
        customRender(<FormWrapper isVisible={true} setIsAccountHeadValidated={jest.fn()} fetchFinancialAccountList={fetchFinancialAccountList} showGlobalNotification={jest.fn()} />);

        const accountHead = screen.getByRole('textbox', {name:'Account Head'});
        fireEvent.change(accountHead, {target:{value:'test'}})

        const searchImg = screen.getByRole('img', {name:'search'});
        fireEvent.click(searchImg);

        fetchFinancialAccountList.mock.calls[0][0].onErrorAction();
    });

    it('saveBtn', () => {
        customRender(<FormWrapper isVisible={true} setIsAccountHeadValidated={jest.fn()} />);

        const accountHead = screen.getByRole('textbox', {name:'Account Head'});
        fireEvent.change(accountHead, {target:{value:'test'}})

        const saveBtn = screen.getByRole('button', {name:'Save'});
        fireEvent.click(saveBtn);
    });

    it('saveBtn isEditing=true', () => {
        customRender(<FormWrapper isVisible={true} setIsAccountHeadValidated={jest.fn()} isEditing={true} />);

        const accountHead = screen.getByRole('textbox', {name:'Account Head'});
        fireEvent.change(accountHead, {target:{value:'test'}})

        const saveBtn = screen.getByRole('button', {name:'Save'});
        fireEvent.click(saveBtn);
    });

    it('saveBtn, error', () => {
        customRender(<FormWrapper isVisible={true}  setAdvanceSearchVisible={jest.fn()} setIsAccountHeadValidated={jest.fn()} />);

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
