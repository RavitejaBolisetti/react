/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useReducer, useState } from 'react';
import { Form } from 'antd';

import ViewDetailCard from './ViewDetailCard';
import DetailForm from './DetailForm';

const PartDetailsMaster = ({formActionType}) => {
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [docForm] = Form.useForm();

    const [canFormSave, setCanFormSave] = useState(false)
    const [isBtnDisabled, setIsBtnDisabled] = useState(false)
    const [formDataList,setformDataList] = useState([])
      

    const onDocumentFormFinish = () => {
        docForm.validateFields().then(val => {
            setformDataList((prev) => ([ ...prev, val] ));
            docForm.resetFields();
            forceUpdate();
        }).catch(err => console.error(err));
    };

    const onFieldsChange = () => {
        setCanFormSave(true);
    };

    return (
        <>
            <DetailForm form={docForm} onFinish={onDocumentFormFinish} setIsBtnDisabled={setIsBtnDisabled} isBtnDisabled={isBtnDisabled} formDataList={formDataList} onFieldsChange={onFieldsChange} />
            {formDataList?.length > 0 &&
                formDataList?.map((data) => {
                    return <ViewDetailCard formData={data} form={docForm} onFinish={onDocumentFormFinish} formDataList={formDataList} setformDataList={setformDataList} forceUpdate={forceUpdate} setIsBtnDisabled={setIsBtnDisabled} isBtnDisabled={isBtnDisabled} onFieldsChange={onFieldsChange} />;
                })}
        </>
    );
};

export default PartDetailsMaster;
