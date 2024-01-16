/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Col, Input, Form, Row, Select, Switch, DatePicker, Collapse, Typography, Divider } from 'antd';

import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { prepareDatePickerText, preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';

import { ViewDetail } from './ViewDetail';
import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';
import { dateFormat } from 'utils/formatDateTime';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';
import { customSelectBox } from 'utils/customSelectBox';
import { accordianExpandIcon } from 'utils/accordianExpandIcon';
import VehicleDetailMaster from './VehicleDetails';

const { Panel } = Collapse;

const AddEditFormMain = (props) => {
    const { form, formData, onCloseAction, formActionType: { editMode, viewMode, addMode } = undefined, onFinish } = props;

    const { isDataCountryLoaded, countryData, defaultCountry } = props;
    const { buttonData, setButtonData, handleButtonClick } = props;
    const { stateData, districtData } = props;

    const isReadOnly = false;
    const disabledProps = { disaled: isReadOnly };
    const [openAccordianKey, setOpenAccordianKey] = useState(1);

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleFormFieldChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };
    const handleCollapse = (key) => {
        setOpenAccordianKey((prev) => (prev === key ? '' : key));
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
                                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                    <Form.Item label={'Study' || translateContent('city.label.cityName')} initialValue={formData?.name} rules={[validateRequiredInputField('Study' || translateContent('city.validation.cityName'))]} name="dmsMake">
                                        {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('Study' || translateContent('customerMaster.placeholder.corporateName')) })}
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item name="docId" label={'Doc Id'} initialValue={formData?.insCompanyName}>
                                        <Input placeholder={preparePlaceholderText('Doc Id')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                    <Form.Item label={'Doc Date' || translateContent('configurableParameter.label.fromDate')} name="docDate" rules={[validateRequiredInputField('Doc Date' || translateContent('configurableParameter.validation.fromDateValidaiton'))]}>
                                        <DatePicker format={dateFormat} placeholder={'Doc Date' || prepareDatePickerText(dateFormat)} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item name="campaignNo" label={'Campaign No'} initialValue={formData?.insCompanyName}>
                                        <Input placeholder={preparePlaceholderText('Campaign No')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                    <Form.Item label={'Campaign from Date' || translateContent('configurableParameter.label.fromDate')} name="docDate" rules={[validateRequiredInputField('Campaign from Date' || translateContent('configurableParameter.validation.fromDateValidaiton'))]}>
                                        <DatePicker format={dateFormat} placeholder={'Campaign from Date' || prepareDatePickerText(dateFormat)} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                    <Form.Item label={'Campaign to Date' || translateContent('configurableParameter.label.fromDate')} name="docDate" rules={[validateRequiredInputField('Campaign to Date' || translateContent('configurableParameter.validation.fromDateValidaiton'))]}>
                                        <DatePicker format={dateFormat} placeholder={'Campaign to Date' || prepareDatePickerText(dateFormat)} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                    <Form.Item label={'Campaign Date' || translateContent('configurableParameter.label.fromDate')} name="capmaignDate" rules={[validateRequiredInputField('Campaign Date' || translateContent('configurableParameter.validation.fromDateValidaiton'))]}>
                                        <DatePicker format={dateFormat} placeholder={'Campaign Date' || prepareDatePickerText(dateFormat)} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item name="owner" label={'Owner'} initialValue={formData?.insCompanyName}>
                                        <Input placeholder={preparePlaceholderText('Owner')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item name="MFG Month" label={'MFG Month'} initialValue={formData?.insCompanyName}>
                                        <Input placeholder={preparePlaceholderText('MFG Month')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item name="Color" label={'Color'} initialValue={formData?.insCompanyName}>
                                        <Input placeholder={preparePlaceholderText('Color')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                    <Form.Item label={'Campaign Closing Date' || translateContent('configurableParameter.label.fromDate')} name="capmaignDate" rules={[validateRequiredInputField('Campaign Closing Date' || translateContent('configurableParameter.validation.fromDateValidaiton'))]}>
                                        <DatePicker format={dateFormat} placeholder={'Campaign Closing Date' || prepareDatePickerText(dateFormat)} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                {/* <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.active} label="Status" name="isActive">
                                        <Switch value={formData?.active} checkedChildren="Active" unCheckedChildren="Inactive" defaultChecked={true} />
                                    </Form.Item>
                                </Col> */}
                            </Row>
                            <Collapse onChange={() => handleCollapse(1)} expandIcon={accordianExpandIcon} activeKey={openAccordianKey} collapsible="icon">
                                <Panel key="1" header={'Capturing Price details'}>
                                    <Divider />
                                    <VehicleDetailMaster />
                                </Panel>
                            </Collapse>
                        </>
                    )}
                </Col>
            </Row>

            <DrawerFormButton {...buttonProps} />
        </Form>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, { width: 700 });
