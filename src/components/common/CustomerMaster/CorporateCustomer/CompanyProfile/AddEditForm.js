/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { React, useEffect, useState } from 'react';
import { Col, Input, Collapse, Row, Form, Select, Divider } from 'antd';
import { validateRequiredInputField, validatePanField, validateGSTIN } from 'utils/validation';

import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { convertToUpperCase } from 'utils/convertToUpperCase';
import { expandIcon } from 'utils/accordianExpandIcon';
import { translateContent } from 'utils/translateContent';

const { Panel } = Collapse;
const { Option } = Select;

const AddEditFormMain = (props) => {
    const { appCategoryData, formData, form } = props;
    const { subApplication, setSubApplication, setAppSubCategory, customerCategory, setCustomerCategory } = props;

    const [activeKey, setactiveKey] = useState([1]);

    const USAGE_APPLICATION_CONSTANT = {
        CPTV: {
            id: 1,
            key: 'CPTV',
        },
        FLEET: {
            id: 2,
            key: 'FLT',
        },
    };

    useEffect(() => {
        form?.setFieldsValue({
            ...formData,
        });
        form?.setFieldsValue({
            gstin: formData?.gstinNumber,
            personName: formData?.authorityDetails?.personName,
            postion: formData?.authorityDetails?.postion,
            companyName: formData?.authorityDetails?.companyName,
            remarks: formData?.authorityDetails?.remarks,
        });
        setCustomerCategory(formData?.customerCategory);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    useEffect(() => {
        setSubApplication(appCategoryData?.APP_CAT?.find((item) => item?.key === formData?.applicationCategorization)?.type);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData?.applicationCategorization]);

    const onChange = (values) => {
        const isPresent = activeKey.includes(values);

        if (isPresent) {
            const newActivekeys = [];

            activeKey.forEach((item) => {
                if (item !== values) {
                    newActivekeys.push(item);
                }
            });
            setactiveKey(newActivekeys);
        } else {
            setactiveKey([...activeKey, values]);
        }
    };

    const handleAppSubCategoryChange = (value) => {
        setAppSubCategory(value);
    };

    const handleCategoryChange = (value) => {
        setCustomerCategory(value);
    };

    const handleUsageApplicationChange = (values, record) => {
        form?.setFieldValue('applicationSubCategory', null);
        if (values === USAGE_APPLICATION_CONSTANT?.CPTV?.key) {
            setSubApplication(record?.type);
        } else {
            setSubApplication(record?.type);
        }
    };

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Collapse defaultActiveKey={['1']} expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(1)} expandIconPosition="end" collapsible="icon">
                        <Panel header={translateContent('customerMaster.drawerSubHeading.companyTitle')} key="1">
                            <Divider />
                            <Row gutter={20}>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label={translateContent('customerMaster.label.pan')} initialValue={formData?.panNumber} name="panNumber" rules={[validatePanField(translateContent('customerMaster.validation.pan')), validateRequiredInputField(translateContent('customerMaster.validation.pan'))]}>
                                        <Input maxLength={50} onInput={convertToUpperCase} placeholder={preparePlaceholderText(translateContent('customerMaster.placeholder.pan'))} />
                                    </Form.Item>
                                </Col>

                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label={translateContent('customerMaster.label.gstin')} initialValue={formData?.gstinNumber} name="gstin" rules={[validateGSTIN(translateContent('customerMaster.validation.gstin')), validateRequiredInputField(translateContent('customerMaster.validation.gstin'))]}>
                                        <Input maxLength={50} onInput={convertToUpperCase} placeholder={preparePlaceholderText(translateContent('customerMaster.placeholder.gstin'))} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label={translateContent('customerMaster.label.Categorization')} initialValue={formData?.applicationCategorization} name="applicationCategorization">
                                        <Select maxLength={50} onChange={handleUsageApplicationChange} placeholder={preparePlaceholderSelect(translateContent('customerMaster.placeholder.category'))}>
                                            {appCategoryData.APP_CAT?.map((item) => (
                                                <Option key={'ap' + item.key} value={item.key} type={item?.type}>
                                                    {item.value}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>

                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label={translateContent('customerMaster.label.SubCategory')} initialValue={formData?.applicationSubCategory} name="applicationSubCategory">
                                        <Select maxLength={50} onChange={handleAppSubCategoryChange} placeholder={preparePlaceholderSelect(translateContent('customerMaster.placeholder.subCategory'))}>
                                            {appCategoryData[subApplication]?.map((item) => (
                                                <Option key={'sc' + item.key} value={item.key}>
                                                    {item.value}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>

                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label={translateContent('customerMaster.label.customerCategory')} initialValue={formData?.customerCategory} name="customerCategory">
                                        <Select maxLength={50} onChange={handleCategoryChange} placeholder={preparePlaceholderSelect(translateContent('customerMaster.placeholder.cusCategory'))}>
                                            {appCategoryData.APP_CUST_CAT?.map((item) => (
                                                <Option key={'ct' + item.key} value={item?.key} parentKey={item?.parentKey}>
                                                    {item?.value}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            {customerCategory === USAGE_APPLICATION_CONSTANT?.FLEET?.key && (
                                <>
                                    <Divider />
                                    <Row gutter={20}>
                                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                            <Form.Item label={translateContent('customerMaster.label.businessDetails')} initialValue={formData?.businessDetails} name="businessDetails">
                                                <Input maxLength={50} placeholder={preparePlaceholderText(translateContent('customerMaster.placeholder.businessDetails'))} />
                                            </Form.Item>
                                        </Col>

                                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                            <Form.Item label={translateContent('customerMaster.label.vehicleDeployment')} initialValue={formData?.vechileDeploymentDetails} name="vechileDeploymentDetails">
                                                <Input maxLength={50} placeholder={preparePlaceholderText(translateContent('customerMaster.placeholder.vehicleDeployment'))} />
                                            </Form.Item>
                                        </Col>

                                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                            <Form.Item label={translateContent('customerMaster.label.keyRoleDetails')} initialValue={formData?.keyRouteDetails} name="keyRoleDetails">
                                                <Input maxLength={50} placeholder={preparePlaceholderText(translateContent('customerMaster.placeholder.keyRole'))} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={20}>
                                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                            <Form.Item label={translateContent('customerMaster.label.majorRouteDetails')} initialValue={formData?.majorRouteDetails} name="majorRouteDetails">
                                                <Input maxLength={50} placeholder={preparePlaceholderText(translateContent('customerMaster.placeholder.route'))} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </>
                            )}
                        </Panel>
                    </Collapse>

                    <Collapse defaultActiveKey={['3']} expandIcon={expandIcon} expandIconPosition="end" collapsible="icon">
                        <Panel key="3" header={translateContent('customerMaster.drawerSubHeading.accountTitle')}>
                            <Divider />
                            <Row gutter={20}>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label={translateContent('customerMaster.label.accCode')} initialValue={formData?.keyAccountDetails && formData?.keyAccountDetails?.accountCode} name="accountCode">
                                        <Input maxLength={50} placeholder={preparePlaceholderText(translateContent('customerMaster.placeholder.accCode'))} disabled />
                                    </Form.Item>
                                </Col>

                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label={translateContent('customerMaster.label.accName')} initialValue={formData?.keyAccountDetails && formData?.keyAccountDetails?.accountName} name="accountName">
                                        <Input maxLength={50} placeholder={preparePlaceholderText(translateContent('customerMaster.placeholder.accName'))} disabled />
                                    </Form.Item>
                                </Col>

                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label={translateContent('customerMaster.label.accSegment')} initialValue={formData?.keyAccountDetails && formData?.keyAccountDetails?.accountSegment} name="accountSegment">
                                        <Input maxLength={50} placeholder={preparePlaceholderText(translateContent('customerMaster.placeholder.accSegment'))} disabled />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label={translateContent('customerMaster.label.accClient')} initialValue={formData?.keyAccountDetails && formData?.keyAccountDetails?.accountClientName} name="accountClientName">
                                        <Input maxLength={50} placeholder={preparePlaceholderText(translateContent('customerMaster.placeholder.accClient'))} disabled />
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label={translateContent('customerMaster.label.accDate')} initialValue={formData?.keyAccountDetails && formData?.keyAccountDetails?.accountMappingDate} name="accountMappingDate">
                                        <Input maxLength={50} placeholder={preparePlaceholderText(translateContent('customerMaster.placeholder.accMapping'))} disabled />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Panel>
                    </Collapse>
                </Col>
            </Row>
        </>
    );
};

export const AddEditForm = AddEditFormMain;
