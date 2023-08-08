/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor } from "@testing-library/react";
import customRender from '@utils/test-utils';
import { tableColumn } from "@components/Sales/OTF/tableColumn";


describe('OTF tableColumn component render', () => {

    it("should render OTF tableColumn component ",async ()=>{

        customRender(<tableColumn />);
    });

});
