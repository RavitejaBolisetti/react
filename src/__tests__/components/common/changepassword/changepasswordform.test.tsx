import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import customRender from "@utils/test-utils";
import { ChangePasswordForm } from "@components/common/ChangePassword/ChangePasswordForm";

describe("ChangePasswordForm Components", () => {
    it("should render ChangePasswordForm components", ()=> {
      const changePasswordForm =  customRender(<ChangePasswordForm />);
    expect(changePasswordForm).toMatchSnapshot();
    });
});