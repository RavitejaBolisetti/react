/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TreeSelectField from '@components/common/TreeSelectField';
afterEach(() => {
    jest.restoreAllMocks();
});

describe('TreeSelectField Components', () => {
    it('should render TreeSelectField components', () => {
        render(<TreeSelectField />);
        expect(screen.getByText(/DMS/i)).toBeInTheDocument();
    });
});
