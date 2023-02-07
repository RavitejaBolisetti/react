import React from 'react';
import { Button, Col, Input, Form, Row, Select, Switch, TreeSelect } from 'antd';
import { FaSearch } from 'react-icons/fa';

import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';

import styles from 'pages/common/Common.module.css';

const { Option } = Select;

const AddEditFormMain = ({ selectedTreeKey, isDataAttributeLoaded, attributeData, setIsModalOpen, setFieldValue, handleParentCode, geoData }) => {
    const fieldNames = { label: 'geoName', value: 'id', children: 'subGeo' };
    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item name="attributeKey" label="Geographical Attribute Level" rules={[validateRequiredSelectField('Geographical Attribute Level')]}>
                        <Select loading={!isDataAttributeLoaded} placeholder="Select" allowClear>
                            {attributeData?.map((item) => (
                                <Option value={item?.hierarchyAttribueId}>{item?.hierarchyAttribueName}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                    <Form.Item label="Parent" name="geoParentName">{selectedTreeKey}
                        {/* <Input.Group compact> */}
                        <TreeSelect
                            onChange={handleParentCode}
                            defaultValue={selectedTreeKey && selectedTreeKey[0]}
                            showSearch
                            // style={{
                            //     width: 'calc(100% - 48px)',
                            // }}
                            dropdownStyle={{
                                maxHeight: 400,
                                overflow: 'auto',
                            }}
                            placeholder="Select"
                            allowClear
                            treeDefaultExpandAll
                            fieldNames={fieldNames}
                            treeData={geoData}
                        />
                        {/* <Button danger id="hierarchyChange" onClick={() => setIsModalOpen(true)}>
                                <FaSearch />
                            </Button> */}
                        {/* </Input.Group> */}
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
