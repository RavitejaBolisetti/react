import React from "react";
import { screen, fireEvent, render } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';

import { AddEditForm } from "@components/Sales/OTF/ExchangeVehicles/AddEditForm"
import { Form } from 'antd';
import { act } from 'react-dom/test-utils';

const FormWrapper = (props) => {
    const [form]=Form.useForm();
    const mockForm = {
        ...form,
        setFieldsValue: jest.fn(),
        resetFields: jest.fn(),
        validateFields:jest.fn(),
    };
    return <AddEditForm form={mockForm} {...props} />
}

const props = {
    isFinanceLovLoading: false,
    isMakeLoading:false,
    isVisible:true,
    isCustomerLoading:false,
    isModelLoading: false,
    onSearch:jest.fn(),
    onHandleChange:jest.fn(),
    handleFilterChange:jest.fn(),
    typeData:['REL_TYPE'],
    isConfigLoading:true,
    isSchemeLovLoading:false,
    isSchemeLovLoading: false,
    isVariantLoading:false,
    showGlobalNotification:jest.fn(),
    formData:[{
        customerExpectedPrice: "12313123",
        customerId: "CUS1687411157049",
        customerName: "Randhir Kumar",
        hypothicatedTo: "ICICI",
        hypothicatedToCode: "FI003",
        id: "27cf9b5e-ef3d-4052-969a-b2a3b39b6a2e",
        kilometer: "123123123",
        make: "Mahindra",
        modelGroup: "Thar",
        monthOfRegistration: "JANUARY",
        monthOfRegistrationCode: "JAN",
        oldChessisNumber: "123123123",
        oldRegistrationNumber: "123123123",
        otfNumber: "OTF24A000691",
        procurementPrice: "123123123",
        relationship: "Brother",
        relationshipCode: "BRO",
        schemeAmount: "1.23",
        schemeCode: "f7a2854e-3d30-4489-8a49-dd1ec0ebf538",
        schemeName: "f7a2854e-3d30-4489-8a49-dd1ec0ebf538",
        usage: "Commercial",
        usageCode: "C",
        variant: "Thar4x4",
        yearOfRegistration: null,
        yearOfRegistrationCode: "2023",
    }],
    filteredModelData:[
        {
            key: "Thar",
            parentKey: "Mahindra",
            value: "Thar"
        }
    ],
    filteredVariantData:[
        {
            key: "Thar",
            parentKey:"Thar2",
            value:"Thar"
        }
    ],
    financeLovData:[
        {
            key:"FI002",
            parentKey:null,
            value:"HDFC"
        }
    ],
    makeData:[
        {
            key: "Maruti",
            parentKey: null,
            value: "Maruti"
        }
    ],
    schemeLovData:[
        {
            key:"9fb8470b-8f50-4587-a3d1-09f1a027a98c",
            parentKey:null,
            value:"Name"
        }
    ],
}

describe("AddEditForm component render", ()=>{
    it("All Fields Render for OTF-Edit File", async()=>{
        render(<FormWrapper  {...props} />)

        const custId = screen.getByRole('textbox', { name: 'Customer ID', exact: false });
        fireEvent.change(custId, { target: { value: 'custIdTest'}});

        const custName = screen.getByRole('textbox', { name: 'Customer Name', exact: false });
        fireEvent.change(custName, { target: { value: 'custNameTest'}});

        const oldRegNumber = screen.getByRole('textbox', { name: 'Old Reg Number', exact: false });
        fireEvent.change(oldRegNumber, { target: { value: 'oldRegNumberTest'}});

        const oldChasisNumber = screen.getByRole('textbox', { name: 'Old Chassis Number', exact: false });
        fireEvent.change(oldChasisNumber, { target: { value: 'oldChasisNumberTest'}});

        const schemeAmount = screen.getByRole('textbox', { name: 'Scheme Amount', exact: false });
        fireEvent.change(schemeAmount, { target: { value: 'schemeAmountTest'}});
        
        const km = screen.getByRole('textbox', { name: 'KM', exact: false });
        fireEvent.change(km, { target: { value: 'kmTest'}});

        const customerExpectedPrice = screen.getByRole('textbox', { name: 'Customer Expected Price', exact: false });
        fireEvent.change(customerExpectedPrice, { target: { value: 'customerExpectedPriceTest'}});
        
        const procurementPrice = screen.getByRole('textbox', { name: 'Procurement Price', exact: false });
        fireEvent.change(procurementPrice, { target: { value: 'procurementPriceTest'}});
    })
})