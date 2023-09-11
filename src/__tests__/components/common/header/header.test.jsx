/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { fireEvent, screen } from '@testing-library/react';
import { Header } from '@components/common/Header/Header';
import { HeaderSkeleton } from '@components/common/Header/HeaderSkeleton';

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
    it('should render Header components', () => {
        customRender(<Header isLoading={true} isDashboard={true} />);
        const img = screen.getByRole('img', {
            name: /brandimage/i,
        });
        expect(img).toBeInTheDocument();
    });
    it('should check isDashboard if false', () => {
        customRender(<Header isLoading={true} isDashboard={false} />);
        const img = screen.getByRole('img', {
            name: /brandimage/i,
        });
        expect(img).toBeInTheDocument();
    });
    
    it('should render Header test components', async () => {
        customRender(<Header {...props} />);
        expect(screen.queryByTestId('fetch-post')).toBeNull();
    });

    it('should render Header Skeleton components', () => {
        customRender(<HeaderSkeleton />);
    });

    it("Should render header my role", () => {
        const loginUserData = {
            userRoles: [{ key: 1, id: 1, value: "test" }]
        }
        const dealerLocations = [{ locationId: 1, locationName: "test", isDefault: false }]
        customRender(<Header
            isLoading={true}
            isDashboard={false}
            {...props}
            loginUserData={loginUserData}
            userType={"DLR"}
            dealerLocations={dealerLocations}
        />);

        const img = screen.getAllByRole('img');
        fireEvent.click(img[0])
        fireEvent.click(img[1])
        fireEvent.click(img[2])
        fireEvent.click(img[3])
        fireEvent.click(img[4])

        const menuRole = screen.getByRole('menuitem', { name: "My Roles" })
        fireEvent.click(menuRole)
    })

    it("Should render header logout", () => {
        const loginUserData = {
            userRoles: [{ key: 1, id: 1, value: "test" }]
        }
        const dealerLocations = [{ locationId: 1, locationName: "test", isDefault: false }]
        customRender(<Header
            isLoading={true}
            isDashboard={false}
            {...props}
            loginUserData={loginUserData}
            userType={"DLR"}
            dealerLocations={dealerLocations}
        />);

        const img = screen.getAllByRole('img');

        fireEvent.click(img[0])
        fireEvent.click(img[1])
        fireEvent.click(img[2])
        fireEvent.click(img[3])
        fireEvent.click(img[4])

        const logout = screen.getByRole('menuitem', { name: "Logout" })
        fireEvent.click(logout)
    })
});
