/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useReducer, useState, useEffect } from 'react';
import AnswerCard from './AnswerCard';
import AnswerForm from './AnswerForm';
import { Card } from 'antd';

export const AnswerFormCardMaster = (props) => {
    const { isVisible, taxCategory, editForm, answerForm, formEdit, setFormEdit, answerData, setAnswerData, buttonData, setButtonData } = props;
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [disableSaveButton, setDisableSaveButton] = useState(false);
    const [changeValue, setChangeValue] = useState(null);
    const [uniqueCardEdit, setuniqueCardEdit] = useState(null);
    const [mainFomEdit, setMainFormEdit] = useState(false);
    const [answerSwitch, setAnswerSwitch] = useState(true);

    const onFinishAnswerForm = (val) => {
        answerForm.validateFields().then(() => {
            let data = answerForm.getFieldsValue();
            let updateData = { ...data, internalId: Math.floor(Math.random() * 100000000 + 1), id: '' };
            setAnswerData((item) => [updateData, ...item]);
            answerForm.resetFields();
            forceUpdate();
        });
    };

    // const handleDescriptionChange = (taxCode) => {
    //     setChangeValue(taxChargeCategoryCodeData?.find((i) => i?.taxCode === taxCode)?.taxDescription);
    //     formEdit ? editForm.setFieldValue('chargeDescription', taxChargeCategoryCodeData?.find((i) => i?.taxCode === taxCode)?.taxDescription) : answerForm.setFieldValue('chargeDescription', taxChargeCategoryCodeData?.find((i) => i?.taxCode === taxCode)?.taxDescription);

    //     let codeFind = {
    //         taxMasterId: taxChargeCategoryCodeData?.find((i) => i?.taxCode === taxCode)?.id,
    //     };
    //     if (formEdit) {
    //         editForm.setFieldsValue(codeFind);
    //     } else {
    //         answerForm.setFieldsValue(codeFind);
    //     }
    // };

    const cardAttributeProps = {
        answerForm,
        onFinishAnswerForm,
        forceUpdate,
        isVisible,
        disableSaveButton,
        setDisableSaveButton,
        answerData,
        setAnswerData,
        changeValue,
        setChangeValue,
        editForm,
        formEdit,
        setFormEdit,
        uniqueCardEdit,
        setuniqueCardEdit,
        buttonData,
        setButtonData,
        answerSwitch,
        setAnswerSwitch,
    };

    const formProductAttributeProps = {
        ...cardAttributeProps,
    };

    useEffect(() => {
        if (taxCategory?.taxCategoryDetail?.length > 0) {
            setAnswerData(() => []);
            let len = taxCategory?.taxCategoryDetail?.length;
            for (let i = 0; i < len; i++) {
                let internalId = Math.floor(Math.random() * 100000000 + 1);
                setAnswerData((item) => [...item, { ...taxCategory?.taxCategoryDetail[i], internalId: internalId }]);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [taxCategory]);

    useEffect(() => {
        if (formEdit) {
            setMainFormEdit(true);
        } else {
            setMainFormEdit(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formEdit]);

    return (
        <Card>
            <AnswerForm {...formProductAttributeProps} mainFomEdit={mainFomEdit} />

            {answerData?.length > 0 &&
                answerData?.map((action) => {
                    return <AnswerCard {...cardAttributeProps} answerCode={action?.answerCode} answerDescription={action?.answerDescription} answerStatus={action?.answerStatus} internalId={action?.internalId} id={action?.id} />;
                })}
        </Card>
    );
};
