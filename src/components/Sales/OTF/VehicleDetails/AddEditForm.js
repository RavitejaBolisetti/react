import React, { useState } from 'react';
import { Col, Input, Form, Row, Select, Button, Space, Collapse, Typography, Divider } from 'antd';
import { validateRequiredSelectField } from 'utils/validation';
import { accordianExpandIcon } from 'utils/accordianExpandIcon';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { MinusBorderedIcon, PlusBorderedIcon } from 'Icons';
import CollapseTaxInfo from './CollapseTaxInfo';

import styles from 'components/common/Common.module.css';

import { ViewDetail } from './ViewDetail';
const { Text } = Typography;

const { Option } = Select;
const { TextArea } = Input;
const { Panel } = Collapse;

const AddEditFormMain = (props) => {
    const { onCloseAction, formActionType, setIsViewModeVisible } = props;
    const [form] = Form.useForm();
    const [keyAccountForm] = Form.useForm();
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [openAccordian, setOpenAccordian] = useState();
    const [isCollapseView, setCollapseView] = useState(false);
    const [addFormdata, setAddFormData] = useState([]);

    const [activeKey, setactiveKey] = useState([1]);

    const handleEdit = () => {
        setIsViewModeVisible(false);
    };

    const handleCollapse = (key) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
        setIsReadOnly(false);
    };
    const addContactHandeler = (e) => {
        e.stopPropagation();
        form.resetFields();
        setOpenAccordian('2');
        setIsReadOnly(true);
    };

    const onHandleAddChange = (val) => {
        setCollapseView(true);
        addFormdata.push(val);
        const formatData = [];
        addFormdata.map((item) => formatData.push({ code: item?.code, type: item?.type, description: item?.description, rate: item.rate, rateType: item.rateType }));
        console.log(addFormdata, 'ddd');
        keyAccountForm.resetFields();
    };

    const onHandleResetButton = () => {
        keyAccountForm.resetFields();
    };

    const onChange = (values) => {
        const isPresent = activeKey.includes(values);

        if (isPresent) {
            const newActivekeys = [];

            activeKey.forEach((item) => {
                if (item !== values) {
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
            {!formActionType?.viewMode ? (
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Space size="middle" direction="vertical" className={styles.accordianContainer}>
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
                                    <Divider />
                                    <Form autoComplete="off" layout="vertical" form={form}>
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="Vehicle Usage Type" name="usageType" data-testid="usageType" rules={[validateRequiredSelectField('vehicle usage Type')]}>
                                                    <Select placeholder="Select" disabled={false} loading={false} allowClear>
                                                        <Option value="usageType">usageType</Option>
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="Model" name="model" data-testid="model">
                                                    <Select disabled={false} loading={false} placeholder="Select" allowClear>
                                                        <Option value="model">customerType</Option>
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="Vehicle Variant" name="vehicleVariant" data-testid="vehicleVariant">
                                                    <Select disabled={false} loading={false} placeholder="Select" allowClear>
                                                        <Option value="vehicleVariant">vehicleVariant</Option>
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="Available Stock" name="availableStock" data-testid="availableStock">
                                                    <Select disabled={false} loading={false} placeholder="Select" allowClear>
                                                        <Option value="availableStock">availableStock</Option>
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="Vehicle Allocated Status" name="vehicleAllocatedStatus" data-testid="vehicleAllocatedStatus">
                                                    <Select disabled={false} loading={false} placeholder="Select" allowClear>
                                                        <Option value="vehicleAllocatedStatus">vehicleAllocatedStatus</Option>
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="PO Number" name="poNumber">
                                                    <Input placeholder={preparePlaceholderText('PO Number')} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="PO Date" name="poDate">
                                                    <Input placeholder={preparePlaceholderText('PO Date')} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="PO Status" name="poStatus">
                                                    <Input placeholder={preparePlaceholderText('PO Status')} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="SO Number" name="soNumber">
                                                    <Input placeholder={preparePlaceholderText('SO Number')} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="SO Status" name="soStatus">
                                                    <Input placeholder={preparePlaceholderText('SO Status')} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="VIN Number" name="vinNumber">
                                                    <Input placeholder={preparePlaceholderText('VIN number')} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="Discount Amount" name="discountAmount">
                                                    <Input placeholder={preparePlaceholderText('Discount Amount')} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="Vehicle Selling Price" name="vehicleSellingPrice">
                                                    <Input placeholder={preparePlaceholderText('Vehicle Selling Price')} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="Charge Amount" name="chargeAmount">
                                                    <Input placeholder={preparePlaceholderText('Charge Amount')} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="OTF Amount" name="otfAmount">
                                                    <Input placeholder={preparePlaceholderText('OTF Amount')} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Panel>
                            </Collapse>
                            <Collapse onChange={() => handleCollapse(2)} expandIconPosition="end" expandIcon={({ isActive }) => accordianExpandIcon(isActive)} activeKey={openAccordian}>
                                <Panel
                                    header={
                                        <div className={styles.alignUser}>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                                    Tax & Charges Information
                                                </Text>

                                                <Button onClick={addContactHandeler} icon={<PlusOutlined />} type="primary" disabled={isReadOnly}>
                                                    Add
                                                </Button>
                                            </Col>
                                        </div>
                                    }
                                    key="2"
                                >
                                    <Divider />

                                    <Form autoComplete="off" layout="vertical" form={keyAccountForm} onFinish={onHandleAddChange}>
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="Tax/Charges Type" name="type">
                                                    <Input placeholder={preparePlaceholderText('Type')} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="Tax/Charges Code" name="code">
                                                    <Input placeholder={preparePlaceholderText('Code')} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="Rate" name="rate">
                                                    <Input placeholder={preparePlaceholderText('Rate')} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="Rate Type" name="rateType">
                                                    <Input placeholder={preparePlaceholderText('Rate Type')} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                <Form.Item label="Charge Description" name="description">
                                                    <TextArea placeholder={preparePlaceholderText('description')} showCount maxLength={100} autoSize={{ minRows: 2, maxRows: 5 }} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                                <Button type="primary" htmlType="submit">
                                                    Add
                                                </Button>
                                                <Button danger onClick={onHandleResetButton}>
                                                    Reset
                                                </Button>
                                            </Col>
                                        </Row>

                                        {addFormdata?.length > 0 &&
                                            addFormdata?.map((action) => {
                                                return <CollapseTaxInfo />;
                                            })}
                                    </Form>
                                </Panel>
                            </Collapse>
                        </Space>
                    </Col>
                </Row>
            ) : (
                <ViewDetail {...viewProps} />
            )}
        </>
    );
};

export const AddEditForm = AddEditFormMain;
