import React, { Fragment, useReducer } from 'react';
import { Form, Card } from 'antd';

import CardDocumentType from './CardDocumentType';
import DocumentTypesForm from './DocumentTypesForm';

const DocumentTypes = ({ setIsBtnDisabled, isBtnDisabled, onFinish = () => {}, onFinishFailed = () => {}, isReadOnly = false, setFormBtnDisable, setFinalFormdata, finalFormdata }) => {
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [docForm] = Form.useForm();

    const handleAdd = (value) => {
        docForm.resetFields();
    };

    const onDocumentFormFinish = (val) => {
        setFinalFormdata((prev) => ({ ...prev, documentType: [...finalFormdata.documentType, val] }));
        docForm.resetFields();
        forceUpdate();
    };
    console.log('finalForm =p==>>', finalFormdata);

    return (
        <Fragment>
            <div style={{ marginBottom: '14px' }}>
                <DocumentTypesForm form={docForm} onFinish={onDocumentFormFinish} setIsBtnDisabled={setIsBtnDisabled} isBtnDisabled={isBtnDisabled} finalFormdata={finalFormdata} />
            </div>

            {finalFormdata?.documentType?.length > 0 &&
                finalFormdata?.documentType.map((action) => {
                    return <CardDocumentType {...action} form={docForm} onFinish={onDocumentFormFinish} finalFormdata={finalFormdata} setfinalFormdata={setFinalFormdata} forceUpdate={forceUpdate} setIsBtnDisabled={setIsBtnDisabled} isBtnDisabled={isBtnDisabled} />;
                })}
        </Fragment>
    );
};

export default DocumentTypes;
