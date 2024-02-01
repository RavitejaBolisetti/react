/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Col, Input, Form, Row, Select, Switch, DatePicker } from 'antd';

import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { prepareDatePickerText, preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';

import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';
import { dateFormat } from 'utils/formatDateTime';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';
import { customSelectBox } from 'utils/customSelectBox';

const { Option } = Select;

const AddEditFormMain = (props) => {
    const { form, formData, onCloseAction, formActionType: { editMode, viewMode, addMode } = undefined, onFinish } = props;

    const { buttonData, setButtonData, handleButtonClick } = props;

    const isReadOnly = false;
    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleFormFieldChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
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
                <Col xs={24} sm={12} md={24} lg={24} xl={24} xxl={24}>
                    <>
                        <Row gutter={16}>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item label={translateContent('Target Letter ID' || 'city.label.countryCode')} name="targetedLetterId" placeholder={preparePlaceholderSelect(translateContent('city.placeholder.country'))} rules={[validateRequiredInputField(translateContent('city.validation.country'))]}>
                                    <Input placeholder={preparePlaceholderText('Target Letter ID' || translateContent('city.placeholder.cityCode'))} maxLength={12} disabled={editMode ? true : false} />
                                </Form.Item>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <Form.Item label={'Created Date' || translateContent('customerMaster.label.dateOfBirth')} name="createdDate">
                                    <DatePicker format={dateFormat} placeholder={prepareDatePickerText(dateFormat)} className={styles?.datePicker} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <Form.Item label={'Financial Month'} name="financialMonth">
                                    {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('Financial Month' || translateContent('customerMaster.placeholder.corporateName')) })}
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <Form.Item label={'Financial Year'} name="financialYear">
                                    {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('Financial Year' || translateContent('customerMaster.placeholder.corporateName')) })}
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <Form.Item label={'Scheme Type'} name="schemeType">
                                    {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('Scheme Type' || translateContent('customerMaster.placeholder.corporateName')) })}
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <Form.Item labelAlign="left" name="status" label={translateContent('global.label.status')} valuePropName="checked">
                                    <Switch checkedChildren={translateContent('global.label.active')} unCheckedChildren={translateContent('global.label.inActive')} valuePropName="checked" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </>
                </Col>
            </Row>

            <DrawerFormButton {...buttonProps} />
        </Form>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
