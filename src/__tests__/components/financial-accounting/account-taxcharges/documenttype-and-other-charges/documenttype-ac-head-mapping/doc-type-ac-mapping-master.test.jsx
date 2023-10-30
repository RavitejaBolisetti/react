/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { DocTypeAcMappingMaster } from '@components/FinancialAccounting/AccountTaxCharges/DocumentTypeOtherCharges/DocTypeAcHeadMapping/DocTypeAcMappingMaster';
import customRender from '@utils/test-utils';
import { Form } from 'antd';

afterEach(() => {
    jest.restoreAllMocks();
});

const FormWrapper = (props) =>{
    const [docTypeHeadMappingForm] = Form.useForm();
    const myMock = {
        ...docTypeHeadMappingForm,
        validateFields:jest.fn()
    }

    return <DocTypeAcMappingMaster docTypeHeadMappingForm={myMock} {...props} />
}

describe('Render components', () => {
    const props = {
        formActionType: {addMode: false, editMode: true, viewMode: false},
        isVisible: true,
        viewMode: false,
        disableSaveButton: false,
        buttonData: {cancelBtn: true, formBtnActive: false, editBtn: false, saveBtn: true, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false,},
        financialAccountData:[{id: '123', key: 'UDAII', value: 'UDAII', parentKey: null}],
        handleSelectTreeClick:jest.fn()
    }

    it('docTypeLedger', ()=>{
        const docTypeLedger = {
            applicationName: "Financial Accounting", documentType: null, documentTypeCode: "REC", documentTypeId: "698", documentTypeName: "Receipts(Finance)",
            accountLedgerMappingDtoList:[{
                chargeCode: "CCRD",chargeCodeDesc: "Credit Card", financialAccountHeadCode: null, financialAccountHeadDesc: "BIMALJEET", financialAccountHeadId: "143", id: "563"
            }]
        }
        customRender(<FormWrapper docTypeLedger={docTypeLedger} setDocTypeHeadMappingList={jest.fn()} />);
    })

    it('formEdit = false', () => {
        customRender(<FormWrapper mainFomEdit={false}  {...props} formEdit={false} />);
    });

    it('formEdit = true', () => {
        customRender(<FormWrapper mainFomEdit={false}  {...props} formEdit={true} />);
    });

    it('should render docTypeHeadMappingList', () => {
        const docTypeHeadMappingList = [{chargeCode:'123', internalId:'321', id:'34', financialAccountHeadId:'ac001', financialAccountHeadDesc:'34ac', chargeCodeDesc:'12test'}]
        
        customRender(<FormWrapper docTypeHeadMappingList={docTypeHeadMappingList}/>);
    });
});
