import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import CustomerDetailsMaster from '@components/Sales/AMCRegistration/CustomerDetails';
import { screen, fireEvent } from '@testing-library/react';
import { Button, Form } from 'antd';

afterEach(() => {
    jest.restoreAllMocks();
});

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
        getFieldValue: jest.fn(),
        resetFields: jest.fn(),
        setFieldsValue: jest.fn(),
    };
    return <CustomerDetailsMaster form={myForm} {...props} />;
};

describe('Customer Details Master Components', () => {
    it('Should render Customer Details Master basic render', () => {
        customRender(<CustomerDetailsMaster FormActionButton={FormActionButton} />);
    });

    it('Should render Customer Details Master view render', () => {
        const formActionType = { viewMode: true };
        customRender(<CustomerDetailsMaster FormActionButton={FormActionButton} formActionType={formActionType} />);
    });

    it('Should render Customer Details Master add edit form render', () => {
        const fetchCustomerList = jest.fn();
        const requestPayload = { amcRegistration: { saleType: 'DMFOC' } };
        const formActionType = { addMode: true };
        const otfData={ otfDetails: [{ customerId: 106 }] };
        customRender(<FormWrapper showGlobalNotification={jest.fn()} otfData={otfData} formActionType={formActionType} setButtonData={jest.fn()} FormActionButton={FormActionButton} requestPayload={requestPayload} fetchCustomerList={fetchCustomerList} />);

        const customerID = screen.getByRole('textbox', { name: 'Customer ID' });
        fireEvent.change(customerID, { target: { value: 'testing' } });

        const searchBtn = screen.getByRole('button', { name: 'search' });
        fireEvent.click(searchBtn);

        const saveBtn = screen.getByRole('button', { name: 'Save' });
        fireEvent.click(saveBtn);

        fetchCustomerList.mock.calls[0][0].onSuccessAction();
        fetchCustomerList.mock.calls[0][0].onErrorAction();
    });
});
