/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import customRender from '@utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, screen } from "@testing-library/react";
import { GSTLoginForm } from 'components/FinancialAccounting/GSTIRNAuthentication/GSTLoginForm';

describe("GSTLoginForm component",()=>{
    it("userNameInput", ()=>{
        customRender(<GSTLoginForm />);

        const userNameInputbox = screen.getByTestId('userNameInput');
        fireEvent.change(userNameInputbox, {target:{value:'userTest'}});
        expect(userNameInputbox.value).toBe('userTest');     
    });

    it("clientIdInput", ()=>{
        customRender(<GSTLoginForm />);

        const clientIdInputbox = screen.getByTestId('clientIdInput');
        fireEvent.change(clientIdInputbox, {target:{value:'clientTest1'}});
        expect(clientIdInputbox.value).toBe('clientTest1');

        const clientMouseDown = screen.getByTestId('clint-id-icon');
        fireEvent.mouseDown(clientMouseDown);

        const clientMouseUp= screen.getByTestId('clint-id-icon');
        fireEvent.mouseUp(clientMouseUp);

        const clientMouseLeave= screen.getByTestId('clint-id-icon');
        fireEvent.mouseLeave(clientMouseLeave);
    });

    it("secretIdInput", ()=>{
        customRender(<GSTLoginForm />);

        const secretIdInputbox = screen.getByTestId('secretIdInput');
        fireEvent.change(secretIdInputbox, {target:{value:'secretTest'}});
        expect(secretIdInputbox.value).toBe('secretTest');

        const secretMouseDown = screen.getByTestId('secret-id-icon');
        fireEvent.mouseDown(secretMouseDown);

        const secretMouseUp= screen.getByTestId('secret-id-icon');
        fireEvent.mouseUp(secretMouseUp);

        const secretMouseLeave= screen.getByTestId('secret-id-icon');
        fireEvent.mouseLeave(secretMouseLeave);
    });

    it("passwordInput", ()=>{
        customRender(<GSTLoginForm />);

        const passwordInputbox = screen.getByTestId('passwordInput');
        fireEvent.change(passwordInputbox, {target:{value:'passwordTest'}});
        expect(passwordInputbox.value).toBe('passwordTest');

        const passwordMouseDown = screen.getByTestId('password-id-icon');
        fireEvent.mouseDown(passwordMouseDown);

        const passwordMouseUp= screen.getByTestId('password-id-icon');
        fireEvent.mouseUp(passwordMouseUp);

        const passwordMouseLeave= screen.getByTestId('password-id-icon');
        fireEvent.mouseLeave(passwordMouseLeave);
    });
})