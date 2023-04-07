import React, { useState } from 'react';
import {  Col, Card,Row, Button } from 'antd';
import { FiEdit } from 'react-icons/fi';
import { Typography } from 'antd';

import styles from 'pages/common/Common.module.css';
import style from 'components/common/DrawerAndTable.module.css';

const { Text } = Typography;


const CardApplicationAction = (props) => {
    const {status, name, id} = props;

    const handleEdit = (data) => {
        console.log(data);
    };

    return <>
        <Card
            style={{
                width: 440,
                backgroundColor: "#BEBEBE1A",
                marginTop: '12px',
            }}
        >
            <Row>
                <Col xs={22} sm={22} md={22} lg={22} xl={22} xxl={22} >
                    <Text type="secondary">Status: </Text> {status ? <Text type="success">Active</Text> : <Text>Inactive</Text>}
                </Col>
            </Row>
            <Row>
                <Col xs={22} sm={22} md={22} lg={22} xl={22} xxl={22} >
                    <p></p>
                    <Text strong>{name || 'Employee Empowerment'}</Text>
                    <p></p>
                    <Text type="secondary">Action ID: {id || 'B6G431'}</Text>
                </Col>

                <Col xs={2} sm={2} md={2} lg={2} xl={2} xxl={2}>
                    <Button icon={<FiEdit/>} onClick={()=> handleEdit(props)}>
                        {/* <FiEdit style={{ cursor: "pointer", color: "#FF3E5B" }} /> */}
                    </Button>
                </Col>
            </Row>
        </Card>
    </>
}

export default CardApplicationAction;