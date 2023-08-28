/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { fireEvent, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { LeftSideBar } from '@components/common/LeftSideBar/LeftSideBar';
afterEach(() => {
    jest.restoreAllMocks();
});

describe('LeftSideBar Components', () => {
    it('should render LeftSideBar components', () => {
        customRender(<LeftSideBar />);
    });
    it('should render search', async () => {
        customRender(<LeftSideBar collapsed={true} />);
        const findLink = screen.getByRole('link');
        expect(findLink).toBeTruthy();
        fireEvent.click(findLink);
        const findImg = screen.getByLabelText('search');
        expect(findImg).toBeTruthy();
        fireEvent.click(findImg);

        const findSearch = screen.getByRole('combobox');
        fireEvent.change(findSearch, { target: { value: 'Dmatest' } });
        expect(findSearch.value.includes('Dmatest'));
        act(() => {
            const searchButton = screen.getByRole('img', { name: /search/i });
            fireEvent.click(searchButton);
        });

        const findLeft = screen.getByRole('img', { name: /left/i });
        expect(findLeft).toBeTruthy();
        fireEvent.click(findLeft);
    });
});
describe('LeftSideBar Components', () => {
    it('should render LeftSideBar components', () => {
        customRender(<LeftSideBar collapsed={false} />);
        const findButton = screen.getByRole('button', { name: /light mode/i });
        expect(findButton).toBeTruthy();
        fireEvent.click(findButton);
        const darkButton = screen.getByRole('button', { name: /dark mode/i });
        expect(darkButton).toBeTruthy();
        fireEvent.click(darkButton);
    });
});
