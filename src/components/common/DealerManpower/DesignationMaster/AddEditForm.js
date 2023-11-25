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
import { customSelectBox } from 'utils/customSelectBox';
import { PARAM_MASTER } from 'constants/paramMaster';

import styles from 'assets/sass/app.module.scss';

import { translateContent } from 'utils/translateContent';

const { Option } = Select;

const AddEditFormMain = (props) => {
    const { form, formData, onCloseAction, formActionType: { editMode, viewMode } = undefined, onFinish, typeData, mileData } = props;

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
        typeData,
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
    };
    return (
        <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish}>
            <Row gutter={20} className={styles.drawerBody}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    {viewMode ? (
                        <ViewDetail {...viewProps} />
                    ) : (
                        <>
                            <Row gutter={16}>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item initialValue={formData?.divisionCode} label={translateContent('designationMaster.label.divisionName')} name="divisionCode" rules={[validateRequiredSelectField(translateContent('designationMaster..validation.divisionName'))]}>
                                        <Select {...selectProps} placeholder={preparePlaceholderSelect(translateContent('designationMaster.placeholder.divisionName'))} allowClear onChange={handleDivisionChange}>
                                            {divisionData?.map((item) => (
                                                <Option key={item?.key} value={item?.key}>
                                                    {item?.value}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item initialValue={formData?.departmentCode} label={translateContent('designationMaster.label.departmentName')} name="departmentCode">
                                        <Select {...selectProps} placeholder={preparePlaceholderSelect(translateContent('designationMaster.placeholder.departmentName'))} allowClear onChange={handleDepartmentChange}>
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
                                    <Form.Item initialValue={formData?.roleCode} label={translateContent('designationMaster.label.roleDescription')} name="roleCode">
                                        <Select {...selectProps} placeholder={preparePlaceholderSelect(translateContent('designationMaster.placeholder.roleDescription'))} allowClear>
                                            {filteredRoleData?.map((item) => (
                                                <Option key={item?.key} value={item?.key}>
                                                    {item?.value}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                {/* <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item initialValue={formData?.designationCode} label="Designation Code" name="designationCode" rules={[validateRequiredInputField('Designation Code')]}>
                                        <Input placeholder={preparePlaceholderText('Designation Code')} maxLength={6} disabled={editMode ? true : false} />
                                    </Form.Item>
                                </Col> */}
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item initialValue={formData?.designationType} label={translateContent('designationMaster.label.designationType')} name="designationType" rules={[validateRequiredSelectField(translateContent('designationMaster.validation.designationType'))]}>
                                        {customSelectBox({ data: typeData[PARAM_MASTER.DESG_TYP_ASGN_TO.id], placeholder: preparePlaceholderSelect(translateContent('designationMaster.placeholder.designationType')) })}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label={translateContent('designationMaster.label.designationName')} initialValue={formData?.designationDescription} rules={[validateRequiredInputField(translateContent('designationMaster.validation.designationName'))]} name="designationDescription">
                                        <Input placeholder={preparePlaceholderText(translateContent('designationMaster.placeholder.designationName'))} maxLength={50} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item initialValue={formData?.mileSkillId} label={translateContent('designationMaster.label.mileSkill')} name="mileSkillId">
                                        {customSelectBox({ data: mileData || [], placeholder: preparePlaceholderSelect(translateContent('designationMaster.placeholder.mileSkill')) })}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item initialValue={editMode ? formData.status : true} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="status" label={translateContent('designationMaster.label.status')}>
                                        <Switch checkedChildren={translateContent('global.label.active')} unCheckedChildren={translateContent('global.label.inActive')} onChange={(checked) => (checked ? 1 : 0)} />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                    <Form.Item initialValue={editMode ? formData.isManpowerIndicatorRequired : false} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="isManpowerIndicatorRequired">
                                        <Checkbox>{translateContent('designationMaster.label.manPowerRequired')}</Checkbox>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                    <Form.Item initialValue={editMode ? formData.isAccountsDataIndicatorRequired : false} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="isAccountsDataIndicatorRequired">
                                        <Checkbox>{translateContent('designationMaster.label.accountsData')}</Checkbox>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                    <Form.Item initialValue={editMode ? formData.isCapabilityIndicatorRequired : false} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="isCapabilityIndicatorRequired">
                                        <Checkbox>{translateContent('designationMaster.label.capability')}</Checkbox>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                    <Form.Item initialValue={editMode ? formData.isCreateUserIdRequired : false} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="isCreateUserIdRequired">
                                        <Checkbox>{translateContent('designationMaster.label.createUserId')}</Checkbox>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </>
                    )}
                </Col>
            </Row>

            <DrawerFormButton {...buttonProps} />
        </Form>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
