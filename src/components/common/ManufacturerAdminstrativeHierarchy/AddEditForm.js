import React, { useEffect } from 'react';
import { Col, Input, Form, Row, Select, Switch, TreeSelect } from 'antd';
// import { FaSearch } from 'react-icons/fa';
import { validateRequiredInputField, validateRequiredSelectField, validationFieldLetterAndNumber } from 'utils/validation';

import styles from 'pages/common/Common.module.css';

const { Option } = Select;
const { TextArea } = Input;

const AddEditFormMain = ({ isChecked, setSelectedTreeKey, setIsChecked, flatternData, formActionType, isReadOnly, formData, selectedTreeKey, selectedTreeSelectKey, isDataAttributeLoaded, attributeData, setIsModalOpen, setFieldValue, handleSelectTreeClick, geoData }) => {
    const fieldNames = { label: 'geoName', value: 'id', children: 'subGeo' };
    const disabledProps = { disabled: isReadOnly };

    let treeCodeId = '';
    let treeCodeReadOnly = false;
    if (formActionType === 'edit' || formActionType === 'view') {
        treeCodeId = formData?.geoParentCode;
    } else if (formActionType === 'child') {
        treeCodeId = selectedTreeKey;
        treeCodeReadOnly = true;
    } else if (formActionType === 'sibling') {
        treeCodeReadOnly = true;
        const treeCodeData = flatternData.find((i) => selectedTreeKey[0] === i.key);
        treeCodeId = treeCodeData && treeCodeData?.data?.geoParentCode;
    }

    useEffect(() => {
        if (formActionType === 'sibling') {
            setSelectedTreeKey([treeCodeId]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [treeCodeId]);

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item initialValue={formData?.attributeKey} name="attributeKey" label="Hierarchy Attribute" rules={[validateRequiredSelectField('Hierarchy Attribute Level')]}>
                        <Select loading={!isDataAttributeLoaded} placeholder="Select" {...disabledProps} showSearch allowClear>
                            {attributeData?.map((item) => (
                                <Option value={item?.hierarchyAttribueId}>{item?.hierarchyAttribueName}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>

                {/* <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                    <Form.Item initialValue={treeCodeId} label="Parent" placeholder="Please Select" name="geoParentCode">
                        <TreeSelect
                            treeLine={true}
                            treeIcon={true}
                            onChange={handleSelectTreeClick}
                            defaultValue={treeCodeId}
                            showSearch
                            dropdownStyle={{
                                maxHeight: 400,
                                overflow: 'auto',
                            }}
                            placeholder="Select"
                            allowClear
                            treeDefaultExpandAll
                            fieldNames={fieldNames}
                            treeData={geoData}
                            disabled={treeCodeReadOnly || isReadOnly}
                        />
                    </Form.Item>
                </Col> */}

                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item initialValue={formData?.geoCode} label="Code" name="geoCode" rules={[validateRequiredInputField('Code'), validationFieldLetterAndNumber('Code')]}>
                        <Input placeholder="Code" maxLength={6} className={styles.inputBox} disabled={formData?.id || isReadOnly} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                {/* <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item initialValue={formData?.geoCode} label="Code" name="geoCode" rules={[validateRequiredInputField('Code'), validationFieldLetterAndNumber('Code')]}>
                        <Input placeholder="Code" maxLength={6} className={styles.inputBox} disabled={formData?.id || isReadOnly} />
                    </Form.Item>
                </Col> */}

                {/* <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                    <Form.Item initialValue={formData?.geoName} label="Name" name="geoName" rules={[validateRequiredInputField('Name')]}>
                        <Input placeholder="Name" className={styles.inputBox} {...disabledProps} />
                    </Form.Item>
                </Col> */}

                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item name="shortName" label="Short Description" initialValue={formData?.prodctShrtName} rules={[validateRequiredInputField('Short Description')]}>
                        <Input className={styles.inputBox} {...disabledProps} />
                    </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item name="longName" label="Long Description" initialValue={formData?.prodctLongName} rules={[validateRequiredInputField('Long Description')]}>
                        <TextArea rows={1} placeholder="Type here" {...disabledProps} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.padLeft10}>
                    <Form.Item label="Status" name="isActive">
                        <Switch checkedChildren="Yes" defaultChecked onChange={() => setIsChecked(!isChecked)} value={(formData?.isActive === 'Y' ? 1 : 0) || isChecked} unCheckedChildren="No" {...disabledProps} />
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
};

export const AddEditForm = AddEditFormMain;
