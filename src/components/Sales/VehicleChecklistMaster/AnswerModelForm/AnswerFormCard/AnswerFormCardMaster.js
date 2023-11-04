/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useReducer, useState, useEffect } from 'react';
import AnswerCard from './AnswerCard';
import AnswerForm from './AnswerForm';
import { Card } from 'antd';
import { translateContent } from 'utils/translateContent';

export const AnswerFormCardMaster = (props) => {
    const { isVisible, editForm, answerForm, formEdit, setFormEdit, answerData, setAnswerData, setFormBtnActive, showGlobalNotification } = props;
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [disableSaveButton, setDisableSaveButton] = useState(false);
    const [changeValue, setChangeValue] = useState(null);
    const [uniqueCardEdit, setuniqueCardEdit] = useState(null);
    const [mainFomEdit, setMainFormEdit] = useState(false);
    const [answerSwitch, setAnswerSwitch] = useState(true);

    const onFinishAnswerForm = (val) => {
        answerForm
            .validateFields()
            .then(() => {
                let data = answerForm.getFieldsValue();
                let updateData = { ...data, internalId: Math.floor(Math.random() * 100000000 + 1), id: '' };
                if (answerData?.length > 0) {
                    if (answerData?.find((e) => e?.answerCode?.toLowerCase() === updateData?.answerCode?.toLowerCase())) {
                        showGlobalNotification({ notificationType: 'error', title: translateContent('global.notificationError.title'), message: translateContent('vehicleCheckListMaster.validationMessage.answerCodeExist') });
                        return;
                    } else if (answerData?.find((e) => e?.answerTitle?.toLowerCase() === updateData?.answerTitle?.toLowerCase())) {
                        showGlobalNotification({ notificationType: 'error', title: translateContent('global.notificationError.title'), message: translateContent('vehicleCheckListMaster.validationMessage.answerDescriptionExist') });
                        return;
                    } else {
                        setAnswerData((item) => [updateData, ...item]);
                        answerForm.resetFields();
                        setFormBtnActive(true);
                    }
                } else {
                    setAnswerData([updateData]);
                    answerForm.resetFields();
                    setFormBtnActive(true);
                }
            })
            .catch((err) => console.error(err));
    };

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
        setFormBtnActive,
        answerSwitch,
        setAnswerSwitch,
    };

    const formProductAttributeProps = {
        ...cardAttributeProps,
    };

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
                    return <AnswerCard {...cardAttributeProps} answerCode={action?.answerCode} answerTitle={action?.answerTitle} answerStatus={action?.answerStatus} internalId={action?.internalId} id={action?.id} />;
                })}
        </Card>
    );
};
