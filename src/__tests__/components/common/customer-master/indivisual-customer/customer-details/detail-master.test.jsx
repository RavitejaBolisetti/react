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

    it('should render addedit details page', async () => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                CustomerMaster: {
                    CustomerDetailsIndividual: {
                        isLoaded: true
                    }
                }
            },
        });
        customRender(
            <Provider store={mockStore}>
                <FormWrapper {...props} selectedCustomerId={'kai'} />
            </Provider>
        );
    });

    it('test1', async () => {
        customRender(
            <FormWrapper {...props} setIsHistoryVisible={jest.fn()} />
        );
        const mobileNumber=screen.getByRole('textbox', { name: 'Mobile Number' });
        fireEvent.change(mobileNumber, { target: { value: '1234567890' } });

        const firstName=screen.getByRole('textbox', { name: 'First Name' });
        fireEvent.change(firstName, { target: { value: 'Kai' } });

        const middleName=screen.getByRole('textbox', { name: 'Middle Name' });
        fireEvent.change(middleName, { target: { value: 'Kai' } });

        const lastName=screen.getByRole('textbox', { name: 'Last Name' });
        fireEvent.change(lastName, { target: { value: 'Kai' } });

        const emailId=screen.getByRole('textbox', { name: 'Email ID' });
        fireEvent.change(emailId, { target: { value: 'Kai@test.com' } });

        const whatsappNumber=screen.getByRole('textbox', { name: 'Whatsapp Number' });
        fireEvent.change(whatsappNumber, { target: { value: '1234567890' } });

        const customerType=screen.getByRole('combobox', { name: 'Customer Type' });
        fireEvent.change(customerType, { target: { value: 'Individual' } });

        const viewHistory=screen.getByRole('button', { name: 'View History' });
        fireEvent.click(viewHistory);
    });
});
