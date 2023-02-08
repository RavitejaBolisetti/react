import React from 'react';
import { Col, Input, Form, Row, Select, Switch, TreeSelect } from 'antd';
// import { FaSearch } from 'react-icons/fa';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';

import styles from 'pages/common/Common.module.css';

const { Option } = Select;

const AddEditFormMain = ({ isReadOnly, formData, selectedTreeKey, selectedTreeSelectKey, isDataAttributeLoaded, attributeData, setIsModalOpen, setFieldValue, handleSelectTreeClick, geoData }) => {
    const fieldNames = { label: 'geoName', value: 'id', children: 'subGeo' };
    const disabledProps = { disabled: isReadOnly };
    console.log('formData - inner', formData);
    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item initialValue={formData?.attributeKey} name="attributeKey" label="Geographical Attribute Level" rules={[validateRequiredSelectField('Geographical Attribute Level')]}>
                        <Select loading={!isDataAttributeLoaded} placeholder="Select" {...disabledProps} allowClear>
                            {attributeData?.map((item) => (
                                <Option value={item?.hierarchyAttribueId}>{item?.hierarchyAttribueName}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                    <Form.Item initialValue={formData?.geoParentCode} label="Parent" name="geoParentCode">
                        {/* {`selectedTreeKey ${selectedTreeKey}`}
                        <br />
                        {`selectedTreeSelectKey ${selectedTreeSelectKey}`}
                        <br />
                        {JSON.stringify(fieldNames)} */}
                        {/* {JSON.stringify(formData)}  */}
                        {/* <Input.Group compact> */}
                        <TreeSelect
                            treeLine={true}
                            treeIcon={true}
                            selectedKeys={selectedTreeKey}
                            onChange={handleSelectTreeClick}
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
                            {...disabledProps}
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
                    <Form.Item initialValue={formData?.geoCode} label="Code" name="geoCode" rules={[validateRequiredInputField('Code')]}>
                        <Input placeholder="Code" maxLength={5} className={styles.inputBox} {...disabledProps} />
                    </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                    <Form.Item initialValue={formData?.geoName} label="Name" name="geoName" rules={[validateRequiredInputField('Name')]}>
                        <Input placeholder="Name" className={styles.inputBox} {...disabledProps} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.padLeft10}>
                    <Form.Item initialValue={formData?.isActive === 'Y' ? 1 : 0} label="Status" name="isActive">
                        <Switch value={formData?.isActive === 'Y' ? 1 : 0} checkedChildren="Active" unCheckedChildren="Inactive" defaultChecked {...disabledProps} />
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
};

export const AddEditForm = AddEditFormMain;
