/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Button, Card, Col, Descriptions, Input, Row } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { translateContent } from 'utils/translateContent';
import styles from 'assets/sass/app.module.scss';

const { TextArea } = Input;

const ViewDetailMain = (props) => {
    const { formData, isLoading, handleMNMApproval, handleMNMRejection } = props;
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };
    return (
        <>
            <Card>
                <Descriptions {...viewProps}>
                    <Descriptions.Item label={translateContent('overRiderClaim.label.approver') || translateContent('amcRegistration.label.customerCategory')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerCity, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('overRiderClaim.label.requestedDate') || translateContent('amcRegistration.label.invoiceDate')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerAddress, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('overRiderClaim.label.status') || translateContent('amcRegistration.label.invoiceDate')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerAddress, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('overRiderClaim.label.actionDate') || translateContent('amcRegistration.label.invoiceDate')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerAddress, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('overRiderClaim.label.approvedAmount') || translateContent('amcRegistration.label.invoiceDate')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerAddress, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('overRiderClaim.label.remarks') || translateContent('amcRegistration.label.invoiceDate')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerAddress, isLoading)}</Descriptions.Item>
                </Descriptions>
            </Card>

            <Card className={styles.marT20}>
                <Descriptions {...viewProps}>
                    <Descriptions.Item label={translateContent('overRiderClaim.label.approver') || translateContent('amcRegistration.label.customerCategory')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerCity, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('overRiderClaim.label.requestedDate') || translateContent('amcRegistration.label.invoiceDate')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerAddress, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('overRiderClaim.label.status') || translateContent('amcRegistration.label.invoiceDate')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerAddress, isLoading)}</Descriptions.Item>
                </Descriptions>
                <Row gutter={20} className={styles.marB20} justify={'space-between'}>
                    <Col xs={24} sm={6} md={6} lg={6}>
                        <label>{translateContent('overRiderClaim.label.approvedAmount')}</label>
                        <Input name="approvedAmount"></Input>
                    </Col>
                    <Col xs={16} sm={16} md={16} lg={16}>
                        <label>{translateContent('overRiderClaim.label.remarks')}</label>
                        <TextArea
                            autoSize={{
                                minRows: 2,
                                maxRows: 5,
                            }}
                            placeholder={translateContent('overRiderClaim.placeholder.remarks')}
                        />
                    </Col>
                </Row>

                <Row gutter={20} className={styles.marB20}>
                    <Col xs={8} sm={8} md={8} lg={8}>
                        <Button type="primary" onClick={handleMNMApproval}>
                            {translateContent('global.buttons.approve')}
                        </Button>

                        <span className={styles.marL5}>
                            <Button danger onClick={handleMNMRejection}>
                                {translateContent('global.buttons.reject')}
                            </Button>
                        </span>
                    </Col>
                </Row>
            </Card>
        </>
    );
};

const ViewDetail = ViewDetailMain;
export default ViewDetail;
