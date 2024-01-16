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
                                    <Form.Item label={'Color' || translateContent('city.label.cityName')} rules={[validateRequiredInputField('Color' || translateContent('city.validation.cityName'))]} name="color">
                                    <Input placeholder={preparePlaceholderText('Color' || translateContent('city.placeholder.cityCode'))} disabled={editMode ? true : false} />
                                        {/* <Select optionFilterProp="children" options={[]} placeholder={preparePlaceholderSelect('Color')} fieldNames={{ label: 'key', value: 'value' }} allowClear showSearch /> */}
                                    </Form.Item>
                                </Col>

                                {/* 
                                shall use system user 
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label={translateContent('Created By' || 'city.label.countryCode')} name="createdBy" rules={[validateRequiredInputField('Created By' || translateContent('city.validation.country'))]}>
                                        <Input placeholder={preparePlaceholderText('Created By' || translateContent('city.placeholder.cityCode'))} disabled={editMode ? true : false} />
                                    </Form.Item>
                                </Col> */}

                                {/* 
                                shall use system date 
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label={'Created Date' || translateContent('configurableParameter.label.fromDate')} name="createdDate" rules={[validateRequiredInputField('Created Date' || translateContent('configurableParameter.validation.fromDateValidaiton'))]}>
                                        <DatePicker format={dateFormat} placeholder={'Created Date' || prepareDatePickerText(dateFormat)} disabled={isReadOnly} />
                                    </Form.Item>
                                </Col> */}
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
