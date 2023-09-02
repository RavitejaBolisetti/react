import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { ForgotPassword } from '@components/Auth/ForgotPassword/ForgotPassword';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('ForgotPassword Component render', () => {
    it('should render ForgotPassword component page', async () => {
        customRender(<ForgotPassword />);
    });

    it('shoud check all click event', async () => {
        customRender(<ForgotPassword />);

        const userIdLabel = screen.getByText('User ID (MILE ID.Parent ID)');
        fireEvent.click(userIdLabel);

        const userId = screen.getByRole('textbox', { name: '' });
        fireEvent.change(userId, { target: { value: 'Kai' } });

        const verifyUserBtn = screen.getByRole('button', { name: 'Verify User' });
        fireEvent.click(verifyUserBtn);
    });

    it('should render Forgot Password component UI', async () => {
        customRender(<ForgotPassword />);
    });
});
