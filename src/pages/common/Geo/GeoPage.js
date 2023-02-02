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
import styles from './GeoPage.module.css';

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
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={12} lg={24} xl={24} xxl={24}>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={12} lg={18} xl={18} xxl={18}>
                            <div>
                                <span className={styles.headingGradient}>Welcome back John! </span>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
                            <Button danger onclick="window.location.href='#'" className={styles.btnOutline}>
                                Exit
                            </Button>
                        </Col>
                    </Row>
                    <div className={styles.pageHeaderNameSection}></div>
                </Col>
            </Row>
            <Row gutter={20}>

                <div className="leftbar">
                    <div className="row">
                        <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
                            <div>
                                <button className="semicircle">
                                    <i className="fa fa-chevron-right mrl5" aria-hidden="true"></i>
                                </button>

                                <div id="outer" className="leftpanel">
                                    <div id="Inner">
                                        <div className="treemenu mrt30">
                                            {/* <TreeView /> */}
                                            <TreeView editableFormContent={editableFormContent} setEditableFormContent={setEditableFormContent} antdForm={antdForm} setAntdForm={setAntdForm} setFormContent={setFormContent} formContent={formContent} open={open} setOpen={setOpen} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>

                        <Col xs={24} sm={24} md={16} lg={16} xl={16} xxl={16}>
                            <div className="right col">
                                <Form layout="vertical">
                                    <Row gutter={20}>
                                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                            <Form.Item name="Attribute Level" label="Attribute Level" rules={[validateRequiredSelectField('Attribute Level')]}>
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
                                            <Space>
                                                <Form.Item
                                                    className="control-label-blk"
                                                    name="Parent"
                                                    label="Parent"
                                                    rules={[validateRequiredInputField('Parent')]}>
                                                    <Input
                                                        className={styles.parentInput}
                                                        placeholder="Parent" />
                                                </Form.Item>

                                                <Form.Item className={styles.parentIcon}>
                                                    <Button
                                                        type="button"
                                                        className="btn btn-outline srchbtn mr0 boxShdwNon"
                                                        onClick={() => setOpen(true)} >
                                                        <FaSearch />
                                                    </Button>
                                                    <Modal
                                                        open={open} onOk={() => setOpen(false)}
                                                        onCancel={() => setOpen(false)} >
                                                        <h3>Parent Hierarchy</h3>
                                                        <hr></hr>
                                                        <Space direction="vertical"></Space>
                                                        <TreeView />
                                                    </Modal>
                                                </Form.Item>
                                            </Space>
                                        </Col>
                                    </Row>

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
                                                <Input name="Code" onChange={handle} placeholder="Code" className={styles.inputBox} />
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
                                                <Input name="Name" onChange={handle} placeholder="Name" className={styles.inputBox} />
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                            <Form.Item name="Active inactive button" label="Status">
                                                <Switch checkedChildren="Active" unCheckedChildren="Inactive" defaultChecked />
                                            </Form.Item>
                                            <Button type="button" className="btn btn-outline rightbtn boxShdwNon mrl15">
                                                <FaEdit className="fas fa-edit mrr5" />
                                                Edit
                                            </Button>
                                            <Button type="button" className="btn btn-outline rightbtn boxShdwNon mrl15">
                                                <FaUserPlus className="fa-solid fa-user-plus mrr5" />
                                                Add Child
                                            </Button>
                                            <Button type="button" className="btn btn-outline rightbtn boxShdwNon mrl15">
                                                <FaUserFriends className="fa-solid fa-user-group mrr5" />
                                                Add Sibling
                                            </Button>
                                            <Button htmlType="submit" className="btn btn-outline rightbtn boxShdwNon mrl15">
                                                <FaUserFriends className="fa-solid fa-user-group mrr5" />
                                                Save
                                            </Button>
                                            <Button type="button" className="btn btn-outline rightbtn boxShdwNon mrl15">
                                                <FaUserFriends className="fa-solid fa-user-group mrr5" />
                                                Reset
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                        </Col>
                    </div>
                </div>
            </Row> </>
    );
};

export const GeoPage = withLayoutMaster(GeoPageBase);
