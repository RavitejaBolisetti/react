import { Card, Row, Col, Typography, Button } from 'antd';
import React from 'react';

import {CloseOutlined} from "@ant-design/icons";
import style from './ApplicationMaster.module.css';
const { Text } = Typography;

function LocationCard(props) {
    let { dealerLocationName, dealerMasterLocationId, id, handleDeleteLocation } = props;
    console.log('props',props)

    return (
        <Card
            style={{
                // width: 440,
                backgroundColor: '#BEBEBE1A',
                marginTop: '12px',
            }}
            key={id}
        >
            <Row>
                <Col xs={22} sm={22} md={22} lg={22} xl={22} xxl={22}>
                    <Text strong>{dealerLocationName }</Text>
                </Col>
                {!id?.length>0 && <Col xs={2} sm={2} md={2} lg={2} xl={2} xxl={2}>
                    <Button onClick={() => handleDeleteLocation({ dealerLocationName })} type="link" icon={<CloseOutlined className={style.anticon}/>}></Button>
                </Col>}
            </Row>
        </Card>
    );
}

export default LocationCard;
