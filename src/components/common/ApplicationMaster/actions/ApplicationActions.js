/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useReducer } from 'react';
import { Form } from 'antd';

import CardApplicationAction from './CardApplicationAction';
import ApplicationActionsForm from './ApplicationActionsForms';

const ApplicationActions = ({ setFinalFormdata, finalFormdata, actions, setCanFormSave }) => {
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
        setCanFormSave(true);
    };

    return (
        <>
            <ApplicationActionsForm finalFormdata={finalFormdata} form={actionForm} onFinish={onActionFormFinish} setIsBtnDisabled={setIsBtnDisabled} isBtnDisabled={isBtnDisabled} actions={actions} onFieldsChange={onFieldsChange} />
            {finalFormdata?.applicationAction?.length > 0 &&
                finalFormdata?.applicationAction?.map((action) => {
                    return <CardApplicationAction {...action} form={actionForm} onFinish={onActionFormFinish} setFinalFormdata={setFinalFormdata} forceUpdate={forceUpdate} setIsBtnDisabled={setIsBtnDisabled} isBtnDisabled={isBtnDisabled} actions={actions} onFieldsChange={onFieldsChange} />;
                })}
        </>
    );
};

export default ApplicationActions;
