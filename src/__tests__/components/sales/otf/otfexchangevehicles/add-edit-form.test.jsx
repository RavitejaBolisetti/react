import React from "react";
import { screen, fireEvent, render } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';

import { AddEditForm } from "@components/Sales/OTF/ExchangeVehicles/AddEditForm"
import { Form } from 'antd';

const FormWrapper = (props) => {
    const [form]=Form.useForm();
    return <AddEditForm onUpdate={jest.fn()} form={form} {...props} />
}

const extraProps = {
    onFinishFailed:jest.fn(),
    onFinish:jest.fn(),
    schemeLovData:[
        {
            key:"9fb8470b-8f50-4587-a3d1-09f1a027a98c",
            parentKey:null,
            value:"Name"
        }
    ],
    isFinanceLovLoading:false,
    financeLovData:[
        {
            key:"FI002",
            parentKey:null,
            value:"HDFC"
        }
    ],
    isMakeLoading:false,
    makeData:[{ label: 'value', value: 'key' }],
    isModelLoading:true,
    modelData:[
        {
            key:"Swift",
            parentKey:"Maruti",
            value:"Swift"
        }
    ],
    isVariantLoading:false,
    variantData:[
        {
            key:"Swift dezire",
            parentKey:"swift",
            value:"Swift dezire"
        }
    ],
    isLoading:false,
    filteredModelData:[{
        key:"Swift",
        parentKey:"Maruti",
        value:"Swift"
    }],
    filteredVariantData:[
        {
            key: "Thar",
            parentKey:"Thar2",
            value:"Thar"
        }
    ]
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
        render(<FormWrapper setfinalFormdata={setfinalFormdata} {...props} {...extraProps} viewMode={viewMode}/>)

        const searchBtn = screen.getByRole('button', { name: 'search', exact: false });
        fireEvent.click(searchBtn)

        const modelGroup = screen.getByRole('combobox', { name: 'Model Group', exact: false });
        fireEvent.click(modelGroup)

        const searchImg = screen.getByRole('img', { name: 'search', exact: false });
        fireEvent.click(searchImg)

        const custId = screen.getByRole('textbox', { name: 'Customer ID', exact: false });
        fireEvent.click(custId)

        const custName = screen.getByRole('textbox', { name: 'Customer Name', exact: false });
        fireEvent.click(custName)

        const custReg = screen.getByRole('textbox', { name: 'Old Reg Number', exact: false });
        fireEvent.click(custReg)

        const custChesis = screen.getByRole('textbox', { name: 'Old Chessis Number', exact: false });
        fireEvent.click(custChesis)
        
        const make = screen.getByRole('combobox', { name: 'Make', exact: false });
        fireEvent.click(make)

        const variant = screen.getByRole('combobox', { name: 'Variant', exact: false });
        fireEvent.click(variant)

        const relationship = screen.getByRole('combobox', { name: 'Relationship', exact: false });
        fireEvent.click(relationship)

        const yearofRegistration = screen.getByRole('combobox', { name: 'Year of Registration', exact: false });
        fireEvent.click(yearofRegistration)

        const schemeName = screen.getByRole('combobox', { name: 'Scheme Name', exact: false });
        fireEvent.click(schemeName)

        const hypothecatedTo = screen.getByRole('combobox', { name: 'Hypothecated To', exact: false });
        fireEvent.click(hypothecatedTo)
    })
})