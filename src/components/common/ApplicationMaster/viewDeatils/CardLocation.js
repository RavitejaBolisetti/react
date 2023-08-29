/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Card, Col, Row, Typography } from 'antd';
import styles from 'assets/sass/app.module.scss';
//import styles from 'components/common/Common.module.css';

const { Text } = Typography;

const CardLocation = ({ locationName }) => {
    return (
        <Card className={styles.viewCardSize}>
            <Row>
                <Col xs={22} sm={22} md={22} lg={22} xl={22} xxl={22}>
                    <Text strong>{locationName}</Text>
                </Col>
            </Row>
        </Card>
    );
};

export default CardLocation;
