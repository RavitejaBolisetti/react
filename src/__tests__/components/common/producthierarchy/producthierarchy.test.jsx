/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen, fireEvent, waitFor } from '@testing-library/react';

import { ProductHierarchy } from '@components/common/ProductHierarchy/ProductHierarchy';

describe('Product Hierarchy Test', () => {
    it('should render product hierarchy page', () => {
        customRender(<ProductHierarchy />);
        expect(screen.getAllByText('Hierarchy')).toBeTruthy();
    });
    it('should render combobox', () => {
        customRender(<ProductHierarchy />);
        const combo = screen.getByRole('combobox');
        expect(combo).toBeInTheDocument();
    });

    it('should click combobx', () => {
        customRender(<ProductHierarchy />);
        const combo = screen.getByRole('combobox');
        fireEvent.click(combo);
    });

    it('should select tree value', async () => {
        customRender(<ProductHierarchy />);
        const verifyUserButton = screen.getByRole('combobox');
        fireEvent.click(verifyUserButton);
        await waitFor(() => expect(verifyUserButton).toHaveAttribute('aria-expanded', 'false'));
    });
});
