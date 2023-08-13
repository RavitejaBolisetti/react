/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React, { useState } from 'react';
import { Space, Collapse, Divider } from 'antd';

import { DataTable } from 'utils/dataTable';
import { tableColumn } from './tableColumn';
import { expandIcon } from 'utils/accordianExpandIcon';

const { Panel } = Collapse;

const ViewDetailMain = (props) => {
    const { styles, collapseProps, formActionType, tableData } = props;
    const [openAccordian, setOpenAccordian] = useState([]);

    const handleCollapse = (key) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };

    return (
        <div className={styles.viewDrawerContainer}>
            <Space style={{ display: 'flex' }} direction="vertical" size="middle">
                <Collapse collapsible="icon" expandIcon={expandIcon} activeKey={openAccordian} onChange={() => handleCollapse(1)} expandIconPosition="end" {...collapseProps}>
                    <Panel header="Voucher Details" key="1">
                        <Divider />
                        <DataTable tableColumn={tableColumn({ formActionType })} tableData={tableData} pagination={false} />
                    </Panel>
                </Collapse>
            </Space>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
