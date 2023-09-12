import React from 'react';
import { Form } from 'antd';
import { fireEvent, screen } from '@testing-library/react';
import { AddEditForm } from '@components/Sales/OTF/VehicleDetails/AddEditForm';
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
describe('OTF Vehicle Details Component render', () => {
    it('should render addedit form', async () => {
        customRender(<FormWrapper typeData={typeDataMock} formData={'taxDetails'} setOpenAccordian={jest.fn()} toolTipContent={true} />);
    });

    it('should render screen text ', async () => {
        customRender(<FormWrapper typeData={typeDataMock} formData={'taxDetails'} setOpenAccordian={jest.fn()} toolTipContent={true} setIsReadOnly={jest.fn()} isReadOnly={false} />);

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

        const sepeator = screen.getAllByRole('separator', { name: '' });
        expect(sepeator).toBeTruthy();

        const table = screen.getAllByRole('table', { name: '' });
        expect(table).toBeTruthy();

        const rowGrp = screen.getAllByRole('rowgroup', { name: '' });
        expect(rowGrp).toBeTruthy();

        const rateAmt = screen.getByRole('row', { name: /Srl. Description Rate Amount/i });
        expect(rateAmt).toBeTruthy();

        const nameAmt = screen.getByRole('cell', { name: /No data/i });
        expect(nameAmt).toBeTruthy();

        const srlNo = screen.getAllByRole('columnheader', { name: /Srl./i });
        expect(srlNo).toBeTruthy();

        const amount = screen.getAllByRole('columnheader', { name: /Amount/i });
        expect(amount).toBeTruthy();

        const rate = screen.getByRole('columnheader', { name: /Rate/i });
        expect(rate).toBeTruthy();

        const description = screen.getByRole('columnheader', { name: /Description/i });
        expect(description).toBeTruthy();
    });

    it('should render screen text when readonly is true', async () => {
        customRender(<FormWrapper typeData={typeDataMock} formData={'taxDetails'} setOpenAccordian={jest.fn()} toolTipContent={true} setIsReadOnly={jest.fn()} isReadOnly={true} />);

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

        const sepeator = screen.getAllByRole('separator', { name: '' });
        expect(sepeator).toBeTruthy();

        const table = screen.getAllByRole('table', { name: '' });
        expect(table).toBeTruthy();

        const rowGrp = screen.getAllByRole('rowgroup', { name: '' });
        expect(rowGrp).toBeTruthy();

        const rateAmt = screen.getByRole('row', { name: /Srl. Description Rate Amount/i });
        expect(rateAmt).toBeTruthy();

        const nameAmt = screen.getByRole('cell', { name: /No data/i });
        expect(nameAmt).toBeTruthy();

        const srlNo = screen.getAllByRole('columnheader', { name: /Srl./i });
        expect(srlNo).toBeTruthy();

        const amount = screen.getAllByRole('columnheader', { name: /Amount/i });
        expect(amount).toBeTruthy();

        const rate = screen.getByRole('columnheader', { name: /Rate/i });
        expect(rate).toBeTruthy();

        const description = screen.getByRole('columnheader', { name: /Description/i });
        expect(description).toBeTruthy();
    });

    it('should render text fields', async () => {
        customRender(<FormWrapper typeData={typeDataMock} formData={'taxDetails'} setOpenAccordian={jest.fn()} toolTipContent={true} setIsReadOnly={jest.fn()} isReadOnly={true} />);

        const plusBtn = screen.getAllByRole('img', { name: /plus/i });
        fireEvent.click(plusBtn[0]);
        fireEvent.click(plusBtn[1]);
    });
});
