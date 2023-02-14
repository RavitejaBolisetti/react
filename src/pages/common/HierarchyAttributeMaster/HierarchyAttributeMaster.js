import React, { useState } from 'react';
import { connect } from 'react-redux';

import { withLayoutMaster } from 'components/withLayoutMaster';
import { DeleteOutlined, EditOutlined, ExclamationCircleFilled } from '@ant-design/icons';

import { HierarchyAttribute } from 'components/common/HierarchyAttribute/HierarchyAttribute';
import { PageHeader } from '../PageHeader';
import styles from '../Common.module.css';
import { Input, Modal, Select, Space, Switch } from 'antd';

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

export const HierarchyAttributeMasterBase = (props) => {
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

    return (
        <>
            <PageHeader {...pageHeaderData} />
            <HierarchyAttribute />
        </>
    );
};

export const HierarchyAttributeMaster = connect(mapStateToProps, null)(withLayoutMaster(HierarchyAttributeMasterBase));
