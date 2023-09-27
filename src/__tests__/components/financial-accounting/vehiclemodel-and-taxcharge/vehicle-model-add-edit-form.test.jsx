/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AddEditForm } from '@components/FinancialAccounting/VehicleModelAndTaxCharges/AddEditForm';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('AddEditForm component', () => {
    it('close button', () => {
        customRender(<AddEditForm isVisible={true} formActionType={{}} onCloseAction={jest.fn()} buttonData={{closeBtn:true}}/>);

        const closeBtn = screen.getAllByRole('button', {name:'Close'});
        fireEvent.click(closeBtn[0]);
    });

    it('viewMode=true',()=>{
        customRender(<AddEditForm isVisible={true} formActionType={{}} viewMode={true} />);
    })

    it('viewMode=false',()=>{
        customRender(<AddEditForm isVisible={true} formActionType={{}} viewMode={false} />);
    })

    it("TaxChargesOptions", ()=>{
        const TaxChargesOptions = [{id:'123', key:'T001', parentKey:null, value:'SGST'}];
        const formData = {taxCategoryId:'123', taxCategoryDescription:'test'}

        customRender(<AddEditForm isVisible={true} formActionType={{}} viewMode={false} TaxChargesOptions={TaxChargesOptions} formData={formData}/>)
    })

    it("TaxChargesOptions", ()=>{
        const AccountDataOptions = [{key:'T001', parentKey:null, value:'SGST'}];
        const formData = {accountCategoryCode: "A002", accountCategoryDescription:'test'};

        customRender(<AddEditForm isVisible={true} formActionType={{}} viewMode={false} AccountDataOptions={AccountDataOptions} formData={formData}/>)
    })
})