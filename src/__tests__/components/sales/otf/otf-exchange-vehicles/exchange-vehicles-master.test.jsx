/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

/* eslint-disable jest/no-mocks-import */
import React from 'react';
import { screen, fireEvent,waitFor } from '@testing-library/react';
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

jest.mock('@components/Sales/Common/ExchangeVehicles/AddEditForm', () => {
    const AddEditForm = ({ onFinish }) => (
        <div>
            <button onClick={onFinish}>Save</button>
        </div>
    );
    return {
        __esModule: true,
        AddEditForm,
    };
});

jest.mock('store/actions/data/otf/exchangeVehicle', () => ({
    schemeDataActions: {},
}));

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


const exchangeData = [{
    customerExpectedPrice: "850000",
    customerId: null,
    customerName: "MEGHANA BHAVIN SHAH",
    exchange: 1,
    hypothicatedTo: "AKASA FINELEASE",
    hypothicatedToCode: "182",
    id: "19a19b45-bd5a-4d52-8a0d-b4ec29b4d21d",
    kilometer: "80",
    make: "Mahindra",
    modelGroup: "Thar",
    monthOfRegistration: "JUNE",
    monthOfRegistrationCode: "6",
    oldChessisNumber: "P6C15747",
    oldRegistrationNumber: "MH01EK6300",
    otfNumber: "OTF24D000520",
    procurementPrice: "900000",
    relationship: "Others",
    relationshipCode: "RELOT",
    schemeAmount: "8000.0",
    schemeCode: null,
    schemeName: "DISCOUNT ON  INSURANCE ",
    usage: "Family",
    usageCode: "F",
    variant: "Thar4x4",
    yearOfRegistration: "2018",
    yearOfRegistrationCode: "2018"
}]

describe('ExchangeVehiclesMaster component render', () => {
    it('modalOpen=false', async () => {
        customRender(<FormWrapper StatusBar={StatusBar} resetData={jest.fn()} FormActionButton={FormActionButton} modalOpen={false} setModalOpen={jest.fn()} isVisible={true} />);
    });

    it('modalOpen=true', async () => {
        customRender(<FormWrapper StatusBar={StatusBar} resetData={jest.fn()} FormActionButton={FormActionButton} modalOpen={true} setModalOpen={jest.fn()} isVisible={true} />);
    });

    it('mockStore', async () => {
        const formActionType = {
            viewMode: false
        }
        const props = {
            section: { displayOnList: true, id: 1, title: 'Exchange Vehicle' },
            isDataLoaded: true,
            isLoading: false,
            selectedOrderId: '1234',
        };

        const fetchList = jest.fn();
        const saveData = jest.fn();

        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                OTF: {
                    ExchangeVehicle: { isDataLoaded: true, exchangeData: exchangeData, data: exchangeData },
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
        })


        customRender(
            <Provider store={mockStore}>
                <FormWrapper saveData={saveData} handleButtonClick={jest.fn()} resetData={jest.fn()} fetchCustomerList={jest.fn()} fetchList={fetchList} typeData="REL_TYPE" StatusBar={StatusBar} formActionType={formActionType} FormActionButton={FormActionButton} {...props} setfilteredModelData={jest.fn()} setfilteredVariantData={jest.fn()} />
            </Provider>
        );
        
        const save = screen.getAllByRole('button', { name: 'Save' })
        fireEvent.click(save[0])

        await waitFor(() => {
            expect(saveData).toHaveBeenCalled();
        });
        
        saveData.mock.calls[0][0].onSuccess();
        saveData.mock.calls[0][0].onError();
        fetchList.mock.calls[0][0].onSuccessAction();
        fetchList.mock.calls[0][0].onErrorAction();
    });
});
