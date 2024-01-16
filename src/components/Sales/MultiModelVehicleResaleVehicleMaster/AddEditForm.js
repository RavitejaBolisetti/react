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
import { customSelectBox } from 'utils/customSelectBox';

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
                                    <Form.Item label={'DMS Make' || translateContent('city.label.cityName')} initialValue={formData?.name} rules={[validateRequiredInputField('DMS Make' || translateContent('city.validation.cityName'))]} name="dmsMake">
                                        {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('DMS Make' || translateContent('customerMaster.placeholder.corporateName')) })}
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label={'DMS Model' || translateContent('city.label.cityName')} initialValue={formData?.name} rules={[validateRequiredInputField('DMS Model' || translateContent('city.validation.cityName'))]} name="DMS Model">
                                        {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('DMS Model' || translateContent('customerMaster.placeholder.corporateName')) })}
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label={'DMS Varient' || translateContent('city.label.cityName')} initialValue={formData?.name} rules={[validateRequiredInputField('DMS Varient' || translateContent('city.validation.cityName'))]} name="DMS Varient">
                                        {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('DMS Varient' || translateContent('customerMaster.placeholder.corporateName')) })}
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label={'OMS Make' || translateContent('city.label.cityName')} initialValue={formData?.name} rules={[validateRequiredInputField('OMS Make' || translateContent('city.validation.cityName'))]} name="OmsMake">
                                        {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('OMS Make' || translateContent('customerMaster.placeholder.corporateName')) })}
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label={'OMS Model' || translateContent('city.label.cityName')} initialValue={formData?.name} rules={[validateRequiredInputField('OMS Model' || translateContent('city.validation.cityName'))]} name="OMS Model">
                                        {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('OMS Model' || translateContent('customerMaster.placeholder.corporateName')) })}
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label={'OMS Varient' || translateContent('city.label.cityName')} initialValue={formData?.name} rules={[validateRequiredInputField('OMS Varient' || translateContent('city.validation.cityName'))]} name="OMS Varient">
                                        {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('OMS Varient' || translateContent('customerMaster.placeholder.corporateName')) })}
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label={'MFC Make' || translateContent('city.label.cityName')} initialValue={formData?.name} rules={[validateRequiredInputField('MFC Make' || translateContent('city.validation.cityName'))]} name="MFCMake">
                                        {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('MFC Make' || translateContent('customerMaster.placeholder.corporateName')) })}
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label={'MFC Model' || translateContent('city.label.cityName')} initialValue={formData?.name} rules={[validateRequiredInputField('MFC Model' || translateContent('city.validation.cityName'))]} name="MFC Model">
                                        {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('MFC Model' || translateContent('customerMaster.placeholder.corporateName')) })}
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label={'MFC Varient' || translateContent('city.label.cityName')} initialValue={formData?.name} rules={[validateRequiredInputField('MFC Varient' || translateContent('city.validation.cityName'))]} name="MFC Varient">
                                        {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('MFC Varient' || translateContent('customerMaster.placeholder.corporateName')) })}
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
