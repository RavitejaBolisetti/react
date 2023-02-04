import React from 'react';
import { connect } from 'react-redux';

import { DeleteOutlined, EditOutlined, ExclamationCircleFilled } from '@ant-design/icons';

import { FaUserPlus, FaUserFriends, FaSave, FaUndo } from 'react-icons/fa';

// import TreeView from 'components/common/TreeView';
// import { GeoTree as TreeView } from './Sample/GeoTree';

import { withLayoutMaster } from 'components/withLayoutMaster';
import { Button, Col, Input, Modal, Form, Row, Select, Space, Switch } from 'antd';
import { Table } from 'antd';
import { validateRequiredSelectField } from 'utils/validation';

import MetaTag from 'utils/MetaTag';

import styles from '../Common.module.css';

const { Option } = Select;
const { confirm } = Modal;

const showConfirm = () => {
    confirm({
        title: 'Do you Want to delete these items?',
        icon: <ExclamationCircleFilled />,
        content: 'Some descriptions',
        onOk() {
            console.log('OK');
        },
        onCancel() {
            console.log('Cancel');
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
export const HierarchyAttributeBase = () => {
    return (
        <>
            <MetaTag metaTitle={'Hierarchy Attribute'} />

            <Row gutter={20}>
                <Col xs={24} sm={24} md={12} lg={24} xl={24} xxl={24}>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={12} lg={18} xl={18} xxl={18}>
                            <div>
                                <span className={styles.headingGradient}>Hierarchy Attribute Master</span>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6} className={styles.buttonContainer}>
                            {/* <button type="button" className="btn btn-outline rightbtn boxShdwNon mrl15">
                                <FaUserFriends className="fa-solid fa-user-group mrr5" />
                                Exit
                            </button> */}
                            <Button danger className={styles.exitButton}>
                                <FaUserPlus className={styles.buttonIcon} />
                                Exit
                            </Button>
                        </Col>
                    </Row>
                    <div className={styles.pageHeaderNameSection}></div>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <div>
                        <h7>Hierarchy Attribute Type</h7>
                    </div>
                    <Form.Item name=" Hierarchy Attribute " rules={[validateRequiredSelectField('Hierarchy Attribute ')]}>
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

            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.buttonContainer}>
                    <Button danger>
                        <FaUserPlus className={styles.buttonIcon} />
                        Add Row
                    </Button>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.buttonContainer}>
                    <Button danger>
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

export const HierarchyAttribute = connect(mapStateToProps, null)(withLayoutMaster(HierarchyAttributeBase));
