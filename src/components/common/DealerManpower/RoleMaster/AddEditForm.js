/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Col, Input, Form, Row, Switch, Select } from 'antd';
import { validateRequiredInputField } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { ViewDetail } from './ViewDetail';
import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';
import styles from 'components/common/Common.module.css';

const { Option } = Select;

const AddEditFormMain = (props) => {
    const { form, formData, onCloseAction, formActionType: { editMode, viewMode } = undefined, onFinish, onFinishFailed } = props;

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
        <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            {viewMode ? (
                <ViewDetail {...viewProps} />
            ) : (
                <>
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.divisionCode} label="Division Name" name="divisionCode" placeholder={preparePlaceholderSelect('division name')} rules={[validateRequiredInputField('Division Name')]}>
                                <Select className={styles.headerSelectField} showSearch loading={!isDivisionDataLoaded} placeholder="Select" allowClear onChange={handleDivisionChange}>
                                    {divisionData?.map((item) => (
                                        <Option key={item?.key} value={item?.key}>
                                            {item?.value}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.departmentCode} label="Department Name" name="departmentCode" placeholder={preparePlaceholderSelect('department name')} rules={[validateRequiredInputField('department name')]}>
                                <Select className={styles.headerSelectField} showSearch loading={!isDepartmentDataLoaded} placeholder="Select" allowClear>
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
                            <Form.Item initialValue={formData?.roleCode} label="Role Code" name="roleCode" rules={[validateRequiredInputField('role code')]}>
                                <Input className={styles.inputBox} placeholder={preparePlaceholderText('role code')} maxLength={6} disabled={editMode ? true : false} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item label="Role Name" initialValue={formData?.roleDescription} rules={[validateRequiredInputField('role Name')]} name="roleDescription">
                                <Input className={styles.inputBox} placeholder={preparePlaceholderText('role Name')} maxLength={50} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={editMode ? formData.status : true} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="status" label="Status">
                                <Switch checkedChildren="Active" unCheckedChildren="Inactive" onChange={(checked) => (checked ? 1 : 0)} />
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
