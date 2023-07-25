/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Space, Collapse, Descriptions } from 'antd';

import styles from 'components/common/Common.module.css';
import dayjs from 'dayjs';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { DATA_TYPE } from 'constants/dataType';
import { USER_TYPE } from 'constants/userType';

import { expandIcon } from 'utils/accordianExpandIcon';
const { Panel } = Collapse;

const ViewDetailMain = (props) => {
 
        const { 
              formData,
              isLoading,
              activeKey,
              onChange,
              userType,
             } = props;
             
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
        
    };

    const mnfcWarrEndDate = dayjs(formData?.mnfcWarrEndDate).format('DD/MM/YYYY');
    const deliveryDate = dayjs(formData?.deliveryDate).format('DD/MM/YYYY');
    const saleDate = dayjs(formData?.saleDate).format('DD/MM/YYYY');
    const nextServiceDueDate = dayjs(formData?.nextServiceDueDate).format('DD/MM/YYYY');
    const insuranceExpiryDate = dayjs(formData?.insuranceExpiryDate).format('DD/MM/YYYY');
    const pucExpiryDate = dayjs(formData?.pucExpiryDate).format('DD/MM/YYYY');

    return (
        <div className={styles.drawerCardView}>
            <Row gutter={20}>
                
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Space direction="vertical" size="middle" className={styles.accordianContainer}>
                        <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(1)} expandIconPosition="end" className={styles.collapseContainer}>
                            <Panel header="Vehicle Purchase Order" key="1">
                                <Descriptions {...viewProps}>
                                    <Descriptions.Item label="Purchase Order ID">{checkAndSetDefaultValue(mnfcWarrEndDate, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="Purchase Order Date">{checkAndSetDefaultValue(deliveryDate, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="Order Type">{checkAndSetDefaultValue(saleDate, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="Status">{checkAndSetDefaultValue(formData?.soldBy, isLoading)}</Descriptions.Item>
                                    
                                    </Descriptions>
                            </Panel>
                        </Collapse>

                        {/* <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(2)} expandIconPosition="end" className={styles.collapseContainer}>
                            <Panel header="Registration Number Change Request" key="2">
                                <div>Coming Soon...</div>
                            </Panel>
                        </Collapse> */}
                    </Space>
                </Col>
            </Row>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
