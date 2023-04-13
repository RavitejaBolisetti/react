import React, { Fragment, useState, useReducer } from 'react';
import { Input, Form, Col, Card, Row, Switch, Button, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { validateRequiredInputField, validationFieldLetterAndNumber } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

import style from 'components/common/DrawerAndTable.module.css';
import AuthorityCard from './AuthorityCard';
import AuthorityForm from './AuthorityForm';

const AuthorityDetail = ({ footerEdit = false, onFinishFailed = () => {}, isReadOnly = false, setFormBtnDisable, setFinalFormdata, FinalFormdata }) => {
    const [docData, setDocData] = useState([]);
    const [documentTypesList, setDocumentTypesList] = useState([]);
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);
    const [, forceUpdate] = useReducer((x) => x + 1, 0);

    const [actionForm] = Form.useForm();

    const handleAdd = (value) => {
        setDocData((prev) => [...prev, value]);
        actionForm.resetFields();
    };

    const onActionFormFinish = (val) => {
        console.log('value ===>', val);
        const { key, label } = val.authoitytype;
        setDocumentTypesList((prev) => [...prev, { token: val.token, authoitytype: key, authorityName: label }]);
        // setFinalFormdata({ ...FinalFormdata, DocumentType: documentTypesList });
        // setFinalFormdata({ ...FinalFormdata, DocumentType: [...FinalFormdata.DocumentType, val] });

        actionForm.resetFields();
        forceUpdate();
    };
    const onFinish = (vals) => {
        setDocumentTypesList(vals);
        console.log(vals, 'state');
    };

    console.log('documentTypesList', documentTypesList);

    return (
        <>
            <AuthorityForm onFinish={onActionFormFinish} form={actionForm} setIsBtnDisabled={setIsBtnDisabled} isBtnDisabled={isBtnDisabled} setDocumentTypesList={setDocumentTypesList} />

            {documentTypesList.length > 0 &&
                documentTypesList.map((action) => {
                    return <AuthorityCard {...action} form={actionForm} onFinish={onActionFormFinish} setDocumentTypesList={setDocumentTypesList} forceUpdate={forceUpdate} setIsBtnDisabled={setIsBtnDisabled} isBtnDisabled={isBtnDisabled} />;
                })}
        </>
    );
};

export default AuthorityDetail;
