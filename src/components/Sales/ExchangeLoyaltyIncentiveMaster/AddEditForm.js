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
                            <Row gutter={16}>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label={'Zone' || translateContent('city.label.cityName')} initialValue={formData?.name} rules={[validateRequiredInputField('Zone' || translateContent('city.validation.cityName'))]} name="name">
                                        <Select optionFilterProp="children" options={ []} placeholder={preparePlaceholderSelect('Zone')} fieldNames={{ label: 'key', value: 'value' }} allowClear showSearch  />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label={'Area Office' || translateContent('city.label.cityName')} initialValue={formData?.name} rules={[validateRequiredInputField('Area Office' || translateContent('city.validation.cityName'))]} name="name">
                                        <Select optionFilterProp="children" options={ []} placeholder={preparePlaceholderSelect('Area Office')} fieldNames={{ label: 'prodctShrtName', value: 'prodctCode' }} allowClear showSearch filterOption={(input, option) => (option?.prodctShrtName ?? '').toLowerCase().includes(input.toLowerCase())} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label={'Dealer Code & Name' || translateContent('city.label.cityName')} initialValue={formData?.name} rules={[validateRequiredInputField('Dealer Code & Name' || translateContent('city.validation.cityName'))]} name="name">
                                        <Select optionFilterProp="children" options={ []} placeholder={preparePlaceholderSelect('Dealer Code & Name')} fieldNames={{ label: 'prodctShrtName', value: 'prodctCode' }} allowClear showSearch filterOption={(input, option) => (option?.prodctShrtName ?? '').toLowerCase().includes(input.toLowerCase())} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label={'Scheme Type' || translateContent('city.label.cityName')} initialValue={formData?.name} rules={[validateRequiredInputField('Scheme Type' || translateContent('city.validation.cityName'))]} name="schemeType">
                                        <Select optionFilterProp="children" options={ []} placeholder={preparePlaceholderSelect('Scheme Type')} fieldNames={{ label: 'prodctShrtName', value: 'prodctCode' }} allowClear showSearch filterOption={(input, option) => (option?.prodctShrtName ?? '').toLowerCase().includes(input.toLowerCase())} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label={'Scheme Name' || translateContent('city.label.cityName')} initialValue={formData?.name} rules={[validateRequiredInputField('Scheme Name' || translateContent('city.validation.cityName'))]} name="name">
                                        <Select optionFilterProp="children" options={ []} placeholder={preparePlaceholderSelect('Scheme Name')} fieldNames={{ label: 'prodctShrtName', value: 'prodctCode' }} allowClear showSearch filterOption={(input, option) => (option?.prodctShrtName ?? '').toLowerCase().includes(input.toLowerCase())} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label={'Validity For' || translateContent('city.label.cityName')} initialValue={formData?.name} rules={[validateRequiredInputField('Validity For' || translateContent('city.validation.cityName'))]} name="name">
                                        <Select optionFilterProp="children" options={ []} placeholder={preparePlaceholderSelect('Validity For')} fieldNames={{ label: 'prodctShrtName', value: 'prodctCode' }} allowClear showSearch filterOption={(input, option) => (option?.prodctShrtName ?? '').toLowerCase().includes(input.toLowerCase())} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label={'Model Group' || translateContent('city.label.cityName')} initialValue={formData?.name} rules={[validateRequiredInputField('Model Group' || translateContent('city.validation.cityName'))]} name="name">
                                        <Select optionFilterProp="children" options={ []} placeholder={preparePlaceholderSelect('Model Group')} fieldNames={{ label: 'prodctShrtName', value: 'prodctCode' }} allowClear showSearch filterOption={(input, option) => (option?.prodctShrtName ?? '').toLowerCase().includes(input.toLowerCase())} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label={'Model Varient' || translateContent('city.label.cityName')} initialValue={formData?.name} rules={[validateRequiredInputField('Model Varient' || translateContent('city.validation.cityName'))]} name="name">
                                        <Select optionFilterProp="children" options={ []} placeholder={preparePlaceholderSelect('Model Varient')} fieldNames={{ label: 'prodctShrtName', value: 'prodctCode' }} allowClear showSearch filterOption={(input, option) => (option?.prodctShrtName ?? '').toLowerCase().includes(input.toLowerCase())} />
                                    </Form.Item>
                                </Col>
                                {/* <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label={'Corporate Category' || translateContent('city.label.cityName')} initialValue={formData?.name} rules={[validateRequiredInputField('Corporate Category' || translateContent('city.validation.cityName'))]} name="name">
                                        <Select optionFilterProp="children" options={ []} placeholder={preparePlaceholderSelect('Corporate Category')} fieldNames={{ label: 'prodctShrtName', value: 'prodctCode' }} allowClear showSearch filterOption={(input, option) => (option?.prodctShrtName ?? '').toLowerCase().includes(input.toLowerCase())} />
                                    </Form.Item>
                                </Col> */}
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item initialValue={formData?.countryCode} label={translateContent('Dealer Amt' || 'city.label.countryCode')} name="countryCode" placeholder={preparePlaceholderSelect(translateContent('city.placeholder.country'))} rules={[validateRequiredInputField(translateContent('city.validation.country'))]}>
                                        <Input placeholder={preparePlaceholderText('Dealer Amt' || translateContent('city.placeholder.cityCode'))} maxLength={6} disabled={editMode ? true : false} />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label={'OEM Amt' || translateContent('city.label.stateName')} initialValue={formData?.stateCode} name="stateCode" rules={[validateRequiredSelectField('OEM Amt' || translateContent('city.validation.stateName'))]}>
                                        <Input placeholder={preparePlaceholderText('OEM Amt' || translateContent('city.placeholder.cityCode'))} maxLength={6} disabled={editMode ? true : false} />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label={'Total Sch Amt' || translateContent('city.label.cityName')} initialValue={formData?.name} rules={[validateRequiredInputField('Total Sch Amt' || translateContent('city.validation.cityName'))]} name="name">
                                        {/* <Select optionFilterProp="children" options={ []} placeholder={preparePlaceholderSelect('Total Sch Amt')} fieldNames={{ label: 'prodctShrtName', value: 'prodctCode' }} allowClear showSearch filterOption={(input, option) => (option?.prodctShrtName ?? '').toLowerCase().includes(input.toLowerCase())} /> */}
                                        <Input placeholder={preparePlaceholderText('Total Sch Amt' || translateContent('city.placeholder.cityName'))} maxLength={50} />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label={'Valid From' || translateContent('configurableParameter.label.fromDate')} name="fromDate" rules={[validateRequiredInputField('Valid From' || translateContent('configurableParameter.validation.fromDateValidaiton'))]}>
                                        <DatePicker format={dateFormat} placeholder={'Valid From' || prepareDatePickerText(dateFormat)} disabled={isReadOnly} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label={'Valid To' || translateContent('configurableParameter.label.fromDate')} name="fromDate" rules={[validateRequiredInputField('Valid To' || translateContent('configurableParameter.validation.fromDateValidaiton'))]}>
                                        <DatePicker format={dateFormat} placeholder={'Valid To' || prepareDatePickerText(dateFormat)} disabled={isReadOnly} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item initialValue={formData?.active} label="Status" name="isActive">
                                        <Switch value={formData?.active} checkedChildren="Active" unCheckedChildren="Inactive" defaultChecked={true} />
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
