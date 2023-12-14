/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Divider, Collapse, Row, Col } from 'antd';

import { BillingMaster } from './BillingMaster';
import { RetailMaster } from './RetailMaster';
import { StockMaster } from './StockMaster';

import { expandIcon } from 'utils/accordianExpandIcon';
import { translateContent } from 'utils/translateContent';

const { Panel } = Collapse;
export const DashboardKPIMaster = ({ styles }) => {
    const [activeKey, setActiveKey] = useState(false);
    return (
        <Collapse bordered={false} expandIcon={expandIcon} onChange={() => setActiveKey(!activeKey)} collapsible="icon" style={{ background: 'none' }} expandIconPosition="end">
            <Panel header={translateContent('dashboard.heading.dashboardKpi')} key="1">
                <Divider />
                <div className={`${styles.marB20} ${styles.dashboardPieChart}`}>
                    <Row gutter={20}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <BillingMaster />
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <RetailMaster />
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <StockMaster />
                        </Col>
                    </Row>
                </div>
            </Panel>
        </Collapse>
    );
};
