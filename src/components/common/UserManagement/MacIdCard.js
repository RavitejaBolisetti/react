/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Row, Button, Space, Card } from 'antd';
import style from './UserManagement.module.css';
import { AiOutlineClose } from 'react-icons/ai';

const MacIdCard = ({ AccessMacid, handleDelete, isViewModeVisible }) => {
    return (
        <Space
            direction="vertical"
            size="middle"
            style={{
                display: 'flex',
            }}
        >
            {AccessMacid?.map((el) => {
                return (
                    <Card className={style.usermanagementCard}>
                        <Row gutter={20} className={style.alignUsermanagementCard}>
                            <Col xs={20} sm={20} md={20} lg={20} xl={20} xxl={20}>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                        <span>MAC ID</span>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                        <span>{el?.macid}</span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                                {!isViewModeVisible && (
                                    <Button className={style.crossButton} type="danger" onClick={(event) => handleDelete(event, el?.key)}>
                                        <AiOutlineClose />
                                    </Button>
                                )}
                            </Col>
                        </Row>
                    </Card>
                );
            })}
        </Space>
    );
};

export default MacIdCard;
