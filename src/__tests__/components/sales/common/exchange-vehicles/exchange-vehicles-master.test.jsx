/* eslint-disable testing-library/no-wait-for-side-effects */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-debugging-utils */
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
import { ExchangeVehiclesMaster } from 'components/Sales/Common/ExchangeVehicles/ExchangeVehiclesMaster';
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

const StatusBar = () => <div>No Status Bar</div>;

const FormActionButton = ({ onFinish }) => (
    <div>
        <Button htmlType="submit" type="primary" onClick={onFinish}>
            Save
        </Button>
    </div>
);

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    const extractDataFromXML = jest.fn(() => ({ exchange: true }));
    const myMock = {
        ...form,
        getFieldValue: extractDataFromXML.mockReturnValue({ exchange: true }),
    };

    return <ExchangeVehiclesMaster form={myMock} {...props} />;
};

jest.mock('store/actions/data/otf/exchangeVehicle', () => ({
    schemeDataActions: {},
}));

describe('Exchange vehicles master component render', () => {
    const exchangeData = [
        {
            customerName: 'test',
            exchange: 1,
            hypothicatedToCode: '174',
            id: '',
            kilometer: '7887',
            make: 'MR',
            modelGroup: 'MR011',
            monthOfRegistrationCode: '5',
            oldChessisNumber: '98878',
            oldRegistrationNumber: '56788',
            otfId: 'd7d0f394-5e38-4e2b-b732-6f8fffb61a65',
            otfNumber: 'OTF23D010049',
            relationshipCode: 'BH',
            schemeAmount: 0,
            schemeCode: '39d9a4a6-c671-4798-898e-e1fae920f7e0',
            usageCode: 'F',
            variant: 'Alto-old',
            yearOfRegistrationCode: 2017,
        },
    ];
    it('Should render exchange vehicle master components', () => {
        const formData = { exchange: 1, id: 1 };
        const formActionType = { editMode: true, viewMode: false };
        const filteredModelData = [
            { key: 'HN3', parentKey: 'HN', value: 'Accord' },
            { key: 'HN2', parentKey: 'HN1', value: 'Accord1' },
        ];

        const props = {
            formActionType: formActionType,
            formDatar: formData,
        };

        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                OTF: {
                    ExchangeVehicle: { isLoaded: true, data: exchangeData, exchangeData },
                },
            },
        });

        customRender(
            <Provider store={mockStore}>
                <FormWrapper filteredModelData={filteredModelData} handleFormValueChange={jest.fn()} fnSetData={jest.fn()} fetchProductLovCode={jest.fn()} fetchCustomerList={jest.fn()} setFormData={jest.fn()} resetData={jest.fn()} fieldNames={{ label: 'value', value: 'key' }} handleFilterChange={jest.fn()} {...props} StatusBar={StatusBar} FormActionButton={FormActionButton} />
            </Provider>
        );

        const switchBtn = screen.getByRole('switch', { name: 'Exchange' });
        fireEvent.click(switchBtn);
        expect(switchBtn).toBeInTheDocument();

        const combobox = screen.getByRole('combobox', { name: '' });
        fireEvent.change(combobox, { target: { value: 'testing' } });

        const make = screen.getByTestId('make');
        fireEvent.click(make);

        const make1 = screen.getByRole('combobox', { name: 'Make' });
        fireEvent.change(make1, { target: { value: 'testing' } });

        const search = screen.getByRole('button', { name: 'search' });
        fireEvent.click(search);

        const save = screen.getByRole('button', { name: 'Save' });
        fireEvent.click(save);
    });

    it('Should render exchange vehicle master search components', () => {
        const formData = { exchange: 1, id: 1 };
        const formActionType = { editMode: true, viewMode: false };
        const filteredModelData = [
            { key: 'HN3', parentKey: 'HN', value: 'Accord' },
            { key: 'HN2', parentKey: 'HN1', value: 'Accord1' },
        ];

        const props = {
            formActionType: formActionType,
            formDatar: formData,
        };

        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                OTF: {
                    ExchangeVehicle: { isLoaded: true, data: exchangeData, exchangeData },
                },
            },
        });

        const fetchList = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <FormWrapper isVisible={true} fetchList={fetchList} filteredModelData={filteredModelData} handleFormValueChange={jest.fn()} fnSetData={jest.fn()} fetchProductLovCode={jest.fn()} setFormData={jest.fn()} resetData={jest.fn()} handleFilterChange={jest.fn()} {...props} StatusBar={StatusBar} FormActionButton={FormActionButton} />
            </Provider>
        );

        const switchBtn = screen.getByRole('switch', { name: 'Exchange' });
        fireEvent.click(switchBtn);
        expect(switchBtn).toBeInTheDocument();

        const combobox = screen.getByRole('combobox', { name: '' });
        fireEvent.change(combobox, { target: { value: 'testing' } });

        const searchInput = screen.getByPlaceholderText('Search');
        fireEvent.change(searchInput, { target: { value: 'testing' } });

        const search = screen.getByRole('button', { name: 'search' });
        fireEvent.click(search);

        const closeCircle = screen.getByRole('button', { name: 'close-circle' });
        fireEvent.click(closeCircle);
    });

    it('Should render exchange vehicle master view components', () => {
        const formData = { exchange: 1, id: 1 };
        const formActionType = { editMode: false, viewMode: true };
        const filteredModelData = [
            { key: 'HN3', parentKey: 'HN', value: 'Accord' },
            { key: 'HN2', parentKey: 'HN1', value: 'Accord1' },
        ];

        const props = {
            formActionType: formActionType,
            formDatar: formData,
        };

        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                OTF: {
                    ExchangeVehicle: { isLoaded: true, data: exchangeData, exchangeData },
                },
            },
        });

        customRender(
            <Provider store={mockStore}>
                <FormWrapper filteredModelData={filteredModelData} handleFormValueChange={jest.fn()} fnSetData={jest.fn()} fetchProductLovCode={jest.fn()} fetchCustomerList={jest.fn()} setFormData={jest.fn()} resetData={jest.fn()} handleFilterChange={jest.fn()} {...props} StatusBar={StatusBar} FormActionButton={FormActionButton} />
            </Provider>
        );
    });

    it('mockStore', async () => {
        const formActionType = {
            viewMode: false,
        };
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
        });

        customRender(
            <Provider store={mockStore}>
                <FormWrapper saveData={saveData} schemeLovData={[{ value: 'Name' }]} financeLovData={[{ value: 'Name' }]} filteredModelData={[{ value: 'Maruti' }]} handleButtonClick={jest.fn()} resetData={jest.fn()} fetchCustomerList={jest.fn()} fetchList={fetchList} typeData="REL_TYPE" StatusBar={StatusBar} formActionType={formActionType} FormActionButton={FormActionButton} {...props} setfilteredModelData={jest.fn()} setfilteredVariantData={jest.fn()} />
            </Provider>
        );

        const switchBtn = screen.getByRole('switch', { name: 'Exchange' });
        fireEvent.click(switchBtn);
        expect(switchBtn).toBeInTheDocument();

        const combobox = screen.getByRole('combobox', { name: '' });
        fireEvent.change(combobox, { target: { value: 'testing' } });

        const kms = screen.getByRole('textbox', { name: 'KMS' });
        fireEvent.change(kms, { target: { value: 'testing' } });

        const vINNumber = screen.getByRole('textbox', { name: 'VIN' });
        fireEvent.change(vINNumber, { target: { value: 'testing' } });

        const customerName = screen.getByRole('textbox', { name: 'Customer Name' });
        fireEvent.change(customerName, { target: { value: 'testing' } });

        const schemeAmount = screen.getByRole('textbox', { name: 'Scheme Amount' });
        fireEvent.change(schemeAmount, { target: { value: 'testing' } });

        const customerExpectedPrice = screen.getByRole('textbox', { name: 'Customer Expected Price' });
        fireEvent.change(customerExpectedPrice, { target: { value: 'testing' } });

        const procurementPrice = screen.getByRole('textbox', { name: 'Procurement Price' });
        fireEvent.change(procurementPrice, { target: { value: 'testing' } });

        const make = screen.getByRole('combobox', { name: 'Make' });
        fireEvent.change(make, { target: { value: 'testing' } });

        const modelGroup = screen.getByRole('combobox', { name: 'Model Group' });
        fireEvent.change(modelGroup, { target: { value: 'testing' } });

        const variantField = screen.getByRole('combobox', { name: 'Variant' });
        fireEvent.change(variantField, { target: { value: 'testing' } });

        const usage = screen.getByRole('combobox', { name: 'Usage' });
        fireEvent.change(usage, { target: { value: 'testing' } });

        const yearofRegistration = screen.getByRole('combobox', { name: 'Year of Registration' });
        fireEvent.change(yearofRegistration, { target: { value: 'testing' } });

        const monthofRegistration = screen.getByRole('combobox', { name: 'Month of Registration' });
        fireEvent.change(monthofRegistration, { target: { value: 'testing' } });

        const HypothecatedTo = screen.getByRole('combobox', { name: 'Hypothecated To' });
        fireEvent.change(HypothecatedTo, { target: { value: 'testing' } });

        const Relationship = screen.getByRole('combobox', { name: 'Relationship' });
        fireEvent.change(Relationship, { target: { value: 'testing' } });

        const SchemeName = screen.getByRole('combobox', { name: 'Scheme Name' });
        fireEvent.change(SchemeName, { target: { value: 'testing' } });

        const save = screen.getAllByRole('button', { name: 'Save' });
        fireEvent.click(save[0]);

        await waitFor(() => {
            expect(saveData).toHaveBeenCalled();
        });

        fetchList.mock.calls[0][0].onSuccessAction();
        fetchList.mock.calls[0][0].onErrorAction();

        saveData.mock.calls[0][0].onSuccess();
        saveData.mock.calls[0][0].onError();
    });
});
