import React, { Fragment, useState, useReducer } from 'react';
import { Form } from 'antd';

import CardApplicationAction from './CardApplicationAction';

import ApplicationActionsForm from './ApplicationActionsForms';
import { useEffect } from 'react';


const ApplicationActions = ({ footerEdit = false, onFinishFailed = () => {}, isReadOnly = false, setFormBtnDisable, setFinalFormdata, finalFormdata, actions }) => {
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);
    const [actionForm] = Form.useForm();

    console.log('finalformData', finalFormdata  )

    const onActionFormFinish = (val) => {
        // console.log("val>>",val);
        const { value, label } = val?.applicationName;
       const { actionId,...selectedActionData} =  actions?.find(el => el?.id === value );
       console.log('selectedActionData',selectedActionData)
        // if(finalFormdata?.applicationAction.findIndex(el => el?.actionId === value ) !== -1){
        //     console.log('error duplicate found');
        //     return;
        // };
        setFinalFormdata({ ...finalFormdata, applicationAction: [...finalFormdata.applicationAction, { actionName: label, status: val?.status, id: val?.id, actionMasterId: value, actionId: actionId }] });
        actionForm.resetFields();
    };

    return (
        <Fragment>
            <ApplicationActionsForm finalFormdata={finalFormdata} form={actionForm} onFinish={onActionFormFinish} setIsBtnDisabled={setIsBtnDisabled} isBtnDisabled={isBtnDisabled} actions={actions}/>

            {finalFormdata?.applicationAction?.length > 0 &&
                finalFormdata?.applicationAction?.map((action) => {
                    return <CardApplicationAction {...action} form={actionForm} onFinish={onActionFormFinish} setFinalFormdata={setFinalFormdata} forceUpdate={forceUpdate} setIsBtnDisabled={setIsBtnDisabled} isBtnDisabled={isBtnDisabled} actions={actions} />;
                })}
        </Fragment>
    );
};

export default ApplicationActions;
