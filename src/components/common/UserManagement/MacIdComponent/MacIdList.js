/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Row, Button, Space, Card, Typography, Divider } from 'antd';
import styles from './../UserManagement.module.css';
import { AiOutlineClose } from 'react-icons/ai';

const { Text } = Typography;

const MacIdList = ({ accessMacid, handleDelete, isViewModeVisible }) => {
    return (
        <>
            <Divider className={styles.marT20} />
            {accessMacid?.map((el) => {
                return (
                    <Card className={styles.usermanagementCard}>
                        <Row gutter={20} className={styles.alignUsermanagementCard}>
                            <Col xs={20} sm={20} md={20} lg={20} xl={20} xxl={20}>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                        <Text type="secondary">MAC ID</Text>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                        <Text strong>{el?.macid}</Text>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                                {!isViewModeVisible && (
                                    <Button className={styles.crossButton} type="danger" onClick={(event) => handleDelete(event, el?.macid)}>
                                        <AiOutlineClose />
                                    </Button>
                                )}
                            </Col>
                        </Row>
                    </Card>
                );
            })}
        </>
    );
};

export default MacIdList;
