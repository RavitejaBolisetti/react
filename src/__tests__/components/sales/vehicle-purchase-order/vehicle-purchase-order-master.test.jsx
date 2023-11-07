/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen, fireEvent, waitFor } from '@testing-library/react';
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

jest.mock('@components/Sales/VehiclePurchaseOrder/VehiclePurchaseOrderDetail/VehiclePurchaseOrderDetailMaster', () => {
    const VehiclePurchaseOrderDetailMaster = ({ onFinish }) => (
        <div>
            <button onClick={onFinish}>Submit</button>
        </div>
    );
    return {
        __esModule: true,
        VehiclePurchaseOrderDetailMaster,
    };
});

jest.mock('store/actions/data/vehicle/vehiclePurchaseOrderAction', () => ({
    saveVPODataActions: {},
}));

jest.mock('store/actions/data/vehicle/vehiclePurchaseOrderDetails', () => ({
    vehiclePurchaseOrderDataActions: {},
}));

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    return <VehiclePurchaseOrderMaster form={form} {...props} />;
};

const buttonData = { closeBtn: true, cancelBtn: true, editBtn: true, allotBtn: true, unAllotBtn: true, invoiceBtn: true, deliveryNoteBtn: true, transferOTFBtn: true, cancelOTFBtn: true, changeHistory: true, nextBtn: true, saveBtn: true, formBtnActive: true, cancelVPOBtn: true, cancelOtfBtn: true, nextBtn: true, saveBtn: true };

describe('Vehicle Purchase Order Master component render', () => {
    it('should render Vehicle Purchase Order component', () => {
        customRender(<VehiclePurchaseOrderMaster resetData={jest.fn()} setFilterString={jest.fn()} resetFields={jest.fn()} handleButtonClick={jest.fn()} setFieldsValue={jest.fn()} onSuccessAction={jest.fn()} setIsLoading={jest.fn()} />);
    });

    it('should click when user click on button', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
        });
        customRender(
            <Provider store={mockStore}>
                <FormWrapper resetData={jest.fn()} fetchList={jest.fn()} setFilterString={jest.fn()} resetFields={jest.fn()} handleButtonClick={jest.fn()} setFieldsValue={jest.fn()} onSuccessAction={jest.fn()} setIsLoading={jest.fn()} />
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
                <FormWrapper resetData={jest.fn()} fetchList={jest.fn()} setFilterString={jest.fn()} resetFields={jest.fn()} handleButtonClick={jest.fn()} setFieldsValue={jest.fn()} onSuccessAction={jest.fn()} setIsLoading={jest.fn()} />
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
                <FormWrapper resetData={jest.fn()} fetchList={jest.fn()} setFilterString={jest.fn()} resetFields={jest.fn()} handleButtonClick={jest.fn()} setFieldsValue={jest.fn()} onSuccessAction={jest.fn()} setIsLoading={jest.fn()} />
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
                <FormWrapper resetData={jest.fn()} fetchList={jest.fn()} setFilterString={jest.fn()} resetFields={jest.fn()} handleButtonClick={jest.fn()} setFieldsValue={jest.fn()} onSuccessAction={jest.fn()} setIsLoading={jest.fn()} />
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
                <FormWrapper resetData={jest.fn()} fetchList={jest.fn()} setFilterString={jest.fn()} resetFields={jest.fn()} handleButtonClick={jest.fn()} setFieldsValue={jest.fn()} onSuccessAction={jest.fn()} setIsLoading={jest.fn()} />
            </Provider>
        );
        const SrlBtn = screen.getByRole('row', { name: 'Srl. Purchase Order Number Purchase Order Date Order Type Status Action' });
        fireEvent.click(SrlBtn);
    });

    it('reset button should work', () => {
        customRender(<VehiclePurchaseOrderMaster resetData={jest.fn()} setFilterString={jest.fn()} />);
        const advanceFilter = screen.getByRole('button', { name: /Advanced Filters/i });
        fireEvent.click(advanceFilter);
        const resetBtn = screen.getByRole('button', { name: /Reset/i });
        fireEvent.click(resetBtn);
    });

    it('test for closing the advance filter', () => {
        customRender(<VehiclePurchaseOrderMaster setFilterString={jest.fn()} resetData={jest.fn()} />);
        const advanceFilter = screen.getByRole('button', { name: /Advanced Filters/i });
        fireEvent.click(advanceFilter);
        const closeBtn = screen.getByRole('button', { name: /Close/i });
        fireEvent.click(closeBtn);
    });

    it('advance filter search button should work', async () => {
        customRender(<VehiclePurchaseOrderMaster setFilterString={jest.fn()} resetData={jest.fn()} />);
        const advanceFilter = screen.getByRole('button', { name: /Advanced Filters/i });
        fireEvent.click(advanceFilter);
        const searchBtn = screen.getAllByRole('button', { name: /Search/i });
        fireEvent.click(searchBtn[0]);
    });

    it('advance filter Clear button should work', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                Vehicle: {
                    VehiclePurchaseOrderDetail: {
                        data: [{ effectiveFromDate: '2023-09-08', effectiveToDate: '2023-09-18', id: '123', newModelGroup: 'ALTSMM81813337450', oldModelGroup: 'ALTSMM81813337441' }],
                        filter: [{ advanceFilter: 'Test', fromDate: '06/06/2022' }],
                    },
                },
            },
        });

        const fetchList = jest.fn();
        const fetchDetailList = jest.fn();
        const filterString = { advanceFilter: true, fromDate: null, orderType: 'ASTK', purchaseOrderNumber: undefined, purchaseOrderStatusCode: undefined, status: undefined, toDate: null };

        customRender(
            <Provider store={mockStore}>
                <VehiclePurchaseOrderMaster setFilterString={jest.fn()} fetchDetailList={fetchDetailList} filterString={filterString} setIsFormVisible={jest.fn()} handleButtonClick={jest.fn()} fetchList={fetchList} resetData={jest.fn()} buttonData={buttonData} setButtonData={jest.fn()} />
            </Provider>
        );
        const searchFilter = screen.getByPlaceholderText(/Search By Vehicle Purchase Order/i);
        fireEvent.change(searchFilter, { target: { value: 'Test' } });

        const clearBtn = screen.getByRole('button', { name: 'close-circle' });
        fireEvent.click(clearBtn);
    });

    it('Submit button should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                Vehicle: {
                    VehiclePurchaseOrderDetail: {
                        data: [{ effectiveFromDate: '2023-09-08', effectiveToDate: '2023-09-18', id: '123', newModelGroup: 'ALTSMM81813337450', oldModelGroup: 'ALTSMM81813337441' }],
                        filter: [{ advanceFilter: 'Test', fromDate: '06/06/2022' }],
                    },
                },
            },
        });

        const fetchList = jest.fn();
        const saveData = jest.fn();
        const fetchDetailList = jest.fn();
        const filterString = { advanceFilter: true, fromDate: null, orderType: 'ASTK', purchaseOrderNumber: undefined, purchaseOrderStatusCode: undefined, status: undefined, toDate: null };
        const res = { data: [{ effectiveFromDate: '2023-09-08', effectiveToDate: '2023-09-18', id: '123', newModelGroup: 'ALTSMM81813337450', oldModelGroup: 'ALTSMM81813337441' }] };

        customRender(
            <Provider store={mockStore}>
                <VehiclePurchaseOrderMaster setFilterString={jest.fn()} fetchDetailList={fetchDetailList} saveData={saveData} filterString={filterString} setIsFormVisible={jest.fn()} handleButtonClick={jest.fn()} fetchList={fetchList} resetData={jest.fn()} buttonData={buttonData} setButtonData={jest.fn()} />
            </Provider>
        );
        const sumit = screen.getByRole('button', { name: 'Submit' });
        fireEvent.click(sumit);
        await waitFor(() => {
            expect(saveData).toHaveBeenCalled();
        });
        saveData.mock.calls[0][0].onSuccess(res);
        saveData.mock.calls[0][0].onError();
    });

    it('onSuccess action should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                ConfigurableParameterEditing: { filteredListData: { PO_STATS: [{ name: 'Kai', key: 106 }] } },
                Vehicle: {
                    VehiclePurchaseOrderDetail: {
                        data: { paginationData: [{ cancelRemarks: null, cancelRemarksCode: null, dealerLocation: null, dealerLocationId: null, dealerParentCode: null, dealerParentName: null, id: '5cecfd5e-f2a8-480e-9211-dc65d8e9a61a', modelCode: null, modelDescription: null, orderType: 'Against Stock', orderTypeCode: 'ASTK', purchaseOrderCancelDate: null, purchaseOrderDate: '2023-10-12', purchaseOrderNumber: 'PO23D000107', purchaseOrderStatus: 'PO Submitted', purchaseOrderStatusCode: 'POS', quantity: null, soDate: null, soNumber: null, soStatus: null, soStatusCode: null }] },
                        filter: [{ advanceFilter: 'Test', fromDate: '06/06/2022' }],
                    },
                },
            },
        });
        const fetchList = jest.fn();
        const saveData = jest.fn();
        const buttonDataa = { viewBtn: true };

        customRender(
            <Provider store={mockStore}>
                <VehiclePurchaseOrderMaster setFilterString={jest.fn()} saveData={saveData} filterString={jest.fn()} setIsFormVisible={jest.fn()} handleButtonClick={jest.fn()} fetchList={fetchList} resetData={jest.fn()} buttonDataa={buttonDataa} setButtonData={jest.fn()} />
            </Provider>
        );
        fetchList.mock.calls[0][0].onSuccessAction();
        fetchList.mock.calls[0][0].onErrorAction();

        await waitFor(() => {
            expect(screen.getByText('PO23D000107')).toBeInTheDocument();
        });

        const viewBtn = screen.getByRole('button', { name: /ai-view/i });
        fireEvent.click(viewBtn);
    });
});
