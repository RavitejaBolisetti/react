/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Collapse, Descriptions, Divider } from 'antd';

import { DATA_TYPE } from 'constants/dataType';
import { USER_TYPE } from 'constants/userType';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { translateContent } from 'utils/translateContent';

import { expandIcon } from 'utils/accordianExpandIcon';

import styles from 'assets/sass/app.module.scss';

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
                    <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(1)} expandIconPosition="end" collapsible="icon">
                        <Panel header={translateContent('vehicleDetail.heading.mainTitle')} key="1">
                            <Divider />
                            <Descriptions {...viewProps}>
                                <Descriptions.Item label={translateContent('vehicleDetail.vehicledetails.label.mnfcWarrEndDate')}>{checkAndSetDefaultValue(formData?.mnfcWarrEndDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('vehicleDetail.vehicledetails.label.manufactureKM')}>{checkAndSetDefaultValue(formData?.manufactureKM, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('vehicleDetail.vehicledetails.label.deliveryDate')}>{checkAndSetDefaultValue(formData?.deliveryDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('vehicleDetail.vehicledetails.label.saleDate')}>{checkAndSetDefaultValue(formData?.saleDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('vehicleDetail.vehicledetails.label.soldBy')}>{checkAndSetDefaultValue(formData?.soldBy, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('vehicleDetail.vehicledetails.label.lastOdometerReading')}>{checkAndSetDefaultValue(formData?.lastOdometerReading, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('vehicleDetail.vehicledetails.label.averageRun')}>{checkAndSetDefaultValue(formData?.averageRun, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('vehicleDetail.vehicledetails.label.nextDueService')}>{checkAndSetDefaultValue(formData?.nextDueService, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('vehicleDetail.vehicledetails.label.relationshipManager')}>{checkAndSetDefaultValue(formData?.relationshipManager, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('vehicleDetail.vehicledetails.label.nextServiceDueDate')}>{checkAndSetDefaultValue(formData?.nextServiceDueDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                                {/* <Descriptions.Item label="PUC Expiry Date">{checkAndSetDefaultValue(formData?.pucExpiryDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item> */}
                                <Descriptions.Item label={translateContent('vehicleDetail.vehicledetails.label.insuranceExpiryDate')}>{checkAndSetDefaultValue(formData?.insuranceExpiryDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('vehicleDetail.vehicledetails.label.customerCategorySsi')}>{checkAndSetDefaultValue(formData?.customerCategorySsi, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('vehicleDetail.vehicledetails.label.customerCategoryCsi')}>{checkAndSetDefaultValue(formData?.customerCategoryCsi, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('vehicleDetail.vehicledetails.label.customerCategoryIqs')}>{checkAndSetDefaultValue(formData?.customerCategoryIqs, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('vehicleDetail.vehicledetails.label.oemPrivilegeCustomer')}>{checkAndSetDefaultValue(formData?.oemPrivilegeCustomer, isLoading, DATA_TYPE?.BOOL?.key)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('vehicleDetail.vehicledetails.label.keyAccountVehicle')}>{checkAndSetDefaultValue(formData?.keyAccountVehicle, isLoading, DATA_TYPE?.BOOL?.key)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('vehicleDetail.vehicledetails.label.theftVehicle')}>{checkAndSetDefaultValue(formData?.theftVehicle, isLoading, DATA_TYPE?.BOOL?.key)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('vehicleDetail.vehicledetails.label.pdiDone')}>{checkAndSetDefaultValue(formData?.pdiDone, isLoading, DATA_TYPE?.BOOL?.key)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('vehicleDetail.vehicledetails.label.buyBackVehicle')}>{checkAndSetDefaultValue(formData?.buyBackVehicle, isLoading, DATA_TYPE?.BOOL?.key)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('vehicleDetail.vehicledetails.label.govtVehicle')}>{checkAndSetDefaultValue(formData?.govtVehicle, isLoading, DATA_TYPE?.BOOL?.key)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('vehicleDetail.vehicledetails.label.taxiOrNonTaxiKey')}>{checkAndSetDefaultValue(formData?.taxiOrNonTaxi, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('vehicleDetail.vehicledetails.label.mnmCtcVehicle')}>{checkAndSetDefaultValue(formData?.mnmCtcVehicle, isLoading, DATA_TYPE?.BOOL?.key)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('vehicleDetail.vehicledetails.label.manageBy')}>{checkAndSetDefaultValue(formData?.manageBy, isLoading)}</Descriptions.Item>
                                {userType === USER_TYPE?.ADMIN?.key && (
                                    <>
                                        <Descriptions.Item label={translateContent('vehicleDetail.vehicledetails.label.warrantyBlocked')}>{checkAndSetDefaultValue(formData?.warrantyBlocked, isLoading, '', DATA_TYPE?.BOOL?.key)}</Descriptions.Item>
                                        <Descriptions.Item label={translateContent('vehicleDetail.vehicledetails.label.carePlus')}>{checkAndSetDefaultValue(formData?.carePlus, isLoading)}</Descriptions.Item>
                                        <Descriptions.Item label={translateContent('vehicleDetail.vehicledetails.label.legal')}>{checkAndSetDefaultValue(formData?.legal, isLoading)}</Descriptions.Item>
                                        <Descriptions.Item label={translateContent('vehicleDetail.vehicledetails.label.dealershipVehicle')}>{checkAndSetDefaultValue(formData?.dealershipVehicle, isLoading)}</Descriptions.Item>
                                    </>
                                )}
                            </Descriptions>
                        </Panel>
                    </Collapse>
                    {/* <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(2)} expandIconPosition="end" collapsible="icon">
                        <Panel header="Registration Number Change Request" key="2">
                            <Divider />
                            <NoDataFound information={noDataTitle} />
                        </Panel>
                    </Collapse> */}
                </Col>
            </Row>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
