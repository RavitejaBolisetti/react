/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { HierarchyFormButton } from '@components/common/Button/HierarchyFormButton';
import { act } from 'react-dom/test-utils';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});
const buttonData = {
    siblingBtn: true,
    editBtn: true,
    childBtn: true,
};
describe('HierarchyFormButton Components', () => {
    it('should render DrawerFormButton components', () => {
        const { container } = render(<HierarchyFormButton />);
        expect(container.firstChild).toHaveClass('formFooter');
    });
    it('should render all buttons', async () => {
        customRender(<HierarchyFormButton buttonData={buttonData} handleButtonClick={jest.fn()} />);
        await act(async () => {
            const editButton = screen.getByRole('button', {
                name: /Edit/i,
            });
            fireEvent.click(editButton);
        });
        await act(async () => {
            const addChildButton = screen.getByRole('button', {
                name: /Add Child/i,
            });
            fireEvent.click(addChildButton);
        });
        await act(async () => {
            const addSiblingButton = screen.getByRole('button', {
                name: /Add Sibling/i,
            });
            fireEvent.click(addSiblingButton);
        });
    });
});
