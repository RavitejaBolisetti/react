/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { CancelConfirmModal } from '@components/Sales/StockTransferIndent/IssueIndent/Modals/CancelConfirmModal';
import customRender from '@utils/test-utils';

describe("CancelConfirmModal component", ()=>{

    it("Close Button", ()=>{
        customRender(<CancelConfirmModal isVisible={true}/>);

        const closeBtn = screen.getByRole('button', {name:'Close'});
        fireEvent.click(closeBtn);
    });

    it("No Button", ()=>{
        customRender(<CancelConfirmModal isVisible={true} modalButtonName={'No'} onCloseAction={jest.fn()} />);

        const noBtn = screen.getByRole('button', {name:'No'});
        fireEvent.click(noBtn);
    });

    it("Yes Button", ()=>{
        customRender(<CancelConfirmModal isVisible={true} modalButtonName={'Yes'} handdleYes={jest.fn()} />);

        const yesBtn = screen.getByRole('button', {name:'Yes'});
        fireEvent.click(yesBtn);
    });
 
})