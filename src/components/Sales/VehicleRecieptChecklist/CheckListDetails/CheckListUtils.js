/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { convertDateMonthYearDayjs, formatDateToCalenderDate } from 'utils/formatDateTime';
import { Col, Input, Form, Row, DatePicker, InputNumber } from 'antd';

import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';

import { validateRequiredInputField, validateRequiredSelectField, validateNegativeNumber } from 'utils/validation';
import { customSelectBox } from 'utils/customSelectBox';

import moment from 'moment';
import styles from 'components/common/Common.module.css';
export const FORMTYPE_CONSTANTS = {
    DATE: {
        id: 'date',
        name: 'Date',
    },
    NUMBER: {
        id: 'number',
        name: 'Number',
    },
    BOOLEAN: {
        id: 'boolean',
        name: 'Boolean',
    },
    INPUT: {
        id: 'text',
        name: 'Input',
    },
};
export const MakeCheckResult = (props) => {
    const { type, data } = props;
    let checkResult = '';
    switch (type) {
        case FORMTYPE_CONSTANTS?.DATE?.id: {
            checkResult = checkResult.concat(convertDateMonthYearDayjs(data?.answerFromDate));
            checkResult = checkResult.concat('-');
            checkResult = checkResult.concat(convertDateMonthYearDayjs(data?.answerToDate));
            return checkResult;
        }

        case FORMTYPE_CONSTANTS?.BOOLEAN?.id: {
            if (data?.answerBoolean) return 'Yes';
            return 'No';
        }
        case FORMTYPE_CONSTANTS?.NUMBER?.id: {
            checkResult = checkResult.concat(data?.answerFromNumber);
            checkResult = checkResult.concat('-');
            checkResult = checkResult.concat(data?.answerToNumber);
            return checkResult;
        }
        case FORMTYPE_CONSTANTS?.INPUT?.id: {
            return data?.answerText;
        }
    }
};
export const setCheckresultValue = (props) => {
    const { form, type, data } = props;
    form.setFieldsValue({ ...data, answerFromDate: formatDateToCalenderDate(data?.answerFromDate), answerToDate: formatDateToCalenderDate(data?.answerToDate) });
};
export const BindFormItems = ({ AdvanceformData, aggregateForm }) => {
    const { answerType } = AdvanceformData;
    switch (answerType) {
        case FORMTYPE_CONSTANTS?.INPUT?.id: {
            return (
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Form.Item label="Check Result" name="answerText" rules={[validateRequiredInputField('checkResult')]}>
                            <Input maxLength={30} placeholder={preparePlaceholderText('Check Result')} />
                        </Form.Item>
                    </Col>
                </Row>
            );
        }
        case FORMTYPE_CONSTANTS?.NUMBER?.id: {
            return (
                <Row gutter={20}>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Form.Item label="Min Range" name="answerFromNumber" rules={[validateRequiredInputField('min range'), validateNegativeNumber('min range')]}>
                            <InputNumber className={styles.fullWidth} placeholder={preparePlaceholderText('Min Range')} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Form.Item
                            label="Max Range"
                            name="answerToNumber"
                            rules={[
                                validateRequiredInputField('max range'),
                                validateNegativeNumber('max range'),
                                {
                                    validator: (_, value) => {
                                        if (!value) return;
                                        if (value < aggregateForm.getFieldValue('answerFromNumber')) {
                                            return Promise.reject(`Max range can't be less than Min Range`);
                                        }
                                        return Promise.resolve();
                                    },
                                },
                            ]}
                        >
                            <InputNumber className={styles.fullWidth} placeholder={preparePlaceholderText('Max Range')} />
                        </Form.Item>
                    </Col>
                </Row>
            );
        }
        case FORMTYPE_CONSTANTS?.DATE?.id: {
            return (
                <Row gutter={20}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item label="From Date" name="answerFromDate" rules={[validateRequiredSelectField('From Date')]} className={styles?.datePicker}>
                            <DatePicker placeholder={preparePlaceholderSelect('from date')} onChange={() => aggregateForm.setFieldsValue({ answerToDate: undefined })} disabledDate={(current) => current.isBefore(moment().subtract(1, 'day'))} />
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item label="To Date" name="answerToDate" rules={[validateRequiredSelectField('To Date')]} className={styles?.datePicker}>
                            <DatePicker placeholder={preparePlaceholderSelect('to date')} disabledDate={(current) => current < aggregateForm?.getFieldValue('answerFromDate')} />
                        </Form.Item>
                    </Col>
                </Row>
            );
        }
        case FORMTYPE_CONSTANTS?.BOOLEAN?.id: {
            return (
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Form.Item label="Check Result" name="answerBoolean" rules={[validateRequiredInputField('checkResult')]}>
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
