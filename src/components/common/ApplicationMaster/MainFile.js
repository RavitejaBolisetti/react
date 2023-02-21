import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FaEdit, FaUserPlus, FaUserFriends, FaSave, FaUndo, FaAngleDoubleRight, FaAngleDoubleLeft, FaRegTimesCircle } from 'react-icons/fa';
import { addToolTip } from 'utils/customMenuLink';

import { Button, Col, Form, Row } from 'antd';
import { Input, Select, Switch, TreeSelect, Collapse, Space, Table, Modal } from 'antd';
import { DeleteOutlined, EditOutlined, ExclamationCircleFilled } from '@ant-design/icons';

import { validateRequiredInputField, validateRequiredSelectField, validationFieldLetterAndNumber } from 'utils/validation';
import styles from 'pages/common/Common.module.css';
import TreeView from 'components/common/TreeView';
import LocationTable from './LocationTable';

const { Option } = Select;
const { Panel } = Collapse;
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

const bottomOptions = [
    {
        label: 'bottomLeft',
        value: 'bottomLeft',
    },
    {
        label: 'bottomCenter',
        value: 'bottomCenter',
    },
    {
        label: 'bottomRight',
        value: 'bottomRight',
    },
    {
        label: 'none',
        value: 'none',
    },
];

const rendInput = (key) => {
    return (
        <Form>
            <Form.Item name={key} rules={[validateRequiredInputField('Enter data')]}>
                <Input placeholder={key} />
            </Form.Item>
        </Form>
    );
};

const rendSwitch = (key) => {
    return (
        <Form>
            <Form.Item name={key}>
                <Switch checkedChildren="Yes" unCheckedChildren="No" defaultChecked />
            </Form.Item>
        </Form>
    );
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

const onSubmit = (e) => {
    // form.validateFields()
    // .then((err, values) => {
    //     // console.log('ðŸš€ ~ file: GeoPage.js:17 ~ validateFields ~ values', values, err);
    // })
    // .catch((errorInfo) => {
    //     // console.log('ðŸš€ ~ file: GeoPage.js:20 ~ validateFields ~ errorInfo', errorInfo);
    // });
};

const tblPrepareColumns = ({ title, dataIndex }) => {
    return {
        title,
        dataIndex,
        // render:rendFn,
    };
};

const tableColumn = [];
tableColumn.push(
    tblPrepareColumns({
        title: 'Code',
        dataIndex: 'Code',
    })
);
tableColumn.push(
    tblPrepareColumns({
        title: 'Description',
        dataIndex: 'Description',
    })
);
tableColumn.push(
    tblPrepareColumns({
        title: 'T&C Required',
        dataIndex: 'TC',
    })
);
tableColumn.push(
    tblPrepareColumns({
        title: 'Digital Signature Required',
        dataIndex: 'DigiSignature',
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
        Code: rendInput('Enter Code'),
        Description: rendInput('Enter Data'),
        TC: rendSwitch('1'),
        DigiSignature: rendSwitch('2'),
        DeleteEdit: rendDeleteEdit('1'),
    },
    {
        Code: rendInput('Enter Code'),
        Description: rendInput('Enter Data'),
        TC: rendSwitch('1'),
        DigiSignature: rendSwitch('2'),
        DeleteEdit: rendDeleteEdit('2'),
    },
];

const columns = [
    {
        title: 'Action ID',
        dataIndex: 'Action ID',
        key: 'Action ID',
        render: () => <Input placeholder="MT0001" />,
        width: 150,
    },
    {
        title: 'Action Name',
        dataIndex: 'Action Name',
        key: 'Action Name',
        render: (text) => <Input placeholder="Name" />,
        width: 400,
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
                {/* <EditOutlined /> */}
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

const MainFile = () => {
    const [isTreeViewVisible, setTreeViewVisible] = useState(true);
    const handleTreeViewVisiblity = () => setTreeViewVisible(!isTreeViewVisible);
    const [bottom, setBottom] = useState('bottomLeft');

    return (
        <>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.padRight0}>
                    <Space
                        direction="vertical"
                        size="middle"
                        style={{
                            display: 'flex',
                        }}
                    >
                        <Collapse defaultActiveKey={['1']} expandIconPosition="end">
                            <Panel header="Application Details" key="1">
                                <Form layout="vertical">
                                    <Row gutter={20}>
                                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                            <Form.Item name="Application ID" label="Application ID" rules={[validateRequiredSelectField('Application ID')]}>
                                                <Input placeholder="Type code here" />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                            <Form.Item name="Application Name" label="Application Name" rules={[validateRequiredSelectField('Application Name')]}>
                                                <Input placeholder="Type code here" />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={20}>
                                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                            <Form.Item name="Application Title" label="Application Title" rules={[validateRequiredSelectField('Application Type')]}>
                                                <Input placeholder="Type code here" />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                            <Form.Item name="Application Type" label="Application Type" rules={[validateRequiredSelectField('Application Type')]}>
                                                <Input placeholder="Type code here" />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={20}>
                                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                            <Form.Item name="Parent Application ID" label="Parent Application ID" rules={[validateRequiredSelectField('Parent Application ID')]}>
                                                <Select>
                                                    <Option></Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                            <Form.Item name="Application Criticality Group" label="Application Criticality Group" rules={[validateRequiredSelectField('Application Criticality Group')]}>
                                                <Select>
                                                    <Option></Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={20}>
                                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                            <Form.Item name="Accessible Locations" label="Accessible Locations" rules={[validateRequiredSelectField('Accessible Locations')]}>
                                                <Select>
                                                    <Option>Select</Option>
                                                    <Option>Accessible to all</Option>
                                                    <Option>Not accessible to all</Option>
                                                    <Option>Restricted Accessible</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                            <Form.Item name="Document No. to be generated" label="Document No. to be generated" rules={[validateRequiredSelectField('Document No. to be generated')]}>
                                                <Switch defaultChecked checkedChildren="Active" unCheckedChildren="Inactive" />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={20}>
                                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                            <Form.Item name="Status" label="Status" rules={[validateRequiredSelectField('Status')]}>
                                                <Switch defaultChecked checkedChildren="Active" unCheckedChildren="Inactive" />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form>
                            </Panel>
                        </Collapse>
                        <Collapse defaultActiveKey={['1']} expandIconPosition="end">
                            <Panel header="Application Actions" key="2">
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                        <Table columns={columns} dataSource={data} pagination={false} />
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.buttonContainer} style={{ marginTop: '15px' }}>
                                                <Button danger>
                                                    <FaUserPlus className={styles.buttonIcon} />
                                                    Add Row
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Panel>
                        </Collapse>
                        <Collapse defaultActiveKey={['1']} expandIconPosition="end">
                            <Panel header="Document Types" key="3">
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                        <Table
                                            columns={tableColumn}
                                            dataSource={dataSource}
                                            pagination={{
                                                position: [bottom],
                                            }}
                                            scrollable={true}
                                        />
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.buttonContainer}>
                                                <Button danger>
                                                    <FaUserPlus className={styles.buttonIcon} />
                                                    Add Row
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Panel>
                        </Collapse>
                        <Collapse defaultActiveKey={['1']} expandIconPosition="end">
                            <Panel header="Accessible Dealer Locations" key="3">
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                        <LocationTable />
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.buttonContainer}>
                                                <Button danger>
                                                    <FaUserPlus className={styles.buttonIcon} />
                                                    Add Row
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Panel>
                        </Collapse>
                    </Space>
                </Col>
            </Row>
        </>
    );
};

export default MainFile;
