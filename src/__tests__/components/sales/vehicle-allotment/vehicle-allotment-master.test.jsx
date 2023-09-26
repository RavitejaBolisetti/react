import React from 'react';
import { VehicleAllotmentMaster } from 'components/Sales/VehicleAllotment/VehicleAllotmentMaster';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
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

describe('Vehicle Allotment Master Component', () => {
    it('should render Vehicle Allotment Master component UI', () => {
        customRender(<VehicleAllotmentMaster />);
    });

    it('should render Vehicle Allotment Master tab bars component UI', () => {
        customRender(<VehicleAllotmentMaster />);

        const unAllotted = screen.getByRole('button', { name: 'Un-Allotted' });
        fireEvent.click(unAllotted);

        const allotted = screen.getByRole('button', { name: 'Allotted' });
        fireEvent.click(allotted);
    });

    it('should render Vehicle Allotment Master search component UI', () => {
        const data = [
            { key: 1, value: 'test', id: 1 },
            { key: 2, value: 'test', id: 2 },
        ];
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                OTF: {
                    OtfSearchList: { isLoaded: false, isSearchDataLoaded: false, isLoading: false, isOTFSearchLoading: false, data: data, isDetailLoaded: false },
                },
                vehicleAllotmentData: {
                    vehicleAllotment: { detailData: data, allotmentSummaryDetails: data, data: data, allotmentSearchedList: data, filter: data, filterString: data },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <VehicleAllotmentMaster />
            </Provider>
        );

        const search = screen.getByPlaceholderText('Search by VIN No./Chassis No.');
        fireEvent.change(search, { target: { value: 'kai' } });

        const searchImg = screen.getByRole('img', { name: 'search' });
        fireEvent.click(searchImg);

        const closeBtn = screen.getByRole('img', { name: 'close-circle' });
        fireEvent.click(closeBtn);
    });

    it('should render Vehicle Allotment Master filter  component UI', () => {
        const data = [
            { key: 1, value: 'test', id: 1 },
            { key: 2, value: 'test', id: 2 },
        ];
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                OTF: {
                    OtfSearchList: { isLoaded: false, isSearchDataLoaded: false, isLoading: false, isOTFSearchLoading: false, data: data, isDetailLoaded: false },
                },
                vehicleAllotmentData: {
                    vehicleAllotment: { detailData: data, allotmentSummaryDetails: data, data: data, allotmentSearchedList: data, filter: data, filterString: data },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <VehicleAllotmentMaster />
            </Provider>
        );

        const filter = screen.getByRole('button', { name: 'Advanced Filters' });
        fireEvent.click(filter);

        const model = screen.getByRole('combobox', { name: 'Model' });
        fireEvent.change(model, { target: { value: 'test' } });

        const vehicleStatus = screen.getByRole('combobox', { name: 'Vehicle Status' });
        fireEvent.change(vehicleStatus, { target: { value: 'test' } });

        const pdiDone = screen.getByRole('combobox', { name: 'PDI Done' });
        fireEvent.change(pdiDone, { target: { value: 'test' } });

        const applyFilter = screen.getByRole('button', { name: 'Apply Filter' });
        fireEvent.click(applyFilter);
    });

    it('should render Vehicle Allotment Master filter reset button component UI', () => {
        customRender(<VehicleAllotmentMaster />);

        const filter = screen.getByRole('button', { name: 'Advanced Filters' });
        fireEvent.click(filter);

        const reset = screen.getByRole('button', { name: 'Reset' });
        fireEvent.click(reset);
    });

    it('should render Vehicle Allotment Master filter close button component UI', () => {
        customRender(<VehicleAllotmentMaster />);

        const filter = screen.getByRole('button', { name: 'Advanced Filters' });
        fireEvent.click(filter);

        const close = screen.getByRole('button', { name: 'Close' });
        fireEvent.click(close);
    });

    it('clear button should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                vehicleAllotmentData: {
                    vehicleAllotment: { filter: { advanceFilter: 'Test', vehicleStatus: true, pdDone: 'test' } },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <VehicleAllotmentMaster />
            </Provider>
        );

        const clearBtn = screen.getByRole('button', { name: 'Clear' });
        fireEvent.click(clearBtn);
    });

    it('should be able to search value', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                vehicleAllotmentData: {
                    vehicleAllotment: { filter: { advanceFilter: 'Test', pdDone: 'Yes', vehicleStatus: 'In-Transit', model: 'ALTURAS G4 2WD BSVI DSAT SILVER', key: 'searchParam' } },
                },
            },
        });

        customRender(
            <Provider store={mockStore}>
                <VehicleAllotmentMaster />
            </Provider>
        );

        const advanceFilter = screen.getByPlaceholderText('Search by VIN No./Chassis No.');
        fireEvent.change(advanceFilter, { target: { value: 'Test' } });

        const removeFilter = screen.getAllByTestId('removeFilter');
        fireEvent.click(removeFilter[0]);
    });

    it('Should render list data table components', () => {
        const formData = { allotmentStatus: '', vehicleOTFDetails: {} };
        const tableDataItem = [];

        customRender(<VehicleAllotmentMaster showAddButton={true} isVisible={true} handleButtonClick={jest.fn()} tableData={tableDataItem} formData={formData} />);

        const unAllotted = screen.getByRole('button', { name: 'Un-Allotted' });
        fireEvent.click(unAllotted);
    });
});
