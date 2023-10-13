/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import moment from 'moment';
import { Col, Input, Form, Row, DatePicker, InputNumber, Select } from 'antd';

import { convertDateTimedayjs, formatDateToCalenderDate, dateFormatView } from 'utils/formatDateTime';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { validateRequiredInputField, validateRequiredSelectField, validateNegativeNumber } from 'utils/validation';
import { FORMTYPE_CONSTANTS } from '../Constants';
import styles from 'assets/sass/app.module.scss';

export const BindFormAndResult = ({ data, aggregateForm }) => {
    const UniqueAnsType = data?.answerType && data?.answerType?.toLowerCase();
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
        case FORMTYPE_CONSTANTS?.D?.id: {
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

        case FORMTYPE_CONSTANTS?.TG?.id: {
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
                        <Form.Item label="Check Result" name="answerBoolean" rules={[validateRequiredInputField('checkResult')]}>
                            <Select
                                optionFilterProp="children"
                                options={[
                                    { value: true, label: 'Yes' },
                                    { value: false, label: 'No' },
                                ]}
                                placeholder={preparePlaceholderSelect('Check Result')}
                                fieldNames={{ label: 'label', value: 'value' }}
                                allowClear
                                showSearch
                                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            );
            break;
        }
        case FORMTYPE_CONSTANTS?.NRWTD?.id: {
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
        case FORMTYPE_CONSTANTS?.FIX?.id: {
            const AnswerResponseSelction = (value, valueObj) => {
                aggregateForm.setFieldValue('answerDescription', valueObj?.answerDescription);
            };
            if (data?.answerText) {
                checkResult = data?.checklistAnswerResponses?.find((i) => i?.answerCode === data?.answerText)?.answerDescription;
            } else {
                checkResult = noDataAvalaible;
            }
            formItem = (
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Form.Item label="Check Result" name="answerText" rules={[validateRequiredSelectField('Check Result')]}>
                            <Select optionFilterProp="answerDescription" options={data?.checklistAnswerResponses} placeholder={preparePlaceholderSelect('Check Result')} fieldNames={{ label: 'answerDescription', value: 'answerCode' }} allowClear showSearch onSelect={AnswerResponseSelction} />
                        </Form.Item>
                        <Form.Item initialValue={data?.answerDescription} name="answerDescription" />
                    </Col>
                </Row>
            );
            break;
        }
        case FORMTYPE_CONSTANTS?.OT?.id: {
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
        default: {
            checkResult = data?.answerText ?? noDataAvalaible;
            break;
        }
    }
    return { checkResult, formItem };
};

// export const MakeCheckResult = (props) => {
//     const { type, data } = props;
//     let checkResult = '';
//     const UniqueAnsType = type && type?.toLowerCase();
//     switch (UniqueAnsType) {
//         case FORMTYPE_CONSTANTS?.D?.id: {
//             if (data?.answerFromDate && data?.answerToDate) {
//                 checkResult = checkResult.concat(data?.answerFromDate ? convertDateTimedayjs(data?.answerFromDate, dateFormatView) : 'NA');
//                 checkResult = checkResult.concat('-');
//                 checkResult = checkResult.concat(data?.answerToDate ? convertDateTimedayjs(data?.answerToDate, dateFormatView) : 'NA');
//                 return checkResult;
//             } else {
//                 return 'NA';
//             }
//         }

//         case FORMTYPE_CONSTANTS?.TG?.id: {
//             if (data?.answerBoolean === undefined || data?.answerBoolean === null || data?.answerBoolean === '') {
//                 return 'NA';
//             } else if (data?.answerBoolean) {
//                 return 'Yes';
//             } else {
//                 return 'No';
//             }
//         }
//         case FORMTYPE_CONSTANTS?.NRWTD?.id: {
//             if (data?.answerFromNumber && data?.answerToNumber) {
//                 checkResult = checkResult.concat(data?.answerFromNumber ?? 'NA');
//                 checkResult = checkResult.concat('-');
//                 checkResult = checkResult.concat(data?.answerToNumber ?? 'NA');
//                 return checkResult;
//             } else {
//                 return 'NA';
//             }
//         }
//         case FORMTYPE_CONSTANTS?.FIX?.id: {
//             if (data?.answerText) {
//                 checkResult = data?.checklistAnswerResponses?.find((i) => i?.answerCode === data?.answerText)?.answerDescription;
//                 return checkResult;
//             } else {
//                 return 'NA';
//             }
//         }
//         case FORMTYPE_CONSTANTS?.OT?.id: {
//             return data?.answerText ?? 'NA';
//         }
//         default: {
//             break;
//         }
//     }
// };
// export const BindFormItems = ({ AdvanceformData, aggregateForm }) => {
//     const UniqueAnsType = AdvanceformData?.answerType && AdvanceformData?.answerType?.toLowerCase();
//     switch (UniqueAnsType) {
//         case FORMTYPE_CONSTANTS?.INPUT?.id: {
//             return (
//                 <Row gutter={20}>
//                     <Col xs={24} sm={24} md={24} lg={24} xl={24}>
//                         <Form.Item label="Check Result" name="answerText" rules={[validateRequiredInputField('checkResult')]}>
//                             <Input maxLength={30} placeholder={preparePlaceholderText('Check Result')} />
//                         </Form.Item>
//                     </Col>
//                 </Row>
//             );
//         }
//         case FORMTYPE_CONSTANTS?.NUMBER?.id: {
//             return (
//                 <Row gutter={20}>
//                     <Col xs={24} sm={12} md={12} lg={12} xl={12}>
//                         <Form.Item label="Min Range" name="answerFromNumber" rules={[validateRequiredInputField('min range'), validateNegativeNumber('min range')]}>
//                             <InputNumber className={styles.fullWidth} placeholder={preparePlaceholderText('Min Range')} />
//                         </Form.Item>
//                     </Col>
//                     <Col xs={24} sm={12} md={12} lg={12} xl={12}>
//                         <Form.Item
//                             label="Max Range"
//                             name="answerToNumber"
//                             rules={[
//                                 validateRequiredInputField('max range'),
//                                 validateNegativeNumber('max range'),
//                                 {
//                                     validator: (_, value) => {
//                                         if (!value) return;
//                                         if (value < aggregateForm.getFieldValue('answerFromNumber')) {
//                                             return Promise.reject(`Max range can't be less than Min Range`);
//                                         }
//                                         return Promise.resolve();
//                                     },
//                                 },
//                             ]}
//                         >
//                             <InputNumber className={styles.fullWidth} placeholder={preparePlaceholderText('Max Range')} />
//                         </Form.Item>
//                     </Col>
//                 </Row>
//             );
//         }
//         case FORMTYPE_CONSTANTS?.DATE?.id: {
//             return (
//                 <Row gutter={20}>
//                     <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
//                         <Form.Item label="From Date" name="answerFromDate" rules={[validateRequiredSelectField('From Date')]} className={styles?.datePicker}>
//                             <DatePicker placeholder={preparePlaceholderSelect('from date')} onChange={() => aggregateForm.setFieldsValue({ answerToDate: undefined })} disabledDate={(current) => current.isBefore(moment().subtract(1, 'day'))} />
//                         </Form.Item>
//                     </Col>
//                     <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
//                         <Form.Item label="To Date" name="answerToDate" rules={[validateRequiredSelectField('To Date')]} className={styles?.datePicker}>
//                             <DatePicker placeholder={preparePlaceholderSelect('to date')} disabledDate={(current) => current < aggregateForm?.getFieldValue('answerFromDate')} />
//                         </Form.Item>
//                     </Col>
//                 </Row>
//             );
//         }
//         case FORMTYPE_CONSTANTS?.BOOLEAN?.id: {
//             return (
//                 <Row gutter={20}>
//                     <Col xs={24} sm={24} md={24} lg={24} xl={24}>
//                         <Form.Item label="Check Result" name="answerBoolean" rules={[validateRequiredInputField('checkResult')]}>
//                             <Select
//                                 optionFilterProp="children"
//                                 options={[
//                                     { value: true, label: 'Yes' },
//                                     { value: false, label: 'No' },
//                                 ]}
//                                 placeholder={preparePlaceholderSelect('Check Result')}
//                                 fieldNames={{ label: 'label', value: 'value' }}
//                                 allowClear
//                                 showSearch
//                                 filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
//                             />
//                         </Form.Item>
//                     </Col>
//                 </Row>
//             );
//         }
//         case FORMTYPE_CONSTANTS?.FIXED?.id: {
//             return (
//                 <Row gutter={20}>
//                     <Col xs={24} sm={24} md={24} lg={24} xl={24}>
//                         <Form.Item label="Check Result" name="answerText" rules={[validateRequiredSelectField('Check Result')]}>
//                             <Select optionFilterProp="answerDescription" options={AdvanceformData?.checklistAnswerResponses} placeholder={preparePlaceholderSelect('Check Result')} fieldNames={{ label: 'answerDescription', value: 'answerCode' }} allowClear showSearch />
//                         </Form.Item>
//                     </Col>
//                 </Row>
//             );
//         }
//         default: {
//             return false;
//         }
//     }
// };
