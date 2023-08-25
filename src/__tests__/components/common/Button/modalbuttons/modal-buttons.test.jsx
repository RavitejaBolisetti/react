/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ModalButtons } from '@components/common/Button/ModalButtons/ModalButtons';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('ButtonButtons component', () => {
    it('should render all buttons', () => {
        const { container } = customRender(<ModalButtons />);
        expect(container.firstChild).toHaveClass('modalFooter');
    });
});
