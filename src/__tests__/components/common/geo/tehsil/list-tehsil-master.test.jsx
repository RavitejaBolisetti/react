import React from 'react';
import { screen, fireEvent, act, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import createMockStore from '__mocks__/store';
import customRender from '@utils/test-utils';
import { ListTehsilMaster } from 'components/common/Geo';

jest.mock('store/actions/data/geo/tehsils', () => ({
    tehsilDataActions: {}
}));

const countryData = [{"countryCode":"IND","countryName":"INDIA","continentName":"ASIA","status":true}, {"countryCode":"KAI","countryName":"KAI","continentName":"ASIA","status":true}];
const stateData = [{"key":"106","value":"TestState","parentKey":"KAI", "status":true}];
const districtData = [{"key":"106","value":"TestDistrict","parentKey":"106", "status":true}];
const tehsilData=[{"code":"106","name":"TestTehsil","districtCode":"106","stateCode":"106","status":true,"tehsilCategoryCode":"CAT2","tehsilCategoryName":"Category2","includedOn":"2023-09-10","stateName":"TestState","districtName":"TestDistrict"}];

describe('List City Master Component', () => {

    it('should render list city master component', async () => {
        customRender(<ListTehsilMaster />);
    });

    it('search should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                Geo: {
                    Country: { isLoaded: true, data: countryData },
                    State: { isFilteredListLoaded: true, filteredListData: stateData },
                    District: { isFilteredListLoaded: true, filteredListData: districtData },
                    Tehsil: { isLoaded: true, data: tehsilData },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <ListTehsilMaster />
            </Provider>
        );

        const searchBox=screen.getByRole('textbox', { name: /Tehsil Name/i });
        fireEvent.change(searchBox, { target: { value: 'TestTehsil' } });

        const closeCircle=screen.getByRole('img', { name: 'close-circle' });
        fireEvent.click(closeCircle);

        fireEvent.change(searchBox, { target: { value: 'TestTehsil' } });

        const searchBtn=screen.getByRole('button', { name: /search/i });
        fireEvent.click(searchBtn);
    });

    it('search should work with clear button', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                Geo: {
                    Country: { isLoaded: false, data: countryData },
                    State: { isFilteredListLoaded: false, filteredListData: stateData },
                    District: { isFilteredListLoaded: false, filteredListData: districtData },
                    Tehsil: { isLoaded: false, data: tehsilData },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <ListTehsilMaster fetchList={jest.fn()} />
            </Provider>
        );

        const searchBox=screen.getByRole('textbox', { name: /Tehsil Name/i });
        fireEvent.change(searchBox, { target: { value: 'TestTehsil' } });

        const searchBtn=screen.getByRole('button', { name: /search/i });
        fireEvent.click(searchBtn);
        
        const clearBtn=screen.getByRole('button', { name: /Clear/i });
        fireEvent.click(clearBtn);
    });

    it('search should work with remove filter', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                Geo: {
                    Country: { isLoaded: true, data: countryData },
                    State: { isFilteredListLoaded: true, filteredListData: stateData },
                    District: { isFilteredListLoaded: true, filteredListData: districtData },
                    Tehsil: { isLoaded: true, data: tehsilData },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <ListTehsilMaster />
            </Provider>
        );

        const searchBox=screen.getByRole('textbox', { name: /Tehsil Name/i });
        fireEvent.change(searchBox, { target: { value: 'TestTehsil' } });

        const searchBtn=screen.getByRole('button', { name: /search/i });
        fireEvent.click(searchBtn);
        
        const removeFilter=screen.getAllByTestId('removeFilter');
        fireEvent.click(removeFilter[1]);
    });

    it('view and close button should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                Geo: {
                    Country: { isLoaded: true, data: countryData },
                    State: { isFilteredListLoaded: true, filteredListData: stateData },
                    District: { isFilteredListLoaded: true, filteredListData: districtData },
                    Tehsil: { isLoaded: true, data: tehsilData },
                },
            },
        });

        customRender(
            <Provider store={mockStore}>
                <ListTehsilMaster />
            </Provider>
        );

        await waitFor(() => { expect(screen.getByTestId('view')).toBeInTheDocument() });

        const viewBtn=screen.getByTestId('view');
        fireEvent.click(viewBtn);

        const closeBtn=screen.getAllByRole('button', { name: 'Close' });
        fireEvent.click(closeBtn[0]);
    });

    it('refresh button should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                Geo: {
                    Country: { isLoaded: true, data: countryData },
                    State: { isFilteredListLoaded: true, filteredListData: stateData },
                    District: { isFilteredListLoaded: true, filteredListData: districtData },
                    Tehsil: { isLoaded: true, data: tehsilData },
                },
            },
        });

        const fetchList=jest.fn();

        customRender(
            <Provider store={mockStore}>
                <ListTehsilMaster fetchList={fetchList} />
            </Provider>
        );

        const refreshBtn=screen.getByTestId('refreshBtn');
        fireEvent.click(refreshBtn);

        fetchList.mock.calls[0][0].onSuccessAction();
    });

    jest.setTimeout(50000)
    it('advance search should work with all fields', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                Geo: {
                    Country: { isLoaded: true, data: countryData },
                    State: { isFilteredListLoaded: true, filteredListData: stateData },
                    District: { isFilteredListLoaded: true, filteredListData: districtData },
                    Tehsil: { isLoaded: true, data: tehsilData },
                },
            },
        });

        customRender(
            <Provider store={mockStore}>
                <ListTehsilMaster fetchList={jest.fn()} />
            </Provider>
        );

        const advancedFilters=screen.getByRole('button', { name: /Advanced Filters/i });
        fireEvent.click(advancedFilters);

        const countrySelect=screen.getByRole('combobox', { name: 'Country' });
        fireEvent.change(countrySelect, { target: { value: 'KAI' } });
        await waitFor(() => { expect(screen.getAllByText('KAI')[1]).toBeInTheDocument() });
        fireEvent.click(screen.getAllByText('KAI')[1]);

        const stateSelect=screen.getByRole('combobox', { name: 'State' });
        fireEvent.change(stateSelect, { target: { value: 'TestState' } });
        await waitFor(() => { expect(screen.getAllByText('TestState')[1]).toBeInTheDocument() });
        fireEvent.click(screen.getAllByText('TestState')[1]);

        const districtSelect=screen.getByRole('combobox', { name: 'District' });
        fireEvent.change(districtSelect, { target: { value: 'TestDistrict' } });
        await waitFor(() => { expect(screen.getAllByText('TestDistrict')[1]).toBeInTheDocument() });
        fireEvent.click(screen.getAllByText('TestDistrict')[1]);

        const searchBtn=screen.getAllByRole('button', { name: /Search/i });
        fireEvent.click(searchBtn[1]);

    });

    it('advanced filters and close button should work', async () => {
        customRender(<ListTehsilMaster />);
        
        const advancedFilters=screen.getByRole('button', { name: /Advanced Filters/i });
        fireEvent.click(advancedFilters);
        const closeBtn=screen.getByRole('button', { name: /Close/i });
        fireEvent.click(closeBtn);
    });

    it('advanced search should return error on empty form fields', async () => {
        customRender(<ListTehsilMaster />);
        
        const advancedFilters=screen.getByRole('button', { name: /Advanced Filters/i });
        fireEvent.click(advancedFilters);
        
        const searchBtn=screen.getAllByRole('button', { name: /Search/i });
        fireEvent.click(searchBtn[1]);
    });

});