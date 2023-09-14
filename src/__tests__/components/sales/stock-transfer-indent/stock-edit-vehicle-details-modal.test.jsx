/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { EditVehicleDetailsModal } from '@components/Sales/StockTransferIndent/EditVehicleDetailsModal';
import customRender from '@utils/test-utils';

describe("EditVehicleDetailsModal",()=>{
    it("Close Button", ()=>{
        customRender(<EditVehicleDetailsModal isVisible={true} />);

        const closeBtn = screen.getByRole('button', {name:'Close'});
        fireEvent.click(closeBtn);
    });

    it("Cancel Button", ()=>{
        customRender(<EditVehicleDetailsModal isVisible={true} />);

        const cancelBtn = screen.getByRole('button', {name:'Cancel'});
        fireEvent.click(cancelBtn);
    });

    it("Submit Button", ()=>{
        customRender(<EditVehicleDetailsModal isVisible={true} />);

        const submitBtn = screen.getByRole('button', {name:'Submit'});
        fireEvent.click(submitBtn);
    });
})