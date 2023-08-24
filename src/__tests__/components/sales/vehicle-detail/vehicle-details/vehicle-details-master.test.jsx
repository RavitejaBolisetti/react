import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import customRender from '@utils/test-utils';
import { VehicleDetailsMaster } from '@components/Sales/VehicleDetail/VehicleDetails/VehicleDetailsMaster';


describe('Vehicle details master component render', () => {
    customRender(<VehicleDetailsMaster isVisible={true} />)
    screen.debug();
    screen.getAllByRole('test-id')
})