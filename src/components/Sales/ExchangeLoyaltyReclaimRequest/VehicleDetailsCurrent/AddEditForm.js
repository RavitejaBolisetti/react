/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React, { useState, useEffect } from 'react';

import { Row, Col, Checkbox, Button, Form, Input, Select, AutoComplete, Switch, DatePicker } from 'antd';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { validateRequiredInputField, validateRequiredSelectField, validatePincodeField, duplicateValidator } from 'utils/validation';
import { customSelectBox } from 'utils/customSelectBox';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';
import { dateFormat } from 'utils/formatDateTime';

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
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                <Form.Item name="make" label={'Make'}>
                                    <Input placeholder={preparePlaceholderText('Make')} maxLength={50} disabled={true} />
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                <Form.Item name="modalGroup" label={'Modal Group'}>
                                    {customSelectBox({ data: [], placeholder: preparePlaceholderText('Modal Group') })}
                                    {/* <Input placeholder={preparePlaceholderText('Modal Group')} maxLength={50} disabled={true} /> */}
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                <Form.Item label={'Varient'} name="Varient">
                                    <Input placeholder={preparePlaceholderText('Varient')} maxLength={50} disabled={true} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                <Form.Item label={'Old Reg. No'} name="oldRegistrationNo">
                                    <Input placeholder={preparePlaceholderText('Old Reg. No')} maxLength={50} disabled={true} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                <Form.Item label={'Old Chessis No'} name="oldchessisNo">
                                    <Input placeholder={preparePlaceholderText('Old Chessis No')} maxLength={50} disabled={true} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                <Form.Item label={'DOB'} name="dob" className={styles?.datePicker}>
                                    <DatePicker placeholder={preparePlaceholderSelect('DOB')} format={dateFormat} className={styles.fullWidth} disabled={true} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                <Form.Item label={'Relationship'} name="relationship" className={styles?.datePicker}>
                                    <Input placeholder={preparePlaceholderText('Relationship')} maxLength={50} disabled={true} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                <Form.Item label={'Year of Registration'} name="yearOfRegistration" className={styles?.datePicker}>
                                    {customSelectBox({ data: [], placeholder: preparePlaceholderText('Month of Registration') })}
                                    {/* <DatePicker placeholder={preparePlaceholderSelect('Year of Registration')} format={dateFormat} className={styles.fullWidth} disabled={true} /> */}
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                <Form.Item label={'Month of Registration'} name="MonthOfRegistration" className={styles?.datePicker}>
                                    {customSelectBox({ data: [], placeholder: preparePlaceholderText('Month of Registration') })}

                                    {/* <DatePicker placeholder={preparePlaceholderSelect('Month of Registration')} format={dateFormat} className={styles.fullWidth} disabled={true} /> */}
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                <Form.Item label={'Usage'} name="usage" className={styles?.datePicker}>
                                    <Input placeholder={preparePlaceholderText('Usage')} maxLength={50} disabled={true} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                <Form.Item label={'Scheme Name'} name="schemeName" className={styles?.datePicker}>
                                    <Input placeholder={preparePlaceholderText('Scheme Name')} maxLength={50} disabled={true} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                <Form.Item label={'Scheme Amount'} name="schemeAmount" className={styles?.datePicker}>
                                    <Input placeholder={preparePlaceholderText('Scheme Amount')} maxLength={50} disabled={true} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                <Form.Item label={'KM'} name="km" className={styles?.datePicker}>
                                    <Input placeholder={preparePlaceholderText('KM')} maxLength={50} disabled={true} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                <Form.Item label={'Customer Expected Price'} name="Customer Expected Price" className={styles?.datePicker}>
                                    <Input placeholder={preparePlaceholderText('Customer Expected Price')} maxLength={50} disabled={true} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                <Form.Item name="Procurement Price" label={'Procurement Price'}>
                                    <Input placeholder={preparePlaceholderText('Procurement Price')} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                <Form.Item name="Finance Company" label={'Finance Company'}>
                                    <Input placeholder={preparePlaceholderText('Finance Company')} />
                                </Form.Item>
                            </Col>
                        </Row>
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
