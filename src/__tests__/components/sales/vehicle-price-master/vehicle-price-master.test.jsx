/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import { screen, fireEvent, act } from '@testing-library/react';
import customRender from '@utils/test-utils';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
import { VehiclePriceMaster } from 'components/Sales/VehiclePriceMaster';

describe('Vehicle Price Master component render', () => {
    it('should render vehicle price master component', async () => {
        customRender(<VehiclePriceMaster />);
    });

    it('should render component with all data', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                ConfigurableParameterEditing: {
                    filteredListData: {
                        paramMasterId: [{ id: 106, name: 'test' }],
                    },
                },
                VehiclePriceMaster: { filter: [{ name: 'test' }] },
                Geo: {
                    Country: { isLoaded: true, data: [{ countryCode: 106 }] },
                    State: { isFilteredListLoaded: true, filteredListData: [{ name: 'test' }] },
                    District: { isFilteredListLoaded: true, filteredListData: [{ districtCode: 106 }] },
                    City: { isFilteredListLoaded: true, filteredListData: [{ name: 'test' }] },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <VehiclePriceMaster />
            </Provider>
        );
    });

    it('Advance Filters and close button should work', async () => {
        customRender(<VehiclePriceMaster />);
        const advanceFilter = screen.getByRole('button', { name: /Advance Filters/i });
        fireEvent.click(advanceFilter);
        const closeBtn = screen.getByRole('button', { name: 'Close' });
        fireEvent.click(closeBtn);
    });

    it('Advance Filters and reset button should work', async () => {
        customRender(<VehiclePriceMaster />);
        const advanceFilter = screen.getByRole('button', { name: /Advance Filters/i });
        fireEvent.click(advanceFilter);
        const resetBtn = screen.getByRole('button', { name: 'Reset' });
        fireEvent.click(resetBtn);
    });

    it('remove filter button should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                VehiclePriceMaster: { filter: { advanceFilter: true, priceAsOnDate: 'test' } },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <VehiclePriceMaster />
            </Provider>
        );

        const removeFilterBtn = screen.getByTestId('removeFilterBtn');
        fireEvent.click(removeFilterBtn);
    });

    it('clear button should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                VehiclePriceMaster: { filter: { advanceFilter: true, priceAsOnDate: 'test' } },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <VehiclePriceMaster />
            </Provider>
        );

        const clearBtn = screen.getByRole('button', { name: 'Clear' });
        fireEvent.click(clearBtn);
    });

    it('search should work', async () => {
        customRender(<VehiclePriceMaster />);
        const searchBox = screen.getByRole('textbox', { name: '' });
        fireEvent.change(searchBox, { target: { value: 'Hello' } });
        const searchBtn = screen.getByRole('button', { name: 'search' });
        fireEvent.click(searchBtn);
    });

    it('upload and download template button should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                ConfigurableParameterEditing: {
                    filteredListData: {
                        FILE_DOWNLOAD_TMPLT: [{ key: 'VCLPRCMSTTMPLT' }],
                    },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <VehiclePriceMaster />
            </Provider>
        );
        const uploadBtn = screen.getByRole('button', { name: 'Upload' });
        fireEvent.click(uploadBtn);
        const downloadTemplate = screen.getByRole('button', { name: 'Download Template' });
        fireEvent.click(downloadTemplate);
    });

    it('advanced search should work with filters', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                Geo: {
                    Country: { isLoaded: true, data: [{ countryCode: 106 }] },
                    State: { isFilteredListLoaded: true, filteredListData: [{ key: 'DEL', value: 'DELHI1', parentKey: 'IND' }] },
                    District: { isFilteredListLoaded: true, filteredListData: [{ districtCode: 106 }] },
                    City: { isFilteredListLoaded: true, filteredListData: [{ key: 106, value: 'Agra' }] },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <VehiclePriceMaster />
            </Provider>
        );
        const advanceFilter = screen.getByRole('button', { name: /Advance Filters/i });
        fireEvent.click(advanceFilter);
        const stateBox = screen.getByRole('combobox', { name: 'State' });
        act(async () => {
            fireEvent.change(stateBox, { target: { value: 'DEL' } });
            // fireEvent.click(stateBox);
            const delhiState = screen.getByText(/DELHI1/i);
            fireEvent.click(delhiState);
        });
        const searchBtn = screen.getByRole('button', { name: 'Search' });
        fireEvent.click(searchBtn);
    });
});
