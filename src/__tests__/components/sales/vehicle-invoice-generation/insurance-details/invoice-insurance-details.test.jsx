import React from 'react';
import { InsuranceDetailsMaster } from '@components/Sales/VehicleInvoiceGeneration/InsuranceDetails/InsuranceDetailsMaster';
import customRender from '@utils/test-utils';
import { Button, Form } from 'antd';

afterEach(() => {
    jest.restoreAllMocks();
});

const StatusBar = () => <div>No Status Bar</div>;

const FormActionButton = () => (
    <div>
        <Button htmlType="submit" type="primary">
            Save
        </Button>
    </div>
);

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    const myFormMock = {
        ...form,
        setFieldsValue: jest.fn(),
        resetFields: jest.fn(),
        resetData: jest.fn(),
        validateFields: jest.fn(),
    };
    return <InsuranceDetailsMaster form={myFormMock} {...props} />;
};

describe('Insurance Component', () => {
    it('should render component UI', () => {
        customRender(<FormWrapper StatusBar={StatusBar} FormActionButton={FormActionButton} />);
    });
});
