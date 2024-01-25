/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React, { useState, useEffect } from 'react';

import { Row, Col, Checkbox, Button, Form, Input, Select, AutoComplete } from 'antd';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { validateRequiredInputField, validateRequiredSelectField, validatePincodeField, duplicateValidator } from 'utils/validation';
import { customSelectBox } from 'utils/customSelectBox';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

const AddEditForm = (props) => {
    const { addressForm, setAddressData, addressData, editingData, setEditingData, setShowAddEditForm, setIsEditing, userId, formData, formActionType, handleOnChange } = props;
    const { forceUpdate, handleFormValueChange, setIsAdding, showGlobalNotification, addData, resetPincodeData } = props;
    const { pincodeData, onHandleSelect, listPinCodeShowLoading, fetchPincodeDetail } = props;
    const disabledProps = { disabled: formActionType?.editMode && formData?.partyCategory === 'Principal' ? true : false };
    const { TextArea } = Input;
    const [options, setOptions] = useState(false);
    const [pinSearchData, setPinSearchData] = useState({});
    const { viewMode } = formActionType;
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

<Col xs={24} sm={8} md={8} lg={8} xl={8}>
        <Form.Item label={translateContent('partMaster.label.store')} rules={[validateRequiredInputField(translateContent('partMaster.placeholder.store'))]}>
            {customSelectBox({ data: [], placeholder: preparePlaceholderSelect(translateContent('partMaster.placeholder.store')), onChange: onHandleSelect })}
        </Form.Item>
    </Col>

    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
        <Form.Item label={translateContent('partMaster.label.binLocation')}>
            <Input placeholder={preparePlaceholderText(translateContent('partMaster.placeholder.binLocation'))} maxLength={50} />
        </Form.Item>
    </Col>


    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
        <Form.Item label={translateContent('partMaster.label.stockinhand')}>
            <Input placeholder={preparePlaceholderText(translateContent('partMaster.placeholder.stockinhand'))} maxLength={50} {...disabledProps} />
        </Form.Item>
    </Col>

    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
        <Form.Item label={translateContent('partMaster.label.allocatedstock')}>
            <Input placeholder={preparePlaceholderText(translateContent('partMaster.placeholder.allocatedstock'))} maxLength={50} {...disabledProps} />
        </Form.Item>
    </Col>

    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
        <Form.Item label={translateContent('partMaster.label.remarks')} rules={[validateRequiredInputField(translateContent('partMaster.validation.partDescription'))]} name="remarks">
            <TextArea placeholder={preparePlaceholderText(translateContent('partMaster.label.remarks'))} maxLength={300} />
        </Form.Item>
    </Col>
    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
        <Form.Item name="active" label={translateContent('partMaster.placeholder.active')} valuePropName="checked">
            <Checkbox onClick={handleOnChange}></Checkbox>
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
