/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor } from "@testing-library/react";
import customRender from '@utils/test-utils';
import { CustomerListModal } from "@components/utils/CustomerListModal/CustomerListModal";
import { CustomerListMaster } from "@components/utils/CustomerListModal/CustomerListMaster";


describe("CustomerListModal components",() => {
    const tableProps = {
        srl: false,
        rowKey: 'registrationNumber',
        rowSelection: {
            type: 'radio',
        },
        pagination: false,
        isLoading: false,
        selectedRows:[],
        formBtnActive:true,
        setFormBtnActive:jest.fn(),
        setSelectedRows:jest.fn(),
    }
    it("should render CustomerListModal components UI", ()=> {
        const document = customRender(<CustomerListModal {...tableProps} />);
    })
});
describe("CustomerListMaster components",() => {
    it("should render CustomerListMaster components UI", ()=> {
        const document = customRender(<CustomerListMaster />);
    })
});