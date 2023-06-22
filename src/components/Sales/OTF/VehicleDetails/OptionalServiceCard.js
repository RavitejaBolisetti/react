/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Card, Typography, Button } from 'antd';
import styles from 'components/common/Common.module.css';
import { FiTrash } from 'react-icons/fi';
const { Text } = Typography;
const OptionalServiceCardMain = (props) => {
    const { index, element, handleDelete } = props;
    return (
        <Card className={styles.viewCardSize}>
            <Row gutter={20}>
                <Col xs={18} sm={18} md={18} lg={18} xl={18} xxl={18}>
                    <Col xs={16} sm={16} md={16} lg={16} xl={16} xxl={16}>
                        <Text type="secondary">
                            Service:<span>{element?.serviceName}</span>
                        </Text>
                    </Col>
                    <Col xs={16} sm={16} md={16} lg={16} xl={16} xxl={16}>
                        <Text type="secondary">
                            Amount:<span>{element?.amount}</span>
                        </Text>
                    </Col>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                    <Row justify="end">
                        <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                            <Button onClick={() => handleDelete(index)} type="link" icon={<FiTrash />}></Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Card>
    );
};
export const OptionalServiceCard = OptionalServiceCardMain;
