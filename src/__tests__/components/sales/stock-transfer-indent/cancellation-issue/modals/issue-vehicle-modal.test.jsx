/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { IssueVehicleDetailsModal } from '@components/Sales/StockTransferIndent/CancellationIssue/Modals/IssueVehicleModal';
import customRender from '@utils/test-utils';

describe("IssueVehicleDetailsModal component", ()=>{

    it("Close Button", ()=>{
        customRender(<IssueVehicleDetailsModal isVisible={true}/>);

        const closeBtn = screen.getByRole('button', {name:'Close'});
        fireEvent.click(closeBtn);
    });

    it("search Button", ()=>{
        customRender(<IssueVehicleDetailsModal isVisible={true}/>);

        const searchBtn = screen.getByRole('button', {name:'search'});
        fireEvent.click(searchBtn);
    });

    it("Cancel Button", ()=>{
        customRender(<IssueVehicleDetailsModal isVisible={true}/>);

        const cancelBtn = screen.getByRole('button', {name:'Cancel'});
        fireEvent.click(cancelBtn);
    });

    it("Submit Button", ()=>{
        customRender(<IssueVehicleDetailsModal isVisible={true}/>);

        const submitBtn = screen.getByRole('button', {name:'Submit'});
        fireEvent.click(submitBtn);
    });
})