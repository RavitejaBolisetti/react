/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { LeftSideBar } from 'components/common/LeftSideBar/LeftSideBar';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('LeftSideBar Components', () => {

    it('should render LeftSideBar components', () => {
        customRender(<LeftSideBar />);
    });

    it('light and dark mode should work', () => {
        customRender(<LeftSideBar collapsed={true} />);
        const findButton = screen.getByRole('button', { name: /light mode/i });
        expect(findButton).toBeTruthy();
        fireEvent.click(findButton);
        const darkButton = screen.getByRole('button', { name: /dark mode/i });
        expect(darkButton).toBeTruthy();
        fireEvent.click(darkButton);
    });

    it('search should work', async () => {

        const mockStore=createMockStore({
            auth: { userId: 106 },
            data: {
                Menu: { flatternData: [{ menuId: 'Kai', link: '/', menuTitle: 'Dmatest' }] },
            },
        });

        customRender(
            <Provider store={mockStore} >
                <LeftSideBar />
            </Provider>
        );

        const findSearch = screen.getByRole('combobox');
        fireEvent.change(findSearch, { target: { value: 'Dmatest' } });

        const searchButton = screen.getByRole('img', { name: /search/i });
        fireEvent.click(searchButton);

        await waitFor(() => { expect(screen.getByText('Dmatest')).toBeInTheDocument() });

        fireEvent.click(screen.getByText('Dmatest'));

    });

    it('menu collapse should work', async () => {

        customRender(<LeftSideBar collapsed={true} />);

        const findLeft = screen.getByRole('img', { name: /left/i });
        fireEvent.click(findLeft);

        const menuCollapsed=screen.getByTestId('menuCollapsed');
        fireEvent.click(menuCollapsed);
    });

});

