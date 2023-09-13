/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { setupServer } from 'msw/node';
import { handlers } from '@mocks/handlers';
// This configures a request mocking server with the given request handlers.
export const server = setupServer(...handlers);
