/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
import PageHeader from '@pages/common/PageHeader/PageHeader';
import { screen, fireEvent, waitFor } from '@testing-library/react';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: jest.fn().mockReturnValue({
        pathname: 'example.com',
    }),
}));

jest.mock('store/actions/data/menu', () => ({
    menuDataActions: {}
}));

describe('PageHeader Component', () => {

    it('should render PageHeader component', async () => {
        customRender(<PageHeader />);
    });

    it('add favourite should work', async () => {
        customRender(<PageHeader pageTitle={'Kai'} canMarkFavourite={true} markFavourite={jest.fn()} />);
        const addFav=screen.getByTestId('addfav');
        fireEvent.click(addFav);
    });

    it('remove favourite should work', async () => {
        const mockStore=createMockStore({
            data: {
                Menu: { isLoaded: true, favouriteMenu: [{ menuId: 106 }], flatternData: [{ link: 'example.com', menuId: 106 }] },
            },
        });

        const markFavourite=jest.fn();

        customRender(
            <Provider store={mockStore}>
                <PageHeader pageTitle={'Kai'} canMarkFavourite={true} isFavourite={true} markFavourite={markFavourite} fetchList={jest.fn()} handleSample={jest.fn()} />
            </Provider>
        );
        const removefav=screen.getByTestId('removefav');
        fireEvent.click(removefav);

        await waitFor(() => {expect(markFavourite).toHaveBeenCalled()});

        markFavourite.mock.calls[0][0].onSuccess();
        markFavourite.mock.calls[0][0].onError();

    });

});
