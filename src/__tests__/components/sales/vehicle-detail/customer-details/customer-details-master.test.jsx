import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { CustomerDetailsMaster } from '@components/Sales/VehicleDetail/CustomerDetails/CustomerDetailsMaster';
import customRender from '@utils/test-utils';
import { Form } from 'antd';

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    const myFormMock = {
        ...form,
        setFieldsValue: jest.fn(),
        resetFields: jest.fn(),
        resetData: jest.fn(),
        getFieldsValue: jest.fn()
    }
    return <CustomerDetailsMaster form={myFormMock}  {...props} />;
};


function onChange(newActivekeys, item) {
    newActivekeys.push(item);
}

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
            filterString: jest.fn(),
            handleFormValueChange: jest.fn(),
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
        }

        customRender(<FormWrapper {...props}
            formActionType={formActionType}
            isVisible={true}
            handleFormValueChange={jest.fn()}
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
    })

    it('should render vehicle detals master addEdit form user type button', () => {
        const formActionType = { viewMode: false }
        const mockStore = {
            data: {
                CustomerDetails: { isLoaded: false, isLoading: false, data: { key: 1, value: 'test', id: 2 } },
                Vehicle: {
                    ViewVehicleDetail: { isLoaded: true, isLoading: true, data: { key: 1, value: 'test', id: 2 } },
                },
                OTF: {
                    Referrals: { isLoaded: false, isReferralLoading: false, data: { key: 1, value: 'test', id: 2 } }
                },
            },
        }

        const formData = {
            key: 12,
            value: "test"
        }

        const defaultBtnVisiblity = {
            editBtn: true,
            saveBtn: true,
            cancelBtn: true,
            saveAndNewBtn: true,
            saveAndNewBtnClicked: true,
            closeBtn: true,
            formBtnActive: true,
        };

        const data = { key: 1, value: 'test', id: 2 }

        customRender(<FormWrapper
            formActionType={formActionType}
            selectedRecordId="test"
            fetchList={jest.fn()}
            fetchCustomerDetailData={jest.fn()}
            saveButtonName={'Save & Next'}
            onSuccessAction={jest.fn()}
            showGlobalNotification={jest.fn()}
            onError={jest.fn()}
            buttonData={defaultBtnVisiblity}
            onCloseAction={jest.fn()}
            onSuccess={jest.fn()}
            handleFormValueChange={jest.fn()}
            handleFieldsChange={jest.fn()}
            onFinish={jest.fn()}
            onFinishFailed={jest.fn()}
            formData={formData}
            setButtonData={jest.fn()}
            onErrorAction={jest.fn()}
            fnSetData={jest.fn()}
            data={data}
            handleButtonClick={jest.fn()}
        />, {
            initialState: mockStore,
        })

        const saveBtn = screen.getByRole('button', { name: 'Save & Next' });
        fireEvent.click(saveBtn);

        const closeBtn = screen.getByRole('button', { name: 'Close' });
        fireEvent.click(closeBtn);

        const cancelBtn = screen.getByRole('button', { name: 'Cancel' });
        fireEvent.click(cancelBtn);

        const editBtn = screen.getByRole('button', { name: 'Edit' });
        fireEvent.click(editBtn);
    })


    it('should render customer details master show', () => {

        const props = {
            selectedRecordId: 'test',
            data: { id: 1, value: 'test', key: 1 },
            isVisible: true
        }
        customRender(
            <FormWrapper
                {...props}
                formType={"billingCustomers"}
                onCloseAction={jest.fn()}
                onSuccess={jest.fn()}
                handleFormValueChange={jest.fn()}
                handleFieldsChange={jest.fn()}
                onFinish={jest.fn()}
                onFinishFailed={jest.fn()}
                setButtonData={jest.fn()}
                sameAsBookingCustomer={jest.fn()}
                canUpdate={true}
                onSearch={jest.fn()}
                setFormData={jest.fn()}
            />)

        const customerBtn = screen.getByRole('button', { name: 'Edit Billing Customer Details' });
        fireEvent.click(customerBtn);


        const sameAsOwer = screen.getByRole('checkbox', { name: 'Same As Owner' });
        fireEvent.click(sameAsOwer);

        const searchDrop = screen.getByRole('combobox', { name: "" });
        fireEvent.change(searchDrop);

        const search = screen.getByRole('img', { name: 'search' });
        fireEvent.click(search);

        const searchBtn = screen.getByRole('button', { name: 'search' });
        fireEvent.click(searchBtn);
    })
})