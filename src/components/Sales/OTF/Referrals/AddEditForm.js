/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Input, Form, Row, DatePicker, Card, Select } from 'antd';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';

import { validateRequiredInputField, validateMobileNoField } from 'utils/validation';
import { convertDateToCalender } from 'utils/formatDateTime';

import { SearchBox } from 'components/utils/SearchBox';

import styles from 'components/common/Common.module.css';

const { Option } = Select;

const AddEditFormMain = (props) => {
    const { formData, setFormData, optionType, searchForm, filterString, setFilterString, vehicleRegNum, typeData } = props;

    // useEffect(() => {
    //     if (formData?.hasOwnProperty('mobileNumber')) {
    //         form.setFieldsValue({
    //             ...formData,
    //             registrationNumber: formData?.registrationNumber ?? 'NA',
    //             dob: convertDateToCalender(formData?.dob),
    //         });
    //     } else {
    //         form.resetFields();
    //         form.setFieldsValue({ customerId: undefined, customerType: undefined, emailId: undefined, customerName: undefined, registrationNumber: undefined, chasisNumber: undefined });
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [formData]);

    const getReferralDetail = (value) => {
        vehicleRegNum?.map((item) => {
            if (item.vehicleRegistrationNumber === value) {
                setFormData(item);
            }
        });
    };

    const serachBoxProps = {
        searchForm,
        filterString,
        optionType: optionType,
        setFilterString,
    };

    return (
        <Card style={{ backgroundColor: '#F2F2F2' }}>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <SearchBox {...serachBoxProps} />
                </Col>
            </Row>
            <Row gutter={20} className={styles.marT20}>
                {(filterString?.searchType === 'vehicleRegistrationNumber' || formData?.length === 1) && (
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8} className={styles.uniqueSearchInput}>
                        <Form.Item name="vehicleRegistrationNumber" label="Vehicle Registration Number" initialValue={formData?.mobileNumber}>
                            <Input disabled={true} maxLength={6} placeholder={preparePlaceholderText('Vehicle Registration Number')} />
                        </Form.Item>
                    </Col>
                )}

                {filterString?.searchType !== 'vehicleRegistrationNumber' && vehicleRegNum?.length >= 1 && (
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8} className={styles.uniqueSearchInput}>
                        <Form.Item name="vehicleRegistrationNumber" label="Vehicle Registration Number" initialValue={formData?.referralDetails[0].vehicleRegistrationNumber}>
                            <Select placeholder="Select Parameter" onChange={getReferralDetail}>
                                {vehicleRegNum?.map((item) => (
                                    <Option value={item.vehicleRegistrationNumber} selected>
                                        {item.vehicleRegistrationNumber}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                )}

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="chassisNumber" label="Chassis Number" initialValue={formData?.chassisNumber}>
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
                    <Form.Item name="customerType" initialValue={formData?.customerType} label="Customer Type" data-testid="customerType">
                        <Select disabled={true} placeholder={preparePlaceholderSelect('customer Type')} fieldNames={{ label: 'value', value: 'key' }} options={typeData?.CUST_TYPE} allowClear></Select>
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="customerName" label="Customer Name" initialValue={formData?.customerName}>
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
                    <Form.Item name="dateOfBirth" label="Date of Birth" initialValue={convertDateToCalender(formData?.dateOfBirth)}>
                        <DatePicker disabled={true} format="YYYY-MM-DD" placeholder={preparePlaceholderSelect('Date of Birth')} style={{ width: '250px' }} />
                    </Form.Item>
                </Col>
            </Row>
        </Card>
    );
};

export const AddEditForm = AddEditFormMain;
