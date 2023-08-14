import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { ViewDetail } from '@components/common/CustomerMaster/IndividualCustomer/CustomerDetail/ViewDetail';
import customRender from '@utils/test-utils';
import { RejectionModal } from '@components/common/CustomerMaster/IndividualCustomer/CustomerDetail/RejectionModal';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
import { Form } from 'antd';

const props = { setactiveKey: jest.fn(), setIsLoading: jest.fn(), onCloseAction: jest.fn(), onCloseActionOnContinue: jest.fn() };

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    return <ViewDetail form={form} {...props} />;
};

describe('Corporate customer view Details render', () => {
    it('should render view details page', async () => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                CustomerMaster: {
                    NameChangeRequest: { isLoaded: true },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <FormWrapper {...props} onCloseAction={jest.fn()} onCloseActionOnContinue={jest.fn()} />
            </Provider>
        );
        screen.debug();
    });

    it('should render all text', async () => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                CustomerMaster: {
                    NameChangeRequest: { isLoaded: false },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <FormWrapper {...props} onCloseAction={jest.fn()} onCloseActionOnContinue={jest.fn()} />
            </Provider>
        );
        // customRender(<FormWrapper {...props} />);

        const mobileNo = screen.getByText('Mobile Number');
        expect(mobileNo).toBeTruthy();

        const customerType = screen.getByText('Customer Type');
        expect(customerType).toBeTruthy();

        const customerName = screen.getByText('Customer Name');
        expect(customerName).toBeTruthy();

        const pending = screen.getByText('Pending for Approval');
        expect(pending).toBeTruthy();

        const pendingBtn = screen.getByRole('button', { name: 'View History' });
        fireEvent.click(pendingBtn);
        expect(pendingBtn).toBeTruthy();

        const mobineNo = screen.getByRole('columnheader', { name: 'Mobile Number' });
        expect(mobineNo).toBeTruthy();

        const emailId = screen.getByRole('columnheader', { name: 'Email Id' });
        expect(emailId).toBeTruthy();

        const WhatsAppNo = screen.getByRole('columnheader', { name: 'Do you want to contact over whatsapp?' });
        expect(WhatsAppNo).toBeTruthy();

        const wantTo = screen.getByRole('columnheader', { name: 'Want to use Mobile no as whatsapp no?' });
        expect(wantTo).toBeTruthy();

        const whatsappNo = screen.getByRole('columnheader', { name: 'Whatsapp Number' });
        expect(whatsappNo).toBeTruthy();

        const corporateType = screen.getByRole('columnheader', { name: 'Corporate Type' });
        expect(corporateType).toBeTruthy();

        const corporateName = screen.getByRole('columnheader', { name: 'Corporate Name' });
        expect(corporateName).toBeTruthy();

        const corporateCatagory = screen.getByRole('columnheader', { name: 'Corporate Category' });
        expect(corporateCatagory).toBeTruthy();

        const membershipType = screen.getByRole('columnheader', { name: 'Membership Type' });
        expect(membershipType).toBeTruthy();

        const plusMinus = screen.getByRole('button', { name: 'plus -' });
        fireEvent.click(plusMinus);
        expect(plusMinus).toBeTruthy();

        const plusImg = screen.getByRole('img', { name: 'minus' });
        expect(plusImg).toBeTruthy();
    });
});

describe('Corporate customer view Details render', () => {
    it('should render view details page', async () => {
        const props = { onCloseAction: jest.fn(), onCloseActionOnContinue: jest.fn() };
        customRender(<RejectionModal {...props} />);
    });
});
