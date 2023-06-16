import React, { useState } from 'react';
import { Col, Input, Form, Row, Select, Button, Space, Collapse, Typography, Divider } from 'antd';
import { validateRequiredSelectField } from 'utils/validation';
import { accordianExpandIcon } from 'utils/accordianExpandIcon';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { FiEdit } from 'react-icons/fi';

import styles from 'components/common/Common.module.css';

import { ViewDetail } from './ViewDetail';
import { DataTable } from 'utils/dataTable';
const { Text } = Typography;

const { Option } = Select;
const { Panel } = Collapse;

const AddEditFormMain = (props) => {
    const { onCloseAction, formActionType, setIsViewModeVisible } = props;
    const [form] = Form.useForm();
    const [keyAccountForm] = Form.useForm();
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [openAccordian, setOpenAccordian] = useState();
    // const [addFormdata, setAddFormData] = useState([]);
    const [activeKey, setactiveKey] = useState([1]);

    const handleEdit = () => {
        setIsViewModeVisible(false);
    };

    const handleCollapse = (key) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };
    const addContactHandeler = (e) => {
        e.stopPropagation();
        form.resetFields();
        setOpenAccordian('3');
        setIsReadOnly(true);
    };

    const onHandleAddChange = (val) => {
        //setAddFormData((prev) => [...prev, { ...val }]);
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
    const columns = [
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Rate ',
            dataIndex: 'rate',
            key: 'rate',
        },
        {
            title: 'Amount ',
            dataIndex: 'amount',
            key: 'amount',
        },
    ];

    const data = [
        {
            key: '1',
            description: 'CGST @18%',
            rate: '18%',
            amount: '80,0000',
        },
        {
            key: '2',
            description: 'CGST @18%',
            rate: '18%',
            amount: '80,0000',
        },
        {
            key: '3',
            description: 'CGST @18%',
            rate: '18%',
            amount: '80,0000',
        },
    ];

    const optionalColumns = [
        {
            title: 'Service Name',
            dataIndex: 'name',
            key: 'name',
        },

        {
            title: 'Amount ',
            dataIndex: 'amount',
            key: 'amount',
        },
    ];

    const optionalData = [
        {
            key: '1',
            name: (
                <>
                    {!formActionType?.viewMode ? (
                        <Form.Item name="name">
                            <Input placeholder={preparePlaceholderText(' Name')} />
                        </Form.Item>
                    ) : (
                        'Registration Charges'
                    )}
                </>
            ),
            amount: (
                <>
                    {!formActionType?.viewMode ? (
                        <Form.Item name="amount">
                            <Input placeholder={preparePlaceholderText('Amount')} />
                        </Form.Item>
                    ) : (
                        '80,0000'
                    )}
                </>
            ),
        },
        {
            key: '2',
            name: 'Registration Charges',
            amount: '80,0000',
        },
        {
            key: '3',
            name: 'Registration Charges',
            amount: '80,0000',
        },
        {
            key: '4',
            name: 'Registration Charges',
            amount: '80,0000',
        },
    ];
    const viewProps = {
        activeKey,
        setactiveKey,
        onChange,
        styles,
        onCloseAction,
        handleEdit,
        columns,
        data,
        optionalColumns,
        optionalData,
    };

    const datatableprops = {
        tableColumn: columns,
        tableData: data,
        removePagination: true,
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
                                        return (
                                            <>
                                                <div className={styles.iconsColor}>
                                                    {formActionType?.editMode ? (
                                                        <>
                                                            <FiEdit />
                                                            Edit
                                                        </>
                                                    ) : (
                                                        <>
                                                            {' '}
                                                            <MinusOutlined className={styles.iconsColor} />
                                                        </>
                                                    )}
                                                </div>
                                            </>
                                        );
                                    } else {
                                        return (
                                            <>
                                                <div>
                                                    {formActionType?.editMode ? (
                                                        <>
                                                            <FiEdit />
                                                            Edit
                                                        </>
                                                    ) : (
                                                        <>
                                                            {' '}
                                                            <PlusOutlined className={styles.iconsColor} />
                                                        </>
                                                    )}
                                                </div>
                                            </>
                                        );
                                    }
                                }}
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
                                                    <Select disabled={formActionType?.editMode ? true : false} loading={false} placeholder="Select" allowClear>
                                                        <Option value="availableStock">availableStock</Option>
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="Vehicle Allocated Status" name="vehicleAllocatedStatus" data-testid="vehicleAllocatedStatus">
                                                    <Select disabled={formActionType?.editMode ? true : false} loading={false} placeholder="Select" allowClear>
                                                        <Option value="vehicleAllocatedStatus">vehicleAllocatedStatus</Option>
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="PO Number" name="poNumber">
                                                    <Input disabled={formActionType?.editMode ? true : false} placeholder={preparePlaceholderText('PO Number')} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="PO Date" name="poDate">
                                                    <Input disabled={formActionType?.editMode ? true : false} placeholder={preparePlaceholderText('PO Date')} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="PO Status" name="poStatus">
                                                    <Input disabled={formActionType?.editMode ? true : false} placeholder={preparePlaceholderText('PO Status')} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="SO Number" name="soNumber">
                                                    <Input disabled={formActionType?.editMode ? true : false} placeholder={preparePlaceholderText('SO Number')} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="SO Status" name="soStatus">
                                                    <Input disabled={formActionType?.editMode ? true : false} placeholder={preparePlaceholderText('SO Status')} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="VIN Number" name="vinNumber">
                                                    <Input disabled={formActionType?.editMode ? true : false} placeholder={preparePlaceholderText('VIN number')} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="Vehicle Selling Price" name="vehicleSellingPrice">
                                                    <Input disabled={formActionType?.editMode ? true : false} placeholder={preparePlaceholderText('Vehicle Selling Price')} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="Discount Amount" name="discountAmount">
                                                    <Input placeholder={preparePlaceholderText('Discount Amount')} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="Tax Amount" name="taxAmount">
                                                    <Input disabled={formActionType?.editMode ? true : false} placeholder={preparePlaceholderText('Tax Amount')} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="Vehicle Amount" name="vehicleAmount">
                                                    <Input disabled={formActionType?.editMode ? true : false} placeholder={preparePlaceholderText('Vehicle Amount')} />
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
                                            <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                                <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                                    Tax Details
                                                </Text>
                                            </Col>
                                        </div>
                                    }
                                    key="2"
                                >
                                    <Divider />

                                    <DataTable {...datatableprops} />
                                </Panel>
                            </Collapse>
                            <Collapse onChange={() => handleCollapse(3)} expandIconPosition="end" expandIcon={({ isActive }) => accordianExpandIcon(isActive)} activeKey={openAccordian}>
                                <Panel
                                    header={
                                        <div className={styles.alignUser}>
                                            <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                                                <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                                    Optional Services
                                                </Text>
                                            </Col>
                                            <Col xs={24} sm={24} md={19} lg={19} xl={19}>
                                                <Button onClick={addContactHandeler} icon={<PlusOutlined />} type="primary" disabled={isReadOnly}>
                                                    Add
                                                </Button>
                                            </Col>
                                        </div>
                                    }
                                    key="3"
                                >
                                    <Divider />

                                    <Form autoComplete="off" layout="vertical" form={keyAccountForm} onFinish={onHandleAddChange}>
                                        <DataTable tableColumn={optionalColumns} tableData={optionalData} pagination={false} removePagination={true} />
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
