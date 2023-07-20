/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { rest } from 'msw';
import { BASE_URL_LOGIN, BASE_URL_HEADER_DETAIL, BASE_URL_VERIFY_USER } from 'constants/routingApi';

export const handlers = [
    rest.post(BASE_URL_LOGIN, (req, res, ctx) => {
        const { userId, password } = req.json();
        if (userId === 'test' && password === 'password') {
            return res(ctx.status(200), ctx.json({ token: 'mocked_token' }));
        } else {
            return res(ctx.status(401), ctx.json({ error: 'Invalid credentials' }));
        }
    }),
    rest.get(BASE_URL_HEADER_DETAIL, null),
    rest.post(BASE_URL_VERIFY_USER, (req, res, ctx) => {
        const { userId } = req.json();
        if (userId == 'test') {
            return res(
                ctx.status(200),
                ctx.json({
                    responseMessage: 'User credentials verified successfully',
                })
            );
        } else {
            return res(ctx.status(401), ctx.json({ error: 'USER_NOT_FOUND' }));
        }
    }),
];
