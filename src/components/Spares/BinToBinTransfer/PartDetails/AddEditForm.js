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
import { customSelectBox } from 'utils/customSelectBox';

const { Search } = Input;

const AddEditForm = (props) => {
    const { addressForm, setAddressData, addressData, editingData, setEditingData, setShowAddEditForm, setIsEditing, userId, formData, formActionType } = props;
    const { forceUpdate, handleFormValueChange, setIsAdding, showGlobalNotification, addData, resetPincodeData } = props;
    const { pincodeData, isPinCodeLoading, listPinCodeShowLoading, fetchPincodeDetail } = props;
    const disabledProps = { disabled: true };

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
                    <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item label={translateContent('Part No')} name="partNo">
                            <AutoComplete maxLength={6} options={[{ key: 'd1', value: 'd1' }]} onSelect={handleOnSelect} getPopupContainer={(triggerNode) => triggerNode.parentElement}>
                                <Search onSearch={handleOnSearch} onChange={handleOnClear} placeholder={translateContent('Part No')} type="text" allowClear disabled={!formActionType?.addMode} />
                            </AutoComplete>
                        </Form.Item>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item
                            label={translateContent('Part Descripton')}
                            name="partDescription"
                            //  rules={[validateRequiredInputField(translateContent('Part Descripton'))]}
                        >
                            <Input maxLength={50} placeholder={preparePlaceholderText(translateContent('Part Descripton'))} {...disabledProps} />
                        </Form.Item>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item label={translateContent('Unit Of Measure')} name="unitOfMeasure" >
                            <Input maxLength={50} placeholder={preparePlaceholderText(translateContent('Unit Of Measure'))}  {...disabledProps}/>
                        </Form.Item>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item label={translateContent('From Bin Store')} name="fromBinStore" rules={[validateRequiredInputField(translateContent('From Bin Store'))]}>
                            {customSelectBox({ data: [{ key: 'l1', value: 'l1' }], placeholder: preparePlaceholderText('From Bin Store') })}
                        </Form.Item>
                    </Col>

                    <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item label={translateContent('From Bin Location')} name="fromBinLocation" rules={[validateRequiredInputField(translateContent('From Bin Location'))]}>
                            {customSelectBox({ data: [{ key: 'l1', value: 'l1' }], placeholder: preparePlaceholderText('From Bin Location') })}
                        </Form.Item>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item
                            label={translateContent('From Bin Stock')}
                            name="fromBinStock"
                            // rules={[validateRequiredInputField(translateContent('From Bin Stock'))]}
                        >
                            <Input maxLength={50} placeholder={preparePlaceholderText(translateContent('From Bin Stock'))} {...disabledProps} />
                        </Form.Item>
                    </Col>

                    <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item label={translateContent('Transfer Quantity')} name="transferQuantity">
                            <Input maxLength={50} placeholder={preparePlaceholderText(translateContent('Transfer Quantity'))} />
                        </Form.Item>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item label={translateContent('To Bin Store')} name="toBinStore" rules={[validateRequiredInputField(translateContent('To Bin Store'))]}>
                            {customSelectBox({ data: [{ key: 'ker', value: 'Ker' }], placeholder: preparePlaceholderText('To Bin Store') })}
                        </Form.Item>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item label={translateContent('To Bin Location')} name="toBinLocation" rules={[validateRequiredInputField(translateContent('To Bin Location'))]}>
                            {customSelectBox({ data: [{ key: 'location1', value: 'location1' }], placeholder: preparePlaceholderText('To Bin Location') })}
                        </Form.Item>
                    </Col>

                    <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item
                            label={translateContent('To Bin Stock')}
                            name="toBinStock"
                            // rules={[validateRequiredInputField(translateContent('To Bin Stock'))]}
                        >
                            <Input maxLength={50} placeholder={preparePlaceholderText(translateContent('To Bin Stock'))} {...disabledProps} />
                        </Form.Item>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item label={translateContent('Mark bin location as default')} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="defaultBinLocation">
                            <Checkbox></Checkbox>
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item hidden name="id" initialValue={''}>
                    <Input />
                </Form.Item>
                {/* <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Form.Item valuePropName="checked" name="deafultBin" initialValue={false}>
                            <Checkbox>{translateContent('Mark bin location as default')}</Checkbox>
                        </Form.Item>
                    </Col>
                </Row> */}
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
