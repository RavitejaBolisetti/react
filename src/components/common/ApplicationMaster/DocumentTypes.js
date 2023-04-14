import React, { Fragment, useState, useReducer } from 'react';
import { Form, Col, Card, Row, Switch, Button, Select } from 'antd';

import CardDocumentType from './CardDocumentType';
import DocumentTypesForm from './DocumentTypesForm';

const DocumentTypes = ({ setIsBtnDisabled,isBtnDisabled, onFinish = () => {}, onFinishFailed = () => {}, isReadOnly = false, setFormBtnDisable, setFinalFormdata, finalFormdata }) => {
    // const [docData, setDocData] = useState([]);
    // const [DocumentTypesList, setDocumesntTypesList] = useState([]);
    // const [isBtnDisabled, setIsBtnDisabled] = useState(false);
    const [, forceUpdate] = useReducer((x) => x + 1, 0);

    const [actionForm] = Form.useForm();

    const handleAdd = (value) => {
        // setDocData((prev) => [...prev, value]);
        actionForm.resetFields();
    };

    const onDocumentFormFinish = (val) => {
        // setDocumentTypesList((prev) => [...prev, { ...val }]);
        // setfinalFormdata({ ...finalFormdata, documentType: DocumentTypesList });
        setFinalFormdata((prev) => ({ ...prev, documentType: [...finalFormdata.documentType, val] }));

        actionForm.resetFields();
        forceUpdate();
    };

    return (
        <Fragment>
            <DocumentTypesForm form={actionForm} onFinish={onDocumentFormFinish} setIsBtnDisabled={setIsBtnDisabled} isBtnDisabled={isBtnDisabled} />

            {finalFormdata?.documentType?.length > 0 &&
                finalFormdata?.documentType.map((action) => {
                    return <CardDocumentType {...action} form={actionForm} onFinish={onDocumentFormFinish} setfinalFormdata={setFinalFormdata} forceUpdate={forceUpdate} setIsBtnDisabled={setIsBtnDisabled} isBtnDisabled={isBtnDisabled} />;
                })}
        </Fragment>
    );
};

export default DocumentTypes;
