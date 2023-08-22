import React from 'react';
import customRender from '@utils/test-utils';
import { ContactMaster } from '@components/common/CustomerMaster/CorporateCustomer/Contact/ContactMaster';

beforeEach(() => {
    jest.clearAllMocks()
})

describe('Contact master', () => {
    it('should render contact master', async () => {
        customRender(<ContactMaster />)
    });
});
