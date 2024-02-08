/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Col, Input, Form, Row, Select, Switch, DatePicker } from 'antd';

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

    const { buttonData, setButtonData, handleButtonClick } = props;

    const isReadOnly = false;
    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleFormFieldChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
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
                                    <Form.Item label={'Financial Year' || translateContent('city.label.cityName')} rules={[validateRequiredInputField(translateContent('Financial Year' || 'city.validation.cityName'))]} name="financialYear">
                                        <Select optionFilterProp="children" options={[]} placeholder={preparePlaceholderSelect('Financial Year')} fieldNames={{ label: 'prodctShrtName', value: 'prodctCode' }} allowClear showSearch filterOption={(input, option) => (option?.prodctShrtName ?? '').toLowerCase().includes(input.toLowerCase())} />
                                    </Form.Item>
                                </Col>
                                {/* <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item initialValue={formData?.active} label="Status" name="isActive">
                                        <Switch value={formData?.active} checkedChildren="Active" unCheckedChildren="Inactive" defaultChecked={true} />
                                    </Form.Item>
                                </Col> */}
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label={translateContent('AO Code' || 'city.label.countryCode')} name="aoCode" placeholder={preparePlaceholderSelect(translateContent('city.placeholder.country'))} rules={[validateRequiredInputField(translateContent('city.validation.country'))]}>
                                        <Input placeholder={preparePlaceholderText('AO Code' || translateContent('city.placeholder.cityCode'))} disabled={editMode ? true : false} />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label={'Scheme Id' || translateContent('city.label.stateName')} name="schemeId" rules={[validateRequiredSelectField('Scheme Id' || translateContent('city.validation.stateName'))]}>
                                        <Input placeholder={preparePlaceholderText('Scheme Id' || translateContent('city.placeholder.cityCode'))} disabled={editMode ? true : false} />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label={'Scheme Name' || translateContent('city.label.cityName')} rules={[validateRequiredInputField('Scheme Name' || translateContent('city.validation.cityName'))]} name="schemeName">
                                        <Select optionFilterProp="children" options={[]} placeholder={preparePlaceholderSelect('Scheme Name')} fieldNames={{ label: 'prodctShrtName', value: 'prodctCode' }} allowClear showSearch filterOption={(input, option) => (option?.prodctShrtName ?? '').toLowerCase().includes(input.toLowerCase())} />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label={'Dealer Code' || translateContent('city.label.cityName')} initialValue={formData?.name} rules={[validateRequiredInputField(translateContent('Dealer Code' || 'city.validation.cityName'))]} name="name">
                                        <Select optionFilterProp="children" options={[]} placeholder={preparePlaceholderSelect('Dealer Code')} fieldNames={{ label: 'prodctShrtName', value: 'prodctCode' }} allowClear showSearch filterOption={(input, option) => (option?.prodctShrtName ?? '').toLowerCase().includes(input.toLowerCase())} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label={'Sale Modal Group' || translateContent('city.label.stateName')} initialValue={formData?.stateCode} name="stateCode" rules={[validateRequiredSelectField('Sale Modal Group' || translateContent('city.validation.stateName'))]}>
                                        <Input placeholder={preparePlaceholderText('Sale Modal Group' || translateContent('city.placeholder.cityCode'))} disabled={editMode ? true : false} />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label={'Modal Group Description' || translateContent('city.label.cityName')} initialValue={formData?.name} rules={[validateRequiredInputField(translateContent('Modal Group Description' || 'city.validation.cityName'))]} name="name">
                                        <Select optionFilterProp="children" options={[]} placeholder={preparePlaceholderSelect('Modal Group Description')} fieldNames={{ label: 'prodctShrtName', value: 'prodctCode' }} allowClear showSearch filterOption={(input, option) => (option?.prodctShrtName ?? '').toLowerCase().includes(input.toLowerCase())} />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label={translateContent('configurableParameter.label.fromDate')} name="fromDate" rules={[validateRequiredInputField(translateContent('configurableParameter.validation.fromDateValidaiton'))]}>
                                        <DatePicker format={dateFormat} placeholder={prepareDatePickerText(dateFormat)} disabled={isReadOnly} />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label={translateContent('configurableParameter.label.toDate')} name="toDate" rules={[validateRequiredInputField(translateContent('configurableParameter.validation.toDateValidaiton'))]}>
                                        <DatePicker format={dateFormat} placeholder={prepareDatePickerText(dateFormat)} disabled={isReadOnly} />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label={'Incentive Amount' || translateContent('city.label.stateName')} initialValue={formData?.stateCode} name="stateCode" rules={[validateRequiredSelectField('Incentive Amount' || translateContent('city.validation.stateName'))]}>
                                        <Input placeholder={preparePlaceholderText('Incentive Amount' || translateContent('city.placeholder.cityCode'))} disabled={editMode ? true : false} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label={'Proposal ID' || translateContent('city.label.stateName')} initialValue={formData?.stateCode} name="stateCode" rules={[validateRequiredSelectField('Proposal ID' || translateContent('city.validation.stateName'))]}>
                                        <Input placeholder={preparePlaceholderText('Proposal ID' || translateContent('city.placeholder.cityCode'))} disabled={editMode ? true : false} />
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
