import React from 'react';
import customRender from '@utils/test-utils';
import { tableColumnInvoice, tableColumnDelivery } from '@components/Sales/OTF/InvoiceDetails/tableColumn';

beforeEach(() => {
    jest.clearAllMocks();
});

describe('tableColumnInvoice', () => {
    it('renders invoice columns correctly', () => {
        const columns = tableColumnInvoice();
        customRender(<tableColumn columns={columns} data={[]} />);
        customRender(<div>{columns[1].render('Test')}</div>);
        customRender(<div>{columns[2].render('Test')}</div>);
    });
});

describe('tableColumnDelivery', () => {
    it('renders delivery columns correctly', () => {
        const columns = tableColumnDelivery();
        customRender(<tableColumn columns={columns} data={[]} />);
        customRender(<div>{columns[1].render('Test')}</div>);
    });
});
