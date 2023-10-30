/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import { StockIndentStatusTag } from 'components/Sales/StockTransferIndent/utils/StockIndentStatusTag';

describe("StockIndentStatusTag component", ()=>{

    it("Open", ()=>{
        const props = {
            status:"Open",
            toggleButton: 'INDNT_RAISED',
        };

        StockIndentStatusTag(props);
    });

    it("Received", ()=>{
        const props = {
            status:"Received"
        };

        StockIndentStatusTag(props);
    });

});