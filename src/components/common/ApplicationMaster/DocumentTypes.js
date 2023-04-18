import React, { Fragment, useReducer } from 'react';
import { Form, Card } from 'antd';

import CardDocumentType from './CardDocumentType';
import DocumentTypesForm from './DocumentTypesForm';
import { useEffect } from 'react';

const DocumentTypes = ({ setIsBtnDisabled,isBtnDisabled, onFinish = () => {}, onFinishFailed = () => {}, isReadOnly = false, setFormBtnDisable, setFinalFormdata, finalFormdata }) => {
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [docForm] = Form.useForm();

    const handleAdd = (value) => {
        docForm.resetFields();
    };

    const onDocumentFormFinish = (val) => {

        // if(finalFormdata?.documentType.findIndex(el => el?.documentTypeCode === val?.documentTypeCode ||  el?.documentTypeDescription === val?.documentTypeDescription ) !== -1){
        //     console.log('error duplicate found');
        //     return;
        // };
        setFinalFormdata((prev) => ({ ...prev, documentType: [...finalFormdata.documentType, val] }));
        docForm.resetFields();
        forceUpdate();
    };

    return (
        <Fragment>
            <DocumentTypesForm form={docForm} onFinish={onDocumentFormFinish} setIsBtnDisabled={setIsBtnDisabled} isBtnDisabled={isBtnDisabled} finalFormdata={finalFormdata}/>

            {finalFormdata?.documentType?.length > 0 &&
                finalFormdata?.documentType.map((action) => {
                    return <CardDocumentType {...action} form={docForm} onFinish={onDocumentFormFinish} finalFormdata={finalFormdata} setfinalFormdata={setFinalFormdata} forceUpdate={forceUpdate} setIsBtnDisabled={setIsBtnDisabled} isBtnDisabled={isBtnDisabled} />;
                })}
        </Fragment>
    );
};

export default DocumentTypes;
