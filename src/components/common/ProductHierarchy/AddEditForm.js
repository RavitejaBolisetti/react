import React from 'react';
import { Col, Input, Form, Row, Select, Switch, TreeSelect } from 'antd';
// import { FaSearch } from 'react-icons/fa';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';

import styles from 'pages/common/Common.module.css';

const { Option } = Select;
const { TextArea } = Input;

const AddEditFormMain = ({ isReadOnly, formData, selectedTreeKey, selectedTreeSelectKey, isDataAttributeLoaded, attributeData, setIsModalOpen, setFieldValue, handleSelectTreeClick, productHierarchyData }) => {
    const fieldNames = { label: 'prodctShrtName', value: 'id', children: 'subProdct' };
    const disabledProps = { disabled: isReadOnly };
    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item initialValue={formData?.attributeKey} name="attributeKey" label="Attribute Level" rules={[validateRequiredSelectField('Geographical Attribute Level')]}>
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
                        {/* <Input.Group compact> */}
                        <TreeSelect
                            treeLine={true}
                            treeIcon={true}
                            onChange={handleSelectTreeClick}
                            defaultValue={selectedTreeKey}
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
                            treeData={productHierarchyData}
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
                    <Form.Item label="Code" name="prodctCode" initialValue={formData?.prodctCode} rules={[validateRequiredInputField('Code')]}>
                        <Input placeholder="Code" className={styles.inputBox} {...disabledProps} />
                    </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item name="shortName" label="Short Description" initialValue={formData?.prodctLongName} rules={[validateRequiredInputField('Short Description')]}>
                        <Input className={styles.inputBox} {...disabledProps} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item name="longName" label="Long Description" initialValue={formData?.prodctLongName} rules={[validateRequiredInputField('Long Description')]}>
                        <TextArea rows={1} placeholder="Type here" {...disabledProps} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padLeft10}>
                    <Form.Item initialValue={formData?.active === 'Y' ? 1 : 0} label="Status" name="active">
                        <Switch value={formData?.active === 'Y' ? 1 : 0} checkedChildren="Active" unCheckedChildren="Inactive" defaultChecked {...disabledProps} />
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
};

export const AddEditForm = AddEditFormMain;
