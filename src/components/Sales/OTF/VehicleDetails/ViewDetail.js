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
    const vehicleForm = {
        vehicleUsageType: 'uttar pradesh',
        vehicleModel: 'ssss',
        model: '12312',
        stock: 'Delhi',
        allotedStatus: true,
        PONumber: '123122737328',
        PODate: '12/06/2023',
        POStatus: 'Status',
        SONumber: '653728438213',
        SOStatus: 'Status',
        VINNumber: 'MAFCL723849203VIN',
        discountAmount: '24500',
        sellingPrice: '2454324',
        chargeAmount: '222',
        otfAmount: '12640',
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
                <Collapse
                    expandIcon={() => {
                        if (activeKey.includes(1)) {
                            return <MinusOutlined className={styles.iconsColor} />;
                        } else {
                            return <PlusOutlined className={styles.iconsColor} />;
                        }
                    }}
                    activeKey={activeKey}
                    onChange={() => onChange(1)}
                    expandIconPosition="end"
                >
                    <Panel
                        header={
                            <div className={styles.alignUser}>
                                <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                    Vehicle Information
                                </Text>
                            </div>
                        }
                        key="1"
                    >
                        <Descriptions {...viewProps}>
                            <Descriptions.Item label="Vehicle Usage Type ">{vehicleForm?.vehicleUsageType}</Descriptions.Item>
                            <Descriptions.Item label="Vehicle Model">{vehicleForm?.vehicleModel}</Descriptions.Item>
                            <Descriptions.Item label="Model">{vehicleForm?.model}</Descriptions.Item>
                            <Descriptions.Item label="Available Stock">{vehicleForm?.stock}</Descriptions.Item>
                            <Descriptions.Item label="Vehicle Allocated Status">{vehicleForm?.allotedStatus}</Descriptions.Item>
                            <Descriptions.Item label="PO Number">{vehicleForm?.PONumber}</Descriptions.Item>
                            <Descriptions.Item label="PO Date">{vehicleForm?.PODate}</Descriptions.Item>
                            <Descriptions.Item label="PO Status">{vehicleForm?.POStatus}</Descriptions.Item>
                            <Descriptions.Item label="SO Number">{vehicleForm?.SONumber}</Descriptions.Item>
                            <Descriptions.Item label="SO Status">{vehicleForm?.SOStatus}</Descriptions.Item>
                            <Descriptions.Item label="VIN Number">{vehicleForm?.VINNumber}</Descriptions.Item>
                            <Descriptions.Item label="Discount Amount">{vehicleForm?.discountAmount}</Descriptions.Item>
                            <Descriptions.Item label="Vehicle Selling Price">{vehicleForm?.sellingPrice}</Descriptions.Item>
                            <Descriptions.Item label="Charge Amount">{vehicleForm?.chargeAmount}</Descriptions.Item>
                            <Descriptions.Item label="OTF Amount">{vehicleForm?.otfAmount}</Descriptions.Item>
                        </Descriptions>
                    </Panel>
                </Collapse>

                <Collapse
                    expandIcon={() => {
                        if (activeKey.includes(2)) {
                            return <MinusOutlined className={styles.iconsColor} />;
                        } else {
                            return <PlusOutlined className={styles.iconsColor} />;
                        }
                    }}
                    activeKey={activeKey}
                    onChange={() => onChange(2)}
                    expandIconPosition="end"
                >
                    <Panel
                        header={
                            <div className={styles.alignUser}>
                                <FaRegUserCircle className={styles.userCircle} />
                                <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                    Key Account Details
                                </Text>
                            </div>
                        }
                        key="2"
                    >
                        <Descriptions {...viewProps}>
                            <Descriptions.Item label="Account Client Name">{keyAccountForm?.accountClientName}</Descriptions.Item>
                            <Descriptions.Item label="Account Code">{keyAccountForm?.accountCode}</Descriptions.Item>
                            <Descriptions.Item label="Account Mapping Date">{keyAccountForm?.accountMappingDate}</Descriptions.Item>
                            <Descriptions.Item label="Account Name">{keyAccountForm?.accountName}</Descriptions.Item>
                            <Descriptions.Item label="Account Segment">{keyAccountForm?.accountSegment ? 'Active' : 'Inactive'}</Descriptions.Item>
                        </Descriptions>
                    </Panel>
                </Collapse>

                <Row gutter={20}>
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
                </Row>
            </Space>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
