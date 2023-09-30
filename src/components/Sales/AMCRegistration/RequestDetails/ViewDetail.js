/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Button, Card, Row, Col, Divider, Typography } from 'antd';
import styles from 'assets/sass/app.module.scss';
const { Text } = Typography;

const ViewDetail = (props) => {
    const { formData, userType } = props;
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    return (
        <>
            {formData &&
                formData?.map((data) => {
                    return (
                        <Card>
                            <Row type="flex" align="middle">
                                <Col xs={24} sm={24} md={24} lg={24}>
                                    <Text strong>Registration Request</Text>
                                    <Divider type="vertical" />
                                    <Text strong>{data?.name}</Text>
                                    <Divider type="vertical" />
                                    <Text strong>{data?.amcRegNum}</Text>
                                </Col>
                            </Row>

                            <Divider className={styles.marT20} />
                            {userType === 'MNM' ? (
                                <Row gutter={20} className={styles.marB20}>
                                    <Col xs={4} sm={4} md={4} lg={4}>
                                        <Button type="primary">Approve</Button>
                                    </Col>
                                    <Col xs={4} sm={4} md={4} lg={4}>
                                        <Button type="danger">Reject</Button>
                                    </Col>
                                </Row>
                            ) : (
                                <Row gutter={20} className={styles.marB20}>
                                    <Col xs={4} sm={4} md={4} lg={4}>
                                        <Button type="primary">Cancel</Button>
                                    </Col>
                                </Row>
                            )}
                        </Card>
                    );
                })}
        </>
    );
};

export default ViewDetail;
