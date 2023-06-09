import React from 'react';
import { Col, Row, Card, Typography, Divider } from 'antd';
import style from 'components/common/Common.module.css';

const { Text } = Typography;

const  accessoriesInformation = {
  partDescription: 'Part Description',
  partNumber:'ALTD16554',
  requiredQuantity:'Quantity 12',
};

const AccessoriesInformationCard = () => {

    return (
        <Card className={style.viewCardSize} key={'2'}>
            <Row align="middle">
                <Col xs={18} sm={18} md={18} lg={18} xl={18} xxl={18}>
                    <Row align="middle">
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <Text strong>{accessoriesInformation?.partDescription}</Text>
                        </Col>
                        <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                            <Text type="secondary">Code: {accessoriesInformation?.partNumber}</Text>
                        </Col>
                        <Divider type="vertical" />
                        <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                            <Text type="secondary">Code: {accessoriesInformation?.requiredQuantity}</Text>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Card>
    );
};

export default AccessoriesInformationCard;
