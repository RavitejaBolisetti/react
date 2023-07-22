/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Space, Collapse, Descriptions, Card, Divider } from 'antd';

import styles from 'components/common/Common.module.css';
import dayjs from 'dayjs';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { DATA_TYPE } from 'constants/dataType';
import { USER_TYPE } from 'constants/userType';

import { expandIcon } from 'utils/accordianExpandIcon';
const { Panel } = Collapse;

const ViewDetailMain = (props) => {
    const { formData, isLoading, activeKey, onChange, userType } = props;

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    return (
        <div className={styles.drawerCardView}>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Space direction="vertical" size="middle" className={styles.accordianContainer}>
                        <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(1)} expandIconPosition="end" className={styles.collapseContainer}>
                            <Panel header="Vehicle Details" key="1">
                                <Divider />
                                <Descriptions {...viewProps}>
                                    <Descriptions.Item label="Manufacturer Warranty End Date">{checkAndSetDefaultValue(formData?.mnfcWarrEndDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                                    <Descriptions.Item label="Delivery Date">{checkAndSetDefaultValue(formData?.deliveryDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                                    <Descriptions.Item label="Sale Date">{checkAndSetDefaultValue(formData?.saleDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                                    <Descriptions.Item label="Sold By">{checkAndSetDefaultValue(formData?.soldBy, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="Last Odometer Reading">{checkAndSetDefaultValue(formData?.lastOdometerReading, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="Average Run">{checkAndSetDefaultValue(formData?.averageRun, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="Next Due Service">{checkAndSetDefaultValue(formData?.nextDueService, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="Relationship Manager">{checkAndSetDefaultValue(formData?.relationshipManager, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="Next Service Due Date">{checkAndSetDefaultValue(formData?.nextServiceDueDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                                    <Descriptions.Item label="PUC Expiry Date">{checkAndSetDefaultValue(formData?.pucExpiryDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                                    <Descriptions.Item label="Insurance Expiry Date">{checkAndSetDefaultValue(formData?.insuranceExpiryDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                                    <Descriptions.Item label="Customer Category-SSI">{checkAndSetDefaultValue(formData?.customerCategorySsi, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="Customer Category-CSI">{checkAndSetDefaultValue(formData?.customerCategoryCsi, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="Customer Category-IQS">{checkAndSetDefaultValue(formData?.customerCategoryIqs, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="OEM Priviledge Customer">{checkAndSetDefaultValue(formData?.oemPrivilegeCustomer, isLoading, DATA_TYPE?.BOOL?.key)}</Descriptions.Item>
                                    <Descriptions.Item label="Key Account Vihicle">{checkAndSetDefaultValue(formData?.keyAccountVehicle, isLoading, DATA_TYPE?.BOOL?.key)}</Descriptions.Item>
                                    <Descriptions.Item label="Theft Vihicle">{checkAndSetDefaultValue(formData?.theftVehicle, isLoading, DATA_TYPE?.BOOL?.key)}</Descriptions.Item>
                                    <Descriptions.Item label="PDI Done">{checkAndSetDefaultValue(formData?.pdiDone, isLoading, DATA_TYPE?.BOOL?.key)}</Descriptions.Item>
                                    <Descriptions.Item label="Buy Back Vehicle">{checkAndSetDefaultValue(formData?.buyBackVehicle, isLoading, DATA_TYPE?.BOOL?.key)}</Descriptions.Item>
                                    <Descriptions.Item label="Government Vehicle">{checkAndSetDefaultValue(formData?.govtVehicle, isLoading, DATA_TYPE?.BOOL?.key)}</Descriptions.Item>
                                    <Descriptions.Item label="Taxi/Non Taxi">{checkAndSetDefaultValue(formData?.taxiOrNonTaxi, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="M&M CTC Vehicle">{checkAndSetDefaultValue(formData?.mnmCtcVehicle, isLoading, DATA_TYPE?.BOOL?.key)}</Descriptions.Item>
                                    <Descriptions.Item label="Managed By">{checkAndSetDefaultValue(formData?.manageBy, isLoading)}</Descriptions.Item>
                                    {userType === USER_TYPE?.ADMIN?.key && (
                                        <>
                                            <Descriptions.Item label="Warranty Blocked">{checkAndSetDefaultValue(formData?.warrantyBlocked, isLoading, '', DATA_TYPE?.BOOL?.key)}</Descriptions.Item>
                                            <Descriptions.Item label="Care Plus">{checkAndSetDefaultValue(formData?.carePlus, isLoading)}</Descriptions.Item>
                                            <Descriptions.Item label="Legal">{checkAndSetDefaultValue(formData?.legal, isLoading)}</Descriptions.Item>
                                            <Descriptions.Item label="Dealership Vehicle">{checkAndSetDefaultValue(formData?.dealershipVehicle, isLoading)}</Descriptions.Item>
                                        </>
                                    )}
                                </Descriptions>
                            </Panel>
                        </Collapse>

                        <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(2)} expandIconPosition="end" className={styles.collapseContainer}>
                            <Panel header="Registration Number Change Request" key="2">
                                <Divider />
                                <div>Coming Soon</div>
                            </Panel>
                        </Collapse>
                    </Space>
                </Col>
            </Row>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
