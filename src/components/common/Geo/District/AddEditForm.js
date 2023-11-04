/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Input, Form, Row, Select, Switch } from 'antd';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { withDrawer } from 'components/withDrawer';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import styles from 'assets/sass/app.module.scss';

import { ViewDetail } from './ViewDetail';
import { DrawerFormButton } from 'components/common/Button';
import { translateContent } from 'utils/translateContent';

const { Option } = Select;

const AddEditFormMain = (props) => {
    const { form, formData, onCloseAction, formActionType: { editMode, viewMode, addMode } = undefined, onFinish } = props;

    const { isDataCountryLoaded, countryData, defaultCountry, stateData, unFilteredStateData } = props;
    const { buttonData, setButtonData, handleButtonClick } = props;

    let stateFieldValidation = {
        rules: [validateRequiredSelectField(translateContent('district.validation.stateName'))],
    };

    if (stateData && formData?.stateCode) {
        if (stateData.find((attribute) => attribute.key === formData?.stateCode)) {
            stateFieldValidation.initialValue = formData?.stateCode;
        } else {
            const Attribute = unFilteredStateData.find((attribute) => attribute.id === formData?.attributeKey);
            if (Attribute) {
                stateFieldValidation.initialValue = Attribute?.name;
                stateFieldValidation.rules.push({ type: 'number', message: Attribute?.name + `${translateContent('district.message.differentState')}` });
            }
        }
    }

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleFormFieldChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleStateChange = (state) => {
        form.setFieldValue('stateCodeDisplay', stateData?.find((i) => i?.code === state)?.code);
    };

    const viewProps = {
        isVisible: viewMode,
        formData,
        styles,
    };

    const handleCountryChange = (countryCode) => {
        form.setFieldValue('countryCodeDisplay', countryData?.find((i) => i?.countryCode === countryCode)?.countryCode);
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
        <Form autoComplete="off" layout="vertical" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish}>
            <Row gutter={20} className={styles.drawerBody}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    {viewMode ? (
                        <>
                            <ViewDetail {...viewProps} />
                        </>
                    ) : (
                        <>
                            <Row gutter={16}>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item initialValue={formData?.countryCode || defaultCountry} label={translateContent('district.label.countryCode')} name="countryCode" placeholder={preparePlaceholderSelect(translateContent('district.placeholder.country'))} rules={[validateRequiredSelectField(translateContent('district.validation.country'))]}>
                                        <Select showSearch loading={!isDataCountryLoaded} placeholder={translateContent('global.placeholder.select')} allowClear onChange={handleCountryChange}>
                                            {countryData?.map((item) => (
                                                <Option key={item?.countryCode} value={item?.countryCode}>
                                                    {item?.countryName}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item initialValue={formData?.stateCode} label={translateContent('district.label.stateName')} name="stateCode" {...stateFieldValidation}>
                                        <Select placeholder={preparePlaceholderSelect(translateContent('district.placeholder.stateName'))} {...selectProps} onChange={handleStateChange}>
                                            {stateData?.map((item) => (
                                                <Option value={item?.key}>{item?.value}</Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>

                                {!addMode && (
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item initialValue={formData?.code} label={translateContent('district.label.districtCode')} name="code" rules={[validateRequiredInputField(translateContent('city.validation.districtCode'))]}>
                                            <Input placeholder={preparePlaceholderText(translateContent('district.placeholder.districtCode'))} maxLength={6} disabled={editMode ? true : false} />
                                        </Form.Item>
                                    </Col>
                                )}

                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item initialValue={formData?.name} label={translateContent('district.label.districtName')} rules={[validateRequiredInputField(translateContent('district.validation.districtName'))]}>
                                        <Input placeholder={preparePlaceholderText(translateContent('district.placeholder.districtName'))} />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item initialValue={editMode ? formData.status : true} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="status" label={translateContent('global.label.status')}>
                                        <Switch checkedChildren="Active" unCheckedChildren="Inactive" onChange={(checked) => (checked ? 1 : 0)} />
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
