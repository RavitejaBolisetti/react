/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Col, Input, Form, Row } from 'antd';

import { withModal } from 'components/withModal';
import { ModalButtons } from 'components/common/Button';

import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { validateRequiredInputField } from 'utils/validation';
import { convertDateTimedayjs } from 'utils/formatDateTime';
import { MakeCheckResult, setCheckresultValue, BindFormItems } from './CheckListUtils';

import styles from 'assets/sass/app.module.scss';

export const ChecklistModalForms = (props) => {
    const { AdvanceformData, setAdvanceformData, isReadonly = true } = props;
    const { onCloseAction, handleFormValueChange, checkListDataModified, setcheckListDataModified, aggregateForm, setRequestPayload, selectedOrder } = props;
    const { setAdvanceSearchVisible } = props;
    const { isVisible, setisEditing } = props;
    const [saveDisabled, setsaveDisabled] = useState(true);

    const disabledProps = { disabled: true };

    const { TextArea } = Input;
    useEffect(() => {
        if (AdvanceformData && isVisible) {
            setCheckresultValue({ form: aggregateForm, type: AdvanceformData?.answerType, data: AdvanceformData });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [AdvanceformData]);

    const onFinish = () => {
        aggregateForm
            .validateFields()
            .then(() => {
                const values = aggregateForm.getFieldsValue();
                const data = { ...AdvanceformData, ...values, ismodified: true, checkResult: MakeCheckResult({ type: AdvanceformData?.answerType, data: { ...values, checklistAnswerResponses: AdvanceformData?.checklistAnswerResponses, answerToDate: convertDateTimedayjs(values?.answerToDate), answerFromDate: convertDateTimedayjs(values?.answerFromDate) } }) };
                const newArr = [...checkListDataModified]?.map((element) => {
                    if (element?.id === AdvanceformData?.id) {
                        return data;
                    }
                    return element;
                });
                setcheckListDataModified(newArr);
                setRequestPayload((prev) => ({ ...prev, vehicleDeliveryCheckList: { vin: prev?.vehicleDetails?.vinNumber, deliveryChecklistDtos: newArr?.filter((i) => i?.ismodified) } }));
                setAdvanceSearchVisible(false);
                handleFormValueChange();
                setisEditing(false);
                setAdvanceformData();
            })
            .catch((err) => {});
    };
    const onFinishFailed = () => {
        return;
    };
    const handleValuesChange = () => {
        setsaveDisabled(false);
    };
    const modalProps = {
        reset: true,
        submit: true,
        resetName: 'Cancel',
        submitName: 'Save',
        handleResetFilter: onCloseAction,
        htmltype: false,
        onClickAction: onFinish,
        saveDisabled: saveDisabled,
    };

    return (
        <Form autoComplete="off" layout="vertical" form={aggregateForm} onValuesChange={handleValuesChange} onFinishFailed={onFinishFailed}>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    {BindFormItems({ AdvanceformData, aggregateForm, data: AdvanceformData })}
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.textareaError}>
                    <Form.Item label="Details" name="checklistDescription" rules={[validateRequiredInputField('Details')]}>
                        <TextArea placeholder={preparePlaceholderText('Details')} autoSize={{ minRows: 3, maxRows: 5 }} maxLength={300} showCount {...disabledProps} />
                    </Form.Item>
                    <Form.Item name="id" hidden></Form.Item>
                </Col>
            </Row>
            <ModalButtons {...modalProps} />
        </Form>
    );
};

export const ModalForm = withModal(ChecklistModalForms, {});
