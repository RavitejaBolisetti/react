/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Input, Form, Row, Switch, Select } from 'antd';

import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';

import { ViewDetail } from './ViewDetail';
import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

const { Option } = Select;
const AddEditFormMain = (props) => {
    const { form, formData, onCloseAction, formActionType: { editMode, viewMode } = undefined, onFinish } = props;
    const { isDivisionLoading, divisionData } = props;
    const { buttonData, setButtonData, handleButtonClick } = props;

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleFormFieldChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleDivisionChange = (division) => {
        form.setFieldValue('divisionCodeDisplay', divisionData?.find((i) => i?.code === division)?.code);
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
        <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish}>
            <Row gutter={20} className={styles.drawerBody}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    {viewMode ? (
                        <ViewDetail {...viewProps} />
                    ) : (
                        <>
                            <Row gutter={16}>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                    <Form.Item initialValue={formData?.divisionCode} label={translateContent('employeeDepartment.label.divisionName')} name="divisionCode" rules={[validateRequiredSelectField(translateContent('employeeDepartment.label.divisionName'))]}>
                                        <Select {...selectProps} placeholder={preparePlaceholderSelect(translateContent('employeeDepartment.label.division'))} loading={isDivisionLoading} onChange={handleDivisionChange}>
                                            {divisionData?.map((item) => (
                                                <Option key={item?.key} value={item?.key}>
                                                    {item?.value}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item initialValue={formData?.departmentCode} label={translateContent('employeeDepartment.label.departmentCode')} name="departmentCode" rules={[validateRequiredInputField(translateContent('employeeDepartment.label.departmentCode'))]}>
                                        <Input placeholder={preparePlaceholderText(translateContent('employeeDepartment.label.departmentCode'))} maxLength={6} disabled={editMode ? true : false} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item initialValue={formData?.departmentName} label={translateContent('employeeDepartment.label.departmentName')} name="departmentName" rules={[validateRequiredInputField(translateContent('employeeDepartment.label.departmentName'))]}>
                                        <Input placeholder={preparePlaceholderText(translateContent('employeeDepartment.label.departmentName'))} maxLength={50} />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item initialValue={editMode ? formData.status : true} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="status" label={translateContent('global.label.active')} data-testid="status">
                                        <Switch checkedChildren={translateContent('global.label.active')} unCheckedChildren={translateContent('global.label.inActive')} onChange={(checked) => (checked ? 1 : 0)} />
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
