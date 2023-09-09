import React from 'react';
import { screen, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import createMockStore from '__mocks__/store';
import customRender from '@utils/test-utils';
import { ListCityMaster } from 'components/common/Geo';

const countryData = [{"countryCode":"IND","countryName":"INDIA","continentName":"ASIA","status":true}];
const stateData = [{"key":"106","value":"TestState","parentKey":"IND", "status":true}];
const districtData = [{"key":"106","value":"TestDistrict","parentKey":"106", "status":true}];
const cityData = [{"code":"106","name":"TestCity","districtCode":"106","stateCode":"106","status":true,"stateName":"TestState","districtName":"TestDistrict"}];

describe('List City Master Component', () => {

    it('should render list city master component', async () => {
        customRender(<ListCityMaster />);
    });

    it('refresh, add and close button should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                Geo: {
                    Country: { isLoaded: true, data: countryData },
                    State: { isFilteredListLoaded: true, filteredListData: stateData },
                    District: { isFilteredListLoaded: true, filteredListData: districtData },
                    City: { isLoaded: true, data: cityData },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <ListCityMaster />
            </Provider>
        );
        const refreshBtn=screen.getByTestId(/refreshBtn/i);
        fireEvent.click(refreshBtn);
        const addBtn=screen.getByRole('button', { name: /plus Add/i });
        fireEvent.click(addBtn);
        const closeBtn=screen.getByRole('button', { name: /Close/i });
        fireEvent.click(closeBtn);
    });

    it('add city should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                Geo: {
                    Country: { isLoaded: true, data: countryData },
                    State: { isFilteredListLoaded: true, filteredListData: stateData },
                    District: { isFilteredListLoaded: true, filteredListData: districtData },
                    City: { isLoaded: true, data: cityData },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <ListCityMaster />
            </Provider>
        );
        const addBtn=screen.getByRole('button', { name: /plus Add/i });
        fireEvent.click(addBtn);

        const stateSelect=screen.getByRole('combobox', { name: /State/i });
        act(() => {
            fireEvent.change(stateSelect, { target: { value: 'TestState' } });
            const stateOptionSelect= screen.getAllByText(/TestState/i);
            fireEvent.click(stateOptionSelect[1]);
        });

        const districtSelect=screen.getByRole('combobox', { name: /District/i });
        act(() => {
            fireEvent.change(districtSelect, { target: { value: 'TestDistrict' } });
            const districtOptionSelect= screen.getAllByText(/TestDistrict/i);
            fireEvent.click(districtOptionSelect[1]);
        });

        const cityName=screen.getAllByRole('textbox', { name: "City Name" });
        fireEvent.change(cityName[1], { target: { value: 'TestCity' } });

        const status=screen.getByRole('switch', { name: 'Status' });
        fireEvent.click(status);

        const saveBtn=screen.getByRole('button', { name: "Save" });
        fireEvent.click(saveBtn);
    });

    it('search should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                Geo: {
                    Country: { data: countryData },
                    State: { filteredListData: stateData },
                    District: { filteredListData: districtData },
                    City: { data: cityData },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <ListCityMaster />
            </Provider>
        );

        const searchBox=screen.getByRole('textbox', { name: /City Name/i });
        fireEvent.change(searchBox, { target: { value: 'TestCity' } });
        const searchBtn=screen.getByRole('button', { name: /search/i });
        fireEvent.click(searchBtn);
        const clearBtn=screen.getByRole('button', { name: /Clear/i });
        fireEvent.click(clearBtn);
    });

    it('advanced filters and close button should work', async () => {
        customRender(<ListCityMaster />);
        
        const advancedFilters=screen.getByRole('button', { name: /Advanced Filters/i });
        fireEvent.click(advancedFilters);
        const closeBtn=screen.getByRole('button', { name: /Close/i });
        fireEvent.click(closeBtn);
    });

    it('advanced search should return error on empty form fields', async () => {
        customRender(<ListCityMaster />);
        
        const advancedFilters=screen.getByRole('button', { name: /Advanced Filters/i });
        fireEvent.click(advancedFilters);
        
        const searchBtn=screen.getAllByRole('button', { name: /Search/i });
        fireEvent.click(searchBtn[1]);
    });

    it('advanced filters should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                Geo: {
                    Country: { isLoaded: true, data: countryData },
                    State: { isFilteredListLoaded: true, filteredListData: stateData },
                    District: { isFilteredListLoaded: true, filteredListData: districtData },
                    City: { isLoaded: true, data: cityData },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <ListCityMaster />
            </Provider>
        );
        
        const advancedFilters=screen.getByRole('button', { name: /Advanced Filters/i });
        fireEvent.click(advancedFilters);

        const stateSelect=screen.getByRole('combobox', { name: /State/i });
        act(() => {
            fireEvent.change(stateSelect, { target: { value: 'TestState' } });
            const stateOptionSelect= screen.getAllByText(/TestState/i);
            fireEvent.click(stateOptionSelect[1]);
        });
        
        const searchBtn=screen.getAllByRole('button', { name: /Search/i });
        fireEvent.click(searchBtn[1]);
    });



});