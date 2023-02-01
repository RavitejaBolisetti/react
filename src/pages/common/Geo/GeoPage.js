import React, { useState } from 'react';
import { FaSearch, FaEdit, FaUserPlus, FaUserFriends } from 'react-icons/fa';

// import TreeView from 'components/common/TreeView';
import { GeoTree as TreeView } from './Sample/GeoTree';
// import 'assets/style/new_robin.scss';
// import 'assets/style/sidebar.css';
// import 'font-awesome/css/font-awesome.min.css';
import { withLayoutMaster } from 'components/withLayoutMaster';
import { Button, Col, Input, Modal, Form, Row, Select, Space, Switch } from 'antd';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';

const { Option } = Select;

export const GeoPageBase = () => {
    const [activate, setActivate] = useState({
        Attribute: '',
        Parent: '',
        Code: '',
        Name: '',
    });

    const handle = (event) => {
        setActivate({
            ...activate,
            [event.target.name]: event.target.value,
        });
        // console.log(event.target.name);
    };

    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [antdForm, setAntdForm] = useState(false);
    const [formContent, setFormContent] = useState({
        Attribute: '',
        Parent: '',
        Code: '',
        Name: '',
    });
    const [editableFormContent, setEditableFormContent] = useState({
        editAttribute: false,
        editParent: false,
        editCode: false,
        editName: false,
    });

    const onSubmit = (e) => {
        console.log('djks');
        form.validateFields()
            .then((err, values) => {
                console.log('🚀 ~ file: GeoPage.js:17 ~ validateFields ~ values', values, err);
            })
            .catch((errorInfo) => {
                console.log('🚀 ~ file: GeoPage.js:20 ~ validateFields ~ errorInfo', errorInfo);
            });
    };
    return (
        <section className="content">
            <div id="page-wrapper">
                <div className="col-lg-12 pad0">
                    <div className="form-container">
                        <div className="card form_card" data-color="red" id="wizard">
                            <div className="col-md-12">
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
                                                <i className="fa fa-history mrr5" aria-hidden="true"></i>
                                                Change History
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="leftbar">
                                <div className="row">
                                    <div>
                                        <button className="semicircle">
                                            <i className="fa fa-chevron-right mrl5" aria-hidden="true"></i>
                                        </button>

                                        <div id="outer" className="leftpanel">
                                            <div id="Inner">
                                                <div className="treemenu mrt30">
                                                    <TreeView editableFormContent={editableFormContent} setEditableFormContent={setEditableFormContent} antdForm={antdForm} setAntdForm={setAntdForm} setFormContent={setFormContent} formContent={formContent} open={open} setOpen={setOpen} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="right col">
                                        <Form layout="vertical">
                                            <Row gutter={20}>
                                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                                    <Form.Item name="Attribute Level" label="Attribute Level" rules={[validateRequiredSelectField('Attribute Level')]}>
                                                        {/* <Select placeholder={props.formContent.geoCode} disabled={props.editableFormContent.editAttribute} allowClear> */}
                                                        <Select>
                                                            <Option value="Continent">Continent</Option>
                                                            <Option value="Country">Country</Option>
                                                            <Option value="State">State</Option>
                                                            <Option value="City">District/City</Option>
                                                            <Option value="Tashil">Tashil</Option>
                                                            <Option value="Pincode">Pincode</Option>
                                                        </Select>
                                                    </Form.Item>
                                                </Col>

                                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                                    <Form.Item
                                                        label="Parent"
                                                        name="Parent"
                                                        className="control-label-blk"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Please Select a parent !',
                                                            },
                                                        ]}
                                                    >
                                                        <Input.Group compact>
                                                            <Input
                                                                style={{
                                                                    width: 'calc(100% - 48px)',
                                                                }}
                                                                //  readOnly={props.editableFormContent.editParent}
                                                                name="Parent"
                                                                onChange={handle}
                                                                placeholder="Parent"
                                                            />

                                                            <Button
                                                                type="primary"
                                                                id="hierarchyChange"
                                                                className="btn btn-outline srchbtn mr0 boxShdwNon"
                                                                // disabled={props.editableFormContent.editParent}
                                                                onClick={() => setOpen(true)}
                                                            >
                                                                <FaSearch />
                                                            </Button>
                                                        </Input.Group>
                                                    </Form.Item>
                                                </Col>
                                            </Row>

                                            <Modal
                                                title=""
                                                centered
                                                open={open}
                                                onOk={() => setOpen(false)}
                                                onCancel={() => setOpen(false)}

                                                // bodyStyle={{height:800 }}
                                            >
                                                <h3>Parent Hierarchy</h3>
                                                <hr></hr>
                                                <Space direction="vertical"></Space>
                                                <TreeView editableFormContent={editableFormContent} setEditableFormContent={setEditableFormContent} antdForm={antdForm} setAntdForm={setAntdForm} setFormContent={setFormContent} formContent={formContent} open={open} setOpen={setOpen} />
                                            </Modal>

                                            <Row gutter={20}>
                                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                                    <Form.Item
                                                        label="Code"
                                                        name="Code"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Please Enter the Code !',
                                                            },
                                                        ]}
                                                    >
                                                        <Input name="Code" onChange={handle} placeholder="Code" />
                                                    </Form.Item>
                                                </Col>

                                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                                    <Form.Item
                                                        label="Name"
                                                        name="Name"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Please input the name!',
                                                            },
                                                        ]}
                                                    >
                                                        <Input name="Name" onChange={handle} placeholder="Name" />
                                                    </Form.Item>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                    <Form.Item name="Active inactive button" label="Status">
                                                        <Switch checkedChildren="Active" unCheckedChildren="Inactive" defaultChecked />
                                                    </Form.Item>
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
                                                </Col>
                                            </Row>
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export const GeoPage = withLayoutMaster(GeoPageBase);
