import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FaSearch, FaEdit, FaUserPlus, FaUserFriends } from 'react-icons/fa';

import TreeView from 'components/common/TreeView';
// import { GeoTree as TreeView } from './Sample/GeoTree';

import { withLayoutMaster } from 'components/withLayoutMaster';
import { Button, Col, Input, Modal, Form, Row, Select, Space, Switch } from 'antd';
import { Table, Tooltip } from 'antd';
import { validateRequiredSelectField } from 'utils/validation';

import MetaTag from 'utils/MetaTag';
import styles from './HierarchyAttribute.module.css';

const { Option } = Select;

const columns = [
    {
        title: 'Code',
        dataIndex: 'code',
        key: 'code',
        render: () => <Input placeholder="MT0001" />,
        width: 120,
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <Input placeholder="Name" />,
        width: 300,
    },
    {
        title: 'Duplicate Allowed?',
        dataIndex: 'DuplicateAllowed?',
        key: 'address 1',
        render: () => <Switch checkedChildren="Yes" unCheckedChildren="NO" defaultChecked />,
    },
    {
        title: 'Duplicate Allowed under different Parent?',
        dataIndex: 'Duplicate Allowed under different Parent?',
        key: 'address 2',

        render: () => <Switch checkedChildren="Yes" unCheckedChildren="NO" defaultChecked />,
    },
    {
        title: 'Child Allowed?',
        dataIndex: 'Child Allowed?',
        key: 'address 3',
        render: () => <Switch checkedChildren="Yes" unCheckedChildren="NO" defaultChecked />,
    },
    {
        title: 'Status',
        dataIndex: 'Status',
        key: 'address 4',
        render: () => <Switch checkedChildren="Yes" unCheckedChildren="NO" defaultChecked />,
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
                        <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
                            <button type="button" className="btn btn-outline rightbtn boxShdwNon mrl15">
                                <FaUserFriends className="fa-solid fa-user-group mrr5" />
                                Exit
                            </button>
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
                            <Option value="Select Hierarchy Type">Select Hierarchy Type</Option>
                            <Option value="Manufacturer Organisation">Manufacturer Organisation</Option>
                            <Option value="Manufacturer Administration">Manufacturer Administration</Option>
                            <Option value="Product">Product</Option>
                            <Option value="Geographical">Geographical</Option>
                            <Option value="Dealer">Dealer</Option>
                            <Option value="Employee">Employee</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Table columns={columns} dataSource={data} pagination={false} />
            </Row>
        </>
    );
};

export const HierarchyAttribute = connect(mapStateToProps, null)(withLayoutMaster(HierarchyAttributeBase));
