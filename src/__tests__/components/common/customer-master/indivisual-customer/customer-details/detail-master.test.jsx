import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { CustomerDetailMaster } from '@components/common/CustomerMaster/IndividualCustomer/CustomerDetail/CustomerDetailMaster';
import customRender from '@utils/test-utils';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
import { Form } from 'antd';

const props = { formActionType: { viewMode: false } };

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    return <CustomerDetailMaster form={form} {...props} />;
};

describe('Corporate customer addedit Details render', () => {
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

    it('should render addedit details page', async () => {
        customRender(<FormWrapper {...props} />);
        screen.debug();
    });
    it('should render text', async () => {
        customRender(<FormWrapper {...props} />);

        // const uploadDoc = screen.getByText('Upload supporting documents');
        // expect(uploadDoc).toBeTruthy();

        const mobileNo = screen.getByRole('textbox', { name: 'Mobile Number' });
        expect(mobileNo).toBeTruthy();

        // const firstName = screen.getByRole('textbox', { name: 'First Name' });
        // expect(firstName).toBeTruthy();

        // const middleName = screen.getByRole('textbox', { name: 'Middle Name' });
        // expect(middleName).toBeTruthy();

        // const lastName = screen.getByRole('textbox', { name: 'Last Name' });
        // expect(lastName).toBeTruthy();

        const emailId = screen.getByRole('textbox', { name: 'Email ID' });
        expect(emailId).toBeTruthy();

        const whatsappNo = screen.getByRole('textbox', { name: 'Whatsapp Number' });
        expect(whatsappNo).toBeTruthy();

        const customerType = screen.getByRole('combobox', { name: 'Customer Type' });
        expect(customerType).toBeTruthy();

        const corporateType = screen.getByRole('combobox', { name: 'Corporate Type' });
        expect(corporateType).toBeTruthy();

        // const title = screen.getByRole('combobox', { name: 'Title' });
        // expect(title).toBeTruthy();

        const corporateName = screen.getByRole('combobox', { name: 'Corporate Name' });
        expect(corporateName).toBeTruthy();

        const corporateCatagory = screen.getByRole('combobox', { name: 'Corporate Category' });
        expect(corporateCatagory).toBeTruthy();

        const membershipType = screen.getByRole('combobox', { name: 'Membership Type' });
        expect(membershipType).toBeTruthy();

        const seperator = screen.getAllByRole('separator', { name: '' });
        expect(seperator).toBeTruthy();

        const historyBtn = screen.getByRole('button', { name: 'View History' });
        fireEvent.click(historyBtn);
        expect(historyBtn).toBeTruthy();

        // const minusCurrent = screen.getByRole('button', { name: 'minus Current Name Edit' });
        // fireEvent.click(minusCurrent);
        // expect(minusCurrent).toBeTruthy();

        const editBtn = screen.getByRole('button', { name: 'plus Edit' });
        fireEvent.click(editBtn);
        expect(editBtn).toBeTruthy();

        const editBtn2 = screen.getByRole('button', { name: 'Edit' });
        fireEvent.click(editBtn2);
        expect(editBtn2).toBeTruthy();

        // const upload = screen.getByRole('button', { name: 'Upload supporting documents (File type should be png, jpg or pdf and max file size to be 5Mb) Upload File' });
        // fireEvent.click(upload);
        // expect(upload).toBeTruthy();

        // const uploadFile = screen.getByRole('button', { name: 'Upload File' });
        // fireEvent.click(uploadFile);
        // expect(uploadFile).toBeTruthy();

        // const saveBtn = screen.getByRole('button', { name: 'Save' });
        // fireEvent.click(saveBtn);
        // expect(saveBtn).toBeTruthy();

        // const resetBtn = screen.getByRole('button', { name: 'Reset' });
        // fireEvent.click(resetBtn);
        // expect(resetBtn).toBeTruthy();

        // const minusImg = screen.getByRole('img', { name: 'minus' });
        // expect(minusImg).toBeTruthy();

        // const closeBtn = screen.getByRole('button', { name: 'Close' });
        // // fireEvent.click(resetBtn);
        // expect(closeBtn).toBeTruthy();

        // const leftBtn = screen.getByRole('button', { name: 'left' });
        // // fireEvent.click(resetBtn);
        // expect(leftBtn).toBeTruthy();

        // const rightBtn = screen.getByRole('button', { name: 'right' });
        // // fireEvent.click(resetBtn);
        // expect(rightBtn).toBeTruthy();

        const contactOver = screen.getByRole('switch', { name: 'Contact over WhatsApp?' });
        fireEvent.click(contactOver);
        expect(contactOver).toBeTruthy();

        const wantTo = screen.getByRole('switch', { name: 'Want to use mobile no as WhatsApp no?' });
        fireEvent.click(wantTo);
        expect(wantTo).toBeTruthy();

        // const srl = screen.getByRole('columnheader', { name: 'Srl.' });
        // expect(srl).toBeTruthy();

        // const currentName = screen.getByRole('columnheader', { name: 'Current Name' });
        // expect(currentName).toBeTruthy();

        // const previousName = screen.getByRole('columnheader', { name: 'Previous Name' });
        // expect(previousName).toBeTruthy();

        // const requestDate = screen.getByRole('columnheader', { name: 'Request Date' });
        // expect(requestDate).toBeTruthy();

        // const approvedBy = screen.getByRole('columnheader', { name: 'Approved By/ Rejected By' });
        // expect(approvedBy).toBeTruthy();

        // const remarks = screen.getByRole('columnheader', { name: 'Remarks' });
        // expect(remarks).toBeTruthy();

        // const documents = screen.getByRole('columnheader', { name: 'Documents' });
        // expect(documents).toBeTruthy();

        // const status = screen.getByRole('columnheader', { name: 'Status' });
        // expect(status).toBeTruthy();
    });
    it('cancel button should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                CustomerMaster: {
                    Corporate: { isFilteredListLoaded: true },
                    ViewDocument: { isLoaded: true },
                },
                ConfigurableParameterEditing: { filteredListData: ['type1', 'type2'] },
                SupportingDocument: { isLoaded: true },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <FormWrapper {...props} buttonData={defaultBtnVisiblity} showGlobalNotification={jest.fn()} onError={jest.fn()} onCloseAction={jest.fn()} resetData={jest.fn()} />
            </Provider>
        );

        const cancelBtn = screen.getByRole('button', { name: /cancel/i });
        fireEvent.click(cancelBtn);
    });

    it('should validate fields on finish failed', async () => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
        });
        customRender(
            <Provider store={mockStore}>
                <FormWrapper {...props} buttonData={defaultBtnVisiblity} showGlobalNotification={jest.fn()} onError={jest.fn()} onCloseAction={jest.fn()} resetData={jest.fn()} onSuccess={jest.fn()} handleFormValueChange={jest.fn()} handleFieldsChange={jest.fn()} onFinish={jest.fn()} onFinishFailed={jest.fn()} handleButtonClick={jest.fn()} setButtonData={jest.fn()} />
            </Provider>
        );
        const addBtn = screen.getByTestId('editBtn');
        fireEvent.click(addBtn);

        const contactOver = screen.getByRole('switch', { name: 'Contact over WhatsApp?' });
        fireEvent.click(contactOver);

        const saveBtn = screen.getByRole('button', { name: /save & next/i });
        fireEvent.click(saveBtn);
    });
});
