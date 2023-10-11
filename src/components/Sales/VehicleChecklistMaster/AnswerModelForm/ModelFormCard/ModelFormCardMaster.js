/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useReducer, useState, useEffect } from 'react';
import ModelCard from './ModelCard';
import ModelForm from './ModelForm';
import { Card } from 'antd';

export const ModelFormCardMaster = (props) => {
    const { isVisible, modelEditForm, modelForm, modelEdit, setModelEdit, modelData, setModelData, modelGroupData, setFormBtnActive } = props;
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [disableSaveButton, setDisableSaveButton] = useState(false);
    const [changeValue, setChangeValue] = useState(null);
    const [uniqueCardEdit, setuniqueCardEdit] = useState(null);
    const [mainFomEdit, setMainFormEdit] = useState(false);
    const [modelSwitch, setModelSwitch] = useState(true);

    const onFinishModelForm = (val) => {
        modelForm.validateFields().then(() => {
            let data = modelForm.getFieldsValue();
            let updateData = { ...data, internalId: Math.floor(Math.random() * 100000000 + 1), id: '' };
            modelData?.length > 0 ? setModelData((item) => [updateData, ...item]) : setModelData([updateData]);
            modelForm.resetFields();
            forceUpdate();
        });
    };

    const cardAttributeProps = {
        modelForm,
        onFinishModelForm,
        forceUpdate,
        isVisible,
        disableSaveButton,
        setDisableSaveButton,
        modelData,
        setModelData,
        changeValue,
        setChangeValue,
        modelEditForm,
        modelEdit,
        setModelEdit,
        uniqueCardEdit,
        setuniqueCardEdit,
        modelSwitch,
        setModelSwitch,
        modelGroupData,
        setFormBtnActive,
    };

    const formProductAttributeProps = {
        ...cardAttributeProps,
    };

    useEffect(() => {
        if (modelEdit) {
            setMainFormEdit(true);
        } else {
            setMainFormEdit(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modelEdit]);

    return (
        <Card style={{ paddingBottom: '16px' }}>
            <ModelForm {...formProductAttributeProps} mainFomEdit={mainFomEdit} />

            {modelData?.length > 0 &&
                modelData?.map((action) => {
                    return <ModelCard {...cardAttributeProps} modelGroupCode={action?.modelGroupCode} checklistModelStatus={action?.checklistModelStatus} status={action?.status} internalId={action?.internalId} id={action?.id} />;
                })}
        </Card>
    );
};
