/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import moment from 'moment';

import { Col, Input, Form, Row, DatePicker, InputNumber, Select, Switch } from 'antd';

import { convertDateTimedayjs, dateFormatView } from 'utils/formatDateTime';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { validateRequiredInputField, validateRequiredSelectField, validateNegativeNumber } from 'utils/validation';
import { FORMTYPE_CONSTANTS } from 'constants/FormtypeConstants';
import styles from 'assets/sass/app.module.scss';

export const BindFormAndResult = ({ data, aggregateForm, deliveryChecklist = false }) => {
    const UniqueAnsType = data?.answerType?.toLowerCase() && data?.answerType?.toLowerCase();
    const noDataAvalaible = 'NA';
    let checkResult = '';
    let formItem = (
        <Row gutter={20}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Form.Item label="Check Result" name="answerText" rules={[validateRequiredInputField('checkResult')]}>
                    <Input maxLength={30} placeholder={preparePlaceholderText('Check Result')} />
                </Form.Item>
            </Col>
        </Row>
    );
    switch (UniqueAnsType) {
        case FORMTYPE_CONSTANTS?.DATE_RANGE?.id?.toLowerCase(): {
            if (data?.answerFromDate && data?.answerToDate) {
                checkResult = checkResult.concat(data?.answerFromDate ? convertDateTimedayjs(data?.answerFromDate, dateFormatView) : 'NA');
                checkResult = checkResult.concat('-');
                checkResult = checkResult.concat(data?.answerToDate ? convertDateTimedayjs(data?.answerToDate, dateFormatView) : 'NA');
            } else {
                checkResult = noDataAvalaible;
            }
            formItem = (
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
            break;
        }

        case FORMTYPE_CONSTANTS?.TOGGLE_GROUP?.id?.toLowerCase(): {
            if (data?.answerBoolean === undefined || data?.answerBoolean === null || data?.answerBoolean === '') {
                checkResult = noDataAvalaible;
            } else if (data?.answerBoolean) {
                checkResult = 'Yes';
            } else {
                checkResult = 'No';
            }
            formItem = (
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Form.Item rules={[validateRequiredSelectField('')]} valuePropName="checked" initialValue={data?.answerBoolean ? true : false} labelAlign="left" wrapperCol={{ span: 24 }} name="answerBoolean" label="Check Result">
                            <Switch checkedChildren="Yes" unCheckedChildren="No" defaultChecked={data?.answerBoolean ? true : false} onChange={(checked) => (checked ? true : false)} />
                        </Form.Item>
                    </Col>
                </Row>
            );
            break;
        }
        case FORMTYPE_CONSTANTS?.NUMBER_RANGE_WITHOUT_DECIMAL?.id?.toLowerCase(): {
            if (data?.answerFromNumber && data?.answerToNumber) {
                checkResult = checkResult.concat(data?.answerFromNumber ?? 'NA');
                checkResult = checkResult.concat('-');
                checkResult = checkResult.concat(data?.answerToNumber ?? 'NA');
            } else {
                checkResult = noDataAvalaible;
            }
            formItem = (
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
            break;
        }
        case FORMTYPE_CONSTANTS?.FIXED_OPTIONS?.id?.toLowerCase(): {
            const AnswerResponseSelction = (value, valueObj) => {
                if (!value) return false;
                aggregateForm.setFieldValue('answerDescription', valueObj?.answerDescription);
            };
            if (data?.answerText) {
                if (Array?.isArray(data?.checklistAnswerResponses) && data?.checklistAnswerResponses?.length) checkResult = data?.checklistAnswerResponses?.find((i) => i?.answerCode === data?.answerText)?.answerDescription;
                else {
                    checkResult = data?.answerText;
                }
            } else {
                checkResult = noDataAvalaible;
            }
            formItem = (
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Form.Item label="Check Result" name="answerText" rules={[validateRequiredSelectField('Check Result')]}>
                            <Select optionFilterProp="answerDescription" options={data?.checklistAnswerResponses} placeholder={preparePlaceholderSelect('Check Result')} fieldNames={{ label: 'answerDescription', value: 'answerCode' }} allowClear showSearch onChange={AnswerResponseSelction} />
                        </Form.Item>
                        <Form.Item initialValue={data?.answerDescription} name="answerDescription" hidden />
                    </Col>
                </Row>
            );
            break;
        }
        case FORMTYPE_CONSTANTS?.OPEN_TEXT?.id?.toLowerCase(): {
            checkResult = data?.answerText ?? noDataAvalaible;
            formItem = (
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Form.Item label="Check Result" name="answerText" rules={[validateRequiredInputField('checkResult')]}>
                            <Input maxLength={30} placeholder={preparePlaceholderText('Check Result')} />
                        </Form.Item>
                    </Col>
                </Row>
            );
            break;
        }
        case FORMTYPE_CONSTANTS?.NUMBER_WITHOUT_DECIMAL?.id?.toLowerCase(): {
            checkResult = data?.answerText ?? noDataAvalaible;
            formItem = (
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Form.Item label="Number" name="answerText" rules={[validateRequiredInputField('Number'), validateNegativeNumber('Number')]}>
                            <InputNumber className={styles.fullWidth} placeholder={preparePlaceholderText('Number')} />
                        </Form.Item>
                    </Col>
                </Row>
            );
            break;
        }
        case FORMTYPE_CONSTANTS?.NUMBER_WITH_DECIMAL?.id?.toLowerCase(): {
            checkResult = data?.answerText ?? noDataAvalaible;
            formItem = (
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Form.Item label="Number" name="answerText" rules={[validateRequiredInputField('Number'), validateNegativeNumber('Number')]}>
                            <InputNumber className={styles.fullWidth} precision={2} placeholder={preparePlaceholderText('Number')} />
                        </Form.Item>
                    </Col>
                </Row>
            );
            break;
        }
        case FORMTYPE_CONSTANTS?.DATE?.id?.toLowerCase(): {
            checkResult = data?.answerText ?? noDataAvalaible;
            formItem = (
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Form.Item label="Date" name="answerText" rules={[validateRequiredSelectField('Date')]} className={styles?.datePicker}>
                            <DatePicker placeholder={preparePlaceholderSelect('from date')} disabledDate={(current) => current.isBefore(moment().subtract(1, 'day'))} />
                        </Form.Item>
                    </Col>
                </Row>
            );
            break;
        }
        default: {
            checkResult = data?.answerText ?? noDataAvalaible;
            break;
        }
    }
    return { checkResult, formItem };
};
