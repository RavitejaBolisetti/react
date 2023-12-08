/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Col, Card, Row, Button, Form, Divider, Typography } from 'antd';
import { FiEdit, FiTrash } from 'react-icons/fi';
import DocumentTypesForm from './DocumentTypesForm';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

const { Text } = Typography;
const CardDocumentType = (prop) => {
    const { id, segment, modalGroup, modal, incentiveAmount, setfinalFormdata, setIsBtnDisabled, isBtnDisabled, onFieldsChange } = prop;
    const { segmentData, modalData, modalGroupData } = prop;

    const [form] = Form.useForm();
    const [isEditing, setIsEditing] = useState(false);

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

    const onUpdate = () => {
        form.validateFields()
            .then((newFormData) => {
                setfinalFormdata((prev) => {
                    const newList = prev;
                    const indx = prev?.findIndex((el) => el?.modal === modal);
                    newList?.splice(indx, 1, { ...newFormData });
                    return [...newList];
                });
                setIsEditing(false);
                setIsBtnDisabled(false);
                form.resetFields();
            })
            .catch((err) => {
                return err;
            });
    };

    const handleDeleteDocType = (val) => {
        setfinalFormdata((prev) => {
            const newList = prev;
            const indx = prev?.findIndex((el) => el.modal === val?.modal);
            newList?.splice(indx, 1);
            return [...newList];
        });
        setIsEditing(false);
        setIsBtnDisabled(false);
        form.resetFields();
    };

    const onCancel = () => {
        setIsEditing(false);
        setIsBtnDisabled(false);
    };

    const formProps = {
        id,
        segment,
        modalGroup,
        modal,
        incentiveAmount,
        segmentData,
        modalData,
        modalGroupData,
    };

    return (
        <>
            <Card key={modal + segment}>
                <Row align="middle" className={styles.marB20}>
                    <Col xs={18} sm={18} md={18} lg={18} xl={18} xxl={18}>
                        {/* <div>
                            <Text strong>{documentTypeDescription}</Text>
                        </div> */}
                        <div>
                            <Text type="secondary">
                                {translateContent('Segment : ' || 'applicationMaster.text.code') }
                                {segment}
                            </Text>
                        </div>
                        <div>
                            <Text type="secondary">
                                {'Modal Group : ' || translateContent('applicationMaster.text.code') }
                                {modalGroup}
                            </Text>
                        </div>
                        <div>
                            <Text type="secondary">
                                {'Modal : ' || translateContent('applicationMaster.text.code') }
                                {modal}
                            </Text>
                        </div>
                        <div>
                            <Text type="secondary">
                                {'Incentive Amount : ' || translateContent('applicationMaster.text.code') }
                                {incentiveAmount}
                            </Text>
                        </div>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6} className={styles.buttonsGroupRight}>
                        {!isEditing ? (
                            <>
                                <Button disabled={isBtnDisabled} type="link" icon={<FiEdit />} onClick={() => onEdit(id, segment, modalGroup, modal, incentiveAmount)} />
                                {!id?.length > 0 && <Button disabled={isBtnDisabled} onClick={() => handleDeleteDocType({ id, segment, modalGroup, modal, incentiveAmount })} type="link" icon={<FiTrash />}></Button>}
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
                        <DocumentTypesForm {...formProps} form={form} isEditing={isEditing} onFieldsChange={onFieldsChange} />
                    </>
                )}
            </Card>
        </>
    );
};

export default CardDocumentType;
