import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, screen } from "@testing-library/react";
import AdvanceFilter from 'components/Sales/OTF/OTFAllotment/AdvanceFilter';
import customRender from '@utils/test-utils';

describe('Advance Filter Component', () => {
    it('should render advance filter component', () => {
        customRender(<AdvanceFilter isVisible={true} />)
    });

    it('remove filter and clear button should work', () => {
        const extraParams=[{value: 'Kai', filter: 'Kai', key: 'Kai', name: 'Kai', canRemove:'Kai'}];
        const filterString={
            advanceFilter: true
        };
        customRender(<AdvanceFilter advanceFilter={true} extraParams={extraParams} filterString={filterString} handleResetFilter={jest.fn()} removeFilter={jest.fn()} />);
        
        const removeFilter=screen.getByTestId('removeFilter');
        fireEvent.click(removeFilter);
        const clearBtn=screen.getByRole('button', { name: 'Clear' });
        fireEvent.click(clearBtn);
    });
});
