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

afterEach(() => {
    jest.restoreAllMocks();
});

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
        act(async () => {
            const searchButton = screen.getByRole('button', { name: /search/i });
            fireEvent.click(searchButton);
        });
    });

});
