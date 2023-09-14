import React from 'react';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import AdvanceOTFFilter from 'components/Sales/VehicleDetail/AdvanceOtfFilter';

describe('Advanced Booking Filter Component', () => {

    it('should render advance otf filter component', () => {
        customRender(<AdvanceOTFFilter advanceFilter={true} setAdvanceSearchVisible={jest.fn()} />);
        const advancedFilters=screen.getByRole('button', { name: 'Advanced Filters' });
        fireEvent.click(advancedFilters);
    });
    
})