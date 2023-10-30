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
import { validateRequiredInputField, validateRequiredSelectField, validateNumberWithTwoDecimalPlaces, validateOnlyPositiveNumber } from 'utils/validation';
import { MODULE_TYPE_CONSTANTS } from 'constants/modules/vehicleChecklistConstants';
import { FORMTYPE_CONSTANTS } from 'constants/formTypeConstant';

import styles from 'assets/sass/app.module.scss';

export const noDataAvalaible = 'NA';

export const FORM_KEYS = {
    answerText: undefined,
    answerFromDate: undefined,
    answerToDate: undefined,
    answerBoolean: undefined,
    answerFromNumber: undefined,
    answerToNumber: undefined,
    answerDescription: undefined,
    answerFromNumberDecimal: undefined,
    answerToNumberDecimal: undefined,
};

const setQuestionlabel = (checklistType, data) => {
    switch (checklistType) {
        case MODULE_TYPE_CONSTANTS?.RECEIPT_CHECKLIST?.key: {
            return data?.checkPoint
                ? data?.checkPoint
                      ?.split(' ')
                      ?.map((item) => item?.charAt(0)?.toUpperCase() + item?.slice(1)?.toLowerCase())
                      ?.join(' ')
                : noDataAvalaible;
        }
        case MODULE_TYPE_CONSTANTS?.DELIVERY_NOTE?.key: {
            return data?.checklistDescription
                ? data?.checklistDescription
                      ?.split(' ')
                      ?.map((item) => item?.charAt(0)?.toUpperCase() + item?.slice(1)?.toLowerCase())
                      ?.join(' ')
                : noDataAvalaible;
        }
        default: {
            return noDataAvalaible;
        }
    }
};
export const BindFormAndResult = ({ data, aggregateForm, checklistType }) => {
    const UniqueAnsType = data?.answerType?.toLowerCase() && data?.answerType?.toLowerCase();
    const QuestionLabel = setQuestionlabel(checklistType, data);

    let checkResult = '';
    let formItem = (
        <Row gutter={20}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Form.Item label={QuestionLabel} name="answerText" rules={[validateRequiredInputField('checkResult')]}>
                    <Input maxLength={30} placeholder={preparePlaceholderText('Check Result')} />
                </Form.Item>
            </Col>
        </Row>
    );
    switch (UniqueAnsType) {
        case FORMTYPE_CONSTANTS?.DATE_RANGE?.key?.toLowerCase(): {
            if (data?.answerFromDate && data?.answerToDate) {
                checkResult = checkResult.concat(data?.answerFromDate ? convertDateTimedayjs(data?.answerFromDate, dateFormatView) : 'NA');
                checkResult = checkResult.concat('-');
                checkResult = checkResult.concat(data?.answerToDate ? convertDateTimedayjs(data?.answerToDate, dateFormatView) : 'NA');
            } else {
                checkResult = noDataAvalaible;
            }
            formItem = (
                <>
                    <p className={styles?.marB10}>{QuestionLabel}</p>
                    <Row gutter={20}>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item name="answerFromDate" rules={[validateRequiredSelectField('From Date')]} className={styles?.datePicker}>
                                <DatePicker placeholder={preparePlaceholderSelect('from date')} onChange={() => aggregateForm.setFieldsValue({ answerToDate: undefined })} disabledDate={(current) => current.isBefore(moment().subtract(1, 'day'))} />
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item name="answerToDate" rules={[validateRequiredSelectField('To Date')]} className={styles?.datePicker}>
                                <DatePicker placeholder={preparePlaceholderSelect('to date')} disabledDate={(current) => current < aggregateForm?.getFieldValue('answerFromDate')} />
                            </Form.Item>
                        </Col>
                    </Row>
                </>
            );
            break;
        }

        case FORMTYPE_CONSTANTS?.TOGGLE_GROUP?.key?.toLowerCase(): {
            if (!data?.answerBoolean) {
                if (data?.answerBoolean === false) {
                    checkResult = 'No';
                } else {
                    checkResult = noDataAvalaible;
                }
            } else if (data?.answerBoolean) {
                checkResult = 'Yes';
            }
            formItem = (
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Form.Item rules={[validateRequiredSelectField('')]} valuePropName="checked" initialValue={data?.answerBoolean ? true : false} labelAlign="left" wrapperCol={{ span: 24 }} name="answerBoolean" label={QuestionLabel}>
                            <Switch checkedChildren="Yes" unCheckedChildren="No" defaultChecked={!!data?.answerBoolean} onChange={(checked) => (checked ? true : false)} />
                        </Form.Item>
                    </Col>
                </Row>
            );
            break;
        }
        case FORMTYPE_CONSTANTS?.NUMBER_RANGE_WITHOUT_DECIMAL?.key?.toLowerCase(): {
            if (data?.answerFromNumber && data?.answerToNumber) {
                checkResult = checkResult.concat(data?.answerFromNumber ?? 'NA');
                checkResult = checkResult.concat('-');
                checkResult = checkResult.concat(data?.answerToNumber ?? 'NA');
            } else {
                checkResult = noDataAvalaible;
            }
            formItem = (
                <>
                    <p className={styles?.marB10}>{QuestionLabel}</p>

                    <Row gutter={20}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item name="answerFromNumber" rules={[validateRequiredInputField('min range'), validateOnlyPositiveNumber('min range')]}>
                                <InputNumber className={styles.fullWidth} placeholder={preparePlaceholderText('Min Range')} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item
                                name="answerToNumber"
                                rules={[
                                    validateRequiredInputField('max range'),
                                    validateOnlyPositiveNumber('max range'),
                                    {
                                        validator: (_, value) => {
                                            if (!value) return Promise.resolve();
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
                </>
            );
            break;
        }
        case FORMTYPE_CONSTANTS?.NUMBER_RANGE_WITH_DECIMAL?.key?.toLowerCase(): {
            if (data?.answerFromNumberDecimal && data?.answerToNumberDecimal) {
                checkResult = checkResult.concat(data?.answerFromNumberDecimal ?? 'NA');
                checkResult = checkResult.concat('-');
                checkResult = checkResult.concat(data?.answerToNumberDecimal ?? 'NA');
            } else {
                checkResult = noDataAvalaible;
            }
            formItem = (
                <>
                    <p className={styles?.marB10}>{QuestionLabel}</p>
                    <Row gutter={20}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item name="answerFromNumberDecimal" rules={[validateRequiredInputField('min range'), validateNumberWithTwoDecimalPlaces('min range')]}>
                                <InputNumber className={styles.fullWidth} precision={2} placeholder={preparePlaceholderText('Min Range')} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item
                                name="answerToNumberDecimal"
                                rules={[
                                    validateRequiredInputField('max range'),
                                    validateNumberWithTwoDecimalPlaces('max range'),
                                    {
                                        validator: (_, value) => {
                                            if (!value) return Promise.resolve();
                                            if (value < aggregateForm.getFieldValue('answerFromNumberDecimal')) {
                                                return Promise.reject(`Max range can't be less than Min Range`);
                                            }
                                            return Promise.resolve();
                                        },
                                    },
                                ]}
                            >
                                <InputNumber precision={2} className={styles.fullWidth} placeholder={preparePlaceholderText('Max Range')} />
                            </Form.Item>
                        </Col>
                    </Row>
                </>
            );
            break;
        }
        case FORMTYPE_CONSTANTS?.FIXED_OPTIONS?.key?.toLowerCase(): {
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
                        <Form.Item label={QuestionLabel} name="answerText" rules={[validateRequiredSelectField('Check Result')]}>
                            <Select optionFilterProp="answerDescription" options={data?.checklistAnswerResponses} placeholder={preparePlaceholderSelect('Check Result')} fieldNames={{ label: 'answerDescription', value: 'answerCode' }} allowClear showSearch onChange={AnswerResponseSelction} />
                        </Form.Item>
                        <Form.Item initialValue={data?.answerDescription} name="answerDescription" hidden />
                    </Col>
                </Row>
            );
            break;
        }
        case FORMTYPE_CONSTANTS?.OPEN_TEXT?.key?.toLowerCase(): {
            checkResult = data?.answerText ?? noDataAvalaible;
            formItem = (
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Form.Item label={QuestionLabel} name="answerText" rules={[validateRequiredInputField('checkResult')]}>
                            <Input maxLength={30} placeholder={preparePlaceholderText('Check Result')} />
                        </Form.Item>
                    </Col>
                </Row>
            );
            break;
        }
        case FORMTYPE_CONSTANTS?.NUMBER_WITHOUT_DECIMAL?.key?.toLowerCase(): {
            if (data?.answerFromNumber) {
                checkResult = checkResult.concat(data?.answerFromNumber ?? 'NA');
            } else {
                checkResult = data?.answerFromNumber ?? noDataAvalaible;
            }

            formItem = (
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Form.Item label={QuestionLabel} name="answerFromNumber" rules={[validateRequiredInputField('Number'), validateOnlyPositiveNumber('Number')]}>
                            <InputNumber className={styles.fullWidth} placeholder={preparePlaceholderText('Number')} />
                        </Form.Item>
                    </Col>
                </Row>
            );
            break;
        }
        case FORMTYPE_CONSTANTS?.NUMBER_WITH_DECIMAL?.key?.toLowerCase(): {
            if (data?.answerFromNumberDecimal) {
                checkResult = checkResult.concat(data?.answerFromNumberDecimal ?? 'NA');
            } else {
                checkResult = data?.answerFromNumberDecimal ?? noDataAvalaible;
            }
            formItem = (
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Form.Item label={QuestionLabel} name="answerFromNumberDecimal" rules={[validateRequiredInputField('Number'), validateNumberWithTwoDecimalPlaces('Number')]}>
                            <InputNumber precision={2} className={styles.fullWidth} placeholder={preparePlaceholderText('Number')} />
                        </Form.Item>
                    </Col>
                </Row>
            );
            break;
        }
        case FORMTYPE_CONSTANTS?.DATE?.key?.toLowerCase(): {
            if (data?.answerFromDate) {
                checkResult = checkResult.concat(data?.answerFromDate ? convertDateTimedayjs(data?.answerFromDate, dateFormatView) : 'NA');
            } else {
                checkResult = noDataAvalaible;
            }
            formItem = (
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Form.Item label={QuestionLabel} name="answerFromDate" rules={[validateRequiredSelectField('Date')]} className={styles?.datePicker}>
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
