/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { CustomerDetailsMaster } from 'components/Sales/OTF/CustomerDetails/CustomerDetailsMaster';
import { Provider } from 'react-redux';
import createMockStore from '__mocks__/store';

const StatusBar = () => <div>Status Bar</div>;
const FormActionButton = () => <div>Form Action Button</div>;

let mockValues = {
    bookingCustomer: {
        customerId: '123',
    },
};

jest.mock('components/Sales/Common/CustomerDetails/AddEditForm', () => {
    const AddEditForm = ({ onFinish, fnSetData }) => {
        const values = mockValues;
        return (
            <div>
                <button onClick={() => onFinish(values)}>Save</button>
                <button onClick={fnSetData}>Set Data</button>
            </div>
        );
    };
    return {
        __esModule: true,
        AddEditForm,
    };
});

jest.mock('store/actions/data/otf/customerDetails', () => ({
    otfCustomerDetailsAction: {},
}));

describe('CustomerDetailsMaster Components', () => {
    it('test for success', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                OTF: {
                    OtfCustomerDetails: { isLoaded: true, data: [{ name: 'Kai' }] },
                },
            },
        });

        const fetchList = jest.fn();
        const saveData = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <CustomerDetailsMaster handleButtonClick={jest.fn()} saveData={saveData} resetData={jest.fn()} StatusBar={StatusBar} fetchList={fetchList} FormActionButton={FormActionButton} setButtonData={jest.fn()} selectedRecordId={106} />
            </Provider>
        );

        fetchList.mock.calls[0][0].onErrorAction();

        mockValues = {
            bookingCustomer: {
                customerId: '123',
            },
        };

        const saveBtn = screen.getByRole('button', { name: 'Save' });
        fireEvent.click(saveBtn);

        const setData = screen.getByRole('button', { name: 'Set Data' });
        fireEvent.click(setData);

        await waitFor(() => {
            expect(saveData).toHaveBeenCalled();
        });

        saveData.mock.calls[0][0].onSuccess();
        saveData.mock.calls[0][0].onError();
    });

    it('test for view', async () => {
        const formActionType = { viewMode: true };
        const fetchList = jest.fn();
        const saveData = jest.fn();

        customRender(<CustomerDetailsMaster formActionType={formActionType} handleButtonClick={jest.fn()} saveData={saveData} resetData={jest.fn()} StatusBar={StatusBar} fetchList={fetchList} FormActionButton={FormActionButton} setButtonData={jest.fn()} selectedRecordId={106} />);
    });
});
