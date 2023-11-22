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
import { CustomerNameChangeHistory } from 'components/common/CustomerMaster/IndividualCustomer/CustomerDetail/CustomerNameChange';

jest.mock('components/common/CustomerMaster/IndividualCustomer/CustomerDetail/AddEditForm', () => {
    const AddEditForm = ({ onFinish, setNameChangeRequested, handleFormFieldChange, onViewHistoryChange, deleteFile }) => { 
        const handleClick = () => {
            onFinish('test');
            setNameChangeRequested('Test');
            handleFormFieldChange();
        }
        return(
            <div>
                <button onClick={handleClick}>Save</button>
                <button onClick={onViewHistoryChange}>Change History</button>
                <button onClick={deleteFile}>Delete File</button>
            </div>
        )
    };
    return {
        __esModule: true,
        AddEditForm,
    };
});

jest.mock('components/common/CustomerMaster/IndividualCustomer/CustomerDetail/CustomerNameChange', () => {
    const CustomerNameChangeHistory = ({ downloadFileFromButton}) => { 
        return(
            <div>
                <button onClick={downloadFileFromButton}>Download File</button>
            </div>
        )
    };
    return {
        __esModule: true,
        CustomerNameChangeHistory,
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

        const changeHistory=screen.getByRole('button', { name: 'Change History' });
        fireEvent.click(changeHistory);

        const downloadFile=screen.getByRole('button', { name: 'Download File' });
        fireEvent.click(downloadFile);

        const deleteFile=screen.getByRole('button', { name: 'Delete File' });
        fireEvent.click(deleteFile);

    });
});
