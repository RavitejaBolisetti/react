import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { LoyaltySchemeMaster } from 'components/Sales/OTF/LoyaltyScheme/LoyaltySchemeMaster';
import customRender from '@utils/test-utils';
import { Form, Button } from 'antd';
import createMockStore from '__mocks__/store';
import { OTFFormButton } from 'components/Sales/OTF/OTFFormButton';

const FormActionButton = () => (
    <div>
        <Button htmlType="submit" type="primary">
            Save
        </Button>
    </div>
);

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    const myForm = {
        ...form,
        resetFields: jest.fn(),
        setFieldsValue: jest.fn(),
    };
    return <LoyaltySchemeMaster form={myForm} {...props} />;
};

const CustomerDetailData = [
    {
        id: 'test',
        value: 'test1',
    },
    {
        id: 'test1',
        value: 'test1',
    },
];
const buttonData = {
    allotBtn: true,
    cancelBtn: true,
    cancelOTFBtn: true,
    changeHistory: true,
    closeBtn: true,
    deliveryNote: true,
    editBtn: true,
    formBtnActive: true,
    invoiceBtn: true,
    saveAndNewBtn: true,
    saveAndNewBtnClicked: true,
    saveBtn: true,
    transferOTFBtn: true,
    unAllotBtn: true,
};

describe('Loyalty scheme master render', () => {
    it('should render loyalty scheme add edit from details', () => {
        const CustomerDetailData = [
            {
                id: 'test',
                value: 'test1',
            },
            {
                id: 'test1',
                value: 'test1',
            },
        ];
        const mockStore = createMockStore({
            auth: { userId: '123456' },
            data: {
                OTF: {
                    LoyaltyScheme: { isLoaded: true, data: CustomerDetailData },
                },
            },
        });

        const fetchList = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <FormWrapper StatusBar={'test'} FormActionButton={FormActionButton} fetchList={fetchList} buttonData={buttonData} setButtonData={jest.fn()} />
            </Provider>
        );

        const combobox = screen.getByRole('combobox', { name: '', exact: false });
        fireEvent.change(combobox, { target: { value: 'testing' } });

        const make = screen.getByRole('combobox', { name: 'Make', exact: false });
        fireEvent.change(make, { target: { value: 'make' } });

        const modelG = screen.getByRole('combobox', { name: 'Model Group', exact: false });
        fireEvent.change(modelG, { target: { value: 'test model' } });

        const variant = screen.getByRole('combobox', { name: 'Variant', exact: false });
        fireEvent.change(variant, { target: { value: 'variant' } });

        const usage = screen.getByRole('combobox', { name: 'Usage', exact: false });
        fireEvent.change(usage, { target: { value: 'variant' } });

        const yearOfReg = screen.getByRole('combobox', { name: 'Year of Registration', exact: false });
        fireEvent.change(yearOfReg, { target: { value: 'variant' } });

        const monthOfReg = screen.getByRole('combobox', { name: 'Month of Registration', exact: false });
        fireEvent.change(monthOfReg, { target: { value: 'variant' } });

        const relationship = screen.getByRole('combobox', { name: 'Relationship', exact: false });
        fireEvent.change(relationship, { target: { value: '999999' } });

        const schemeName = screen.getByRole('combobox', { name: 'Scheme Name', exact: false });
        fireEvent.change(schemeName, { target: { value: 'variant' } });

        const oldRegNumber = screen.getByRole('textbox', { name: 'Old Reg. Number', exact: false });
        fireEvent.change(oldRegNumber, { target: { value: 'variant' } });

        const oldChassisNumber = screen.getByRole('textbox', { name: 'Old Chassis Number', exact: false });
        fireEvent.change(oldChassisNumber, { target: { value: 'variant' } });

        const remark = screen.getByRole('textbox', { name: 'Remarks', exact: false });
        fireEvent.change(remark, { target: { value: 'variant' } });

        const customerName = screen.getByRole('textbox', { name: 'Customer Name', exact: false });
        fireEvent.change(customerName, { target: { value: 'variant' } });

        const schemeAmount = screen.getByRole('textbox', { name: 'Scheme Amount', exact: false });
        fireEvent.change(schemeAmount, { target: { value: 'testName' } });

        const submitBtn = screen.getByRole('button', { name: 'Save', exact: false });
        fireEvent.click(submitBtn);
    });

    it('should render loyalty scheme search details', () => {
        const CustomerDetailData = [
            {
                id: 'test',
                value: 'test1',
            },
            {
                id: 'test1',
                value: 'test1',
            },
        ];
        const mockStore = createMockStore({
            auth: { userId: '123456' },
            data: {
                OTF: {
                    LoyaltyScheme: { isLoaded: true, data: CustomerDetailData },
                },
            },
        });

        const fetchList = jest.fn();
        const fetchSchemeLovList = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <FormWrapper StatusBar={'test'} FormActionButton={FormActionButton} fetchList={fetchList} buttonData={buttonData} setButtonData={jest.fn()} />
            </Provider>
        );

        const searchInput = screen.getByPlaceholderText('Search');
        fireEvent.change(searchInput, { target: { value: 'testing' } });

        const searchBtn = screen.getByRole('button', { name: 'search', exact: false });
        fireEvent.click(searchBtn);
    });
});
