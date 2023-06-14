import React from 'react';
import { Divider, Card, Typography, Descriptions } from 'antd';

const { Text } = Typography;

const ViewDetailMain = (props) => {
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

    return (
        <Card style={{ backgroundColor: '#F2F2F2', borderRadius: '8px' }}>
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
        </Card>
    );
};

export const ViewDetail = ViewDetailMain;
