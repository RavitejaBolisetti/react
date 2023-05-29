import React, { Fragment, useState, useReducer } from 'react';
import { Form, Divider } from 'antd';

import CardApplicationAction from './CardApplicationAction';
import ApplicationActionsForm from './ApplicationActionsForms';


const ApplicationActions = ({ footerEdit = false, onFinishFailed = () => {}, isReadOnly = false, setFormBtnDisable, setFinalFormdata, finalFormdata, actions, setCanFormSave }) => {
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);
    const [actionForm] = Form.useForm();

    const onActionFormFinish = (val) => {
        const { value, label } = val?.applicationName;
        const { actionId } = actions?.find((el) => el?.id === value);
        setFinalFormdata({ ...finalFormdata, applicationAction: [...finalFormdata.applicationAction, { actionName: label, status: val?.status, id: val?.id, actionMasterId: value, actionId: actionId }] });
        actionForm.resetFields();
    };
    const onFieldsChange = () => {
        setCanFormSave(true)
    }

    return (
        <Fragment>
            <Divider />
            <ApplicationActionsForm finalFormdata={finalFormdata} form={actionForm} onFinish={onActionFormFinish} setIsBtnDisabled={setIsBtnDisabled} isBtnDisabled={isBtnDisabled} actions={actions} onFieldsChange={onFieldsChange}/>
            {finalFormdata?.applicationAction?.length > 0 &&
                finalFormdata?.applicationAction?.map((action) => {
                    return <CardApplicationAction {...action} form={actionForm} onFinish={onActionFormFinish} setFinalFormdata={setFinalFormdata} forceUpdate={forceUpdate} setIsBtnDisabled={setIsBtnDisabled} isBtnDisabled={isBtnDisabled} actions={actions} onFieldsChange={onFieldsChange}/>;
                })}
        </Fragment>
    );
};

export default ApplicationActions;
