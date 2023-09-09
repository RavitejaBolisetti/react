import React from 'react';
import { Provider } from 'react-redux';
import createMockStore from '__mocks__/store';
import customRender from '@utils/test-utils';
import { StateMaster } from 'components/common/Geo/StateCrud/StateMaster';

describe('State Master Component', () => {

    it('should render state master component', async () => {
        const mockStore = createMockStore({
            common: {
                Geo: {
                    State: {
                        AddState: { isVisible: true },
                        EditState: { isVisible: true },
                        ListState: { showAdvanceFilter: true },
                    },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <StateMaster />
            </Provider>
        );
    });

});