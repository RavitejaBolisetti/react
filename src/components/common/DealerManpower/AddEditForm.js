import React, { useEffect } from 'react';
import { Col, Input, Form, Row, Select, Switch, TreeSelect } from 'antd';
import { validateRequiredInputField, validateRequiredSelectField, validationFieldLetterAndNumber } from 'utils/validation';

import styles from 'pages/common/Common.module.css';

const { Option } = Select;

const AddEditFormMain = ({ isChecked, setSelectedTreeKey, setIsChecked, flatternData, formActionType, isReadOnly, formData, selectedTreeKey, selectedTreeSelectKey, isDataAttributeLoaded, attributeData, setIsModalOpen, setFieldValue, handleSelectTreeClick, dealerManpowerData }) => {
    const fieldNames = { label: 'dealerManpowerCode', value: 'dealerManpowerId', children: 'subDivision' };
    const disabledProps = { disabled: isReadOnly };

    let treeCodeId = '';
    let treeCodeReadOnly = false;
    if (formActionType === 'edit' || formActionType === 'view') {
        treeCodeId = formData?.dealerParentCode;
    } else if (formActionType === 'child') {
        treeCodeId = selectedTreeKey;
        treeCodeReadOnly = true;
    } else if (formActionType === 'sibling') {
        treeCodeReadOnly = true;
        const treeCodeData = flatternData.find((i) => selectedTreeKey[0] === i.key);
        treeCodeId = treeCodeData && treeCodeData?.data?.dealerParentCode;
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
                    <Form.Item initialValue={formData?.attributeKey} name="attributeKey" label="Dealer Manpower Attribute Level" rules={[validateRequiredSelectField('Dealer Manpower Attribute Level')]}>
                        <Select loading={!isDataAttributeLoaded} placeholder="Select" {...disabledProps} showSearch allowClear>
                            {attributeData?.map((item) => (
                                <Option value={item?.id}>{item?.dealerManpowerAttributeL}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                    <Form.Item initialValue={treeCodeId} label="Parent" placeholder="Please Select" name="manpowerCode">
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
                            treeData={dealerManpowerData}
                            disabled={treeCodeReadOnly || isReadOnly}
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item initialValue={formData?.dealerManpowerCode} label="Code" name="dealerManpowerCode" rules={[validateRequiredInputField('Code'), validationFieldLetterAndNumber('Code')]}>
                        <Input placeholder="Code" maxLength={5} className={styles.inputBox} disabled={formData?.id || isReadOnly} />
                    </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight18}>
                    <Form.Item initialValue={formData?.dealerManpowerDescription} label="Name" name="dealerManpowerName" rules={[validateRequiredInputField('Name')]}>
                        <Input placeholder="Name" className={styles.inputBox} {...disabledProps} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.padLeft10}>
                    <Form.Item label="Status" name="activeIndicator">
                        <Switch checkedChildren="Active" defaultChecked onChange={() => setIsChecked(!isChecked)} value={(formData?.activeIndicator === 'Y' ? 1 : 0) || isChecked} unCheckedChildren="Inactive" {...disabledProps} />
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
};

export const AddEditForm = AddEditFormMain;
