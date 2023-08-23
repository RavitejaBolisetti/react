import React from 'react';
import customRender from '@utils/test-utils';
import { ContactMasterMain } from '@components/common/CustomerMaster/CorporateCustomer/Address/AddressMaster';

beforeEach(() => {
    jest.clearAllMocks()
})

describe('AddressMaster', () => {
    it('should render address master', async () => {
        customRender(<ContactMasterMain />)
    });
});

