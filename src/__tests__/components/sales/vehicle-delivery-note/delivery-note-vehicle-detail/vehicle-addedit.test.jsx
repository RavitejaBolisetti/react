import '@testing-library/jest-dom/extend-expect';
import { AddEditForm } from '@components/Sales/VehicleDeliveryNote/VehicleDetails/AddEditForm';
import customRender from '@utils/test-utils';
import { Form } from 'antd';

import { screen, fireEvent } from '@testing-library/react';

afterEach(() => {
    jest.restoreAllMocks();
});

const FormWrapper = (props) => {
    const [form] = Form.useForm();

    const myFormMock = {
        ...form,
        setFieldsValue: jest.fn().mockResolvedValue([{ name: 'Kai' }]),
        validateFields: jest.fn().mockResolvedValue([{ name: 'Kai' }]),
        resetFields: jest.fn(),
        getFieldsValue: jest.fn().mockResolvedValue([{ name: 'Kai' }]),
    };
    return <AddEditForm form={myFormMock} {...props} />;
};

describe('AddEdit form master components', () => {
    it('should render components', () => {
        const activeKey = [3];
        const formData = {
            batteryDetail: [{ id: 106 }],
        };
        customRender(<FormWrapper activeKey={activeKey} setActiveKey={jest.fn()} formData={formData} />);

        const plusImg = screen.getAllByRole('img', { name: /minus/i });
        fireEvent.click(plusImg[0]);
        fireEvent.click(plusImg[1]);
    });
});
