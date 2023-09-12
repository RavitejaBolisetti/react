/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Card, Row, Col, Divider, Typography, Space } from 'antd';
import styles from 'assets/sass/app.module.scss';

const { Text } = Typography;

const BatteryInfoForm = () => {
    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Card className={styles.cardView}>
                        <Text>Main Battery</Text>
                        <div>
                            {/* <Text type="secondary">Exide</Text>
                            <Divider type="vertical" /> */}
                            <Text type="secondary">BGLTD13456</Text>
                        </div>
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Card className={styles.cardView}>
                        <Text>Alternate Battery</Text>
                        <div>
                            {/* <Text type="secondary">Exide</Text>
                            <Divider type="vertical" /> */}
                            <Text type="secondary">BGLTD13456</Text>
                        </div>
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Card className={styles.cardView}>
                        <Text>Standby Battery</Text>
                        <div>
                            {/* <Text type="secondary">Exide</Text>
                            <Divider type="vertical" /> */}
                            <Text type="secondary">BGLTD13456</Text>
                        </div>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default BatteryInfoForm;
