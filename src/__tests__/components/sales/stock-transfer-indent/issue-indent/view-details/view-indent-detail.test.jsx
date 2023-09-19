/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import { ViewIndentDetail } from '@components/Sales/StockTransferIndent/IssueIndent/ViewDetails/ViewIndentDetail';
import customRender from '@utils/test-utils';


describe("ViewDetail component", ()=>{

    it("render", ()=>{
        const typeData = [{PARAM_MASTER:{INDNT_RAS:{id: 'INDNT_RAS'}}}];
        const formData = {indentStatus:'INDNT_RAS'};

        customRender(<ViewIndentDetail  isVisible={true} typeData={typeData} formData={formData} />);
    });
})