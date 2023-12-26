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
                        <Form.Item label={'Corporate Type'} name="corporateType" >
                            {customSelectBox({ data: [{key:"Corp 1", value: 'Corp 1'}], placeholder: preparePlaceholderSelect('Corporate Type' || translateContent('customerMaster.placeholder.corporateName')) })}
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item label={'Corporate Customer Code'} name="corporateCustomerCode" >
                            {customSelectBox({ data: areaData, placeholder: preparePlaceholderSelect('Corporate Customer Code' || translateContent('customerMaster.placeholder.corporateName')) })}
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item name="corporateCustomerId" label={'Corporate Customer Id'} initialValue={formData?.financierName}>
                            <Input placeholder={preparePlaceholderText('Corporate Customer Id')} maxLength={50} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item name="budgetQuantity" label={'Budget Qty.'} initialValue={formData?.financierName}>
                            <Input placeholder={preparePlaceholderText('Budget Qty.')} maxLength={50} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item name="budgetAmount" label={'Budget Amount'} initialValue={formData?.financierName}>
                            <Input placeholder={preparePlaceholderText('Budget Amount')} maxLength={50} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item name="approvedAmount" label={'Approved Amount'} initialValue={formData?.financierName}>
                            <Input placeholder={preparePlaceholderText('Approved Amount')} maxLength={50} />
                        </Form.Item>
                    </Col>

                    <Form.Item hidden name="id" initialValue="" />

                </Row>
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
