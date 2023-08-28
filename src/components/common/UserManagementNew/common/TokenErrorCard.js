/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Row } from 'antd';
import { IoBanOutline } from 'react-icons/io5';
import styles from 'assets/sass/app.module.scss';
//import styles from 'components/common/Common.module.css';

const TokenErrorCard = ({ error }) => {
    return (
        <Row gutter={20}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <div className={styles.dataDisplay}>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.errorDisplay}>
                            <IoBanOutline /> <span>{error}</span>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
    );
};

export default TokenErrorCard;
