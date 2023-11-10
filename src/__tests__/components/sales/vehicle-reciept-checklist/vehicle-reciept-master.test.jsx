/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { VehicleRecieptMaster } from 'components/Sales/VehicleRecieptChecklist/VehicleRecieptMaster';
import customRender from '@utils/test-utils';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { rootReducer } from 'store/reducers';
import { Form } from 'antd';

export const createMockStore = (initialState) => {
    const mockStore = configureStore({
        reducer: rootReducer,
        preloadedState: initialState,
        middleware: [thunk],
    });
    return mockStore;
};

jest.mock('components/Sales/VehicleRecieptChecklist/VehicleRecieptMasterMainContainer', () => {
    const VehicleRecieptMasterMainContainer = ({ onFinish, onCloseAction }) => (
        <div>
            <button onClick={onFinish}>Save</button>
            <button onClick={onCloseAction}>Cancel</button>
        </div>
    );
    return {
        __esModule: true,
        VehicleRecieptMasterMainContainer,
    };
});

jest.mock('store/actions/data/VehicleReceiptCheckList/VehicleReceiptChecklistMaster', () => ({
    VehicleCheclistDetailsdataActions: {},
}));

jest.mock('store/actions/data/VehicleReceiptCheckList/VehicleReceiptChecklistMain', () => ({
    vehicleReceiptChecklistdataActions: {},
}));

const FormWrapper = (props) => {
    const [advanceFilterForm] = Form.useForm();
    return <VehicleRecieptMaster advanceFilterForm={advanceFilterForm} {...props} />;
};

describe('Vehicle Reciept Master container', () => {
    it('should render vehicle reciept master container components', () => {
        customRender(<VehicleRecieptMaster setFilterString={jest.fn()} isVisible={true} />);

        const pendingBtn = screen.getByRole('button', { name: 'Pending' });
        fireEvent.click(pendingBtn);

        const partiallyCompetedBtn = screen.getByRole('button', { name: 'Partially Completed' });
        fireEvent.click(partiallyCompetedBtn);

        const completedBtn = screen.getByRole('button', { name: 'Completed' });
        fireEvent.click(completedBtn);

        const searchBtn = screen.getByRole('button', { name: 'search' });
        fireEvent.click(searchBtn);

        const filterBtn = screen.getByRole('button', { name: 'Advance Filters' });
        fireEvent.click(filterBtn);

        const leftBtn = screen.getByRole('button', { name: 'left' });
        fireEvent.click(leftBtn);

        const rightBtn = screen.getByRole('button', { name: 'right' });
        fireEvent.click(rightBtn);

        const search = screen.getByPlaceholderText('Search receipt number');
        fireEvent.change(search, { target: { value: 'test' } });

        const closeBtn = screen.getByRole('button', { name: 'close-circle' });
        fireEvent.click(closeBtn);
    });

    it('should render Advance Filters apply', () => {
        customRender(<VehicleRecieptMaster isVisible={true} setFilterString={jest.fn()} disabledDate={false} />);

        const filterBtn = screen.getByRole('button', { name: 'Advance Filters' });
        fireEvent.click(filterBtn);

        const receiptDate = screen.getByRole('textbox', { name: 'Receipt From Date' });
        fireEvent.change(receiptDate, { target: { value: '06/06/2022' } });

        const receiptToDate = screen.getByRole('textbox', { name: 'Receipt To Date' });
        fireEvent.change(receiptToDate, { target: { value: '06/06/2022' } });

        const applyBtn = screen.getByRole('button', { name: 'Apply' });
        fireEvent.click(applyBtn);

        const closeImg = screen.getByRole('img', { name: 'close' });
        fireEvent.click(closeImg);
    });

    it('should render Advance Filters reset', () => {
        customRender(<VehicleRecieptMaster setFilterString={jest.fn()} isVisible={true} buttonkey={'P'} />);

        const filterBtn = screen.getByRole('button', { name: 'Advance Filters' });
        fireEvent.click(filterBtn);

        const receiptDate = screen.getByRole('textbox', { name: 'Receipt From Date' });
        fireEvent.change(receiptDate, { target: { value: 'test' } });

        const receiptToDate = screen.getByRole('textbox', { name: 'Receipt To Date' });
        fireEvent.click(receiptToDate);

        const resetBtn = screen.getByRole('button', { name: 'Reset' });
        fireEvent.click(resetBtn);
    });

    it('should render Advance Filters search', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                VehicleReceiptChecklist: {
                    VehicleReceiptMain: {
                        filter: { advanceFilter: 'Test', fromDate: '06/06/2022' },
                    },
                },
            },
        });

        customRender(
            <Provider store={mockStore}>
                <VehicleRecieptMaster setFilterString={jest.fn()} fetchList={jest.fn()} />
            </Provider>
        );

        const advanceFilter = screen.getByPlaceholderText(/Search receipt number/i);
        fireEvent.change(advanceFilter, { target: { value: 'Test' } });

        const removeFilter = screen.getByTestId('removeFilter');
        fireEvent.click(removeFilter);
    });

    it('reset button should work', () => {
        customRender(<FormWrapper setFilterString={jest.fn()} fetchProductList={jest.fn()} />);
        const advanceFilter = screen.getByRole('button', { name: /Advance Filters/i });
        fireEvent.click(advanceFilter);
        const resetBtn = screen.getByRole('button', { name: /Reset/i });
        fireEvent.click(resetBtn);
    });

    it('test for closing the advance filter', () => {
        customRender(<FormWrapper setFilterString={jest.fn()} fetchProductList={jest.fn()} />);
        const advanceFilter = screen.getByRole('button', { name: /Advance Filters/i });
        fireEvent.click(advanceFilter);
        const closeBtn = screen.getByRole('button', { name: /Close/i });
        fireEvent.click(closeBtn);
    });

    it('Apply for onfinish failed', async () => {
        customRender(<FormWrapper isVisible={true} setFilterString={jest.fn()} fetchProductList={jest.fn()} />);
        const advanceFilter = screen.getByRole('button', { name: /Advance Filters/i });
        fireEvent.click(advanceFilter);
        const searchBtn = screen.getByRole('button', { name: /Apply/i });
        fireEvent.click(searchBtn);
    });

    it('should render Save button', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                VehicleReceiptChecklist: {
                    VehicleReceiptMain: { isLoaded: true, filter: { advanceFilter: true, grnNumber: '567', model: 'testing', fromDate: '01/01/2000', toDate: '01/01/2002' }, key: 'checklistStatus' },
                },
            },
        });

        const fetchList = jest.fn();
        const fetchDetailList = jest.fn();
        const saveData = jest.fn();
        const buttonData = { closeBtn: true, cancelBtn: true, editBtn: true, allotBtn: true, unAllotBtn: true, invoiceBtn: true, deliveryNoteBtn: true, transferOTFBtn: true, changeHistory: true, nextBtn: true, saveBtn: true, formBtnActive: true, cancelOtfBtn: true };

        customRender(
            <Provider store={mockStore}>
                <VehicleRecieptMaster setFilterString={jest.fn()} resetCheckListData={jest.fn()} fetchProductList={jest.fn()} fetchDetailList={fetchDetailList} saveData={saveData} setIsFormVisible={jest.fn()} handleButtonClick={jest.fn()} fetchList={fetchList} buttonData={buttonData} setButtonData={jest.fn()} />
            </Provider>
        );
        const save = screen.getByRole('button', { name: 'Save' });
        fireEvent.click(save);

        await waitFor(() => {
            expect(saveData).toHaveBeenCalled();
        });
        saveData.mock.calls[0][0].onSuccess();
        saveData.mock.calls[0][0].onError();
    });

    it('onSuccessAction should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                VehicleReceiptChecklist: {
                    VehicleReceiptMain: { isLoaded: true, filter: { advanceFilter: true, grnNumber: '567', model: 'testing', fromDate: '01/01/2000', toDate: '01/01/2002' }, key: 'checklistStatus' },
                },
            },
        });

        const fetchList = jest.fn();
        const fetchDetailList = jest.fn();
        const buttonData = { closeBtn: true, cancelBtn: true, editBtn: true, allotBtn: true, unAllotBtn: true, invoiceBtn: true, deliveryNoteBtn: true, transferOTFBtn: true, changeHistory: true, nextBtn: true, saveBtn: true, formBtnActive: true, cancelOtfBtn: true };

        customRender(
            <Provider store={mockStore}>
                <VehicleRecieptMaster setFilterString={jest.fn()} fetchDetailList={fetchDetailList} handleButtonClick={jest.fn()} fetchList={fetchList} buttonData={buttonData} setButtonData={jest.fn()} />
            </Provider>
        );
        fetchList.mock.calls[0][0].onSuccessAction();
        fetchList.mock.calls[0][0].onErrorAction();
    });

    it('clear button should work', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                VehicleReceiptChecklist: {
                    VehicleReceiptMain: { isLoaded: true, filter: { advanceFilter: true, grnNumber: '567', model: 'testing', fromDate: '01/01/2000', toDate: '01/01/2002' }, key: 'checklistStatus' },
                },
            },
        });
        const fetchList = jest.fn();
        customRender(
            <Provider store={mockStore}>
                <VehicleRecieptMaster fetchList={fetchList} fetchProductList={jest.fn()} setFilterString={jest.fn()} />
            </Provider>
        );
        const approved = screen.getByRole('button', { name: 'Partially Completed' });
        fireEvent.click(approved);

        const searchBox = screen.getByRole('textbox', { name: '' });
        fireEvent.change(searchBox, { target: { value: 'Kai' } });

        const searchBtn = screen.getByRole('button', { name: 'search' });
        fireEvent.click(searchBtn);

        const advanceFilter = screen.getByPlaceholderText(/Search receipt number/i);
        fireEvent.change(advanceFilter, { target: { value: 'Test' } });

        const clearBtn = screen.getByRole('button', { name: /Clear/i });
        fireEvent.click(clearBtn);
    });

    it('cancel button should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                VehicleReceiptChecklist: {
                    VehicleReceiptMain: { isLoaded: true, filter: { advanceFilter: true, grnNumber: '567', model: 'testing', fromDate: '01/01/2000', toDate: '01/01/2002' }, key: 'checklistStatus' },
                },
            },
        });

        const fetchList = jest.fn();
        const fetchDetailList = jest.fn();
        const buttonData = { closeBtn: true, cancelBtn: true, editBtn: true, allotBtn: true, unAllotBtn: true, invoiceBtn: true, deliveryNoteBtn: true, transferOTFBtn: true, changeHistory: true, nextBtn: true, saveBtn: true, formBtnActive: true, cancelOtfBtn: true };

        customRender(
            <Provider store={mockStore}>
                <VehicleRecieptMaster setFilterString={jest.fn()} resetCheckListData={jest.fn()} fetchProductList={jest.fn()} fetchDetailList={fetchDetailList} setIsFormVisible={jest.fn()} handleButtonClick={jest.fn()} fetchList={fetchList} buttonData={buttonData} setButtonData={jest.fn()} />
            </Provider>
        );
        const btnClick = screen.getByRole('button', { name: 'Cancel', exact: false });
        fireEvent.click(btnClick);
    });
});
