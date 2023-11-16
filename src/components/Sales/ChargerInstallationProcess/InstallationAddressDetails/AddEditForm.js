/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState, useReducer } from 'react';
import { Row, Col, Form, Input, Typography, Divider, Checkbox, Descriptions, Card, AutoComplete } from 'antd';
import styles from 'assets/sass/app.module.scss';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';

import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { validateRequiredInputField, validatePincodeField, validateMobileNoField } from 'utils/validation';

import { translateContent } from 'utils/translateContent';

const { Search } = Input;

const AddEditFormMain = (props) => {
    const { crmCustomerVehicleData, pincodeData, formActionType, options, setOptions, chargerInstallationMasterData, isLoading, fetchPincodeDetail, setChecked, listPinCodeShowLoading, form, userId, onSuccessAction, onErrorAction, isPinCodeLoading } = props;
    const [disabled, setDisabled] = useState(false);
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    useEffect(() => {
        const pinOption = pincodeData?.map((item) => ({
            label: item?.pinCode + ' - ' + (item?.localityName ? item?.localityName + '-' : '') + item?.cityName + ' -' + item?.districtName + ' -' + item?.stateName,
            value: item?.id,
            key: item?.id,
        }));
        setOptions(pinOption);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pincodeData]);

    useEffect(() => {
        if (formActionType?.editMode) {
            form.setFieldsValue({
                address: chargerInstallationMasterData?.chargerInstAddressDetails?.instAddressDetails?.address,
                pinCode: chargerInstallationMasterData?.chargerInstAddressDetails?.instAddressDetails?.pinCode,
                city: chargerInstallationMasterData?.chargerInstAddressDetails?.instAddressDetails?.city,
                state: chargerInstallationMasterData?.chargerInstAddressDetails?.instAddressDetails?.state,
                customerMobileNumber: chargerInstallationMasterData?.chargerInstAddressDetails?.instAddressDetails?.customerMobileNumber,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chargerInstallationMasterData, formActionType]);

    const addressProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 2, lg: 2, xl: 2, xxl: 2 },
    };
    const customerProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 1, lg: 1, xl: 1, xxl: 1 },
    };

    const handleOnChange = (e) => {
        if (e.target.checked) {
            setDisabled(true);
            setChecked(true);
            if (formActionType?.editMode) {
                form?.setFieldsValue({
                    address: chargerInstallationMasterData?.chargerInstAddressDetails?.customerDetails?.address,
                    pinCode: chargerInstallationMasterData?.chargerInstAddressDetails?.customerDetails?.pinCode,
                    city: chargerInstallationMasterData?.chargerInstAddressDetails?.customerDetails?.city,
                    state: chargerInstallationMasterData?.chargerInstAddressDetails?.customerDetails?.state,
                    customerMobileNumber: chargerInstallationMasterData?.chargerInstAddressDetails?.customerDetails?.customerMobileNumber,
                });
            } else {
                form?.setFieldsValue({ address: crmCustomerVehicleData?.customerDetails?.customerAddress, pinCode: crmCustomerVehicleData?.customerDetails?.pinCode, city: crmCustomerVehicleData?.customerDetails?.customerCity, state: crmCustomerVehicleData?.customerDetails?.state, customerMobileNumber: crmCustomerVehicleData?.customerDetails?.customerPhoneNumber });
            }
        } else {
            setDisabled(false);
            setChecked(false);
            if (formActionType?.editMode) {
                form?.setFieldsValue({ address: chargerInstallationMasterData?.chargerInstAddressDetails?.instAddressDetails?.address, pinCode: chargerInstallationMasterData?.chargerInstAddressDetails?.instAddressDetails?.pinCode, city: chargerInstallationMasterData?.chargerInstAddressDetails?.instAddressDetails?.city, state: chargerInstallationMasterData?.chargerInstAddressDetails?.instAddressDetails?.state, customerMobileNumber: chargerInstallationMasterData?.chargerInstAddressDetails?.instAddressDetails?.customerMobileNumber });
            } else {
                form?.setFieldsValue({ address: undefined, pinCode: undefined, city: undefined, state: undefined, customerMobileNumber: undefined });
            }
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

    const handleOnSelect = (key) => {
        const selectedPinCode = pincodeData?.find((i) => i.id === key);
        if (selectedPinCode) {
            form.setFieldsValue({
                pinCode: selectedPinCode?.pinCode,
                state: selectedPinCode?.stateName,
                city: selectedPinCode?.cityName,
            });
            forceUpdate();
        }
    };

    const handleOnClear = () => {
        setOptions();
        form.setFieldsValue({
            pinCode: undefined,
            state: undefined,
            city: undefined,
        });
    };

    const disabledProps = { disabled: disabled };

    return (
        <>
            <Row gutter={16}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <Card data-testid="test-case" className={styles.cardContanerOverflow}>
                        <Typography>{translateContent('installationAddressDetials.heading.customerDetails')}</Typography>
                        <Divider className={styles.marT20} />
                        <Descriptions {...customerProps}>
                            <Descriptions.Item label={translateContent('installationAddressDetials.heading.customerDetails')}>{checkAndSetDefaultValue(crmCustomerVehicleData?.customerDetails?.customerName || chargerInstallationMasterData?.chargerInstAddressDetails?.customerDetails?.customerName, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label={translateContent('installationAddressDetials.label.address')}>{checkAndSetDefaultValue(crmCustomerVehicleData?.customerDetails?.customerAddress || chargerInstallationMasterData?.chargerInstAddressDetails?.customerDetails?.address, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label={translateContent('installationAddressDetials.label.pincode')}>{checkAndSetDefaultValue(crmCustomerVehicleData?.customerDetails?.pinCode || chargerInstallationMasterData?.chargerInstAddressDetails?.customerDetails?.pinCode, isLoading)}</Descriptions.Item>
                        </Descriptions>
                        <Descriptions {...addressProps}>
                            <Descriptions.Item label={translateContent('installationAddressDetials.label.city')}>{checkAndSetDefaultValue(crmCustomerVehicleData?.customerDetails?.customerCity || chargerInstallationMasterData?.chargerInstAddressDetails?.customerDetails?.city, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label={translateContent('installationAddressDetials.label.state')}>{checkAndSetDefaultValue(crmCustomerVehicleData?.customerDetails?.state || chargerInstallationMasterData?.chargerInstAddressDetails?.customerDetails?.state, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label={translateContent('installationAddressDetials.label.custMobNo')}>{checkAndSetDefaultValue(crmCustomerVehicleData?.customerDetails?.customerPhoneNumber || chargerInstallationMasterData?.chargerInstAddressDetails?.customerDetails?.customerMobileNumber, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label={translateContent('installationAddressDetials.label.sameAsCustomerAddress')}>{checkAndSetDefaultValue(crmCustomerVehicleData?.customerDetails?.email || chargerInstallationMasterData?.chargerInstAddressDetails?.customerDetails?.customerEmail, isLoading)}</Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <Card data-testid="test-case" className={styles.cardContanerOverflow}>
                        <Typography>{translateContent('installationAddressDetials.label.installationAddress')}</Typography>
                        <Divider className={styles.marT20} />
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Form.Item name="sameAsCustomer" label="">
                                    <Checkbox valuePropName="checked" onClick={handleOnChange} name="sameAsCustomerAddress">
                                        {translateContent('installationAddressDetials.label.sameAsCustomerAddress')}
                                    </Checkbox>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                <Form.Item label={translateContent('installationAddressDetials.label.installationAddress')} name="address" className={styles?.datePicker} rules={[validateRequiredInputField(translateContent('installationAddressDetials.validation.installationAddress'))]}>
                                    <Input {...disabledProps} maxLength={50} placeholder={preparePlaceholderText(translateContent('installationAddressDetials.validation.installationAddress'))} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                <Form.Item label={translateContent('installationAddressDetials.label.pincode')} name="pinCode" rules={[validateRequiredInputField(translateContent('installationAddressDetials.validation.pinCode')), validatePincodeField(translateContent('installationAddressDetials.validation.pinCode'))]}>
                                    <AutoComplete {...disabledProps} maxLength={6} options={options} onSelect={handleOnSelect} getPopupContainer={(triggerNode) => triggerNode.parentElement}>
                                        <Search onSearch={handleOnSearch} onChange={handleOnClear} placeholder={preparePlaceholderText(translateContent('installationAddressDetials.label.search'))} loading={isPinCodeLoading} type="text" allowClear />
                                    </AutoComplete>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                <Form.Item label={translateContent('installationAddressDetials.label.city')} name="city" rules={[validateRequiredInputField(translateContent('installationAddressDetials.validation.city'))]}>
                                    <Input disabled={true} placeholder={preparePlaceholderText(translateContent('installationAddressDetials.label.city'))} maxLength={50} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                <Form.Item label={translateContent('installationAddressDetials.label.state')} name="state" rules={[validateRequiredInputField(translateContent('installationAddressDetials.validation.state'))]}>
                                    <Input disabled={true} placeholder={preparePlaceholderText(translateContent('installationAddressDetials.label.state'))} maxLength={50} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                <Form.Item label={translateContent('installationAddressDetials.label.custMobNo')} name="customerMobileNumber" rules={[validateRequiredInputField(translateContent('installationAddressDetials.validation.custMobNo')), validateMobileNoField(translateContent('installationAddressDetials.validation.custMobNo'))]}>
                                    <Input {...disabledProps} placeholder={preparePlaceholderText(translateContent('installationAddressDetials.label.custMobNo'))} maxLength={50} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export const AddEditForm = AddEditFormMain;
