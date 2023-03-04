import React from 'react';

import { Form, Input, Select, Switch, TreeSelect, Collapse, Space, Table, Modal } from 'antd';
import { DeleteOutlined, EditOutlined, ExclamationCircleFilled } from '@ant-design/icons';

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


const tblPrepareColumns = ({ title, dataIndex }) => {
    return {
        title,
        dataIndex,
    };
};

const tableColumn = [];
tableColumn.push(
    tblPrepareColumns({
        title: 'Dealer Location',
        dataIndex: 'dealerLocation',
    })
);
tableColumn.push(
    tblPrepareColumns({
        title: '',
        dataIndex: 'DeleteEdit',
    })
);

const dataSource = [
    {
        dealerLocation: 'Enter Code',
        DeleteEdit: '1',
    },
];
const LocationTable = () => {
    return <Table columns={tableColumn} dataSource={dataSource} pagination={false} />;
};

export default LocationTable;
