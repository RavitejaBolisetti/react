import React, { useState } from 'react';
import { Col, Card, Row, Button, Divider, Form } from 'antd';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { Typography } from 'antd';

import style from './../../Common.module.css';


import ApplicationActionsForm from './ApplicationActionsForms';
import { Fragment } from 'react';

const { Text } = Typography;

const CardApplicationAction = (props) => {
    const { status, actionId, actionName, actionMasterId, id, setFinalFormdata, forceUpdate, setIsBtnDisabled, isBtnDisabled, actions } = props;
    const [form] = Form.useForm();
    const [isEditing, setIsEditing] = useState(false);

    const onEdit = (values) => {
        form.setFieldsValue({
            applicationName: {
                label: values.actionName,
                value: values.actionMasterId,
                id: values.actionMasterId,
            },
            actionMasterId: actionMasterId,
            status: values.status,
            id: id,
        });
        setIsEditing(true);
        setIsBtnDisabled(true);
    };

    const onUpdate = () => {

        const newFormData = form.getFieldsValue();
        setFinalFormdata((prev) => {
            const newList = prev?.applicationAction;
            const index = prev?.applicationAction?.findIndex((el) => el.actionId === actionId);
            const prevData = prev?.applicationAction[index];
            newList.splice(index, 1, { ...prevData, status: newFormData?.status });
            return { ...prev, applicationAction: [...newList] };
        });
        setIsEditing(false);
        setIsBtnDisabled(false);
        form.resetFields();
        forceUpdate();
    };

    const handleDeleteAction = (val) => {
        setFinalFormdata((prev) => {
            const newList = prev?.applicationAction;
            const indx = prev?.applicationAction?.findIndex((el) => el?.actionId === val.actionId);
            newList.splice(indx, 1);
            return { ...prev, applicationAction: newList };
        });

        setIsEditing(false);
        setIsBtnDisabled(false);
        form.resetFields();
    };

    const onCancel = () => {
        setIsEditing(false);
        setIsBtnDisabled(false);
    };

    return (
        <>
            <Card
               className={style.viewCardSize}  
               key={actionId}                   
            >
                <Row align="middle">
                    <Col xs={18} sm={18} md={18} lg={18} xl={18} xxl={18}>
                        <Col xs={16} sm={16} md={16} lg={16} xl={16} xxl={16}>
                            <Text type="secondary">Status: </Text> {status ? <Text type="success">Active</Text> : <Text type="secondary">Inactive</Text>}
                        </Col>
                        <Col xs={16} sm={16} md={16} lg={16} xl={16} xxl={16}>
                            <Text strong>{actionName}</Text>
                        </Col>
                        <Col xs={16} sm={16} md={16} lg={16} xl={16} xxl={16}>
                            <Text type="secondary">Action ID: {actionId}</Text>
                        </Col>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <Row justify="end">
                            {!isEditing ? (
                                <>
                                    <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                                        <Button disabled={isBtnDisabled} type="link" icon={<FiEdit />} onClick={() => onEdit({ status, actionName, actionId, actionMasterId, id })} />
                                    </Col>
                                    {!id ?
                                        <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                                            <Button disabled={isBtnDisabled} onClick={() => handleDeleteAction({ status, actionName, actionId })} type="link" icon={<FiTrash />}></Button>
                                        </Col>
                                        : ''}
                                </>
                            ) : (
                                <>
                                    {' '}
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                        <Button type="link" onClick={onUpdate}>
                                            Save
                                        </Button>
                                    </Col>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                        <Button type="link" onClick={() => onCancel()}>
                                            Cancel
                                        </Button>
                                    </Col>
                                </>
                            )}
                        </Row>
                    </Col>
                </Row>

                {isEditing && (
                    <Fragment>
                        <Divider />
                        <ApplicationActionsForm status={status} name={actionName} id={id} form={form} isEditing={isEditing} actions={actions} disableStatus={true} />
                    </Fragment>
                )}
            </Card>
        </>
    );
};

export default CardApplicationAction;
