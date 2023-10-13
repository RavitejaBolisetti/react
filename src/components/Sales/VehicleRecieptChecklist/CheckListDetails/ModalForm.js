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
import { BindFormAndResult } from './CheckListUtils';
import { convertDateTimedayjs, formatDateToCalenderDate } from 'utils/formatDateTime';

import styles from 'assets/sass/app.module.scss';

export const ChecklistModalForms = (props) => {
    const { AdvanceformData, setAdvanceformData } = props;
    const { onCloseAction, handleFormValueChange, checkListDataModified, setcheckListDataModified, aggregateForm } = props;
    const { setAdvanceSearchVisible } = props;
    const { isVisible, setisEditing } = props;
    const { setPage, pageIntialState } = props;
    const [saveDisabled, setsaveDisabled] = useState(true);
    const { TextArea } = Input;

    useEffect(() => {
        if (AdvanceformData && isVisible) {
            aggregateForm.setFieldsValue({ ...AdvanceformData, answerFromDate: formatDateToCalenderDate(AdvanceformData?.answerFromDate), answerToDate: formatDateToCalenderDate(AdvanceformData?.answerToDate) });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [AdvanceformData, isVisible]);

    const onFinish = () => {
        aggregateForm
            .validateFields()
            .then((values) => {
                const data = { ...AdvanceformData, ...values, ismodified: true, checkResult: BindFormAndResult({ data: { ...values, answerType: AdvanceformData?.answerType, checklistAnswerResponses: AdvanceformData?.checklistAnswerResponses, answerToDate: convertDateTimedayjs(values?.answerToDate), answerFromDate: convertDateTimedayjs(values?.answerFromDate) } }, aggregateForm)?.checkResult };
                setcheckListDataModified(
                    [...checkListDataModified]?.map((element) => {
                        if (element?.ansMstId === AdvanceformData?.ansMstId) {
                            return data;
                        }
                        return element;
                    })
                );
                setPage((prev) => ({ pageIntialState, current: prev?.current }));
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
                    {BindFormAndResult({ data: AdvanceformData, aggregateForm })?.formItem}
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.textareaError}>
                    <Form.Item label="Remarks" name="checklistDescription" rules={[validateRequiredInputField('Remarks')]}>
                        <TextArea placeholder={preparePlaceholderText('Remarks')} autoSize={{ minRows: 3, maxRows: 5 }} maxLength={300} showCount />
                    </Form.Item>
                    <Form.Item name="id" hidden></Form.Item>
                </Col>
            </Row>
            <ModalButtons {...modalProps} />
        </Form>
    );
};

export const ModalForm = withModal(ChecklistModalForms, {});
