import React from 'react';
import { Descriptions } from 'antd';
import { Col, Input, Form, Row, Select, Button, InputNumber, Divider, DatePicker, Space, Card, Collapse, Typography } from 'antd';
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
    const customerForm = {
        financier: 'HDFC',
        branch: 'Noida',
        filenumber: 'FA12123',
        loanamoount: '1500000',
        emi: '60',
        financedone: 'Yes',
        dorecived: 'Yes',
        donumber: '121121212123',
        dodate: '12/09/2022',
        arrangedby: 'HDFC',
    };
    const AuthorityForm = {
        delivery: 'Deliver Note',
        deliverynumber: '423453245',
        deliverydate1: '12/10/2022',
        deliverystatus: 'Status',
    };

    return (
        <div className={`${styles.viewContainer} ${styles.hierarchyRightContaners}`}>
            <Space style={{ display: 'flex' }} direction="vertical" size="middle">
                <Card style={{ backgroundColor: '#F2F2F2', borderRadius: '8px' }}>
                    <div className={styles.alignUser}>
                        <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                            Finance Information
                        </Text>
                        <Divider />
                        <Descriptions {...viewProps}>
                            <Descriptions.Item label="Financier">{customerForm?.financier}</Descriptions.Item>
                            <Descriptions.Item label="Branch">{customerForm?.branch}</Descriptions.Item>
                            <Descriptions.Item label="File Number">{customerForm?.filenumber}</Descriptions.Item>
                            <Descriptions.Item label="Loan Amount">{customerForm?.loanamoount}</Descriptions.Item>
                            <Descriptions.Item label="EMI">{customerForm?.emi}</Descriptions.Item>
                            <Descriptions.Item label="Finance Done">{customerForm?.financedone}</Descriptions.Item>
                            <Descriptions.Item label="D.O. Recived">{customerForm?.dorecived}</Descriptions.Item>
                            <Descriptions.Item label="D.O. Number">{customerForm?.donumber}</Descriptions.Item>
                            <Descriptions.Item label="D.O. Date">{customerForm?.dodate}</Descriptions.Item>
                            <Descriptions.Item label="Finance Arranged By">{customerForm?.arrangedby}</Descriptions.Item>
                        </Descriptions>
                    </div>
                </Card>
                <Card style={{ backgroundColor: '#F2F2F2', borderRadius: '8px' }}>
                    <div className={styles.alignUser}>
                        <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                            Invoice/Delivery Information
                        </Text>
                        <Divider />
                        <Descriptions {...viewProps}>
                            <Descriptions.Item label="Delivery Type">{AuthorityForm?.delivery}</Descriptions.Item>
                            <Descriptions.Item label="Invoice/Delivery No">{AuthorityForm?.deliverynumber}</Descriptions.Item>
                            <Descriptions.Item label="Invoice/Delivery Date">{AuthorityForm?.deliverydate1}</Descriptions.Item>
                            <Descriptions.Item label="Invoice/Delivery Status">{AuthorityForm?.deliverystatus}</Descriptions.Item>
                        </Descriptions>
                    </div>
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
