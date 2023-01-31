import React from 'react';

import { Form, Row, Col, Input, Select } from 'antd';
import { FaSave, FaUserFriends, FaUserPlus } from 'react-icons/fa';

import { withLayoutMaster } from 'components/withLayoutMaster';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import TreeView from 'components/common/TreeView';
import { ChangeHistory } from '../ChangeHistory/ChangeHistory';

export const ProductHierarchyBase = () => {
    const [form] = Form.useForm();

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
                                                Change History 3
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
                                                    <Form.Item name="Parent" label="Parent" rules={[validateRequiredInputField('Parent')]}>
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Row gutter={20}>
                                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                                    <Form.Item name="Code" label="Code" rules={[validateRequiredInputField('Code')]}>
                                                        <Input placeholder="input placeholder" />
                                                    </Form.Item>
                                                </Col>
                                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                                    <Form.Item name="Short Description" label="Code" rules={[validateRequiredInputField('Parent')]}>
                                                        <Input placeholder="input placeholder" />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                    <button type="button" className="btn btn-outline rightbtn boxShdwNon mrl15">
                                                        <i className="fa fa-undo mrr5"></i>
                                                        Reset
                                                    </button>
                                                    <button type="button" className="btn btn-outline rightbtn boxShdwNon mrl15" onClick={onSubmit}>
                                                        <FaSave /> Save
                                                    </button>
                                                    <button type="button" className="btn btn-outline rightbtn boxShdwNon mrl15">
                                                        <FaUserFriends />
                                                        Add Sibling
                                                    </button>
                                                    <button type="button" className="btn btn-outline rightbtn boxShdwNon mrl15">
                                                        <FaUserPlus />
                                                        Add Child
                                                    </button>

                                                    <button type="button" className="btn btn-outline rightbtn boxShdwNon mrl15">
                                                        <i className="fa fa-edit mrr5"></i>
                                                        Edit
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
                                    <h5>Chanage History</h5>
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

export const ProductHierarchyPage = withLayoutMaster(ProductHierarchyBase);
