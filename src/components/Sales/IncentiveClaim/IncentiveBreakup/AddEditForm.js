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
    const disabledProps = {disabled: true};

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
                            <Form.Item name='Dealer Code' label={'Dealer Code'}>
                                <Input placeholder={preparePlaceholderText('Dealer Code')} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name='Dealer Location' label={'Dealer Location'}>
                                <Input placeholder={preparePlaceholderText('Dealer Location')} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name='Document Type' label={'Document Type'}>
                                <Input placeholder={preparePlaceholderText('Document Type')} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name='Document No' label={'Document No'}>
                                <Input placeholder={preparePlaceholderText('Document No')} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name='Document Date' label={'Document Date'}>
                                <Input placeholder={preparePlaceholderText('Document Date')} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name='No. Of Vehicles' label={'No. Of Vehicles'}>
                                <Input placeholder={preparePlaceholderText('No. Of Vehicles')} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name='Per Vehicle Amount' label={'Per Vehicle Amount'}>
                                <Input placeholder={preparePlaceholderText('Per Vehicle Amount')} />
                            </Form.Item>
                        </Col><Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name='Incentive Amount' label={'Incentive Amount'}>
                                <Input placeholder={preparePlaceholderText('Incentive Amount')} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name='GST Amount' label={'GST Amount'}>
                                <Input placeholder={preparePlaceholderText('GST Amount')} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name='TDS Amount' label={'TDS Amount'}>
                                <Input placeholder={preparePlaceholderText('TDS Amount')} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name='Remarks' label={'Remarks'}>
                                <Input placeholder={preparePlaceholderText('Remarks')} />
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
