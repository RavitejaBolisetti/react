/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React, { useState, useEffect } from 'react';

import { Row, Col, Checkbox, Button, Form, Input, Select, AutoComplete, Switch } from 'antd';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { validateRequiredInputField, validateRequiredSelectField, validatePincodeField, duplicateValidator } from 'utils/validation';
import { customSelectBox } from 'utils/customSelectBox';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

const AddEditForm = (props) => {
    const { addressForm, setAddressData, addressData, editingData, setEditingData, setShowAddEditForm, setIsEditing, formData, formActionType } = props;
    const { viewMode } = formActionType;
    const { handleFormValueChange, setIsAdding, showGlobalNotification, resetPincodeData, dealerListdata } = props;
    const { zoneData, areaData, dealerData } = dealerListdata;
    const disabledProps = { disabled: true };

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
                        formData.splice(index, 1, { ...value });

                        return [...formData];
                    });
                } else {
                    setAddressData((prev) => {
                        let formData = prev?.length ? [...prev] : [];
                        if (value?.defaultaddress && formData?.length >= 1) {
                            return [...formData, { ...value }];
                        } else {
                            return prev?.length ? [...prev, { ...value }] : [{ ...value }];
                        }
                    });
                }
                setShowAddEditForm(false);
                setIsEditing(false);
                setIsAdding(false);
                setEditingData({});
                addressForm.setFieldsValue();
                resetPincodeData();
            })
            .catch((err) => console.error('err', err));
    };

    return (
        <>
            <Form form={addressForm} id="myAdd" onFinish={handleSave} onFieldsChange={handleFormValueChange} autoComplete="off" layout="vertical">
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item label={'Product'} name="product">
                            {customSelectBox({ data: areaData, placeholder: preparePlaceholderSelect('Product' || translateContent('customerMaster.placeholder.corporateName')) })}
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item label={'Sigment'} name="sigment">
                            {customSelectBox({ data: areaData, placeholder: preparePlaceholderSelect('Sigment' || translateContent('customerMaster.placeholder.corporateName')) })}
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item label={'Model Group'} name="modelGroup">
                            {customSelectBox({ data: areaData, placeholder: preparePlaceholderSelect('Model Group' || translateContent('customerMaster.placeholder.corporateName')) })}
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item label={'Model'} name="model">
                            {customSelectBox({ data: areaData, placeholder: preparePlaceholderSelect('Model' || translateContent('customerMaster.placeholder.corporateName')) })}
                        </Form.Item>
                    </Col>

                    {/* <Col xs={24} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item initialValue={false} labelAlign="left" wrapperCol={{ span: 24 }} name="incentiveModel" label={'Incentive Model' || translateContent('applicationMaster.label.documentNumRequired')} valuePropName="checked">
                            {customSelectBox({ data: areaData, placeholder: preparePlaceholderSelect('Incentive Model' || translateContent('customerMaster.placeholder.corporateName')) })}
                        </Form.Item>
                    </Col> */}

                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item name="target" label={'Target'}>
                            <Input placeholder={preparePlaceholderText('Target')} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item name="retailTarget" label={'Retail Target'}>
                            <Input placeholder={preparePlaceholderText('Retail Target')} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item name="billingTarget" label={'Billing Target'}>
                            <Input placeholder={preparePlaceholderText('Billing Target')} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item name="achievement" label={'Achievement'}>
                            <Input placeholder={preparePlaceholderText('Achievement')} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item name="incentiveType" label={'Incentive Type'}>
                            <Input placeholder={preparePlaceholderText('Incentive Type')} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item name="IncentiveAmount" label={'Incentive Amount'}>
                            <Input placeholder={preparePlaceholderText('Incentive Amount')} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item name="incentiveAmountBreakup" label={'Incentive Amount Breakup'}>
                            <Input placeholder={preparePlaceholderText('Incentive Amount Breakup')} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item name="sharedBy" label={'Shared By'}>
                            <Input placeholder={preparePlaceholderText('Shared By')} />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item hidden name="id" initialValue="" />

                {!viewMode && (
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
