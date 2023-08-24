/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import customRender from '@utils/test-utils';
import createMockStore from '__mocks__/store';
import { ListPartyMaster } from '@components/common/PartyMaster/ListPartyMaster';
import { screen, fireEvent } from '@testing-library/react';
afterEach(() => {
    jest.restoreAllMocks();
});
const handler = jest.fn(() => Promise.resolve());
describe('List party master Components', () => {
    it('should render list components', () => {
        customRender(<ListPartyMaster handler={handler} />);
    });

    it('should render partyName text', () => {
        customRender(<ListPartyMaster handler={handler} />);
        const partyName = screen.getByTitle('Party Name');
        expect(partyName).toBeInTheDocument();
    });

    it('should render search input field', () => {
        customRender(<ListPartyMaster handler={handler} />);
        const search = screen.getByPlaceholderText('Search');
        expect(search).toBeInTheDocument();
    });

    it('should render button', async () => {
        customRender(<ListPartyMaster handler={handler} />);
        const getButton = screen.getAllByRole('button');
        expect(getButton).toBeTruthy();
    });

    it('Is search Field Present or not', () => {
        customRender(<ListPartyMaster handler={handler} />);
        const searchBtn = screen.findByPlaceholderText('Search');
        expect(searchBtn).toBeTruthy();
        expect(screen.getByRole('img', { name: 'search' })).toBeTruthy();
        fireEvent.click(screen.getByRole('img', { name: 'search' }));
        const btnSearch = screen.getByRole('button', { name: 'search' });
        expect(btnSearch).toBeTruthy();
        fireEvent.click(btnSearch);
    });

    it('should able to search data', async () => {
        customRender(<ListPartyMaster handler={handler} />);
        const inputBox = screen.getByRole('textbox');
        fireEvent.change(inputBox, { target: { value: 'Dmstest' } });
        expect(inputBox.value.includes('Dmstest')).toBeTruthy();
        const searchButton = screen.getByRole('button', { name: /search/i });
        fireEvent.click(searchButton);
    });

    it('should validate search', async () => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                PartyMaster: {
                    isLoaded: true,
                    data: [{ id: 1, name: 'test', partyName: 'Alice' }],
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <ListPartyMaster handler={handler} />
            </Provider>
        );
        const inputBox = screen.getByRole('textbox');
        fireEvent.change(inputBox, { target: { value: 'test' } });
        expect(inputBox.value.includes('test')).toBeTruthy();
        const searchButton = screen.getByRole('button', { name: /search/i });
        fireEvent.click(searchButton);
        fireEvent.change(inputBox, { target: { value: '' } });
        expect(inputBox.value.includes('')).toBeTruthy();
        fireEvent.click(searchButton);
    });
});
