/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useReducer } from 'react';
import { Form } from 'antd';

import CardDocumentType from './CardDocumentType';
import DocumentTypesForm from './DocumentTypesForm';

const DocumentTypes = ({ setCanFormSave, setIsBtnDisabled, isBtnDisabled, onFinish = () => {}, onFinishFailed = () => {}, isReadOnly = false, setFormBtnDisable, setFinalFormdata, finalFormdata }) => {
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [docForm] = Form.useForm();

    const onDocumentFormFinish = (val) => {
        setFinalFormdata((prev) => ({ ...prev, documentType: [...finalFormdata.documentType, val] }));
        docForm.resetFields();
        forceUpdate();
    };

    const onFieldsChange = () => {
        setCanFormSave(true);
    };

    return (
        <>
            <DocumentTypesForm form={docForm} onFinish={onDocumentFormFinish} setIsBtnDisabled={setIsBtnDisabled} isBtnDisabled={isBtnDisabled} finalFormdata={finalFormdata} onFieldsChange={onFieldsChange} />
            {finalFormdata?.documentType?.length > 0 &&
                finalFormdata?.documentType.map((action) => {
                    return <CardDocumentType {...action} form={docForm} onFinish={onDocumentFormFinish} finalFormdata={finalFormdata} setfinalFormdata={setFinalFormdata} forceUpdate={forceUpdate} setIsBtnDisabled={setIsBtnDisabled} isBtnDisabled={isBtnDisabled} onFieldsChange={onFieldsChange} />;
                })}
        </>
    );
};

export default DocumentTypes;
