/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useReducer } from 'react';
import { Form } from 'antd';

import CardDocumentType from './CardDocumentType';
import DocumentTypesForm from './DocumentTypesForm';

const segmentData = [
    {
        key: 'segment 1',
        value: 'segment ',
    },
    {
        key: 'segment 2',
        value: 'segment 2',
    },
    {
        key: 'segment 3',
        value: 'segment 3',
    },
];
const modalData = [
    {
        key:'Modal 1',
        value: 'Modal 1',
    },
    {
        key: 'Modal 1',
        value: 'Modal 1',
    },
    {
        key: 'Modal 1',
        value: 'Modal 1',
    },
];
const modalGroupData = [
    {
        key: 'Modal Group 1',
        value: 'Modal Group 1',
    },
    {
        key: 'Modal Group 2',
        value: 'Modal Group 2',
    },
    {
        key: 'Modal Group 3',
        value: 'Modal Group 3',
    },
];

const DocumentTypes = ({ setCanFormSave, setIsBtnDisabled, isBtnDisabled, setFinalFormdata, finalFormdata }) => {
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [docForm] = Form.useForm();

    const onDocumentFormFinish = (val) => {
        console.log('🚀 ~ file: DocumentTypes.js:17 ~ onDocumentFormFinish ~ val:', val);
        setFinalFormdata((prev) => [...prev, { ...val }]);
        docForm.resetFields();
        forceUpdate();
    };

    const onFieldsChange = () => {
        setCanFormSave(true);
    };

    console.log('finalFormdata', finalFormdata);

    const dataItems = {
        segmentData,
        modalData,
        modalGroupData,
    };


    return (
        <>
            <DocumentTypesForm {...dataItems} form={docForm} onFinish={onDocumentFormFinish} setIsBtnDisabled={setIsBtnDisabled} isBtnDisabled={isBtnDisabled} finalFormdata={finalFormdata} onFieldsChange={onFieldsChange} />
            {finalFormdata?.length > 0 &&
                finalFormdata?.map((action) => {
                    return <CardDocumentType {...dataItems} {...action} form={docForm} onFinish={onDocumentFormFinish} finalFormdata={finalFormdata} setfinalFormdata={setFinalFormdata} forceUpdate={forceUpdate} setIsBtnDisabled={setIsBtnDisabled} isBtnDisabled={isBtnDisabled} onFieldsChange={onFieldsChange} />;
                })}
        </>
    );
};

export default DocumentTypes;
