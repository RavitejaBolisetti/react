import { rest } from "msw";
import {BASE_URL_LOGIN, BASE_URL_HEADER_DETAIL  } from 'constants/routingApi';

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
  rest.get(BASE_URL_HEADER_DETAIL, null)
];