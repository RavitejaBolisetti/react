import React, { Fragment, useState, useReducer } from 'react';
import { Input, Form, Col, Card, Row, Switch, Button, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { validateRequiredInputField, validationFieldLetterAndNumber } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

import style from 'components/common/DrawerAndTable.module.css';
import AuthorityCard from './AuthorityCard';
import { AuthorityForm } from './AuthorityForm';
import moment from 'moment';

const AuthorityDetail = () => {
    const [docData, setDocData] = useState([]);
    const [documentTypesList, setDocumentTypesList] = useState([]);
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);
    const [, forceUpdate] = useReducer((x) => x + 1, 0);

    const [actionForm] = Form.useForm();

    const onActionFormFinish = (val) => {
        console.log('value ===>', val, 'AuthorityDetail', moment(val.dateFrom).format());

        console.log(val, "CARDCHECK")

        const { key, label } = val.authoitytype;
        setDocumentTypesList((prev) => [...prev, { token: val.token, authoitytype: key, authorityName: label, dateFrom: moment(val?.dateFrom).format('DD/MM/YYYY'), dateTo: moment(val?.dateTo).format('DD/MM/YYYY') }]);
        actionForm.resetFields();
        forceUpdate();
    };

    console.log('documentTypesList', documentTypesList);

    return (
        <>
            {/* main form(top form) */}
            <AuthorityForm onFinish={onActionFormFinish} form={actionForm} setIsBtnDisabled={setIsBtnDisabled} isBtnDisabled={isBtnDisabled} setDocumentTypesList={setDocumentTypesList} />

            {/* card with form */}
            {documentTypesList.length > 0 &&
                documentTypesList.map((action) => {
                    return <AuthorityCard {...action} form={actionForm} onFinish={onActionFormFinish} setDocumentTypesList={setDocumentTypesList} forceUpdate={forceUpdate} setIsBtnDisabled={setIsBtnDisabled} isBtnDisabled={isBtnDisabled}
                    documentTypesList={documentTypesList}
                    />;
                })}
        </>
    );
};

export default AuthorityDetail;
