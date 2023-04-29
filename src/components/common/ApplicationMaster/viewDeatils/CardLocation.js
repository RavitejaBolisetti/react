import React from 'react';
import { Card, Col, Row, Typography } from 'antd';
import style from './../../Common.module.css';

const { Text } = Typography;

const CardLocation = ({ locationName }) => {
    return (
        <Card
            className={style.viewCardSize}
        >
            <Row>
                <Col xs={22} sm={22} md={22} lg={22} xl={22} xxl={22}>
                    <Text strong>{locationName}</Text>
                </Col>
            </Row>
        </Card>
    );
};

export default CardLocation;
