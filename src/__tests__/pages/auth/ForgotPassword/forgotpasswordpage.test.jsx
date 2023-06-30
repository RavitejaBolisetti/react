import '@testing-library/jest-dom/extend-expect';
import customRender from "@utils/test-utils";
import { ForgotPassword } from '@pages/auth/ForgotPassword/ForgotPassword';

describe("ForgotPassword Components", () => {
    it("should render ForgotPassword components", ()=> {
    const ForgotPassword =  customRender(<ForgotPassword />);
    expect(ForgotPassword).toMatchSnapshot();
    screen.debug();
    });
});
