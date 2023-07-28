/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { ListPartyMaster } from '@components/common/PartyMaster/listpartymaster';
import { screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

describe('List party master Components', () => {
    it('should render list components', () => {
        customRender(<ListPartyMaster />);
    });

    it('should render partyName text', () => {
        customRender(<ListPartyMaster />);
        const partyName = screen.getByTitle('Party Name');
        expect(partyName).toBeInTheDocument();
    });

    it('should render search input field', () => {
        customRender(<ListPartyMaster />);
        const search = screen.getByPlaceholderText('Search');
        expect(search).toBeInTheDocument();
    });

    it('should render button', async () => {
        customRender(<ListPartyMaster />);
        const getButton = screen.getAllByRole('button');
        expect(getButton).toBeTruthy();
    });

    it('Is search Field Present or not', () => {
        customRender(<ListPartyMaster />);
        const searchBtn = screen.findByPlaceholderText('Search');
        expect(searchBtn).toBeTruthy();
        expect(screen.getByRole('img', { name: 'search' })).toBeTruthy();
        fireEvent.click(screen.getByRole('img', { name: 'search' }));
        const btnSearch = screen.getByRole('button', { name: 'search' });
        expect(btnSearch).toBeTruthy();
        fireEvent.click(btnSearch);
    });

    it('should able to search data', async () => {
        customRender(<ListPartyMaster />);
        const inputBox = screen.getByRole('textbox');
        fireEvent.change(inputBox, { target: { value: 'Dmstest' } });
        expect(inputBox.value.includes('Dmstest'));
        const searchButton = screen.getByRole('button', { name: /search/i });
        await act(async () => {
            fireEvent.click(searchButton);
        });
    });

    it('should validate search', async () => {
        jest.setTimeout(200000);
        customRender(<ListPartyMaster />);
        const inputBox = screen.getByRole('textbox');
        fireEvent.change(inputBox, { target: { value: 'Dm' } });
        expect(inputBox.value.includes('Dmatest'));
        const searchButton = screen.getByRole('button', { name: /search/i });
        fireEvent.click(searchButton);
        expect(await screen.findByText('Please enter atleast 3 character to search')).toBeVisible();
    });

    it('should click on add button', async () => {
        customRender(<ListPartyMaster />);
        const btnClick = screen.getByRole('button', { name: /Add/i });
        fireEvent.click(btnClick);
    });

    it('is drawer opening on click of Add btn', () => {
        customRender(<ListPartyMaster />);
        const addDrawerBtn = screen.getByTestId('addActionBtn');
        fireEvent.click(addDrawerBtn);
        expect(addDrawerBtn).toBeEnabled();
    });

    it('render refresh button', () => {
        customRender(<ListPartyMaster />);
        const refreshbutton = screen.getByTestId('refreshBtn');
        fireEvent.click(refreshbutton);
        expect(refreshbutton).toBeEnabled();
    });
});
