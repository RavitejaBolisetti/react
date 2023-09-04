/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import { screen, fireEvent } from "@testing-library/react";
import customRender from '@utils/test-utils';
import AddEditForm from 'components/Sales/VehicleDetail/Contacts/AddEditForm';
import { Form } from 'antd';

const FormWrapper = (props) => {
    const [contactform] = Form.useForm()

    const myMock = {
        ...contactform,
        validateFields:jest.fn(),
        resetFields:jest.fn()
    };
    return <AddEditForm contactform={myMock} {...props} />
}

describe('AddEditForm Component Should Render', ()=>{
    it('render', ()=>{
        const props = {
            typeData:['VH_CONTACT_TYPE'],
            onSaveFormData:jest.fn(),
            setIsAdding:jest.fn(),
            setIsEditing:jest.fn(),
            setShowAddEditForm:jest.fn(),
            handleCancelFormEdit:jest.fn(),

        }
        customRender(<FormWrapper {...props} />);

        const saveBtn = screen.getByRole('button', {name:'Save'});
        fireEvent.click(saveBtn);

        const cancelBtn = screen.getByRole('button', {name:'Cancel'});
        fireEvent.click(cancelBtn);
    })
})