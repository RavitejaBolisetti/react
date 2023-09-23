/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AdvancedSearch } from '@components/Sales/StockTransferIndent/AdvancedSearch';
import customRender from '@utils/test-utils';
import { Form } from 'antd';

const FornWrapper = (props) => {
    const [advanceFilterForm] = Form.useForm();

    const myMock = {
        ...advanceFilterForm,
        resetFields:jest.fn(),
        getFieldValue:jest.fn()
    }
    return <AdvancedSearch advanceFilterForm={myMock} {...props} />
}


describe("AdvancedSearch",()=>{
    it("calendar img", ()=>{
        customRender(<FornWrapper isVisible={true} CheckDateEffectiveTo={jest.fn()} />);
        
        const calenderImg = screen.getAllByRole('img', {name:'calendar'});
        fireEvent.click(calenderImg[0]);
    })

    it("calendar img1", ()=>{
        customRender(<FornWrapper isVisible={true} CheckDateEffectiveTo={jest.fn()} />);
        
        const calenderImg = screen.getAllByRole('img', {name:'calendar'});
        fireEvent.click(calenderImg[1]);
    })

    it("Indent", ()=>{
        customRender(<FornWrapper isVisible={true} indentSaerchList={jest.fn()} />);
        
        const indent = screen.getByRole('combobox', {name:'Indent'})
        fireEvent.change(indent, {target:{value:'test'}});
    })
})