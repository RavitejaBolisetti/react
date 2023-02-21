import React, { useState } from 'react';

import { DeleteOutlined, EditOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { FaUserPlus, FaSave, FaUndo } from 'react-icons/fa';

import { withLayoutMaster } from 'components/withLayoutMaster';
import { Button, Col, Input, Modal, Form, Row, Select, Space, Switch } from 'antd';
import { Table } from 'antd';
import { validateRequiredSelectField } from 'utils/validation';

import styles from '../Common.module.css';
import { PageHeader } from '../PageHeader';

const { Option } = Select;
const { confirm } = Modal;

const showConfirm = () => {
    confirm({
        title: 'Do you Want to delete these items?',
        icon: <ExclamationCircleFilled />,
        content: 'Some descriptions',
        onOk() {
            // console.log('OK');
        },
        onCancel() {
            // console.log('Cancel');
        },
    });
};

const columns = [
    {
        title: 'Code',
        dataIndex: 'code',
        key: 'code',
        render: () => <Input placeholder="MT0001" />,
        width: 150,
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <Input placeholder="Name" />,
        width: 400,
    },
    {
        title: 'Duplicate Allowed?',
        dataIndex: 'DuplicateAllowed?',
        width: 100,
        key: 'address 1',
        render: () => <Switch checkedChildren="Yes" unCheckedChildren="No" defaultChecked />,
    },
    {
        title: 'Duplicate Allowed under different Parent?',
        dataIndex: 'Duplicate Allowed under different Parent?',
        key: 'address 2',
        width: 200,

        render: () => <Switch checkedChildren="Yes" unCheckedChildren="No" defaultChecked />,
    },
    {
        title: 'Child Allowed?',
        dataIndex: 'Child Allowed?',
        key: 'address 3',
        render: () => <Switch checkedChildren="Yes" unCheckedChildren="N0" defaultChecked />,
    },
    {
        title: 'Status',
        dataIndex: 'Status',
        key: 'address 4',
        render: () => <Switch checkedChildren="Yes" unCheckedChildren="No" defaultChecked />,
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
const data = [
    {
        key: '1',
        name: '',
    },
    {
        key: '2',
        name: '',
    },
];



export const HierarchyAttributeMasterBase = () => {
    const [form] = Form.useForm();
    const [isFavourite, setFavourite] = useState(false);
    const handleFavouriteClick = () => setFavourite(!isFavourite);

    const pageTitle = 'Hierarchy Attribute Master';
    const pageHeaderData = {
        pageTitle,
        showChangeHisoty: true,
        isFavourite,
        setFavourite,
        handleFavouriteClick,
        visibleChangeHistory: false,
    };

    const onFinish = (values) => {
        // saveData({ data: values, setIsLoading: listShowLoading, userId });
    };

    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => { });
    };

    return (
        <>
            <PageHeader {...pageHeaderData} />
            <Form form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Hierarchy Attribute Type" name="Hierarchy Attribute" rules={[validateRequiredSelectField('Hierarchy Attribute ')]}>
                            <Select>
                                <Option value="Manufacturer Organisation">Manufacturer Organisation</Option>
                                <Option value="Manufacturer Administration">Manufacturer Administration</Option>
                                <Option value="Product">Product</Option>
                                <Option value="Geographical">Geographical</Option>
                                <Option value="Dealer">Dealer</Option>
                                <Option value="Employee">Employee</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    {/* <Table columns={columns} dataSource={data} pagination={false} /> */}
                </Row>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Table columns={columns} dataSource={data} pagination={false} />
                    </Col>
                </Row>
            </Form>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.buttonContainer}>
                    <Button danger>
                        <FaUserPlus className={styles.buttonIcon} />
                        Add Row
                    </Button>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.buttonContainer}>
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
        </>
    );
};

export const HierarchyAttributeMaster = withLayoutMaster(HierarchyAttributeMasterBase);
