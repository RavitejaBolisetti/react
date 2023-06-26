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
import styles from 'components/common/Common.module.css';
import { ViewDetail } from './ViewDetail';
import { DrawerFormButton } from 'components/common/Button';

const { Option } = Select;

const AddEditFormMain = (props) => {
    const { form, formData, onCloseAction, formActionType: { editMode, viewMode } = undefined, onFinish, onFinishFailed } = props;

    const { isDataCountryLoaded, countryData, defaultCountry, stateData, unFilteredStateData } = props;
    const { buttonData, setButtonData, handleButtonClick } = props;

    let stateFieldValidation = {
        rules: [validateRequiredSelectField('State Name')],
    };

    if (stateData && formData?.stateCode) {
        if (stateData.find((attribute) => attribute.key === formData?.stateCode)) {
            stateFieldValidation.initialValue = formData?.stateCode;
        } else {
            const Attribute = unFilteredStateData.find((attribute) => attribute.id === formData?.attributeKey);
            if (Attribute) {
                stateFieldValidation.initialValue = Attribute?.name;
                stateFieldValidation.rules.push({ type: 'number', message: Attribute?.name + ' is not active anymore. Please select a different state. ' });
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
        <Form autoComplete="off" layout="vertical" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            {viewMode ? (
                <>
                    <ViewDetail {...viewProps} />
                </>
            ) : (
                <>
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.countryCode || defaultCountry} label="Country" name="countryCode" placeholder={preparePlaceholderSelect('Country')} rules={[validateRequiredSelectField('Country')]}>
                                <Select className={styles.headerSelectField} showSearch loading={!isDataCountryLoaded} placeholder="Select" allowClear onChange={handleCountryChange}>
                                    {countryData?.map((item) => (
                                        <Option key={item?.countryCode} value={item?.countryCode}>{item?.countryName}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.stateCode} label="State Name" name="stateCode" {...stateFieldValidation}>
                                <Select placeholder={preparePlaceholderSelect('State Name')} {...selectProps} onChange={handleStateChange}>
                                    {stateData?.map((item) => (
                                        <Option value={item?.key}>{item?.value}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.code} label="District Code" name="code" rules={[validateRequiredInputField('district Code')]}>
                                <Input placeholder={preparePlaceholderText('District Code')} className={styles.inputBox} maxLength={6} disabled={editMode ? true : false} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item initialValue={formData?.name} label="District Name" name="name" rules={[validateRequiredInputField('District Name')]}>
                                <Input placeholder={preparePlaceholderText('District Name')} className={styles.inputBox} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padLeft10}>
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
