/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React, { useState } from 'react';
import { Space, Collapse, Typography, Descriptions, Card, Divider, Row, Col } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { DataTable } from 'utils/dataTable';
import { aggregatesCoulmn } from './tableCoulmn';
import { InputSkeleton } from 'components/common/Skeleton';
import { addToolTip } from 'utils/customMenuLink';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { tableColumn } from './tableCoulmn';

import { expandIcon } from 'utils/accordianExpandIcon';
import { convertDateToCalender } from 'utils/formatDateTime';
import { NoDataFound } from 'utils/noDataFound';

const { Panel } = Collapse;
const { Text } = Typography;

const ViewDetailMain = (props) => {
    const { styles, bindCodeValue, bindStatus, formData, collapseProps, disabledProps, tooltTipText, isLoading, optionsServiceModified, formActionType, tableProps } = props;
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    return (
        <div className={styles.viewDrawerContainer}>
            <Space style={{ display: 'flex' }} direction="vertical" size="middle">
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <DataTable {...tableProps} />
                    </Col>
                </Row>
            </Space>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
