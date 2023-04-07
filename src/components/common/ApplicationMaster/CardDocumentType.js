import React, { useState } from 'react';
import {  Col, Card,Row, Button } from 'antd';
import { FiEdit } from 'react-icons/fi';
import { Typography } from 'antd';

import styles from 'pages/common/Common.module.css';
import style from 'components/common/DrawerAndTable.module.css';

const { Text } = Typography;

const CardDocumentType = (prop) => {
    const {tncReq, signatureReq, documentName, docCode, form} = prop;

    const handleEdit = (data) => {
        console.log("data", data)
        form.setFieldsValue(data);
    } ;


    return <>
        <Card
            style={{
                width: 440,
                backgroundColor: "#BEBEBE1A",
                marginTop: '12px',
                border: '1px solid rgba(62, 62, 62, 0.1)',
            }}
        >
            <Row >
                <Col xs={22} sm={22} md={22} lg={22} xl={22} xxl={22}>
                    <Row align="middle">
                        <Col xs={10} sm={10} md={10} lg={10} xl={10} xxl={10} >
                            <Text type="secondary">T&C Required: </Text> {tncReq ? <Text type="success">Active</Text> : <Text>Inactive</Text> }
                        </Col>
                        <Col xs={10} sm={10} md={10} lg={10} xl={10} xxl={10} >
                            <Text type="secondary">Signature: </Text> {signatureReq ? <Text type="success">Active</Text> : <Text>Inactive</Text> }
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} >
                            <Text strong>{documentName || 'Document name 1'}</Text>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} >
                            <Text type="secondary">Code: {docCode || 'B6G431'}</Text>
                        </Col>
                    </Row>
                </Col>
                <Col xs={2} sm={2} md={2} lg={2} xl={2} xxl={2} >
                    <Button icon={<FiEdit/>} onClick={()=>handleEdit(prop)}>
                    </Button>
                </Col>
            </Row>
        </Card>
    </>
}

export default CardDocumentType;