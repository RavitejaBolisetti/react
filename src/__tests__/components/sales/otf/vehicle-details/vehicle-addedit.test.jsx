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
    const myFormMock={
        ...form,
        getFieldValue: jest.fn().mockResolvedValue(true),
    }
    return <AddEditForm form={myFormMock} {...props} />;
};
describe('OTF Vehicle Details Component render', () => {
    it('should render addedit form', async () => {
        customRender(<FormWrapper typeData={typeDataMock} formData={'taxDetails'} setOpenAccordian={jest.fn()} toolTipContent={true} />);
    });

    it('should render screen text ', async () => {
        customRender(<FormWrapper typeData={typeDataMock} formData={'taxDetails'} setOpenAccordian={jest.fn()} toolTipContent={true} setIsReadOnly={jest.fn()} isReadOnly={false} />);

        const editBtn = screen.getByRole('button', { name: /edit vehicle information/i });
        fireEvent.click(editBtn);
        expect(editBtn).toBeTruthy();

        const taxBtn = screen.getByRole('button', { name: /Tax Details/i });
        fireEvent.click(taxBtn);
        expect(taxBtn).toBeTruthy();

        const chargesBtn = screen.getByRole('button', { name: /Charges plus Add/i });
        fireEvent.click(chargesBtn);
        expect(chargesBtn).toBeTruthy();

        const plusAddBtn = screen.getAllByRole('button', { name: /plus Add/i });
        expect(plusAddBtn).toBeTruthy();

        const vehicleCombo = screen.getByRole('combobox', { name: /Vehicle Usage Type/i });
        fireEvent.click(vehicleCombo);
        expect(vehicleCombo).toBeTruthy();

        const modelCombo = screen.getByRole('combobox', { name: /Model/i });
        fireEvent.click(modelCombo);
        expect(modelCombo).toBeTruthy();

        const modelCode = screen.getByRole('textbox', { name: /Model Code/i });
        expect(modelCode).toBeTruthy();

        const availableStock = screen.getByRole('textbox', { name: /Available Stock/i });
        expect(availableStock).toBeTruthy();

        const allotedStatus = screen.getByRole('textbox', { name: /Vehicle Allocated Status/i });
        expect(allotedStatus).toBeTruthy();

        const poNumber = screen.getByRole('textbox', { name: /PO Number/i });
        expect(poNumber).toBeTruthy();

        const poDate = screen.getByRole('textbox', { name: /PO Date/i });
        expect(poDate).toBeTruthy();

        const poStatus = screen.getByRole('textbox', { name: /PO Status/i });
        expect(poStatus).toBeTruthy();

        const soNumber = screen.getByRole('textbox', { name: /SO Number/i });
        expect(soNumber).toBeTruthy();

        const soStatus = screen.getByRole('textbox', { name: /SO Status/i });
        expect(soStatus).toBeTruthy();

        const sellingPrice = screen.getByRole('textbox', { name: /Vehicle Selling Price/i });
        expect(sellingPrice).toBeTruthy();

        const discountAmt = screen.getByRole('textbox', { name: /Discount Amount/i });
        expect(discountAmt).toBeTruthy();

        const taxAmt = screen.getByRole('textbox', { name: /Tax Amount/i });
        expect(taxAmt).toBeTruthy();

        const vehicleAmt = screen.getByRole('textbox', { name: /Vehicle Amount/i });
        expect(vehicleAmt).toBeTruthy();

        const img = screen.getByRole('img', { name: 'plus' });
        fireEvent.click(img);
        expect(img).toBeTruthy();

        const vehicleInfo = screen.getByText('Vehicle Information');
        expect(vehicleInfo).toBeTruthy();

        const taxDetails = screen.getByText('Tax Details');
        expect(taxDetails).toBeTruthy();

        const charges = screen.getByText('Charges');
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

        const editBtn = screen.getByRole('button', { name: /edit vehicle information/i });
        fireEvent.click(editBtn);
        expect(editBtn).toBeTruthy();

        const taxBtn = screen.getByRole('button', { name: /Tax Details/i });
        fireEvent.click(taxBtn);
        expect(taxBtn).toBeTruthy();

        const chargesBtn = screen.getByRole('button', { name: /Charges plus Add/i });
        fireEvent.click(chargesBtn);
        expect(chargesBtn).toBeTruthy();

        const plusAddBtn = screen.getAllByRole('button', { name: /plus Add/i });
        expect(plusAddBtn).toBeTruthy();

        const vehicleCombo = screen.getByRole('combobox', { name: /Vehicle Usage Type/i });
        fireEvent.click(vehicleCombo);
        expect(vehicleCombo).toBeTruthy();

        const modelCombo = screen.getByRole('combobox', { name: /Model/i });
        fireEvent.click(modelCombo);
        expect(modelCombo).toBeTruthy();

        const modelCode = screen.getByRole('textbox', { name: /Model Code/i });
        expect(modelCode).toBeTruthy();

        const availableStock = screen.getByRole('textbox', { name: /Available Stock/i });
        expect(availableStock).toBeTruthy();

        const allotedStatus = screen.getByRole('textbox', { name: /Vehicle Allocated Status/i });
        expect(allotedStatus).toBeTruthy();

        const poNumber = screen.getByRole('textbox', { name: /PO Number/i });
        expect(poNumber).toBeTruthy();

        const poDate = screen.getByRole('textbox', { name: /PO Date/i });
        expect(poDate).toBeTruthy();

        const poStatus = screen.getByRole('textbox', { name: /PO Status/i });
        expect(poStatus).toBeTruthy();

        const soNumber = screen.getByRole('textbox', { name: /SO Number/i });
        expect(soNumber).toBeTruthy();

        const soStatus = screen.getByRole('textbox', { name: /SO Status/i });
        expect(soStatus).toBeTruthy();

        const sellingPrice = screen.getByRole('textbox', { name: /Vehicle Selling Price/i });
        expect(sellingPrice).toBeTruthy();

        const discountAmt = screen.getByRole('textbox', { name: /Discount Amount/i });
        expect(discountAmt).toBeTruthy();

        const taxAmt = screen.getByRole('textbox', { name: /Tax Amount/i });
        expect(taxAmt).toBeTruthy();

        const vehicleAmt = screen.getByRole('textbox', { name: /Vehicle Amount/i });
        expect(vehicleAmt).toBeTruthy();

        const img = screen.getByRole('img', { name: 'plus' });
        fireEvent.click(img);
        expect(img).toBeTruthy();

        const vehicleInfo = screen.getByText('Vehicle Information');
        expect(vehicleInfo).toBeTruthy();

        const taxDetails = screen.getByText('Tax Details');
        expect(taxDetails).toBeTruthy();

        const charges = screen.getByText('Charges');
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
});
