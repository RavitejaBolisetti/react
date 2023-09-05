/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Card, Col, Row, Typography } from 'antd';
import styles from 'assets/sass/app.module.scss';

const { Text } = Typography;

const CardLocation = ({ locationName }) => {
    return (
        <Card className={styles.cardView}>
            <Text strong>{locationName}</Text>
        </Card>
    );
};

export default CardLocation;
