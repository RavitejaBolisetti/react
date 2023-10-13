/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { Col, Form, Row, Tag, Typography } from 'antd';
import { withDrawer } from 'components/withDrawer';
import React from 'react';
import imdimg from 'assets/img/vehicleImg.png';

import styles from 'assets/sass/app.module.scss';

const { Text } = Typography;

const NewsDrawerMain = (props) => {
    const { record } = props;
    return (
        <Form autoComplete="off" layout="vertical">
            <Row className={styles.drawerBody}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Text strong>{record?.shortDescription} </Text>
                    <p>
                        <Tag type="default">{record?.date}</Tag>
                    </p>
                    <Text type="secondary">{record?.content?.substring(0, 224)}</Text>
                    <img src={imdimg} alt="" />
                    <Text type="secondary">{record?.content?.substring(225)}</Text>
                </Col>
            </Row>
        </Form>
    );
};

const NewsDrawer = withDrawer(NewsDrawerMain, {});
export default NewsDrawer;
