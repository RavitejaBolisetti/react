import React, { useEffect } from 'react';
import { Col, Input, Form, Row, Select, Switch, TreeSelect } from 'antd';
import { validateRequiredInputField, validateRequiredSelectField, validationFieldLetterAndNumber } from 'utils/validation';
import TreeSelectField from '../TreeSelectField';

import styles from 'pages/common/Common.module.css';

const { Option } = Select;
const { TextArea } = Input;

const AddEditFormMain = ({ isChecked, setSelectedTreeKey, setIsChecked,fieldNames, flatternData,manufacturerAdminHierarchyData, formActionType, isReadOnly, formData, selectedTreeKey, selectedTreeSelectKey, isDataAttributeLoaded, attributeData, setIsModalOpen, setFieldValue, handleSelectTreeClick, geoData }) => {
    // const fieldNames = { label: 'manufactureOrgShrtName', value: 'id', children: 'subManufactureOrg' };
    const treeFieldNames = { ...fieldNames, label: fieldNames.title, value: fieldNames.key };
    const disabledProps = { disabled: isReadOnly };

    let treeCodeId = '';
    let treeCodeReadOnly = false;
    if (formActionType === 'edit' || formActionType === 'view') {
        treeCodeId = formData?.geoParentCode;
    } else if (formActionType === 'child') {
        treeCodeId = selectedTreeKey && selectedTreeKey[0];
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

    const treeSelectFieldProps = { treeFieldNames, treeData: manufacturerAdminHierarchyData, treeDisabled: treeCodeReadOnly || isReadOnly, selectedTreeSelectKey, handleSelectTreeClick, defaultValue: treeCodeId };

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item initialValue={formData?.attributeKey} name="attributeKey" label="Hierarchy Attribute Type" rules={[validateRequiredSelectField('Hierarchy Attribute Type')]}>
                        <Select loading={!isDataAttributeLoaded} placeholder="Select" {...disabledProps} showSearch allowClear>
                            {attributeData?.map((item) => (
                                <Option value={item?.id}>{item?.hierarchyAttribueName}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                    <Form.Item initialValue={treeCodeId} label="Parent" placeholder="Please Select" name="manufactureOrgParntId">
                        <TreeSelectField {...treeSelectFieldProps} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label="Code" name="manufactureOrgCode" initialValue={formData?.manufactureOrgCode} rules={[validateRequiredInputField('Code'), validationFieldLetterAndNumber('Code')]}>
                        <Input placeholder="Code" maxLength={6} className={styles.inputBox} disabled={formData?.id || isReadOnly} />
                    </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item name="manufactureOrgShrtName" label="Short Description" initialValue={formData?.manufactureOrgShrtName} rules={[validateRequiredInputField('Short Description')]}>
                        <Input className={styles.inputBox} {...disabledProps} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item name="manufactureOrgLongName" label="Long Description" initialValue={formData?.manufactureOrgLongName} rules={[validateRequiredInputField('Long Description')]}>
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
