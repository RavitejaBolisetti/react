/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import { screen, fireEvent } from "@testing-library/react";
import customRender from '@utils/test-utils';
import  ViewList   from 'components/Sales/VehicleDetail/Contacts/ViewList';
import { Form } from 'antd';

const FormWrapper = (props) => {
    const [contactform] = Form.useForm();
    const [timingForm] = Form.useForm();

    const myMock = {
        ...contactform,
        ...timingForm,
        setFieldsValue:jest.fn(),
        resetFields:jest.fn(),
    };
    return <ViewList contactform={myMock} {...props} />
}

describe('ViewList Component Should Render',()=>{
    it('should render buttons and table text', ()=>{
        const props = {
            contactData:[{contactTypeName: "User", name: "user"}],
            styles:{},
            typeData:['VH_CONTACT_TYPE'],
            buttonData:{
                editBtn: true
            }
        }

        customRender(<FormWrapper 
            {...props} 
            handleCollapse={jest.fn()} 
            handleButtonClick={jest.fn()} 
            editContactHandeler={jest.fn()} 
            setIsEditing={jest.fn()} 
            setEditingData={jest.fn()}
            onTimingFormFinish={jest.fn()} 
            setTimeData={jest.fn()} 
            setAllowedTimingSave={jest.fn()} 
            forceUpdate={jest.fn()} 
        />);

        const plusArrow = screen.getByRole('img', {name:'plus'});
        fireEvent.click(plusArrow);

        const editBtn = screen.getByRole('button', {name:'Edit'});
        fireEvent.click(editBtn);

        const editBtnIcon = screen.getByRole('button', {name:'Edit'});
        fireEvent.click(editBtnIcon);
    })

    it('name key is not there in contactData', ()=>{
        const props = {
            contactData:[{contactTypeName: "User"}],
            styles:{},
            typeData:['VH_CONTACT_TYPE'],
        }

        customRender(<FormWrapper {...props} handleCollapse={jest.fn(0)} isEditing={true} />);
        
        const plusArrow = screen.getByRole('img', {name:'plus'});
        fireEvent.click(plusArrow);

    })

})