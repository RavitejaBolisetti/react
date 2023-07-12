/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { DrawerFormButton } from '@components/common/Button/DrawerFormButton';

describe('DrawerFormButton Components', () => {
    it('should render DrawerFormButton components', () => {
        const { container } = render(<DrawerFormButton />);
        expect(container.firstChild).toHaveClass('formFooter');
    });
});
 
