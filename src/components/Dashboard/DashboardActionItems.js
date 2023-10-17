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
        title: 'Pending For Invoice Approval',
        actions: [
            { actionTitle: 'Invoice no. 982734987', date: '12 May 2023' },
            { actionTitle: 'Invoice no. 982734987', date: '12 May 2023' },
            { actionTitle: 'Invoice no. 982734987', date: '12 May 2023' },
        ],
    },
    poApproval: {
        title: 'Pending PO approval & SO created with Amount: 182207.23',
        actions: [
            { actionTitle: 'Invoice no. 982734987', date: '02 May 2023' },
            { actionTitle: 'Invoice no. 982734987', date: '12 May 2023' },
        ],
    },
    approvalPending: {
        title: 'Pending For Invoice Approval',
        actions: [
            { actionTitle: 'Invoice no. 982734987', date: '12 Dec 2023' },
            { actionTitle: 'Invoice no. 982734987', date: '25 April 2023' },
            { actionTitle: 'Invoice no. 982734987', date: '14 May 2023' },
            { actionTitle: 'Invoice no. 982734987', date: '28 May 2023' },
        ],
    },
    invoicePending: {
        title: 'Pending For Invoice Approval',
        actions: [
            { actionTitle: 'Invoice no. 982734987', date: '12 May 2023' },
            { actionTitle: 'Invoice no. 982734987', date: '12 May 2023' },
            { actionTitle: 'Invoice no. 982734987', date: '12 May 2023' },
        ],
    },
    poApprovalPending: {
        title: 'Pending PO approval & SO created with Amount: 182207.23',
        actions: [
            { actionTitle: 'Invoice no. 982734987', date: '02 May 2023' },
            { actionTitle: 'Invoice no. 982734987', date: '12 May 2023' },
        ],
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
                                <Badge count={value?.actions?.length} />
                            </>
                        }
                        key={'ac' + index}
                    >
                        <Space size={5} direction="vertical">
                            {value?.actions?.map((action, i) => (
                                <Text key={'aci' + i}>
                                    {action?.actionTitle} <Divider type="vertical" /> <span>{action?.date}</span>
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
