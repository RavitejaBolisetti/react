/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Col, Input, Form, Row, Select, Switch } from 'antd';

import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';

import { ViewDetail } from './ViewDetail';
import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

const { Option } = Select;

const AddEditFormMain = (props) => {
    const { form, formData, onCloseAction, formActionType: { editMode, viewMode, addMode } = undefined, onFinish } = props;

    const { isDataCountryLoaded, countryData, defaultCountry } = props;
    const { buttonData, setButtonData, handleButtonClick } = props;

    const { stateData, districtData } = props;
    const [filteredStateData, setFilteredStateData] = useState(stateData?.filter((i) => i?.parentKey === defaultCountry));
    const [filteredDistrictData, setFilteredDistrictData] = useState(districtData?.filter((i) => i?.parentKey === formData?.stateCode));

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleFormFieldChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleCountryChange = (countryCode) => {
        form.setFieldValue('stateCode', undefined);
        form.setFieldValue('districtCode', undefined);

        setFilteredStateData(stateData?.filter((i) => i?.parentKey === countryCode));
    };

    const handleStateChange = (state) => {
        form.setFieldValue('districtCode', undefined);
        form.setFieldValue('districtCodeDisplay', undefined);

        const stateCode = stateData?.find((i) => i?.code === state)?.code;
        stateCode && form.setFieldValue('stateCodeDisplay', stateCode);

        setFilteredDistrictData(districtData?.filter((i) => i?.parentKey === state));
    };

    const handleDistrictChange = (district) => {
        const districtCode = districtData?.find((i) => i?.code === district)?.code;
        districtCode && form.setFieldValue('districtCodeDisplay', districtCode);
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
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item initialValue={formData?.countryCode || defaultCountry} label={translateContent('city.label.countryCode')} name="countryCode" placeholder={preparePlaceholderSelect(translateContent('city.placeholder.country'))} rules={[validateRequiredInputField(translateContent('city.validation.country'))]}>
                                        <Select showSearch loading={!isDataCountryLoaded} placeholder={translateContent('city.placeholder.select')} allowClear onChange={handleCountryChange}>
                                            {countryData?.map((item) => (
                                                <Option key={item?.countryCode} value={item?.countryCode}>
                                                    {item?.countryName}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label={translateContent('city.label.stateName')} initialValue={formData?.stateCode} name="stateCode" rules={[validateRequiredSelectField(translateContent('city.validation.stateName'))]}>
                                        <Select placeholder={preparePlaceholderSelect(translateContent('city.placeholder.stateName'))} {...selectProps} onChange={handleStateChange}>
                                            {filteredStateData?.map((item) => (
                                                <Option key={item?.key} value={item?.key}>
                                                    {item?.value}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label={translateContent('city.label.districtName')} initialValue={formData?.districtCode} name="districtCode" rules={[validateRequiredSelectField(translateContent('city.validation.districtName'))]}>
                                        <Select placeholder={preparePlaceholderSelect(translateContent('city.placeholder.districtName'))} {...selectProps} onChange={handleDistrictChange}>
                                            {filteredDistrictData?.map((item) => (
                                                <Option key={item?.key} value={item?.key}>
                                                    {item?.value}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>

                                {!addMode && (
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item initialValue={formData?.code} label={translateContent('city.label.cityCode')} name="code" rules={[validateRequiredInputField(translateContent('city.validation.cityCode'))]}>
                                            <Input placeholder={preparePlaceholderText(translateContent('city.placeholder.cityCode'))} maxLength={6} disabled={editMode ? true : false} />
                                        </Form.Item>
                                    </Col>
                                )}

                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label={translateContent('city.label.cityName')} initialValue={formData?.name} rules={[validateRequiredInputField(translateContent('city.validation.cityName'))]} name="name">
                                        <Input placeholder={preparePlaceholderText(translateContent('city.placeholder.cityName'))} maxLength={50} />
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
