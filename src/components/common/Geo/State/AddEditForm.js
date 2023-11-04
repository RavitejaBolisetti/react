/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Input, Form, Row, Select, Switch } from 'antd';

import { validateRequiredInputField, validationNumber } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';

import { ViewDetail } from './ViewDetail';
import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';
import { translateContent } from 'utils/translateContent';
import styles from 'assets/sass/app.module.scss';

const { Option } = Select;

const AddEditFormMain = (props) => {
    const { form, formData, onCloseAction, formActionType: { editMode, viewMode, addMode } = undefined, onFinish } = props;

    const { isDataCountryLoaded, countryData, defaultCountry } = props;
    const { buttonData, setButtonData, handleButtonClick } = props;

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleFormFieldChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleCountryChange = (countryCode) => {
        form.setFieldValue('countryCodeDisplay', countryData?.find((i) => i?.countryCode === countryCode)?.countryCode);
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
                                    <Form.Item initialValue={formData?.countryCode || defaultCountry} label={translateContent('state.label.country')} name="countryCode" placeholder={preparePlaceholderSelect(translateContent('state.placeholder.country'))} rules={[validateRequiredInputField(translateContent('state.validation.country'))]}>
                                        <Select showSearch loading={!isDataCountryLoaded} placeholder={translateContent('global.placeholder.select')} allowClear onChange={handleCountryChange}>
                                            {countryData?.map((item) => (
                                                <Option key={item?.countryCode} value={item?.countryCode}>
                                                    {item?.countryName}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                {!addMode && (
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item initialValue={formData?.code} label={translateContent('state.label.stateCode')} name="code" rules={[validateRequiredInputField(translateContent('state.validation.stateCode'))]}>
                                            <Input placeholder={preparePlaceholderText(translateContent('state.placeholder.stateCode'))} maxLength={6} disabled={editMode ? true : false} />
                                        </Form.Item>
                                    </Col>
                                )}
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label={translateContent('state.label.stateName')} initialValue={formData?.name} rules={[validateRequiredInputField(translateContent('state.validation.stateName'))]} name="name">
                                        <Input placeholder={preparePlaceholderText(translateContent('state.placeholder.stateName'))} maxLength={50} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item initialValue={formData?.gstStateCode} label={translateContent('state.label.gstStateCode')} name="gstStateCode" rules={[validateRequiredInputField(translateContent('state.validation.gstStateCode')), validationNumber(translateContent('state.validation.gstStateCode'))]}>
                                        <Input placeholder={preparePlaceholderText(translateContent('state.placeholder.gstStateCode'))} maxLength={2} />
                                    </Form.Item>
                                </Col>
                                s
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item initialValue={editMode ? formData.status : true} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="status" label={translateContent('global.label.status')}>
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
