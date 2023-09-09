import React from 'react';
import { Provider } from 'react-redux';
import createMockStore from '__mocks__/store';
import customRender from '@utils/test-utils';
import { ListState } from 'components/common/Geo/StateCrud/ListState';

describe('List State Component', () => {

    it('should render list state component', async () => {
        const mockStore = createMockStore({
            data: {
                Geo: {
                    Country: { data: [{countryCode: "IND"}]  },
                },
            },
            common: {
                Geo: {
                    State: {
                        ListState: { filterString: {countryCode: "IND", keyword: "Test", name: "Test"} },
                    },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <ListState />
            </Provider>
        );
    });

});