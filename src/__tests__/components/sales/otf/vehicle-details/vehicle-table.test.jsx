import React from 'react';
import customRender from '@utils/test-utils';
import { taxDetailsColumn, optionalServicesColumns } from '@components/Sales/OTF/VehicleDetails/tableColumn';

describe('tableColumnInvoice', () => {
    it('renders invoice columns correctly', () => {
        const columns = taxDetailsColumn;
        customRender(<tableColumn columns={columns} data={[]} />);
    });
});

describe('tableColumnDelivery', () => {
    it('renders delivery columns correctly', () => {
        const columns = optionalServicesColumns;
        customRender(<tableColumn columns={columns} data={[]} />);
    });
});
