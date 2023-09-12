/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TaxChargesCategory } from '@components/FinancialAccounting/AccountTaxCharges/TaxAndChargesCategory/TaxChargesCategory';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('TaxChargesCategory component', () => {
    const tableData = [{taxCategoryCode: 'T002', taxCategoryDescription: null, status: null, id: '123'}];

    it('search button', () => {
        customRender(<TaxChargesCategory />);

        const categoryCode = screen.getByRole('textbox', {name:'Tax & Charges Category Code'});
        fireEvent.change(categoryCode, {target:{value:'test'}});

        const searchBtn = screen.getByRole('button', {name:'search'});
        fireEvent.click(searchBtn);
    });

    it('close-circle img', () => {
        customRender(<TaxChargesCategory />);

        const categoryCode = screen.getByRole('textbox', {name:'Tax & Charges Category Code'});
        fireEvent.change(categoryCode, {target:{value:'test'}});

        const coloseCircle = screen.getByRole('img', {name:'close-circle'});
        fireEvent.click(coloseCircle);
    });

    it('showAddButton', ()=>{
        customRender(<TaxChargesCategory showAddButton={true} 
            tableData={tableData} 
        />);
        
    })

    it('tableProps', ()=>{
        customRender(<TaxChargesCategory tableData={tableData} isLoading={false} tableColumn={[{dataIndex :"taxCategoryCode"}]} />);

        const code = screen.getByRole('columnheader', {name:'Code'});
        expect(code).toBeTruthy();

        const description = screen.getByRole('columnheader', {name:'Description'});
        expect(description).toBeTruthy();

        const status = screen.getByRole('columnheader', {name:'Status'});
        expect(status).toBeTruthy();

        const action = screen.getByRole('columnheader', {name:'Action'});
        expect(action).toBeTruthy();
    })
});
