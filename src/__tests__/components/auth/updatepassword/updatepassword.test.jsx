import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils'
import customRender from "@utils/test-utils";
import { UpdatePassword } from "@components/Auth/UpdatePassword/UpdatePassword";
import { screen, fireEvent, cleanup } from "@testing-library/react";

afterEach(cleanup);

describe('UpdatePassword Form Component', () => {

    const handler = jest.fn(() => Promise.resolve());
    it('should render UpdatePassword Form', async () => {
        customRender(<UpdatePassword />);
        expect(screen.getByRole('heading', {
            name: /Update Your Password/i
        })).toBeInTheDocument();
     });
    it('should check back to login link event', async () => {
        customRender(<UpdatePassword />);
        const forgetLink = screen.getByRole('link', { name: /Back To Login?/i });
        expect(forgetLink.getAttribute('href')).toBe('/login');
    });

    it("should render update password form input field oldPassword, newPassword and confirmPassword", async () => {
        
        const { getByTestId } = customRender(<UpdatePassword callback={handler} />);

        const oldPasswordInput = getByTestId("oldPasswordInput");
        fireEvent.change(oldPasswordInput, {
            target: { value: "Dmatest@123" }
          });
        expect(oldPasswordInput.value.includes("Dmatest@123"));

        const newPasswordInput = getByTestId("newPasswordInput");
        fireEvent.change(newPasswordInput, {
          target: { value: "Dma@test1234" }
        });
        expect(newPasswordInput.value.includes("Dma@test1234"));

        const confirmNewPasswordInput = getByTestId("confirmNewPasswordInput");
        fireEvent.change(confirmNewPasswordInput, {
          target: { value: "Dma@test1234" }
        });
        expect(confirmNewPasswordInput.value.includes("Dma@test1234"));

        await act(async () => {
            fireEvent.click(getByTestId("updatePassword"));
        });

      });

      
});