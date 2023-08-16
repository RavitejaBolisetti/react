import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import customRender from '@utils/test-utils';
import { AddEditForm } from '@components/common/CustomerMaster/IndividualCustomer/IndividualProfile/AddEditForm';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
import { Form } from 'antd';

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    return <AddEditForm form={form} {...props} />;
};

const props2 = {
    formData: [],
    isReadOnly: false,
    customer: true,
    setCustomer: jest.fn(),
};
const appCategoryData = {
    GENDER_CD: [{ key: 'MALE', value: 'Male' }],
    MARITAL_STATUS: [{ key: 'MARRIED', value: 'Married' }],
};

describe('Indivisual addedit Master  Component', () => {
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
    it('should render indiviual Master ', async () => {
        customRender(<FormWrapper {...props2} appCategoryData={appCategoryData} />);
        screen.debug();
    });
    it('should render text fields', async () => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
        });
        customRender(
            <Provider store={mockStore}>
                <FormWrapper {...props2} setButtonData={jest.fn()} appCategoryData={appCategoryData} onSuccessAction={jest.fn()} showGlobalNotification={jest.fn()} onError={jest.fn()} buttonData={defaultBtnVisiblity} onCloseAction={jest.fn()} resetData={jest.fn()} onSuccess={jest.fn()} handleFormValueChange={jest.fn()} handleFieldsChange={jest.fn()} onFinish={jest.fn()} onFinishFailed={jest.fn()} />
            </Provider>
        );

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

    it('should toggle Collapse panel on header click', () => {
        const setActiveKey = jest.fn();
        const activeKey = [1];
        const formData = {
            dateOfBirth: '1990-01-01',
            gender: 'MALE',
            martialStatus: 'MARRIED',
        };
        const isLoading = false;
        const appCategoryData = {
            GENDER_CD: [{ key: 'MALE', value: 'Male' }],
            MARITAL_STATUS: [{ key: 'MARRIED', value: 'Married' }],
        };

        customRender(<FormWrapper setActiveKey={setActiveKey} activeKey={activeKey} formData={formData} isLoading={isLoading} appCategoryData={appCategoryData} />);

        const panelHeader = screen.getByText('Individual Information');
        fireEvent.click(panelHeader);

        expect(setActiveKey).toHaveBeenCalledWith([]);

        setActiveKey.mockReset();

        fireEvent.click(panelHeader);

        expect(setActiveKey).toHaveBeenCalledWith([1]);
    });
});
