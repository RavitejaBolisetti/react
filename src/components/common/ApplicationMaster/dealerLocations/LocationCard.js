/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Card, Row, Col, Typography, Button } from 'antd';

import { CloseOutlined } from '@ant-design/icons';
import style from './../ApplicationMaster.module.css';
const { Text } = Typography;

function LocationCard(props) {
    let { locationName, id, handleDeleteLocation } = props;

    return (
        <Card className={style.viewCardSize} key={id}>
            <Row>
                <Col xs={22} sm={22} md={22} lg={22} xl={22} xxl={22}>
                    <Text strong>{locationName?.substring(0, 1)?.toUpperCase() + locationName?.substring(1)}</Text>
                </Col>
                {!id?.length > 0 && (
                    <Col xs={2} sm={2} md={2} lg={2} xl={2} xxl={2} classNam={style.crossAlign}>
                        <Button className={style.anticon} onClick={() => handleDeleteLocation({ locationName })} type="link" icon={<CloseOutlined />}></Button>
                    </Col>
                )}
            </Row>
        </Card>
    );
}

export default LocationCard;
