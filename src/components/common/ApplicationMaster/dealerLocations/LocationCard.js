/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Card, Row, Col, Typography, Button } from 'antd';

import { CloseOutlined } from '@ant-design/icons';
import styles from 'assets/sass/app.module.scss';

const { Text } = Typography;

function LocationCard(props) {
    const { locationName, id, handleDeleteLocation } = props;

    return (
        <Card className={styles.cardView} key={id}>
            <Row gutter={20}>
                <Col xs={22} sm={22} md={22} lg={22} xl={22} xxl={22}>
                    <Text strong>{locationName?.substring(0, 1)?.toUpperCase() + locationName?.substring(1)}</Text>
                </Col>
                {!id?.length > 0 && (
                    <Col xs={2} sm={2} md={2} lg={2} xl={2} xxl={2} className={styles.buttonsGroupRight}>
                        <Button icon={<CloseOutlined />} className={styles.verticallyCentered} onClick={() => handleDeleteLocation({ locationName })} type="link"></Button>
                    </Col>
                )}
            </Row>
        </Card>
    );
}

export default LocationCard;
