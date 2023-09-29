/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import { VehiclePurchaseOrderDetailMaster } from '@components/Sales/VehiclePurchaseOrder/VehiclePurchaseOrderDetail/VehiclePurchaseOrderDetailMaster';
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

const buttonData = { closeBtn: true, cancelBtn: true, editBtn: true, allotBtn: true, unAllotBtn: true, invoiceBtn: true, deliveryNoteBtn: true, transferOTFBtn: true, changeHistory: true, nextBtn: true, saveBtn: true, formBtnActive: true, cancelOtfBtn: true };

describe('Vehicle Purchase Order Detail Master Components', () => {
    it('should render vehicle purchase order detail master components', () => {
        customRender(<VehiclePurchaseOrderDetailMaster isVisible={true} />);
    });

    it('button should work', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                Vehicle: {
                    VehicleAllotPriorDetail: {
                        ViewVPODetail: [{ isLoading: true, dealerLocation: 'noid112', dealerLocationId: 'test00', dealerParentCode: '440', dealerParentName: 'test12', modelCode: 456, modelDescription: 'test789', purchaseOrderNumber: 'PO1236', purchaseOrderStatus: null, purchaseOrderStatusCode: null, quantity: null, soDate: null, soNumber: null }],
                        DealerLocationDetail: [{ isLoading: true, cancelRemarks: 'test01', cancelRemarksCode: '00test', dealerLocation: 'noid112', dealerLocationId: 'test00', dealerParentCode: '440', dealerParentName: 'test12', id: '235', modelCode: 456, modelDescription: 'test789', orderType: null, orderTypeCode: null, purchaseOrderCancelDate: null, purchaseOrderDate: null, purchaseOrderNumber: 'PO1236' }],
                    },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <VehiclePurchaseOrderDetailMaster isVisible={true} fetchProductList={jest.fn()} fetchList={jest.fn()} saveData={jest.fn()} setIsFormVisible={jest.fn()} handleButtonClick={jest.fn()} buttonData={buttonData} setButtonData={jest.fn()} />
            </Provider>
        );
        const cancelBooking = screen.getAllByRole('button', { name: 'Cancel Booking' });
        fireEvent.click(cancelBooking[0]);
        fireEvent.click(cancelBooking[1]);
        const saveNext = screen.getByRole('button', { name: 'Save & Next' });
        fireEvent.click(saveNext);
        const next = screen.getByRole('button', { name: 'Next' });
        fireEvent.click(next);
        const close = screen.getAllByRole('button', { name: 'Close' });
        fireEvent.click(close[0]);
        fireEvent.click(close[1]);
    });
});
