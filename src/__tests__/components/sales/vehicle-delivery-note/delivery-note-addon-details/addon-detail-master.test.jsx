import '@testing-library/jest-dom/extend-expect';
import { AddOnDetailsMaster } from '@components/Sales/VehicleDeliveryNote/AddOnDetails/AddOnDetailsMaster';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import { Form } from 'antd';

afterEach(() => {
    jest.restoreAllMocks();
});

const FormWrapper = (props) => {
    const [form] = Form.useForm();

    const myFormMock = {
        ...form,
        setFieldsValue: jest.fn(),
    };
    return <AddOnDetailsMaster form={myFormMock} {...props} />;
};

describe('AddOn Detail Master components', () => {
    it('should render components', () => {
        customRender(<FormWrapper handleFormValueChange={jest.fn()} />);
    });
    it('should render components when view mode is true', () => {
        const formActionType = { viewMode: true };
        customRender(<FormWrapper formActionType={formActionType} handleFormValueChange={jest.fn()} />);

        const plusImg = screen.getAllByRole('img', { name: /plus/i });
        fireEvent.click(plusImg[0]);
        fireEvent.click(plusImg[1]);
        fireEvent.click(plusImg[2]);
    });
});
