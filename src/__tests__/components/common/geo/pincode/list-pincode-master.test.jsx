import React from 'react';
import { screen, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import createMockStore from '__mocks__/store';
import customRender from '@utils/test-utils';
import { ListPinCodeMaster } from 'components/common/Geo';

const countryData = [{"countryCode":"IND","countryName":"INDIA","continentName":"ASIA","status":true}];
const stateData = [{"key":"106","value":"TestState","parentKey":"IND", "status":true}];
const districtData = [{"key":"106","value":"TestDistrict","parentKey":"106", "status":true}];

describe('List PinCode Master Component', () => {

    it('should render list pincode master component', async () => {
        customRender(<ListPinCodeMaster />);
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
                <ListPinCodeMaster />
            </Provider>
        );

        const searchBox=screen.getByRole('textbox', { name: /Pincode/i });
        fireEvent.change(searchBox, { target: { value: '123456' } });
        const searchBtn=screen.getByRole('button', { name: /search/i });
        fireEvent.click(searchBtn);
        const clearBtn=screen.getByRole('button', { name: /Clear/i });
        fireEvent.click(clearBtn);
    });

    it('advanced filters and close button should work', async () => {
        customRender(<ListPinCodeMaster />);
        
        const advancedFilters=screen.getByRole('button', { name: /Advanced Filters/i });
        fireEvent.click(advancedFilters);
        const closeBtn=screen.getByRole('button', { name: /Close/i });
        fireEvent.click(closeBtn);
    });

    it('advanced search should return error on empty form fields', async () => {
        customRender(<ListPinCodeMaster />);
        
        const advancedFilters=screen.getByRole('button', { name: /Advanced Filters/i });
        fireEvent.click(advancedFilters);
        
        const searchBtn=screen.getAllByRole('button', { name: /Search/i });
        fireEvent.click(searchBtn[1]);
    });

});