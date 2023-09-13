/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import customRender from "@utils/test-utils";
import { AddEditForm } from "@components/Sales/Common/ExchangeVehicles/AddEditForm"
import { Form } from 'antd';

afterEach(() => {
    jest.restoreAllMocks();
}); 

const FormWrapper = (props) => {
    const [form]=Form.useForm();
    const mockForm = {
        ...form,
        setFieldsValue: jest.fn(),
        getFieldValue:jest.fn()
    };
    return <AddEditForm form={mockForm} {...props} />
}

describe("AddEditForm component render", ()=>{
    const props = {
        formActionType:{ addMode: false, editMode: true, viewMode: false },
        formData:[{exchange: 1}],
        fnSetData:jest.fn()
    }

    it("switch Exchange", async()=>{
        customRender( <FormWrapper {...props} /> );
        
        const exchangeSwitch = screen.getByRole('switch', {name:'Exchange'});
        fireEvent.click(exchangeSwitch)
    })
})