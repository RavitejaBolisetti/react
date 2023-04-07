import { Card, Row, Col, Typography, Button } from 'antd';
import React from 'react';
import { FiDelete, FiTrash } from 'react-icons/fi';

const { Text } = Typography;

function LocationCard({location}) {
    return (
        <Card
            style={{
                width: 440,
                backgroundColor: '#BEBEBE1A',
                marginTop: '12px',
            }}
        >
            <Row>
                <Col xs={22} sm={22} md={22} lg={22} xl={22} xxl={22}>
                    <Text strong>Dealer Location</Text>
                </Col>
                <Col xs={2} sm={2} md={2} lg={2} xl={2} xxl={2}>
                    <Button icon={<FiTrash/>}>
                        {/* <FiEdit style={{ cursor: "pointer", color: "#FF3E5B" }} /> */}
                    </Button>
                </Col>
            </Row>
        </Card>
    );
}

export default LocationCard;
