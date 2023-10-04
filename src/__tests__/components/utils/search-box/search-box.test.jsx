/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen, fireEvent, act } from '@testing-library/react';
import SearchBox from "components/utils/SearchBox/SearchBox";
import { Form } from 'antd';

const optionType= [{"id":"106","key":"chassisNumber","value":"chassisNumber"},
                    {"id":"106","key":"mobileNumber","value":"mobileNumber"},
                    {"id":"106","key":"registrationNumber","value":"registrationNumber"},
                    {"id":"106","key":"customerName","value":"customerName"},
                    {"id":"106","key":"Test","value":"Test"},
                    {"id":"106","key":"","value":""},
                    {"id":"106","key":"NMGR","value":"NMGR"},
                    {"id":"106","key":"OMGR","value":"OMGR"}];

const FormWrapper = (props) => {
    const [searchForm] = Form.useForm();

    const myFormMock={
        ...searchForm,
        validateFields: jest.fn().mockResolvedValue('Test'),
    }
    return <SearchBox searchForm={myFormMock} {...props} />
}

describe("SearchBox components",() => {

    it("should render SearchBox components UI", ()=> {
        customRender(<SearchBox />);
    })

    it("select parameter, and searchbox should work", async()=> {
        customRender(<FormWrapper optionType={optionType} defaultOption={'Test106'} />);
        act(() => {
            const parameter=screen.getByRole('combobox', { name: '' });
            fireEvent.change(parameter, { target: { value: 'chassisNumber' } });
            const chassisNumber=screen.getAllByText(/chassisNumber/i);
            fireEvent.click(chassisNumber[1]);
            fireEvent.change(parameter, { target: { value: 'mobileNumber' } });
            const mobileNumber=screen.getAllByText(/mobileNumber/i);
            fireEvent.click(mobileNumber[1]);
            fireEvent.change(parameter, { target: { value: 'registrationNumber' } });
            const registrationNumber=screen.getAllByText(/registrationNumber/i);
            fireEvent.click(registrationNumber[1]);
            fireEvent.change(parameter, { target: { value: 'customerName' } });
            const customerName=screen.getAllByText(/customerName/i);
            fireEvent.click(customerName[1]);
            fireEvent.change(parameter, { target: { value: 'NMGR' } });
            const NMGR=screen.getAllByText(/NMGR/i);
            fireEvent.click(NMGR[1]);
            fireEvent.change(parameter, { target: { value: 'OMGR' } });
            const OMGR=screen.getAllByText(/OMGR/i);
            fireEvent.click(OMGR[1]);
            fireEvent.change(parameter, { target: { value: 'Test' } });
            const test=screen.getAllByText(/Test/i);
            fireEvent.click(test[1]);
            fireEvent.change(parameter, { target: { value: '' } });
            const nullText=screen.getAllByText('');
            for(let i = 0; i < nullText.length; i++) {
                fireEvent.click(nullText[i]);
            }
            const searchBox=screen.getByRole('textbox', { name: '' });
            fireEvent.keyPress(searchBox, { key: "Enter", code: 13, charCode: 13 });
        });
    });
});
