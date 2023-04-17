import React, { useState, Fragment } from 'react';
import { Col, Card, Row, Button, Form, Divider, Typography } from 'antd';
import { FiEdit, FiTrash } from 'react-icons/fi';

import style from "./ApplicationMaster.module.css";
import DocumentTypesForm from './DocumentTypesForm';

const { Text } = Typography;

const CardDocumentType = (prop) => {
    const { id, termAndConRequired, digitalSignatureRequired, documentTypeDescription, documentTypeCode, setfinalFormdata, forceUpdate, setIsBtnDisabled, isBtnDisabled } = prop;
    const [form] = Form.useForm();
    const [isEditing, setIsEditing] = useState(false);

    // on Click edit button sets form fields
    const onEdit = (values) => {

        form.setFieldsValue({
            termAndConRequired,
            digitalSignatureRequired,
            documentTypeDescription,
            documentTypeCode,
            status: values.status,
        });
        setIsEditing(true);
        setIsBtnDisabled(true);
    };

    // on clicking save button updates data
    const onUpdate = () => {
        const newFormData = form.getFieldsValue();
        setfinalFormdata((prev) => {
            const newList = prev;
            const indx = prev?.documentType.findIndex((el) => el.id === documentTypeCode);
            newList?.documentType?.splice(indx, 1, { ...newFormData });
            return { ...prev, documentType: newList?.documentType };
        });
        setIsEditing(false);
        setIsBtnDisabled(false);
        form.resetFields();
        // forceUpdate();
    };

    const handleDeleteDocType = (val) => {

        setfinalFormdata((prev) => {
            const newList = prev;
            const indx = prev?.documentType.findIndex((el) => el.id === val?.documentTypeCode);
            console.log('newList', newList, 'indx', indx);
            newList?.documentType?.splice(indx, 1);
            return { ...prev, documentType: newList?.documentType };
        });
        setIsEditing(false);
        setIsBtnDisabled(false);
        form.resetFields();
    };

    // on cancel editing
    const onCancel = () => {
        setIsEditing(false);
        setIsBtnDisabled(false);
    };

    return (
        <>
            <Card
                className={style.viewCardSize}   
                key={documentTypeCode}
            >
                <Row align="middle">
                    <Col xs={18} sm={18} md={18} lg={18} xl={18} xxl={18}>
                        <Row align="middle">
                            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <Text type="secondary">T&C Required: </Text> {termAndConRequired ? <Text type="success">Active</Text> : <Text>Inactive</Text>}
                            </Col>

                            <Divider type="vertical" />

                            <Col xs={10} sm={10} md={10} lg={10} xl={10} xxl={10}>
                                <Text type="secondary">Signature: </Text> {digitalSignatureRequired ? <Text type="success">Active</Text> : <Text>Inactive</Text>}
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                <Text strong>{documentTypeDescription || 'Document name 1'}</Text>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                <Text type="secondary">Code: {documentTypeCode || 'B6G431'}</Text>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <Row justify="end">
                            {!isEditing ? (
                                <>
                                    <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                                        <Button disabled={isBtnDisabled} type="link" icon={<FiEdit />} onClick={() => onEdit(termAndConRequired, digitalSignatureRequired, documentTypeDescription, documentTypeCode)} />
                                    </Col>
                                    {!id?.length>0 && <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                                        <Button onClick={() => handleDeleteDocType({termAndConRequired, digitalSignatureRequired, documentTypeDescription, documentTypeCode})} type="link" icon={<FiTrash />}></Button>
                                    </Col>}
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
                        <DocumentTypesForm termAndConRequired={termAndConRequired} digitalSignatureRequired={digitalSignatureRequired} documentTypeDescription={documentTypeDescription} documentTypeCode={documentTypeCode} form={form} isEditing={isEditing} />
                    </Fragment>
                )}
            </Card>
        </>
    );
};

export default CardDocumentType;
