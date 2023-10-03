/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen, fireEvent, cleanup } from '@testing-library/react';
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
});
