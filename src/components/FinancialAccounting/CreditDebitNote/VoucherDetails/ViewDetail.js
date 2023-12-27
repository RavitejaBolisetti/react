/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React from 'react';
import { Collapse, Divider } from 'antd';

import { DataTable } from 'utils/dataTable';
import { tableColumn } from './tableColumn';
import { expandIcon } from 'utils/accordianExpandIcon';
import { translateContent } from 'utils/translateContent';

const { Panel } = Collapse;

const ViewDetailMain = (props) => {
    const { styles, collapseProps, formActionType, tableData, isLoading } = props;

    return (
        <div className={styles.viewDrawerContainer}>
            <Collapse collapsible="icon" expandIcon={expandIcon} defaultActiveKey={[1]} expandIconPosition="end" {...collapseProps}>
                <Panel header={translateContent('creditDebitNote.voucherDetails.label.voucherDetails')} key="1">
                    <Divider />
                    <DataTable isLoading={isLoading} tableColumn={tableColumn({ formActionType })} tableData={tableData} pagination={false} />
                </Panel>
            </Collapse>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
