import { rest } from "msw";
import { BASE_URL_LOGIN, BASE_URL_HEADER_DETAIL, BASE_URL_VERIFY_USER, BASE_URL_CHANGE_PASSWORD } from 'constants/routingApi';

export const handlers = [
  rest.post(BASE_URL_LOGIN, (req, res, ctx) => {
    const { userId, password } = req.json();
    if (userId === 'test' && password === 'password') {
      return res(
        ctx.status(200),
        ctx.json({ token: 'mocked_token' })
      );
    } else {
      return res(
        ctx.status(401),
        ctx.json({ error: 'Invalid credentials' })
      );
    }

  }),
  rest.get(BASE_URL_HEADER_DETAIL, null),
  rest.post(BASE_URL_VERIFY_USER, (req, res, ctx) => {
    const { userId } = req.json();
    if (userId == 'test') {
      return res(
        ctx.status(200),
        ctx.json({
          responseMessage: "User credentials verified successfully",
          email: "sushil.kumxxxx@wipro.com",
          contactNumber: "XXXXXX5423"
        })
      );
    } else {
      return res(
        ctx.status(401),
        ctx.json({ error: 'USER_NOT_FOUND' })
      );
    }
  }),
  rest.post(BASE_URL_CHANGE_PASSWORD, (req, res, ctx) => {
    const { userId, oldPassword } = req.json();
    if (oldPassword == 'Dmatest@123' && ( newPassword == 'Dma@test1234' && confirmNewPassword == 'Dma@test1234')) {
      return res(
        ctx.status(200),
        ctx.json({
          responseMessage: "Your password has been changed successfully. You can now log in using your new password."
        
        })
      )
    }
    else{
      return res(
        ctx.status(401),
        ctx.json({
          error: "The old password you provided does not match our records. Please make sure you entered the correct old password and try again."
        })
      );
    }
  }),
];