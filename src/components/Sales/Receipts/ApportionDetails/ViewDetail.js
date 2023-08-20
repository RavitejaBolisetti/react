/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Card, Divider, Typography } from 'antd';
import styles from 'components/common/Common.module.css';

import { DataTable } from 'utils/dataTable';

import { tableColumnApportion } from './tableColumnApportion';

const { Text } = Typography;

const ViewDetailMain = (props) => {
    const { formActionType, tableData, bindCodeValue } = props;

    return (
        <Card className={styles.drawerCardView}>
            <Row gutter={20} className={styles.marB20}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Text strong>Apportion Details</Text>
                </Col>
            </Row>
            <Divider />
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <DataTable tableColumn={tableColumnApportion({ formActionType, bindCodeValue })} scroll={{ x: 1000 }} tableData={tableData} pagination={false} />
                    {/* <ListDataTable {...viewProps} showAddButton={false} /> */}
                </Col>
            </Row>
        </Card>
    );
};

export const ViewDetail = ViewDetailMain;
