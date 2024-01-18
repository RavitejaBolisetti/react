/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Col, Input, Form, Row, Select, Switch, DatePicker, Card, Checkbox, Collapse, Divider, Typography, Button } from 'antd';

import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';

import { ViewDetail } from './ViewDetail';
import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';
import { accordianExpandIcon } from 'utils/accordianExpandIcon';
import { customSelectBox } from 'utils/customSelectBox';
import { convertDateToCalender, dateFormat, formattedCalendarDate } from 'utils/formatDateTime';
import moment from 'moment';
import DiscountDetailsMaster from './DiscountDetails';

const { Panel } = Collapse;

const AddEditFormMain = (props) => {
    const { form, formData, onCloseAction, formActionType: { editMode, viewMode, addMode } = undefined, onFinish } = props;
    const { buttonData, setButtonData, handleButtonClick } = props;

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
        <>
            <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish}>
                <Row gutter={20} className={styles.drawerBody}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        {viewMode ? (
                            <ViewDetail {...viewProps} />
                        ) : (
                            <>
                                <Row gutter={16}>
                                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                        <Form.Item label={'Channel' || translateContent('designationMaster.label.mileSkill')} name="channel">
                                            {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('Channel' || translateContent('designationMaster.placeholder.mileSkill')) })}
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                        <Form.Item label={translateContent('Campaign No' || 'city.label.countryCode')} name="campaignNo" placeholder={preparePlaceholderSelect('Campaign No' || translateContent('city.placeholder.country'))} rules={[validateRequiredInputField('Campaign No' || translateContent('city.validation.country'))]}>
                                            <Input placeholder={preparePlaceholderText('Campaign No' || translateContent('city.placeholder.cityCode'))} disabled={editMode ? true : false} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                        <Form.Item label={translateContent('Campaign Name' || 'city.label.countryCode')} name="campaignName" placeholder={preparePlaceholderSelect('Campaign Name' || translateContent('city.placeholder.country'))} rules={[validateRequiredInputField('Campaign Name' || translateContent('city.validation.country'))]}>
                                            <Input placeholder={preparePlaceholderText('Campaign Name' || translateContent('city.placeholder.cityCode'))} disabled={editMode ? true : false} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                        <Form.Item label={'Start Date' || translateContent('adminHierarchy.label.effectiveFrom')} name="startDate" rules={[validateRequiredSelectField(translateContent('adminHierarchy.validation.dateRequired'))]} initialValue={convertDateToCalender(formData?.effectiveFrom)}>
                                            <DatePicker onChange={() => form.setFieldsValue({ effectiveTo: undefined })} disabledDate={(current) => current.isBefore(moment().subtract(1, 'day'))} format={dateFormat} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                        <Form.Item label={'End Date' || translateContent('adminHierarchy.label.effectiveTo')} name="endDate" rules={[validateRequiredSelectField('End Date' || translateContent('adminHierarchy.validation.dateRequired'))]} initialValue={formattedCalendarDate(formData?.effectiveTo)}>
                                            <DatePicker disabledDate={(current) => current < form?.getFieldValue('end')} format={dateFormat} />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.active} label="Status" name="isActive">
                                            <Switch value={formData?.active} checkedChildren="Active" unCheckedChildren="Inactive" defaultChecked={true} />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Collapse onChange={() => handleCollapse(1)} expandIcon={accordianExpandIcon} activeKey={openAccordianKey} collapsible="icon">
                                    <Panel key="1" header={'Disscount Details'}>
                                        <Divider />
                                        <DiscountDetailsMaster />
                                    </Panel>
                                </Collapse>
                            </>
                        )}
                    </Col>
                </Row>

                <DrawerFormButton {...buttonProps} />
            </Form>
            {/* <BrandSpiderNameSearch {...modalProps} /> */}
        </>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, { width: 700 });
