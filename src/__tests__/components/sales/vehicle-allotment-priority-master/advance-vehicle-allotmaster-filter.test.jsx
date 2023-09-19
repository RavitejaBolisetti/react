/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import AdvanceVehicleAllotMasterFilter from '@components/Sales/VehicleAllotmentPriorityMaster/AdvanceVehicleAllotMasterFilter';

const setFieldsValue = true;

describe('Advance Vehicle Allotment Master Filter component', () => {
    it('should render advance vehicle allot master filter component', () => {
        customRender(<AdvanceVehicleAllotMasterFilter searchForm={setFieldsValue} handleButtonClick={jest.fn()} />);
    });

    it(' vehicle allotment button should work', () => {
        customRender(<AdvanceVehicleAllotMasterFilter searchForm={setFieldsValue} handleButtonClick={jest.fn()} />);
        const plusAddBtn = screen.getByRole('button', { name: 'plus Add' });
        fireEvent.click(plusAddBtn);
        const plusBtn = screen.getByRole('img', { name: 'plus' });
        fireEvent.click(plusBtn);
    });

    it('advance filters button should work', async () => {
        customRender(<AdvanceVehicleAllotMasterFilter searchForm={setFieldsValue} setAdvanceSearchVisible={jest.fn()} advanceFilter={true} />);
        const advancedFiltersBtn = screen.getByRole('button', { name: 'Advanced Filters' });
        fireEvent.click(advancedFiltersBtn);
    });

    it('remove filter should work', async () => {
        const filterString = {
            advanceFilter: true,
        };
        const extraParams = [{ name: 'Kai', value: 'Kai', filter: 'Kai', key: 1, canRemove: true }];
        customRender(<AdvanceVehicleAllotMasterFilter searchForm={setFieldsValue} removeFilter={jest.fn()} filterString={filterString} advanceFilter={true} extraParams={extraParams} />);
        const removeBtn = screen.getByTestId('removeBtn');
        fireEvent.click(removeBtn);
    });

    it('clear button should work', async () => {
        const filterString = {
            advanceFilter: true,
        };
        const extraParams = [{ name: 'John' }];
        customRender(<AdvanceVehicleAllotMasterFilter searchForm={setFieldsValue} handleResetFilter={jest.fn()} filterString={filterString} advanceFilter={true} extraParams={extraParams} />);
        const clearBtn = screen.getByRole('button', { name: 'Clear' });
        fireEvent.click(clearBtn);
    });
});
