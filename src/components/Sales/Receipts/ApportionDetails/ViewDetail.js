/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Card, Divider, Typography } from 'antd';
import styles from 'assets/sass/app.module.scss';

import { DataTable } from 'utils/dataTable';

import { tableColumnApportion } from './tableColumnApportion';
import { QUERY_BUTTONS_CONSTANTS } from '../QueryButtons';

const { Text } = Typography;

const ViewDetailMain = (props) => {
    const { formActionType, tableData, bindCodeValue, receiptStatus } = props;

    return (
        <Card>
            <Row gutter={20} className={styles.marB20}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Text strong>Apportion Details</Text>
                </Col>
            </Row>
            <Divider />
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <DataTable tableColumn={tableColumnApportion({ formActionType, bindCodeValue })} scroll={{ x: 1000 }} tableData={tableData} pagination={false} />
                    {receiptStatus === QUERY_BUTTONS_CONSTANTS.APPORTION.key && <p className={styles.marB20}>The entire paid amount has been apportioned. Cannot be apportioned further.</p>}
                </Col>
            </Row>
        </Card>
    );
};

export const ViewDetail = ViewDetailMain;
