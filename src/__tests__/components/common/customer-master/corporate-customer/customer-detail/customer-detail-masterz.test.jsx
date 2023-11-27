/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { CustomerDetailMaster } from '@components/common/CustomerMaster/CorporateCustomer/CustomerDetail/CustomerDetailMaster';
import customRender from '@utils/test-utils';
// eslint-disable-next-line jest/no-mocks-import
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
import { Form } from 'antd';

beforeEach(() => {
    jest.clearAllMocks();
});

jest.mock('@components/common/CustomerMaster/CorporateCustomer/CustomerDetail/AddEditForm', () => {
    const AddEditForm = ({ onFinish }) => (
        <div>
            <button onClick={onFinish}>Save & Next</button>
        </div>
    );
    return {
        __esModule: true,
        AddEditForm,
    };
});

jest.mock('store/actions/data/customerMaster/customerDetails', () => ({
    customerDetailsDataActions: {},
}));

const props = { formActionType: { viewMode: false } };

const FormWrapper = (props) => {
    const [form] = Form.useForm();

    const myFormMock = {
        ...form,
        resetFields: jest.fn(),
    };
    return <CustomerDetailMaster form={myFormMock} {...props} />;
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
                <FormWrapper {...props} fetchList={jest.fn()} resetData={jest.fn()} />
            </Provider>
        );
    });

    it('should render all fields', () => {
        const formActionType = {
            viewMode: false,
        };
        customRender(<FormWrapper formActionType={formActionType} fetchList={jest.fn()} resetData={jest.fn()} />);
    });

    it('should check view details', () => {
        const prop = { formActionType: { viewMode: true } };
        customRender(<FormWrapper {...prop} fetchList={jest.fn()} resetData={jest.fn()} />);
    });

    it('onFinish should work', async () => {
        const formActionType = {
            viewMode: false,
        };
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

        const fetchList = jest.fn();
        const fetchDetailList = jest.fn();
        const saveData = jest.fn();
        const buttonData = { closeBtn: true, cancelBtn: true, editBtn: true, allotBtn: true, unAllotBtn: true, invoiceBtn: true, deliveryNoteBtn: true, transferOTFBtn: true, changeHistory: true, nextBtn: true, saveBtn: true, formBtnActive: true, cancelOtfBtn: true };

        customRender(
            <Provider store={mockStore}>
                <FormWrapper resetData={jest.fn()} setFilterString={jest.fn()} setRefreshCustomerList={jest.fn()} formActionType={formActionType} fetchDetailList={fetchDetailList} saveData={saveData} handleButtonClick={jest.fn()} fetchList={fetchList} buttonData={buttonData} setButtonData={jest.fn()} />
            </Provider>
        );
        const save = screen.getAllByRole('button', { name: 'Save & Next' });
        fireEvent.click(save[0]);

        await waitFor(() => {
            expect(saveData).toHaveBeenCalled();
        });
        saveData.mock.calls[0][0].onSuccess();
        saveData.mock.calls[0][0].onError();
    });
});
