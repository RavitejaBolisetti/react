/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ViewIssueCard } from '@components/Sales/StockTransferIndent/IssueIndent/ViewDetails/ViewIssueCard';
import customRender from '@utils/test-utils';

describe("ViewIssueCard component", ()=>{
    const defaultVisibility = {
        canCancel: true,
        canReturn: false,
        canReceive: false,
        canPrint: true,
        canAdd: true,
    };
    
    it("render", ()=>{
        customRender(<ViewIssueCard  isVisible={true} formData={[{issueNumber:'1'}]} typeData={['PARAM_MASTER']} handleBtnVisibility={jest.fn()} defaultVisibility={defaultVisibility}/>);
    });
})