import React from 'react';
import customRender from '@utils/test-utils';
import { timeStampCheck } from '@components/Sales/VehicleInvoiceGeneration/utils/TimeStampCheck';

describe('Inovice Generation Main Cotainer component render', () => {
    it('should render main container component', () => {
        const Time = timeStampCheck;
        customRender(<Time isVisible={true} />);
    });
});
