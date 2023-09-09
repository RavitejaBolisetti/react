/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AddEditForm } from '@components/FinancialAccounting/CreditDebitNote/VoucherDetails/AddEditForm';
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

    return <AddEditForm voucherForm={myMock} {...props} />
}

describe('AddEditForm component', () => {
    it('should render components', () => {
        customRender(<FormWrapper setOpenAccordian={jest.fn()} setIsReadOnly={jest.fn()} setIsAccountHeadValidated={jest.fn()}/>);

        const plusBtn = screen.getByRole('button', {name:'plus Add'});
        fireEvent.click(plusBtn);
    });
});
