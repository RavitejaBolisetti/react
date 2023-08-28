/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Row, Button, Table } from 'antd';

import { withModal } from 'components/withModal';
import { tableColumn } from './tableColumn';

import styles from 'assets/sass/app.module.scss';
//import styles from 'components/common/Common.module.css';

export const VehicleCustomerSearchForm = (props) => {
    const { onCloseAction } = props;
    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Table
                        columns={tableColumn()}
                        dataSource={[{ key: '1' }, { key: '2' }]}
                        rowSelection={{
                            type: 'radio',
                        }}
                        scroll={{
                            x: 200,
                        }}
                    />
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.alignLeft}>
                    <Button onClick={onCloseAction} danger>
                        Cancel
                    </Button>
                </Col>

                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.alignRight}>
                    <Button htmlType="submit" type="primary">
                        Select
                    </Button>
                </Col>
            </Row>
        </>
    );
};

export const VehicleCustomerSearch = withModal(VehicleCustomerSearchForm, { width: '60%' });
