/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React, { useState } from 'react';
import { Collapse, Divider } from 'antd';
import { DataTable } from 'utils/dataTable';
import { expandIcon } from 'utils/accordianExpandIcon';
import { tableColumn } from './tableColumn';

const { Panel } = Collapse;

const ViewDetailMain = (props) => {
    const { tableData, styles, bindCodeValue, collapseProps, formActionType } = props;
    const [openAccordian, setOpenAccordian] = useState([]);

    const handleCollapse = (key) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };

    return (
        <div className={styles.viewDrawerContainer}>
            <Collapse collapsible="icon" expandIcon={expandIcon} activeKey={openAccordian} onChange={() => handleCollapse(1)} expandIconPosition="end" {...collapseProps}>
                <Panel header="Apportion Details" key="1">
                    <Divider />
                    <DataTable scroll={{ x: 1000 }} tableColumn={tableColumn({ formActionType, bindCodeValue })} tableData={tableData} pagination={false} />
                </Panel>
            </Collapse>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
