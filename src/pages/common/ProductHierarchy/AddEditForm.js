import React, { useState } from 'react';

import { Form, Row, Col, Input, Select, Switch, Button } from 'antd';
import { FaSearch, FaEdit, FaUserPlus, FaUserFriends, FaSave, FaUndo } from 'react-icons/fa';

import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import styles from '../Common.module.css';

const { TextArea } = Input;
export default function AddEditForm({ showAttributeDetail }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div>
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

                    <Col xs={24} sm={12} md={12} lg={12} xl={12} style={{ padding: '0' }}>
                        <Form.Item label="Parent" name="Parent" className="control-label-blk" rules={[validateRequiredInputField('Parent')]}>
                            <Input.Group compact>
                                <Input
                                    style={{
                                        width: 'calc(100% - 48px)',
                                    }}
                                    name="Parent"
                                    placeholder="Parent"
                                    className={styles.inputBox}
                                />
                                <Button type="primary" id="hierarchyChange" className="btn btn-outline srchbtn mr0 boxShdwNon" onClick={() => setIsModalOpen(true)}>
                                    <FaSearch />
                                </Button>
                            </Input.Group>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={20}>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Form.Item label="Code" name="Code" rules={[validateRequiredInputField('Code')]}>
                            <Input name="Code" placeholder="Code" className={styles.inputBox} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={12} lg={12} xl={12} style={{ padding: '0' }}>
                        <Form.Item name="Short Description" label="Short Description" rules={[validateRequiredInputField('Short Description')]}>
                            <Input className={styles.inputBox} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Form.Item name="Long Desciption" label="Long Description" rules={[validateRequiredInputField('Long Description')]}>
                            <TextArea rows={1} placeholder="Type here" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={12} lg={12} xl={12} style={{ padding: '0' }}>
                        <Form.Item name="Active inactive button" label="Status">
                            <Switch checkedChildren="Active" unCheckedChildren="Inactive" defaultChecked />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <div className={styles.buttonContainer}>
                            <Button danger>
                                <FaEdit className={styles.buttonIcon} />
                                Edit
                            </Button>

                            <Button danger>
                                <FaUserPlus className={styles.buttonIcon} />
                                Add Child
                            </Button>

                            <Button danger>
                                <FaUserFriends className={styles.buttonIcon} />
                                Add Sibling
                            </Button>

                            <Button htmlType="submit" danger>
                                <FaSave className={styles.buttonIcon} />
                                Save
                            </Button>

                            <Button danger>
                                <FaUndo className={styles.buttonIcon} />
                                Reset
                            </Button>

                            {showAttributeDetail && (
                                <Button danger>
                                    <FaUndo className={styles.buttonIcon} />
                                    View Attribute Detail
                                </Button>
                            )}
                        </div>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}
