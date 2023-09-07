/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import { AccountAndDocumentMappingMaster } from '@components/FinancialAccounting/AccountCategory/AccountAndDocumentMapping/AccountAndDocumentMappingMaster';
import customRender from '@utils/test-utils';
import { Form } from 'antd';

const FormWrapper = (props) =>{
    const [accDocMapForm] = Form.useForm();
    const myMoock = {
        ...accDocMapForm,
        validateFields:jest.fn(),
        getFieldsValue:jest.fn(),
        resetFields:jest.fn(),
    }
    return <AccountAndDocumentMappingMaster accDocMapForm={myMoock} {...props} />
}

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Render AccountAndDocumentMappingMaster component', () => {
    it('should render components', () => {
        customRender(<FormWrapper addDocAndMapp={jest.fn()} setAccountDocumentMaps={jest.fn()} setMainSelectedKey={jest.fn()} setButtonData={jest.fn()}/>);
    });

    it('accountDocumentMaps pass', ()=>{
        const accountDocumentMaps = [{applicationId:'123', applicationMenu:'12test', documentTypeCode:'A001'}];

        customRender(<AccountAndDocumentMappingMaster accountDocumentMaps={accountDocumentMaps}/>);
    })
});
