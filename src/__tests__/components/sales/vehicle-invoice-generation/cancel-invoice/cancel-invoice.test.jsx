import React from 'react';
import customRender from '@utils/test-utils';
import { CancelInvoice } from '@components/Sales/VehicleInvoiceGeneration/CancelInvoice/cancelInvoice';

describe('Cancel invoicecomponent render', () => {
    it('should render component', () => {
        customRender(<CancelInvoice isVisible={true} />);
    });
});
