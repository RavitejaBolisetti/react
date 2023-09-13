import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { VehicleRecieptMaster } from '@components/Sales/VehicleRecieptChecklist/VehicleRecieptMaster';
import customRender from '@utils/test-utils';
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


describe('Vehicle Reciept Master container', () => {
    it('should render vehicle reciept master container components', () => {
        customRender(<VehicleRecieptMaster isVisible={true} />);

        const pendingBtn = screen.getByRole('button', { name: 'Pending' });
        fireEvent.click(pendingBtn);

        const partiallyCompetedBtn = screen.getByRole('button', { name: 'Partially Completed' });
        fireEvent.click(partiallyCompetedBtn);

        const completedBtn = screen.getByRole('button', { name: 'Completed' });
        fireEvent.click(completedBtn);

        const searchBtn = screen.getByRole('button', { name: 'search' });
        fireEvent.click(searchBtn);

        const filterBtn = screen.getByRole('button', { name: 'Advanced Filters' });
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

    it('should render advanced filters apply', () => {
        customRender(<VehicleRecieptMaster isVisible={true} disabledDate={false} />);

        const filterBtn = screen.getByRole('button', { name: 'Advanced Filters' });
        fireEvent.click(filterBtn);

        const receiptDate = screen.getByRole('textbox', { name: 'Receipt From Date' });
        fireEvent.change(receiptDate, { target: { value: '06/06/2022' } });

        const receiptToDate = screen.getByRole('textbox', { name: 'Receipt To Date' });
        fireEvent.change(receiptToDate, { target: { value: '06/06/2022' } });

        const model = screen.getByRole('combobox', { name: 'Model' });
        fireEvent.change(model, { target: { value: 'test' } });

        const applyBtn = screen.getByRole('button', { name: 'Apply' });
        fireEvent.click(applyBtn);

        const closeImg = screen.getByRole('img', { name: 'close' });
        fireEvent.click(closeImg);
    });

    it('should render advanced filters reset', () => {
        customRender(<VehicleRecieptMaster isVisible={true} buttonkey={'P'} />);

        const filterBtn = screen.getByRole('button', { name: 'Advanced Filters' });
        fireEvent.click(filterBtn);

        const receiptDate = screen.getByRole('textbox', { name: 'Receipt From Date' });
        fireEvent.change(receiptDate, { target: { value: 'test' } });

        const receiptToDate = screen.getByRole('textbox', { name: 'Receipt To Date' });
        fireEvent.click(receiptToDate);

        const model = screen.getByRole('combobox', { name: 'Model' });
        fireEvent.change(model, { target: { value: 'test' } });

        const resetBtn = screen.getByRole('button', { name: 'Reset' });
        fireEvent.click(resetBtn);
    });

    it('should render advanced filters search clear', () => {
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
                <VehicleRecieptMaster />
            </Provider>
        );

        const advanceFilter = screen.getByPlaceholderText(/Search receipt number/i);
        fireEvent.change(advanceFilter, { target: { value: 'Test' } });

        const clearBtn = screen.getByRole('button', { name: 'Clear' });
        fireEvent.click(clearBtn);
    });

    it('should render advanced filters search', () => {
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
                <VehicleRecieptMaster />
            </Provider>
        );

        const advanceFilter = screen.getByPlaceholderText(/Search receipt number/i);
        fireEvent.change(advanceFilter, { target: { value: 'Test' } });

        const removeFilter = screen.getByTestId('removeFilter');
        fireEvent.click(removeFilter);
    });
});
