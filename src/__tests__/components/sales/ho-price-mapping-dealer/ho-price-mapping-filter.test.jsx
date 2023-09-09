import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import HoPriceMappingFilter  from 'components/Sales/HoPriceMappingDealer/HoPriceMappingFilter';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Ho Price Mapping Filter Component', () => {

    it('should render ho price mapping filter component', () => {
        customRender(<HoPriceMappingFilter isVisible={true} />);
    });

    it('advanced filters, remove and clear button should work', () => {
        const filterString={
            advanceFilter: true
        };
        const extraParams=[{name: 'Kai', value: 'Kai', filter: true, canRemove: true}]
        customRender(<HoPriceMappingFilter isVisible={true} advanceFilter={true} filterString={filterString} extraParams={extraParams} setAdvanceSearchVisible={jest.fn()} handleResetFilter={jest.fn()} removeFilter={jest.fn()}/>);

        const advanceFilter=screen.getByRole('button', { name: /Advanced Filters/i });
        fireEvent.click(advanceFilter);
        const removeBtn=screen.getByTestId('removeBtn');
        fireEvent.click(removeBtn);
        const clearBtn=screen.getByRole('button', { name: 'Clear' });
        fireEvent.click(clearBtn);
    });

});