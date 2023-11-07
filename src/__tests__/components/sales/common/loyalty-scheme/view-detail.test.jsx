import React from 'react';
import { ViewDetail } from 'components/Sales/Common/LoyaltyScheme/ViewDetail';
import customRender from '@utils/test-utils';

describe('Loyalty scheme master render', () => {
    it('Should render view component', () => {
        customRender(<ViewDetail isVisible={true} />);
    });
});
