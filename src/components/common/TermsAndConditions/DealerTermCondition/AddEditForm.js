/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Input, Form, Col, Row, Select, DatePicker } from 'antd';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { ViewTermConditionList } from './ViewTermConditionList';
import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';
import { CustomEditor } from 'components/common/CustomEditor';
import { formattedCalendarDate, dateFormat } from 'utils/formatDateTime';

import styles from 'assets/sass/app.module.scss';

const { Option } = Select;

const AddEditFormMain = (props) => {
    const { form, formData, onCloseAction, productHierarchyList, documentTypeList, languageList, formActionType: { isViewModeVisible } = undefined, onFinish, onFinishFailed } = props;
    const { buttonData, setButtonData, handleButtonClick, formActionType } = props;
    const [startDate, setStartDate] = useState(new Date());

    const handleFormFieldChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const viewProps = {
        isVisible: isViewModeVisible,
        formData,
        styles,
    };

    const buttonProps = {
        formData,
        onCloseAction,
        buttonData,
        setButtonData,
        handleButtonClick,
        saveButtonName: formActionType?.editMode ? 'Revise T&C' : 'Add T&C',
    };

    const handleFromDateChange = (value) => {
        setStartDate(value);
    };

    const disableFromDate = (value) => {
        return value < new Date();
    };

    const disableToDate = (value) => {
        return value < startDate;
    };

    const fromDateInitialValue = { initialValue: formattedCalendarDate(formData?.effectiveFrom) };
    const toDateInitialValue = { initialValue: formattedCalendarDate(formData?.effectiveTo ? formData?.effectiveTo : new Date('December 31, 9999')) };

    return (
        <Form autoComplete="off" form={form} id="myForm" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed} onFieldsChange={handleFormFieldChange}>
            <Row gutter={20} className={styles.drawerBody}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    {!formActionType?.viewMode ? (
                        <>
                            <Row gutter={20}>
                                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                    <Form.Item initialValue={formActionType?.editMode || formActionType?.viewMode ? 'Revised' : 'Initial'} label="Document Category" name="documentCategory">
                                        <Input disabled={true} maxLength={10} placeholder={preparePlaceholderText('Document Category')} />
                                    </Form.Item>
                                </Col>

                                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                    <Form.Item initialValue={formData?.productCode} label="Product Hierarchy" name="productCode" rules={[validateRequiredSelectField('Product Hierarchy')]}>
                                        <Select disabled={formActionType?.viewMode} placeholder="Select Parameter" allowClear>
                                            {productHierarchyList?.map((item) => (
                                                <Option key={'pc' + item.prodctCode} value={item.prodctCode}>
                                                    {item.prodctShrtName}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                    <Form.Item initialValue={formData?.documentTypeCode} label="Document Type" name="documentTypeCode" rules={[validateRequiredSelectField('Document Type')]}>
                                        <Select disabled={formActionType?.viewMode} placeholder="Select Parameter" allowClear>
                                            {documentTypeList?.map((item) => (
                                                <Option key={'dt' + item.documentCode} value={item.documentCode}>
                                                    {item.documentCode}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>

                                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                    <Form.Item initialValue={formData?.languageCode} label="Language" name="languageCode" rules={[validateRequiredSelectField('Language')]}>
                                        <Select disabled={formActionType?.viewMode} placeholder="Select Parameter" allowClear>
                                            {languageList?.map((item) => (
                                                <Option key={'lc' + item.key} value={item.key}>
                                                    {item.value}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={20}>
                                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                    <Form.Item {...fromDateInitialValue} label="Effective From" name="effectiveFrom" rules={[validateRequiredInputField('date')]}>
                                        <DatePicker format={dateFormat} disabled={formActionType?.viewMode} style={{ width: '100%' }} onChange={handleFromDateChange} disabledDate={disableFromDate} />
                                    </Form.Item>
                                </Col>
                                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                    <Form.Item {...toDateInitialValue} label="Effective To" name="effectiveTo">
                                        <DatePicker format={dateFormat} disabled style={{ width: '100%' }} disabledDate={disableToDate} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            {(formActionType?.viewMode || formActionType?.editMode) && (
                                <Row gutter={20}>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                        <Form.Item initialValue={parseInt(formData?.version) + 1.0} label="Version" name="version">
                                            <Input disabled={true} placeholder={preparePlaceholderText('Version')} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            )}

                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                    <Form.Item disabled={formActionType?.viewMode} initialValue={formData?.termConditionDescription} label="Terms & Conditions" name="termConditionDescription" rules={[validateRequiredInputField('Terms & Conditions')]}>
                                        <CustomEditor onReady={formData?.termConditionDescription} data={formData?.termConditionDescription} />
                                        {/* onChange={(event, editor) => { const data = editor.getData(), setContent(data)}} */}
                                    </Form.Item>
                                </Col>
                            </Row>
                        </>
                    ) : (
                        <ViewTermConditionList {...viewProps} />
                    )}
                </Col>
            </Row>
            <DrawerFormButton {...buttonProps} />
        </Form>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
