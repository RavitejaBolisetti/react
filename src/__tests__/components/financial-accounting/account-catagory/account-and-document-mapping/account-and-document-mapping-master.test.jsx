/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen } from '@testing-library/react';
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

    const accountDocumentMaps = [{
        internalId:'123', accountDocumentMapId:'45', applicationId:'23',applicationMenu:'op', documentTypeCode:'xy00',documentDescription:'desc', financialAccountHeadCode:'ac00', financialAccountHead:'fgh', selectedTreeSelectKey:'ac', applicationName:'tst'
    }]

    it('pass formProductAttributeProps and formEdit = false', () => {
        customRender(<AccountAndDocumentMappingMaster isVisible={true} formEdit={false}  />);
    });

    it('pass formProductAttributeProps and formEdit = true', () => {
        customRender(<AccountAndDocumentMappingMaster isVisible={true} formEdit={true} />);
    });

    it('should render docTypeHeadMappingList', () => {
        customRender(<FormWrapper accountDocumentMaps={accountDocumentMaps} />);
    });
    
});
