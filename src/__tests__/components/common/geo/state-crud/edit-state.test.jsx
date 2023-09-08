import React from 'react';
import { Provider } from 'react-redux';
import createMockStore from '__mocks__/store';
import customRender from '@utils/test-utils';
import { EditState } from 'components/common/Geo/StateCrud/EditState';

describe('Edit State Component', () => {

    it('should render edit state component', async () => {
        const mockStore = createMockStore({
            common: {
                Geo: {
                    State: {
                        EditState: { isVisible: true, id: 106 },
                    },
                },
            },
            data: {
                Geo: {
                    State: { data: [{code: 106}] },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <EditState />
            </Provider>
        );
    });

});