/* eslint-disable jest/no-mocks-import */
import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { CustomerDetailMaster } from 'components/common/CustomerMaster/IndividualCustomer/CustomerDetail/CustomerDetailMaster';
import { AddEditForm } from 'components/common/CustomerMaster/IndividualCustomer/CustomerDetail/AddEditForm';
import customRender from '@utils/test-utils';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
import { Form } from 'antd';
import { customerDetailsIndividualDataActions } from 'store/actions/data/customerMaster/customerDetailsIndividual';

jest.mock('components/common/CustomerMaster/IndividualCustomer/CustomerDetail/AddEditForm', () => {
    const AddEditForm = ({ onFinish, setNameChangeRequested }) => { 
        const handleClick = () => {
            onFinish('test');
            setNameChangeRequested('Test')
        }
        return(
            <div><button onClick={handleClick}>Save</button></div>
        )
    };
    return {
        __esModule: true,
        AddEditForm,
    };
});

jest.mock('store/actions/data/customerMaster/customerDetailsIndividual', () => ({
    customerDetailsIndividualDataActions: {}
}))

beforeEach(() => {
    jest.clearAllMocks();
});

const props = { formActionType: { viewMode: false, editMode: true } };

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
                <FormWrapper fetchList={jest.fn()} resetData={jest.fn()} {...props} selectedCustomerId={'kai'} />
            </Provider>
        );
    });

    it('should render all fields', async () => {
        const formActionType={ 
            editMode: true,
        };

        const saveData=jest.fn();
        const res={ data: 'Kai' };
        customRender(<FormWrapper setSelectedCustomerId={jest.fn()} handleButtonClick={jest.fn()} handleResetFilter={jest.fn()} setRefreshCustomerList={jest.fn()} setButtonData={jest.fn()} fetchList={jest.fn()} resetData={jest.fn()} saveData={saveData} formActionType={formActionType} setIsHistoryVisible={jest.fn()} setShowNameChangeHistory={jest.fn()} />);

        const saveBtn=screen.getByRole('button', { name: 'Save' });
        fireEvent.click(saveBtn);

        await waitFor(() => { expect(saveData).toHaveBeenCalled() });

        saveData.mock.calls[0][0].onSuccess(res);
        saveData.mock.calls[0][0].onError();

        // const mobileNumber = screen.getByRole('textbox', { name: 'Mobile Number' });
        // fireEvent.change(mobileNumber, { target: { value: '1234567890' } });

        // const emailId = screen.getByRole('textbox', { name: 'Email ID' });
        // fireEvent.change(emailId, { target: { value: 'Kai@test.com' } });

        // const whatsappNumber = screen.getByRole('textbox', { name: 'Whatsapp Number' });
        // fireEvent.change(whatsappNumber, { target: { value: '1234567890' } });

        // const customerType = screen.getByRole('combobox', { name: 'Customer Type' });
        // fireEvent.change(customerType, { target: { value: 'Individual' } });

        // const corporateName = screen.getByRole('combobox', { name: 'Corporate Name' });
        // fireEvent.change(corporateName, { target: { value: 'UYT Corporate' } });

        // const corporateType = screen.getByRole('combobox', { name: 'Corporate Type' });
        // fireEvent.change(corporateType, { target: { value: 'Listed' } });

        // const Contact = screen.getByRole('switch', { name: 'Contact over WhatsApp?' });
        // fireEvent.click(Contact);

        // const mobileNo = screen.getByTestId('useMobileNumber');
        // fireEvent.click(mobileNo);

        // const viewHistory = screen.getByRole('button', { name: 'View History' });
        // fireEvent.click(viewHistory);

        // const plusImg = screen.getByRole('img', { name: 'plus' });
        // fireEvent.click(plusImg);
    });
    it('should check view details', () => {
        const prop = { formActionType: { viewMode: true } };
        customRender(<FormWrapper resetData={jest.fn()} {...prop} />);
    });
});
