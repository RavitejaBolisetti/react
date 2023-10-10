/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React from 'react';
import { Space, Row, Col } from 'antd';

import { DataTable } from 'utils/dataTable';

const ViewDetailMain = (props) => {
    const { styles, tableProps, requestPayload } = props;

    return (
        <div className={styles.viewDrawerContainer}>
            <Space style={{ display: 'flex' }} direction="vertical" size="middle">
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <DataTable {...tableProps} tableData={requestPayload?.vehicleDeliveryCheckList?.deliveryChecklistDtos || []} totalRecords={requestPayload?.vehicleDeliveryCheckList?.deliveryChecklistDtos?.length} />
                    </Col>
                </Row>
            </Space>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
