/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Col, Input, Form, Row, DatePicker, InputNumber } from 'antd';

import { withModal } from 'components/withModal';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';

import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { ModalButtons } from 'components/common/Button';


import { MakeCheckResult, setCheckresultValue, BindFormItems } from './CheckListUtils';

export const AdvanceForm = (props) => {
    const { AdvanceformData, setAdvanceformData } = props;
    const { onCloseAction, handleFormValueChange, checkListDataModified, setcheckListDataModified, aggregateForm } = props;
    const { setAdvanceSearchVisible } = props;
    const { isVisible, setisEditing } = props;
    const [saveDisabled, setsaveDisabled] = useState(true);

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
                const data = { ...AdvanceformData, ...values, ismodified: true, checkResult: MakeCheckResult({ type: AdvanceformData?.checklistType, data: values }) };
                const newarr = [...checkListDataModified];
                newarr[AdvanceformData?.index] = data;
                setcheckListDataModified(newarr);
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
                    {BindFormItems({ AdvanceformData, aggregateForm })}
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Form.Item label="Remarks" name="checklistDescription" rules={[validateRequiredInputField('Remarks')]}>
                        <TextArea placeholder={preparePlaceholderText('Remarks')} autoSize={{ minRows: 3, maxRows: 5 }} />
                    </Form.Item>
                    <Form.Item name="id" hidden></Form.Item>
                </Col>
            </Row>
            <ModalButtons {...modalProps} />
        </Form>
    );
};

export const AggregateAddEditForm = withModal(AdvanceForm, {});
