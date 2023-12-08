/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Col, Input, Form, Row, Select, Switch, DatePicker, Card, Collapse, Divider, Button } from 'antd';

import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { prepareDatePickerText, preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';

import { ViewDetail } from './ViewDetail';
import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';
import { dateFormat } from 'utils/formatDateTime';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';
// import { SchemeAmountMaster } from './SchemeAmountCard';
import DocumentTypes from './documentTypes/DocumentTypes';
import { accordianExpandIcon } from 'utils/accordianExpandIcon';
import { customSelectBox } from 'utils/customSelectBox';

const { Option } = Select;
const { Panel } = Collapse;

const schemeTypeData = [
    { key: '1', value: 'Additional CSD' },
    { key: '2', value: 'Additional CPC' },
];

const AddEditFormMain = (props) => {
    const { form, formData, onCloseAction, formActionType: { editMode, viewMode, addMode } = undefined, onFinish, isLoading } = props;

    const { isDataCountryLoaded, countryData, defaultCountry } = props;
    const { buttonData, setButtonData, handleButtonClick } = props;

    const { stateData, districtData } = props;
    const [finalFormdata, setFinalFormdata] = useState([]);
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);
    const [canFormSave, setCanFormSave] = useState(false);
    const [openAccordian, setOpenAccordian] = useState(1);

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

    const handleCollapse = (key) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };

    return (
        <>
            <div className={`${styles.drawerBodyNew} ${styles.drawerBodyApplicationMaster}`}>
                <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish}>
                    {viewMode ? (
                        <ViewDetail {...viewProps} />
                    ) : (
                        <Row gutter={16}>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item initialValue={formData?.countryCode} label={translateContent('Scheme Type' || 'city.label.countryCode')} name="schemeType" placeholder={preparePlaceholderSelect(translateContent('city.placeholder.country'))} rules={[validateRequiredInputField(translateContent('city.validation.country'))]}>
                                    {customSelectBox({ data: schemeTypeData, placeholder: preparePlaceholderSelect('Scheme Type' || translateContent('amcRegistration.label.priceType')), disabled: isBtnDisabled })}

                                    {/* <Input placeholder={preparePlaceholderText('Scheme Type' || translateContent('city.placeholder.cityCode'))} maxLength={6} disabled={editMode ? true : false} /> */}
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item label={'Scheme No' || translateContent('city.label.stateName')} initialValue={formData?.schemeNo} name="schemeNo" rules={[validateRequiredSelectField('Scheme No' || translateContent('city.validation.stateName'))]}>
                                    <Input placeholder={preparePlaceholderText('Scheme No' || translateContent('city.placeholder.cityCode'))} maxLength={6} disabled={editMode ? true : false} />
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
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Form.Item initialValue={formData?.active} label="Status" name="isActive">
                                    <Switch value={formData?.active} checkedChildren="Active" unCheckedChildren="Inactive" defaultChecked={true} />
                                </Form.Item>
                            </Col>
                        </Row>
                    )}

                    {/* <SchemeAmountMaster />  */}

                    <Row gutter={20} className={styles.formFooterNew}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.buttonsGroupLeft}>
                            <Button danger onClick={onCloseAction}>
                                {translateContent('global.buttons.cancel')}
                            </Button>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.buttonsGroupRight}>
                            <Button disabled={isLoading || !canFormSave} loading={isLoading} htmlType="submit" form="myForm" key="saveBtm" type="primary">
                                {translateContent('global.buttons.save')}
                            </Button>
                        </Col>
                    </Row>
                </Form>
                <Collapse onChange={() => handleCollapse(1)} expandIcon={accordianExpandIcon} collapsible="icon" activeKey={openAccordian}>
                    <Panel
                        header={
                            <>
                                <span>{'Segment Amount'}</span>
                                <span style={{ color: '#ff3e5b' }}>*</span>
                            </>
                        }
                        key="1"
                    >
                        <Divider />
                        <DocumentTypes setFinalFormdata={setFinalFormdata} finalFormdata={finalFormdata} setIsBtnDisabled={setIsBtnDisabled} isBtnDisabled={isBtnDisabled} setCanFormSave={setCanFormSave} />
                    </Panel>
                </Collapse>
            </div>
            {/* <DrawerFormButton {...buttonProps} /> */}
        </>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, { width: 700});
