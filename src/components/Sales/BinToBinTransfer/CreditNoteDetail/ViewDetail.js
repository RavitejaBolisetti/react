/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Card, Descriptions, Row, Input, Col, Select, Form, Divider, Button } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { translateContent } from 'utils/translateContent';
import { validateRequiredInputField } from 'utils/validation';

const { TextArea } = Input;
const { Option } = Select;

const ViewDetailMain = (props) => {
    const { formData, isLoading, handleClearChange, mandatoryFields, selectProps, styles } = props;
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
                    <Descriptions.Item label={'IRN Number' || translateContent('amcRegistration.label.customerName')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.invoiceNo, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'IRN Status ' || translateContent('amcRegistration.label.invoiceDate')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerAddress, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'IRN Desc ' || translateContent('amcRegistration.label.customerName')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.state, isLoading)}</Descriptions.Item>
                    {/* <Descriptions.Item label={'Generate IRN ' || translateContent('amcRegistration.label.customerId')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerCode, isLoading)}</Descriptions.Item> */}
                    {/* <Descriptions.Item label={'Attach Digital Signature ' || translateContent('amcRegistration.label.customerCategory')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerCity, isLoading)}</Descriptions.Item> */}

                    <Descriptions.Item label={'SAP Credit Note No' || translateContent('amcRegistration.label.invoiceDate')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerAddress, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'SAP Credit Note Date' || translateContent('amcRegistration.label.invoiceDate')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerAddress, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'SAP Credit Note Amount' || translateContent('amcRegistration.label.invoiceDate')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerAddress, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'DMS Credit Note No' || translateContent('amcRegistration.label.invoiceDate')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerAddress, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'DMS Credit Note Date' || translateContent('amcRegistration.label.invoiceDate')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerAddress, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'DMS Credit Note Amount' || translateContent('amcRegistration.label.invoiceDate')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerAddress, isLoading)}</Descriptions.Item>

                    <Descriptions.Item label={'DMS Debit Note No' || translateContent('amcRegistration.label.invoiceDate')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerAddress, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'DMS Debit Note Date' || translateContent('amcRegistration.label.invoiceDate')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerAddress, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'DMS Debit Note Amount' || translateContent('amcRegistration.label.invoiceDate')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerAddress, isLoading)}</Descriptions.Item>
                </Descriptions>
            </Card>
        </>
    );
};

const ViewDetail = ViewDetailMain;
export default ViewDetail;
