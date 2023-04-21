import React from 'react';
import { Card, Row, Col, Typography } from 'antd';

import style from "./ApplicationMaster.module.css"
const { Text } = Typography;

const CardAction = ({ isDeleted, actionName, actionId }) => {
    return (
        <Card
           className={style.viewCardSize}
        >
            <Row align="middle">
                <Col xs={16} sm={16} md={16} lg={16} xl={16} xxl={16}>
                    <Text type="secondary">Status: </Text> {isDeleted === 'Y' || isDeleted === true ? <Text type="success">Active</Text> : <Text>Inactive</Text>}
                </Col>
                <Col xs={16} sm={16} md={16} lg={16} xl={16} xxl={16}>
                    <Text strong>{actionName}</Text>
                </Col>
                <Col xs={16} sm={16} md={16} lg={16} xl={16} xxl={16}>
                    <Text type="secondary">Action ID: {actionId}</Text>
                </Col>
            </Row>
        </Card>
    );
};

export default CardAction;
