import '@testing-library/jest-dom/extend-expect';
import { CancelDeliveryNote } from '@components/Sales/VehicleDeliveryNote/CancelDeliveryNote/CancelDeliveryNote';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import { Form } from 'antd';

afterEach(() => {
    jest.restoreAllMocks();
});

const FormWrapper = (props) => {
    const [cancelDeliveryNoteForm] = Form.useForm();

    const myFormMock = {
        ...cancelDeliveryNoteForm,
        setFieldsValue: jest.fn(),
    };
    return <CancelDeliveryNote cancelDeliveryNoteForm={myFormMock} {...props} />;
};

const typeData = { DLVR_CNCL_RSN: { id: '106' } };

describe('Cancel delivery  master components', () => {
    it('should render components', () => {
        customRender(<CancelDeliveryNote setSelectedOrder={jest.fn()} setButtonData={jest.fn()} isVisible={true} typeData={typeData} retailMonth={true} yesRetailMonth={true} />);
    });

    it('test1', () => {
        customRender(<CancelDeliveryNote setSelectedOrder={jest.fn()} setButtonData={jest.fn()} isVisible={true} typeData={typeData} retailMonth={false} yesRetailMonth={true} setYesRetailMonth={jest.fn()} />);

        const button = screen.getByRole('button', { name: /Yes/i });
        fireEvent.click(button);
    });
});
