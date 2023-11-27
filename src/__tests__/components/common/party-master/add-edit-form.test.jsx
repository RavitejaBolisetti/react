/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { AddEditForm } from '@components/common/PartyMaster/AddEditForm';
import { screen, fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Form } from 'antd';

afterEach(() => {
    jest.restoreAllMocks();
});

const buttonData = {
    closeBtn: true,
    cancelBtn: true,
    saveBtn: true,
    saveAndNewBtn: true,
    editBtn: true,
    formBtnActive: true,
};

const user = userEvent.setup();
const saveButtonName = 'Save';
const isLoadingOnSave = false;

const props = {
    buttonData: [],
    setButtonData: jest.fn(),
    formActionType: '',
    formData: {},
    setFormData: jest.fn(),
    forceUpdate: jest.fn(),
    handleFormValueChange: jest.fn(),
    handleFormFieldChange: jest.fn(),
    allowedTimingSave: false,
    onCloseAction: true,
};

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    return <AddEditForm form={form} {...props} />;
};

describe('party master Components', () => {
    it('should render input field components', () => {
        customRender(<AddEditForm isVisible={true} viewMode={false} formData={{}} resetFields={jest.fn()} editMode={jest.fn()} buttonData={buttonData} setButtonData={jest.fn()} handleButtonClick={jest.fn()} onCloseAction={jest.fn()} saveButtonName={saveButtonName} isLoadingOnSave={isLoadingOnSave} {...props} />);
        const partyname = screen.getByLabelText('Party Name');
        fireEvent.change(partyname, { target: { value: 'Dmstest' } });

        const partyCode = screen.getByLabelText('Party Code');
        fireEvent.change(partyCode, { target: { value: 'Dms' } });

        const comboBox = screen.getByRole('combobox', { name: /party category/i });
        fireEvent.click(comboBox);
        expect(comboBox).toBeTruthy();

        const mobileNo = screen.getAllByText('Mobile Number');
        expect(mobileNo).toBeTruthy();

        const alternateNo = screen.getAllByText('Alternate Mobile Number');
        expect(alternateNo).toBeTruthy();

        const contactpersonname = screen.getByLabelText('Contact Person Name');
        fireEvent.change(contactpersonname, { target: { value: 'Dmstest' } });

        const address = screen.getByLabelText('Address');
        fireEvent.change(address, { target: { value: 'Dmsaddress' } });

        const getText = screen.getByText('Party Address and Contact Details');
        expect(getText).toBeTruthy();

        const city = screen.getByLabelText('City');
        fireEvent.change(city, { target: { value: 'Dmscity' } });

        const tehsil = screen.getByLabelText('Tehsil');
        fireEvent.change(tehsil, { target: { value: 'Dmstehsil' } });

        const district = screen.getByLabelText('District');
        fireEvent.change(district, { target: { value: 'Dmsdistrict' } });

        const state = screen.getByLabelText('State');
        fireEvent.change(state, { target: { value: 'Dmsstate' } });

        const GSTINnumber = screen.getByLabelText('GSTIN number');
        fireEvent.change(GSTINnumber, { target: { value: 'Dmsgsti' } });

        const pan = screen.getByLabelText('PAN');
        fireEvent.change(pan, { target: { value: 'Dmspan' } });

        const creditlimit = screen.getByLabelText('Credit Limit');
        fireEvent.change(creditlimit, { target: { value: 'Dmscreditlimit' } });

        const creditdays = screen.getByLabelText('Credit Days');
        fireEvent.change(creditdays, { target: { value: 'Dmscreditdays' } });

        const checkremarks = screen.getByLabelText('Remarks');
        user.type(checkremarks, 'Dmatest');

        const partDiscount = screen.getByRole('textbox', { name: /parts discount\(%\)/i });
        expect(partDiscount).toBeTruthy();
    });

    it('should render text', () => {
        customRender(<AddEditForm isVisible={true} formData={{}} resetFields={jest.fn()} editMode={jest.fn()} buttonData={buttonData} setButtonData={jest.fn()} handleButtonClick={jest.fn()} onCloseAction={jest.fn()} saveButtonName={saveButtonName} isLoadingOnSave={isLoadingOnSave} {...props} />);
        const defaulttitle = screen.getByText('default title');
        expect(defaulttitle).toBeInTheDocument();

        const partycategory = screen.getByText('Party Category');
        expect(partycategory).toBeTruthy();
    });

    it('Is pin code search Field Present or not', async () => {
        customRender(<AddEditForm isVisible={true} formData={{}} resetFields={jest.fn()} editMode={jest.fn()} buttonData={buttonData} setButtonData={jest.fn()} handleButtonClick={jest.fn()} onCloseAction={jest.fn()} saveButtonName={saveButtonName} isLoadingOnSave={isLoadingOnSave} {...props} />);

        const btnSearch = screen.getByPlaceholderText('Search');
        expect(btnSearch).toBeTruthy();
        expect(screen.getByRole('img', { name: 'search' })).toBeTruthy();
        fireEvent.click(screen.getByRole('img', { name: 'search' }));
        const SearchBtn = screen.getByRole('button', { name: 'search' });
        fireEvent.click(SearchBtn);
        expect(SearchBtn).toBeTruthy();
    });

    it('should check if search field is correct', async () => {
        const formActionType = { editMode: true };
        const detailData = { name: 'test' };

        render(<FormWrapper isVisible={true} formActionType={formActionType} fetchDetail={jest.fn()} detailData={detailData} setFormData={jest.fn()} setButtonData={jest.fn()} fetchPincodeDetail={jest.fn()} />);

        const searchBox = screen.getByPlaceholderText('Search');
        fireEvent.change(searchBox, { target: { value: '123456' } });
        const SearchBtn = screen.getByRole('button', { name: 'search' });
        fireEvent.click(SearchBtn);
    });

    it('should check if search field has more than 5 char', async () => {
        const formActionType = { editMode: true };
        const detailData = { name: 'test' };

        render(<FormWrapper isVisible={true} formActionType={formActionType} fetchDetail={jest.fn()} detailData={detailData} setFormData={jest.fn()} setButtonData={jest.fn()} fetchPincodeDetail={jest.fn()} />);

        const searchBox = screen.getByPlaceholderText('Search');
        fireEvent.change(searchBox, { target: { value: '1234567' } });
        const SearchBtn = screen.getByRole('button', { name: 'search' });
        fireEvent.click(SearchBtn);
    });

    it('should able to select option from search', async () => {
        const formActionType = { editMode: true };
        const detailData = { name: 'test' };
        const formData = [{ pinCode: '123456' }];
        const pincodeData = [
            { id: '1', pinCode: '123456', localityName: 'Konohagakure', cityName: 'Konohagakure', districtName: 'Konohagakure', stateName: 'Konohagakure' },
            { id: '2', pinCode: '123457', cityName: 'Konohagakure', districtName: 'Konohagakure', stateName: 'Konohagakure' },
        ];

        render(<FormWrapper fetchPincodeDetail={jest.fn()} setButtonData={jest.fn()} pincodeData={pincodeData} formData={formData} isVisible={true} formActionType={formActionType} fetchDetail={jest.fn()} detailData={detailData} setFormData={jest.fn()} forceUpdate={jest.fn()} />);

        const searchBox = screen.getByPlaceholderText('Search');
        fireEvent.keyDown(searchBox, { key: 'ArrowDown', code: 40 });
    });
});
