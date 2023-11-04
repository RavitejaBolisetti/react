/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Col, Input, Form, Row, Select, Switch } from 'antd';
import { validateRequiredInputField, validateRequiredSelectField, validatePincodeField } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { ViewDetail } from './ViewDetail';
import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

const { Option } = Select;

const AddEditFormMain = (props) => {
    const { form, formData, onCloseAction, formActionType: { editMode, viewMode } = undefined, onFinish } = props;
    const { isDataCountryLoaded, countryData, defaultCountry } = props;
    const { stateData, districtData, tehsilData, cityData, typeData } = props;
    const { buttonData, setButtonData, handleButtonClick } = props;
    const [filteredStateData, setFilteredStateData] = useState(stateData?.filter((i) => i?.parentKey === defaultCountry));
    const [filteredDistrictData, setFilteredDistrictData] = useState(districtData?.filter((i) => i?.parentKey === formData?.stateCode));
    const [filteredCityData, setFilteredCityData] = useState(cityData?.filter((i) => i?.parentKey === formData?.districtCode));
    const [filteredTehsilData, setFilteredTehsilData] = useState(tehsilData?.filter((i) => i?.parentKey === formData?.districtCode));

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleFormFieldChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };
    const handleCountryChange = (countryCode) => {
        form.setFieldValue('stateCode', undefined);
        form.setFieldValue('districtCode', undefined);
        form.setFieldValue('cityCode', undefined);
        form.setFieldValue('tehsilCode', undefined);

        setFilteredStateData(stateData?.filter((i) => i?.parentKey === countryCode));
        setFilteredDistrictData([]);
        setFilteredCityData([]);
        setFilteredTehsilData([]);
    };
    const handleStateChange = (state) => {
        form.setFieldValue('districtCode', undefined);
        form.setFieldValue('cityCode', undefined);
        form.setFieldValue('tehsilCode', undefined);

        setFilteredDistrictData(districtData?.filter((i) => i?.parentKey === state));

        setFilteredCityData([]);
        setFilteredTehsilData([]);
    };

    const handleDistrictChange = (district) => {
        form.setFieldValue('cityCode', undefined);
        form.setFieldValue('tehsilCode', undefined);
        setFilteredTehsilData(tehsilData?.filter((i) => i?.parentKey === district));
        setFilteredCityData(cityData?.filter((i) => i?.parentKey === district));
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
        <Form autoComplete="off" id="configForm" layout="vertical" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish}>
            <Row gutter={20} className={styles.drawerBody}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    {viewMode ? (
                        <ViewDetail {...viewProps} />
                    ) : (
                        <>
                            <Row gutter={16}>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item initialValue={formData?.countryCode || defaultCountry} label={translateContent('pincode.label.country')} name="countryCode" placeholder={preparePlaceholderSelect(translateContent('pincode.placeholder.country'))} rules={[validateRequiredInputField(translateContent('pincode.validation.country'))]}>
                                        <Select {...selectProps} loading={!isDataCountryLoaded} placeholder={translateContent('global.placeholder.select')} onChange={handleCountryChange}>
                                            {countryData?.map((item) => (
                                                <Option key={'co' + item?.countryCode} value={item?.countryCode}>
                                                    {item?.countryName}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item initialValue={formData?.stateCode} label={translateContent('pincode.label.state')} name="stateCode" rules={[validateRequiredSelectField(translateContent('pincode.validation.state'))]}>
                                        <Select placeholder={preparePlaceholderSelect(translateContent('pincode.placeholder.state'))} {...selectProps} onChange={handleStateChange}>
                                            {filteredStateData?.map((item) => (
                                                <Option key={'sc' + item?.key} value={item?.key}>
                                                    {item?.value}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label={translateContent('pincode.label.district')} initialValue={formData?.districtCode} name="districtCode" rules={[validateRequiredSelectField(translateContent('pincode.validation.district'))]}>
                                        <Select placeholder={preparePlaceholderSelect(translateContent('pincode.placeholder.district'))} {...selectProps} onChange={handleDistrictChange}>
                                            {filteredDistrictData?.map((item) => (
                                                <Option key={'ds' + item?.key} value={item?.key}>
                                                    {item?.value}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label={translateContent('pincode.label.city')} initialValue={formData?.cityCode} name="cityCode" rules={[validateRequiredSelectField(translateContent('pincode.validation.city'))]}>
                                        <Select placeholder={preparePlaceholderSelect(translateContent('pincode.placeholder.city'))} {...selectProps}>
                                            {filteredCityData?.map((item) => (
                                                <Option key={'cc' + item?.key} value={item?.key}>
                                                    {item?.value}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label={translateContent('pincode.label.tehsil')} initialValue={formData?.tehsilCode} name="tehsilCode" rules={[validateRequiredSelectField(translateContent('pincode.validation.tehsil'))]}>
                                        <Select {...selectProps} placeholder={preparePlaceholderSelect(translateContent('pincode.placeholder.tehsil'))}>
                                            {filteredTehsilData?.map((item) => (
                                                <Option key={'tc' + item?.key} value={item?.key}>
                                                    {item?.value}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label={translateContent('pincode.label.pinCategory')}initialValue={formData?.pinCategory} name="pinCategory" rules={[validateRequiredSelectField(translateContent('pincode.validation.pinCategory'))]}>
                                        <Select {...selectProps} placeholder={preparePlaceholderSelect(translateContent('pincode.placeholder.pinCategory'))}>
                                            {typeData?.map((item) => (
                                                <Option key={'pnc' + item?.key} value={item?.key}>
                                                    {item?.value}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item initialValue={formData?.pinCode} label={translateContent('pincode.label.pinCode')} name="pinCode" rules={[validateRequiredInputField('PIN code'), validatePincodeField(translateContent('pincode.validation.pinCode'))]}>
                                        <Input placeholder={preparePlaceholderText(translateContent('pincode.placeholder.pinCode'))} maxLength={6} />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item initialValue={formData?.localityName || ''} label={translateContent('pincode.label.locality')} name="localityName">
                                        <Input placeholder={preparePlaceholderText(translateContent('pincode.placeholder.locality'))} maxLength={50} />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={20}>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item initialValue={editMode ? formData?.withIn50KmFromGpo : true} valuePropName="checked" label={translateContent('pincode.label.withIn50KmFromGpo')} name="withIn50KmFromGpo">
                                        <Switch checkedChildren="Yes" unCheckedChildren="No" onChange={(checked) => (checked ? 1 : 0)} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item initialValue={editMode ? formData.status : true} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="status" label={translateContent('pincode.label.status')}>
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
