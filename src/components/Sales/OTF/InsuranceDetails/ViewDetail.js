import React from 'react';
import { Descriptions } from 'antd';
import { Col, Input, Form, Row, Select, Button, InputNumber, DatePicker, Space, Card, Collapse, Typography } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { FaRegPlusSquare, FaPlus, FaRegUserCircle } from 'react-icons/fa';

const { Panel } = Collapse;
const { Text, Link } = Typography;

const ViewDetailMain = (props) => {
    const { activeKey, setactiveKey, onChange, styles, parameterType, handleEdit, onCloseAction } = props;
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };
    const insuranceForm = {
        insuranceComapny: 'Mahindra',
        insuranceCoverNote: 'Thara Thar',
        insuranceAmount: '999',
        date: '10/10/2023',
        registrationNumber: 1020,
    };

    return (
        <div className={`${styles.viewContainer} ${styles.hierarchyRightContaners}`}>
            <Space style={{ display: 'flex' }} direction="vertical" size="middle">
                <Card style={{backgroundColor:'#f2f2f2'}}>
                    <Descriptions {...viewProps}>
                        <Descriptions.Item label="Insurance Company">{insuranceForm?.insuranceComapny}</Descriptions.Item>
                        <Descriptions.Item label="Insurance Cover Note">{insuranceForm?.insuranceCoverNote}</Descriptions.Item>
                        <Descriptions.Item label="Insurance Amount">{insuranceForm?.insuranceAmount}</Descriptions.Item>
                        <Descriptions.Item label="Date">{insuranceForm?.date}</Descriptions.Item>
                        <Descriptions.Item label="Registration Number">{insuranceForm?.registrationNumber}</Descriptions.Item>
                    </Descriptions>
                </Card>
                {/* <Row gutter={20}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Button danger onClick={onCloseAction}>
                            Cancel
                        </Button>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Button type="primary" onClick={handleEdit} className={styles.floatRight}>
                            Edit
                        </Button>
                    </Col>
                </Row> */}
            </Space>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
