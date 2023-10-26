/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen, fireEvent, cleanup, waitFor } from '@testing-library/react';
import { CustomerDetailsMaster } from '@components/Sales/Common/CustomerDetails/CustomerDetailsMaster';
import { Provider } from 'react-redux';
import createMockStore from '__mocks__/store';
import { Button, Form } from 'antd';

beforeEach(cleanup);
const FormWrapper = (props) => {
    const [form] = Form.useForm();
    return <CustomerDetailsMaster form={form} {...props} />;
};

const StatusBar = () => <div>No Status Bar</div>;

const FormActionButton = () => (
    <div>
        <Button htmlType="submit" type="primary">
            Save
        </Button>
    </div>
);

jest.mock('@components/Sales/Common/CustomerDetails/AddEditForm', () => {
    const AddEditForm = ({ onFinish }) => (
        <div>
            <button onClick={onFinish}>Save</button>
        </div>
    );

    return {
        __esModule: true,

        AddEditForm,
    };
});

describe('CustomerDetailsMaster Components', () => {
    const mockProps = {
        section: {
            title: 'Success And otfNumber',
        },
        formActionType: {
            viewMode: false,
        },
        handleButtonClick: jest.fn(),
        NEXT_ACTION: 'next',
        ADD_ACTION: 'Add',
        CANCEL_ACTION: 'cancel_otf',
        EDIT_ACTION: 'Edit',
        VIEW_ACTION: 'View',
        userId: 'user123',
        selectedOrderId: 'order123',
        isLoading: false,
        showGlobalNotification: jest.fn(),
        onFinishFailed: jest.fn(),
        handleFormValueChange: jest.fn(),
        setFormData: jest.fn(),
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
    const mockStore = createMockStore({
        auth: { userId: '123456' },
        data: {
            OTF: {
                OtfCustomerDetails: { isLoaded: true, isLoading: true, data: CustomerDetailData },
            },
        },
    });

    it('it should render success and otfnumber heading when user click', async () => {
        customRender(
            <Provider store={mockStore}>
                <FormWrapper {...mockProps} StatusBar={StatusBar} FormActionButton={FormActionButton} />
            </Provider>
        );
        const successOtfNumber = screen.getByRole('heading', { name: 'Success And otfNumber' });
        fireEvent.click(successOtfNumber);
    });

    it('test for onSuccess', async () => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                OTF: {
                    OtfCustomerDetails: {
                        isLoaded: true,
                        data: {
                            otfNumber: 'OTF23D010023',
                            billingCustomer: [
                                {
                                    aadharNumber: null,
                                    address: 'Greater Noida Delta 1  ',
                                    ageGroup: null,
                                    alternateNumber: '8818072268',
                                    birthDate: '2023-10-08',
                                    bookingAndBillingType: 'BILLING',
                                    cityCode: 'A19',
                                    customerId: 'C23D000056',
                                    customerName: 'deepak Pandey',
                                    customerType: 'INDIVIDUAL',
                                    district: 'NEW DELHI',
                                    districtCode: 'D10001',
                                    drivingLicense: null,
                                    email: 'nnk1Y27@gmail.com',
                                    gender: 'M',
                                    gstin: '04AABCU9603R1ZT',
                                    id: '4f966aeb-4076-4a83-af80-f853cd6b79d8',
                                    mobileNumber: '9991234422',
                                    otfNumber: null,
                                    panNo: 'MMYIJ7755K',
                                    pincode: '110001',
                                    saluation: 'Mr',
                                    sameAsBookingCustomer: true,
                                    state: 'Delhi',
                                    stateCode: '30',
                                    tehsilCode: 'T10001',
                                    tehsilName: 'NEW DELHI',
                                    tradeLicense: null,
                                    otfId: '7e6f4990-f57d-477f-bace-ecd3da30ae5a',
                                },
                            ],

                            bookingCustomer: [
                                {
                                    aadharNumber: null,
                                    address: 'Greater Noida Delta 1  ',
                                    ageGroup: null,
                                    alternateNumber: '8818072268',
                                    birthDate: '2023-10-08',
                                    bookingAndBillingType: 'BILLING',
                                    cityCode: 'A19',
                                    customerId: 'C23D000056',
                                    customerName: 'deepak Pandey',
                                    customerType: 'INDIVIDUAL',
                                    district: 'NEW DELHI',
                                    districtCode: 'D10001',
                                    drivingLicense: null,
                                    email: 'nnk1Y27@gmail.com',
                                    gender: 'M',
                                    gstin: '04AABCU9603R1ZT',
                                    id: '4f966aeb-4076-4a83-af80-f853cd6b79d8',
                                    mobileNumber: '9991234422',
                                    otfNumber: null,
                                    panNo: 'MMYIJ7755K',
                                    pincode: '110001',
                                    saluation: 'Mr',
                                    sameAsBookingCustomer: true,
                                    state: 'Delhi',
                                    stateCode: '30',
                                    tehsilCode: 'T10001',
                                    tehsilName: 'NEW DELHI',
                                    tradeLicense: null,
                                    otfId: '7e6f4990-f57d-477f-bace-ecd3da30ae5a',
                                },
                            ],
                        },
                    },
                },
            },
        });

        const res = { data: { bookingCustomer: { otfNumber: '7e6f4990-f57d-477f-bace-ecd3da30ae5a', bookingAndBillingType: 'BOOKING', id: '4f966aeb-4076-4a83-af80-f853cd6b79d8', sameAsBookingCustomer: true }, billingCustomer: { otfNumber: '7e6f4990-f57d-477f-bace-ecd3da30ae5a', bookingAndBillingType: 'BILLING', id: '4f966aeb-4076-4a83-af80-f853cd6b79d8', sameAsBookingCustomer: true } } };

        const saveData = jest.fn();
        const fetchList = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <FormWrapper saveData={saveData} setButtonData={jest.fn()} onFinishCustom={true} fetchList={fetchList} handleButtonClick={jest.fn()} setButtonData={jest.fn()} onCloseAction={jest.fn()} StatusBar={StatusBar} FormActionButton={FormActionButton} resetData={jest.fn()} />
            </Provider>
        );

        const saveBtn = screen.getAllByRole('button', { name: 'Save' });
        fireEvent.click(saveBtn[1]);
    });
});
