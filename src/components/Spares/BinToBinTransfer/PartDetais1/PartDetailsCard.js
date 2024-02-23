/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Col, Card, Row, Button, Form, Divider, Typography } from 'antd';
import { FiEdit, FiTrash } from 'react-icons/fi';
import AddEditForm from './AddEditForm';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

const { Text } = Typography;
const CardDocumentType = (prop) => {
    const { formData, setfinalFormdata, setIsBtnDisabled, isBtnDisabled, onFieldsChange } = prop;
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
                setfinalFormdata((prev) => {
                    const newList = prev;
                    const indx = prev?.findIndex((el) => el?.partNo === formData?.partNo);
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
            const indx = prev?.findIndex((el) => el?.partNo === val?.partNo);
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

    return (
        <>
            <Card>
                <Row align="middle" className={styles.marB20}>
                    <Col xs={18} sm={18} md={18} lg={18} xl={18} xxl={18}>
                        <Row>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <div>
                                <Text strong>{formData?.partNo}</Text>
                            </div>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <div>
                                <Text type="secondary">
                                    {translateContent('Part Description')} :{formData?.partDescription}
                                </Text>
                            </div>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <div>
                                <Text type="secondary">
                                    {translateContent('Unit Of Measure')} :{formData?.unitOfMeasure}
                                </Text>
                            </div>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <div>
                                <Text type="secondary">
                                    {translateContent('From Bin Location')} :{formData?.fromBinLocation}
                                </Text>
                            </div>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <div>
                                <Text type="secondary">
                                    {translateContent('From Bin Stock')}
                                    {formData?.fromBinStock}
                                </Text>
                            </div>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <div>
                                <Text type="secondary">
                                    {translateContent('Transfer Quantity')}
                                    {formData?.transferQuantity}
                                </Text>
                            </div>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <div>
                                <Text type="secondary">
                                    {translateContent('To Bin Location')}
                                    {formData?.toBinLocation}
                                </Text>
                            </div>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <div>
                                <Text type="secondary">
                                    {translateContent('To Bin Stoc')}
                                    {formData?.toBinStock}
                                </Text>
                            </div>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <div>
                                <Text type="secondary">
                                    {translateContent('Part Description')}
                                    {formData?.partDescription}
                                </Text>
                            </div>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <div>
                                <Text type="secondary">
                                    Mark bin location as default
                                    {formData?.defaultBinLocation}
                                </Text>
                            </div>
                        </Col>
                        </Row>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6} className={styles.buttonsGroupRight}>
                        {!isEditing ? (
                            <>
                                <Button disabled={isBtnDisabled} type="link" icon={<FiEdit />} onClick={() => onEdit(formData)} />
                                {!formData?.id?.length > 0 && <Button disabled={isBtnDisabled} onClick={() => handleDeleteDocType(formData)} type="link" icon={<FiTrash />}></Button>}
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
                        <AddEditForm formDate={formData} form={form} isEditing={isEditing} onFieldsChange={onFieldsChange} />
                    </>
                )}
            </Card>
        </>
    );
};

export default CardDocumentType;
