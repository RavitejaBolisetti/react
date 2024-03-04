/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Col, Card, Row, Button, Form, Divider, Typography } from 'antd';
import { FiEdit, FiTrash } from 'react-icons/fi';
import DocumentDetailsForm from './DocumentDetailsForm';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';
import { formatDate } from 'utils/formatDateTime';

const { Text } = Typography;
const CardDocumentDetails = (prop) => {
    const { id, status, termAndConRequired, digitalSignatureRequired, documentName, documentId,validFrom,validTo,documentstatus,documentmandatory, setfinalFormdata, setIsBtnDisabled, isBtnDisabled, onFieldsChange, } = prop;
    const [form] = Form.useForm();
    const [isEditing, setIsEditing] = useState(false);

    const statusDisplay = documentstatus ? "Active" : "Inactive";
    const mandatoryDisplay =  documentmandatory ? "HYes" : "No"

    // useEffect(() => {
    //     return () => {
    //         setIsEditing(false);
    //         setIsBtnDisabled(false);
    //     };
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    const onEdit = (id, status, termAndConRequired, digitalSignatureRequired, documentTypeDescription, documentTypeCode, documentName, documentId,validFrom,validTo,documentstatus,documentmandatory,) => {
        form.setFieldsValue({
            id,
            termAndConRequired,
            digitalSignatureRequired,
            documentTypeDescription,
            documentTypeCode,
            documentName, 
            documentId,
            validFrom,
            validTo,
            documentstatus,
            documentmandatory,
            status: status,
        });
        setIsEditing(true);
        setIsBtnDisabled(true);
    };

    const onUpdate = () => {
        form.validateFields()
            .then((newFormData) => {
                setfinalFormdata((prev) => {
                    console.log(newFormData,`newFormData`)
                    const newList = prev;
                    console.log(newList,`newList`)

                    const indx = prev?.DocumentDetails?.findIndex((el) => el?.documentId === documentId);
                    newList?.DocumentDetails?.splice(indx, 1, { ...newFormData });
                    return { ...prev, DocumentDetails: newList?.DocumentDetails };
                });
                setIsEditing(false);
                setIsBtnDisabled(false);
                form.resetFields();
            })
            .catch((err) => {
                return err;
            });
    };

    const handleDeleteDocDetail = (val) => {
        setfinalFormdata((prev) => {
            const newList = prev;
            const indx = prev?.DocumentDetails?.findIndex((el) => el.documentId === val?.documentId);
            console.log(indx,`indx`)
            newList?.DocumentDetails?.splice(indx, 1);
            return { ...prev, DocumentDetails: newList?.DocumentDetails };
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
            <Card key={documentId}>
                <Row align="middle" className={styles.marB20}>
                    <Col xs={18} sm={18} md={18} lg={18} xl={18} xxl={18}>
                        <div>
                             <Text >{'Document name: '}{documentName}</Text> <br/>
                            <Text strong></Text>
                        </div>
                        <div>
                        <Text >{'Document Id: '}{ documentId}</Text>
                        </div>
                        <Text >{'Valid From: '}{formatDate(validFrom) }</Text> <br/>
                        <Text >{'Valid To: '}{formatDate(validTo) }</Text> <br/>
                        <Text >{'Is Document Active: '}{statusDisplay }</Text> <br/>
                        <Text >{'Is Document Mandatory: '}{mandatoryDisplay }</Text>
                    </Col>
                    <Col xs={6} sm={6} md={6 } lg={6} xl={6} xxl={6} className={styles.buttonsGroupRight}>
                        {!isEditing ? (
                            <>
                                <Button disabled={isBtnDisabled} type="link" icon={<FiEdit />} onClick={() => onEdit(id, status, termAndConRequired, digitalSignatureRequired, documentName, documentId,validFrom,validTo,documentstatus,documentmandatory)} />
                                {!id?.length > 0 && <Button disabled={isBtnDisabled} onClick={() => handleDeleteDocDetail({ termAndConRequired, digitalSignatureRequired, documentName, documentId, validFrom,validTo,documentstatus,documentmandatory })} type="link" icon={<FiTrash />}></Button>}
                            </>
                        ) : (
                            <>
                                <Button type="link" onClick={onUpdate}>
                                    {translateContent('global.buttons.add')}
                                </Button>
                                <Button type="link" onClick={() => onCancel()}>
                                    {translateContent('global.buttons.cancel')}
                                </Button>
                            </>
                        )}
                    </Col>
                </Row>

                {isEditing && (
                    <>
                        <Divider />
                        <DocumentDetailsForm termAndConRequired={termAndConRequired} digitalSignatureRequired={digitalSignatureRequired} documentName={documentName} documentId={documentId} validFrom={validFrom} validTo={validTo} documentstatus={documentstatus} documentmandatory={documentmandatory} form={form} isEditing={isEditing} onFieldsChange={onFieldsChange} />
                    </>
                )}
            </Card>
        </>
    );
};

export default CardDocumentDetails;
