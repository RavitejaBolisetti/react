/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
*/

/* eslint-disable jest/no-mocks-import */
import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { Provider } from 'react-redux';
import createMockStore from '__mocks__/store';
import { ExchangeVehiclesMaster } from '@components/Sales/OTF/ExchangeVehicles/ExchangeVehiclesMaster';
import { Form } from 'antd';
import { act } from 'react-dom/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    const mockForm = {
        ...form,
        setFieldsValue: jest.fn(),
        resetFields: jest.fn(),
        validateFields: jest.fn(),
    };
    return <ExchangeVehiclesMaster form={mockForm} {...props} />;
};

const props = {
    formActionType: { addMode: false, editMode: false, viewMode: true },
    section: { displayOnList: true, id: 1, title: 'Exchange Vehicle' },
    isDataLoaded: true,
    isLoading: false,
    selectedOrderId: '1234',
};

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

const mockStore = createMockStore({
    auth: { userId: 123 },
    data: {
        OTF: {
            ExchangeVehicle: {
                isDataLoaded: true,
                exchangeData: [{customerExpectedPrice: '12313123'}],
            },
            FinanceLov: {
                isFinanceLovDataLoaded: true,
                financeLovData: [{value: 'HDFC',}],
            },
            SchemeDetail: {
                isSchemeLovDataLoaded: true,
                schemeLovData: [{ value: 'Name'}],
            },
        },
        ConfigurableParameterEditing: { typeData: ['REL_TYPE'] },
        Vehicle: {
            MakeVehicleDetails: {
                isMakeDataLoaded: true,
                makeData: [{value: 'Maruti'}],
            },
            ModelVehicleDetails: {
                isModelDataLoaded: false,
                modelData: [{value: 'Swift'},],
            },
            VariantVehicleDetails: {
                isVariantDataLoaded: false,
                variantData: [{value: 'Swift dezire'}],
            },
        },
    },
    customer: {
        customerDetail: { isDataCustomerLoaded: false, isCustomerLoading: false, customerDetail: [] },
    },
});

describe('ExchangeVehiclesMaster component render', () => {
    it('should render addedit page', async () => {
        customRender(<ExchangeVehiclesMaster {...props} typeData={('REL_TYPE', 'MONTH')} buttonData={defaultBtnVisiblity} />);
    });

    it('should render text components', async () => {
        customRender(<ExchangeVehiclesMaster {...props} typeData={('REL_TYPE', 'MONTH')} />);

        const otfDetails = screen.getByText('Exchange Vehicle');
        expect(otfDetails).toBeTruthy();

        const booked = screen.getByText('Booked');
        expect(booked).toBeTruthy();

        const alloted = screen.getByText('Allotted');
        expect(alloted).toBeTruthy();

        const invoiced = screen.getByText('Invoiced');
        expect(invoiced).toBeTruthy();

        const delivered = screen.getByText('Delivered');
        expect(delivered).toBeTruthy();
    });

    it('should render buttons', async () => {
        customRender(
            <Provider store={mockStore}>
                <ExchangeVehiclesMaster {...props} typeData="REL_TYPE" buttonData={defaultBtnVisiblity} onCloseAction={jest.fn()} setButtonData={jest.fn()} handleButtonClick={jest.fn()}  />
            </Provider>
        );

        const close = screen.getByRole('button', { name: 'Close' });
        act(() => {
            fireEvent.click(close);
        });

        const cancel = screen.getByRole('button', { name: 'Cancel' });
        act(() => {
            fireEvent.click(cancel);
        });

        const allot = screen.getByRole('button', { name: 'Allot' });
        act(() => {
            fireEvent.click(allot);
        });

        const unallot = screen.getByRole('button', { name: 'Un-Allot' });
        act(() => {
            fireEvent.click(unallot);
        });

        const invoice = screen.getByRole('button', { name: 'Invoice' });
        act(() => {
            fireEvent.click(invoice);
        });

        const transfer = screen.getByRole('button', { name: 'Transfer OTF' });
        act(() => {
            fireEvent.click(transfer);
        });

        const cancelOtf = screen.getByRole('button', { name: 'Cancel OTF' });
        act(() => {
            fireEvent.click(cancelOtf);
        });

        const changeHistory = screen.getByRole('button', { name: 'Change History' });
        act(() => {
            fireEvent.click(changeHistory);
        });

        const saveNext = screen.getByRole('button', { name: 'Save & Next' });
        act(() => {
            fireEvent.click(saveNext);
        });
    });
});

describe('ExchangeVehiclesMaster component onSearch function should work', () => {
    const props = {
        formActionType: { addMode: false, editMode: true, viewMode: false },
        isLoading: false,
        handleButtonClick: jest.fn(),
    };

    it('onSearch when no value', () => {
        const value = '';

        customRender(<FormWrapper {...props} typeData={('REL_TYPE', 'MONTH')} setButtonData={jest.fn()} buttonData={defaultBtnVisiblity} onSearch={jest.fn(value)} />);

        const editBtn = screen.getByRole('button', { name: 'Edit', exact: false });
        act(() => {
            fireEvent.click(editBtn);
        });

        // const searchImg = screen.getByRole('img', { name: 'search', exact: false });
        // act(() => {
        //     fireEvent.click(searchImg);
        // });
    });

    it('onSearch when there is value', () => {
        const value = 'CUS1687411157049';
        const userId = '1234';
        const defaultExtraParam = [
            {
                key: 'customerType',
                title: 'Customer Type',
                value: 'IND',
                canRemove: true,
            },
            {
                key: 'pageSize',
                title: 'Value',
                value: 1000,
                canRemove: true,
            },
            {
                key: 'pageNumber',
                title: 'Value',
                value: 1,
                canRemove: true,
            },

            {
                key: 'searchType',
                title: 'Type',
                value: 'customerId',
                canRemove: true,
            },
            {
                key: 'searchParam',
                title: 'Value',
                value: value,
                canRemove: true,
            },
        ];
        const fetchCustomerList = jest.fn();

        fetchCustomerList({
            setIsLoading: jest.fn(),
            extraParams: defaultExtraParam,
            userId,
            onSuccessAction: jest.fn(),
            onErrorAction: jest.fn(),
        });

        customRender(<FormWrapper {...props} typeData={('REL_TYPE', 'MONTH')} setButtonData={jest.fn()} buttonData={defaultBtnVisiblity} onSearch={jest.fn(value)} onHandleChange={jest.fn()} showGlobalNotification={jest.fn()}/>);

        const editBtn = screen.getByRole('button', { name: 'Edit', exact: false });
        act(() => {
            fireEvent.click(editBtn);
        });

//         // const custId = screen.getByRole('textbox', { name: 'Customer ID', exact: false });
//         // fireEvent.change(custId, { target: { value: 'CUS1687411157049' } });

//         // const searchImg = screen.getByRole('img', { name: 'search', exact: false });
//         // act(() => {
//             // fireEvent.click(searchImg);
//         // });
    });
});
