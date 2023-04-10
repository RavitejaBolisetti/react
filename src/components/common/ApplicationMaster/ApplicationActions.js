import React, { Fragment, useState, useReducer } from 'react';
import { Input, Form, Col, Card, Row, Switch, Button, Select, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import CardApplicationAction from './CardApplicationAction';
import { validateRequiredInputField, validationFieldLetterAndNumber, validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';

import styles from 'pages/common/Common.module.css';
import ApplicationActionsForm from './ApplicationActionsForms';

const applicationData = [
    {
        id: '1',
        applicationName: 'APP nm 1',
    },
    {
        id: '2',
        applicationName: 'APP nm 2',
    },
    {
        id: '3',
        applicationName: 'APP nm 3',
    },
];

const ApplicationActions = ({ footerEdit = false, onFinishFailed = () => {}, isReadOnly = false, setFormBtnDisable }) => {
    const [actionsList, setApplicationList] = useState([]);
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [actionForm] = Form.useForm();

    const onActionFormFinish = (val) => {
        console.log('value', val);
        const { value, label } = val?.applicationAction;
        setApplicationList((prev) => [...prev, { applicationName: label, id: value, status: val.status }]);
        actionForm.resetFields();
    };


    return (
        <Fragment>
            <ApplicationActionsForm form={actionForm} onFinish={onActionFormFinish} />

            {actionsList.length > 0 &&
                actionsList.map((action) => {
                    return <CardApplicationAction {...action} form={actionForm} onFinish={onActionFormFinish} setApplicationList={setApplicationList} forceUpdate={forceUpdate} />;
                })}
        </Fragment>
    );
};

export default ApplicationActions;
