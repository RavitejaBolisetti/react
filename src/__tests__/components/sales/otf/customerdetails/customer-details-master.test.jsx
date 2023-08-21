/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import { CustomerDetailsMaster } from '@components/Sales/OTF/CustomerDetails/CustomerDetailsMaster';
import { Provider } from 'react-redux';
import createMockStore from '__mocks__/store';
import { Form } from 'antd';

afterEach(() => {
    jest.restoreAllMocks();
  }); 
const FormWrapper = (props) => {
    const [form] = Form.useForm();
    return <CustomerDetailsMaster form={form} {...props} />;
};

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

    it('should check CustomerDetailsMaster screen render ', () => {
        customRender(<CustomerDetailsMaster />);
        const allotted = screen.getByText('Allotted');
        expect(allotted).toBeInTheDocument();
        const booked = screen.getByText('Booked');
        expect(booked).toBeInTheDocument();
        const invoiced = screen.getByText('Invoiced');
        expect(invoiced).toBeInTheDocument();
        const delivered = screen.getByText('Delivered');
        expect(delivered).toBeInTheDocument();
    });

    it('it should render success and otfnumber heading when user click', async () => {
        customRender(
            <Provider store={mockStore}>
                <FormWrapper {...mockProps} />
            </Provider>
        );
        const successOtfNumber = screen.getByRole('heading', { name: 'Success And otfNumber' });
        fireEvent.click(successOtfNumber);
    });
});
