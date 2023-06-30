/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';

import { Col, Input, Form, Row, DatePicker, Card, Select } from 'antd';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';

import { validateRequiredInputField, validateRequiredSelectField, validateMobileNoField } from 'utils/validation';
// import { disableFutureDate } from 'utils/disableDate';
import { convertDateToCalender } from 'utils/formatDateTime';
import { PARAM_MASTER } from 'constants/paramMaster';

import styles from 'components/common/Common.module.css';

const { Search } = Input;
const { Option } = Select;

const AddEditFormMain = (props) => {
    const { formData, form, searchForm, filterString, handleSearchTypeChange, handleSearchParamSearch, onSearch, isCustomerLoading, typeData, referralSearchRules } = props;

    useEffect(() => {
        if (formData?.hasOwnProperty('mobileNumber')) {
            form.setFieldsValue({
                ...formData,
                registrationNumber: formData?.registrationNumber ?? 'NA',
                dob: convertDateToCalender(formData?.dob),
            });
        } else {
            form.resetFields();
            form.setFieldsValue({ customerId: undefined, customerType: undefined, emailId: undefined, customerName: undefined, registrationNumber: undefined, chasisNumber: undefined });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    return (
        <Card style={{ backgroundColor: '#F2F2F2' }}>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <div className={styles.contentHeaderBackground1}>
                        <div className={styles.selectSearchBg}>
                            <Form form={searchForm} layout="vertical" autoComplete="off">
                                <Form.Item name="searchType" initialValue={filterString?.searchType} rules={[validateRequiredSelectField('parameter')]}>
                                    <Select className={styles.headerSelectField} onChange={handleSearchTypeChange} placeholder="Select Parameter" allowClear>
                                        {typeData[PARAM_MASTER.OTF_SER.id]?.map((item) => (
                                            <Option value={item.key} selected>
                                                {item.value}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item {...referralSearchRules} name="searchParam" initialValue={filterString?.searchParam} validateTrigger={['onChange', 'onSearch']}>
                                    <Search placeholder="Search" value={filterString?.searchParam} allowClear onSearch={handleSearchParamSearch} className={styles.headerSearchField} />
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8} className={styles.uniqueSearchInput}>
                    <Form.Item name="mobileNumber" label="Vehicle Registration Number" initialValue={formData?.mobileNumber} rules={[validateRequiredInputField('Mobile Number'), validateMobileNoField('Mobile Number'), { min: 10, message: 'Phone number must be minimum 10 digits Long.' }]}>
                        <Input disabled={true} maxLength={6} placeholder={preparePlaceholderText('Vehicle Registration Number')} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="chasisNumber" label="Chassis Number" initialValue={formData?.chasisNumber}>
                        <Input disabled={true} maxLength={50} placeholder={preparePlaceholderText('Chassis Number')} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="customerId" label="Customer Code" initialValue={formData?.customerId}>
                        <Input disabled={true} maxLength={6} placeholder={preparePlaceholderText('Customer Code')} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.customerType} label="Customer Type" name="customerType" data-testid="customerType">
                        <Select disabled={true} placeholder={preparePlaceholderSelect('customer Type')} fieldNames={{ label: 'value', value: 'key' }} options={typeData?.CUST_TYPE} allowClear></Select>
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="customerName" label="Customer Name" initialValue={formData?.customername}>
                        <Input disabled={true} placeholder={preparePlaceholderText('Customer Name')} maxLength={50} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8} className={styles.uniqueSearchInput}>
                    <Form.Item name="mobileNumber" label="Mobile Number" initialValue={formData?.mobileNumber} rules={[validateRequiredInputField('Mobile Number'), validateMobileNoField('Mobile Number'), { min: 10, message: 'Phone number must be minimum 10 digits Long.' }]}>
                        <Input disabled={true} maxLength={6} placeholder={preparePlaceholderText('Vehicle Registration Number')} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="emailId" label="Email Id" initialValue={formData?.emailId}>
                        <Input disabled={true} maxLength={6} placeholder={preparePlaceholderText('Email Id')} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={convertDateToCalender(formData?.dob)} name="dob" label="D.O.B">
                        <DatePicker disabled={true} format="YYYY-MM-DD" placeholder={preparePlaceholderSelect('Date of Birth')} style={{ width: '250px' }} />
                    </Form.Item>
                    {/* disabledDate={disableFutureDate} */}
                </Col>
            </Row>
        </Card>
    );
};

export const AddEditForm = AddEditFormMain;
