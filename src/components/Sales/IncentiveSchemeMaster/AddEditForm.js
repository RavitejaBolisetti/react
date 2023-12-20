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
                                    <Form.Item label={'Scheme Type' || translateContent('city.label.cityName')} initialValue={formData?.SchemeType} rules={[validateRequiredInputField(translateContent('Scheme Type' || 'city.validation.cityName'))]} name="Scheme Type">
                                        <Select optionFilterProp="children" options={[]} placeholder={preparePlaceholderSelect('Scheme Type')} fieldNames={{ label: 'prodctShrtName', value: 'prodctCode' }} allowClear showSearch filterOption={(input, option) => (option?.prodctShrtName ?? '').toLowerCase().includes(input.toLowerCase())} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item initialValue={formData?.active} label="Status" name="isActive">
                                        <Switch value={formData?.active} checkedChildren="Active" unCheckedChildren="Inactive" defaultChecked={true} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item initialValue={formData?.countryCode} label={translateContent('Scheme Code' || 'city.label.countryCode')} name="countryCode" placeholder={preparePlaceholderSelect(translateContent('city.placeholder.country'))} rules={[validateRequiredInputField(translateContent('city.validation.country'))]}>
                                        <Input placeholder={preparePlaceholderText('Scheme Code' || translateContent('city.placeholder.cityCode'))} maxLength={6} disabled={editMode ? true : false} />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label={'Scheme Name' || translateContent('city.label.stateName')} initialValue={formData?.stateCode} name="stateCode" rules={[validateRequiredSelectField('Scheme Name' || translateContent('city.validation.stateName'))]}>
                                        <Input placeholder={preparePlaceholderText('Corporate Name' || translateContent('city.placeholder.cityCode'))} maxLength={6} disabled={editMode ? true : false} />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label={'Payment Mode' || translateContent('city.label.cityName')} initialValue={formData?.name} rules={[validateRequiredInputField('Payment Mode' || translateContent('city.validation.cityName'))]} name="name">
                                        <Select optionFilterProp="children" options={[]} placeholder={preparePlaceholderSelect('Payment Mode')} fieldNames={{ label: 'prodctShrtName', value: 'prodctCode' }} allowClear showSearch filterOption={(input, option) => (option?.prodctShrtName ?? '').toLowerCase().includes(input.toLowerCase())} />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label={'Tax Type' || translateContent('city.label.cityName')} initialValue={formData?.name} rules={[validateRequiredInputField(translateContent('Tax Type' || 'city.validation.cityName'))]} name="name">
                                        <Select optionFilterProp="children" options={[]} placeholder={preparePlaceholderSelect('Tax Type')} fieldNames={{ label: 'prodctShrtName', value: 'prodctCode' }} allowClear showSearch filterOption={(input, option) => (option?.prodctShrtName ?? '').toLowerCase().includes(input.toLowerCase())} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label={'Tax %' || translateContent('city.label.stateName')} initialValue={formData?.stateCode} name="stateCode" rules={[validateRequiredSelectField('Tax %' || translateContent('city.validation.stateName'))]}>
                                        <Input placeholder={preparePlaceholderText('Tax %' || translateContent('city.placeholder.cityCode'))} maxLength={6} disabled={editMode ? true : false} />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label={'Proposed By' || translateContent('city.label.cityName')} initialValue={formData?.name} rules={[validateRequiredInputField(translateContent('Proposed By' || 'city.validation.cityName'))]} name="name">
                                        <Select optionFilterProp="children" options={[]} placeholder={preparePlaceholderSelect('Proposed By')} fieldNames={{ label: 'prodctShrtName', value: 'prodctCode' }} allowClear showSearch filterOption={(input, option) => (option?.prodctShrtName ?? '').toLowerCase().includes(input.toLowerCase())} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label={'Budget' || translateContent('city.label.cityName')} initialValue={formData?.name} rules={[validateRequiredInputField(translateContent('Budget' || 'city.validation.cityName'))]} name="name">
                                        <Select optionFilterProp="children" options={[]} placeholder={preparePlaceholderSelect('Budget')} fieldNames={{ label: 'prodctShrtName', value: 'prodctCode' }} allowClear showSearch filterOption={(input, option) => (option?.prodctShrtName ?? '').toLowerCase().includes(input.toLowerCase())} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label={'Given To' || translateContent('city.label.cityName')} initialValue={formData?.name} rules={[validateRequiredInputField(translateContent('Given To' || 'city.validation.cityName'))]} name="name">
                                        <Select optionFilterProp="children" options={[]} placeholder={preparePlaceholderSelect('Given To')} fieldNames={{ label: 'prodctShrtName', value: 'prodctCode' }} allowClear showSearch filterOption={(input, option) => (option?.prodctShrtName ?? '').toLowerCase().includes(input.toLowerCase())} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label={'Incentive on' || translateContent('city.label.cityName')} initialValue={formData?.name} rules={[validateRequiredInputField(translateContent('Incentive on' || 'city.validation.cityName'))]} name="name">
                                        <Select optionFilterProp="children" options={[]} placeholder={preparePlaceholderSelect('Incentive on')} fieldNames={{ label: 'prodctShrtName', value: 'prodctCode' }} allowClear showSearch filterOption={(input, option) => (option?.prodctShrtName ?? '').toLowerCase().includes(input.toLowerCase())} />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label={'Duration Type' || translateContent('city.label.cityName')} initialValue={formData?.name} rules={[validateRequiredInputField(translateContent('Duration Type' || 'city.validation.cityName'))]} name="name">
                                        <Select optionFilterProp="children" options={[]} placeholder={preparePlaceholderSelect('Duration Type')} fieldNames={{ label: 'prodctShrtName', value: 'prodctCode' }} allowClear showSearch filterOption={(input, option) => (option?.prodctShrtName ?? '').toLowerCase().includes(input.toLowerCase())} />
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
