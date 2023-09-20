import React from 'react';
import { screen, fireEvent, act, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import createMockStore from '__mocks__/store';
import customRender from '@utils/test-utils';
import { ListDistrictMaster } from 'components/common/Geo';

jest.mock('store/actions/data/geo/districts', () => ({
    geoDistrictDataActions: {}
}));

const countryData = [{"countryCode":"IND","countryName":"INDIA","continentName":"ASIA","status":true}, {"countryCode":"KAI","countryName":"KAI","continentName":"ASIA","status":true}];
const stateData = [{"key":"106","value":"TestState","parentKey":"IND", "status":true}, {"key":"107","value":"Kai","parentKey":"IND", "status":true}];
const districtData = [{"code":"106","name":"TestDistrict","stateCode":"106","status":true,"stateName":"TestState","country":"IND"}];

describe('List District Master Component', () => {

    it('should render list district master component', async () => {
        customRender(<ListDistrictMaster resetData={jest.fn()} />);
    });

    it('refresh, add and close button should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                Geo: {
                    Country: { isLoaded: true, data: countryData },
                    State: { isFilteredListLoaded: true, filteredListData: stateData },
                    District: { isLoaded: true, data: districtData },
                },
            },
        });

        const fetchList=jest.fn();

        customRender(
            <Provider store={mockStore}>
                <ListDistrictMaster fetchList={fetchList} resetData={jest.fn()}/>
            </Provider>
        );
        const refreshBtn=screen.getByTestId(/refreshBtn/i);
        fireEvent.click(refreshBtn);

        fetchList.mock.calls[0][0].onSuccessAction();
    });

    it('search should work with remove filter', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                Geo: {
                    Country: { data: countryData },
                    State: { filteredListData: stateData },
                    District: { data: districtData },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <ListDistrictMaster resetData={jest.fn()} fetchList={jest.fn()} />
            </Provider>
        );

        const searchBox=screen.getByRole('textbox', { name: /District Name/i });
        fireEvent.change(searchBox, { target: { value: 'TestDistrict' } });

        const searchBtn=screen.getByRole('button', { name: /search/i });
        fireEvent.click(searchBtn);

        const removeFilter=screen.getByTestId('removeFilter');
        fireEvent.click(removeFilter);

    });

    it('search should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                Geo: {
                    Country: { data: countryData },
                    State: { filteredListData: stateData },
                    District: { data: districtData },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <ListDistrictMaster resetData={jest.fn()} fetchList={jest.fn()} />
            </Provider>
        );

        const searchBox=screen.getByRole('textbox', { name: /District Name/i });
        fireEvent.change(searchBox, { target: { value: 'TestDistrict' } });

        const closeCircle=screen.getByRole('img', { name: 'close-circle' });
        fireEvent.click(closeCircle);

        fireEvent.change(searchBox, { target: { value: 'TestDistrict' } });

        const searchBtn=screen.getByRole('button', { name: /search/i });
        fireEvent.click(searchBtn);
    });

    it('search should work with clear button', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                Geo: {
                    Country: { data: countryData },
                    State: { filteredListData: stateData },
                    District: { data: districtData },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <ListDistrictMaster resetData={jest.fn()} fetchList={jest.fn()} />
            </Provider>
        );

        const searchBox=screen.getByRole('textbox', { name: /District Name/i });
        fireEvent.change(searchBox, { target: { value: 'TestDistrict' } });

        const searchBtn=screen.getByRole('button', { name: /search/i });
        fireEvent.click(searchBtn);
        
        const clearBtn=screen.getByRole('button', { name: /Clear/i });
        fireEvent.click(clearBtn);
    });

    it('advanced filters should work with country', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                Geo: {
                    Country: { isLoaded: true, data: countryData },
                    State: { isFilteredListLoaded: true, filteredListData: stateData },
                    District: { isLoaded: true, data: districtData },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <ListDistrictMaster resetData={jest.fn()} />
            </Provider>
        );
        
        const advancedFilters=screen.getByRole('button', { name: /Advanced Filters/i });
        fireEvent.click(advancedFilters);

        const countrySelect=screen.getByRole('combobox', { name: 'Country' });
        fireEvent.change(countrySelect, { target: { value: 'KAI' } });
        await waitFor(() => { expect(screen.getAllByText('KAI')[1]).toBeInTheDocument() });
        fireEvent.click(screen.getAllByText('KAI')[1]);

        const searchBtn=screen.getAllByRole('button', { name: /Search/i });
        fireEvent.click(searchBtn[1]);
    });

    it('advanced filters and close button should work', async () => {
        customRender(<ListDistrictMaster resetData={jest.fn()} />);
        
        const advancedFilters=screen.getByRole('button', { name: /Advanced Filters/i });
        fireEvent.click(advancedFilters);
        const closeBtn=screen.getByRole('button', { name: /Close/i });
        fireEvent.click(closeBtn);
    });

    it('advanced search should return error on empty form fields', async () => {
        customRender(<ListDistrictMaster resetData={jest.fn()} />);
        
        const advancedFilters=screen.getByRole('button', { name: /Advanced Filters/i });
        fireEvent.click(advancedFilters);
        
        const searchBtn=screen.getAllByRole('button', { name: /Search/i });
        fireEvent.click(searchBtn[1]);
    });

    it('advanced filters should work with state', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                Geo: {
                    Country: { isLoaded: true, data: countryData },
                    State: { isFilteredListLoaded: true, filteredListData: stateData },
                    District: { isLoaded: true, data: districtData },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <ListDistrictMaster resetData={jest.fn()} />
            </Provider>
        );
        
        const advancedFilters=screen.getByRole('button', { name: /Advanced Filters/i });
        fireEvent.click(advancedFilters);

        const stateSelect=screen.getByRole('combobox', { name: /State Name/i });
        act(() => {
            fireEvent.change(stateSelect, { target: { value: 'Kai' } });
            const stateOptionSelect= screen.getAllByText(/Kai/i);
            fireEvent.click(stateOptionSelect[0]);
        });
        
        const searchBtn=screen.getAllByRole('button', { name: /Search/i });
        fireEvent.click(searchBtn[1]);
    });

    it('view and close button should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                Geo: {
                    Country: { isLoaded: true, data: countryData },
                    State: { isFilteredListLoaded: true, filteredListData: stateData },
                    District: { isLoaded: true, data: districtData },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <ListDistrictMaster resetData={jest.fn()} />
            </Provider>
        );
        
        await waitFor(() => { expect(screen.getByText('TestDistrict')).toBeInTheDocument() });

        const viewBtn=screen.getByTestId('view');
        fireEvent.click(viewBtn);

        const closeBtn=screen.getAllByRole('button', { name: 'Close' });
        fireEvent.click(closeBtn[0]);

    });

});