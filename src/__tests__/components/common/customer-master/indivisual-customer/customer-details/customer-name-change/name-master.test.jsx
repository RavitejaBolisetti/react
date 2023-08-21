import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { CustomerNameChangeMaster } from '@components/common/CustomerMaster/IndividualCustomer/CustomerDetail/CustomerNameChange/CustomerNameChangeMaster';
import customRender from '@utils/test-utils';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
import { Form } from 'antd';

const props = { formActionType: { viewMode: false }, setIsHistoryVisible: jest.fn(), isHistoryVisible: true };

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    return <CustomerNameChangeMaster form={form} {...props} />;
};

describe('Corporate nameChnage master Details render', () => {
    it('should render nameChnage details page', async () => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                CustomerMaster: {
                    CustomerDetailsIndividual: { isLoaded: true },
                    ViewDocument: { isLoaded: true, data: [{ id: 106 }] },
                },
                ConfigurableParameterEditing: { filteredListData: [{ id: '1', value: 'kai' }] },
                SupportingDocument: { isLoaded: true },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <FormWrapper {...props} selectedCustomerId={'kai'} setCustomerNameList={jest.fn()} />
            </Provider>
        );
    });
    it('should render all fields', async () => {
        const prop2 = { formActionType: { viewMode: false } };
        const mockStore = createMockStore({
            auth: { userId: 123 },
        });
        customRender(
            <Provider store={mockStore}>
                <FormWrapper {...prop2} selectedCustomerId={'kai'} setCustomerNameList={jest.fn()} fetchViewDocument={jest.fn()} />
            </Provider>
        );

        const customerName = screen.getByText('Customer Name');
        expect(customerName).toBeInTheDocument();

        const titleCombo = screen.getByRole('combobox', { name: 'Title' });
        fireEvent.change(titleCombo, { target: { value: 'Mr.' } });

        const firstName = screen.getByRole('textbox', { name: 'First Name' });
        fireEvent.change(firstName, { target: { value: 'kai' } });

        const middleName = screen.getByRole('textbox', { name: 'Middle Name' });
        fireEvent.change(middleName, { target: { value: 'kai' } });

        const lastName = screen.getByRole('textbox', { name: 'Last Name' });
        fireEvent.change(lastName, { target: { value: 'kai' } });

        const viewHistoryBtn = screen.getByRole('button', { name: 'View History' });
        fireEvent.click(viewHistoryBtn);

        const closeImg = screen.getByRole('img', { name: 'close' });
        fireEvent.click(closeImg);
    });
    it('should be able to close history', async () => {
        const prop2 = { formActionType: { viewMode: false } };
        const mockStore = createMockStore({
            auth: { userId: 123 },
        });
        customRender(
            <Provider store={mockStore}>
                <FormWrapper {...prop2} selectedCustomerId={'kai'} setCustomerNameList={jest.fn()} fetchViewDocument={jest.fn()} onCloseAction={jest.fn()} />
            </Provider>
        );

        const viewHistoryBtn = screen.getByRole('button', { name: 'View History' });
        fireEvent.click(viewHistoryBtn);

        const closeImg = screen.getByTestId('closed');
        fireEvent.click(closeImg);
    });
});
