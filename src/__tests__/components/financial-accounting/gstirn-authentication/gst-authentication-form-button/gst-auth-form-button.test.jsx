/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import customRender from '@utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, screen } from "@testing-library/react";
import { GstAuthFormButton } from 'components/FinancialAccounting/GSTIRNAuthentication/GSTAuthenticationFormButton';

describe("GstAuthFormButton component", ()=>{
    it("button", ()=>{
        const buttonData = {
            closeBtn:true,
            nextBtn:true,
            saveBtn:true,
        };

        customRender(<GstAuthFormButton isVisible={true} buttonData={buttonData} nextBtn={true} setButtonData={jest.fn()} handleButtonClick={jest.fn()} />);

        const closeBtn = screen.getByRole('button', {name:'Close'});
        fireEvent.click(closeBtn);

        const cancelBtn = screen.getByRole('button', {name:'Cancel'});
        fireEvent.click(cancelBtn);

        const nextBtn = screen.getByRole('button', {name:'Next'});
        fireEvent.click(nextBtn);
    })
})