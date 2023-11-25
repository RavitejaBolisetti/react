/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import { screen, fireEvent } from '@testing-library/react';
import customRender from '@utils/test-utils';
import { AddEditForm } from '@components/Sales/EvrDetailsCapturing/AddEditForm';
import { Form } from 'antd';

const FormWrapper = (props) => {
    const [form] = Form.useForm();

    const myFormMock = {
        ...form,
        setFieldValue: jest.fn(),
        setFieldsValue: jest.fn(),
    };
    return <AddEditForm form={myFormMock} {...props} />;
};

const formData = { ageInDays: '241', chargeIndicator: false, chargingDueDate: '2023-08-18T11:48:51.820+00:00', chargingStatus: 'DUE FOR CHARGING', grnDate: '2023-02-07T00:00:00.000+00:00', grnId: 'GRN23D001298', grnStatus: 'RTRN', id: '61b15a20-a715-4336-8538-9bd0ca80803a', lastChargeDate: '2023-08-03T11:48:51.819+00:00', modelCode: 'ALPLM026117156889', modelDescription: 'MAHINDRA ALFA LC PLUS CNG BSVI WARM RED', modelGroupCode: 'ECOM', remarks: 'CHARGED Vehicle', vehicleStatus: null, vin: 'MA1LV2NT9P5E80476' };

describe('edit form component', () => {
    it('should render add edit form component', () => {
        const formActionType = { editMode: true };
        customRender(<FormWrapper formActionType={formActionType} setButtonData={jest.fn()} isVisible={true} />);

        const vin = screen.getAllByRole('textbox', { value: 'VIN' });
        fireEvent.change(vin[0], { target: { value: 'testvin' } });

        const modelGroup = screen.getAllByRole('textbox', { value: 'Model Group' });
        fireEvent.change(modelGroup[0], { target: { value: 'testgroup' } });

        const modelCode = screen.getAllByRole('textbox', { value: 'Model Code' });
        fireEvent.change(modelCode[0], { target: { value: 'test123' } });

        const modelDescription = screen.getAllByRole('textbox', { value: 'Model Description' });
        fireEvent.change(modelDescription[0], { target: { value: 'testmodel' } });

        const grnID = screen.getAllByRole('textbox', { value: 'GRN ID' });
        fireEvent.change(grnID[0], { target: { value: 'grn123' } });

        const grnDate = screen.getAllByRole('textbox', { value: 'GRN Date' });
        fireEvent.change(grnDate[0], { target: { value: '16-09-2015' } });

        const grnStatus = screen.getAllByRole('textbox', { value: 'GRN Status' });
        fireEvent.change(grnStatus[0], { target: { value: 'grnok' } });

        const vehicleSt = screen.getAllByRole('textbox', { value: 'vehicleStatus' });
        fireEvent.change(vehicleSt[0], { target: { value: 'vehicleok' } });

        const ageInDays = screen.getAllByRole('textbox', { value: 'Age In Days' });
        fireEvent.change(ageInDays[0], { target: { value: '25' } });

        const dateofLastCharge = screen.getAllByRole('textbox', { value: 'Date of Last Charge' });
        fireEvent.change(dateofLastCharge[0], { target: { value: '30' } });

        const chargingDueDate = screen.getAllByRole('textbox', { value: 'Charging Due Date' });
        fireEvent.change(chargingDueDate[0], { target: { value: '15' } });

        const chargingStatus = screen.getAllByRole('textbox', { value: 'Charging Status' });
        fireEvent.change(chargingStatus[0], { target: { value: '25' } });

        const remarks = screen.getAllByRole('textbox', { value: 'Remarks' });
        fireEvent.change(remarks[0], { target: { value: 'testRemark' } });
    });

    it('Switch component should handle onChange correctly', () => {
        const formActionType = { editMode: true };
        const formData = { chargeIndicator: false };

        customRender(<FormWrapper formActionType={formActionType} setButtonData={jest.fn()} isVisible={true} formData={formData} />);
        const chargedUncharged = screen.getByRole('switch', { value: 'Charged UnCharged' });
        fireEvent.click(chargedUncharged);
    });

    it('should render add edit form button', () => {
        const formActionType = { editMode: true };
        customRender(<FormWrapper formActionType={formActionType} setButtonData={jest.fn()} isVisible={true} />);
        const cal = screen.getAllByRole('img', { value: 'calendar' });
        fireEvent.click(cal[0]);
        fireEvent.click(cal[1]);
    });

    it('should render view details component', () => {
        const formActionType = { viewMode: true };
        customRender(<FormWrapper formActionType={formActionType} setButtonData={jest.fn()} isVisible={true} formData={formData} />);
    });
});
