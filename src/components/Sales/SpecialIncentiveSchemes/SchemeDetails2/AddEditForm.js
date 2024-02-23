/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React, { useState, useEffect } from 'react';

import { Row, Col, Checkbox, Button, Form, Input, Select, AutoComplete, DatePicker, Switch } from 'antd';
import { preparePlaceholderText, preparePlaceholderSelect, prepareDatePickerText } from 'utils/preparePlaceholder';
import { validateRequiredInputField, validateRequiredSelectField, validatePincodeField, duplicateValidator } from 'utils/validation';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';
import { customSelectBox } from 'utils/customSelectBox';
import { dateFormat } from 'utils/formatDateTime';

const { Search } = Input;

const AddEditForm = (props) => {
    const { addressForm, setAddressData, addressData, editingData, setEditingData, setShowAddEditForm, setIsEditing, userId, formData, formActionType } = props;
    const { forceUpdate,editMode, handleFormValueChange, setIsAdding, showGlobalNotification, addData, resetPincodeData } = props;
    const disabledProps = { disabled: formActionType?.editMode && formData?.partyCategory === 'Principal' ? true : false };

    const [options, setOptions] = useState(false);
    const [pinSearchData, setPinSearchData] = useState({});

    const handleCancelFormEdit = () => {
        setIsEditing(false);
        setIsAdding(false);
        setShowAddEditForm(false);
        setEditingData({});
    };

    const handleSave = () => {
        addressForm
            .validateFields()
            .then((value) => {
                const defaultAdddress = addressData.find((i) => i?.deafultAddressIndicator && i?.addressType !== editingData?.addressType) && value?.deafultAddressIndicator;
                if (defaultAdddress) {
                    return showGlobalNotification({ message: translateContent('global.validation.onlyOneAddressCanbeDefault') });
                }

                if (editingData?.addressType) {
                    setAddressData((prev) => {
                        let formData = [...prev];
                        const index = formData?.findIndex((el) => el?.addressType === editingData?.addressType);
                        formData.splice(index, 1, { ...value, ...pinSearchData });

                        return [...formData];
                    });
                } else {
                    setAddressData((prev) => {
                        let formData = prev?.length ? [...prev] : [];
                        if (value?.defaultaddress && formData?.length >= 1) {
                            return [...formData, { ...value, ...pinSearchData }];
                        } else {
                            return prev?.length ? [...prev, { ...value, ...pinSearchData }] : [{ ...value, ...pinSearchData }];
                        }
                    });
                }
                setPinSearchData({});
                setShowAddEditForm(false);
                setIsEditing(false);
                setIsAdding(false);
                setEditingData({});
                addressForm.setFieldsValue();
                resetPincodeData();
            })
            .catch((err) => {
                console.error('err', err);
            });
    };

    return (
        <>
            <Form form={addressForm} id="myAdd" onFinish={handleSave} onFieldsChange={handleFormValueChange} autoComplete="off" layout="vertical">
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="amountVehicle" label={'Amount/Vehicle'}>
                            <Input placeholder={preparePlaceholderText('Amount Vehicle')} {...disabledProps} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label={'Calculation From Date'} name="calculationFromDate" className={styles?.datePicker}>
                            <DatePicker format={dateFormat} placeholder={prepareDatePickerText(dateFormat)} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label={'Calculation To Date'} name="calculationToDate" className={styles?.datePicker}>
                            <DatePicker format={dateFormat} placeholder={prepareDatePickerText(dateFormat)} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="chassis" label={'Chassis '}>
                            <Input placeholder={preparePlaceholderText('Chassis ')} {...disabledProps} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label={'Claim From Date'} name="claimFromDate" className={styles?.datePicker}>
                            <DatePicker format={dateFormat} placeholder={prepareDatePickerText(dateFormat)} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label={'Claim To Date'} name="claimToDate" className={styles?.datePicker}>
                            <DatePicker format={dateFormat} placeholder={prepareDatePickerText(dateFormat)} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="dealerCode" label={'Dealer Code'}>
                            <Input placeholder={preparePlaceholderText('Dealer Code')} {...disabledProps} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label={'Exclude Models'} name="excludeModels" className={styles?.datePicker}>
                            {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('Exclude Models' || translateContent('customerMaster.placeholder.corporateName')) })}
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label={'Group List'} name="groupList">
                            {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('Group List' || translateContent('customerMaster.placeholder.corporateName')) })}
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label={'Incentive Type'} name="incentiveType">
                            {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('Incentive Type' || translateContent('customerMaster.placeholder.corporateName')) })}
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item initialValue={editMode ? formData.status : true} labelAlign="left" valuePropName="checked" name="mdepApplicablity" label={'MDEP Applicablity'}>
                            <Switch checkedChildren={translateContent('global.label.yes')} unCheckedChildren={translateContent('global.label.no')} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label={'Model Group'} name="modelgroup">
                            {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('Model Group' || translateContent('customerMaster.placeholder.corporateName')) })}
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item initialValue={editMode ? formData.status : true} labelAlign="left" valuePropName="checked" name="payoutIndicator" label={'Payout Indicator'}>
                            <Switch checkedChildren={translateContent('global.label.yes')} unCheckedChildren={translateContent('global.label.no')} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="payoutSlabFrom" label={'Payout Slab from'}>
                            <Input placeholder={preparePlaceholderText('Payout Slab from')} {...disabledProps} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="payoutSlabTo" label={'Slab To'}>
                            <Input placeholder={preparePlaceholderText('Slab To')} {...disabledProps} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="remarks" label={'Remarks'}>
                            <Input placeholder={preparePlaceholderText('Remarks')} {...disabledProps} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="slabFrom" label={'Slab from'}>
                            <Input placeholder={preparePlaceholderText('Slab from')} {...disabledProps} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="slabTo" label={'Slab To'}>
                            <Input placeholder={preparePlaceholderText('Slab To')} {...disabledProps} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="slabType" label={'Slab Type'}>
                            {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('Slab Type' || translateContent('customerMaster.placeholder.corporateName')) })}
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item initialValue={editMode ? formData.status : true} labelAlign="left" valuePropName="checked" name="status" label={translateContent('global.label.status')}>
                            <Switch checkedChildren={translateContent('global.label.active')} unCheckedChildren={translateContent('global.label.inActive')} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label={'Scheme TGT/Non TGT/Must do TGT'} name="schemeTGT/NonTGT/MustdoTGT">
                            {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('Scheme TGT/Non TGT/Must do TGT' || translateContent('customerMaster.placeholder.corporateName')) })}
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="totalAmount" label={'Total Amount'}>
                            <Input placeholder={preparePlaceholderText('Total Amount')} {...disabledProps} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label={'Valid From Date'} name="validFromDate" className={styles?.datePicker}>
                            <DatePicker format={dateFormat} placeholder={prepareDatePickerText(dateFormat)} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label={'Valid To Date'} name="validToDate" className={styles?.datePicker}>
                            <DatePicker format={dateFormat} placeholder={prepareDatePickerText(dateFormat)} />
                        </Form.Item>
                    </Col>
                </Row>
                {!formActionType?.viewMode && (
                    <Row gutter={20} className={styles.marB20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.buttonsGroupLeft}>
                            <Button onClick={handleSave} type="primary">
                                {translateContent('global.buttons.save')}
                            </Button>
                            <Button onClick={handleCancelFormEdit} danger>
                                {translateContent('global.buttons.cancel')}
                            </Button>
                        </Col>
                    </Row>
                )}
            </Form>
        </>
    );
};

export default AddEditForm;
