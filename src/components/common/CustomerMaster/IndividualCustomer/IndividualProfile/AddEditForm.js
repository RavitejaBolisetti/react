/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Collapse, Form, Row, Col, Select, Input, DatePicker, Divider } from 'antd';

import { validateAadhar, validateDrivingLicenseNo, validateGSTIN, validateRequiredInputField, validateRequiredSelectField, validatePanField, validateVoterId } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText, prepareDatePickerText } from 'utils/preparePlaceholder';
import { disableFutureDate } from 'utils/disableDate';
import { expandIcon } from 'utils/accordianExpandIcon';
import { convertToUpperCase } from 'utils/convertToUpperCase';

import { dateFormat, formattedCalendarDate } from 'utils/formatDateTime';

const { Panel } = Collapse;
const { Option } = Select;

const AddEditFormMain = (props) => {
    const { formData, appCategoryData, form } = props;
    const { isReadOnly = false } = props;

    const [isRead, setIsRead] = useState(false);
    const [customer, setCustomer] = useState(false);
    const [activeKey, setActiveKey] = useState([1]);

    useEffect(() => {
        setCustomer(formData?.customerCategory);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData?.customerCategory]);
    useEffect(() => {
        form.setFieldsValue({
            ...formData,
            companyName: formData?.authorityDetails?.companyName,
            postion: formData?.authorityDetails?.postion,
            personName: formData?.authorityDetails?.personName,
            remarks: formData?.authorityDetails?.remarks,
            vehicleDeploymentDetails: formData?.vehicleDeploymentDetails,
            dateOfBirth: formattedCalendarDate(formData?.dateOfBirth),
            weddingAnniversary: formattedCalendarDate(formData?.weddingAnniversary),
            customerConsent: formData?.customerConsent === 'true' ? true : false,
        });

        if (formData?.martialStatus === 'S') {
            setIsRead(true);
        } else {
            setIsRead(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    const onCustomerCategoryChange = (values) => {
        setCustomer(values);
    };

    const handleOnChange = (e) => {
        const values = e;
        if (values === 'S') {
            setIsRead(true);
            form.setFieldsValue({
                weddingAnniversary: null,
            });
        } else {
            setIsRead(false);
        }
    };

    const onChange = (values) => {
        const isPresent = activeKey.includes(values);

        if (isPresent) {
            const newActivekeys = [];

            activeKey.forEach((item) => {
                if (item !== values) {
                    newActivekeys.push(item);
                }
            });
            setActiveKey(newActivekeys);
        } else {
            setActiveKey([...activeKey, values]);
        }
    };
    const disabledProps = { disabled: isReadOnly };
    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Collapse collapsible="icon" expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(1)} expandIconPosition="end">
                        <Panel header="Individual Information" key="1">
                            <Divider />
                            <Row gutter={20}>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Date of Birth" name="dateOfBirth">
                                        <DatePicker format={dateFormat} disabledDate={disableFutureDate} disabled={isReadOnly} placeholder={prepareDatePickerText(dateFormat)} />
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Gender" name="gender" initialValue={formData?.gender} rules={[validateRequiredSelectField('gender')]}>
                                        <Select placeholder={preparePlaceholderSelect('gender')} {...disabledProps}>
                                            {appCategoryData?.GENDER_CD?.map((item) => (
                                                <Option key={'ct' + item.key} value={item.key}>
                                                    {item.value}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Marital Status" initialValue={formData?.martialStatus} name="martialStatus">
                                        <Select placeholder={preparePlaceholderSelect('Marital Status')} {...disabledProps} onChange={handleOnChange}>
                                            {appCategoryData?.MARITAL_STATUS?.map((item) => (
                                                <Option key={'ct' + item.key} value={item.key}>
                                                    {item.value}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Wedding Anniversary Date" name="weddingAnniversary">
                                        <DatePicker format={dateFormat} disabledDate={disableFutureDate} disabled={isRead} placeholder={prepareDatePickerText(dateFormat)} />
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Occupation" initialValue={formData?.occuption} name="occuption">
                                        <Select placeholder={preparePlaceholderSelect('occupation')} {...disabledProps}>
                                            {appCategoryData?.OCCUPATION?.map((item) => (
                                                <Option key={'ct' + item.key} value={item.key}>
                                                    {item.value}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Annual Income" initialValue={formData?.annualIncome} name="annualIncome">
                                        <Select placeholder={preparePlaceholderSelect('annual income')} {...disabledProps}>
                                            {appCategoryData?.Annual_Income?.map((item) => (
                                                <Option key={'ct' + item.key} value={item.key}>
                                                    {item.value}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Driving License No" name="drivingLicenseNumber" initialValue={formData?.drivingLicenseNumber} rules={[validateDrivingLicenseNo('driving license no ')]}>
                                        <Input maxLength={15} onInput={convertToUpperCase} placeholder={preparePlaceholderText('driving license no')} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Aadhar No." name="adharNumber" initialValue={formData?.adharNumber} rules={[validateAadhar('aadhar')]}>
                                        <Input maxLength={12} placeholder={preparePlaceholderText('aadhar number')} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Voter ID" name="voterId" initialValue={formData?.voterId} rules={[validateVoterId('voter id')]}>
                                        <Input maxLength={10} onInput={convertToUpperCase} placeholder={preparePlaceholderText('voter id')} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Vehicle Used" initialValue={formData?.vehicleUsed} name="vehicleUsed">
                                        <Select placeholder={preparePlaceholderSelect('vehicle used')} {...disabledProps}>
                                            {appCategoryData?.Vehicle_Used?.map((item) => (
                                                <Option key={'ct' + item.key} value={item.key}>
                                                    {item.value}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Mother Tongue" initialValue={formData?.motherTongue} name="motherTongue">
                                        <Select placeholder={preparePlaceholderSelect('mother tongue')} {...disabledProps}>
                                            {appCategoryData?.MOTHER_TOUNGE?.map((item) => (
                                                <Option key={'ct' + item.key} value={item.key}>
                                                    {item.value}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>

                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="PAN" name="panNumber" initialValue={formData?.panNumber} rules={[validatePanField('pan'), validateRequiredInputField('pan')]}>
                                        <Input maxLength={10} onInput={convertToUpperCase} placeholder={preparePlaceholderText('pan')} {...disabledProps} />
                                    </Form.Item>
                                </Col>

                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="GSTIN" name="gstin" initialValue={formData?.gstin} rules={[validateGSTIN('gstin')]}>
                                        <Input value={null} onInput={convertToUpperCase} placeholder={preparePlaceholderText('gstin')} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Divider />
                            <Row gutter={20}>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Usage/Application Categorization" initialValue={formData?.applicationCategorization} name="applicationCategorization">
                                        <Select placeholder={preparePlaceholderSelect('usage/application category')} {...disabledProps}>
                                            {appCategoryData?.APP_CAT?.map((item) => (
                                                <Option key={'ct' + item.key} value={item.key}>
                                                    {item.value}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Usage/Application Sub-Category" initialValue={formData?.applicationSubCategory} name="applicationSubCategory">
                                        <Select placeholder={preparePlaceholderSelect('annual income')} {...disabledProps}>
                                            {appCategoryData?.APP_SUB_CAT?.map((item) => (
                                                <Option key={'ct' + item.key} value={item.key}>
                                                    {item.value}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Customer Category" initialValue={formData?.customerCategory} name="customerCategory">
                                        <Select placeholder={preparePlaceholderSelect('annual income')} {...disabledProps} onChange={onCustomerCategoryChange}>
                                            {appCategoryData?.CUS_CAT?.map((item) => (
                                                <Option key={'ct' + item.key} value={item.key}>
                                                    {item.value}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>

                            {customer === 'CUS_CAT_2' && (
                                <>
                                    <Divider />
                                    <Row gutter={20}>
                                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                            <Form.Item label="Business Details" initialValue={formData?.businessDetails} name="businessDetails">
                                                <Input maxLength={15} placeholder={preparePlaceholderText('business details')} {...disabledProps} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                            <Form.Item label="Vehicle Deployment Details" initialValue={formData?.vehicleDeploymentDetails} name="vehicleDeploymentDetails">
                                                <Input maxLength={15} placeholder={preparePlaceholderText('vehicle deployment details')} {...disabledProps} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                            <Form.Item label="Key Role Details" initialValue={formData?.keyRolesDetails} name="keyRolesDetails">
                                                <Input maxLength={15} placeholder={preparePlaceholderText('key role details')} {...disabledProps} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={20}>
                                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                            <Form.Item label="Major Route Details" initialValue={formData?.majorRouteDetails} name="majorRouteDetails">
                                                <Input maxLength={15} placeholder={preparePlaceholderText('major route details')} {...disabledProps} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </>
                            )}
                        </Panel>
                    </Collapse>
                </Col>
            </Row>
        </>
    );
};

export const AddEditForm = AddEditFormMain;
