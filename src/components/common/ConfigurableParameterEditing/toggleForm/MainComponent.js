import React, { Fragment, useState, useReducer } from 'react';
import { Input, Form, Col, Card, Row, Switch, Button, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';


import CardComponent from './CardComponent';
import FormComponent from './FormComponent';

const MainComponent = ({ footerEdit = false, onFinish = () => {}, onFinishFailed = () => {}, isReadOnly = false, setFormBtnDisable, setFinalFormdata, FinalFormdata }) => {
    const [docData, setDocData] = useState([]);
    const [DocumentTypesList, setDocumentTypesList] = useState([]);
    const [isBtnDisabled, setIsBtnDisabled] = useState(false)
    const [, forceUpdate] = useReducer((x) => x + 1, 0);

    const [actionForm] = Form.useForm();

    const handleAdd = (value) => {
        setDocData((prev) => [...prev, value]);
        actionForm.resetFields();
    };

    const onActionFormFinish = (val) => {
        console.log('value', val);
        setDocumentTypesList((prev) => [...prev, { ...val }]);
        // setFinalFormdata({ ...FinalFormdata, DocumentType: DocumentTypesList });
        // setFinalFormdata({ ...FinalFormdata, DocumentType: [...FinalFormdata.DocumentType, val] });

        actionForm.resetFields();
        forceUpdate()
    };

    return (
        <Fragment>
            <FormComponent form={actionForm} onFinish={onActionFormFinish} setIsBtnDisabled={setIsBtnDisabled}  isBtnDisabled={isBtnDisabled}/>

            {DocumentTypesList.length > 0 &&
                DocumentTypesList.map((action) => {
                    return <CardComponent {...action} form={actionForm} onFinish={onActionFormFinish} setDocumentTypesList={setDocumentTypesList} forceUpdate={forceUpdate} setIsBtnDisabled={setIsBtnDisabled}  isBtnDisabled={isBtnDisabled}/>;
                })}
        </Fragment>
    );
};

export default MainComponent;
