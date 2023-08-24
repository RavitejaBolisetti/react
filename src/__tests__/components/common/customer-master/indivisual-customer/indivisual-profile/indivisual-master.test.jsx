import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import customRender from '@utils/test-utils';
import { IndividualProfileMaster } from '@components/common/CustomerMaster/IndividualCustomer/IndividualProfile/IndividualProfileMaster';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
import { Form } from 'antd';

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    return <IndividualProfileMaster form={form} {...props} />;
};

const props2 = {
    formActionType: { viewMode: false },
    isFormVisible: true,
    setIsFormVisible: jest.fn(),
    handleButtonClick: jest.fn(),
};

describe('Indivisual Master  Component', () => {
    const defaultBtnVisiblity = {
        editBtn: true,
        saveBtn: true,
        cancelBtn: true,
        saveAndNewBtn: true,
        saveAndNewBtnClicked: true,
        closeBtn: true,
        formBtnActive: true,
        cancelOTFBtn: true,
        transferOTFBtn: true,
        allotBtn: true,
        unAllotBtn: true,
        invoiceBtn: true,
        deliveryNote: true,
        changeHistory: true,
    };
    it('should render indivisual Master ', async () => {
        customRender(<FormWrapper {...props2} />);
    });

    it('should render text fields', async () => {
        customRender(<FormWrapper {...props2} />);

        const indivisualInfo = screen.getByText('Individual Information');
        expect(indivisualInfo).toBeInTheDocument();

        const doB = screen.getByRole('textbox', { name: 'Date of Birth' });
        expect(doB).toBeInTheDocument();

        const anniDAte = screen.getByRole('textbox', { name: 'Wedding Anniversary Date' });
        expect(anniDAte).toBeInTheDocument();

        const licenceNo = screen.getByRole('textbox', { name: 'Driving License No' });
        expect(licenceNo).toBeInTheDocument();

        const adharNo = screen.getByRole('textbox', { name: 'Aadhar No.' });
        expect(adharNo).toBeInTheDocument();

        const voterId = screen.getByRole('textbox', { name: 'Voter ID' });
        expect(voterId).toBeInTheDocument();

        const pan = screen.getByRole('textbox', { name: 'PAN' });
        expect(pan).toBeInTheDocument();

        const gstIn = screen.getByRole('textbox', { name: 'GSTIN' });
        expect(gstIn).toBeInTheDocument();

        const gender = screen.getByRole('combobox', { name: 'Gender' });
        expect(gender).toBeInTheDocument();

        const maritalstatus = screen.getByRole('combobox', { name: 'Maritial Status' });
        expect(maritalstatus).toBeInTheDocument();

        const occupation = screen.getByRole('combobox', { name: 'Occupation' });
        expect(occupation).toBeInTheDocument();

        const annualIncome = screen.getByRole('combobox', { name: 'Annual Income' });
        expect(annualIncome).toBeInTheDocument();

        const vehicleUsed = screen.getByRole('combobox', { name: 'Vehicle Used' });
        expect(vehicleUsed).toBeInTheDocument();

        const motherTounge = screen.getByRole('combobox', { name: 'Mother Tongue' });
        expect(motherTounge).toBeInTheDocument();

        const Usage = screen.getByRole('combobox', { name: 'Usage/Application Categorization' });
        expect(Usage).toBeInTheDocument();

        const subCatagory = screen.getByRole('combobox', { name: 'Usage/Application Sub-Category' });
        expect(subCatagory).toBeInTheDocument();

        const customerCatagory = screen.getByRole('combobox', { name: 'Customer Category' });
        expect(customerCatagory).toBeInTheDocument();

        const minusImg = screen.getByRole('img', { name: 'minus' });
        fireEvent.click(minusImg);
    });

    it('save button should work with on finish', async () => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
        });
        customRender(
            <Provider store={mockStore}>
                <FormWrapper {...props2} selectedCustomerId={'kai'} setButtonData={jest.fn()} onSuccessAction={jest.fn()} showGlobalNotification={jest.fn()} onError={jest.fn()} buttonData={defaultBtnVisiblity} onCloseAction={jest.fn()} resetData={jest.fn()} onSuccess={jest.fn()} handleFormValueChange={jest.fn()} handleFieldsChange={jest.fn()} onFinish={jest.fn()} onFinishFailed={jest.fn()} />
            </Provider>
        );
        const pan = screen.getByRole('textbox', { name: 'PAN' });
        fireEvent.change(pan, { target: { value: '1221' } });

        const saveBtn = screen.getByRole('button', { name: /save & next/i });
        fireEvent.click(saveBtn);
    });
    test('should check view details', () => {
        const prop = { formActionType: { viewMode: true } };
        customRender(<FormWrapper {...prop} />);
    });
});
