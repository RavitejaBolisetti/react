/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Button, Divider } from 'antd';
import { FiEdit, FiTrash } from 'react-icons/fi';
import style from 'components/common/Common.module.css';
const { Text } = Typography;
const CardMapping = ({ index, isEditing, handleDelete, handleEdit, element }) => {
    return (
        <Card className={style.viewCardSize}>
            <Row align="middle">
                <Col xs={18} sm={18} md={18} lg={18} xl={18} xxl={18}>
                    <Row align="middle">
                        <Text strong>{'partDescription'}</Text>
                        <Divider type="vertical" />
                        <Text strong> {'partNumber'}</Text>
                    </Row>
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <Text type="secondary">{'Quantity'}</Text>
                        </Col>
                    </Row>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                    <Row justify="end">
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <Button disabled={false} type="link" icon={<FiEdit />} onClick={() => handleEdit(index)}>
                                <Text type="danger">Edit</Text>
                            </Button>
                        </Col>

                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <Button disabled={false} onClick={() => handleDelete(index)} type="link" icon={<FiTrash />}></Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            
        </Card>
    );
};
export default CardMapping;
