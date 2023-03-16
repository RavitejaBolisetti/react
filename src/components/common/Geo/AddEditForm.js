import React, { useEffect } from 'react';
import { Col, Input, Form, Row, Select, Switch, TreeSelect } from 'antd';

import { validateRequiredInputField, validateRequiredSelectField, validationFieldLetterAndNumber } from 'utils/validation';
import styles from 'pages/common/Common.module.css';
import TreeSelectField from '../TreeSelectField';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';

const { Option } = Select;

const AddEditFormMain = ({ isChecked, setSelectedTreeKey, setSelectedTreeSelectKey, setIsChecked, flatternData, formActionType, isReadOnly, formData, selectedTreeKey, selectedTreeSelectKey, isDataAttributeLoaded, attributeData, setIsModalOpen, setFieldValue, handleSelectTreeClick, geoData, fieldNames }) => {
    const treeFieldNames = { ...fieldNames, label: fieldNames.title, value: fieldNames.key };
    const disabledProps = { disabled: isReadOnly };

    let treeCodeId = '';
    let attributeKey = formData?.attributeKey;
    let attributeKeyReadOnly = false;
    let treeCodeReadOnly = false;
    if (formActionType === 'edit' || formActionType === 'view') {
        treeCodeId = formData?.geoParentCode;
    } else if (formActionType === 'child') {
        treeCodeId = selectedTreeKey && selectedTreeKey[0];
        treeCodeReadOnly = true;
    } else if (formActionType === 'sibling') {
        treeCodeReadOnly = true;
        attributeKeyReadOnly = true;
        const selectedData = flatternData.find((i) => selectedTreeKey[0] === i.key);
        treeCodeId = selectedData && selectedData?.data?.geoParentCode;
        attributeKey = selectedData && selectedData?.data?.attributeKey;
    }

    useEffect(() => {
        if (formActionType === 'sibling') {
            setSelectedTreeKey([treeCodeId]);
        }
        setSelectedTreeSelectKey(treeCodeId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [treeCodeId]);

    const treeSelectFieldProps = {
        treeFieldNames,
        treeData: geoData,
        treeDisabled: treeCodeReadOnly || isReadOnly,
        selectedTreeSelectKey,
        handleSelectTreeClick,
        defaultValue: treeCodeId,
        placeholder: preparePlaceholderSelect('Parent'),
    };

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item initialValue={attributeKey} name="attributeKey" label="Geographical Attribute Level" rules={[validateRequiredSelectField('Geographical Attribute Level')]}>
                        <Select loading={!isDataAttributeLoaded} placeholder={preparePlaceholderSelect('Geographical Attribute Level')} disabled={attributeKeyReadOnly || isReadOnly} showSearch allowClear>
                            {attributeData?.map((item) => (
                                <Option value={item?.id}>{item?.hierarchyAttribueName}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                    <Form.Item initialValue={treeCodeId} label="Parent" name="geoParentCode">
                        <TreeSelectField {...treeSelectFieldProps} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item initialValue={formData?.geoCode} label="Code" name="geoCode" rules={[validateRequiredInputField('Code'), validationFieldLetterAndNumber('Code')]}>
                        <Input placeholder={preparePlaceholderText('Code')} maxLength={6} className={styles.inputBox} disabled={formData?.id || isReadOnly} />
                    </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                    <Form.Item initialValue={formData?.geoName} label="Name" name="geoName" rules={[validateRequiredInputField('Name')]}>
                        <Input placeholder={preparePlaceholderText('Name')} className={styles.inputBox} {...disabledProps} />
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
