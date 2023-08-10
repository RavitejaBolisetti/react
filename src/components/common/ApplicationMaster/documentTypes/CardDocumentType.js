/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, Fragment, useEffect } from 'react';
import { Col, Card, Row, Button, Form, Divider, Typography } from 'antd';
import { FiEdit, FiTrash } from 'react-icons/fi';

import styles from 'components/common/Common.module.css';
import DocumentTypesForm from './DocumentTypesForm';

const { Text } = Typography;

const CardDocumentType = (prop) => {
    const { id, status, termAndConRequired, digitalSignatureRequired, documentTypeDescription, documentTypeCode, setfinalFormdata, setIsBtnDisabled, isBtnDisabled, onFieldsChange } = prop;
    const [form] = Form.useForm();
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        return () => {
            setIsEditing(false);
            setIsBtnDisabled(false);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onEdit = (id, status, termAndConRequired, digitalSignatureRequired, documentTypeDescription, documentTypeCode) => {
        form.setFieldsValue({
            id,
            termAndConRequired,
            digitalSignatureRequired,
            documentTypeDescription,
            documentTypeCode,
            status: status,
        });
        setIsEditing(true);
        setIsBtnDisabled(true);
    };

    const onUpdate = (value) => {
        form.validateFields()
            .then((newFormData) => {
                setfinalFormdata((prev) => {
                    const newList = prev;
                    const indx = prev?.documentType.findIndex((el) => el?.documentTypeCode === documentTypeCode);
                    newList?.documentType?.splice(indx, 1, { ...newFormData });
                    return { ...prev, documentType: newList?.documentType };
                });
                setIsEditing(false);
                setIsBtnDisabled(false);
                form.resetFields();
            })
            .catch((err) => {
                return;
            });
    };

    const handleDeleteDocType = (val) => {
        setfinalFormdata((prev) => {
            const newList = prev;
            const indx = prev?.documentType.findIndex((el) => el.documentTypeCode === val?.documentTypeCode);
            newList?.documentType?.splice(indx, 1);
            return { ...prev, documentType: newList?.documentType };
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
            <Card className={styles.viewCardSize} key={documentTypeCode}>
                <Row align="middle">
                    <Col xs={18} sm={18} md={18} lg={18} xl={18} xxl={18}>
                        <Row align="middle">
                            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <Text type="secondary">T&C Required: </Text> {termAndConRequired ? <Text type="success">Active</Text> : <Text type="secondary">Inactive</Text>}
                            </Col>

                            <Divider type="vertical" />

                            <Col xs={10} sm={10} md={10} lg={10} xl={10} xxl={10}>
                                <Text type="secondary">Signature: </Text> {digitalSignatureRequired ? <Text type="success">Active</Text> : <Text type="secondary">Inactive</Text>}
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                <Text strong>{documentTypeDescription}</Text>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                <Text type="secondary">Code: {documentTypeCode}</Text>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <Row justify="end">
                            {!isEditing ? (
                                <>
                                    <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                                        <Button disabled={isBtnDisabled} type="link" icon={<FiEdit />} onClick={() => onEdit(id, status, termAndConRequired, digitalSignatureRequired, documentTypeDescription, documentTypeCode)} />
                                    </Col>
                                    {!id?.length > 0 && (
                                        <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                                            <Button disabled={isBtnDisabled} onClick={() => handleDeleteDocType({ termAndConRequired, digitalSignatureRequired, documentTypeDescription, documentTypeCode })} type="link" icon={<FiTrash />}></Button>
                                        </Col>
                                    )}
                                </>
                            ) : (
                                <>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className={styles.saveCancelBtn}>
                                        <Button type="link" onClick={onUpdate}>
                                            Save
                                        </Button>
                                    </Col>
                                    <Col xs={11} sm={11} md={11} lg={11} xl={11} xxl={11} className={styles.saveCancelBtn}>
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
                        <DocumentTypesForm termAndConRequired={termAndConRequired} digitalSignatureRequired={digitalSignatureRequired} documentTypeDescription={documentTypeDescription} documentTypeCode={documentTypeCode} form={form} isEditing={isEditing} onFieldsChange={onFieldsChange} />
                    </Fragment>
                )}
            </Card>
        </>
    );
};

export default CardDocumentType;
