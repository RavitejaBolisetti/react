/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Col, Input, Form, Row, Switch, Select, Checkbox } from 'antd';

import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';

import { ViewDetail } from './ViewDetail';
import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';

import styles from 'components/common/Common.module.css';
const { Option } = Select;

const AddEditFormMain = (props) => {
    const { form, formData, onCloseAction, formActionType: { editMode, viewMode } = undefined, onFinish, onFinishFailed } = props;

    const { buttonData, setButtonData, handleButtonClick, divisionData, departmentData, roleData } = props;
    const [filteredDepartmentData, setFilteredDepartmentData] = useState(departmentData?.filter((i) => i?.parentKey === formData?.divisionCode));
    const [filteredRoleData, setFilteredRoletData] = useState(roleData?.filter((i) => i?.parentKey === formData?.departmentCode));

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleFormFieldChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleDivisionChange = (division) => {
        form.setFieldValue('departmentCode', undefined);
        form.setFieldValue('roleCode', undefined);
        setFilteredRoletData(undefined);
        setFilteredDepartmentData(departmentData?.filter((i) => i?.parentKey === division));
    };
    const handleDepartmentChange = (department) => {
        form.setFieldValue('roleCode', undefined);
        setFilteredRoletData(roleData?.filter((i) => i?.parentKey === department));
    };

    const viewProps = {
        isVisible: viewMode,
        formData,
        styles,
    };

    const buttonProps = {
        formData,
        onCloseAction,
        buttonData,
        setButtonData,
        handleButtonClick,
    };

    const selectProps = {
        optionFilterProp: 'children',
        showSearch: true,
        allowClear: true,
        className: styles.headerSelectField,
    };
    return (
        <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            {viewMode ? (
                <ViewDetail {...viewProps} />
            ) : (
                <>
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.divisionCode} label="Division Name" name="divisionCode" rules={[validateRequiredSelectField('Division Name')]}>
                                <Select {...selectProps} placeholder={preparePlaceholderSelect('Division Name')} allowClear onChange={handleDivisionChange}>
                                    {divisionData?.map((item) => (
                                        <Option key={item?.key} value={item?.key}>
                                            {item?.value}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.departmentCode} label="Department Name" name="departmentCode" rules={[validateRequiredSelectField('Department Name')]}>
                                <Select {...selectProps} placeholder={preparePlaceholderSelect('Department Name')} allowClear onChange={handleDepartmentChange}>
                                    {filteredDepartmentData?.map((item) => (
                                        <Option key={item?.key} value={item?.key}>
                                            {item?.value}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.roleCode} label="Role Name" name="roleCode" rules={[validateRequiredSelectField('Role Name')]}>
                                <Select {...selectProps} placeholder={preparePlaceholderSelect('Role Description')} allowClear>
                                    {filteredRoleData?.map((item) => (
                                        <Option key={item?.key} value={item?.key}>
                                            {item?.value}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.designationCode} label="Designation Code" name="designationCode" rules={[validateRequiredInputField('Designation Code')]}>
                                <Input placeholder={preparePlaceholderText('Designation Code')} maxLength={6} disabled={editMode ? true : false} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item label="Designation Name" initialValue={formData?.designationDescription} rules={[validateRequiredInputField('Designation Name')]} name="designationDescription">
                                <Input placeholder={preparePlaceholderText('Designation Name')} maxLength={50} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={editMode ? formData.status : true} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="status" label="Status">
                                <Switch checkedChildren="Active" unCheckedChildren="Inactive" onChange={(checked) => (checked ? 1 : 0)} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={editMode ? formData.isCommonIndicatorRequired : false} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="isCommonIndicatorRequired">
                                <Checkbox>Common</Checkbox>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={editMode ? formData.isManpowerIndicatorRequired : false} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="isManpowerIndicatorRequired">
                                <Checkbox>Manpower Required</Checkbox>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={editMode ? formData.isLeadershipIndicatorRequired : false} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="isLeadershipIndicatorRequired">
                                <Checkbox>Leadership</Checkbox>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={editMode ? formData.isAccountsDataIndicatorRequired : false} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="isAccountsDataIndicatorRequired">
                                <Checkbox>Accounts Data</Checkbox>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={editMode ? formData.isDealerHrIndicatorRequired : false} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="isDealerHrIndicatorRequired">
                                <Checkbox>Dealer HR</Checkbox>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={editMode ? formData.isCertifiedIndicatorRequired : false} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="isCertifiedIndicatorRequired">
                                <Checkbox>Certified</Checkbox>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={editMode ? formData.isNeftDetailsIndicatorRequired : false} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="isNeftDetailsIndicatorRequired">
                                <Checkbox>NEFT Details</Checkbox>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={editMode ? formData.isCapabilityIndicatorRequired : false} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="isCapabilityIndicatorRequired">
                                <Checkbox>Capability (L1/L2/L3)</Checkbox>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={editMode ? formData.isFftDepartmentApprovalIndicatorRequired : false} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="isFftDepartmentApprovalIndicatorRequired">
                                <Checkbox>FFT Department Approval</Checkbox>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={editMode ? formData.isCreateUserIdRequired : false} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="isCreateUserIdRequired">
                                <Checkbox>Create User Id</Checkbox>
                            </Form.Item>
                        </Col>
                    </Row>
                </>
            )}

            <DrawerFormButton {...buttonProps} />
        </Form>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
