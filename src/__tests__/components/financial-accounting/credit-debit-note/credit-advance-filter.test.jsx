
/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AdvanceFilter from '@components/FinancialAccounting/CreditDebitNote/AdvanceFilter';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe("AdvanceFilter", ()=>{
    
    it("clearBtn", ()=>{
        const filterString = {advanceFilter:true};
        const extraParams = [{filter: true, name:'test'}];

        customRender(<AdvanceFilter isVisible={true} advanceFilter={true} filterString={filterString} extraParams={extraParams} handleResetFilter={jest.fn()} />);

        const clearBtn = screen.getByRole('button', {name:'Clear'});
        fireEvent.click(clearBtn);
    })

    it("removeBtn", ()=>{
        const filterString = {advanceFilter:true};
        const extraParams = [{filter: true, name:'test', value:'123', canRemove:'true'}];
        
        customRender(<AdvanceFilter isVisible={true} advanceFilter={true} filterString={filterString} extraParams={extraParams} removeFilter={jest.fn()} />);

        const removeBtn = screen.getByTestId('remove-filter');
        fireEvent.click(removeBtn);
    })
})