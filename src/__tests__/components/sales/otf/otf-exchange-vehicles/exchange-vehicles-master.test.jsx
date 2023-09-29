/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

/* eslint-disable jest/no-mocks-import */
import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { ExchangeVehiclesMaster } from 'components/Sales/OTF/ExchangeVehicles';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { rootReducer } from 'store/reducers';
import { Form, Button } from 'antd';

export const createMockStore = (initialState) => {
    const mockStore = configureStore({
        reducer: rootReducer,
        preloadedState: initialState,
        middleware: [thunk],
    });

    return mockStore;
};
afterEach(() => {
    jest.restoreAllMocks();
});

const StatusBar = () => <div>No Status Bar</div>;

const FormActionButton = () => (
    <div>
        <Button htmlType="submit" type="primary">
            Save
        </Button>
    </div>
);

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    const myMock = {
        ...form,
        getFieldValue: jest.fn(),
    };

    return <ExchangeVehiclesMaster form={myMock} {...props} />;
};

afterEach(() => {
    jest.restoreAllMocks();
});

const props = {
    formActionType: { addMode: false, editMode: false, viewMode: true },
    section: { displayOnList: true, id: 1, title: 'Exchange Vehicle' },
    isDataLoaded: true,
    isLoading: false,
    selectedOrderId: '1234',
};

const mockStore = createMockStore({
    auth: { userId: 123 },
    data: {
        OTF: {
            ExchangeVehicle: { isDataLoaded: true, exchangeData: [{ customerExpectedPrice: '12313123' }] },
            FinanceLov: { isFinanceLovDataLoaded: true, financeLovData: [{ value: 'HDFC' }] },
            SchemeDetail: { isSchemeLovDataLoaded: true, schemeLovData: [{ value: 'Name' }] },
        },
        ConfigurableParameterEditing: { typeData: ['REL_TYPE'] },
        Vehicle: {
            MakeVehicleDetails: { isMakeDataLoaded: true, makeData: [{ value: 'Maruti' }] },
            ModelVehicleDetails: { isModelDataLoaded: true, modelData: [{ value: 'Swift' }] },
            VariantVehicleDetails: { isVariantDataLoaded: true, variantData: [{ value: 'Swift dezire' }] },
        },
    },
    customer: {
        customerDetail: { isDataCustomerLoaded: false, isCustomerLoading: false, customerDetail: [] },
    },
});

describe('ExchangeVehiclesMaster component render', () => {
    it('Exchange switch', async () => {
        const formActionType = { addMode: false, editMode: true, viewMode: false };

        customRender(<FormWrapper StatusBar={StatusBar} FormActionButton={FormActionButton} typeData={('REL_TYPE', 'MONTH')} fnSetData={jest.fn()} formActionType={formActionType} handleFormValueChange={jest.fn()} onFinish={jest.fn()} onFinishFailed={jest.fn()} makeExtraParams={jest.fn()} />);

        const exchangeSwitch = screen.getByRole('switch', { name: 'Exchange', exact: false });
        fireEvent.click(exchangeSwitch);
    });

    it('modalOpen=false', async () => {
        customRender(<FormWrapper StatusBar={StatusBar} FormActionButton={FormActionButton} modalOpen={false} setModalOpen={jest.fn()} isVisible={true} />);
    });

    it('modalOpen=true', async () => {
        customRender(<FormWrapper StatusBar={StatusBar} FormActionButton={FormActionButton} modalOpen={true} setModalOpen={jest.fn()} isVisible={true} />);
    });

    it('mockStore', async () => {
        customRender(
            <Provider store={mockStore}>
                <FormWrapper typeData="REL_TYPE" StatusBar={StatusBar} FormActionButton={FormActionButton} {...props} setfilteredModelData={jest.fn()} setfilteredVariantData={jest.fn()} />
            </Provider>
        );
    });
});
