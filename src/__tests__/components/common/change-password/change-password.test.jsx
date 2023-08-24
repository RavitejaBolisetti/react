/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { ChangePassword } from '@components/common/ChangePassword/ChangePassword';
import { fireEvent, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
afterEach(() => {
    jest.restoreAllMocks();
});
describe('ChangePassword Components', () => {
    const handler = jest.fn(() => Promise.resolve());
    it('should render ChangePassword components', () => {
        customRender(<ChangePassword callback={handler} />);
    });

    it('should render change password form input field oldPassword, newPassword and confirmPassword', async () => {
        jest.setTimeout(200000);
        const { getByTestId } = customRender(<ChangePassword isOpen={true} callback={handler} />);

        const oldPasswordInput = getByTestId('oldPasswordInput');
        await act(async () => {
            fireEvent.change(oldPasswordInput, {
                target: { value: 'Dmatest@123' },
            });
        });
        expect(oldPasswordInput.value.includes('Dmatest@123'));

        const newPasswordInput = getByTestId('newPasswordInput');
        await act(async () => {
            fireEvent.change(newPasswordInput, {
                target: { value: 'Dma@test1234' },
            });
        });
        expect(newPasswordInput.value.includes('Dma@test1234'));

        const confirmNewPasswordInput = getByTestId('confirmNewPasswordInput');
        await act(async () => {
            fireEvent.change(confirmNewPasswordInput, {
                target: { value: 'Dma@test1234' },
            });
        });
        expect(confirmNewPasswordInput.value.includes('Dma@test1234'));

        await act(async () => {
            fireEvent.click(getByTestId('changePassword'));
        });
        expect(
            await screen.findByText('Your password has been changed successfully', undefined, {
                timeout: 6000,
            })
        ).toBeVisible();
    });

    it('should render error message from change password form input field oldPassword, newPassword and confirmPassword', async () => {
        const { getByTestId } = customRender(<ChangePassword isOpen={true} callback={handler} />);

        const oldPasswordInput = getByTestId('oldPasswordInput');
        await act(async () => {
            fireEvent.change(oldPasswordInput, {
                target: { value: 'Dmatest@1222' },
            });
        });
        expect(oldPasswordInput.value.includes('Dmatest@1222'));

        const newPasswordInput = getByTestId('newPasswordInput');
        await act(async () => {
            fireEvent.change(newPasswordInput, {
                target: { value: 'Dma@test1234' },
            });
        });
        expect(newPasswordInput.value.includes('Dma@test1234'));

        const confirmNewPasswordInput = getByTestId('confirmNewPasswordInput');
        await act(async () => {
            fireEvent.change(confirmNewPasswordInput, {
                target: { value: 'Dma@test1234' },
            });
        });
        expect(confirmNewPasswordInput.value.includes('Dma@test1234'));

        await act(async () => {
            fireEvent.click(getByTestId('changePassword'));
        });
        expect(await screen.findByText('The old password you provided does not match our records')).toBeVisible();
    });
});
