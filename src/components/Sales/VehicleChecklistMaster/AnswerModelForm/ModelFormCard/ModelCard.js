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
    const { finalFormdata, forceUpdate, modelData, setModelData, setOpenAccordian, changeValue, setChangeValue, modelForm, modelEdit, setModelEdit, uniqueCardEdit, setuniqueCardEdit, internalId, formActionType, modelSwitch, setModelSwitch, modelGroupData, modelEditForm, setButtonData, buttonData, setFormBtnActive } = props;
    const modelName = modelGroupData?.find((e) => e?.modelGroupCode === props?.modelGroupCode)?.modelGroupDescription;
    console.log(`props`, props);
    const onModelEdit = (props) => {
        setuniqueCardEdit(props?.internalId);
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
        const upd_obj = modelData?.map((obj) => {
            if (obj?.internalId === newFormData?.internalId) {
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
            const indx = prev.findIndex((el) => el.internalId === val?.internalId);
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
                        <Text>{props?.checklistModelStatus === true || props?.status === true ? 'Active' : 'InActive'}</Text>
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
                                    <Button onClick={() => modelDelete(props)} type="link" icon={<FiTrash />} disabled={props?.id ? true : false} />
                                </>
                            )}
                            {modelEdit && props?.internalId === uniqueCardEdit && (
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

            {modelEdit && props?.internalId === uniqueCardEdit && (
                <>
                    <Divider />
                    <ModelForm {...FormProductAttributeProp} />
                </>
            )}
        </Card>
    );
};

export default ModelCard;
