/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
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

    it('should click when user click on img button', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
        });
        customRender(
            <Provider store={mockStore}>
                <FormWrapper setFilterString={jest.fn()} resetFields={jest.fn()} handleButtonClick={jest.fn()} setFieldsValue={jest.fn()} onSuccessAction={jest.fn()} setIsLoading={jest.fn()} />
            </Provider>
        );
        const searchBtn = screen.getByRole('img', { name: 'search', exact: false });
        fireEvent.click(searchBtn);
        const plusBtn = screen.getByRole('img', { name: 'plus', exact: false });
        fireEvent.click(plusBtn);
        const leftBtn = screen.getByRole('img', { name: 'left', exact: false });
        fireEvent.click(leftBtn);
        const rightBtn = screen.getByRole('img', { name: 'right', exact: false });
        fireEvent.click(rightBtn);
    });

    it('should click when user click on listitem button', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
        });
        customRender(
            <Provider store={mockStore}>
                <FormWrapper setFilterString={jest.fn()} resetFields={jest.fn()} handleButtonClick={jest.fn()} setFieldsValue={jest.fn()} onSuccessAction={jest.fn()} setIsLoading={jest.fn()} />
            </Provider>
        );
        const previousPageBtn = screen.getByRole('listitem', { name: 'Previous Page' });
        fireEvent.click(previousPageBtn);
        const oneBtn = screen.getByRole('listitem', { name: '1' });
        fireEvent.click(oneBtn);
        const nextPageBtn = screen.getByRole('listitem', { name: 'Next Page' });
        fireEvent.click(nextPageBtn);
    });

    it('should click on available coulmnheader', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
        });
        customRender(
            <Provider store={mockStore}>
                <FormWrapper setFilterString={jest.fn()} resetFields={jest.fn()} handleButtonClick={jest.fn()} setFieldsValue={jest.fn()} onSuccessAction={jest.fn()} setIsLoading={jest.fn()} />
            </Provider>
        );
        const srl = screen.getByRole('columnheader', { name: 'Srl.' });
        fireEvent.click(srl);
        const purchaseOrder = screen.getByRole('columnheader', { name: 'Purchase Order Number' });
        fireEvent.click(purchaseOrder);
        const purchaseOrderDate = screen.getByRole('columnheader', { name: 'Purchase Order Date' });
        fireEvent.click(purchaseOrderDate);
        const orderType = screen.getByRole('columnheader', { name: 'Order Type' });
        fireEvent.click(orderType);
        const status = screen.getByRole('columnheader', { name: 'Status' });
        fireEvent.click(status);
        const action = screen.getByRole('columnheader', { name: 'Action' });
        fireEvent.click(action);
    });

    it('should click when user click on row button', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
        });
        customRender(
            <Provider store={mockStore}>
                <FormWrapper setFilterString={jest.fn()} resetFields={jest.fn()} handleButtonClick={jest.fn()} setFieldsValue={jest.fn()} onSuccessAction={jest.fn()} setIsLoading={jest.fn()} />
            </Provider>
        );
        const SrlBtn = screen.getByRole('row', { name: 'Srl. Purchase Order Number Purchase Order Date Order Type Status Action' });
        fireEvent.click(SrlBtn);
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
});
