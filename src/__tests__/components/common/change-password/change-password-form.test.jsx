/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils';
import { ChangePasswordForm } from 'components/common/ChangePassword/ChangePasswordForm';
import customRender from '@utils/test-utils';
import { Form } from 'antd';

afterEach(() => {
    jest.restoreAllMocks();
});

jest.mock('store/actions/data/changePassword', () => ({
    changePasswordActions: {}
}));

jest.mock('store/actions/auth', () => ({
    doLogoutAPI: {}
}));

const FormWrapper = (props) => {
    const [form] = Form.useForm();

    const myFormMock = {
        ...form,
        setFieldsValue: jest.fn(),
        resetFields: jest.fn()
    };
    return <ChangePasswordForm form={myFormMock} {...props} />;
};

const setFieldData = () => {};
const setPassword = () => {};

describe('ChangePasswordForm Components', () => {
    const handler = jest.fn(() => Promise.resolve());
    it('should render ChangePasswordForm components', () => {
        customRender(<ChangePasswordForm />);
    });

    it('should change old password field in the screen', () => {
        customRender(<ChangePasswordForm />);
        expect(screen.getByText(/Old password/i)).toBeInTheDocument();
    });

    it('should change password field event', async () => {
        customRender(<ChangePasswordForm />);
        await act(async () => {
            const changePasswordButton = screen.getByRole('button', {
                name: /Change Password/i,
            });
            fireEvent.click(changePasswordButton);
        });
    });

    it('should render change password form input field oldPassword, newPassword and confirmPassword', async () => {

        const saveData=jest.fn();
        const doLogout=jest.fn();
        const res={ data: { name: 'Kai' } };

        customRender(<FormWrapper setFieldData={setFieldData} setPassword={setPassword} callback={handler} saveData={saveData} doLogout={doLogout} />);

        const oldPasswordInput = screen.getByTestId('oldPasswordInput');
        fireEvent.change(oldPasswordInput, {
            target: { value: 'Dmatest@123' },
        });
        expect(oldPasswordInput.value.includes('Dmatest@123'));

        const newPasswordInput = screen.getByTestId('newPasswordInput');
        fireEvent.change(newPasswordInput, {
            target: { value: 'Dma@test1234' },
        });
        expect(newPasswordInput.value.includes('Dma@test1234'));

        const confirmNewPasswordInput = screen.getByTestId('confirmNewPasswordInput');
        fireEvent.change(confirmNewPasswordInput, {
            target: { value: 'Dma@test123' },
        });
        fireEvent.change(confirmNewPasswordInput, {
            target: { value: 'Dma@test1234' },
        });
        expect(confirmNewPasswordInput.value.includes('Dma@test1234'));

        act(async () => {
            fireEvent.click(screen.getByTestId('changePassword'));
        });

        const showPassword=screen.getAllByTestId('eyeInvisible');
        fireEvent.mouseDown(showPassword[0]);
        fireEvent.mouseUp(showPassword[0]);
        fireEvent.mouseLeave(showPassword[0]);

        await waitFor(() => { expect(saveData).toHaveBeenCalled() });
        saveData.mock.calls[0][0].onSuccess();
        saveData.mock.calls[0][0].onError();

        await waitFor(() => { expect(doLogout).toHaveBeenCalled() });
        doLogout.mock.calls[0][0].onSuccess(res);
    });

});
