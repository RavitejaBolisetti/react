/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Card, Typography, Collapse, Divider, Space, Badge } from 'antd';
import { expandIcon } from 'utils/accordianExpandIcon';
import styles from './Dashboard.module.scss';

const { Text } = Typography;
const { Panel } = Collapse;

const actionsData = {
    invoice: {
        title: 'Open Bookings',
        actions: [
            { actionTitle: 'Allotted Bookings', date: undefined },
            { actionTitle: 'Un-Allotted Bookings', date: undefined },
            { actionTitle: 'Pending for Cancellation', date: undefined },
        ],
    },
    poApproval: {
        title: 'Invoice Generation',
        actions: [
            { actionTitle: 'Allotted But Not Invoiced bookings', date: undefined },
            { actionTitle: 'Pending For Cancellation', date: undefined },
        ],
    },
    approvalPending: {
        title: 'Vehicle Delivery Note',
        actions: [
            { actionTitle: 'Invoiced But Not Delivered', date: undefined },
            { actionTitle: 'Pending for Delivery Note Cancellation', date: undefined },
        ],
    },
    invoicePending: {
        title: 'Vehicle Receipt',
        actions: [{ actionTitle: 'Billed But Not Delivered', date: undefined }],
    },
};

const DashboardActionItems = () => {
    const [activeKey, setActiveKey] = useState([]);

    const handleCollapse = (values) => {
        setActiveKey(values);
    };

    return (
        <Card className={styles.dashboardActionItemsContent}>
            <Collapse bordered={false} collapsible="icon" expandIcon={expandIcon} expandIconPosition={'start'} activeKey={activeKey} onChange={handleCollapse}>
                {Object.entries(actionsData || {})?.map(([key, value], index) => (
                    <Panel
                        header={
                            <>
                                <Text>{value?.title}</Text>
                                <Badge showZero count={0} />
                            </>
                        }
                        key={'ac' + index}
                    >
                        <Space size={5} direction="vertical">
                            {value?.actions?.map((action, i) => (
                                <Text key={'aci' + i}>
                                    {action?.actionTitle}{' '}
                                    {action?.date && (
                                        <>
                                            <Divider type="vertical" /> <span>{action?.date}</span>
                                        </>
                                    )}
                                </Text>
                            ))}
                        </Space>
                    </Panel>
                ))}
            </Collapse>
        </Card>
    );
};

export default DashboardActionItems;
