import React, { useState, Fragment } from 'react';
import {  Col, Card,Row, Button, Form, Divider } from 'antd';
import { FiEdit } from 'react-icons/fi';
import { Typography } from 'antd';

import styles from 'pages/common/Common.module.css';
import style from 'components/common/DrawerAndTable.module.css';
import DocumentTypesForm from './DocumentTypesForm';
import { FaLessThanEqual } from 'react-icons/fa';

const { Text } = Typography;

const CardDocumentType = (prop) => {
    const {tncReq, signatureReq, documentName, docCode,setDocumentTypesList,forceUpdate, setIsBtnDisabled,  isBtnDisabled } = prop;
    const [form] = Form.useForm();
    const [isEditing, setIsEditing] = useState(false);


    // on Click edit button sets form fields
    const onEdit = (values) => {
        form.setFieldsValue({
            tncReq,
            signatureReq,
            documentName,
            docCode,
            status: values.status,
        });
        setIsEditing(true);
        setIsBtnDisabled(true);
    };

    // on clicking save button updates data
    const onUpdate = () => {
        const newFormData = form.getFieldsValue();
        console.log('fod', newFormData);
        setDocumentTypesList((prev) => {
            const newList = prev;
            const indx = prev.findIndex((el) => el.id === docCode);
            console.log('newList', newList, 'indx', indx);
            newList.splice(indx, 1, {...newFormData});
            return newList;
        });
        setIsEditing(false);
        setIsBtnDisabled(false)
        form.resetFields();
        forceUpdate()
    };

    // on cancel editing
    const onCancel = () => {
        setIsEditing(false);
        setIsBtnDisabled(false)
    };


    return <>
        <Card
            style={{
                // width: 440,
                backgroundColor: "#BEBEBE1A",
                marginTop: '12px',
                border: '1px solid rgba(62, 62, 62, 0.1)',
            }}
        >
            <Row align='middle' >
                <Col xs={18} sm={18} md={18} lg={18} xl={18} xxl={18}>
                    <Row align="middle">
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} >
                            <Text type="secondary">T&C Required: </Text> {tncReq ? <Text type="success">Active</Text> : <Text>Inactive</Text> }
                        </Col>

                        <Divider type="vertical" />

                        <Col xs={10} sm={10} md={10} lg={10} xl={10} xxl={10} >
                            <Text type="secondary">Signature: </Text> {signatureReq ? <Text type="success">Active</Text> : <Text>Inactive</Text> }
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} >
                            <Text strong>{documentName || 'Document name 1'}</Text>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} >
                            <Text type="secondary">Code: {docCode || 'B6G431'}</Text>
                        </Col>
                    </Row>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6} >
                    <Row justify="end">
                            {!isEditing ? (
                                <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                                    <Button disabled={isBtnDisabled} type="link" icon={<FiEdit />} onClick={() => onEdit(tncReq, signatureReq, documentName, docCode)} />
                                </Col>
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
                        <DocumentTypesForm tncReq={tncReq} signatureReq={signatureReq} documentName={documentName} docCode={docCode} form={form}  isEditing={isEditing} />
                    </Fragment>
                )}
        </Card>
    </>
}

export default CardDocumentType;