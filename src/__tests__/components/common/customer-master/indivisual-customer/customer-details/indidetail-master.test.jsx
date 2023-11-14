import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { CustomerDetailMaster } from '@components/common/CustomerMaster/IndividualCustomer/CustomerDetail/CustomerDetailMaster';
import customRender from '@utils/test-utils';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
import { Form } from 'antd';

beforeEach(() => {
    jest.clearAllMocks();
});

const props = { formActionType: { viewMode: false } };

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    return <CustomerDetailMaster form={form} {...props} />;
};

describe('Corporate customer  Details render', () => {
    it('should render  details page', async () => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                CustomerMaster: {
                    CustomerDetailsIndividual: {
                        isLoaded: true,
                    },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <FormWrapper {...props} selectedCustomerId={'kai'} />
            </Provider>
        );
    });

    it('should render all fields', async () => {
        customRender(<FormWrapper {...props} setIsHistoryVisible={jest.fn()} setShowNameChangeHistory={jest.fn()} />);
        const mobileNumber = screen.getByRole('textbox', { name: 'Mobile Number' });
        fireEvent.change(mobileNumber, { target: { value: '1234567890' } });

        const emailId = screen.getByRole('textbox', { name: 'Email ID' });
        fireEvent.change(emailId, { target: { value: 'Kai@test.com' } });

        const whatsappNumber = screen.getByRole('textbox', { name: 'Whatsapp Number' });
        fireEvent.change(whatsappNumber, { target: { value: '1234567890' } });

        const customerType = screen.getByRole('combobox', { name: 'Customer Type' });
        fireEvent.change(customerType, { target: { value: 'Individual' } });

        const corporateName = screen.getByRole('combobox', { name: 'Corporate Name' });
        fireEvent.change(corporateName, { target: { value: 'UYT Corporate' } });

        const corporateType = screen.getByRole('combobox', { name: 'Corporate Type' });
        fireEvent.change(corporateType, { target: { value: 'Listed' } });

        const Contact = screen.getByRole('switch', { name: 'Contact over WhatsApp?' });
        fireEvent.click(Contact);

        const mobileNo = screen.getByRole('switch', { name: 'Want to use mobile no as WhatsApp no' });
        fireEvent.click(mobileNo);

        const viewHistory = screen.getByRole('button', { name: 'View History' });
        fireEvent.click(viewHistory);

        const plusImg = screen.getByRole('img', { name: 'plus' });
        fireEvent.click(plusImg);
    });
    it('should check view details', () => {
        const prop = { formActionType: { viewMode: true } };
        customRender(<FormWrapper {...prop} />);
    });
});
