import React, { useState } from 'react';
import { Col, Card, Row, Button, Divider, Form } from 'antd';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { Typography } from 'antd';

import styles from 'pages/common/Common.module.css';
import style from 'components/common/DrawerAndTable.module.css';

import ApplicationActionsForm from './ApplicationActionsForms';
import { Fragment } from 'react';

const { Text } = Typography;

const CardApplicationAction = (props) => {
    const { status, applicationName, id, setApplicationList, forceUpdate } = props;
    const [form] = Form.useForm();
    const [isEditing, setIsEditing] = useState(false);

    // on Click edit button sets form fields
    const onEdit = (values) => {
        form.setFieldsValue({
            applicationAction: {
                label: values.applicationName,
                value: values.id,
                key: values.id,
            },
            status: values.status,
        });
        setIsEditing(true);
    };

    // on clicking save button updates data
    const onUpdate = () => {
        const newFormData = form.getFieldsValue();
        console.log('fod', newFormData);
        const { value, label } = newFormData?.applicationAction;
        setApplicationList((prev) => {
            const newList = prev;
            const indx = prev.findIndex((el) => el.id === id);
            console.log('newList', newList, 'indx', indx);
            newList.splice(indx, 1, { applicationName: label, id: value, status: newFormData.status });
            return newList;
        });
        setIsEditing(false);
        form.resetFields();
        forceUpdate()
    };

    // on cancel editing
    const onCancel = () => {
        setIsEditing(false);
    };

    return (
        <>
            <Card
                style={{
                    width: 440,
                    backgroundColor: '#BEBEBE1A',
                    marginTop: '12px',
                }}
            >
                <Row align="middle">
                    <Col xs={18} sm={18} md={18} lg={18} xl={18} xxl={18}>
                        <Col xs={16} sm={16} md={16} lg={16} xl={16} xxl={16}>
                            <Text type="secondary">Status: </Text> {status ? <Text type="success">Active</Text> : <Text>Inactive</Text>}
                        </Col>
                        <Col xs={16} sm={16} md={16} lg={16} xl={16} xxl={16}>
                            <Text strong>{applicationName || 'Employee Empowerment'}</Text>
                            {/* <Text type="secondary">Action ID: {id || 'B6G431'}</Text> */}
                        </Col>
                        <Col xs={16} sm={16} md={16} lg={16} xl={16} xxl={16}>
                            {/* <Text strong>{applicationName || 'Employee Empowerment'}</Text> */}
                            <Text type="secondary">Action ID: {id || 'B6G431'}</Text>
                        </Col>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <Row justify="end">
                            {!isEditing ? (
                                <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                                    <Button type="link" icon={<FiEdit />} onClick={() => onEdit({ status, applicationName, id })} />
                                </Col>
                            ) : (
                                <>
                                    {' '}
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                        <Button type="link" onClick={() => onCancel()}>
                                            Cancel
                                        </Button>
                                    </Col>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                        <Button type="link" onClick={onUpdate}>
                                            Save
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
                        <ApplicationActionsForm status={status} name={applicationName} id={id} form={form}  isEditing={isEditing} />
                    </Fragment>
                )}
            </Card>
        </>
    );
};

export default CardApplicationAction;
