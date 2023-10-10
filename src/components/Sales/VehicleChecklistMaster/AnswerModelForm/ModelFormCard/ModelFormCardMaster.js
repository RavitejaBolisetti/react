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
    const { isVisible, modelEditForm, modelForm, modelEdit, setModelEdit, modelData, setModelData, modelGroupData } = props;
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
            setModelData((item) => [updateData, ...item]);
            modelForm.resetFields();
            forceUpdate();
        });
    };

    // const handleDescriptionChange = (taxCode) => {
    //     setChangeValue(taxChargeCategoryCodeData?.find((i) => i?.taxCode === taxCode)?.taxDescription);
    //     modelEdit ? modelEditForm.setFieldValue('chargeDescription', taxChargeCategoryCodeData?.find((i) => i?.taxCode === taxCode)?.taxDescription) : modelForm.setFieldValue('chargeDescription', taxChargeCategoryCodeData?.find((i) => i?.taxCode === taxCode)?.taxDescription);

    //     let codeFind = {
    //         taxMasterId: taxChargeCategoryCodeData?.find((i) => i?.taxCode === taxCode)?.id,
    //     };
    //     if (modelEdit) {
    //         modelEditForm.setFieldsValue(codeFind);
    //     } else {
    //         modelForm.setFieldsValue(codeFind);
    //     }
    // };

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
    };

    const formProductAttributeProps = {
        ...cardAttributeProps,
    };

    // useEffect(() => {
    //     if (taxCategory?.taxCategoryDetail?.length > 0) {
    //         setModelData(() => []);
    //         let len = taxCategory?.taxCategoryDetail?.length;
    //         for (let i = 0; i < len; i++) {
    //             let internalId = Math.floor(Math.random() * 100000000 + 1);
    //             setModelData((item) => [...item, { ...taxCategory?.taxCategoryDetail[i], internalId: internalId }]);
    //         }
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [taxCategory]);

    useEffect(() => {
        if (modelEdit) {
            setMainFormEdit(true);
        } else {
            setMainFormEdit(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modelEdit]);

    return (
        <Card>
            <ModelForm {...formProductAttributeProps} mainFomEdit={mainFomEdit} />

            {modelData?.length > 0 &&
                modelData?.map((action) => {
                    return <ModelCard {...cardAttributeProps} modelGroupCode={action?.modelGroupCode} checklistModelStatus={action?.checklistModelStatus} internalId={action?.internalId} id={action?.id} />;
                })}
        </Card>
    );
};
