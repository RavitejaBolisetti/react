/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import customRender from '@utils/test-utils';
import { GSTIRNMainConatiner } from "components/FinancialAccounting/GSTIRNAuthentication/GSTIRNMainConatiner";

afterEach(() => {
    jest.restoreAllMocks();
});

describe("GSTIRNMainConatiner components", ()=>{
    it("render", ()=>{
        customRender(<GSTIRNMainConatiner isVisible={true} />);
    });

})