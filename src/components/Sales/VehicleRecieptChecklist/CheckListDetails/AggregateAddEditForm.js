/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Col, Input, Form, Row, DatePicker, InputNumber } from 'antd';

import { withModal } from 'components/withModal';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';

import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { ModalButtons } from 'components/common/Button';
import { customSelectBox } from 'utils/customSelectBox';

import moment from 'moment';
import styles from 'components/common/Common.module.css';

export const AdvanceForm = (props) => {
    const { AdvanceformData, setAdvanceformData } = props;
    const { onCloseAction, handleFormValueChange, checkListDataModified, setcheckListDataModified, aggregateForm } = props;
    const { setAdvanceSearchVisible } = props;
    const { isVisible, setisEditing } = props;

    const { TextArea } = Input;

    const BindFormItems = (props) => {
        const { checklistType } = props;
        switch (checklistType) { 
            case 'Input': {
                return (
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item label="Check Result" name="text" rules={[validateRequiredInputField('checkResult')]}>
                                <Input maxLength={30} placeholder={preparePlaceholderText('Check Result')} />
                            </Form.Item>
                        </Col>
                    </Row>
                );
            }
            case 'Number': {
                return (
                    <Row gutter={20}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item label="Min Range" name="fromNumber" rules={[validateRequiredInputField('min range')]}>
                                <InputNumber min={1} max={10} placeholder={preparePlaceholderText('Min Range')} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item label="Max Range" name="toNumber" rules={[validateRequiredInputField('max range')]}>
                                <InputNumber placeholder={preparePlaceholderText('Max Range')} min={1} max={10} />
                            </Form.Item>
                        </Col>
                    </Row>
                );
            }
            case 'Date': {
                return (
                    <Row gutter={20}>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item label="From Date" name="fromDate" rules={[validateRequiredSelectField('From Date')]} className={styles?.datePicker}>
                                <DatePicker placeholder={preparePlaceholderSelect('from date')} onChange={() => aggregateForm.setFieldsValue({ toDate: undefined })} disabledDate={(current) => current.isBefore(moment().subtract(1, 'day'))} />
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item label="To Date" name="toDate" rules={[validateRequiredSelectField('To Date')]} className={styles?.datePicker}>
                                <DatePicker placeholder={preparePlaceholderSelect('to date')} disabledDate={(current) => current < aggregateForm?.getFieldValue('fromDate')} />
                            </Form.Item>
                        </Col>
                    </Row>
                );
            }
            case 'boolean': {
                return (
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item label="Check Result" name="boolean" rules={[validateRequiredInputField('checkResult')]}>
                                {customSelectBox({
                                    data: [
                                        { key: true, value: 'Yes' },
                                        { key: false, value: 'No' },
                                    ],
                                    placeholder: preparePlaceholderSelect('Check Result'),
                                    fieldNames: { key: 'key', value: 'value' },
                                })}
                            </Form.Item>
                        </Col>
                    </Row>
                );
            }
            default: {
                return false;
            }
        }
    };
    useEffect(() => {
        console.log('AdvanceformData', AdvanceformData);
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
                    {BindFormItems(AdvanceformData)}
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
        </Form>
    );
};

export const AggregateAddEditForm = withModal(AdvanceForm, {});
