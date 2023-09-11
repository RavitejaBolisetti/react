import '@testing-library/jest-dom/extend-expect';
import { RSMApprovalButtons } from '@components/Sales/RSMApproval/RSMApprovalButtons';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('RSM form-button components', () => {
    it('should render components', () => {
        const buttonData = {
            closeBtn: true,
            reject: true,
            approve: true,
        };
        customRender(<RSMApprovalButtons setButtonData={jest.fn()} buttonData={buttonData} handleButtonClick={jest.fn()} handleRequest={jest.fn()} />);

        const closeBtn = screen.getByRole('button', { name: 'Close' });
        fireEvent.click(closeBtn);
        const rejectBtn = screen.getByRole('button', { name: 'Reject' });
        fireEvent.click(rejectBtn);
        const approveBtn = screen.getByRole('button', { name: 'Approve' });
        fireEvent.click(approveBtn);
    });
});
