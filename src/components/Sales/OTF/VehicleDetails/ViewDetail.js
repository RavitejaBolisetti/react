import React from 'react';
import { Descriptions } from 'antd';
import { Col, Input, Form, Row, Select, Button, InputNumber, DatePicker, Space, Card, Collapse, Typography, Divider } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { FaRegPlusSquare, FaPlus, FaRegUserCircle } from 'react-icons/fa';
import styles from 'components/common/Common.module.css';

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
        allotedStatus: 'status',
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
    const taxChargesForm = {
        type: 'uttar pradesh',
        code: 'ssss',
        rate: '12312',
        rateType: 'Delhi',
        description: 'Delhi',
    };

    return (
        <Space direction="vertical" size="middle" className={styles.accordianContainer}>
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
                            <Text strong level={5} style={{ marginTop: '4px', marginLeft: '8px' }}>
                                Vehicle Information
                            </Text>
                        </div>
                    }
                    key="1"
                >
                    <Divider />
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
                            <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                Tax & Charges Information
                            </Text>
                        </div>
                    }
                    key="2"
                >
                    <Collapse
                        expandIcon={() => {
                            if (activeKey.includes(3)) {
                                return <MinusOutlined className={styles.iconsColor} />;
                            } else {
                                return <PlusOutlined className={styles.iconsColor} />;
                            }
                        }}
                        activeKey={activeKey}
                        onChange={() => onChange(3)}
                        expandIconPosition="end"
                    >
                        <Panel
                            header={
                                <div className={styles.alignUser}>
                                    <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                        Sales Tax
                                    </Text>
                                </div>
                            }
                            key="3"
                        >
                            <Divider />
                            <Descriptions {...viewProps}>
                                <Descriptions.Item label="Tax/Charges Type ">{vehicleForm?.vehicleUsageType}</Descriptions.Item>
                                <Descriptions.Item label="Tax/Charges Code">{vehicleForm?.vehicleModel}</Descriptions.Item>
                                <Descriptions.Item label="Rate">{vehicleForm?.model}</Descriptions.Item>
                                <Descriptions.Item label="Rate Type">{vehicleForm?.stock}</Descriptions.Item>
                                <Descriptions.Item label="Charges Description">{vehicleForm?.allotedStatus}</Descriptions.Item>
                            </Descriptions>
                        </Panel>
                    </Collapse>
                    <Collapse
                        expandIcon={() => {
                            if (activeKey.includes(4)) {
                                return <MinusOutlined className={styles.iconsColor} />;
                            } else {
                                return <PlusOutlined className={styles.iconsColor} />;
                            }
                        }}
                        activeKey={activeKey}
                        onChange={() => onChange(4)}
                        expandIconPosition="end"
                    >
                        <Panel
                            header={
                                <div className={styles.alignUser}>
                                    <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                        GST
                                    </Text>
                                </div>
                            }
                            key="4"
                        >
                            <Divider />
                            <Descriptions {...viewProps}>
                                <Descriptions.Item label="Tax/Charges Type ">{vehicleForm?.type}</Descriptions.Item>
                                <Descriptions.Item label="Tax/Charges Code">{vehicleForm?.code}</Descriptions.Item>
                                <Descriptions.Item label="Rate">{vehicleForm?.rate}</Descriptions.Item>
                                <Descriptions.Item label="Rate Type">{vehicleForm?.rateType}</Descriptions.Item>
                                <Descriptions.Item label="Charges Description">{vehicleForm?.description}</Descriptions.Item>
                            </Descriptions>
                        </Panel>
                    </Collapse>
                    <Collapse
                        expandIcon={() => {
                            if (activeKey.includes(5)) {
                                return <MinusOutlined className={styles.iconsColor} />;
                            } else {
                                return <PlusOutlined className={styles.iconsColor} />;
                            }
                        }}
                        activeKey={activeKey}
                        onChange={() => onChange(5)}
                        expandIconPosition="end"
                    >
                        <Panel
                            header={
                                <div className={styles.alignUser}>
                                    <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                        VAT
                                    </Text>
                                </div>
                            }
                            key="5"
                        >
                            <Divider />
                            <Descriptions {...viewProps}>
                                <Descriptions.Item label="Tax/Charges Type ">{vehicleForm?.type}</Descriptions.Item>
                                <Descriptions.Item label="Tax/Charges Code">{vehicleForm?.code}</Descriptions.Item>
                                <Descriptions.Item label="Rate">{vehicleForm?.rate}</Descriptions.Item>
                                <Descriptions.Item label="Rate Type">{vehicleForm?.rateType}</Descriptions.Item>
                                <Descriptions.Item label="Charges Description">{vehicleForm?.description}</Descriptions.Item>
                            </Descriptions>
                        </Panel>
                    </Collapse>
                    <Collapse
                        expandIcon={() => {
                            if (activeKey.includes(6)) {
                                return <MinusOutlined className={styles.iconsColor} />;
                            } else {
                                return <PlusOutlined className={styles.iconsColor} />;
                            }
                        }}
                        activeKey={activeKey}
                        onChange={() => onChange(6)}
                        expandIconPosition="end"
                    >
                        <Panel
                            header={
                                <div className={styles.alignUser}>
                                    <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                        IGST
                                    </Text>
                                </div>
                            }
                            key="6"
                        >
                            <Divider />
                            <Descriptions {...viewProps}>
                                <Descriptions.Item label="Tax/Charges Type ">{vehicleForm?.type}</Descriptions.Item>
                                <Descriptions.Item label="Tax/Charges Code">{vehicleForm?.code}</Descriptions.Item>
                                <Descriptions.Item label="Rate">{vehicleForm?.rate}</Descriptions.Item>
                                <Descriptions.Item label="Rate Type">{vehicleForm?.rateType}</Descriptions.Item>
                                <Descriptions.Item label="Charges Description">{vehicleForm?.description}</Descriptions.Item>
                            </Descriptions>
                        </Panel>
                    </Collapse>
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
    );
};

export const ViewDetail = ViewDetailMain;
