/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Card, Row, Col, Button, Divider, Typography, Space } from 'antd';
import { FiEdit, FiTrash } from 'react-icons/fi';
import styles from 'assets/sass/app.module.scss';

import ModelForm from './ModelForm';

const { Text } = Typography;

const ModelCard = (props) => {
    const { finalFormdata, forceUpdate, modelData, setModelData, setOpenAccordian, changeValue, setChangeValue, modelForm, modelEdit, setModelEdit, uniqueCardEdit, setuniqueCardEdit, internalId, formActionType, modelSwitch, setModelSwitch, modelGroupData, modelEditForm, setFormBtnActive } = props;
    const modelName = modelGroupData?.find((e) => e?.modelGroupCode === props?.modelGroupCode)?.modelGroupDescription;
    let id = props?.id ? props?.id : props?.internalId;
    let IdType = props?.id ? 'id' : 'internalId';
    const onModelEdit = (props) => {
        setuniqueCardEdit(id);
        setModelEdit(true);
        setFormBtnActive(true);
        setModelSwitch(props?.checklistModelStatus);

        modelEditForm.setFieldsValue({
            modelGroupCode: props?.modelGroupCode,
            checklistModelStatus: props?.checklistModelStatus,
            internalId: props?.internalId,
            id: props?.id,
        });
    };

    const modelSave = () => {
        let newFormData = modelEditForm?.getFieldsValue();
        let id = newFormData?.id ? newFormData?.id : newFormData?.internalId;
        const upd_obj = modelData?.map((obj) => {
            let idType = newFormData?.id ? 'id' : 'internalId';
            if (obj[idType] === id) {
                obj.modelGroupCode = newFormData?.modelGroupCode;
                obj.checklistModelStatus = newFormData?.checklistModelStatus;
                obj.internalId = newFormData?.internalId;
                obj.id = newFormData?.id;
            }
            return obj;
        });

        setModelData([...upd_obj]);
        setModelEdit(false);
        forceUpdate();
    };

    const modelDelete = (val) => {
        setModelData((prev) => {
            const indx = prev.findIndex((el) => el?.internalId === val?.internalId);
            let updatedValue = prev;
            updatedValue?.splice(indx, 1);
            return updatedValue;
        });

        setModelEdit(false);
        modelForm.resetFields();
        forceUpdate();
    };

    const modelCancel = () => {
        setModelEdit(false);
    };

    const FormProductAttributeProp = {
        modelForm,
        finalFormdata,
        modelEdit,
        setOpenAccordian,
        changeValue,
        setChangeValue,
        internalId,
        modelSwitch,
        setModelSwitch,
        modelGroupData,
        modelData,
        modelEditForm,
    };

    return (
        <Card>
            <Row align="middle" justify="space-between" className={styles.marB20}>
                <Col xs={24} sm={24} md={18} lg={18} xl={18} xxl={18}>
                    <Space direction="vertical">
                        <Text>{modelName}</Text>
                        <Text>{props?.status === true ? 'Active' : 'Inactive'}</Text>
                    </Space>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6} className={styles.buttonsGroupRight}>
                    {formActionType !== 'view' ? (
                        <>
                            {!modelEdit && (
                                <>
                                    <Button
                                        type="link"
                                        icon={<FiEdit />}
                                        onClick={() => {
                                            onModelEdit(props);
                                        }}
                                    />
                                    <Button onClick={() => modelDelete(props)} type="link" icon={<FiTrash />} disabled={props?.internalId ? false : true} />
                                </>
                            )}
                            {modelEdit && props[IdType] === uniqueCardEdit && (
                                <>
                                    <Button type="link" onClick={modelSave}>
                                        Save
                                    </Button>
                                    <Button type="link" onClick={modelCancel}>
                                        Cancel
                                    </Button>
                                </>
                            )}
                        </>
                    ) : null}
                </Col>
            </Row>

            {modelEdit && props[IdType] === uniqueCardEdit && (
                <>
                    <Divider />
                    <ModelForm {...FormProductAttributeProp} />
                </>
            )}
        </Card>
    );
};

export default ModelCard;
