/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils'
import { ChangePasswordForm } from "@components/common/ChangePassword/ChangePasswordForm";
import customRender from "@utils/test-utils";



// wrap the root component in a Provider
describe("ChangePasswordForm Components", () => {
    it("should render ChangePasswordForm components", ()=> {
      const changePasswordForm =  customRender(<ChangePasswordForm />);
      expect(changePasswordForm).toMatchSnapshot();
    });
    it("should change old password field in the screen", ()=>{
      customRender(<ChangePasswordForm />);
      expect(screen.getByText(/Old password/i)).toBeInTheDocument();
    })
    it("should change password field event", async () => {
          customRender(<ChangePasswordForm />);
          await act(async () => {
            const changePasswordButton = screen.getByRole('button', {
                name: /Change Password/i
              });
            fireEvent.click(changePasswordButton);      
          });
      });
});