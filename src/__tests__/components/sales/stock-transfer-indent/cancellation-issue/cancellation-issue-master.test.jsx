/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { CancellationIssue } from '@components/Sales/StockTransferIndent/CancellationIssue/CancellationIssueMaster';
import customRender from '@utils/test-utils';

describe("CancellationIssue component", ()=>{

    it("Close Button", ()=>{
        customRender(<CancellationIssue isVisible={true} fetchIssueList={jest.fn()} resetIssueList={jest.fn()} />);

        const closeBtn = screen.getByRole('button', {name:'Close'});
        fireEvent.click(closeBtn);
    });
})