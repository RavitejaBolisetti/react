import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { AddEditForm } from 'components/common/CustomerMaster/IndividualCustomer/CustomerDetail/AddEditForm';
import customRender from '@utils/test-utils';
import { Form } from 'antd';

beforeEach(() => {
    jest.clearAllMocks();
});

const props={
    formActionType: { editMode: false },
    whatsAppConfiguration: { contactOverWhatsApp: true },
    typeData: { CORP_TYPE: [{value: 'NON-LIS', label: 'NON-LIS'},{value: 'LIS', label: 'LIS'}] },
    formData: { corporateType: 'Test', whatsAppNumber: '9999999999', mobileNumber: '9999999999', contactOverWhatsApp: true }
}

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    return <AddEditForm form={form} {...props} />;
};

describe('Customer Details Add Edit Form render', () => {
    it('Non-LIS type should work', async () => {
        customRender( <FormWrapper {...props} setCustomerNameList={jest.fn()} setWhatsAppConfiguration={jest.fn()} handleFormFieldChange={jest.fn()} /> );

        const corporateType=screen.getByRole('combobox', { name: 'Corporate Type' });
        fireEvent.change(corporateType, { target: { value: 'NON-LI' } });

        await waitFor(() => { expect(screen.getByText('NON-LIS')).toBeInTheDocument() });

        fireEvent.click(screen.getByText('NON-LIS'));
    });

    it('LIS type should work', async () => {
        customRender( <FormWrapper {...props} setCustomerNameList={jest.fn()} setWhatsAppConfiguration={jest.fn()} handleFormFieldChange={jest.fn()} /> );

        const corporateType=screen.getByRole('combobox', { name: 'Corporate Type' });
        fireEvent.change(corporateType, { target: { value: 'LI' } });

        await waitFor(() => { expect(screen.getByText('LIS')).toBeInTheDocument() });

        fireEvent.click(screen.getByText('LIS'));
    });

    it('should validate same number', async () => {
        customRender( <FormWrapper {...props} setCustomerNameList={jest.fn()} setWhatsAppConfiguration={jest.fn()} handleFormFieldChange={jest.fn()} /> );

        const contactNo=screen.getByRole('switch', { name: 'Contact over WhatsApp?' });
        fireEvent.click(contactNo);

        const WhatsAppNoText=screen.getByRole('switch', { name: 'Use mobile no as WhatsApp no?' });
        fireEvent.click(WhatsAppNoText);

        const whatsAppNumber=screen.getByRole('textbox', { name: 'Whatsapp Number' });
        fireEvent.change(whatsAppNumber, { target: { value: '9999999998' } });

        const mobileNumber=screen.getByRole('textbox', { name: 'Mobile Number' });
        fireEvent.change(mobileNumber, { target: { value: '9999999999' } });
    });
});
