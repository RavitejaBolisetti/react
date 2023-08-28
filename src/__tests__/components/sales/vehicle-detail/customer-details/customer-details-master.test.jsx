import React from 'react';
import { screen, fireEvent, act } from '@testing-library/react';
import { CustomerDetailsMaster } from '@components/Sales/VehicleDetail/CustomerDetails/CustomerDetailsMaster';
import customRender from '@utils/test-utils';
import { Form } from 'antd';

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    const myFormMock = {
        ...form,
        setFieldsValue: jest.fn(),
        resetFields: jest.fn(),
        resetData: jest.fn()
    }
    return <CustomerDetailsMaster form={myFormMock}  {...props} />;
};


describe('Customer Details Master', () => {
    it('should render customer details master components', () => {
        const formActionType = { viewMode: true }
        const data = {
            id: 123,
            ownerCustomer: { id: 1, customerName: "test" },
            billingCustomer: { id: 1, customerName: "test" },
            vehicleCustomerLoyaltyDetails: { id: 1, customerName: "test" },
            vehicleKeyAccountDetails: { id: 1, customerName: "test" }
        }
        const props = {
            selectedRecordId: 'testId',
            data: data,
            filterString: jest.fn()
        }

        customRender(<FormWrapper {...props} formActionType={formActionType} onChange={jest.fn()} newActivekeys={[{ id: 1, value: 'test' }]} />)

        const plusBtn = screen.getAllByRole('img');
        fireEvent.click(plusBtn[0]);
        const owberCustomer = screen.getByText('Owner Customer');
        fireEvent.click(owberCustomer);

        fireEvent.click(plusBtn[1]);
        const billingDetails = screen.getByText('Billing Customer Details');
        fireEvent.click(billingDetails);

        fireEvent.click(plusBtn[2]);
        const keyAccount = screen.getByText('Key Account Details');
        fireEvent.click(keyAccount);

        fireEvent.click(plusBtn[3]);
        const loyalty = screen.getByText('Loyalty Details');
        fireEvent.click(loyalty);

        fireEvent.click(plusBtn[4]);
        const changeRequest = screen.getByText('Ownership Change Request');
        fireEvent.click(changeRequest);
    })

    it('should render customer details master add edit form components', () => {
        const formActionType = { viewMode: false }
        const data = {
            id: 123,
            ownerCustomer: { id: 1, customerName: "test" },
            billingCustomer: { id: 1, customerName: "test" },
            vehicleCustomerLoyaltyDetails: { id: 1, customerName: "test" },
            vehicleKeyAccountDetails: { id: 1, customerName: "test" }
        }
        const props = {
            selectedRecordId: 'testId',
            data: data,
            titleOverride: "test",
            closable: false,
            onCloseAction: jest.fn()
        }

        customRender(<FormWrapper {...props}
            formActionType={formActionType}
            isVisible={true}
        />);

        const button = screen.getAllByRole('button');
        fireEvent.click(button[0]);
        const owberCustomer = screen.getByText('Owner Details');
        fireEvent.click(owberCustomer);

        fireEvent.click(button[1]);
        const billingDetails = screen.getByText('Billing Customer Details');
        fireEvent.click(billingDetails);

        fireEvent.click(button[2]);
        const keyAccount = screen.getByText('Key Account Details');
        fireEvent.click(keyAccount);

        fireEvent.click(button[3]);
        const loyalty = screen.getByText('Loyalty Details');
        fireEvent.click(loyalty);

        fireEvent.click(button[4]);
        const changeRequest = screen.getByText('Ownership Change Request');
        fireEvent.click(changeRequest);

        const owerBtn = screen.getByRole('button', { name: 'Edit Owner Details' });
        fireEvent.click(owerBtn);




        screen.debug()
        screen.getByRole('data-test')


        // const plusMinus = screen.getAllByRole('button');
        // act(async () => {
        //     fireEvent.click(plusMinus);
        //     // expect(screen.getByText('Edit')).toBeInTheDocument()
        // });

        // const button = screen.getAllByRole('button', { name: 'Owner Details' });
        // fireEvent.click(button[0]);
        // const owberCustomer = screen.getByText('Owner Customer');
        // fireEvent.click(owberCustomer);

        // fireEvent.click(button[1]);
        // const billingDetails = screen.getByText('Billing Customer Details');
        // fireEvent.click(billingDetails);

        // fireEvent.click(button[2]);
        // const keyAccount = screen.getByText('Key Account Details');
        // fireEvent.click(keyAccount);

        // fireEvent.click(button[3]);
        // const loyalty = screen.getByText('Loyalty Details');
        // fireEvent.click(loyalty);

        // fireEvent.click(button[4]);
        // const changeRequest = screen.getByText('Ownership Change Request');
        // fireEvent.click(changeRequest);



    })
})