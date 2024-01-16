/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useReducer } from 'react';
import { Form } from 'antd';

import CardDocumentDetails from './CardDocumentDetails';
import DocumentDetailsForm from './DocumentDetailsForm';

const DocumentDetails = ({ setCanFormSave, setIsBtnDisabled, isBtnDisabled, setFinalFormdata, finalFormdata }) => {
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [docForm] = Form.useForm();

    const onDocumentFormFinish = (val) => {
        docForm.validateFields().then((data) => {
        console.log("🚀 ~ file: DocumentDetails.js:18 ~ docForm.validateFields ~ ̥:", data)
        setFinalFormdata((prev) => ([data, ...prev]));
        // docForm.resetFields();
        forceUpdate();
        }).catch(err => console.error(err))

    }
    const onFieldsChange = () => {
        setCanFormSave(true);
    };

    return (
        <>
            <DocumentDetailsForm form={docForm} onFinish={onDocumentFormFinish} setIsBtnDisabled={setIsBtnDisabled} isBtnDisabled={isBtnDisabled} finalFormdata={finalFormdata} onFieldsChange={onFieldsChange} />
            {finalFormdata?.length > 0 &&
                finalFormdata?.map((action) => {
                    return <CardDocumentDetails {...action} form={docForm} onFinish={onDocumentFormFinish} finalFormdata={finalFormdata} setfinalFormdata={setFinalFormdata} forceUpdate={forceUpdate} setIsBtnDisabled={setIsBtnDisabled} isBtnDisabled={isBtnDisabled} onFieldsChange={onFieldsChange} />;
                })}
        </>
    );
};

export default DocumentDetails;
