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
import { translateContent } from 'utils/translateContent';
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
        saveButtonName: formActionType?.editMode ? translateContent('termConditionManufacturer.fields.reviseT&C') : translateContent('termConditionManufacturer.fields.addT&C'),
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

    const fromDateInitialValue = { initialValue: formattedCalendarDate(formData?.effectivefrom) };
    const toDateInitialValue = { initialValue: formattedCalendarDate(formData?.effectiveto ? formData?.effectiveto : new Date('December 31, 9999')) };

    return (
        <Form autoComplete="off" form={form} id="myForm" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed} onFieldsChange={handleFormFieldChange}>
            <Row gutter={20} className={styles.drawerBody}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    {!formActionType?.viewMode ? (
                        <>
                            <Row gutter={20}>
                                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                    <Form.Item initialValue={formActionType?.editMode || formActionType?.viewMode ? translateContent('termConditionManufacturer.fields.revised') : translateContent('termConditionManufacturer.fields.initial')} label={translateContent('termConditionManufacturer.label.documentCategory')} name="documentcategory">
                                        <Input disabled={true} maxLength={10} placeholder={preparePlaceholderText(translateContent('termConditionManufacturer.placeholder.documentCategory'))} />
                                    </Form.Item>
                                </Col>

                                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                    <Form.Item initialValue={formData?.productcode} label={translateContent('termConditionManufacturer.label.productHierarchy')} name="productcode" rules={[validateRequiredSelectField(translateContent('termConditionManufacturer.validation.productHierarchy'))]}>
                                        <Select disabled={formActionType?.viewMode} placeholder={translateContent('termConditionManufacturer.placeholder.selectParameter')} allowClear>
                                            {productHierarchyList?.map((item) => (
                                                <Option key={'ph' + item.prodctCode} value={item.prodctCode}>
                                                    {item.prodctShrtName}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                    <Form.Item initialValue={formData?.documentTypeCode} label={translateContent('termConditionManufacturer.label.documentType')} name="documentTypeCode" rules={[validateRequiredSelectField(translateContent('termConditionManufacturer.validation.documentType'))]}>
                                        <Select disabled={formActionType?.viewMode} placeholder={translateContent('termConditionManufacturer.placeholder.selectParameter')} allowClear>
                                            {documentTypeList?.map((item) => (
                                                <Option key={'dt' + item.documentCode} value={item.documentCode}>
                                                    {item.documentCode}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>

                                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                    <Form.Item initialValue={formData?.languageCode} label={translateContent('termConditionManufacturer.label.language')} name="languageCode" rules={[validateRequiredSelectField(translateContent('termConditionManufacturer.validation.documentType'))]}>
                                        <Select disabled={formActionType?.viewMode} placeholder={translateContent('termConditionManufacturer.placeholder.selectParameter')} allowClear>
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
                                    <Form.Item {...fromDateInitialValue} label={translateContent('termConditionManufacturer.label.effectivefrom')} name="effectivefrom" rules={[validateRequiredInputField(translateContent('termConditionManufacturer.validation.date'))]}>
                                        <DatePicker format={dateFormat} disabled={formActionType?.viewMode} style={{ width: '100%' }} onChange={handleFromDateChange} disabledDate={disableFromDate} />
                                    </Form.Item>
                                </Col>
                                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                    <Form.Item {...toDateInitialValue} label={translateContent('termConditionManufacturer.label.effectiveto')} name="effectiveto">
                                        <DatePicker format={dateFormat} disabled style={{ width: '100%' }} disabledDate={disableToDate} />
                                    </Form.Item>
                                </Col>
                            </Row>

                            {(formActionType?.viewMode || formActionType?.editMode) && (
                                <Row gutter={20}>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                        <Form.Item initialValue={parseInt(formData?.version) + 1.0} label={translateContent('termConditionManufacturer.label.version')} name="version">
                                            <Input disabled={true} placeholder={preparePlaceholderText(translateContent('termConditionManufacturer.placeholder.version'))} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            )}

                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                    <Form.Item disabled={formActionType?.viewMode} initialValue={formData?.termsconditiondescription} label={translateContent('termConditionManufacturer.label.terms&Condition')} name="termsconditiondescription" rules={[validateRequiredInputField(translateContent('termConditionManufacturer.validation.terms&Condition'))]}>
                                        <CustomEditor onReady={formData?.termsconditiondescription} data={formData?.termsconditiondescription} />
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
