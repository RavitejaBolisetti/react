import '@testing-library/jest-dom/extend-expect';
import { VehicleDetailsMaster } from '@components/Sales/VehicleDeliveryNote/VehicleDetails/VehicleDetailsMaster';
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
    return <VehicleDetailsMaster form={myFormMock} {...props} />;
};

describe('Vehicle Detail master components', () => {
    it('should render components', () => {
        customRender(<FormWrapper setSelectedOrder={jest.fn()} setButtonData={jest.fn()} />);
    });

    it('should render components when view mode is true', () => {
        const formActionType = { viewMode: true };
        customRender(<FormWrapper formActionType={formActionType} setSelectedOrder={jest.fn()} setButtonData={jest.fn()} />);

        const plusImg = screen.getAllByRole('img', { name: /plus/i });
        fireEvent.click(plusImg[0]);
        fireEvent.click(plusImg[1]);
    });
});
