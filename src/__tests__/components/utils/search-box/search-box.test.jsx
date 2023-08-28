/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import SearchBox from "@components/utils/SearchBox/SearchBox";


describe("SearchBox components",() => {
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
    it("should render SearchBox components UI", ()=> {
        customRender(<SearchBox {...tableProps} />);
    })
});
