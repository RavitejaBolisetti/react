/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { IssueIndentMaster } from '@components/Sales/StockTransferIndent/IssueIndent/IssueIndentMaster';
import customRender from '@utils/test-utils';

describe("IssueIndentMaster component", ()=>{

    it("Close Button", ()=>{
        customRender(<IssueIndentMaster isVisible={true} fetchIssueList={jest.fn()} resetIssueList={jest.fn()} typeData={['PARAM_MASTER']} />);

        const closeBtn = screen.getByRole('button', {name:'Close'});
        fireEvent.click(closeBtn);
    });

    // it("ViewIssueCard", ()=>{
    //     const defaultVisibility = {
    //         canCancel: true,
    //         canReturn: false,
    //         canReceive: false,
    //         canPrint: true,
    //         canAdd: true,
    //     };
    //     customRender(<IssueIndentMaster isVisible={true} fetchIssueList={jest.fn()} resetIssueList={jest.fn()} typeData={['PARAM_MASTER']} formData={[{issueNumber:'1'}]} handleRequest={jest.fn()} handleBtnVisibility={jest.fn()} toggleButton={jest.fn()} defaultVisibility={defaultVisibility}/>);
    // })

    // it("issueModalOpen",()=>{
    //     const vehicleVinData={
    //         vehicleSearch:[{grnDate:'15'}]
    //     }

    //     customRender(<IssueIndentMaster isVisible={true} fetchIssueList={jest.fn()} resetIssueList={jest.fn()} typeData={['PARAM_MASTER']} issueModalOpen={true} vehicleVinData={vehicleVinData}/>);
    // })
})