import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { AddEditForm } from '@components/Sales/VehicleDetail/ProductDetails/AddEditForm';
import customRender from '@utils/test-utils';
import { Form } from 'antd';

beforeEach(() => {
    jest.clearAllMocks();
});

const formData = {
    connectedVehicle: [
        { esimNo: 'ESIM001', esimStatus: true, kycStatus: true, preferredMobileNo1: '9412681874', preferredMobileNo2: '9412681879', tcuId: 'TCU001' },
        { esimNo: 'ESIM002', esimStatus: true, kycStatus: true, preferredMobileNo1: '94181874', preferredMobileNo2: '942681879', tcuId: 'TCU002' },
    ],
    aggregates: { id: '657aab5c-5c07-4da9-879b-3733a26bb4b3', item: 'VIT002', itemValue: null, make: 'VIM002', makeValue: null, serialNo: '9876' },
    productAttributeDetail: {},
};

const FormWrapper = (props) => {
    const [form] = Form.useForm();

    const myFormMock = {
        ...form,
        setFieldsValue: jest.fn(),
        // validateFields: jest.fn().mockResolvedValue([{ name: 'Kai' }]),
    };
    return <AddEditForm form={myFormMock} {...props} />;
};

describe('Vehicle ProductDetails render', () => {
    it('should render page', async () => {
        const prop = { formActionType: { viewMode: false } };
        customRender(<FormWrapper handleCollapse={jest.fn()} formData={formData} bindStatus={jest.fn()} isEditing={true} handleButtonClick={jest.fn()} setOpenAccordian={jest.fn()} setIsReadOnly={jest.fn()} />);

        const firstPanelHeader = screen.getByText('Product Attribute Details');
        fireEvent.click(firstPanelHeader);

        const secondPanelHeader = screen.getByText('Connected Vehicle');
        fireEvent.click(secondPanelHeader);

        const thirdPanelHeader = screen.getByText('Aggregates');
        fireEvent.click(thirdPanelHeader);

        const addBtn = screen.getByRole('button', { name: 'plus Add' });
        fireEvent.click(addBtn);
    });

    it('should render page2', async () => {
        const formData = { productAttributeDetail: { name: 'Test' } };
        customRender(<FormWrapper handleCollapse={jest.fn()} formData={formData} bindStatus={jest.fn()} setOpenAccordian={jest.fn()} setIsReadOnly={jest.fn()} />);

        const addBtn = screen.getByRole('button', { name: 'plus Add' });
        fireEvent.click(addBtn);
    });
});
