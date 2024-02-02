/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React, { useState, useEffect } from 'react';

import { Row, Col, Checkbox, Button, Form, Input, Select, AutoComplete, DatePicker, Typography } from 'antd';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { validateRequiredInputField, validateRequiredSelectField, validatePincodeField, duplicateValidator } from 'utils/validation';
import { customSelectBox } from 'utils/customSelectBox';
import { dateFormat, formattedCalendarDate } from 'utils/formatDateTime';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

const { Text } = Typography;
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
                        <Form.Item label="Doc. Type">{customSelectBox({ placeholder: 'Payment Status' })}</Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Document Number">
                            <Input placeholder="Document Number" />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Document Date">
                            <DatePicker format={dateFormat} placeholder="Document Date" style={{ display: 'auto', width: '100%' }} disabled={true} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Document Ammount">
                            <Input value={'12000.00'} placeholder="" disabled={true} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Paid Ammount">
                            <Input value={'10000.00'} placeholder="" disabled={true} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Apportioned Amount">
                            <Input value={'500.00'} placeholder="" disabled={true} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Write-off Amount">
                            <Input value={'1000.00'} placeholder="" disabled={true} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Balance Amount">
                            <Input value={'500.00'} placeholder="" disabled={true} />
                        </Form.Item>
                    </Col>
                    {/* <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8} className={`${styles.padT25} ${styles.marB20}`}>
                        <Button type="primary">Save</Button>
                        <Button danger className={styles.marL10}>
                            Cancel
                        </Button>
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
                {/* <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Form.Item valuePropName="checked" name="deafultAddressIndicator" initialValue={false}>
                            <Checkbox>{translateContent('customerMaster.label.mark')}</Checkbox>
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
