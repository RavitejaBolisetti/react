import React from 'react';
import { Provider } from 'react-redux';
import createMockStore from '__mocks__/store';
import customRender from '@utils/test-utils';
import { AddEditForm } from 'components/common/Geo/StateCrud/AddEditForm';

const countryData = [{"countryCode":"IND","countryName":"INDIA","continentName":"ASIA","status":true}];


describe('Add Edit Form Component', () => {

    it('should render add edit form component with active country', async () => {
        const mockStore = createMockStore({
            auth: { token: 106 },
            data: {
                Geo: {
                    Country: { isLoaded: true, data: countryData  },
                },
            },
        });

        const state={ countryCode: 'IND' };

        customRender(
            <Provider store={mockStore}>
                <AddEditForm data={state} />
            </Provider>
        );
    });

    it('should render edit state component with inactive country', async () => {
        const mockStore = createMockStore({
            auth: { token: 106 },
            data: {
                Geo: {
                    Country: { isLoaded: true, data: [{"countryCode":"IND","countryName":"INDIA","continentName":"ASIA"}]  },
                },
            },
        });

        const state={ countryCode: 'IND' };

        customRender(
            <Provider store={mockStore}>
                <AddEditForm data={state} />
            </Provider>
        );
    });

});