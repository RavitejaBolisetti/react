/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Col, Input, Form, Row, Select, Card, DatePicker, Space, Switch } from 'antd';

import { disableFutureDate } from 'utils/disableDate';
import { dateFormat, formattedCalendarDate } from 'utils/formatDateTime';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { customSelectBox } from 'utils/customSelectBox';

import { YES_NO_FLAG } from 'constants/yesNoFlag';
import { FINANCE_ARRANGED_BY } from 'constants/financeArrangedBy';

import styles from 'assets/sass/app.module.scss';

const AddEditFormMain = (props) => {
    const { formData, FinanceLovData, typeData, form, formActionType } = props;
    const [doReceived, setDoReceived] = useState();
    const [financeArrangedBy, setFinanceArrangedBy] = useState();
    const checkFinanceType = (type, key) => (type ? type === key : false);

    useEffect(() => {
        setDoReceived(formData?.doReceived || 'N');
        setFinanceArrangedBy(formData?.financeArrangedBy);
        formData && form.setFieldsValue({ ...formData, printHypothecationDetails: formData?.printHypothecationDetails ? 1 : 0, doDate: formattedCalendarDate(formData?.doDate), financier: formData?.financierCode });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    const datePickerStyle = {
        width: '100%',
    };

    const handleDOChange = (item) => {
        setDoReceived(item);
    };

    // const onLoanChange = () => {
    //     form.validateFields(['emi']);
    // };

    // const emiLessThanAmount = (value) => {
    //     if (Number(form.getFieldsValue(['loanAmount'])?.loanAmount) <= Number(value)) {
    //         return Promise.reject('EMI cannot exceed loan amount');
    //     } else {
    //         return Promise.resolve();
    //     }
    // };

    const selectProps = {
        optionFilterProp: 'children',
        showSearch: true,
        allowClear: true,
        className: styles.headerSelectField,
    };

    const handleFinanceArrangedBy = (value) => {
        setFinanceArrangedBy(value);
        form.resetFields();
        form.setFieldsValue({ financeArrangedBy: value });
    };

    return (
        <>
            <div className={styles.drawerCustomerMaster}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Space style={{ display: 'flex' }} size="middle" direction="vertical">
                            <Card style={{ backgroundColor: '#F2F2F2' }}>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item name="financeArrangedBy" label="Finance Arranged By" rules={[validateRequiredSelectField('finance arranged by')]}>
                                            {customSelectBox({ data: typeData['FNC_ARNGD'], onChange: handleFinanceArrangedBy })}
                                        </Form.Item>
                                    </Col>
                                    {financeArrangedBy && !checkFinanceType(financeArrangedBy, FINANCE_ARRANGED_BY?.CASH?.key) && (
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                            <Form.Item initialValue={formActionType?.editMode ? (formData?.printHyptheticatedDetail === 1 ? true : false) : false} labelAlign="left" wrapperCol={{ span: 24 }} name="printHypothecationDetails" label="Print Hypothecation Details?" valuePropName="checked">
                                                <Switch checkedChildren="Active" unCheckedChildren="Inactive" valuePropName="checked" onChange={(checked) => (checked ? 1 : 0)} />
                                            </Form.Item>
                                        </Col>
                                    )}
                                </Row>
                                {financeArrangedBy && !checkFinanceType(financeArrangedBy, FINANCE_ARRANGED_BY?.CASH?.key) && (
                                    <>
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="Financier" name="financier" placeholder={preparePlaceholderSelect('Select')}>
                                                    <Select placeholder="Select" options={FinanceLovData} fieldNames={{ label: 'value', value: 'key' }} {...selectProps}></Select>
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="Branch" name="branch">
                                                    <Input placeholder={preparePlaceholderText('branch')} maxLength={55} />
                                                </Form.Item>
                                            </Col>

                                            {financeArrangedBy && checkFinanceType(financeArrangedBy, FINANCE_ARRANGED_BY?.DEALER?.key) && (
                                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                    <Form.Item label="File Number" name="fileNumber">
                                                        <Input placeholder={preparePlaceholderText('file number')} maxLength={30} />
                                                    </Form.Item>
                                                </Col>
                                            )}
                                        </Row>
                                        {financeArrangedBy && checkFinanceType(financeArrangedBy, FINANCE_ARRANGED_BY?.DEALER?.key) && (
                                            <Row gutter={20}>
                                                {/* <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                        <Form.Item onChange={onLoanChange} label="Loan Amount" name="loanAmount" rules={[validateNumberWithTwoDecimalPlaces('loan amount')]}>
                                                            <Input placeholder={preparePlaceholderText('loan amount')} maxLength={10} />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                        <Form.Item label="EMI" name="emi" rules={[validateNumberWithTwoDecimalPlaces('emi'), { validator: (rule, value) => emiLessThanAmount(value) }]}>
                                                            <Input placeholder={preparePlaceholderText('emi')} maxLength={10} />
                                                        </Form.Item>
                                                    </Col> */}
                                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                    <Form.Item label="D.O. Received" name="doReceived">
                                                        {customSelectBox({ data: typeData?.YES_NO_FLG, onChange: handleDOChange })}
                                                    </Form.Item>
                                                </Col>
                                                {doReceived === YES_NO_FLAG?.YES?.key && (
                                                    <>
                                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                            <Form.Item label="D.O. Number" name="doNumber" rules={[validateRequiredInputField('Number')]}>
                                                                <Input placeholder={preparePlaceholderText('D.O. Number')}></Input>
                                                            </Form.Item>
                                                        </Col>

                                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                            <Form.Item label="D.O. Date" name="doDate" rules={[validateRequiredInputField('Date')]}>
                                                                <DatePicker format={dateFormat} disabledDate={disableFutureDate} placeholder={preparePlaceholderSelect('date')} style={datePickerStyle} />
                                                            </Form.Item>
                                                        </Col>
                                                    </>
                                                )}
                                            </Row>
                                        )}
                                    </>
                                )}
                            </Card>
                        </Space>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export const AddEditForm = AddEditFormMain;
