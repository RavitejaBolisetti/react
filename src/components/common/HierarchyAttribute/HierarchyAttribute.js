import React, { useState } from 'react';
import { connect } from 'react-redux';

import { DeleteOutlined, EditOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { bindActionCreators } from 'redux';
import { FaUserPlus, FaSave, FaUndo } from 'react-icons/fa';

import { Button, Col, Input, Modal, Form, Row, Select, Space, Switch } from 'antd';
import { Table } from 'antd';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';

import styles from '../Common.module.css';
import { PageHeader } from '../PageHeader';
import { hierarchyAttributeMasterActions } from 'store/actions/data/hierarchyAttributeMaster';

const { Option } = Select;
const { confirm } = Modal;
const { success: successModel, error: errorModel } = Modal;

const mapStateToProps = (state) => {
    const {
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;

    let returnValue = {
        collapsed,
    };

    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: hierarchyAttributeMasterActions.fetchList,
            saveData: hierarchyAttributeMasterActions.saveData,
            listShowLoading: hierarchyAttributeMasterActions.listShowLoading,
        },
        dispatch
    ),
});

export const HierarchyAttributeMasterBase = (userId, isDataLoaded, fetchList, hierarchyAttributeFetchList, saveData, listShowLoading, isDataAttributeLoaded, attributeData, hierarchyAttributeListShowLoading) => {
    const showSuccessModel = ({ title, message }) => {
        successModel({
            title: title,
            icon: <ExclamationCircleFilled />,
            content: message,
        });
    };

    const onError = (message) => {
        errorModel({
            title: 'ERROR',
            icon: <ExclamationCircleFilled />,
            content: message,
        });
    };

    const showConfirm = () => {
        confirm({
            title: 'Do you Want to delete these items?',
            icon: <ExclamationCircleFilled />,
            content: 'Some descriptions',
            onOk() {
                deleteTableRows(data.key);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };
    const [count, setCount] = useState(2);
    const [data, setRowsData] = useState([
        {
            key: '0',
            name: '',
        },
    ]);
    const handleAdd = () => {
        const newData = [
            {
                key: count,
                name: '',
            },
        ];
        setRowsData([...data, newData]);
        setCount(count + 1);
    };

    const deleteTableRows = (index) => {
        const rows = [...data];
        rows.splice(index, 1);
        setRowsData(rows);
    };

    const columns = [
        {
            title: 'Code',
            dataIndex: 'hierarchyAttribueCode',
            key: 'hierarchyAttribueCode',
            render: () => (
                <Form.Item style={{ paddingTop: '20px' }} name={'hierarchyAttribueCode'} rules={[validateRequiredInputField('Code')]}>
                    <Input placeholder="MT0001" />
                </Form.Item>
            ),
            width: 200,
        },
        {
            title: 'Name',
            dataIndex: 'hierarchyAttribueName',
            key: 'hierarchyAttribueName',
            render: () => (
                <Form.Item style={{ paddingTop: '20px' }} name={'hierarchyAttribueName'} rules={[validateRequiredInputField('Name')]}>
                    <Input placeholder="MT0001" />
                </Form.Item>
            ),

            width: 400,
        },
        {
            title: 'Duplicate Allowed?',
            dataIndex: 'duplicateAllowedAtAttributerLevelInd?',
            width: 100,
            key: 'address 1',
            render: () => (
                <Form.Item name="duplicateAllowedAtAttributerLevelInd" initialValue={true}>
                    <Switch value="1" checkedChildren="Yes" unCheckedChildren="No" defaultChecked />
                </Form.Item>
            ),
        },
        {
            title: 'Duplicate Allowed under different Parent?',
            dataIndex: 'duplicateAllowedAtOtherParent?',
            key: 'address 2',
            width: 200,

            render: () => (
                <Form.Item name="duplicateAllowedAtOtherParent" initialValue={true}>
                    <Switch value="1" checkedChildren="Yes" unCheckedChildren="No" defaultChecked />
                </Form.Item>
            ),
        },
        {
            title: 'Child Allowed?',
            dataIndex: 'isChildAllowed?',
            key: 'address 3',
            render: () => (
                <Form.Item name="ischildallowed" initialValue={true}>
                    <Switch value="1" checkedChildren="Yes" unCheckedChildren="N0" defaultChecked />
                </Form.Item>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'Status',
            key: 'status',
            render: () => (
                <Form.Item name="status" initialValue={true}>
                    <Switch value="1" checkedChildren="Yes" unCheckedChildren="No" defaultChecked />
                </Form.Item>
            ),
        },
        {
            title: '',
            dataIndex: '',
            width: 100,
            render: () => [
                <Space wrap>
                    <EditOutlined />

                    <DeleteOutlined onClick={showConfirm} />
                </Space>,
            ],
        },
    ];
    const [form] = Form.useForm();

    const onFinish = (values) => {
        const onSuccess = (res) => {
            form.resetFields();
            showSuccessModel({ title: 'SUCCESS', message: res?.responseMessage });
        };
        saveData({ data: [values], setIsLoading: listShowLoading, userId, onError, onSuccess });
    };

    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => {});
    };

    return (
        <>
            <Form form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Hierarchy Attribute Type" name="parentHierarchyAttribueId" rules={[validateRequiredSelectField('Hierarchy Attribute ')]}>
                            <Select placeholder={'Hierarchy Attribute Type'} allowClear>
                                <Option value="Manufacturer Organisation">Manufacturer Organisation</Option>
                                <Option value="Manufacturer Administration">Manufacturer Administration</Option>
                                <Option value="Product">Product</Option>
                                <Option value="Geographical">Geographical</Option>
                                <Option value="Dealer">Dealer</Option>
                                <Option value="Employee">Employee</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Table columns={columns} dataSource={data} pagination={false} />
                    </Col>
                </Row>

                <Row gutter={20} style={{ marginTop: '20px' }}>
                    <Col xs={24} sm={16} md={14} lg={12} xl={12}>
                        <Button danger onClick={handleAdd}>
                            <FaUserPlus className={styles.buttonIcon} />
                            Add Row
                        </Button>
                    </Col>
                    <Col xs={24} sm={16} md={14} lg={12} xl={12} className={styles.buttonContainer}>
                        <Button htmlType="submit" danger>
                            <FaSave className={styles.buttonIcon} />
                            Save
                        </Button>

                        <Button danger>
                            <FaUndo className={styles.buttonIcon} />
                            Reset
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export const HierarchyAttributeMaster = connect(mapStateToProps, mapDispatchToProps)(HierarchyAttributeMasterBase);
