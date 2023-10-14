/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Card, Row, Col, Button, Divider, Typography, Space } from 'antd';
import { FiEdit, FiTrash } from 'react-icons/fi';
import styles from 'assets/sass/app.module.scss';

import AnswerForm from './AnswerForm';

const { Text } = Typography;

const AnswerCard = (props) => {
    const { finalFormdata, answerForm, forceUpdate, answerData, setAnswerData, setOpenAccordian, changeValue, setChangeValue, editForm, formEdit, setFormEdit, uniqueCardEdit, setuniqueCardEdit, internalId, formActionType, answerSwitch, setAnswerSwitch, setFormBtnActive } = props;
    let id = props?.id ? props?.id : props?.internalId;
    let IdType = props?.id ? 'id' : 'internalId';
    const answerEdit = (props) => {
        setuniqueCardEdit(id);
        setFormEdit(true);
        setFormBtnActive(true);
        setAnswerSwitch(props?.answerStatus);
        editForm.setFieldsValue({
            answerCode: props?.answerCode,
            answerTitle: props?.answerTitle,
            answerStatus: props?.answerStatus,
            internalId: props?.internalId,
            id: props?.id,
        });
    };

    const answerSave = () => {
        let newFormData = editForm?.getFieldsValue();
        const upd_obj = answerData?.map((obj) => {
            if (obj[IdType] === id) {
                obj.answerCode = newFormData?.answerCode;
                obj.answerTitle = newFormData?.answerTitle;
                obj.answerStatus = newFormData?.answerStatus;
                obj.internalId = newFormData?.internalId;
                obj.id = newFormData?.id;
            }
            return obj;
        });

        setAnswerData([...upd_obj]);
        setFormEdit(false);
        forceUpdate();
    };

    const answerDelete = (val) => {
        setAnswerData((prev) => {
            const indx = prev.findIndex((el) => el.internalId === val?.internalId);
            let updatedValue = prev;
            updatedValue?.splice(indx, 1);
            return updatedValue;
        });

        setFormEdit(false);
        answerForm.resetFields();
        forceUpdate();
    };

    const answerCancel = () => {
        setFormEdit(false);
    };

    const FormProductAttributeProp = {
        editForm,
        finalFormdata,
        formEdit,
        answerForm,
        setOpenAccordian,
        changeValue,
        setChangeValue,
        internalId,
        answerSwitch,
        setAnswerSwitch,
        setFormBtnActive,
    };

    return (
        <Card>
            <Row align="middle" justify="space-between" className={styles.marB20}>
                <Col xs={24} sm={24} md={18} lg={18} xl={18} xxl={18}>
                    <Space direction="vertical">
                        <Text>{props?.answerCode}</Text>
                        <Text>{props?.answerTitle}</Text>

                        <Text>{props?.answerStatus === true ? 'Active' : 'InActive'}</Text>
                    </Space>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6} className={styles.buttonsGroupRight}>
                    {formActionType !== 'view' ? (
                        <>
                            {!formEdit && (
                                <>
                                    <Button
                                        type="link"
                                        icon={<FiEdit />}
                                        onClick={() => {
                                            answerEdit(props);
                                        }}
                                    />
                                    <Button onClick={() => answerDelete(props)} type="link" icon={<FiTrash />} disabled={props?.internalId ? false : true} />
                                </>
                            )}
                            {formEdit && props[IdType] === uniqueCardEdit && (
                                <>
                                    <Button type="link" onClick={answerSave}>
                                        Save
                                    </Button>
                                    <Button type="link" onClick={answerCancel}>
                                        Cancel
                                    </Button>
                                </>
                            )}
                        </>
                    ) : null}
                </Col>
            </Row>

            {formEdit && props[IdType] === uniqueCardEdit && (
                <>
                    <Divider />
                    <AnswerForm {...FormProductAttributeProp} />
                </>
            )}
        </Card>
    );
};

export default AnswerCard;
