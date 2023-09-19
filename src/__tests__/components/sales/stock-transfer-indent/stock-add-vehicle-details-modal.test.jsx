/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {AddVehicleDetailsModal} from '@components/Sales/StockTransferIndent/AddVehicleDetailsModal';
import customRender from '@utils/test-utils';

describe("AddVehicleDetailsModal",()=>{
    it("textbox",()=>{
        const ProductHierarchyData = [{rodctShrtName:'test', prodctCode:'123'}];

        customRender(<AddVehicleDetailsModal isVisible={true} handleChangeModel={jest.fn()} ProductHierarchyData={ProductHierarchyData} />);

        const requestedQuantity = screen.getByRole('textbox', {name:'Requested Quantity'});
        fireEvent.change(requestedQuantity, {target:{value:'test'}})
    })

    it("Cancel",()=>{
        customRender(<AddVehicleDetailsModal isVisible={true} onCloseAction={jest.fn()} />);

        const cancelBtn = screen.getByRole('button', {name:'Cancel'});
        fireEvent.click(cancelBtn);
    })
    
})