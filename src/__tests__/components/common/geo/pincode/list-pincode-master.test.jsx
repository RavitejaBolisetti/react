import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
// eslint-disable-next-line jest/no-mocks-import
import createMockStore from '__mocks__/store';
import customRender from '@utils/test-utils';
import { ListPinCodeMaster } from 'components/common/Geo';

jest.mock('store/actions/data/geo/pincodes', () => ({
    geoPinCodeDataActions: {}
}));

const countryData = [{"countryCode":"IND","countryName":"INDIA","continentName":"ASIA","status":true}, {"countryCode":"KAI","countryName":"KAI","continentName":"ASIA","status":true}];
const stateData = [{"key":"106","value":"TestState","parentKey":"KAI"}];
const districtData = [{"key":"106","value":"TestDistrict","parentKey":"106"}];
const tehsilData = [{"key":"106","value":"TestTehsil","parentKey":"106"}];
const cityData= [{"code":"106","name":"TestCity","districtCode":"106","stateCode":"106","stateName":"TestState","districtName":"TestDistrict"}];
const pincodeData={"pinCodeDetails":[{"id":"106","pinCode":"282001","localityCode":null,"tehsilCode":"106","districtCode":"106","stateCode":"106","cityCode":"106","countryCode":null,"status":true,"approvalStatus":null,"localityName":null,"pinDescription":" ","withIn50KmFromGpo":null,"pinCategory":"B","tehsilName":"TestTehsil","cityName":"TestCity","stateName":"TestState","districtName":"TestDistrict","countryName":null}]};
const typeData={ PIN_CATG: [{ name: 'Kai' }] };

describe('List PinCode Master Component', () => {

    it('should render list pin code master component', async () => {
        customRender(<ListPinCodeMaster resetData={jest.fn()} />);
    });

    it('search should only work with pin code', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                Geo: {
                    Country: { isLoaded: false, data: countryData },
                    State: { isFilteredListLoaded: false, filteredListData: stateData },
                    District: { isFilteredListLoaded: false, filteredListData: districtData },
                    Tehsil: { isFilteredListLoaded: false, filteredListData: tehsilData },
                    City: { isFilteredListLoaded: false, filteredListData: cityData },
                    Pincode: { isLoaded: false, data: pincodeData },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <ListPinCodeMaster resetData={jest.fn()} fetchList={jest.fn()} />
            </Provider>
        );

        const searchBox=screen.getByRole('textbox', { name: /Pincode/i });
        fireEvent.change(searchBox, { target: { value: 'Kai' } });

        const closeCircle=screen.getByRole('img', { name: 'close-circle' });
        fireEvent.click(closeCircle);

        fireEvent.change(searchBox, { target: { value: '123456' } });

        const searchBtn=screen.getByRole('button', { name: /search/i });
        fireEvent.click(searchBtn);

    });

    it('search should work with remove filter', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                Geo: {
                    Country: { isLoaded: false, data: countryData },
                    State: { isFilteredListLoaded: false, filteredListData: stateData },
                    District: { isFilteredListLoaded: false, filteredListData: districtData },
                    Tehsil: { isFilteredListLoaded: false, filteredListData: tehsilData },
                    City: { isFilteredListLoaded: false, filteredListData: cityData },
                    Pincode: { isLoaded: false, data: pincodeData },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <ListPinCodeMaster resetData={jest.fn()} fetchList={jest.fn()} />
            </Provider>
        );

        const searchBox=screen.getByRole('textbox', { name: /Pincode/i });
        fireEvent.change(searchBox, { target: { value: '123456' } });

        const searchBtn=screen.getByRole('button', { name: /search/i });
        fireEvent.click(searchBtn);

        const removeFilter=screen.getByTestId('removeFilter');
        fireEvent.click(removeFilter);

    });

    it('search should work with clear button', async () => {

        customRender( <ListPinCodeMaster resetData={jest.fn()} fetchList={jest.fn()} /> );

        const searchBox=screen.getByRole('textbox', { name: /Pincode/i });
        fireEvent.change(searchBox, { target: { value: '123456' } });

        const searchBtn=screen.getByRole('button', { name: /search/i });
        fireEvent.click(searchBtn);

        const clearBtn=screen.getByRole('button', { name: /Clear/i });
        fireEvent.click(clearBtn);

    });

    it('view and close button should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                ConfigurableParameterEditing: { filteredListData: typeData },
                Geo: {
                    Country: { isLoaded: true, data: countryData },
                    State: { isFilteredListLoaded: true, filteredListData: stateData },
                    District: { isFilteredListLoaded: true, filteredListData: districtData },
                    Tehsil: { isFilteredListLoaded: true, filteredListData: tehsilData },
                    City: { isFilteredListLoaded: true, filteredListData: cityData },
                    Pincode: { data: pincodeData },
                },
            },
        });

        const fetchList=jest.fn();

        customRender(
            <Provider store={mockStore}>
                <ListPinCodeMaster fetchList={fetchList} resetData={jest.fn()} />
            </Provider>
        );

        fetchList.mock.calls[0][0].onSuccessAction();
        fetchList.mock.calls[0][0].onErrorAction();

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
                    Tehsil: { isFilteredListLoaded: true, filteredListData: tehsilData },
                    City: { isFilteredListLoaded: true, filteredListData: cityData },
                    Pincode: { isLoaded: true, data: pincodeData },
                },
            },
        });

        const fetchList=jest.fn();

        customRender(
            <Provider store={mockStore}>
                <ListPinCodeMaster fetchList={fetchList} resetData={jest.fn()} />
            </Provider>
        );

        const refreshBtn=screen.getByTestId('refreshBtn');
        fireEvent.click(refreshBtn);
        
    });

    it('Advance Filters and close button should work', async () => {
        customRender(<ListPinCodeMaster resetData={jest.fn()} />);
        
        const advancedFilters=screen.getByRole('button', { name: /Advance Filters/i });
        fireEvent.click(advancedFilters);
        const closeBtn=screen.getByRole('button', { name: /Close/i });
        fireEvent.click(closeBtn);
    });

    it('advanced search should return error on empty form fields', async () => {
        customRender(<ListPinCodeMaster resetData={jest.fn()} />);
        
        const advancedFilters=screen.getByRole('button', { name: /Advance Filters/i });
        fireEvent.click(advancedFilters);
        
        const searchBtn=screen.getAllByRole('button', { name: /Search/i });
        fireEvent.click(searchBtn[1]);
    });

    jest.setTimeout(50000)
    it('Advance Filters should work with all fields', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                Geo: {
                    Country: { isLoaded: true, data: countryData },
                    State: { isFilteredListLoaded: true, filteredListData: stateData },
                    District: { isFilteredListLoaded: true, filteredListData: districtData },
                    Tehsil: { isFilteredListLoaded: true, filteredListData: tehsilData },
                    City: { isFilteredListLoaded: true, filteredListData: cityData },
                    Pincode: { data: pincodeData },
                },
            },
        });

        const fetchList=jest.fn();

        customRender(
            <Provider store={mockStore}>
                <ListPinCodeMaster fetchList={fetchList} resetData={jest.fn()} />
            </Provider>
        );
        
        const advancedFilters=screen.getByRole('button', { name: /Advance Filters/i });
        fireEvent.click(advancedFilters);

        const countrySelect=screen.getByRole('combobox', { name: 'Country' });
        fireEvent.change(countrySelect, { target: { value: 'KAI' } });
        await waitFor(() => { expect(screen.getAllByText('KAI')[1]).toBeInTheDocument() });
        fireEvent.click(screen.getAllByText('KAI')[1]);

        const stateSelect=screen.getByRole('combobox', { name: 'State' });
        fireEvent.change(stateSelect, { target: { value: 'TestState' } });
        await waitFor(() => { expect(screen.getByText('TestState')).toBeInTheDocument() });
        fireEvent.click(screen.getByText('TestState'));

        const districtSelect=screen.getByRole('combobox', { name: 'District' });
        fireEvent.change(districtSelect, { target: { value: 'TestDistrict' } });
        await waitFor(() => { expect(screen.getByText('TestDistrict')).toBeInTheDocument() });
        fireEvent.click(screen.getByText('TestDistrict'));

        const tehsilSelect=screen.getByRole('combobox', { name: 'Tehsil' });
        fireEvent.change(tehsilSelect, { target: { value: 'TestTehsil' } });
        await waitFor(() => { expect(screen.getByText('TestTehsil')).toBeInTheDocument() });
        fireEvent.click(screen.getByText('TestTehsil'));

        const searchBtn=screen.getAllByRole('button', { name: /Search/i });
        fireEvent.click(searchBtn[1]);

    });

});