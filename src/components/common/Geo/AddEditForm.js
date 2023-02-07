import React from 'react';
import { Button, Col, Input, Form, Row, Select, Switch } from 'antd';
import { FaSearch } from 'react-icons/fa';

import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';

import styles from 'pages/common/Common.module.css';

const { Option } = Select;

const AddEditFormMain = ({ isDataAttributeLoaded, attributeData, setIsModalOpen, setFieldValue, handleParentCode }) => {
    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item name="attributeKey" label="Geographical Attribute Level" rules={[validateRequiredSelectField('Geographical Attribute Level')]}>
                        <Select loading={!isDataAttributeLoaded} placeholder="Geographical Attribute Level">
                            {attributeData?.map((item) => (
                                <Option value={item?.hierarchyAttribueId}>{item?.hierarchyAttribueName}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                    <Form.Item label="Parent" name="geoParentName" className="control-label-blk">
                        <Input.Group compact>
                            <Input
                                onChange={handleParentCode}
                                style={{
                                    width: 'calc(100% - 46px)',
                                }}
                                placeholder="Parent"
                                className={styles.inputBox}
                                allowClear
                            />
                            <Button danger id="hierarchyChange" onClick={() => setIsModalOpen(true)}>
                                <FaSearch />
                            </Button>
                        </Input.Group>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label="Code" name="geoCode" rules={[validateRequiredInputField('Code')]}>
                        <Input placeholder="Code" maxLength={5} className={styles.inputBox} />
                    </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                    <Form.Item label="Name" name="geoName" rules={[validateRequiredInputField('Name')]}>
                        <Input placeholder="Name" className={styles.inputBox} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.padLeft10}>
                    <Form.Item label="Status" name="isActive" initialValue={true}>
                        <Switch value={1} checkedChildren="Active" unCheckedChildren="Inactive" defaultChecked />
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
};

export const AddEditForm = AddEditFormMain;
