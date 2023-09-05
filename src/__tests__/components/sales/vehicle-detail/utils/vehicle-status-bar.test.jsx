import React from 'react';
import customRender from '@utils/test-utils';
import { VehicleStatusBar } from 'components/Sales/VehicleDetail/utils/VehicleStatusBar';

describe('Vehicle Status Bar Component', () => {

    it('should render vehicle status bar component', () => {
        customRender(<VehicleStatusBar />);
    });

    it('should display cancelled item', () => {
        customRender(<VehicleStatusBar status={'Cancelled'} />);
    });
    
})