/*
 *   Copyright (c) 2023
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';

import { Row, Col, Checkbox, Button, Form, Input, Select, Space, AutoComplete } from 'antd';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { validateRequiredInputField, validateRequiredSelectField, validateAlphanumericWithSpace, validatePincodeField, validateMobileNoField, validateLettersWithWhitespaces, duplicateValidator } from 'utils/validation';
import { addressType } from 'constants/modules/CustomerMaster/individualProfile';

import styles from 'components/common/Common.module.css';

const { Option } = Select;

const AddEditForm = (props) => {
    const { onSubmit, form, setAddressData, isEditing, addressData, editingData, setEditingData, setShowAddEditForm, setIsEditing, userId, formData, onCloseAction, formActionType } = props;
    const { forceUpdate, handleFormValueChange, setIsAdding } = props;
    const { pincodeData, isPinCodeLoading, listPinCodeShowLoading, fetchPincodeDetail } = props;
    const disabledProps = { disabled: formActionType?.editMode && formData?.partyCategory === 'Principal' ? true : false };

    const [options, setOptions] = useState(false);
    const [pinSearchData, setPinSearchData] = useState({});

    const onErrorAction = (res) => {
        console.log('error');
    };

    const onSuccessAction = () => {};

    useEffect(() => {
        const pinOption = pincodeData?.map((item) => ({
            label: item?.pinCode + ' - ' + (item?.localityName ? item?.localityName + '-' : '') + item?.cityName + ' -' + item?.districtName + ' -' + item?.stateName,
            value: item?.id,
            key: item?.id,
        }));
        setOptions(pinOption);
        return () => setEditingData({});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pincodeData]);

    const handleOnSelect = (key) => {
        const selectedPinCode = pincodeData?.find((i) => i.id === key);
        if (selectedPinCode) {
            form.setFieldsValue({
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
            form.validateFields(['pinCode']);
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
        form.setFieldsValue({
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
    };

    const handleSave = () => {
        form.validateFields()
            .then((value) => {
                // const value = form.getFieldsValue();

                if (editingData?.addressType) {
                    setAddressData((prev) => {
                        let formData = [...prev];
                        formData?.forEach((address) => {
                            if (address?.defaultaddress === true) {
                                address.defaultaddress = false;
                            }
                        });
                        const index = formData?.findIndex((el) => el?.addressType === editingData?.addressType && el?.address === editingData?.address && el?.pincode === editingData?.pincode);
                        formData.splice(index, 1, { ...value, ...pinSearchData });

                        return [...formData];
                    });
                } else {
                    setAddressData((prev) => {
                        let formData = prev?.length ? [...prev] : [];
                        if (value?.defaultaddress && formData?.length >= 1) {
                            formData?.forEach((address) => {
                                if (address?.defaultaddress === true) {
                                    address.defaultaddress = false;
                                }
                            });
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
                form.setFieldsValue();
            })
            .catch((err) => {
                console.error('err', err);
            });
    };

    return (
        <>
            <Form form={form} id="myAdd" onFinish={onSubmit} onFieldsChange={handleFormValueChange} autoComplete="off" layout="vertical">
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Address Type" name="addressType" rules={[validateRequiredSelectField('Address Type'), { validator: (rule, value) => duplicateValidator(value, 'addressType', addressData, editingData?.addressType) }]}>
                            <Select placeholder={preparePlaceholderSelect('address type')}>
                                {addressType?.map((item) => (
                                    <Option key={'ct' + item?.key} value={item?.key}>
                                        {item?.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Address Line 1" name="addressLine1" rules={[validateRequiredInputField('address Line 1'), validateAlphanumericWithSpace('application name')]}>
                            <Input maxLength={50} placeholder={preparePlaceholderText('address Line 1')} />
                        </Form.Item>
                    </Col>

                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Address Line 2" name="addressLine2">
                            <Input maxLength={50} placeholder={preparePlaceholderText('address Line 2')} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item initialValue={formData?.pinCode} label="Pin Code" name="pinCode" rules={[validateRequiredInputField('Pin Code'), validatePincodeField('Pin Code')]}>
                            <AutoComplete {...disabledProps} maxLength={6} className={styles.searchField} options={options} onSelect={handleOnSelect} getPopupContainer={(triggerNode) => triggerNode.parentElement}>
                                <Input.Search onSearch={handleOnSearch} onChange={handleOnClear} placeholder="Search" loading={isPinCodeLoading} style={{ width: '100%' }} type="text" allowClear />
                            </AutoComplete>
                        </Form.Item>
                    </Col>

                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item initialValue={formData?.tehsilName} label="Tehsil" name="tehsilName">
                            <Input disabled={true} className={styles.inputBox} placeholder={preparePlaceholderText('tehsil')} maxLength={6} />
                        </Form.Item>
                        <Form.Item hidden initialValue={formData?.tehsilCode} name="tehsilCode">
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="City" initialValue={formData?.cityName} name="cityName">
                            <Input disabled={true} className={styles.inputBox} placeholder={preparePlaceholderText('city')} maxLength={50} />
                        </Form.Item>
                        <Form.Item hidden initialValue={formData?.cityCode} name="cityCode">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="District" initialValue={formData?.districtName} name="districtName">
                            <Input disabled={true} className={styles.inputBox} placeholder={preparePlaceholderText('district')} maxLength={50} />
                        </Form.Item>
                        <Form.Item hidden initialValue={formData?.districtCode} name="districtCode">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item initialValue={formData?.stateName} label="State" name="stateName">
                            <Input disabled={true} className={styles.inputBox} placeholder={preparePlaceholderText('state')} maxLength={50} />
                        </Form.Item>
                        <Form.Item hidden initialValue={formData?.stateCode} name="stateCode">
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Contact Name" name="contactName" rules={[validateRequiredInputField('contact name'), validateLettersWithWhitespaces('contact name')]}>
                            <Input maxLength={50} placeholder={preparePlaceholderText('contact name')} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Contact Mobile" name="mobileNumber" rules={[validateRequiredInputField('contact number'), validateMobileNoField('mobile number')]}>
                            <Input maxLength={10} placeholder={preparePlaceholderText('mobile number')} />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item hidden name="id" initialValue={''}>
                    <Input />
                </Form.Item>
                <Form.Item hidden name="status" initialValue={false}>
                    <Input />
                </Form.Item>
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item valuePropName="checked" name="deafultAddressIndicator" initialValue={false}>
                            <Checkbox>Mark As Default</Checkbox>
                        </Form.Item>
                    </Col>
                </Row>
                <br></br>
                {formActionType?.editMode && (
                    <Row gutter={20}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Space>
                                <Button onClick={handleSave} type="primary">
                                    Save
                                </Button>
                                <Button onClick={handleCancelFormEdit} ghost type="primary">
                                    Cancel
                                </Button>
                            </Space>
                        </Col>
                    </Row>
                )}
            </Form>
        </>
    );
};

export default AddEditForm;
