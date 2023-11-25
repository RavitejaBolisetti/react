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

jest.mock('store/actions/data/otf/customerDetails', () => ({
    otfCustomerDetailsAction: {},
}));

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
    const AddEditForm = ({ onFinish, fnSetData }) => (
        <div>
            <button onClick={onFinish}>Save</button>
            <button onClick={fnSetData}>Set Data</button>
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
                <FormWrapper {...mockProps} StatusBar={StatusBar} fetchList={jest.fn()} resetData={jest.fn()} FormActionButton={FormActionButton} />
            </Provider>
        );
        const successOtfNumber = screen.getByRole('heading', { name: 'Success And otfNumber' });
        fireEvent.click(successOtfNumber);
    });

    it('test for onSuccess', async () => {
        const mockStore = createMockStore({
            auth: { userId: '123456' },
            data: {
                OTF: {
                    OtfCustomerDetails: { isLoaded: true, data: [{ name: 'Kai' }] },
                },
            },
        });

        // const res = { data: { bookingCustomer: { otfNumber: '7e6f4990-f57d-477f-bace-ecd3da30ae5a', bookingAndBillingType: 'BOOKING', id: '4f966aeb-4076-4a83-af80-f853cd6b79d8', sameAsBookingCustomer: true }, billingCustomer: { otfNumber: '7e6f4990-f57d-477f-bace-ecd3da30ae5a', bookingAndBillingType: 'BILLING', id: '4f966aeb-4076-4a83-af80-f853cd6b79d8', sameAsBookingCustomer: true } } };

        const saveData = jest.fn();
        const fetchList = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <FormWrapper saveData={saveData} setButtonData={jest.fn()} selectedRecordId={106} onFinishCustom={true} fetchList={fetchList} handleButtonClick={jest.fn()} onCloseAction={jest.fn()} StatusBar={StatusBar} FormActionButton={FormActionButton} resetData={jest.fn()} />
            </Provider>
        );

        const saveBtn = screen.getAllByRole('button', { name: 'Save' });
        fireEvent.click(saveBtn[1]);

        const setData = screen.getByRole('button', { name: 'Set Data' });
        fireEvent.click(setData);
    });

    it('test3', async () => {
        const wrapForm = true;
        const formActionType = { viewMode: true };

        customRender(<FormWrapper setButtonData={jest.fn()} wrapForm={wrapForm} formActionType={formActionType} selectedRecordId={106} onFinishCustom={true} handleButtonClick={jest.fn()} onCloseAction={jest.fn()} StatusBar={StatusBar} FormActionButton={FormActionButton} resetData={jest.fn()} />);
    });

    it('test1', async () => {
        const wrapForm = false;
        const formActionType = { viewMode: true };

        customRender(<FormWrapper setButtonData={jest.fn()} wrapForm={wrapForm} formActionType={formActionType} selectedRecordId={106} onFinishCustom={true} handleButtonClick={jest.fn()} onCloseAction={jest.fn()} StatusBar={StatusBar} FormActionButton={FormActionButton} resetData={jest.fn()} />);
    });

    it('test2', async () => {
        const wrapForm = false;
        const formActionType = { viewMode: false };

        customRender(<FormWrapper setButtonData={jest.fn()} wrapForm={wrapForm} formActionType={formActionType} selectedRecordId={106} onFinishCustom={true} handleButtonClick={jest.fn()} onCloseAction={jest.fn()} StatusBar={StatusBar} FormActionButton={FormActionButton} resetData={jest.fn()} />);
    });
});
