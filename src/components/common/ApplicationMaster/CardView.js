import React, { useState } from 'react';
import { Col, Card, Row, Button } from 'antd';
import { FiEdit } from 'react-icons/fi';
import { Typography } from 'antd';

import styles from 'pages/common/Common.module.css';
import style from 'components/common/DrawerAndTable.module.css';

const { Text } = Typography;
const CardView = () => {
    return <>
        <Card
            style={{
                width: 250,
                height: 100,
                backgroundColor: "#BEBEBE1A",           
            }}
        >
            {/* <Row>
                <Col xs={10} sm={10} md={10} lg={10} xl={10} xxl={10} >
                    <Text type="secondary">Status: </Text> <Text type="success">Active</Text>
                </Col>
            </Row>
            <Row>
                <Col xs={20} sm={20} md={20} lg={20} xl={20} xxl={20} >
                    <p></p>
                    <Text strong>Employee Empowerment</Text>
                    <p></p>
                    <Text type="secondary">Action ID: B6G431</Text>
                </Col>
            </Row>         */}


            <Row align="middle">
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Text type="secondary">Status: </Text> {'true' ? <Text type="success">Active</Text> : <Text>Inactive</Text>}
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Text strong>{'Employee Empowerment'}</Text>
                        {/* <Text type="secondary">Action ID: {id || 'B6G431'}</Text> */}
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        {/* <Text strong>{applicationName || 'Employee Empowerment'}</Text> */}
                        <Text type="secondary">Action ID: {'id' || 'B6G431'}</Text>
                    </Col>
            </Row>

        </Card>
        
    </>
}

export default CardView;