/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Card, Descriptions, Collapse, Divider, Tooltip } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { expandIcon } from 'utils/accordianExpandIcon';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';

const { Panel } = Collapse;

const CustomerAndVehicleViewMain = (props) => {
    const { isLoading, activeKey, onChange, customerData, vehicleDataDetails } = props;

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    const modelInfo = (
        <span>
            {translateContent('crmSchemeEnrolment.label.color')} - {vehicleDataDetails?.colour}
            <div>
                {translateContent('crmSchemeEnrolment.label.seatingCapacity')} - {vehicleDataDetails?.seatingCapacity}
            </div>
            {translateContent('crmSchemeEnrolment.label.variant')} - {vehicleDataDetails?.variants}
        </span>
    );

    return (
        <div className={styles.viewDrawerContainer}>
            <Collapse activeKey={activeKey} onChange={() => onChange(3)} expandIcon={expandIcon} expandIconPosition="end" collapsible="icon">
                <Panel header={translateContent('crmSchemeEnrolment.heading.customerDetails')} key="3">
                    <Divider />
                    <Card>
                        <Descriptions {...viewProps}>
                            <Descriptions.Item label={translateContent('crmSchemeEnrolment.label.customerId')}>{checkAndSetDefaultValue(customerData?.customerId, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label={translateContent('crmSchemeEnrolment.label.customerName')}>{checkAndSetDefaultValue(customerData?.customerName)}</Descriptions.Item>
                            <Descriptions.Item label={translateContent('crmSchemeEnrolment.label.address')}>{checkAndSetDefaultValue(customerData?.customerAddress, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label={translateContent('crmSchemeEnrolment.label.locality')}>{checkAndSetDefaultValue(customerData?.locality, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label={translateContent('crmSchemeEnrolment.label.tehsil')}>{checkAndSetDefaultValue(customerData?.tehsil, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label={translateContent('crmSchemeEnrolment.label.district')}>{checkAndSetDefaultValue(customerData?.district, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label={translateContent('crmSchemeEnrolment.label.city')}>{checkAndSetDefaultValue(customerData?.city, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label={translateContent('crmSchemeEnrolment.label.state')}>{checkAndSetDefaultValue(customerData?.state, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label={translateContent('crmSchemeEnrolment.label.pinCode')}>{checkAndSetDefaultValue(customerData?.pinCode, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label={translateContent('crmSchemeEnrolment.label.mobileNo')}>{checkAndSetDefaultValue(customerData?.mobileNumber, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label={translateContent('crmSchemeEnrolment.label.emailId')}>{checkAndSetDefaultValue(customerData?.emailId, isLoading)}</Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Panel>
            </Collapse>
            <Collapse activeKey={activeKey} onChange={() => onChange(4)} expandIcon={expandIcon} expandIconPosition="end" collapsible="icon">
                <Panel header={translateContent('crmSchemeEnrolment.heading.vehicleDetails')} key="4">
                    <Divider />
                    <Card>
                        <Descriptions {...viewProps}>
                            <Descriptions.Item label={translateContent('crmSchemeEnrolment.label.vehicleNo')}>{checkAndSetDefaultValue(vehicleDataDetails?.vehicleNumber, isLoading)}</Descriptions.Item>
                            {/* <Descriptions.Item label="Model">
                                {checkAndSetDefaultValue(vehicleDataDetails?.model, isLoading)}
                                <Tooltip title={modelInfo} placement="bottom" color="#6495ED" key="#6495ED">
                                    <ExclamationCircleOutlined style={{ color: '#6495ED', margin: '0 0 0 8px' }} />
                                </Tooltip>
                            </Descriptions.Item> */}
                            <Descriptions.Item label={translateContent('crmSchemeEnrolment.label.modelCode')}>{checkAndSetDefaultValue(vehicleDataDetails?.modelCode, isLoading)}</Descriptions.Item>
                            <Descriptions.Item />
                            <Descriptions.Item span={3} label={translateContent('crmSchemeEnrolment.label.model')}>
                                {checkAndSetDefaultValue(vehicleDataDetails?.modelDescription, isLoading)}
                                <Tooltip title={modelInfo} placement="bottom" color="#6495ED" key="#6495ED">
                                    <ExclamationCircleOutlined style={{ color: '#6495ED', margin: '0 0 0 8px' }} />
                                </Tooltip>
                            </Descriptions.Item>
                            <Descriptions.Item label={translateContent('crmSchemeEnrolment.label.saleDate')}>{checkAndSetDefaultValue(vehicleDataDetails?.soldDate || vehicleDataDetails?.saleDate, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label={translateContent('crmSchemeEnrolment.label.soldBy')}>{checkAndSetDefaultValue(vehicleDataDetails?.soldBy, isLoading)}</Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Panel>
            </Collapse>
        </div>
    );
};

export const CustomerAndVehicleView = CustomerAndVehicleViewMain;
