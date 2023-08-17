/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Card, Descriptions } from 'antd';
import styles from 'components/common/Common.module.css';

import { ListDataTable } from 'utils/ListDataTable';

const ViewDetailMain = (props) => {
    const { formData, isLoading, typeData, ...viewProps } = props;

    // const viewProps = {
    //     bordered: false,
    //     colon: false,
    //     layout: 'vertical',
    //     column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    // };

    return (
        <Card className={styles.drawerCardView}>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ListDataTable {...viewProps} showAddButton={false} />
                </Col>
            </Row>
        </Card>
    );
};

export const ViewDetail = ViewDetailMain;
