import '@testing-library/jest-dom/extend-expect';

import { PageNotFound } from '@components/PageNotFound/PageNotFound';
import { fireEvent, screen } from '@testing-library/react';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Render components', () => {
    it('Should render component and click on button', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106, isLoggedIn: true },
        });
        customRender(
            <Provider store={mockStore}>
                <PageNotFound isVisible={true} isLoggedIn={true} />
            </Provider>
        );

        const backBtn = screen.getByRole('button', { name: /Back Home/i });
        fireEvent.click(backBtn);
    });
});
