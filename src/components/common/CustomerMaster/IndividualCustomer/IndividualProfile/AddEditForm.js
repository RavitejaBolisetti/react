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
import { translateContent } from 'utils/translateContent';

import { dateFormat, formattedCalendarDate } from 'utils/formatDateTime';

const { Panel } = Collapse;
const { Option } = Select;

const AddEditFormMain = (props) => {
    const { subApplication, setSubApplication, formData, appCategoryData, form } = props;
    const { isReadOnly = false } = props;

    const USAGE_APPLICATION_CONSTANT = {
        CPTV: {
            id: 1,
            key: 'CPTV',
        },
    };

    const [isRead, setIsRead] = useState(false);
    const [customer, setCustomer] = useState('');
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
    const handleUsageApplicationChange = (values, record) => {
        if (values === USAGE_APPLICATION_CONSTANT?.CPTV?.key) {
            setSubApplication(record?.type);
        } else setSubApplication(record?.type);
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
                        <Panel header={translateContent('customerMaster.drawerSubHeading.informationTitle')} key="1">
                            <Divider />
                            <Row gutter={20}>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label={translateContent('customerMaster.label.dateOfBirth')} name="dateOfBirth">
                                        <DatePicker format={dateFormat} disabledDate={disableFutureDate} disabled={isReadOnly} placeholder={prepareDatePickerText(dateFormat)} />
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label={translateContent('customerMaster.label.gender')} name="gender" initialValue={formData?.gender} rules={[validateRequiredSelectField(translateContent('customerMaster.validation.gender'))]}>
                                        <Select placeholder={preparePlaceholderSelect(translateContent('customerMaster.placeholder.gender'))} {...disabledProps}>
                                            {appCategoryData?.GENDER_CD?.map((item) => (
                                                <Option key={'ct' + item.key} value={item.key}>
                                                    {item.value}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label={translateContent('customerMaster.label.maritalStatus')} initialValue={formData?.martialStatus} name="martialStatus">
                                        <Select placeholder={preparePlaceholderSelect(translateContent('customerMaster.placeholder.maritalStatus'))} {...disabledProps} onChange={handleOnChange}>
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
                                    <Form.Item label={translateContent('customerMaster.label.WeddingDate')} name="weddingAnniversary">
                                        <DatePicker format={dateFormat} disabledDate={disableFutureDate} disabled={isRead} placeholder={prepareDatePickerText(dateFormat)} />
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label={translateContent('customerMaster.label.Occupation')} initialValue={formData?.occuption} name="occuption">
                                        <Select placeholder={preparePlaceholderSelect(translateContent('customerMaster.placeholder.occupation'))} {...disabledProps}>
                                            {appCategoryData?.OCCUPATION?.map((item) => (
                                                <Option key={'ct' + item.key} value={item.key}>
                                                    {item.value}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label={translateContent('customerMaster.label.annualIncome')} initialValue={formData?.annualIncome} name="annualIncome">
                                        <Select placeholder={preparePlaceholderSelect(translateContent('customerMaster.placeholder.annualIncome'))} {...disabledProps}>
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
                                    <Form.Item label={translateContent('customerMaster.label.drivingLicenseNo')} name="drivingLicenseNumber" initialValue={formData?.drivingLicenseNumber} rules={[validateDrivingLicenseNo(translateContent('customerMaster.validation.licenseNo'))]}>
                                        <Input maxLength={15} onInput={convertToUpperCase} placeholder={preparePlaceholderText(translateContent('customerMaster.placeholder.drivinglicense'))} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label={translateContent('customerMaster.label.aadharNo')} name="adharNumber" initialValue={formData?.adharNumber} rules={[validateAadhar(translateContent('customerMaster.validation.aadhar'))]}>
                                        <Input maxLength={12} placeholder={preparePlaceholderText(translateContent('customerMaster.placeholder.aadharNumber'))} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label={translateContent('customerMaster.label.voterID')} name="voterId" initialValue={formData?.voterId} rules={[validateVoterId(translateContent('customerMaster.validation.voterId'))]}>
                                        <Input maxLength={10} onInput={convertToUpperCase} placeholder={preparePlaceholderText(translateContent('customerMaster.placeholder.voterId'))} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label={translateContent('customerMaster.label.vehicleUsed')} initialValue={formData?.vehicleUsed} name="vehicleUsed">
                                        <Select placeholder={preparePlaceholderSelect(translateContent('customerMaster.placeholder.vehicleUsed'))} {...disabledProps}>
                                            {appCategoryData?.Vehicle_Used?.map((item) => (
                                                <Option key={'ct' + item.key} value={item.key}>
                                                    {item.value}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label={translateContent('customerMaster.label.motherTongue')} initialValue={formData?.motherTongue} name="motherTongue">
                                        <Select placeholder={preparePlaceholderSelect(translateContent('customerMaster.placeholder.motherTongue'))} {...disabledProps}>
                                            {appCategoryData?.MOTHER_TOUNGE?.map((item) => (
                                                <Option key={'ct' + item.key} value={item.key}>
                                                    {item.value}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>

                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label={translateContent('customerMaster.label.pan')} name="panNumber" initialValue={formData?.panNumber} rules={[validatePanField(translateContent('customerMaster.validation.pan')), validateRequiredInputField(translateContent('customerMaster.validation.pan'))]}>
                                        <Input maxLength={10} onInput={convertToUpperCase} placeholder={preparePlaceholderText(translateContent('customerMaster.placeholder.pan'))} {...disabledProps} />
                                    </Form.Item>
                                </Col>

                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label={translateContent('customerMaster.label.gstin')} name="gstin" initialValue={formData?.gstin} rules={[validateGSTIN(translateContent('customerMaster.validation.gstin'))]}>
                                        <Input value={null} onInput={convertToUpperCase} placeholder={preparePlaceholderText(translateContent('customerMaster.placeholder.gstin'))} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Divider />
                            <Row gutter={20}>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label={translateContent('customerMaster.label.Categorization')} initialValue={formData?.applicationCategorization} name="applicationCategorization">
                                        <Select placeholder={preparePlaceholderSelect(translateContent('customerMaster.placeholder.category'))} {...disabledProps} onChange={handleUsageApplicationChange}>
                                            {appCategoryData?.APP_CAT?.map((item) => (
                                                <Option key={'ct' + item.key} value={item.key} type={item?.type}>
                                                    {item.value}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label={translateContent('customerMaster.label.SubCategory')} initialValue={formData?.applicationSubCategory} name="applicationSubCategory">
                                        <Select placeholder={preparePlaceholderSelect(translateContent('customerMaster.placeholder.income'))} {...disabledProps}>
                                            {appCategoryData[subApplication]?.map((item) => (
                                                <Option key={'ct' + item.key} value={item.key}>
                                                    {item.value}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label={translateContent('customerMaster.label.customerCategory')} initialValue={formData?.customerCategory} name="customerCategory">
                                        <Select placeholder={preparePlaceholderSelect(translateContent('customerMaster.placeholder.income'))} {...disabledProps} onChange={onCustomerCategoryChange}>
                                            {appCategoryData?.APP_CUST_CAT?.map((item) => (
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
                                            <Form.Item label={translateContent('customerMaster.label.businessDetails')} initialValue={formData?.businessDetails} name="businessDetails">
                                                <Input maxLength={15} placeholder={preparePlaceholderText(translateContent('customerMaster.placeholder.businessDetails'))} {...disabledProps} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                            <Form.Item label={translateContent('customerMaster.label.vehicleDeployment')} initialValue={formData?.vehicleDeploymentDetails} name="vehicleDeploymentDetails">
                                                <Input maxLength={15} placeholder={preparePlaceholderText(translateContent('customerMaster.placeholder.vehicleDeployment'))} {...disabledProps} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                            <Form.Item label={translateContent('customerMaster.label.keyRoleDetails')} initialValue={formData?.keyRolesDetails} name="keyRolesDetails">
                                                <Input maxLength={15} placeholder={preparePlaceholderText(translateContent('customerMaster.placeholder.keyRole'))} {...disabledProps} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={20}>
                                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                            <Form.Item label={translateContent('customerMaster.label.majorRouteDetails')} initialValue={formData?.majorRouteDetails} name="majorRouteDetails">
                                                <Input maxLength={15} placeholder={preparePlaceholderText(translateContent('customerMaster.placeholder.route'))} {...disabledProps} />
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
