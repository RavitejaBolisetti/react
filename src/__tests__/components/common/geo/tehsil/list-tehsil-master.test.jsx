import React from 'react';
import { screen, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import createMockStore from '__mocks__/store';
import customRender from '@utils/test-utils';
import { ListTehsilMaster } from 'components/common/Geo';

const countryData = [{"countryCode":"IND","countryName":"INDIA","continentName":"ASIA","status":true}];
const stateData = [{"key":"106","value":"TestState","parentKey":"IND", "status":true}];
const districtData = [{"key":"106","value":"TestDistrict","parentKey":"106", "status":true}];
const cityData = [{"code":"106","name":"TestCity","districtCode":"106","stateCode":"106","status":true,"stateName":"TestState","districtName":"TestDistrict"}];

describe('List City Master Component', () => {

    it('should render list city master component', async () => {
        customRender(<ListTehsilMaster />);
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
                <ListTehsilMaster />
            </Provider>
        );

        const searchBox=screen.getByRole('textbox', { name: /Tehsil Name/i });
        fireEvent.change(searchBox, { target: { value: 'TestTehsil' } });
        const searchBtn=screen.getByRole('button', { name: /search/i });
        fireEvent.click(searchBtn);
        const clearBtn=screen.getByRole('button', { name: /Clear/i });
        fireEvent.click(clearBtn);
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