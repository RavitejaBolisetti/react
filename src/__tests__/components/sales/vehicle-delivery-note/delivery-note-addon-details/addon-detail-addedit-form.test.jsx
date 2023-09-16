import '@testing-library/jest-dom/extend-expect';
import { AddEditForm } from '@components/Sales/VehicleDeliveryNote/AddOnDetails/AddEditForm';
import customRender from '@utils/test-utils';
import { screen, fireEvent, buildQueries } from '@testing-library/react';

import { Form } from 'antd';

afterEach(() => {
    jest.restoreAllMocks();
});

const FormWrapper = (props) => {
    const [shieldForm] = Form.useForm();
    const myFormMock = {
        ...shieldForm,
        setFieldsValue: jest.fn(),
        validateFields: jest.fn().mockResolvedValue([{ name: 'Kai' }]),
        resetFields: jest.fn(),
        getFieldsValue: jest.fn().mockResolvedValue([{ name: 'Kai' }]),
    };
    return <AddEditForm shieldForm={myFormMock} {...props} />;
};

const typeData = {
    DLVR_SALE_TYP: [
        { key: '1', value: 'Finance Option 1' },
        { key: '2', value: 'Finance Option 2' },
    ],
};

describe('AddOn Detail Common Form components', () => {
    it('should render components', () => {
        customRender(<AddEditForm setformDataSetter={jest.fn()} />);
    });
    it('should click on buttons', () => {
        customRender(<FormWrapper setformDataSetter={jest.fn()} typeData={typeData} />);

        const plusBtn = screen.getAllByRole('img', { name: /plus/i });
        fireEvent.click(plusBtn[0]);
        fireEvent.click(plusBtn[1]);
        fireEvent.click(plusBtn[2]);
    });
});
