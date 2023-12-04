/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Card, Descriptions, Row, Input, Col, Select, Form, Divider } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { translateContent } from 'utils/translateContent';
import { validateRequiredInputField } from 'utils/validation';

const { TextArea } = Input;
const { Option } = Select;

const ViewDetailMain = (props) => {
    const { formData, isLoading, handleClearChange, mandatoryFields, selectProps } = props;
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    const claimtype = [
        { key: 1, value: 'Corporate Claim' },
        { key: 2, value: 'Additional Corporate Claim' },
    ];
    return (
        <>
            <Card>
                <Descriptions {...viewProps}>
                    <Descriptions.Item label={'Emp Request ID' || translateContent('amcRegistration.label.customerName')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.invoiceNo, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'Request Date' || translateContent('amcRegistration.label.invoiceDate')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerAddress, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'Request Status' || translateContent('amcRegistration.label.customerCategory')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerCity, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'Reason for Delay' || translateContent('amcRegistration.label.customerCategory')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerCity, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'Invoice ID' || translateContent('amcRegistration.label.customerCategory')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerCity, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'Invoice Date' || translateContent('amcRegistration.label.customerCategory')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerCity, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'Invoice Status' || translateContent('amcRegistration.label.customerCategory')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerCity, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'Segment' || translateContent('amcRegistration.label.customerCategory')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerCity, isLoading)}</Descriptions.Item>

                    <Descriptions.Item label={'Model Description' || translateContent('amcRegistration.label.customerName')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.state, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'Chassis No' || translateContent('amcRegistration.label.customerId')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerCode, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'Customer Name' || translateContent('amcRegistration.label.customerName')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.state, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'Requested Amount' || translateContent('amcRegistration.label.customerCategory')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerCity, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'Dealer remarks' || translateContent('amcRegistration.label.customerCategory')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerCity, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'VDN ID' || translateContent('amcRegistration.label.customerCategory')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerCity, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'VDN Date' || translateContent('amcRegistration.label.customerCategory')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerCity, isLoading)}</Descriptions.Item>
                </Descriptions>
                <Divider />
                <Descriptions {...viewProps}>
                    <Descriptions.Item label={'Credit Note No.' || translateContent('amcRegistration.label.customerName')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.state, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'Credit Note Date.' || translateContent('amcRegistration.label.customerId')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerCode, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'Credit Note Amount' || translateContent('amcRegistration.label.customerName')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.state, isLoading)}</Descriptions.Item>

                    <Descriptions.Item label={'Debit Note No.' || translateContent('amcRegistration.label.customerName')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.state, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'Debit Credit Note Date.' || translateContent('amcRegistration.label.customerId')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerCode, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'Debit Note Amount' || translateContent('amcRegistration.label.customerName')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.state, isLoading)}</Descriptions.Item>
                </Descriptions>
                <Row>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form.Item label={'Remarks' || translateContent('customerMaster.label.documentType')} name="documentTypeId" rules={mandatoryFields ? [validateRequiredInputField(translateContent('customerMaster.validation.documentType'))] : ''} placeholder={translateContent('customerMaster.placeholder.documentType')}>
                            <TextArea
                                autoSize={{
                                    minRows: 1,
                                    maxRows: 3,
                                }}
                                placeholder="Remarks"
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Card>

            {/* <Card>
                <Row gutter={16}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form.Item label={'Claim Type' || translateContent('customerMaster.label.documentType')} name="claimType" rules={true ? [validateRequiredInputField(translateContent('customerMaster.validation.documentType'))] : ''} placeholder={translateContent('customerMaster.placeholder.documentType')}>
                            <Select loading={!(claimtype?.length !== 0)} onChange={handleClearChange} placeholder={translateContent('global.placeholder.select')} {...selectProps}>
                                {claimtype?.map((item) => (
                                    <Option key={item?.key} value={item?.key}>
                                        {item?.value}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form.Item label={'Remarks' || translateContent('customerMaster.label.documentType')} name="documentTypeId" rules={mandatoryFields ? [validateRequiredInputField(translateContent('customerMaster.validation.documentType'))] : ''} placeholder={translateContent('customerMaster.placeholder.documentType')}>
                            <TextArea
                                autoSize={{
                                    minRows: 1,
                                    maxRows: 3,
                                }}
                                placeholder="Remarks"
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Card> */}
        </>
    );
};

const ViewDetail = ViewDetailMain;
export default ViewDetail;
