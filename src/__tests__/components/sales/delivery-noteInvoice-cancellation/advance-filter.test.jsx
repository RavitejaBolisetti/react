import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import AdvanceFilter from 'components/Sales/DeliveryNoteInvoiceCancellation/AdvanceFilter';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Advance Filter Component', () => {

    it('should render advance filter component UI', () => {
        const filterString={ advanceFilter: true };
        const extraParams=[{ name: 'Kai', value: 'Kai', filter: 'Kai', canRemove: true }]; 

        customRender(<AdvanceFilter filterString={filterString} extraParams={extraParams} handleResetFilter={jest.fn()} />);

        const removeFilter=screen.getByTestId('removeFilter');
        fireEvent.click(removeFilter);

        const resetBtn=screen.getByRole('button', { name: 'Clear' });
        fireEvent.click(resetBtn);
    });

});