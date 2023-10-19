/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen } from "@testing-library/react";
import customRender from '@utils/test-utils';
import { GSTIRNMainConatiner } from "components/FinancialAccounting/GSTIRNAuthentication/GSTIRNMainConatiner";

afterEach(() => {
    jest.restoreAllMocks();
});

describe("GSTIRNMainConatiner components", ()=>{
    it("closeBtn", ()=>{
        customRender(<GSTIRNMainConatiner isVisible={true} />);

        const closeBtn = screen.getByRole('button', {name:'Close'});
        fireEvent.click(closeBtn);
    });

    it("cancelBtn", ()=>{
        customRender(<GSTIRNMainConatiner isVisible={true} />);

        const cancelBtn = screen.getByRole('button', {name:'Cancel'});
        fireEvent.click(cancelBtn);
    });

    it("nextBtn", ()=>{
        customRender(<GSTIRNMainConatiner isVisible={true} handleButtonClick={jest.fn()}/>);

        const nextBtn = screen.getByRole('button', {name:'Next'});
        fireEvent.click(nextBtn);
    });

})