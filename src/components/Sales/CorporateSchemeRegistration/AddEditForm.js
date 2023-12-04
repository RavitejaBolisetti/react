/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Col, Input, Form, Row, Select, Switch, DatePicker, Card } from 'antd';

import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { prepareDatePickerText, preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';

import { ViewDetail } from './ViewDetail';
import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';
import { dateFormat } from 'utils/formatDateTime';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

const { Option } = Select;

const AddEditFormMain = (props) => {
    const { form, formData, onCloseAction, formActionType: { editMode, viewMode, addMode } = undefined, onFinish } = props;

    const { isDataCountryLoaded, countryData, defaultCountry } = props;
    const { buttonData, setButtonData, handleButtonClick } = props;

    const { stateData, districtData } = props;

    const isReadOnly = false;
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
                            <Card>
                                <Row gutter={16}>
                                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.countryCode} label={'Zone' || translateContent('city.label.countryCode')} name="countryCode" placeholder={preparePlaceholderSelect('Zone' || translateContent('city.placeholder.country'))} rules={[validateRequiredInputField(translateContent('city.validation.country'))]}>
                                            <Input placeholder={preparePlaceholderText('Zone' || translateContent('city.placeholder.cityCode'))} maxLength={6} disabled={editMode ? true : false} />
                                        </Form.Item>
                                        {/* <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item initialValue={customerType} label={translateContent('customerMaster.label.customerType')} name="customerType" data-testid="customerType" rules={[validateRequiredSelectField(translateContent('customerMaster.validation.customerType'))]}>
                                                <Select getPopupContainer={(triggerNode) => triggerNode.parentElement} disabled={true} placeholder={preparePlaceholderSelect(translateContent('customerMaster.placeholder.customerType'))} fieldNames={{ label: 'value', value: 'key' }} options={typeData?.[PARAM_MASTER?.CUST_TYPE?.id]} allowClear></Select>
                                            </Form.Item>
                                        </Col> */}
                                    </Col>

                                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                        <Form.Item label={'Area Office' || translateContent('city.label.stateName')} initialValue={formData?.stateCode} name="stateCode" rules={[validateRequiredSelectField('Area Office' || translateContent('city.validation.stateName'))]}>
                                            <Input placeholder={preparePlaceholderText('Area Office' || translateContent('city.placeholder.cityCode'))} disabled={editMode ? true : false} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                        <Form.Item label={'Dealer Code' || translateContent('city.label.districtName')} initialValue={formData?.districtCode} name="districtCode" rules={[validateRequiredSelectField('Dealer Code' || translateContent('city.validation.districtName'))]}>
                                            <Input placeholder={preparePlaceholderText('Dealer Code' || translateContent('city.placeholder.cityCode'))} maxLength={6} disabled={editMode ? true : false} />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                        <Form.Item label={'Corporate Category' || translateContent('city.label.cityName')} initialValue={formData?.name} rules={[validateRequiredInputField('Corporate Category' || translateContent('city.validation.cityName'))]} name="name">
                                            <Input placeholder={preparePlaceholderText('Corporate Category' || translateContent('city.placeholder.cityName'))} maxLength={50} />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                        <Form.Item label={'Dealer Amount' || translateContent('city.label.cityName')} initialValue={formData?.name} rules={[validateRequiredInputField(translateContent('Dealer Amount' || 'city.validation.cityName'))]} name="name">
                                            <Input placeholder={preparePlaceholderText('Dealer Amount' || translateContent('city.placeholder.cityName'))} maxLength={50} />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                        <Form.Item label={'OEM Amount' || translateContent('city.label.cityName')} initialValue={formData?.name} rules={[validateRequiredInputField(translateContent('OEM Amount' || 'city.validation.cityName'))]} name="name">
                                            <Input placeholder={preparePlaceholderText('OEM Amount' || translateContent('city.placeholder.cityName'))} maxLength={50} />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                        <Form.Item label={'Total Amount' || translateContent('city.label.cityName')} initialValue={formData?.name} rules={[validateRequiredInputField(translateContent('Total Amount' || 'city.validation.cityName'))]} name="name">
                                            <Input placeholder={preparePlaceholderText('Total Amount' || translateContent('city.placeholder.cityName'))} maxLength={50} />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                        <Form.Item label={'Valid From' || translateContent('configurableParameter.label.fromDate')} name="fromDate" rules={[validateRequiredInputField('Valid From' || translateContent('configurableParameter.validation.fromDateValidaiton'))]}>
                                            <DatePicker format={dateFormat} placeholder={'Valid From' || prepareDatePickerText(dateFormat)} disabled={isReadOnly} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                        <Form.Item label={'Valid To' || translateContent('configurableParameter.label.fromDate')} name="fromDate" rules={[validateRequiredInputField('Valid To' || translateContent('configurableParameter.validation.fromDateValidaiton'))]}>
                                            <DatePicker format={dateFormat} placeholder={'Valid To' || prepareDatePickerText(dateFormat)} disabled={isReadOnly} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Form.Item initialValue={formData?.active} label="Status" name="isActive">
                                            <Switch value={formData?.active} checkedChildren="Active" unCheckedChildren="Inactive" defaultChecked={true} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Card>
                        </>
                    )}
                </Col>
            </Row>

            <DrawerFormButton {...buttonProps} />
        </Form>
    );
};

export const AddEditForm = AddEditFormMain;
