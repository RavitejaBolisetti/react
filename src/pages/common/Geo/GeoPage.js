import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Col, Input, Form, Row, Select, Switch, Space } from 'antd';
import { FaSearch, FaEdit, FaUserPlus, FaUserFriends } from 'react-icons/fa';

import { withLayoutMaster } from 'components/withLayoutMaster';
import { validateRequiredSelectField } from 'utils/validation';
import MetaTag from 'utils/MetaTag';

import TreeView from 'components/common/TreeView';
import ParentHierarchy from './ParentHierarchy';

import styles from './GeoPage.module.css';
import { BsStar } from 'react-icons/bs';

const { Option } = Select;

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

    // const onSubmit = (e) => {
    //     console.log('djks');
    //     form.validateFields()
    //         .then((err, values) => {
    //             console.log('🚀 ~ file: GeoPage.js:17 ~ validateFields ~ values', values, err);
    //         })
    //         .catch((errorInfo) => {
    //             console.log('🚀 ~ file: GeoPage.js:20 ~ validateFields ~ errorInfo', errorInfo);
    //         });
    // };
    return (
        <>
            <MetaTag metaTitle={'Geographical Hierarchy'} />

            <Row gutter={20}>
                <Col xs={16} sm={24} md={12} lg={18} xl={18} xxl={18}>
                    <Space>
                        <div>
                            <span className={styles.headingGradient}>Geographical Hierarchy</span>
                        </div>
                        <div className={styles.favIconHeading}>
                            <BsStar size={18} />
                        </div>
                    </Space>
                </Col>
                <Col xs={8} sm={24} md={12} lg={6} xl={6} xxl={6} >
                    <Button danger onclick="window.location.href='#'" className={styles.exitButton}>
                        Exit
                    </Button>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={12} lg={24} xl={24} xxl={24}>
                    <div className={styles.pageHeaderNameSection}></div>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
                    <div className={styles.leftpanel}>


                        <div className={styles.treemenu}>
                            <TreeView editableFormContent={editableFormContent} setEditableFormContent={setEditableFormContent} antdForm={antdForm} setAntdForm={setAntdForm} setFormContent={setFormContent} formContent={formContent} open={open} setOpen={setOpen} />
                        </div>


                    </div>
                </Col>

                <Col xs={24} sm={24} md={16} lg={16} xl={16} xxl={16}>
                    <div className="right col" style={{ padding: '0' }}>
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

                                <Col xs={24} sm={12} md={12} lg={12} xl={12} style={{ padding: '0' }}>
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
                                                className={styles.inputBox}
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

                                <Col xs={24} sm={12} md={12} lg={12} xl={12} style={{ padding: '0' }}>
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
                                    <button type="button" className="btn btn-outline rightbtn boxShdwNon mrl15">
                                        <FaUserFriends className="fa-solid fa-user-group mrr5" />
                                        Save
                                    </button>
                                    <button type="button" className="btn btn-outline rightbtn boxShdwNon mrl15">
                                        <FaUserFriends className="fa-solid fa-user-group mrr5" />
                                        Reset
                                    </button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </Col>
            </Row>
            <ParentHierarchy title={'Parent Hierarchy'} setOpen={setOpen} open={open} />
        </>
    );
};

export const GeoPage = connect(mapStateToProps, null)(withLayoutMaster(GeoPageBase));
