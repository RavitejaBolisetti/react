import React from "react";
import { screen, fireEvent, render } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';

import { AddEditForm } from "@components/Sales/OTF/ExchangeVehicles/AddEditForm"
import { Form } from 'antd';

const FormWrapper = (props) => {
    const [form]=Form.useForm();
    return <AddEditForm onUpdate={jest.fn()} form={form} {...props} />
}

const props = {
    isVisible:true,
    isCustomerLoading:false,
    onSearch:jest.fn(),
    onHandleChange:jest.fn(),
    handleFilterChange:jest.fn(),
    typeData:['REL_TYPE'],
    isConfigLoading:true,
    isSchemeLovLoading:false,
    formData:[],
    form:{
        setFieldsValue:jest.fn()
    },
}
const viewMode = false;

describe("AddEditForm component render", ()=>{
    it("should component render", ()=>{
        const setfinalFormdata=jest.fn();
        jest.spyOn(React, 'useState').mockReturnValue([null,setfinalFormdata]);
        render(<FormWrapper setfinalFormdata={setfinalFormdata} {...props} />)

        const searchBtn = screen.getByRole('button', { name: 'search', exact: false });
        fireEvent.change(searchBtn)
    })
    it("should render Customer ID input", ()=>{
        render(<AddEditForm {...props} />)
        const custId = screen.getByRole('textbox', { name: 'Customer ID', exact: false });
        fireEvent.change(custId)
    })
})