import React, { useEffect, useState } from 'react';
import { Col, Input, Form, Row, Select, Switch, TreeSelect } from 'antd';

import { validateRequiredInputField, validateRequiredSelectField, validationFieldLetterAndNumber } from 'utils/validation';
import styles from 'pages/common/Common.module.css';

const { Option } = Select;

const AddEditFormMain = ({ isChecked, setSelectedTreeKey, setIsChecked, flatternData, formActionType, isReadOnly, formData, selectedTreeKey, selectedTreeSelectKey, isDataAttributeLoaded, attributeData, setIsModalOpen, setFieldValue, handleSelectTreeClick, geoData, fieldNames }) => {
    //const treeFieldNames = { ...fieldNames, label: fieldNames.title, value: fieldNames.key };
    
    const treeNames = { ...fieldNames, label: fieldNames.title, value: fieldNames.key , children: fieldNames.children  }
    const disabledProps = { disabled: isReadOnly };

    let treeCodeId = '';
    let attributeKey = formData?.attributeKey;
    let attributeKeyReadOnly = false;
    let treeCodeReadOnly = false;
    if (formActionType === 'edit' || formActionType === 'view') {
        treeCodeId = formData?.geoParentCode;
    } else if (formActionType === 'child') {
        treeCodeId = selectedTreeKey;
        treeCodeReadOnly = true;
    } else if (formActionType === 'sibling') {
        treeCodeReadOnly = true;
        attributeKeyReadOnly = true;
        const selectedData = flatternData.find((i) => selectedTreeKey[0] === i.key);
        treeCodeId = selectedData && selectedData?.data?.geoParentCode;
        attributeKey = selectedData && selectedData?.data?.attributeKey;
    }

    /* tree */
        const [value, setValue] = useState();
        const onChange = (newValue) => {
            setValue(newValue);
            };
        
    /* tree */

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
                    <Form.Item initialValue={attributeKey} name="attributeKey" label="Geographical Attribute Level" rules={[validateRequiredSelectField('Geographical Attribute Level')]}>
                        <Select loading={!isDataAttributeLoaded} placeholder="Select" disabled={attributeKeyReadOnly || isReadOnly} showSearch allowClear>
                            {attributeData?.map((item) => (
                                <Option value={item?.id}>{item?.hierarchyAttribueName}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                    <Form.Item initialValue={treeCodeId} label="Parent" placeholder="Please Select" name="geoParentCode">
                        {/* <TreeSelect
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
                           // fieldNames={treeFieldNames}
                            treeData={geoData}
                            disabled={treeCodeReadOnly || isReadOnly}
                        /> */}
                        <TreeSelect
                            treeLine={true}
                            treeIcon={true}
                            showSearch
                            style={{
                                width: '100%',
                            }}
                            value={value}
                            dropdownStyle={{
                                maxHeight: 400,
                                overflow: 'auto',
                            }}
                            placeholder="Select"
                            allowClear
                            fieldNames={treeNames}
                            onChange={onChange}
                            treeData={geoData}
                            treeNodeFilterProp={fieldNames.title}
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item initialValue={formData?.geoCode} label="Code" name="geoCode" rules={[validateRequiredInputField('Code'), validationFieldLetterAndNumber('Code')]}>
                        <Input placeholder="Code" maxLength={6} className={styles.inputBox} disabled={formData?.id || isReadOnly} />
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
                    <Form.Item label="Status" name="isActive">
                        <Switch checkedChildren="Active" defaultChecked onChange={() => setIsChecked(!isChecked)} value={(formData?.isActive === 'Y' ? 1 : 0) || isChecked} unCheckedChildren="Inactive" {...disabledProps} />
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
};

export const AddEditForm = AddEditFormMain;
