import React from 'react';
import { AddEditForm } from '@components/Sales/VehicleDetail/CustomerDetails/AddEditForm';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import { Form } from 'antd';

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    const myFormMock = {
        ...form,
        setFieldsValue: jest.fn(),
        resetFields: jest.fn(),
        resetData: jest.fn()
    }
    return <AddEditForm form={myFormMock}  {...props} />;
};

describe('Add edit form search', () => {
    const data = {
        id: 123,
        ownerCustomer: { id: 1, customerName: "test" },
        billingCustomer: { id: 1, customerName: "test" },
        vehicleCustomerLoyaltyDetails: { id: 1, customerName: "test" },
        vehicleKeyAccountDetails: { id: 1, customerName: "test" }
    }
    it('should render Add edit form type billing Customers components', () => {
        customRender(
            <FormWrapper
                isVisible={true}
                data={data}
                formType={"billingCustomers"}
                handleCollapse={jest.fn()}
                fnSetData={jest.fn()}
                formData={jest.fn()}
                setSameAsBookingCustomer={jest.fn()}
                onSearch={jest.fn()}
                handleCancel={jest.fn()}
                canUpdate={true}
                setIsModalOpen={jest.fn()}
            />
        )

        const customerBtn = screen.getByRole('button', { name: 'Edit Billing Customer Details' });
        fireEvent.click(customerBtn);

        const sameAsOwer = screen.getByRole('checkbox', { name: 'Same As Owner' });
        fireEvent.click(sameAsOwer);
        expect(sameAsOwer).toBeInTheDocument();
        expect(sameAsOwer).not.toBeChecked();  
        
        const searchDrop = screen.getByRole('combobox', { name: "" });
        fireEvent.change(searchDrop);

        const search = screen.getByRole('img', { name: 'search' });
        fireEvent.click(search);

        const searchBtn = screen.getByRole('button', { name: 'search' });
        fireEvent.click(searchBtn);

        fireEvent.click(sameAsOwer);
    })

    it('should render Add edit form type owner Customer components', () => {
        customRender(
            <FormWrapper
                isVisible={true}
                data={data}
                formType={"ownerCustomer"}
                handleCollapse={jest.fn()}
                fnSetData={jest.fn()}
                setSameAsBookingCustomer={jest.fn()}
                onSearch={jest.fn()}
                handleCancel={jest.fn()}
                setIsModalOpen={jest.fn()}
            />
        )

        const customerBtn = screen.getByRole('button', { name: 'Edit Owner Details' });
        fireEvent.click(customerBtn);

        const searchBtn = screen.getByRole('button', { name: 'search' });
        fireEvent.click(searchBtn);

        const search = screen.getByRole('img', { name: 'search' });
        fireEvent.click(search);
    })

})