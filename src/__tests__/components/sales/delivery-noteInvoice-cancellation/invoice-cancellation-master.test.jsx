import React from 'react';
import InvoiceCancellationMaster  from 'components/Sales/DeliveryNoteInvoiceCancellation/InvoiceCancellationMaster';
import customRender from '@utils/test-utils';
afterEach(() => {
  jest.restoreAllMocks();
});
describe('InvoiceCancellationMaster Component', () => {

    it('should render InvoiceCancellationMaster component UI', () => {
        customRender(<InvoiceCancellationMaster />)
    });
 
});