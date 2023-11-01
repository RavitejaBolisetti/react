import React from 'react';
import { Form } from 'antd';
import { fireEvent, screen } from '@testing-library/react';
import { AddEditForm } from '@components/Sales/Common/VehicleDetails/AddEditForm';
import customRender from '@utils/test-utils';

const typeDataMock = {
    VEHCL_TYPE: [
        { key: 'NTX', value: 'Non Taxi' },
        { key: 'TXI', value: 'Taxi' },
    ],
};

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    const myFormMock = {
        ...form,
        getFieldValue: jest.fn().mockResolvedValue(true),
    };
    return <AddEditForm form={myFormMock} {...props} />;
};
describe('Booking Vehicle Details Component render', () => {
    it('should render addedit form', async () => {
        customRender(<FormWrapper typeData={typeDataMock} formData={'taxDetails'} setOpenAccordian={jest.fn()} toolTipContent={true} />);
    });

    it('should render screen text ', async () => {
        customRender(<FormWrapper onChange={jest.fn()} typeData={typeDataMock} formData={'taxDetails'} setOpenAccordian={jest.fn()} toolTipContent={true} setIsReadOnly={jest.fn()} isReadOnly={false} />);

        const plusAddBtn = screen.getAllByRole('button', { name: /plus Add/i });
        expect(plusAddBtn).toBeTruthy();

        const img = screen.getAllByRole('img', { name: 'plus' });
        fireEvent.click(img[0]);
        expect(img).toBeTruthy();

        const vehicleInfo = screen.getByText('Vehicle Information');
        expect(vehicleInfo).toBeTruthy();

        const taxDetails = screen.getByText('Tax Details');
        expect(taxDetails).toBeTruthy();

        const charges = screen.getByText('Optional Services');
        expect(charges).toBeTruthy();
    });

    it('should render screen text when readonly is true', async () => {
        customRender(<FormWrapper typeData={typeDataMock} onChange={jest.fn()} formData={'taxDetails'} setOpenAccordian={jest.fn()} toolTipContent={true} setIsReadOnly={jest.fn()} isReadOnly={true} />);

        const plusAddBtn = screen.getAllByRole('button', { name: /plus Add/i });
        expect(plusAddBtn).toBeTruthy();

        const img = screen.getAllByRole('img', { name: 'plus' });
        fireEvent.click(img[0]);
        expect(img).toBeTruthy();

        const vehicleInfo = screen.getByText('Vehicle Information');
        expect(vehicleInfo).toBeTruthy();

        const taxDetails = screen.getByText('Tax Details');
        expect(taxDetails).toBeTruthy();

        const charges = screen.getByText('Optional Services');
        expect(charges).toBeTruthy();
    });

    it('should render text fields', async () => {
        customRender(<FormWrapper onChange={jest.fn()} typeData={typeDataMock} formData={'taxDetails'} setOpenAccordian={jest.fn()} toolTipContent={true} setIsReadOnly={jest.fn()} isReadOnly={true} />);

        const plusBtn = screen.getAllByRole('img', { name: /plus/i });
        fireEvent.click(plusBtn[0]);
        fireEvent.click(plusBtn[1]);
    });
});
