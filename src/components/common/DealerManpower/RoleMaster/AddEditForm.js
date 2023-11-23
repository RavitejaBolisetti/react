/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Col, Input, Form, Row, Switch, Select } from 'antd';
import { validateRequiredInputField } from 'utils/validation';
import { ViewDetail } from './ViewDetail';
import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';

const { Option } = Select;

const AddEditFormMain = (props) => {
    const { form, formData, onCloseAction, formActionType: { editMode, viewMode, addMode } = undefined, onFinish } = props;

    const { buttonData, setButtonData, handleButtonClick } = props;

    const { isDivisionDataLoaded, divisionData } = props;
    const { isDepartmentDataLoaded, departmentData } = props;

    const [filteredDepartmentData, setFilteredDepartmentData] = useState(departmentData?.filter((i) => i?.parentKey === formData?.divisionCode));

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleFormFieldChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleDivisionChange = (division) => {
        form.setFieldValue('departmentCode', undefined);
        setFilteredDepartmentData(departmentData?.filter((i) => i?.parentKey === division));
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
                                    <Form.Item initialValue={formData?.divisionCode} label={translateContent('roleMaster.label.divisionName')} name="divisionCode" placeholder={translateContent('roleMaster.placeholder.divisionName')} rules={[validateRequiredInputField(translateContent('roleMaster.validation.divisionName'))]}>
                                        <Select showSearch loading={!isDivisionDataLoaded} placeholder={translateContent('roleMaster.placeholder.select')} allowClear onChange={handleDivisionChange}>
                                            {divisionData?.map((item) => (
                                                <Option key={item?.key} value={item?.key}>
                                                    {item?.value}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item initialValue={formData?.departmentCode} label={translateContent('roleMaster.label.departmentName')} name="departmentCode" placeholder={translateContent('roleMaster.placeholder.departmentName')} rules={[validateRequiredInputField(translateContent('roleMaster.validation.departmentName'))]}>
                                        <Select showSearch loading={!isDepartmentDataLoaded} placeholder={translateContent('roleMaster.placeholder.select')} allowClear>
                                            {filteredDepartmentData?.map((item) => (
                                                <Option key={item?.key} value={item?.key}>
                                                    {item?.value}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label={translateContent('roleMaster.label.roleName')} initialValue={formData?.roleDescription} rules={[validateRequiredInputField(translateContent('roleMaster.validation.roleName'))]} name="roleDescription">
                                        <Input placeholder={translateContent('roleMaster.placeholder.roleName')} maxLength={50} />
                                    </Form.Item>
                                </Col>
                                {!addMode && (
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item initialValue={formData?.roleCode} label={translateContent('roleMaster.label.roleCode')} name="roleCode" rules={[validateRequiredInputField(translateContent('roleMaster.validation.roleCode'))]}>
                                            <Input placeholder={translateContent('roleMaster.placeholder.roleCode')} maxLength={6} disabled={editMode ? true : false} />
                                        </Form.Item>
                                    </Col>
                                )}

                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item initialValue={editMode ? formData.status : true} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="status" label={translateContent('roleMaster.label.status')}>
                                        <Switch checkedChildren={translateContent('roleMaster.label.active')} unCheckedChildren={translateContent('roleMaster.label.inActive')} onChange={(checked) => (checked ? 1 : 0)} />
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
