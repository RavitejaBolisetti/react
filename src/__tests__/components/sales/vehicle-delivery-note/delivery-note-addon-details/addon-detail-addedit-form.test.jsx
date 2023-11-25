/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import { AddEditForm } from '@components/Sales/VehicleDeliveryNote/AddOnDetails/AddEditForm';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import { Form } from 'antd';

afterEach(() => {
    jest.restoreAllMocks();
});

const FormWrapper = (props) => {
    const [shieldForm] = Form.useForm();
    const myFormMock = {
        ...shieldForm,
        setFieldsValue: jest.fn(),
        validateFields: jest.fn().mockResolvedValue([{ name: 'Kai' }]),
        resetFields: jest.fn(),
        getFieldsValue: jest.fn().mockResolvedValue([{ name: 'Kai' }]),
    };
    return <AddEditForm shieldForm={myFormMock} {...props} />;
};

const typeData = {
    DLVR_SALE_TYP: [
        { key: '1', value: 'Finance Option 1' },
        { key: '2', value: 'Finance Option 2' },
    ],
};

const registerDisabled = { openAccordian: true };
const schemeDescriptionDatamain = { openAccordian: true };
const disabled = { isReadOnly: false };

describe('AddOn Detail Common Form components', () => {
    it('should render components', () => {
        customRender(<AddEditForm registerDisabled={registerDisabled} />);
    });
    it('should click on buttons', () => {
        customRender(<FormWrapper typeData={typeData} disabled={disabled} schemeDescriptionDatamain={schemeDescriptionDatamain} setOpenAccordian={jest.fn()} registerDisabled={registerDisabled} />);

        const plusBtn = screen.getAllByRole('img', { name: /plus/i });
        fireEvent.click(plusBtn[0]);
        fireEvent.click(plusBtn[1]);
        fireEvent.click(plusBtn[2]);
    });
});
