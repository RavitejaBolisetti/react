/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-debugging-utils */
/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

/* eslint-disable jest/no-mocks-import */
import React from 'react';
import { screen, fireEvent, waitFor, render } from '@testing-library/react';
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

const FormActionButton = () => (
    <div>
        <Button htmlType="submit" type="primary">
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

jest.mock('store/actions/data/productHierarchy', () => ({
    productHierarchyDataActions: {},
}));

describe('Exchange vehicles master component render', () => {
    const exchangeData = [
        {
            customerExpectedPrice: '850000',
            customerId: null,
            customerName: 'MEGHANA BHAVIN SHAH',
            exchange: 1,
            hypothicatedTo: 'AKASA FINELEASE',
            hypothicatedToCode: '182',
            id: '19a19b45-bd5a-4d52-8a0d-b4ec29b4d21d',
            kilometer: '80',
            make: 'Mahindra',
            modelGroup: 'Thar',
            monthOfRegistration: 'JUNE',
            monthOfRegistrationCode: '6',
            oldChessisNumber: 'P6C15747',
            oldRegistrationNumber: 'MH01EK6300',
            otfNumber: 'OTF24D000520',
            procurementPrice: '900000',
            relationship: 'Others',
            relationshipCode: 'RELOT',
            schemeAmount: '8000.0',
            schemeCode: null,
            schemeName: 'DISCOUNT ON  INSURANCE ',
            usage: 'Family',
            usageCode: 'F',
            variant: 'Thar4x4',
            yearOfRegistration: '2018',
            yearOfRegistrationCode: '2018',
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
                    ExchangeVehicle: { isLoaded: true, data: exchangeData },
                },
            },
        });

        customRender(
            <Provider store={mockStore}>
                <FormWrapper filteredModelData={filteredModelData} fetchProductLovCode={jest.fn()} fetchCustomerList={jest.fn()} setFormData={jest.fn()} resetData={jest.fn()} fieldNames={{ label: 'value', value: 'key' }} handleFilterChange={jest.fn()} {...props} StatusBar={StatusBar} FormActionButton={FormActionButton} />
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
                    ExchangeVehicle: { isLoaded: true, data: exchangeData },
                },
            },
        });

        customRender(
            <Provider store={mockStore}>
                <FormWrapper filteredModelData={filteredModelData} fetchProductLovCode={jest.fn()} fetchCustomerList={jest.fn()} setFormData={jest.fn()} resetData={jest.fn()} fieldNames={{ label: 'value', value: 'key' }} handleFilterChange={jest.fn()} {...props} StatusBar={StatusBar} FormActionButton={FormActionButton} />
            </Provider>
        );

        const switchBtn = screen.getByRole('switch', { name: 'Exchange' });
        fireEvent.click(switchBtn);
        expect(switchBtn).toBeInTheDocument();
        
        const combobox = screen.getByRole('combobox', { name: '' });
        fireEvent.change(combobox, { target: { value: 'testing' } });
       
        const search = screen.getByRole('button', { name: 'search' });
        fireEvent.click(search);
    });
});
