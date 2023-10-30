/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AccountAndDocumentMappingMaster } from '@components/FinancialAccounting/AccountCategory/AccountAndDocumentMapping/AccountAndDocumentMappingMaster';
import customRender from '@utils/test-utils';
import { Form } from 'antd';
import React from 'react';

const FormWrapper = (props) =>{
    const [accDocMapForm] = Form.useForm();
    const myMoock = {
        ...accDocMapForm,
        validateFields:jest.fn().mockResolvedValue([{applicationId: 'Finac', applicationName: 'Financial Accounting', internalId:'87376006', accountDocumentMapId: '' , financialAccountHead:'FC00', documentDescription:'test', financialAccountHeadCode:'FC00', documentTypeCode:'test' }]),
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

    it('formEdit = false', () => {
        const financialAccountData = [{key : 'FC00'}];
        const documentDescriptionData = [{key : 'test'}];

        const setAccountDocumentMaps = jest.fn();

        render(<FormWrapper isVisible={true} formEdit={false} setAccountDocumentMaps={setAccountDocumentMaps} setButtonData={jest.fn()} financialAccountData={financialAccountData} documentDescriptionData={documentDescriptionData} />);

        const addBtn = screen.getByRole('button', {name:'Add'});
        fireEvent.click(addBtn);
    });

    it('formEdit = true', () => {
        customRender(<AccountAndDocumentMappingMaster isVisible={true} formEdit={true} />);
    });

    it('should render docTypeHeadMappingList', () => {
        customRender(<FormWrapper accountDocumentMaps={accountDocumentMaps} />);
    });
    
});
