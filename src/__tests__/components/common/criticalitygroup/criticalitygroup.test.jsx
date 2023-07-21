/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { CriticalityGroup } from '@components/common/CriticalityGroup/CriticalityGroup';

export const buttonLookAndFireEventWithText = async (btnText) => {
    const CancelBtn = await screen.findByText(btnText);
    expect(CancelBtn).toBeTruthy();
    fireEvent.click(CancelBtn);
};

export const InputFieldAvailablity = async (placeholderText) => {
    const InputFieldCode = await screen.findByPlaceholderText(placeholderText);
    expect(InputFieldCode).toBeTruthy();
};

describe('CriticalityGroup Components', () => {
    it('should render CriticalityGroup components', () => {
        customRender(<CriticalityGroup />);
    });
    it('should render page', () => {
        customRender(<CriticalityGroup />);
        expect(screen.getAllByText(/Criticality Group List/i)).toBeTruthy();
    });
    it('should able to search data', async () => {
        customRender(<CriticalityGroup />);
        const inputBox = screen.getByRole('textbox');
        fireEvent.change(inputBox, { target: { value: 'Dmatest' } });
        expect(inputBox.value.includes('Dmatest'));
        await act(async () => {
            const searchButton = screen.getByRole('button', { name: /search/i });
            fireEvent.click(searchButton);
        });
    });
    it('should click add', async () => {
        customRender(<CriticalityGroup />);
        await act(async () => {
            const buttonClick = screen.getByRole('button', { name: /Add/i });
            fireEvent.click(buttonClick);
        });
    });
    it('should click refresh', async () => {
        customRender(<CriticalityGroup />);
        const buttonClick = screen.getByTestId('refreshBtn');
        expect(buttonClick).toBeTruthy();
        fireEvent.click(buttonClick);
    });
    it('should validate search', async () => {
        jest.setTimeout(200000);
        customRender(<CriticalityGroup />);
        const inputBox = screen.getByRole('textbox');
        fireEvent.change(inputBox, { target: { value: 'Dm' } });
        await act(async () => {
            const searchButton = screen.getByRole('button', { name: /search/i });
            fireEvent.click(searchButton);
        });
        expect(
            await screen.findByText('Please enter atleast 3 character to search', undefined, {
                timeout: 5000,
            })
        ).toBeVisible();
    });
});
