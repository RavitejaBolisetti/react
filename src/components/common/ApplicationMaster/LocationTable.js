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

const rendSelect = (key) => {
    return <Select>
      <Option>Location 1</Option>
      <Option>Location 2</Option>
      </Select>;
};

const rendDeleteEdit = (key) => {
    return (
        <Form>
            <Form.Item name={key}>
                <Space>
                    <EditOutlined />
                    <DeleteOutlined onClick={showConfirm} />
                </Space>
            </Form.Item>
        </Form>
    );
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
        dealerLocation: rendSelect('Enter Code'),
        DeleteEdit: rendDeleteEdit('1'),
    },
];
const LocationTable = () => {
    return <Table columns={tableColumn} dataSource={dataSource} pagination={false} />;
};

export default LocationTable;
