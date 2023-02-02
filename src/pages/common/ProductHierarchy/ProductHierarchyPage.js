import React, { useState } from 'react';

import { Form, Row, Col, Input, Select, Switch, Button, Modal, Space } from 'antd';
import { FaSave, FaUserFriends, FaUserPlus, FaEdit, FaUndo, FaSearch } from 'react-icons/fa';

import { withLayoutMaster } from 'components/withLayoutMaster';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import TreeView from 'components/common/TreeView';
import { ChangeHistory } from '../ChangeHistory/ChangeHistory';
import styles from './ProductHierarchyPage.module.css';
import { connect } from 'react-redux';

const { TextArea } = Input;

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

export const ProductHierarchyBase = () => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);

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
                                                {/* <i className="fa fa-history mrr5" aria-hidden="true"></i> */}
                                                Change History
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="leftbar">
                                <div className="row">
                                    <div>
                                        {/* <button className="semicircle">
                                            <i className="fa fa-chevron-right mrl5" aria-hidden="true"></i>
                                        </button> */}

                                        <div id="outer" className="leftpanel">
                                            <div id="Inner">
                                                <div className="treemenu mrt30">
                                                    <TreeView />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="right col">
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
                                                        <Form.Item className={styles.parentInput} name="Parent" label="Parent" rules={[validateRequiredInputField('Parent')]}>
                                                            <Input className="parentInput" placeholder="Parent" />
                                                        </Form.Item>

                                                        <Form.Item className={styles.parentIcon}>
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
                                    </div>
                                </div>
                            </div>
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <h5>Change History</h5>
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <ChangeHistory />
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export const ProductHierarchyPage = connect(mapStateToProps, null)(withLayoutMaster(ProductHierarchyBase));
