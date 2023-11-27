/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import CommonForm from '@components/Sales/VehicleDeliveryNote/AddOnDetails/CommonForm';
import customRender from '@utils/test-utils';
import { Form } from 'antd';
import { screen, fireEvent } from '@testing-library/react';

afterEach(() => {
    jest.restoreAllMocks();
});

const FormWrapper = (props) => {
    const [shieldForm] = Form.useForm();
    const [amcForm] = Form.useForm();
    const [rsaForm] = Form.useForm();
    const myFormMock = {
        ...shieldForm,
        ...amcForm,
        ...rsaForm,
        setFieldsValue: jest.fn(),
        validateFields: jest.fn().mockResolvedValue([{ name: 'Kai' }]),
        resetFields: jest.fn(),
        getFieldsValue: jest.fn().mockResolvedValue([{ name: 'Kai' }]),
    };
    return <CommonForm shieldForm={myFormMock} amcForm={myFormMock} rsaForm={myFormMock} {...props} />;
};

const typeData = {
    DLVR_SALE_TYP: [
        { key: '1', value: 'Finance Option 1' },
        { key: '2', value: 'Finance Option 2' },
    ],
};

describe('AddOn Detail Common Form components', () => {
    it('should render components', () => {
        const schemeDescriptionDatamain = { RSA: ['Kai'] };
        customRender(<FormWrapper typeData={typeData} schemeDescriptionDatamain={schemeDescriptionDatamain} />);
    });

    it('fields should work with shield', () => {
        const schemeDescriptionDatamain = {
            RSA: ['Kai'],
        };
        customRender(<FormWrapper typeData={typeData} schemeDescriptionDatamain={schemeDescriptionDatamain} />);
        const schemeType = screen.getByRole('combobox', { name: 'Scheme Description' });
        fireEvent.change(schemeType, { target: { value: 'Kai' } });
        // fireEvent.click(screen.getAllByText('Kai')[1]);
    });

    it('fields should work with amc', () => {
        const schemeDescriptionDatamain = {
            RSA: ['Kai'],
        };
        customRender(<FormWrapper schemeDescriptionDatamain={schemeDescriptionDatamain} typeData={typeData} />);
        const schemeType = screen.getByRole('combobox', { name: 'Scheme Description' });
        fireEvent.change(schemeType, { target: { value: 'Kai' } });
    });

    it('field should work with rsa', () => {
        const schemeDescriptionData = [
            {
                schemeDescription: 'Kai',
            },
        ];
        const schemeDescriptionDatamain = {
            RSA: ['Kai'],
        };
        customRender(<FormWrapper typeData={typeData} openAccordian={'RSA'} registerDisabled={schemeDescriptionDatamain} schemeDescriptionDatamain={schemeDescriptionDatamain} schemeDescriptionData={schemeDescriptionData} />);
        const schemeType = screen.getByRole('combobox', { name: 'Scheme Description' });
        fireEvent.change(schemeType, { target: { value: 'Kai' } });
    });

    it('register button should work', () => {
        const schemeDescriptionData = [
            {
                schemeDescription: 'Kai',
            },
        ];
        const schemeDescriptionDatamain = {
            RSA: ['Kai'],
        };
        customRender(<FormWrapper typeData={typeData} openAccordian={'RSA'} registerDisabled={false} schemeDescriptionDatamain={schemeDescriptionDatamain} schemeDescriptionData={schemeDescriptionData} onSingleFormFinish={jest.fn()} />);
        const registeBtn = screen.getByRole('button', { name: 'Register' });
        fireEvent.click(registeBtn);
    });
});
