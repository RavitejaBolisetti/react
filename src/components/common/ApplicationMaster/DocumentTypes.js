import React, { Fragment, useState, useReducer } from 'react';
import { Input, Form, Col, Card, Row, Switch, Button, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { validateRequiredInputField, validationFieldLetterAndNumber } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

import style from 'components/common/DrawerAndTable.module.css';
import CardDocumentType from './CardDocumentType';
import DocumentTypesForm from './DocumentTypesForm';

const DocumentTypes = ({ footerEdit = false, onFinish = () => {}, onFinishFailed = () => {}, isReadOnly = false, setFormBtnDisable, setFinalFormdata, FinalFormdata }) => {
    const [docData, setDocData] = useState([]);
    const [DocumentTypesList, setDocumentTypesList] = useState([]);
    const [, forceUpdate] = useReducer((x) => x + 1, 0);

    const [actionForm] = Form.useForm();

    const [form] = Form.useForm();

    const handleAdd = (value) => {
        setDocData((prev) => [...prev, value]);
        form.resetFields();
    };

    const onActionFormFinish = (val) => {
        console.log('value', val);
        setDocumentTypesList((prev) => [...prev, { ...val }]);
        setFinalFormdata({ ...FinalFormdata, DocumentType: DocumentTypesList });
        setFinalFormdata({ ...FinalFormdata, DocumentType: [...FinalFormdata.DocumentType, val] });

        actionForm.resetFields();
    };

    return (
        <Fragment>
            <DocumentTypesForm form={form} onFinish={onActionFormFinish} />

            {DocumentTypesList.length > 0 &&
                DocumentTypesList.map((action) => {
                    return <CardDocumentType {...action} form={actionForm} onFinish={onActionFormFinish} setDocumentTypesList={setDocumentTypesList} forceUpdate={forceUpdate} />;
                })}
        </Fragment>
    );
};

export default DocumentTypes;
