/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen, fireEvent, getByRole, getByPlaceholderText } from '@testing-library/react';
import { VehiclePurchaseOrderMaster } from '@components/Sales/VehiclePurchaseOrder/VehiclePurchaseOrderMaster';
import { Form } from 'antd';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { rootReducer } from 'store/reducers';
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

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    return <VehiclePurchaseOrderMaster form={form} {...props} />;
};

const buttonData = { closeBtn: true, cancelBtn: true, editBtn: true, allotBtn: true, unAllotBtn: true, invoiceBtn: true, deliveryNoteBtn: true, transferOTFBtn: true, changeHistory: true, nextBtn: true, saveBtn: true, formBtnActive: true, cancelOtfBtn: true };

describe('Vehicle Purchase Order Master component render', () => {
    it('should render Vehicle Purchase Order component', () => {
        customRender(<VehiclePurchaseOrderMaster setFilterString={jest.fn()} resetFields={jest.fn()} handleButtonClick={jest.fn()} setFieldsValue={jest.fn()} onSuccessAction={jest.fn()} setIsLoading={jest.fn()} />);
    });

    it('should click when user click on button', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
        });
        customRender(
            <Provider store={mockStore}>
                <FormWrapper setFilterString={jest.fn()} resetFields={jest.fn()} handleButtonClick={jest.fn()} setFieldsValue={jest.fn()} onSuccessAction={jest.fn()} setIsLoading={jest.fn()} />
            </Provider>
        );
        const searchBtn = screen.getByRole('button', { name: 'search', exact: false });
        fireEvent.click(searchBtn);
        const advancedFiltersBtn = screen.getByRole('button', { name: 'Advanced Filters', exact: false });
        fireEvent.click(advancedFiltersBtn);
        const plusBtn = screen.getByRole('button', { name: 'plus Add', exact: false });
        fireEvent.click(plusBtn);
        const leftBtn = screen.getByRole('button', { name: 'left', exact: false });
        fireEvent.click(leftBtn);
        const rightBtn = screen.getByRole('button', { name: 'right', exact: false });
        fireEvent.click(rightBtn);
    });

    it('reset button should work', () => {
        customRender(<VehiclePurchaseOrderMaster />);
        const advanceFilter = screen.getByRole('button', { name: /Advanced Filters/i });
        fireEvent.click(advanceFilter);
        const resetBtn = screen.getByRole('button', { name: /Reset/i });
        fireEvent.click(resetBtn);
    });

    it('test for closing the advance filter', () => {
        customRender(<VehiclePurchaseOrderMaster />);
        const advanceFilter = screen.getByRole('button', { name: /Advanced Filters/i });
        fireEvent.click(advanceFilter);
        const closeBtn = screen.getByRole('button', { name: /Close/i });
        fireEvent.click(closeBtn);
    });

    it('should render advanced filters search clear', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                Vehicle: {
                    VehiclePurchaseOrderDetail: {
                        filter: { advanceFilter: 'Test', fromDate: '06/06/2022' },
                    },
                },
            },
        });

        customRender(
            <Provider store={mockStore}>
                <VehiclePurchaseOrderMaster />
            </Provider>
        );

        const advanceFilter = screen.getByPlaceholderText(/Search By Vehicle Purchase Order/i);
        fireEvent.change(advanceFilter, { target: { value: 'Test' } });

        const clearBtn = screen.getByRole('button', { name: 'Clear' });
        fireEvent.click(clearBtn);
    });

    it('should render advanced filters search', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                Vehicle: {
                    VehiclePurchaseOrderDetail: {
                        filter: { advanceFilter: 'Test', fromDate: '06/06/2022' },
                    },
                },
            },
        });

        customRender(
            <Provider store={mockStore}>
                <VehiclePurchaseOrderMaster fetchList={jest.fn()} buttonData={buttonData} setButtonData={jest.fn()} />
            </Provider>
        );
        const advanceFilter = screen.getByPlaceholderText(/Search By Vehicle Purchase Order/i);
        fireEvent.change(advanceFilter, { target: { value: 'Test' } });

        const removeFilter = screen.getByTestId('removeFilter');
        fireEvent.click(removeFilter);
    });

    it('close button should work', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                Vehicle: {
                    VehiclePurchaseOrderDetail: {
                        filter: { advanceFilter: 'Test', fromDate: '06/06/2022' },
                    },
                },
            },
        });
        const saveData = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <VehiclePurchaseOrderMaster saveData={saveData} setIsFormVisible={jest.fn()} handleButtonClick={jest.fn()} resetData={jest.fn()} fetchList={jest.fn()} buttonData={buttonData} setButtonData={jest.fn()} />
            </Provider>
        );
        const plusAdd = screen.getByRole('button', { name: 'plus Add' });
        fireEvent.click(plusAdd);

        const saveBtn = screen.getByRole('button', { name: 'Close' });
        fireEvent.click(saveBtn);
    });

    it('save button should work', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                Vehicle: {
                    VehicleAllotPriorDetail: {
                        data: [{ cancelRemarks: 'test01', cancelRemarksCode: '00test', dealerLocation: 'noid112', dealerLocationId: 'test00', dealerParentCode: '440', dealerParentName: 'test12', id: '235', modelCode: 456, modelDescription: 'test789', orderType: null, orderTypeCode: null, purchaseOrderCancelDate: null, purchaseOrderDate: null, purchaseOrderNumber: 'PO1236', purchaseOrderStatus: null, purchaseOrderStatusCode: null, quantity: null, soDate: null, soNumber: null }],
                        filter: [{ advanceFilter: true, fromDate: '06/06/2022', orderType: 'ASTK', purchaseOrderNumber: '78', purchaseOrderStatusCode: '80', status: undefined, toDate: '06/10/2022' }],
                    },
                },
            },
        });
        const saveData = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <VehiclePurchaseOrderMaster saveData={saveData} setIsFormVisible={jest.fn()} handleButtonClick={jest.fn()} fetchList={jest.fn()} resetData={jest.fn()} buttonData={buttonData} setButtonData={jest.fn()} />
            </Provider>
        );
        const plusAdd = screen.getByRole('button', { name: 'plus Add' });
        fireEvent.click(plusAdd);
        const orderType = screen.getByRole('combobox', { name: 'Order Type' });
        fireEvent.change(orderType, { target: { value: 'purchase' } });

        const newModel = screen.getByRole('combobox', { name: 'Model Description' });
        fireEvent.change(newModel, { target: { value: 'test' } });

        const spinbuttonBtn = screen.getByRole('spinbutton', { name: 'Quantity' });
        fireEvent.change(spinbuttonBtn, { target: { value: 'upDown' } });

        const submitBtn = screen.getByRole('button', { name: 'Submit' });
        fireEvent.click(submitBtn);
    });

    it('should be able to search value', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                Vehicle: {
                    VehiclePurchaseOrderDetail: {
                        filter: { advanceFilter: 'Test', fromDate: '06/06/2022' },
                    },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <VehiclePurchaseOrderMaster fetchList={jest.fn()} showAddButton={true} buttonData={buttonData} />
            </Provider>
        );
        const search = screen.getByPlaceholderText(/Search By Vehicle Purchase Order/i);
        fireEvent.change(search, { target: { value: 'test' } });

        const searchBtn = screen.getByRole('img', { name: 'search' });
        fireEvent.click(searchBtn);

        const closeCircle = screen.getByRole('img', { name: 'close-circle' });
        fireEvent.click(closeCircle);
    });

    it('search button should work', () => {
        customRender(<VehiclePurchaseOrderMaster />);
        const advanceFilter = screen.getByRole('button', { name: /Advanced Filters/i });
        fireEvent.click(advanceFilter);

        const orderType = screen.getByRole('combobox', { name: 'Order Type' });
        fireEvent.change(orderType, { target: { value: 'deliver' } });

        const purchaseOrder = screen.getByPlaceholderText('Enter purchase order number');
        fireEvent.change(purchaseOrder, { target: { value: '231' } });

        const searchBtn = screen.getAllByRole('button', { name: /Search/i });
        fireEvent.click(searchBtn[0]);
    });
});
