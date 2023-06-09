import React, { useState } from 'react';

import { Col, Input, Form, Row, Checkbox, Select, Button, InputNumber, DatePicker, Space, Card, Collapse, Typography, Descriptions } from 'antd';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

import styles from 'components/common/Common.module.css';
import { ViewDetail } from './ViewDetail';

const { Text, Link } = Typography;

const { Panel } = Collapse;

function AddEditForm(props) {
    const [activeKey, setactiveKey] = useState([1]);
    const { onCloseAction, isViewModeVisible, setIsViewModeVisible } = props;
  
    const handleEdit = () => {
        setIsViewModeVisible(false);
    };
    const onChange = (values) => {
        const isPresent = activeKey.includes(values);

        if (isPresent) {
            const newActivekeys = [];

            activeKey.filter((item) => {
                if (item != values) {
                    newActivekeys.push(item);
                }
            });
            setactiveKey(newActivekeys);
        } else {
            setactiveKey([...activeKey, values]);
        }
    };

    const viewProps = {
        activeKey,
        setactiveKey,
        onChange,
        styles,
        onCloseAction,
        handleEdit,
    };

    return (
        <>
            {!isViewModeVisible ? (
                // <Row gutter={20}>
                //     <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                //         <Space style={{ display: 'flex' }} size="middle" direction="vertical">
                //             <Collapse
                //                 expandIcon={() => {
                //                     if (activeKey.includes(1)) {
                //                         return <MinusOutlined className={styles.iconsColor} />;
                //                     } else {
                //                         return <PlusOutlined className={styles.iconsColor} />;
                //                     }
                //                 }}
                //                 activeKey={activeKey}
                //                 onChange={() => onChange(1)}
                //                 expandIconPosition="end"
                //             >
                //                 <Panel
                //                     header={
                //                         <div className={styles.alignUser}>
                //                             <FaRegUserCircle className={styles.userCircle} />
                //                             <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                //                                 Customer Information
                //                             </Text>
                //                         </div>
                //                     }
                //                     key="1"
                //                 >
                //                     <Form autoComplete="off" layout="vertical" form={customerForm}>
                //                         <Row gutter={20}>
                //                             <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                //                                 <Form.Item label="Vehicle Usage Type" name="usageType" data-testid="usageType" rules={[validateRequiredSelectField('vehicle usage Type')]}>
                //                                     <Select placeholder="Select" disabled={false} loading={false} allowClear>
                //                                         <Option value="usageType">usageType</Option>
                //                                     </Select>
                //                                 </Form.Item>
                //                             </Col>
                //                             <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                //                                 <Form.Item label="Model" name="model" data-testid="model">
                //                                     <Select disabled={false} loading={false} placeholder="Select" allowClear>
                //                                         <Option value="model">customerType</Option>
                //                                     </Select>
                //                                 </Form.Item>
                //                             </Col>
                //                             <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                //                                 <Form.Item label="Vehicle Variant" name="vehicleVariant" data-testid="vehicleVariant">
                //                                     <Select disabled={false} loading={false} placeholder="Select" allowClear>
                //                                         <Option value="vehicleVariant">vehicleVariant</Option>
                //                                     </Select>
                //                                 </Form.Item>
                //                             </Col>
                //                         </Row>

                //                         <Row gutter={20}>
                //                             <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                //                                 <Form.Item label="Available Stock" name="availableStock" data-testid="availableStock">
                //                                     <Select disabled={false} loading={false} placeholder="Select" allowClear>
                //                                         <Option value="availableStock">availableStock</Option>
                //                                     </Select>
                //                                 </Form.Item>
                //                             </Col>
                //                             <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                //                                 <Form.Item label="Vehicle Allocated Status" name="vehicleAllocatedStatus" data-testid="vehicleAllocatedStatus">
                //                                     <Select disabled={false} loading={false} placeholder="Select" allowClear>
                //                                         <Option value="vehicleAllocatedStatus">vehicleAllocatedStatus</Option>
                //                                     </Select>
                //                                 </Form.Item>
                //                             </Col>
                //                             <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                //                                 <Form.Item label="PO Number" name="poNumber">
                //                                     <Input placeholder={preparePlaceholderText('PO Number')} />
                //                                 </Form.Item>
                //                             </Col>
                //                         </Row>
                //                         <Row gutter={20}>
                //                             <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                //                                 <Form.Item label="PO Date" name="poDate">
                //                                     <Input placeholder={preparePlaceholderText('PO Date')} />
                //                                 </Form.Item>
                //                             </Col>
                //                             <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                //                                 <Form.Item label="PO Status" name="poStatus">
                //                                     <Input placeholder={preparePlaceholderText('PO Status')} />
                //                                 </Form.Item>
                //                             </Col>
                //                             <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                //                                 <Form.Item label="SO Number" name="soNumber">
                //                                     <Input placeholder={preparePlaceholderText('SO Number')}/>
                //                                 </Form.Item>
                //                             </Col>
                //                         </Row>
                //                         <Row gutter={20}>
                //                             <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                //                                 <Form.Item label="SO Status" name="soStatus">
                //                                     <Input placeholder={preparePlaceholderText('SO Status')} />
                //                                 </Form.Item>
                //                             </Col>
                //                             <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                //                                 <Form.Item label="VIN Number" name="vinNumber">
                //                                     <Input placeholder={preparePlaceholderText('VIN number')} />
                //                                 </Form.Item>
                //                             </Col>
                //                             <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                //                                 <Form.Item label="Discount Amount" name="discountAmount">
                //                                     <Input placeholder={preparePlaceholderText('Discount Amount')}/>
                //                                 </Form.Item>
                //                             </Col>
                //                         </Row>
                //                         <Row gutter={20}>
                //                             <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                //                                 <Form.Item label="Vehicle Selling Price" name="vehicleSellingPrice">
                //                                     <Input placeholder={preparePlaceholderText('Vehicle Selling Price')} />
                //                                 </Form.Item>
                //                             </Col>
                //                             <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                //                                 <Form.Item label="Charge Amount" name="chargeAmount">
                //                                     <Input placeholder={preparePlaceholderText('Charge Amount')} />
                //                                 </Form.Item>
                //                             </Col>
                //                             <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                //                                 <Form.Item label="OTF Amount" name="otfAmount">
                //                                     <Input placeholder={preparePlaceholderText('OTF Amount')}/>
                //                                 </Form.Item>
                //                             </Col>
                //                         </Row>
                                        
                //                     </Form>
                //                 </Panel>
                //             </Collapse>

                //             <Collapse
                //                 expandIcon={() => {
                //                     if (activeKey.includes(2)) {
                //                         return <MinusOutlined className={styles.iconsColor} />;
                //                     } else {
                //                         return <PlusOutlined className={styles.iconsColor} />;
                //                     }
                //                 }}
                //                 activeKey={activeKey}
                //                 onChange={() => onChange(2)}
                //                 expandIconPosition="end"
                //             >
                //                 <Panel
                //                     header={
                //                         <div className={styles.alignUser}>
                //                             <FaRegUserCircle className={styles.userCircle} />
                //                             <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                //                                 Key Account details
                //                             </Text>
                //                         </div>
                //                     }
                //                     key="2"
                //                 >
                //                     <Form autoComplete="off" layout="vertical" form={keyAccountForm}>
                //                         <Row gutter={20}>
                //                             <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                //                                 <Form.Item label="Account Code" name="accountCode">
                //                                     <Input disabled />
                //                                 </Form.Item>
                //                             </Col>
                //                             <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                //                                 <Form.Item label="Account Name" name="accountName">
                //                                     <Input disabled />
                //                                 </Form.Item>
                //                             </Col>
                //                             <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                //                                 <Form.Item label="Account Segment" name="accountSegment">
                //                                     <Input disabled />
                //                                 </Form.Item>
                //                             </Col>
                //                         </Row>

                //                         <Row gutter={20}>
                //                             <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                //                                 <Form.Item label="Account Client Name" name="accountClientName">
                //                                     <Input disabled />
                //                                 </Form.Item>
                //                             </Col>
                //                             <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                //                                 <Form.Item label="Account Mapping Date" name="accountMappingDate">
                //                                     <Input disabled />
                //                                 </Form.Item>
                //                             </Col>
                //                         </Row>
                //                     </Form>
                //                 </Panel>
                //             </Collapse>
                            
                //             <Collapse
                //                 expandIcon={() => {
                //                     if (activeKey.includes(3)) {
                //                         return <MinusOutlined className={styles.iconsColor} />;
                //                     } else {
                //                         return <PlusOutlined className={styles.iconsColor} />;
                //                     }
                //                 }}
                //                 activeKey={activeKey}
                //                 onChange={() => onChange(3)}
                //                 expandIconPosition="end"
                //             >
                //                 <Panel
                //                     header={
                //                         <div className={styles.alignUser}>
                //                             <FaRegUserCircle className={styles.userCircle} />
                //                             <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                //                                 Authority details
                //                             </Text>
                //                         </div>
                //                     }
                //                     key="3"
                //                 >
                //                     <Form autoComplete="off" layout="vertical" form={authorityForm}>
                //                         <Row gutter={20}>
                //                             <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                //                                 <Form.Item label="Name of  Person" name="personName">
                //                                     <Input placeholder={preparePlaceholderText('name')} />
                //                                 </Form.Item>
                //                             </Col>
                //                             <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                //                                 <Form.Item label="Position" name="postion">
                //                                     <Input placeholder={preparePlaceholderText('position')} />
                //                                 </Form.Item>
                //                             </Col>
                //                             <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                //                                 <Form.Item label="Company Name" name="companyName">
                //                                     <Input placeholder={preparePlaceholderText('company name')} />
                //                                 </Form.Item>
                //                             </Col>
                //                         </Row>
                //                         <Row gutter={20}>
                //                             <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                //                                 <Form.Item name="remarks" label="Remarks">
                //                                     <Input.TextArea maxLength={100} placeholder={preparePlaceholderText('remarks')} />
                //                                 </Form.Item>
                //                             </Col>
                //                         </Row>
                //                     </Form>
                //                 </Panel>
                //             </Collapse> */}
                //             <Row gutter={20}>
                //                 <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                //                     <Button danger onClick={onCloseAction}>
                //                         Cancel
                //                     </Button>
                //                 </Col>
                //                 <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                //                     <Button type="primary" onClick={onFinish} className={styles.floatRight}>
                //                         Save & Proceed
                //                     </Button>
                //                 </Col>
                //             </Row>
                //         </Space>
                //     </Col>
                // </Row>
                <ViewDetail {...viewProps} />
            ) : (
                <ViewDetail {...viewProps} />
            )}
        </>
    );
}

export default AddEditForm;
