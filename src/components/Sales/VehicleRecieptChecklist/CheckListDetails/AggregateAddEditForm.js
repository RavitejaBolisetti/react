/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Col, Input, Form, Row, DatePicker } from 'antd';

import { withModal } from 'components/withModal';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

import { validateRequiredInputField } from 'utils/validation';
import { ModalButtons } from 'components/common/Button';

export const AdvanceForm = (props) => {
    const { AdvanceformData, setAdvanceformData } = props;
    const { onCloseAction, handleFormValueChange, checkListDataModified, setcheckListDataModified, aggregateForm } = props;
    const { setAdvanceSearchVisible } = props;
    const { isVisible, setisEditing } = props;
    const InputGroup = Input.Group;
    const { RangePicker } = DatePicker;
    const { TextArea } = Input;

    const bindFormItems = (props) => {
        const { formItemType } = props;
        switch (formItemType) {
            case 'input': {
                return (
                    <Form.Item label="Check Result" name="checkResult" rules={[validateRequiredInputField('checkResult')]}>
                        <Input maxLength={30} placeholder={preparePlaceholderText('Check Result')} />
                    </Form.Item>
                );
            }
            case 'numberRange': {
                return (
                    <Form.Item label="Check Result" name="checkResult" rules={[validateRequiredInputField('checkResult')]}>
                        <InputGroup compact>
                            <Input placeholder="Minimum" />
                            <Input placeholder="~" disabled />
                            <Input placeholder="Maximum" />
                        </InputGroup>
                    </Form.Item>
                );
            }
            case 'datePicker': {
                return (
                    <Form.Item label="Check Result" name="checkResult" rules={[validateRequiredInputField('checkResult')]}>
                        <RangePicker
                            showTime={{
                                format: 'HH:mm',
                            }}
                            format="YYYY-MM-DD HH:mm"
                        />
                    </Form.Item>
                );
            }
            default: {
                return false;
            }
        }
    };
    useEffect(() => {
        if (AdvanceformData && isVisible) {
            aggregateForm.setFieldsValue({
                checkResult: AdvanceformData?.checkResult ?? '',
                Remarks: AdvanceformData?.Remarks ?? '',
                id: AdvanceformData?.id ?? '',
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [AdvanceformData]);

    const onFinish = () => {
        aggregateForm
            .validateFields()
            .then(() => {
                const values = aggregateForm.getFieldsValue();
                const data = { ...AdvanceformData, ...values, isEdited: true };
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
    const modalProps = {
        reset: true,
        submit: true,
        resetName: 'Cancel',
        submitName: 'Save',
        handleResetFilter: onCloseAction,
        htmltype: false,
        onClickAction: onFinish,
    };

    return (
        <Form autoComplete="off" layout="vertical" form={aggregateForm} onFinishFailed={onFinishFailed}>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            {bindFormItems(AdvanceformData)}
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <Form.Item label="Remarks" name="Remarks" rules={[validateRequiredInputField('Remarks')]}>
                                <TextArea placeholder={preparePlaceholderText('Remarks')} autoSize={{ minRows: 3, maxRows: 5 }} />
                            </Form.Item>
                            <Form.Item name="id" hidden></Form.Item>
                        </Col>
                    </Row>
                    <ModalButtons {...modalProps} />
                </Col>
            </Row>
        </Form>
    );
};

export const AggregateAddEditForm = withModal(AdvanceForm, {});
