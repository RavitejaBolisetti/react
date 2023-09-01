/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import customRender from "@utils/test-utils";
import '@testing-library/jest-dom/extend-expect';
import { CustomerChangeHistory } from '@components/common/CustomerMaster/CustomerChangeHistory/CustomerChangeHistory';

afterEach(() => {
    jest.restoreAllMocks();
});

const props = {
    selectedCustomerId :'CUS1687508157461',
    fetchCustomerChangeHistory:jest.fn(),
    isVisible:true,
    tblPrepareColumns:jest.fn()
};

describe("Render CustomerChangeHistory component", ()=>{
    it('render component', ()=>{
        customRender(<CustomerChangeHistory {...props} setIsLoading={jest.fn()} />)
    })
})


