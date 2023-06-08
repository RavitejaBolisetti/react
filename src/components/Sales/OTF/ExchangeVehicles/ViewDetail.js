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
    const customerForm = {
        customerId: 'MO1085585',
        customerName: 'Vimal Kumar',
        make: 'Maruti Suzuki',
        modelGroup: 'Swift ',
        variant: 'abc',
        oldRegNumber: 'UP13AB4325',
        oldChassisNumber: 'MACF527736276',
        dob: '15/06/2021',
        relationship: 'wife',
        year: '2012',
        month: 'June',
        usage: 'Private',
        schemeName: 'Scheme',
        schemeAmount: '2500',
        remarks: 'Good Condition',
    };
    const AuthorityForm = {
        companyName: 'uttar pradesh',
        personName: 'ssss',
        postion: '12312',
        remarks: 'Delhi',
    };
    const keyAccountForm = {
        accountClientName: 'uttar pradesh',
        accountCode: 'ssss',
        accountMappingDate: '12312',
        accountName: 'Delhi',
        accountSegment: true,
    };

    return (
        <div className={`${styles.viewContainer} ${styles.hierarchyRightContaners}`}>
            <Space style={{ display: 'flex' }} direction="vertical" size="middle">
                <Card style={{ backgroundColor: '#F2F2F2', borderRadius: '8px' }}>
                    <div className={styles.alignUser}>
                        <Descriptions {...viewProps}>
                            <Descriptions.Item label="Customer ID">{customerForm?.customerId}</Descriptions.Item>
                            <Descriptions.Item label="Customer Name">{customerForm?.customerName}</Descriptions.Item>
                            <Descriptions.Item label="Make">{customerForm?.make}</Descriptions.Item>
                            <Descriptions.Item label="Model Group">{customerForm?.modelGroup}</Descriptions.Item>
                            <Descriptions.Item label="Variant">{customerForm?.variant}</Descriptions.Item>
                            <Descriptions.Item label="Old Reg. Number">{customerForm?.oldRegNumber}</Descriptions.Item>
                            <Descriptions.Item label="Old Chassis Number">{customerForm?.oldChassisNumber}</Descriptions.Item>
                            <Descriptions.Item label="Date of Birth">{customerForm?.dob}</Descriptions.Item>
                            <Descriptions.Item label="Relationship">{customerForm?.relationship}</Descriptions.Item>
                            <Descriptions.Item label="Year of Registration">{customerForm?.year}</Descriptions.Item>
                            <Descriptions.Item label="Month of Registration">{customerForm?.month}</Descriptions.Item>
                            <Descriptions.Item label="Usage">{customerForm?.usage}</Descriptions.Item>
                            <Descriptions.Item label="Scheme Name">{customerForm?.schemeName}</Descriptions.Item>
                            <Descriptions.Item label="Scheme Amount">{customerForm?.schemeAmount}</Descriptions.Item>
                            <br></br>
                            <Descriptions.Item label="Remarks">{customerForm?.remarks}</Descriptions.Item>
                        </Descriptions>
                    </div>
                </Card>
            </Space>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
