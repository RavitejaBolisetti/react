/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ViewIssueDetail } from '@components/Sales/StockTransferIndent/IssueIndent/ViewDetails/ViewIssueDetail';
import customRender from '@utils/test-utils';

describe("ViewIssueCard component", ()=>{
    const defaultVisibility = {
        canCancel: false,
        canReturn: true,
        canReceive: true,
        canPrint: false,
        canAdd: false,
    };
    
    it("receiveBtn", ()=>{
        customRender(<ViewIssueDetail  isVisible={true} formData={[{issueStatus:true}]} typeData={['PARAM_MASTER']} defaultVisibility={defaultVisibility} handleBtnVisibility={jest.fn()} />);

        // const receiveBtn = screen.getByRole('button', {name:'Receive'});
        // fireEvent.click(receiveBtn);
    });
})