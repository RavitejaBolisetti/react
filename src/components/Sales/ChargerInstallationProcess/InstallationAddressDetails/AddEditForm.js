/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState, useReducer } from 'react';
import { Row, Col, Form, Input, Typography, Divider, Checkbox, Descriptions, Card, AutoComplete } from 'antd';
import styles from 'assets/sass/app.module.scss';

import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { validateRequiredInputField, validatePincodeField } from 'utils/validation';

const { Search } = Input;

const AddEditFormMain = (props) => {
    const { crmCustomerVehicleData, pincodeData, fetchPincodeDetail, listPinCodeShowLoading, form, userId, onSuccessAction, onErrorAction, isPinCodeLoading } = props;
    const [options, setOptions] = useState();
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
            form?.setFieldsValue({ address: crmCustomerVehicleData?.customerDetails?.customerAddress, pinCode: crmCustomerVehicleData?.customerDetails?.pinCode, city: crmCustomerVehicleData?.customerDetails?.customerCity, state: crmCustomerVehicleData?.customerDetails?.state, customerMobileNumber: crmCustomerVehicleData?.otfDetails?.mobileNumber });
        } else {
            setDisabled(false);
            form?.setFieldsValue({ address: undefined, pinCode: undefined, city: undefined, state: undefined, customerMobileNumber: undefined });
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
                        <Typography>Customer Details</Typography>
                        <Divider className={styles.marT20} />
                        <Descriptions {...customerProps}>
                            <Descriptions.Item label="Customer Name">{crmCustomerVehicleData?.customerDetails?.customerName}</Descriptions.Item>
                            <Descriptions.Item label="Address">{crmCustomerVehicleData?.customerDetails?.customerAddress}</Descriptions.Item>
                            <Descriptions.Item label="Pincode">{crmCustomerVehicleData?.customerDetails?.pinCode}</Descriptions.Item>
                        </Descriptions>
                        <Descriptions {...addressProps}>
                            <Descriptions.Item label="City">{crmCustomerVehicleData?.customerDetails?.customerCity}</Descriptions.Item>
                            <Descriptions.Item label="State">{crmCustomerVehicleData?.customerDetails?.state}</Descriptions.Item>
                            <Descriptions.Item label="Customer Mobile No.">{crmCustomerVehicleData?.otfDetails?.mobileNumber}</Descriptions.Item>
                            <Descriptions.Item label="Customer Email Id.">{crmCustomerVehicleData?.customerDetails?.email}</Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <Card data-testid="test-case" className={styles.cardContanerOverflow}>
                        <Typography>Installation Address</Typography>
                        <Divider className={styles.marT20} />
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Form.Item name="sameAsCustomer" label="">
                                    <Checkbox valuePropName="checked" onClick={handleOnChange} name="sameAsCustomerAddress">
                                        Same as Customer Address
                                    </Checkbox>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                <Form.Item label="Installation Address" name="address" className={styles?.datePicker}>
                                    <Input {...disabledProps} maxLength={50} placeholder={preparePlaceholderText('Installation Address')} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                <Form.Item label="Pin Code" name="pinCode" rules={[validateRequiredInputField('Pin Code'), validatePincodeField('Pin Code')]}>
                                    <AutoComplete maxLength={6} options={options} onSelect={handleOnSelect} getPopupContainer={(triggerNode) => triggerNode.parentElement}>
                                        <Search onSearch={handleOnSearch} onChange={handleOnClear} placeholder="Search" loading={isPinCodeLoading} type="text" allowClear />
                                    </AutoComplete>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                <Form.Item label="City" name="city">
                                    <Input disabled={true} placeholder={preparePlaceholderText('city')} maxLength={50} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                <Form.Item label="State" name="state">
                                    <Input disabled={true} placeholder={preparePlaceholderText('state')} maxLength={50} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                <Form.Item label="Contact Number" name="customerMobileNumber">
                                    <Input {...disabledProps} placeholder={preparePlaceholderText('Contact Number')} maxLength={50} />
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
