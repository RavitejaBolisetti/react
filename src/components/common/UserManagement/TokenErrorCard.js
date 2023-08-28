/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Row } from 'antd';
import { IoBanOutline } from 'react-icons/io5';
import styles from 'components/common/Common.module.css';
import { LANGUAGE_EN } from 'language/en';





  
const TokenErrorCard = ({ filterString }) => {
    const tokenValidateErrorMessage = LANGUAGE_EN.GENERAL.USER_TOKEN_VALIDATION.MESSAGE;


    return (
        <Row gutter={20}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <div className={styles.dataDisplay}>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.errorDisplay}>
                            <IoBanOutline />
                            <span>{tokenValidateErrorMessage.replace('{DealerSearchvalue}', filterString)} </span>
                            {/* <span>User token number {filterString} does not exist. Try again with valid token number.</span> */}
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
    );
};

export default TokenErrorCard;