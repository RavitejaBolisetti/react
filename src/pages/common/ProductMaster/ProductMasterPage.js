import React, { useState } from 'react';

import { Table, Switch, Form, Select, Row, Col, Button, Modal, Input, Space, Collapse } from 'antd';
import { MailOutlined, SettingOutlined } from '@ant-design/icons';

import { FaSave, FaUserFriends, FaUserPlus, FaEdit, FaUndo, FaSearch } from 'react-icons/fa';
import TreeView from 'components/common/TreeView';

import { withLayoutMaster } from 'components/withLayoutMaster';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';


const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};


const { TextArea } = Input;
const { Panel } = Collapse;
export const ProductMasterPageBase = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [attri, setAttri] = useState(false);
    const [bottom, setBottom] = useState('bottomLeft');
    const [form] = Form.useForm();
    const handleattri = () => {
        setAttri(!attri);
        console.log(attri);
    }
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const onSubmit = (e) => {

        form.validateFields()
            .then((err, values) => {
                console.log('🚀 ~ file: GeoPage.js:17 ~ validateFields ~ values', values, err);
            })
            .catch((errorInfo) => {
                console.log('🚀 ~ file: GeoPage.js:20 ~ validateFields ~ errorInfo', errorInfo);
            })
    }

    function getItem(label, key, icon, children, type) {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    }

    const columns = [
        {
            title: 'Srl.',
            dataIndex: 'Srl',

            width: "10%",
        },

        {
            title: 'Attribute Name',
            dataIndex: 'AttributeName',

            width: "30%",
        },
        {
            title: 'Attribute Value',
            render: () => <Input placeholder="Dummy Place Holder" readonly="true" />,
            dataIndex: 'AttributeValue',

            width: "30%",
        },







    ];

    const [dataSource, setDataSource] = useState([
        {
            Srl: "1.",
            AttributeName: "	Product Division",
            AttributeValue: "Mahindra Scorpio"


        },
        {
            Srl: "2.",
            AttributeName: "Model Group",
            AttributeValue: "Mahindra Scorpio"

        },
        {
            Srl: "3.",
            AttributeName: "Sales Model Group",
            AttributeValue: "Mahindra Scorpio",

        },
        {
            Srl: "4.",
            AttributeName: "Model Family",
            AttributeValue: "Mahindra Scorpio",


        },
        {
            Srl: "5.",
            AttributeName: "Vehicle Type",
            AttributeValue: "Mahindra Scorpio",


        },
        {
            Srl: "6.",
            AttributeName: "Vehicle Category",
            AttributeValue: "Mahindra Scorpio"


        },
        {
            Srl: "7.",
            AttributeName: "Body Type",
            AttributeValue: "Mahindra Scorpio"


        },
        {
            Srl: "8.",
            AttributeName: "Vehicle Category",
            AttributeValue: "Mahindra Scorpio"


        },
        {
            Srl: "9.",
            AttributeName: "Seating Capacity",
            AttributeValue: "Mahindra Scorpio"


        },
        {
            Srl: "10.",
            AttributeName: "Trim Level",
            AttributeValue: "Mahindra Scorpio"


        },



    ])
    const handleDelete = (key) => {
        const newData = dataSource.filter((item) => item.key !== key);
        setDataSource(newData);

    };


    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <div className="pageHeaderNameSection">
                        <div className="row">
                            <div className="col-md-6">
                                <span
                                    className="headingGradient mrl-15"
                                // style="margin-left: -15px;"
                                >
                                    <span className="innerheading">Product Hierarchy</span>
                                </span>
                            </div>
                            <div className="col-md-6">
                                <button type="button" className="btn btn-outline mr0 mrl15 fr boxShdwNon">
                                    Exit
                                </button>
                                <button type="button" className="btn btn-outline fr mr0 boxShdwNon">
                                    {/* <i className="fa fa-history mrr5" aria-hidden="true"></i> */}
                                    Change History
                                </button>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row gutter={20}>

                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <div id="outer" className="leftpanel">
                        <div id="Inner">
                            <div className="treemenu mrt30">
                                <TreeView />
                            </div>
                        </div>
                    </div>
                </Col>
                <Col xs={24} sm={16} md={16} lg={16} xl={16}>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Collapse defaultActiveKey={['1']} expandIconPosition="end">
                                <Panel header="Product Details" key="1">

                                    <Form layout="vertical">
                                        <Row gutter={20}>
                                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                                <Form.Item name="Attribute Level" label="Attribute Level" rules={[validateRequiredSelectField('Attribute Level')]}>
                                                    <Select
                                                        defaultValue="Mahindra Bolero"
                                                        options={[
                                                            { value: 'Mahindra Scorpio', label: 'Mahindra Scorpio' },
                                                            { value: 'Mahindra KUV100 NXT', label: 'Mahindra KUV100 NXT' },
                                                            { value: 'Mahindra Scorpio Classic', label: 'Mahindra Scorpio Classic' },
                                                            { value: 'Mahindra Thar', label: 'Mahindra Thar' },
                                                            { value: 'Mahindra Bolero', label: 'Mahindra Bolero' },
                                                        ]}
                                                    />
                                                </Form.Item>
                                            </Col>

                                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                                <Space>
                                                    <Form.Item name="Parent" label="Parent" rules={[validateRequiredInputField('Parent')]}>
                                                        <Input placeholder="Parent" />
                                                    </Form.Item>

                                                    <Form.Item >
                                                        <Button type="button" className="btn btn-outline srchbtn mr0 boxShdwNon" onClick={showModal}>
                                                            <FaSearch />
                                                        </Button>
                                                        <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                                                            <p>Some contents...</p>
                                                            <p>Some contents...</p>
                                                            <p>Some contents...</p>
                                                        </Modal>
                                                    </Form.Item>
                                                </Space>
                                            </Col>
                                        </Row>
                                        <Row gutter={20}>
                                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                                <Form.Item name="Code" label="Code" rules={[validateRequiredInputField('Code')]}>
                                                    <Input placeholder="Type code here" />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                                <Form.Item name="Short Description" label="Short Description" rules={[validateRequiredInputField('Short Description')]}>
                                                    <Input placeholder="Type here" />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={20}>
                                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                                <Form.Item name="Long Desciption" label="Long Description" rules={[validateRequiredInputField('Long Description')]}>
                                                    <TextArea rows={1} placeholder="Type here" />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                                <Form.Item name="Active inactive button" label="Status">
                                                    <Switch checkedChildren="Active" unCheckedChildren="Inactive" defaultChecked />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                <button type="button" className="btn btn-outline rightbtn boxShdwNon mrl15">
                                                    <FaEdit className="fas fa-edit mrr5" />
                                                    Edit
                                                </button>
                                                <button type="button" className="btn btn-outline rightbtn boxShdwNon mrl15">
                                                    <FaUserPlus className="fa-solid fa-user-plus mrr5" />
                                                    Add Child
                                                </button>
                                                <button type="button" className="btn btn-outline rightbtn boxShdwNon mrl15">
                                                    <FaUserFriends className="fa-solid fa-user-group mrr5" />
                                                    Add Sibling
                                                </button>
                                                <button type="submit" className="btn btn-outline rightbtn boxShdwNon mrl15" onClick={onSubmit}>
                                                    <FaSave className="fa fa-save mrr5" /> Save
                                                </button>
                                                <button type="button" className="btn btn-outline rightbtn boxShdwNon mrl15">
                                                    <FaUndo className="fa fa-undo mrr5" />
                                                    Reset
                                                </button>

                                                <button type="button" className="btn btn-outline rightbtn boxShdwNon mrl15">
                                                    <FaEdit className="fas fa-edit mrr5" />
                                                    View Attribute Detail
                                                </button>
                                            </Col>
                                        </Row>
                                        {/* <div className="pad7" id="productHierarchy">
                                                <div className="col-md-12 mrt10"></div>
                                            </div> */}
                                    </Form>


                                </Panel>
                            </Collapse>
                        </Col>
                    </Row>
                    <Row gutter={20} style={{ marginTop: '20px' }}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Collapse defaultActiveKey={['1']} expandIconPosition="end">
                                <Panel header="Product Attributes Details (Mahindra Scorpio Classic Petrol)" key="2">
                                    <Table
                                        style={{ fontSize: '40px' }}
                                        columns={columns}
                                        dataSource={dataSource}
                                        onChange={onChange}
                                        pagination={{
                                            position: [bottom],
                                            pageSize: 10,
                                            total: 50
                                        }}
                                    // scroll={{
                                    //     x: 300,
                                    //     y: 300,
                                    // }}
                                    />
                                </Panel>
                            </Collapse>
                        </Col>
                    </Row>
                </Col>
            </Row>

        </>
    );
};
export const ProductMasterPage = withLayoutMaster(ProductMasterPageBase);

