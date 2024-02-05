/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Card, Descriptions, Row, Input, Col, Select, Form, Divider, Button, Collapse, Typography, Switch } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { translateContent } from 'utils/translateContent';
import { validateRequiredInputField } from 'utils/validation';
import { expandIcon } from 'utils/accordianExpandIcon';
import { UploadUtil } from 'utils/Upload';

const { TextArea } = Input;
const { Option } = Select;
const { Panel } = Collapse;
const { Text } = Typography;

const ViewDetailMain = (props) => {
    const { formData, isLoading, handleClearChange, mandatoryFields, selectProps, styles } = props;
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    const [isClaimType, setisClaimType] = useState(false);

    return (
        <>
            <Card>
                {/* <Switch checkedChildren={translateContent('global.yesNo.yes')} unCheckedChildren={translateContent('global.yesNo.no')} onChange={() => setisClaimType((prev) => !prev)} />
                <Divider /> */}

                <Descriptions {...viewProps}>
                    <Descriptions.Item label={'Claim Type' || translateContent('amcRegistration.label.customerCategory')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerCity, isLoading)}</Descriptions.Item>

                    {isClaimType && (
                        <>
                            <Descriptions.Item label={'Retail Invoice Number' || translateContent('amcRegistration.label.customerCategory')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerCity, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label={'Retail Invoice Date' || translateContent('amcRegistration.label.customerCategory')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerCity, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label={'Chassis No' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.district, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label={'Approved Amount' || translateContent('amcRegistration.label.customerCategory')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerCity, isLoading)}</Descriptions.Item>
                        </>
                    )}
                    {!isClaimType && (
                        <>
                            <Descriptions.Item label={'Model Group' || translateContent('amcRegistration.label.customerCategory')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerCity, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label={'Model Variant' || translateContent('amcRegistration.label.customerCategory')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerCity, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label={'Model Code' || translateContent('amcRegistration.label.customerCategory')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerCity, isLoading)}</Descriptions.Item>
                        </>
                    )}
                    <Descriptions.Item label={'IGST/CGST/SGST Rate' || translateContent('amcRegistration.label.customerCategory')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerCity, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'IGST/CGST/SGST Amount' || translateContent('amcRegistration.label.customerCategory')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerCity, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'Claim Status' || translateContent('amcRegistration.label.customerCategory')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerCity, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'Remarks' || translateContent('amcRegistration.label.customerCategory')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerCity, isLoading)}</Descriptions.Item>

                    {!isClaimType && (
                        <>
                            <Descriptions.Item label={'Scheme Reference' || translateContent('amcRegistration.label.customerCategory')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerCity, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label={'Qty' || translateContent('amcRegistration.label.customerCategory')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerCity, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label={'Per Vehicle Amount' || translateContent('amcRegistration.label.customerCategory')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerCity, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label={'Approved Amount Per Vehicle' || translateContent('amcRegistration.label.customerCategory')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerCity, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label={'Total Claim Amount' || translateContent('amcRegistration.label.customerCategory')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerCity, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label={'Total Approved Amount' || translateContent('amcRegistration.label.customerCategory')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerCity, isLoading)}</Descriptions.Item>
                            {/* <Descriptions.Item label={'Dealer Claim Letter' || translateContent('amcRegistration.label.customerCategory')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerCity, isLoading)}</Descriptions.Item> */}
                            <Descriptions.Item label={'Target based' || translateContent('amcRegistration.label.customerCategory')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerCity, isLoading)}</Descriptions.Item>
                        </>
                    )}
                </Descriptions>
            </Card>

            <Collapse
                className={styles.marB20}
                // onChange={() => handleCollapse(i)}
                expandIconPosition="end"
                expandIcon={expandIcon}
                //  activeKey={openAccordian}
                collapsible="icon"
            >
                <Panel
                    // key={i}
                    header={'Upload Document'}
                >
                    <Divider />
                    <Row gutter={16}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <UploadUtil />
                        </Col>
                    </Row>
                </Panel>
            </Collapse>
        </>
    );
};

const ViewDetail = ViewDetailMain;
export default ViewDetail;
