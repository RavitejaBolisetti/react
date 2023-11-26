/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
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
                    <Descriptions.Item label={'Invoice Number' || translateContent('amcRegistration.label.customerName')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.invoiceNo, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'Invoice Date' || translateContent('amcRegistration.label.invoiceDate')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerAddress, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'Customer Name' || translateContent('amcRegistration.label.customerName')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.state, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'Customer ID' || translateContent('amcRegistration.label.customerId')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerCode, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'Customer Category' || translateContent('amcRegistration.label.customerCategory')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerCity, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'Corporate Name' || translateContent('amcRegistration.label.customerName')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.state, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'Corporate Category' || translateContent('amcRegistration.label.customerCategory')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerCity, isLoading)}</Descriptions.Item>

                    <Descriptions.Item label={'Chassis Number' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.district, isLoading)}</Descriptions.Item>
                </Descriptions>
                <Divider />
                <Descriptions {...viewProps}>
                    <Descriptions.Item label={'Dealer Share Amount' || translateContent('amcRegistration.label.dealerShareAmount')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.gstin, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'OEM Share Amount' || translateContent('amcRegistration.label.oemShareAmount')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.gstin, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'Total Amount' || translateContent('amcRegistration.label.oemShareAmount')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.gstin, isLoading)}</Descriptions.Item>
                    
                    {/* <Descriptions.Item label={'Approved Dealer Share Amount' || translateContent('amcRegistration.label.dealerShareAmount')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.gstin, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'Approved OEM Share Amount' || translateContent('amcRegistration.label.oemShareAmount')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.gstin, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'Approved Total Amount' || translateContent('amcRegistration.label.oemShareAmount')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.gstin, isLoading)}</Descriptions.Item> */}
    
                    <Descriptions.Item label={'M & M Claim No' || translateContent('amcRegistration.label.mnmClaimNo')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.gstin, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'M & M Claim Date' || translateContent('amcRegistration.label.mnmClaimDate')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.gstin, isLoading)}</Descriptions.Item>

                    <Descriptions.Item label={'Credit Note No.' || translateContent('amcRegistration.label.mnmClaimDate')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.gstin, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'Credit Note Date' || translateContent('amcRegistration.label.mnmClaimDate')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.gstin, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'Credit Note Amount' || translateContent('amcRegistration.label.mnmClaimDate')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.gstin, isLoading)}</Descriptions.Item>

                    <Descriptions.Item label={'Debit Note No.' || translateContent('amcRegistration.label.mnmClaimDate')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.gstin, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'Debit Note Date' || translateContent('amcRegistration.label.mnmClaimDate')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.gstin, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'Debit Note Amount' || translateContent('amcRegistration.label.mnmClaimDate')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.gstin, isLoading)}</Descriptions.Item>
                </Descriptions>
            </Card>

            <Card>
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
                            {/* <label>Remarks</label> */}
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
        </>
    );
};

const ViewDetail = ViewDetailMain;
export default ViewDetail;
