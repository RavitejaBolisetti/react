import React from 'react';
import { VehicleCustomerSearch } from '@components/Sales/VehicleDetail/CustomerDetails/VehicleCustomerSearch';
import customRender from '@utils/test-utils';

describe('Vehicle customer search', () => {
    it('should render Vehicle customer search components', () => {
        customRender(
            <VehicleCustomerSearch onCloseAction={jest.fn()} handleCancel={jest.fn()} isVisible={true} titleOverride={"test"} closable={false} />
        )
    })
})