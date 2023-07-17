import { screen, fireEvent, cleanup } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils';
import customRender from "@utils/test-utils";
import { ForgotPassword } from "@components/Auth/ForgotPassword/ForgotPassword";
import { useState } from 'react';
import {renderHook} from '@testing-library/react'
afterEach(cleanup);
const userId = 2;
const currentStep = 2;
describe('Forgot Password Component render', () => {
    it('should render ForgotPassword component page', async () => {
        customRender(<ForgotPassword />);
        expect(screen.getByRole('heading', {
            name: /forgot your password/i
        })).toBeInTheDocument();
    });
    it("should render step 1 for forgetPassword components", async () => {
            customRender(<ForgotPassword currentStep={1} />);
            const inputBox = screen.getByRole("textbox");
            fireEvent.change(inputBox, { target: { value: "Dmatest" } });
            expect(inputBox.value.includes("Dmatest"));
            await act(async () => {
                const verifyUserButton = screen.getByRole('button', {
                    name: /verify user/i
                });
                fireEvent.click(verifyUserButton); 
            });     
        });
    it('should check back to login button event', async () => {
        customRender(<ForgotPassword />);
        const loginLink = screen.getByRole('link', { name: /Back to Login/i });
        expect(loginLink.getAttribute('href')).toBe('/login');
    })
    it("should check blank field validation", async()=> {
        customRender(<ForgotPassword />);
        await act(async () => {
            const verifyUserButton = screen.getByRole('button', {
                name: /verify user/i
            });
            fireEvent.click(verifyUserButton); 
        });
        expect(await screen.findByText('Please enter user id', undefined, {
            timeout: 2000})).toBeVisible();
    })
    it("should check blank field validation", async()=> {
        const {result, rerender} = customRender(<ForgotPassword handleFormChange={jest.fn()} props={userId} surrentStep={currentStep} />);
        screen.debug();
        });
});


