/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AddEditForm } from '@components/FinancialAccounting/AccountTaxCharges/DocumentTypeOtherCharges/AddEditForm';
import customRender from '@utils/test-utils';
import { Form } from 'antd';

afterEach(() => {
    jest.restoreAllMocks();
});

const FormWrapper = (props) =>{
    const [form] = Form.useForm();
    const myMock = {
        ...form,
        setFieldsValue:jest.fn()
    }

    return <AddEditForm form={myMock} {...props} />
}


describe('Render components', () => {
    it('should render viewMode=true', () => {
        customRender(<FormWrapper isVisible={true} viewMode={true} formActionType={{}}/>);
        
        const closeBtn = screen.getByRole('button', {name:'Close'});
        fireEvent.click(closeBtn)
    })

    it('should render viewMode=false', () => {
        customRender(<FormWrapper isVisible={true} viewMode={false} formActionType={{}}/>);
        
        const closeBtn = screen.getByRole('button', {name:'Close'});
        fireEvent.click(closeBtn)
    })
})

