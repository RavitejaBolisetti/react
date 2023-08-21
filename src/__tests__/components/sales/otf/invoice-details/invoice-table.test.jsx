import React from 'react';
import customRender from '@utils/test-utils';
import { tableColumnInvoice, tableColumnDelivery, tableColumn } from '@components/Sales/OTF/InvoiceDetails/tableColumn';
afterEach(() => {
    jest.restoreAllMocks();
  }); 
describe('tableColumnInvoice', () => {
    it('renders invoice columns correctly', () => {
        const columns = tableColumnInvoice();
        customRender(<tableColumn columns={columns} data={[]} />);
    });
});

describe('tableColumnDelivery', () => {
    it('renders delivery columns correctly', () => {
        const columns = tableColumnDelivery();
        customRender(<tableColumn columns={columns} data={[]} />);
    });
});
