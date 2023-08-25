/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen } from '@testing-library/react';
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
        const { container } = customRender(<Header isLoading={true} isDashboard={true} />);
        expect(container.firstChild).toHaveClass('headerContainer');
        const img = screen.getByRole('img', {
            name: /brandimage/i,
        });
        expect(img).toBeInTheDocument();
    });
    it('should check isDashboard if false ', () => {
        const { container } = customRender(<Header isLoading={true} isDashboard={false} />);
        expect(container.firstChild).toHaveClass('headerContainer');
        const img = screen.getByRole('img', {
            name: /brandimage/i,
        });
        expect(img).toBeInTheDocument();
    });
    it('should render Header components', async () => {
        customRender(<Header {...props} />);

        expect(screen.queryByTestId('fetch-post')).toBeNull();
    });
    it('should render HeaderSkeleton components', () => {
        customRender(<HeaderSkeleton />);
    });
});
