/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import { RsmAsmApprovalButtons } from '@components/Sales/RsmAsmApproval/RsmAsmApprovalButtons';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('RSM ASM form-button components', () => {
    it('should render components', () => {
        const buttonData = {
            closeBtn: true,
            rejectBtn: true,
            approveBtn: true,
        };
        customRender(<RsmAsmApprovalButtons setButtonData={jest.fn()} buttonData={buttonData} handleButtonClick={jest.fn()} handleRequest={jest.fn()} />);

        const closeBtn = screen.getByRole('button', { name: 'Close' });
        fireEvent.click(closeBtn);
    });
});
