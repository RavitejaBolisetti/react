import React, { Fragment, useState, useReducer } from 'react';
import { Form, Space, Divider } from 'antd';

import CardApplicationAction from './CardApplicationAction';
import ApplicationActionsForm from './ApplicationActionsForms';

const ApplicationActions = ({ footerEdit = false, onFinishFailed = () => {}, isReadOnly = false, setFormBtnDisable, setFinalFormdata, finalFormdata, actions }) => {
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);
    const [actionForm] = Form.useForm();

    const onActionFormFinish = (val) => {
        const { value, label } = val?.applicationName;
        const { actionId, ...selectedActionData } = actions?.find((el) => el?.id === value);
        setFinalFormdata({ ...finalFormdata, applicationAction: [...finalFormdata.applicationAction, { actionName: label, status: val?.status, id: val?.id, actionMasterId: value, actionId: actionId }] });
        actionForm.resetFields();
    };

    return (
        <Fragment>
            <Divider/>
            <div style={{ marginBottom: '14px' }}>
                <ApplicationActionsForm finalFormdata={finalFormdata} form={actionForm} onFinish={onActionFormFinish} setIsBtnDisabled={setIsBtnDisabled} isBtnDisabled={isBtnDisabled} actions={actions} />
            </div>
            {finalFormdata?.applicationAction?.length > 0 &&
                finalFormdata?.applicationAction?.map((action) => {
                    return <CardApplicationAction {...action} form={actionForm} onFinish={onActionFormFinish} setFinalFormdata={setFinalFormdata} forceUpdate={forceUpdate} setIsBtnDisabled={setIsBtnDisabled} isBtnDisabled={isBtnDisabled} actions={actions} />;
                })}
        </Fragment>
    );
};

export default ApplicationActions;
