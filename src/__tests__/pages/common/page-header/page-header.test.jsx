/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import PageHeader from '@pages/common/PageHeader/PageHeader';
import { screen, fireEvent } from '@testing-library/react';
import { showGlobalNotification } from 'store/actions/notification';
const mockFetchList = jest.fn();
const mockMarkFavourite = jest.fn();
const mockListShowLoading = jest.fn();
const mockShowGlobalNotification = jest.fn();

describe('PageHeader Component', () => {
    it('should render PageHeader component', async () => {
        customRender(<PageHeader isFavourite={false} canMarkFavourite={true} mockFetchList={mockFetchList} mockMarkFavourite={mockMarkFavourite} mockShowGlobalNotification={mockShowGlobalNotification} mockListShowLoading={mockListShowLoading} />);
    });

    it('renders page title correctly', () => {
        customRender(<PageHeader pageTitle="Test Page" />);
        const pageTitleElement = screen.getByText('Test Page');
        expect(pageTitleElement).toBeInTheDocument();
    });

    it('displays "Mark as favorite" icon when canMarkFavourite is true', () => {
        customRender(<PageHeader pageTitle="Mark as favourite" canMarkFavourite={true} onError={jest.fn()} handleFavouriteClick={jest.fn()} isFavourite={false} />);
        const markAsFavoriteIcon = screen.getByTestId('addfav');
        expect(markAsFavoriteIcon).toBeInTheDocument();
    });

    it('displays "Mark as favorite" icon when canMarkFavourite is true', async () => {
        customRender(<PageHeader pageTitle="Mark as favourite" canMarkFavourite={true} onSuccess={jest.fn()} onError={jest.fn()} handleFavouriteClick={jest.fn()} isFavourite={false} showGlobalNotification={showGlobalNotification} />);
        const markAsFavoriteIcon = screen.getByTestId('addfav');
        fireEvent.click(markAsFavoriteIcon);
    });

    it('calls handleFavouriteClick when "Mark as favorite" icon is clicked', () => {
        customRender(<PageHeader pageTitle="Test Page" canMarkFavourite={true} onError={jest.fn()} handleFavouriteClick={jest.fn()} isFavourite={true} />);
        const markAsFavoriteIcon = screen.getByTestId('addfav');
        fireEvent.click(markAsFavoriteIcon);
    });
});
