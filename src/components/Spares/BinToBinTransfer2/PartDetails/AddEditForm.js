/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React, { useState, useEffect } from 'react';

import { Row, Col, Checkbox, Button, Form, Input, Select, AutoComplete } from 'antd';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { validateRequiredInputField, validateRequiredSelectField, validatePincodeField, duplicateValidator } from 'utils/validation';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

const { Search } = Input;

const AddEditForm = (props) => {
    const { addressForm, setAddressData, addressData, editingData, setEditingData, setShowAddEditForm, setIsEditing, userId, formData, formActionType } = props;
    const { forceUpdate, handleFormValueChange, setIsAdding, showGlobalNotification, addData, resetPincodeData } = props;
    const { pincodeData, isPinCodeLoading, listPinCodeShowLoading, fetchPincodeDetail } = props;
    const disabledProps = { disabled: formActionType?.editMode && formData?.partyCategory === 'Principal' ? true : false };

    const [options, setOptions] = useState(false);
    const [pinSearchData, setPinSearchData] = useState({});

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
    };

    const handleOnClear = () => {
        setOptions();
        addressForm.setFieldsValue({
            pinCode: undefined,
            stateName: undefined,
            cityName: undefined,
            tehsilName: undefined,
            districtName: undefined,
        });
    };

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

    const handleOnSearch = () => {};
    const handleOnSelect = () => {};

    return (
        <>
            <Form form={addressForm} id="myAdd" onFinish={handleSave} onFieldsChange={handleFormValueChange} autoComplete="off" layout="vertical">
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item initialValue={formData?.partNo} label={translateContent('Part No')} name="partNo" rules={[validateRequiredInputField(translateContent('Part No')), validatePincodeField(translateContent('Part No'))]}>
                            <AutoComplete {...disabledProps} maxLength={6} options={options} onSelect={handleOnSelect} getPopupContainer={(triggerNode) => triggerNode.parentElement}>
                                <Search onSearch={handleOnSearch} onChange={handleOnClear} placeholder={translateContent('Part No')} loading={isPinCodeLoading} type="text" allowClear />
                            </AutoComplete>
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item initialValue={formData?.partNo} label={translateContent('From Bin Location')} name="fromBinLocation" rules={[validateRequiredInputField(translateContent('From Bin Location')), validatePincodeField(translateContent('From Bin Location'))]}>
                            <AutoComplete {...disabledProps} maxLength={6} options={options} onSelect={handleOnSelect} getPopupContainer={(triggerNode) => triggerNode.parentElement}>
                                <Search onSearch={handleOnSearch} onChange={handleOnClear} placeholder={translateContent('From Bin Location')} loading={isPinCodeLoading} type="text" allowClear />
                            </AutoComplete>
                        </Form.Item>
                    </Col>

                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label={translateContent('From Bin Stock')} name="fromBinStock" rules={[validateRequiredInputField(translateContent('From Bin Stock'))]}>
                            <Input maxLength={50} placeholder={preparePlaceholderText(translateContent('From Bin Stock'))} />
                        </Form.Item>
                    </Col>

                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label={translateContent('Transfer Quantity')} name="transferQuantity">
                            <Input maxLength={50} placeholder={preparePlaceholderText(translateContent('Transfer Quantity'))} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item initialValue={formData?.partNo} label={translateContent('To Bin Location')} name="toBinLocation" rules={[validateRequiredInputField(translateContent('To Bin Location')), validatePincodeField(translateContent('To Bin Location'))]}>
                            <AutoComplete {...disabledProps} maxLength={6} options={options} onSelect={handleOnSelect} getPopupContainer={(triggerNode) => triggerNode.parentElement}>
                                <Search onSearch={handleOnSearch} onChange={handleOnClear} placeholder={translateContent('To Bin Location')} loading={isPinCodeLoading} type="text" allowClear />
                            </AutoComplete>
                        </Form.Item>
                    </Col>

                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label={translateContent('To Bin Stock')} name="toBinStock" rules={[validateRequiredInputField(translateContent('To Bin Stock'))]}>
                            <Input maxLength={50} placeholder={preparePlaceholderText(translateContent('To Bin Stock'))} />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item hidden name="id" initialValue={''}>
                    <Input />
                </Form.Item>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Form.Item valuePropName="checked" name="deafultBin" initialValue={false}>
                            <Checkbox>{translateContent('customerMaster.label.mark')}</Checkbox>
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
