import React from "react";
import { screen, fireEvent, render } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import { ExchangeVehiclesMaster } from "@components/Sales/OTF/ExchangeVehicles/ExchangeVehiclesMaster"
// import { ViewDetail } from "@components/Sales/OTF/ExchangeVehicles/ViewDetail"
// import { AddEditForm } from "@components/Sales/OTF/ExchangeVehicles/AddEditForm"

import customRender from "@utils/test-utils";
import { Provider } from 'react-redux';
import createMockStore from '__mocks__/store';

const props = {
    formData:[],
    userId:'123',
    isCustomerLoading:true,
    isDataCustomerLoaded:true,
    isDataLoaded:true,
    isFinanceLovDataLoaded:true,
    isFinanceLovLoading:true, // for
    isLastSection:true,
    isLoading:true,
    isMakeDataLoaded:true,
    isMakeLoading:true, // make
    isModelDataLoaded:true,
    isModelLoading:true,    //for modelgroup
    isSchemeLovDataLoaded:true,
    isSchemeLovLoading:true, // for
    isVariantDataLoaded:true,
    isVariantLoading:true, // variant
    isVisible:true,
    listCustomerShowLoading:true,
    isConfigLoading:true, // for relation
    typeData:['REL_TYPE'], // later do typeData
    yearsList:[],
    loading:true
}

const selectedOrderId='1234'
const extraParams = [
    {
        key: 'otfNumber',
        title: 'otfNumber',
        value: selectedOrderId,
        name: 'OTF Number',
    },
];

const funcMocks={
    handleFormValueChange:jest.fn(),
    setFormData:jest.fn(),
    makeExtraParams:jest.fn(),
    setFieldsValue:jest.fn(),
    onFinish:jest.fn(),
    handleButtonClick:jest.fn(),
    saveData:jest.fn(),
    onFinishFailed:jest.fn(),
    onSearch:jest.fn(),
    onSuccessAction:jest.fn(),
    onErrorAction:jest.fn(),
}

const modelData = [
    {
        key:"Swift",
        parentKey:"Maruti",
        value:"Swift"
    }
]

const variantData = [
    {
        key:"Swift dezire",
        parentKey:"swift",
        value:"Swift dezire"
    }
]

const filteredVariantData = [
    {
        key: "Thar",
        parentKey:"Thar2",
        value:"Thar"
    }
]

const schemeLovData = [
    {
        key:"9fb8470b-8f50-4587-a3d1-09f1a027a98c",
        parentKey:null,
        value:"Name"
    }
]

const financeLovData = [
    {
        key:"FI002",
        parentKey:null,
        value:"HDFC"
    }
]

const filteredModelData = [{
    key:"Swift",
    parentKey:"Maruti",
    value:"Swift"
}]

const defaultExtraParam = [
    {
        key: 'customerType',
        title: 'Customer Type',
        value: 'IND',
        canRemove: true,
    }
]

const mockStore = createMockStore({
    auth: { userId: 123 },
    data:{
        OTF:{
            ExchangeVehicle:{isDataLoaded:true, isLoading:true, exchangeData:[{make:'test', modelGroup:'test1'}]},
            FinanceLov:{isFinanceLovDataLoaded:true, isLoading:true, financeLovData :[{ label: 'value', value: 'key' }]},
            SchemeDetail:{isSchemeLovDataLoaded:true, isLoading:true, schemeLovData:[{ label: 'value', value: 'key' }]}
        },
        ConfigurableParameterEditing: { typeData:[] },
        Vehicle: {
            MakeVehicleDetails: { isMakeDataLoaded:true, isLoading:true, makeData:[{ label: 'value', value: 'key' }] },
            ModelVehicleDetails: { isModelDataLoaded:true, isLoading:true, modelData:[{ label: 'value', value: 'key' }] },
            VariantVehicleDetails: { isVariantDataLoaded:true, isLoading:true, variantData:[{ label: 'value', value: 'key' }] },
        },
    },
    customer: {
        customerDetail: { isDataCustomerLoaded:true, isCustomerLoading:true, customerDetail:[] },
    }
});

const viewMode = true;

describe("ExchangeVehiclesMaster component render",()=>{
    it("should component render", ()=>{
       const { getByRole } = customRender(
            <Provider store={mockStore}>
              <ExchangeVehiclesMaster {...props}
              styles={{}} 
              extraParams={extraParams}
              {...funcMocks} 
              selectedOrderId={selectedOrderId} 
              defaultExtraParam={defaultExtraParam} 
              mdelData={modelData} 
              variantData={variantData}
              handleFilterChange={jest.fn()}
              filteredModelData={filteredModelData}
              onHandleChange={jest.fn()}
              schemeLovData={schemeLovData}
              financeLovData={financeLovData}
              />
            </Provider>
        );

        const modelGroup = screen.getByRole('combobox', { name: 'Model Group', exact: false });
        fireEvent.click(modelGroup)

        const searchBtn = screen.getByRole('img', { name: 'search', exact: false });
        fireEvent.click(searchBtn)

        const custId = screen.getByRole('textbox', { name: 'Customer ID', exact: false });
        fireEvent.click(custId)

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