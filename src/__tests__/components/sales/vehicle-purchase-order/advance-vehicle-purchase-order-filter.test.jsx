/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import '@testing-library/jest-dom/extend-expect';
import { screen, fireEvent } from '@testing-library/react';
import customRender from '@utils/test-utils';
import AppliedAdvanceFilter from '@components/Sales/VehiclePurchaseOrder/AdvanceVehiclePurchaseOrderFilter';
afterEach(() => {
    jest.restoreAllMocks();
});
describe('advance vehicle purchase order filter render', () => {
    it('should render advanced search component', async () => {
        customRender(<AppliedAdvanceFilter />);
    });

    it('advance filters button should work', async () => {
        customRender(<AppliedAdvanceFilter setAdvanceSearchVisible={jest.fn()} advanceFilter={true} />);
        const advancedFiltersBtn = screen.getByRole('button', { name: 'Advanced Filters' });
        fireEvent.click(advancedFiltersBtn);
    });

    it('remove filter should work', async () => {
        const filterString = {
            advanceFilter: true,
        };
        const extraParams = [{ name: 'Kai', value: 'Kai', filter: 'Kai', key: 1, canRemove: true }];
        customRender(<AppliedAdvanceFilter removeFilter={jest.fn()} filterString={filterString} advanceFilter={true} extraParams={extraParams} />);
        const removeBtn = screen.getByTestId('removeFilter');
        fireEvent.click(removeBtn);
    });

    it('plus and add button should work', async () => {
        const filterString = {
            advanceFilter: true,
        };
        const extraParams = [{ name: 'John' }];
        customRender(<AppliedAdvanceFilter handleResetFilter={jest.fn()} handleButtonClick={jest.fn} filterString={filterString} advanceFilter={true} extraParams={extraParams} onClick={jest.fn} />);
        const plusBtn = screen.getByRole('img', { name: 'plus' });
        fireEvent.click(plusBtn);

        const addBtn = screen.getAllByText('Add');
        fireEvent.click(addBtn[0]);

        const undefine = screen.getByText('undefined');
        fireEvent.click(undefine);
    });
    it('clear button should work', async () => {
        const filterString = {
            advanceFilter: true,
        };
        const extraParams = [{ name: 'Kai', value: 'Kai', filter: 'Kai', key: 1 }];

        customRender(<AppliedAdvanceFilter handleResetFilter={jest.fn()} filterString={filterString} advanceFilter={true} extraParams={extraParams} />);
        const clearBtn = screen.getByRole('button', { name: 'Clear' });
        fireEvent.click(clearBtn);
    });
});
