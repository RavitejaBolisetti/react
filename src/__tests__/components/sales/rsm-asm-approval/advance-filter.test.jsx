/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import { screen, fireEvent } from '@testing-library/react';
import customRender from '@utils/test-utils';
import AdvanceFilter from '@components/Sales/RsmAsmApproval/AdvanceFilter';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('rsm asm approval filter render', () => {
    it('should render Evr details capturing filter component', async () => {
        customRender(<AdvanceFilter />);
    });

    it('advance filters button should work', async () => {
        customRender(<AdvanceFilter setAdvanceSearchVisible={jest.fn()} advanceFilter={true} />);
        const advancedFiltersBtn = screen.getByRole('button', { name: 'Advance Filters' });
        fireEvent.click(advancedFiltersBtn);
    });

    it('remove filter should work', async () => {
        const filterString = {
            advanceFilter: true,
        };
        const extraParams = [{ name: 'Kai', value: 'Kai', filter: 'Kai', key: 1, canRemove: true }];
        customRender(<AdvanceFilter removeFilter={jest.fn()} filterString={filterString} advanceFilter={true} extraParams={extraParams} />);
        const removeBtn = screen.getByTestId('removeFilter');
        fireEvent.click(removeBtn);
    });

    it('clear button should work', async () => {
        const filterString = {
            advanceFilter: true,
        };
        const extraParams = [{ name: 'John' }];
        customRender(<AdvanceFilter handleResetFilter={jest.fn()} filterString={filterString} advanceFilter={true} extraParams={extraParams} />);
        const clearBtn = screen.getByRole('button', { name: 'Clear' });
        fireEvent.click(clearBtn);
    });
});
