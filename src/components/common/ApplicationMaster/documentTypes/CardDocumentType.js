/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, Fragment, useEffect } from 'react';
import { Col, Card, Row, Button, Form, Divider, Typography, Space } from 'antd';
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
                <Row align="middle" className={styles.marB20}>
                    <Col xs={18} sm={18} md={18} lg={18} xl={18} xxl={18}>
                        <div>
                            <span>
                                <Text type="secondary">T&C Required:</Text> {termAndConRequired ? <Text type="success">Active</Text> : <Text type="secondary">Inactive</Text>}
                            </span>
                            <Divider type="vertical" />
                            <span>
                                <Text type="secondary">Signature:</Text> {digitalSignatureRequired ? <Text type="success">Active</Text> : <Text type="secondary"> Inactive</Text>}
                            </span>
                        </div>
                        <div>
                            <Text strong>{documentTypeDescription}</Text>
                        </div>
                        <div>
                            <Text type="secondary">Code: {documentTypeCode}</Text>
                        </div>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6} className={styles.buttonsGroupRight}>
                        {!isEditing ? (
                            <>
                                <Button disabled={isBtnDisabled} type="link" icon={<FiEdit />} onClick={() => onEdit(id, status, termAndConRequired, digitalSignatureRequired, documentTypeDescription, documentTypeCode)} />
                                {!id?.length > 0 && <Button disabled={isBtnDisabled} onClick={() => handleDeleteDocType({ termAndConRequired, digitalSignatureRequired, documentTypeDescription, documentTypeCode })} type="link" icon={<FiTrash />}></Button>}
                            </>
                        ) : (
                            <>
                                <Button type="link" onClick={onUpdate}>
                                    Save
                                </Button>
                                <Button type="link" onClick={() => onCancel()}>
                                    Cancel
                                </Button>
                            </>
                        )}
                    </Col>
                </Row>

                {isEditing && (
                    <>
                        <Divider />
                        <DocumentTypesForm termAndConRequired={termAndConRequired} digitalSignatureRequired={digitalSignatureRequired} documentTypeDescription={documentTypeDescription} documentTypeCode={documentTypeCode} form={form} isEditing={isEditing} onFieldsChange={onFieldsChange} />
                    </>
                )}
            </Card>
        </>
    );
};

export default CardDocumentType;
