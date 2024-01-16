/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Col, Card, Row, Button, Form, Divider, Typography } from 'antd';
import { FiEdit, FiTrash } from 'react-icons/fi';
import DetailForm from './DetailForm';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

const { Text } = Typography;
const ViewDetailCard = (prop) => {
    const { formData, setformDataList, setIsBtnDisabled, isBtnDisabled, onFieldsChange } = prop;
    const [form] = Form.useForm();
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        return () => {
            setIsEditing(false);
            setIsBtnDisabled(false);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onEdit = (data) => {
        form.setFieldsValue({
            ...data,
        });
        setIsEditing(true);
        setIsBtnDisabled(true);
    };

    const onUpdate = () => {
        form.validateFields()
            .then((newFormData) => {
                setformDataList((prev) => {
                    const newList = prev;
                    const indx = prev?.findIndex((el) => el?.documentTypeCode === formData?.documentTypeCode);
                    newList?.splice(indx, 1, { ...newFormData });
                    return newList;
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
        setformDataList((prev) => {
            const newList = prev;
            const indx = prev?.findIndex((el) => el.documentTypeCode === val?.documentTypeCode);
            newList?.splice(indx, 1);
            return newList;
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
            {/* // mahindraMake, mahindraModel,mahindraVarient,competitorMake,competitorModel,competitorVarient */}
            <Card key={formData?.mahindraMake}>
                <Row align="middle" className={styles.marB20}>
                    <Col xs={18} sm={18} md={18} lg={18} xl={18} xxl={18}>
                        <Row>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                {'Make : ' || translateContent('applicationMaster.text.code')}
                                <Text strong>{formData?.make}</Text>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <Text type="secondary">
                                    {'Model : ' || translateContent('applicationMaster.text.code')}
                                    {formData?.model}
                                </Text>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <Text type="secondary">
                                    {'Varient : ' || translateContent('applicationMaster.text.code')}
                                    {formData?.varient}
                                </Text>
                            </Col>


                            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <Text type="secondary">
                                    {'Used Year : ' || translateContent('applicationMaster.text.code')}
                                    {formData?.usedYear}
                                </Text>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <Text type="secondary">
                                    {'MFG Year : ' || translateContent('applicationMaster.text.code')}
                                    {formData?.mfgYear}
                                </Text>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <Text type="secondary">
                                    {'Type : ' || translateContent('applicationMaster.text.code')}
                                    {formData?.type}
                                </Text>
                            </Col>

                            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <Text type="secondary">
                                    {'Latest Make : ' || translateContent('applicationMaster.text.code')}
                                    {formData?.latestMake}
                                </Text>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <Text type="secondary">
                                    {'Latest Model : ' || translateContent('applicationMaster.text.code')}
                                    {formData?.latestModel}
                                </Text>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <Text type="secondary">
                                    {'Latest Varient : ' || translateContent('applicationMaster.text.code')}
                                    {formData?.latestVarient}
                                </Text>
                            </Col>
                        </Row>
                    </Col>

                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} >
                        {!isEditing ? (
                            <>
                                <Button disabled={isBtnDisabled} type="primary" icon={<FiEdit />} onClick={() => onEdit(formData)}  >Edit</Button>
                                {!formData?.id?.length > 0 && <Button disabled={isBtnDisabled} onClick={() => handleDeleteDocType(formData)} danger icon={<FiTrash />} className={styles.marR10}>Delete</Button>}
                            </>
                        ) : (
                            <>
                                <Button type="primary" onClick={onUpdate}>
                                    {translateContent('global.buttons.add')}
                                </Button>
                                <Button danger onClick={() => onCancel()} className={styles.marR10}>
                                    {translateContent('global.buttons.cancel')}
                                </Button>
                            </>
                        )}
                    </Col>
                </Row>

                {isEditing && (
                    <>
                        <Divider />
                        <DetailForm formData={formData} form={form} isEditing={isEditing} onFieldsChange={onFieldsChange} />
                    </>
                )}
            </Card>
        </>
    );
};

export default ViewDetailCard;
