import React from 'react';
import { Col, Card, Row, Divider, Typography } from 'antd';
import style from './../../Common.module.css';

const { Text } = Typography;

const CardDocument = ({ termAndConRequired, digitalSignatureRequired, documentTypeDescription, documentTypeCode }) => {
    return (
        <>
            <Card className={style.viewCardSize}>
                <Row align="middle">
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Text type="secondary">T&C Required: </Text> {termAndConRequired ? <Text type="success">Active</Text> : <Text type="secondary">Inactive</Text>}
                    </Col>

                    <Divider type="vertical" />

                    <Col xs={10} sm={10} md={10} lg={10} xl={10} xxl={10}>
                        <Text type="secondary">Signature: </Text> {digitalSignatureRequired ? <Text type="success">Active</Text> : <Text type="secondary">Inactive</Text>}
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Text strong>{documentTypeDescription}</Text>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Text type="secondary">Code: {documentTypeCode}</Text>
                    </Col>
                </Row>
            </Card>
        </>
    );
};

export default CardDocument;
