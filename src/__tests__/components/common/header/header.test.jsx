/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';

import customRender from '@utils/test-utils';

import { fireEvent, screen, waitFor } from '@testing-library/react';

import createMockStore from '__mocks__/store';

import { Provider } from 'react-redux';

import { Header } from 'components/common/Header/Header';

jest.mock('store/actions/auth', () => ({
    doLogoutAPI: {},

    clearLocalStorageData: jest.fn(),
}));

jest.mock('store/actions/data/userAccess', () => ({
    userAccessMasterDataAction: {},
}));

jest.mock('store/actions/auth', () => ({
    doLogoutAPI: {},
    clearLocalStorageData: jest.fn(),
}));

jest.mock('store/actions/data/userAccess', () => ({
    userAccessMasterDataAction: {},
}));

const props = {
    isLoading: true,

    isTypeDataLoading: true,

    isFilteredListLoaded: true,

    loginUserData: [],

    isDataLoaded: true,

    collapsed: true,

    setChangePasswordModalOpen: jest.fn(),

    setConfirm: jest.fn(),

    confirms: true,

    isChangePasswordModalOpen: true,

    onSuccess: jest.fn(),

    onError: jest.fn(),

    showConfirm: jest.fn(),

    handleCollapse: jest.fn(),

    isDashboard: true,

    onCancel: jest.fn(),

    HeaderMain: jest.fn(),

    mapDispatchToProps: jest.fn(),
};

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Header Components', () => {
    it('should render Header test components', async () => {
        const doLogout = jest.fn();

        const res = {
            data: 'Kai',
        };

        customRender(<Header doLogout={doLogout} />);

        const dropDown = screen.getAllByRole('img', { name: 'down' });

        fireEvent.click(dropDown[1]);

        const logOut = screen.getByText('Logout');

        fireEvent.click(logOut);

        await waitFor(() => {
            expect(screen.getByRole('button', { name: /Yes, Logout/i })).toBeInTheDocument();
        });

        const yesLogout = screen.getByRole('button', { name: 'Yes, Logout' });
        fireEvent.click(yesLogout);

        await waitFor(() => {
            expect(doLogout).toHaveBeenCalled();
        });

        doLogout.mock.calls[0][0].onSuccess(res);

        doLogout.mock.calls[0][0].onError();
    });

    it('Should render header logout', () => {
        const loginUserData = {
            userRoles: [{ key: 1, id: 1, value: 'test' }],
        };

        const dealerLocations = [{ locationId: 1, locationName: 'test', isDefault: false }];

        customRender(<Header isLoading={true} isDashboard={false} {...props} loginUserData={loginUserData} userType={'DLR'} dealerLocations={dealerLocations} />);

        const img = screen.getAllByRole('img');

        fireEvent.click(img[0]);

        fireEvent.click(img[1]);

        fireEvent.click(img[2]);

        fireEvent.click(img[3]);

        fireEvent.click(img[4]);
    });

    it('test for onSuccess', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },

            common: {
                Header: {
                    data: {
                        userType: 'DLR',
                        userRoles: [{ isDefault: true }],
                        dealerLocations: [
                            { locationId: 106, locationName: 'Kai', isDefault: true },
                            { locationId: 107, locationName: 'Hello', isDefault: false },
                        ],
                    },
                    isLoaded: true,
                },
            },
        });

        const updateUserAcess = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <Header {...props} updateUserAcess={updateUserAcess} />
            </Provider>
        );

        const dropDown = screen.getAllByRole('img', { name: 'down' });

        fireEvent.click(dropDown[0]);

        const helloText = screen.getByText('Hello');

        fireEvent.click(helloText);

        await waitFor(() => {
            expect(updateUserAcess).toHaveBeenCalled();
        });

        updateUserAcess.mock.calls[0][0].onSuccess();

        updateUserAcess.mock.calls[0][0].onError();
    });

    it('test when data is false', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },

            common: {
                Header: {
                    data: {
                        userType: 'DLR',
                        userRoles: [{ isDefault: true }],
                        dealerLocations: [
                            { locationId: 106, locationName: 'Kai', isDefault: true },
                            { locationId: 107, locationName: 'Hello', isDefault: false },
                        ],
                    },
                    isLoaded: false,
                },
            },
        });

        const updateUserAcess = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <Header {...props} updateUserAcess={updateUserAcess} />
            </Provider>
        );
    });
});
