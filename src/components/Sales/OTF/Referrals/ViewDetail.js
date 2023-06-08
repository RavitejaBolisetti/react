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
        customerId: 'MO1085585',
        customerType: 'Individual',
        customerName: 'Vimal Kumar',
        email: 'vimal@gmail.com ',
        mobile: '9876543212',
        regNumber: 'UP16BL2123',
        chassisNumber: 'MAFCL213214547',
        dob: '04/03/1998',
    };
    // const AuthorityForm = {
    //     companyName: 'uttar pradesh',
    //     personName: 'ssss',
    //     postion: '12312',
    //     remarks: 'Delhi',
    // };
    // const keyAccountForm = {
    //     accountClientName: 'uttar pradesh',
    //     accountCode: 'ssss',
    //     accountMappingDate: '12312',
    //     accountName: 'Delhi',
    //     accountSegment: true,
    // };

    return (
        <div className={`${styles.viewContainer} ${styles.hierarchyRightContaners}`}>
            <Space style={{ display: 'flex' }} direction="vertical" size="middle">
                <Card style={{ backgroundColor: '#F2F2F2', borderRadius: '8px' }}>
                    <div className={styles.alignUser}>
                        <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                         Referral Information
                        </Text>
                        <Divider />
                        <Descriptions {...viewProps}>
                            <Descriptions.Item label="Customer ID">{customerForm?.customerId}</Descriptions.Item>
                            <Descriptions.Item label="Customer Type">{customerForm?.customerType}</Descriptions.Item>
                            <Descriptions.Item label="Customer Name">{customerForm?.customerName}</Descriptions.Item>
                            <Descriptions.Item label="Email ID">{customerForm?.email}</Descriptions.Item>
                            <Descriptions.Item label="Mobile Number">{customerForm?.mobile}</Descriptions.Item>
                            <Descriptions.Item label="Reg. Number">{customerForm?.regNumber}</Descriptions.Item>
                            <Descriptions.Item label="Chessis Number">{customerForm?.chassisNumber}</Descriptions.Item>
                            <Descriptions.Item label="D.O.B">{customerForm?.dob}</Descriptions.Item>
                        </Descriptions>
                    </div>
                </Card>
            </Space>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
