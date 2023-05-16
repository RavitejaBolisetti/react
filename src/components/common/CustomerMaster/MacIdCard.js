import React, { useState, useEffect } from 'react';
import { Col, Input, Form, Row, Select, Button, InputNumber, DatePicker, Space, Card, Collapse } from 'antd';
import style from 'components/common/Common.module.css';
import { AiOutlinePlusSquare, AiOutlineMinusSquare, AiOutlineClose } from 'react-icons/ai';

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
