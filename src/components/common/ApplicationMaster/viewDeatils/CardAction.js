/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Card, Row, Col, Typography } from 'antd';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

const { Text } = Typography;

const CardAction = ({ status, actionName, actionId }) => {
    return (
        <Card className={styles.cardView}>
            <Row align="middle">
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Text type="secondary">{translateContent('applicationMaster.text.status')}</Text> {status ? <Text type="success">{translateContent('applicationMaster.text.active')}</Text> : <Text type="secondary">{translateContent('applicationMaster.text.inActive')}</Text>}
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Text strong>{actionName}</Text>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Text type="secondary">{translateContent('applicationMaster.text.actionId')} {actionId}</Text>
                </Col>
            </Row>
        </Card>
    );
};

export default CardAction;
