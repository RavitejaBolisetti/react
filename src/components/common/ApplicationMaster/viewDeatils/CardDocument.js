/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Card, Row, Typography } from 'antd';
import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

const { Text } = Typography;

const CardDocument = ({ documentTypeDescription, documentTypeCode }) => {
    return (
        <>
            <Card className={styles.cardView}>
                <Row align="middle">
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Text strong>{documentTypeDescription}</Text>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Text type="secondary">{translateContent('applicationMaster.text.code')}{documentTypeCode}</Text>
                    </Col>
                </Row>
            </Card>
        </>
    );
};

export default CardDocument;
