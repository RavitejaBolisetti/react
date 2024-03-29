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

    const onSuccessAction = () => {
        return;
    };

    useEffect(() => {
        const pinOption = pincodeData?.map((item) => ({
            label: item?.pinCode + ' - ' + (item?.localityName ? item?.localityName + '-' : '') + item?.cityName + ' -' + item?.districtName + ' -' + item?.stateName,
            value: item?.id,
            key: item?.id,
        }));
        setOptions(pinOption);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pincodeData]);

    const handleOnSelect = (key) => {
        const selectedPinCode = pincodeData?.find((i) => i.id === key);
        if (selectedPinCode) {
            addressForm.setFieldsValue({
                pinCode: selectedPinCode?.pinCode,
                stateName: selectedPinCode?.stateName,
                cityName: selectedPinCode?.cityName,
                tehsilName: selectedPinCode?.tehsilName,
                districtName: selectedPinCode?.districtName,
            });
            setPinSearchData({
                pinCode: selectedPinCode?.pinCode,
                stateCode: selectedPinCode?.stateCode,
                cityCode: selectedPinCode?.cityCode,
                tehsilCode: selectedPinCode?.tehsilCode,
                districtCode: selectedPinCode?.districtCode,
            });
            forceUpdate();
        }
    };

    const handleOnSearch = (value) => {
        if (!(typeof options === 'undefined')) {
            return;
        }
        setOptions();
        if (value.length <= 5) {
            addressForm.validateFields(['pinCode']);
        } else if (value.length > 5) {
            const extraParams = [
                {
                    key: 'pincode',
                    value: value,
                },
            ];
            fetchPincodeDetail({ setIsLoading: listPinCodeShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
        }
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

    return (
        <>
            <Form form={addressForm} id="myAdd" onFinish={handleSave} onFieldsChange={handleFormValueChange} autoComplete="off" layout="vertical">
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label={translateContent('customerMaster.label.address')} name="addressType" rules={[validateRequiredSelectField(translateContent('customerMaster.validation.addressType')), { validator: (rule, value) => duplicateValidator(value, 'addressType', addressData, editingData?.addressType) }]}>
                            <Select {...disabledProps} placeholder={preparePlaceholderSelect(translateContent('customerMaster.placeholder.addresstype'))} fieldNames={{ label: 'value', value: 'key' }} getPopupContainer={(triggerNode) => triggerNode.parentElement} options={addData} allowClear></Select>
                        </Form.Item>
                    </Col>

                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label={translateContent('customerMaster.label.addressL')} name="addressLine1" rules={[validateRequiredInputField(translateContent('customerMaster.validation.address'))]}>
                            <Input maxLength={50} placeholder={preparePlaceholderText(translateContent('customerMaster.placeholder.address'))} />
                        </Form.Item>
                    </Col>

                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label={translateContent('customerMaster.label.addressLine')} name="addressLine2">
                            <Input maxLength={50} placeholder={preparePlaceholderText(translateContent('customerMaster.placeholder.addressL'))} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label={translateContent('customerMaster.label.addressLines')} name="addressLine3">
                            <Input maxLength={50} placeholder={preparePlaceholderText(translateContent('customerMaster.placeholder.addressLine'))} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item initialValue={formData?.pinCode} label={translateContent('customerMaster.label.pinCode')} name="pinCode" rules={[validateRequiredInputField(translateContent('customerMaster.validation.pinCode')), validatePincodeField(translateContent('customerMaster.validation.pinCode'))]}>
                            <AutoComplete {...disabledProps} maxLength={6} options={options} onSelect={handleOnSelect} getPopupContainer={(triggerNode) => triggerNode.parentElement}>
                                <Search onSearch={handleOnSearch} onChange={handleOnClear} placeholder={translateContent('global.placeholder.search')} loading={isPinCodeLoading} type="text" allowClear />
                            </AutoComplete>
                        </Form.Item>
                    </Col>

                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item initialValue={formData?.tehsilName} label={translateContent('customerMaster.label.tehsil')} name="tehsilName">
                            <Input disabled={true} placeholder={preparePlaceholderText(translateContent('customerMaster.placeholder.tehsil'))} maxLength={6} />
                        </Form.Item>
                        <Form.Item hidden initialValue={formData?.tehsilCode} name="tehsilCode">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label={translateContent('customerMaster.label.city')} initialValue={formData?.cityName} name="cityName">
                            <Input disabled={true} placeholder={preparePlaceholderText(translateContent('customerMaster.placeholder.city'))} maxLength={50} />
                        </Form.Item>
                        <Form.Item hidden initialValue={formData?.cityCode} name="cityCode">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label={translateContent('customerMaster.label.district')} initialValue={formData?.districtName} name="districtName">
                            <Input disabled={true} placeholder={preparePlaceholderText(translateContent('customerMaster.placeholder.district'))} maxLength={50} />
                        </Form.Item>
                        <Form.Item hidden initialValue={formData?.districtCode} name="districtCode">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item initialValue={formData?.stateName} label={translateContent('customerMaster.label.state')} name="stateName">
                            <Input disabled={true} placeholder={preparePlaceholderText(translateContent('customerMaster.placeholder.state'))} maxLength={50} />
                        </Form.Item>
                        <Form.Item hidden initialValue={formData?.stateCode} name="stateCode">
                            <Input />
                        </Form.Item>
                    </Col>

                    {/* <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Contact Name" name="contactName" rules={[validateRequiredInputField('contact name'), validateLettersWithWhitespaces('contact name')]}>
                            <Input maxLength={50} placeholder={preparePlaceholderText('contact name')} />
                        </Form.Item>
                    </Col> */}
                </Row>

                {/* <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Contact Mobile" name="mobileNumber" rules={[validateRequiredInputField('contact number'), validateMobileNoField('mobile number')]}>
                            <Input maxLength={10} placeholder={preparePlaceholderText('mobile number')} />
                        </Form.Item>
                    </Col>
                </Row> */}
                <Form.Item hidden name="id" initialValue={''}>
                    <Input />
                </Form.Item>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Form.Item valuePropName="checked" name="deafultAddressIndicator" initialValue={false}>
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
