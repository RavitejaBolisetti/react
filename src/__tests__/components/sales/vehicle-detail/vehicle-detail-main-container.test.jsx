import React from 'react';
import customRender from '@utils/test-utils';
import { VehicleDetailMainContainer } from 'components/Sales/VehicleDetail/VehicleDetailMainContainer';

describe('Vehicle Detail Main Container', () => {

    it('should render vehicle detail main container component', () => {
        customRender(<VehicleDetailMainContainer isVisible={true}/>);
    });

    it('vehicle details master component should render', () => {
        customRender(<VehicleDetailMainContainer isVisible={true} currentSection={1} />);
    });

    it('customer details master component should render', () => {
        customRender(<VehicleDetailMainContainer isVisible={true} currentSection={2} />);
    })

    it('product detail master component should render', () => {
        customRender(<VehicleDetailMainContainer isVisible={true} currentSection={3} />);
    })

    it('supporting document master component should render', () => {
        customRender(<VehicleDetailMainContainer isVisible={true} currentSection={4} />);
    });

    it('contact master component should render', () => {
        customRender(<VehicleDetailMainContainer isVisible={true} currentSection={5} />);
    });

    it('entitlements and scheme master component should render', () => {
        customRender(<VehicleDetailMainContainer isVisible={true} currentSection={9} />);
    });

});