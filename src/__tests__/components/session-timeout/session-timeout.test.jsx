import React from 'react';
import { SessionTimeout } from 'components/SessionTimeout/SessionTimeout';
import customRender from '@utils/test-utils';
import { Provider } from 'react-redux';
import createMockStore from '__mocks__/store';
import { screen, fireEvent, waitFor } from '@testing-library/react';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('SessionTimeout Component', () => {
    it('should render SessionTimeout component UI', () => {
        customRender(<SessionTimeout isVisible={true} />);
    });
    it('test1', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                ConfigurableParameterEditing: { data: [{ controlId: 'STOUT', toNumber: '12', fromNumber: '10' }] },
            },
        });

        customRender(
            <Provider store={mockStore}>
                <SessionTimeout isModalOpen={true} />
            </Provider>
        );
    });
});
