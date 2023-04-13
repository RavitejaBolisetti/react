import React from 'react';
import { Card, Col, Row, Typography } from 'antd';

const { Text } = Typography;

const CardLocation = ({ locationName }) => {
    return (
        <Card
            style={{
                backgroundColor: '#BEBEBE1A',
            }}
        >
            <Row>
                <Col xs={22} sm={22} md={22} lg={22} xl={22} xxl={22}>
                    <Text strong>{locationName || 'Dealer Location'}</Text>
                </Col>
            </Row>
        </Card>
    );
};

export default CardLocation;
