/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Row, Col, Input, Form, DatePicker, InputNumber } from 'antd';
import { withDrawer } from 'components/withDrawer';
import { validateRequiredInputField, validateOnlyPositiveNumber, valueBetween0to100 } from 'utils/validation';

import { OnRoadPriceFormButton } from './OnRoadPriceFormButton';
import { dateFormat } from 'utils/formatDateTime';
import { preparePlaceholderSelect } from 'utils/preparePlaceholder';
import styles from 'assets/sass/app.module.scss';
const AddEditFormMain = (props) => {
    const { buttonData, setButtonData, onFinishFailed, vehiclePrice, saveData } = props;
    const { form, isReadOnly = true, userId, listShowLoading, handleButtonClick, setIsFormVisible, showGlobalNotification } = props;
    const disabledProps = { disabled: isReadOnly };

    useEffect(() => {
        if (vehiclePrice) {
            form.setFieldsValue({ ...vehiclePrice });
        }
    }, [vehiclePrice]);

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleFormFieldChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const onFinish = (values) => {
        let data = { ...values, id: vehiclePrice?.id };

        const onSuccess = (res) => {
            showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
            handleButtonClick({ record: res?.data });
            setIsFormVisible(false);
        };
        const onError = (message) => {
            showGlobalNotification({ message });
        };
        const requestData = {
            data: data,
            method: 'put',
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
        };
        saveData(requestData);
    };
    return (
        <Form form={form} layout="vertical" autocomplete="off" colon="false" onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20} className={styles.drawerBody}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="model" label="Model" initialValue={vehiclePrice?.model}>
                                <Input maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="stateCode" label="State Code" initialValue={vehiclePrice?.stateCode}>
                                <Input maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="pricingCityCode" label="City Code" initialValue={vehiclePrice?.pricingCityCode}>
                                <Input maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="currentExShowroomPrice" label="Current EX Showroom Price" initialValue={vehiclePrice?.currentExShowroomPrice}>
                                <Input maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item initialValue={vehiclePrice?.currentExShowroomDate} label="Current EX Showroom Date" name="currentExShowroomDate" className={styles?.datePicker}>
                                <DatePicker placeholder={preparePlaceholderSelect('')} format={dateFormat} className={styles.fullWidth} {...disabledProps} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="tcsWithGst" label="TCS with GST" initialValue={vehiclePrice?.tcsWithGst}>
                                <Input maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="epc" label="EPC" initialValue={vehiclePrice?.epc}>
                                <Input maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="registrationCharges" label="Registration Charges" initialValue={vehiclePrice?.registrationCharges}>
                                <Input maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="fastTag" label="Fast Tag" initialValue={vehiclePrice?.fastTag}>
                                <Input maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="insurancePremiunm" label="Insurance Premium(1+3yr TP)" initialValue={vehiclePrice?.insurancePremiunm}>
                                <Input maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="addOnZeroDepWithTax" label="Add on Zero Dep with Tax" initialValue={vehiclePrice?.addOnZeroDepWithTax}>
                                <Input maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="comprehensiveInsurance" label="Comprehensive Insurance" initialValue={vehiclePrice?.comprehensiveInsurance}>
                                <Input maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="basicOnRoadPrice" label="Basic on Road Price" initialValue={vehiclePrice?.basicOnRoadPrice}>
                                <Input maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="consumerSchemaWithTax" label="Consumer Scheme with Tax" initialValue={vehiclePrice?.consumerSchemaWithTax}>
                                <Input maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="rsaWithTax" label="RSA with Tax" initialValue={vehiclePrice?.rsaWithTax}>
                                <Input maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="shieldWithTax" label="Shield with Tax" initialValue={vehiclePrice?.shieldWithTax}>
                                <Input maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="amcWithTax" label="AMC with Tax" initialValue={vehiclePrice?.amcWithTax}>
                                <Input maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="odDiscount" label="OD Discount%" initialValue={vehiclePrice?.odDiscount} rules={[validateRequiredInputField('OD Discount%'), validateOnlyPositiveNumber('OD Discount%'), valueBetween0to100('OD Discount%')]}>
                                <InputNumber maxLength={50} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="dealerDiscountWithTax" label="Dealer Discount with Tax" initialValue={vehiclePrice?.dealerDiscountWithTax} rules={[validateRequiredInputField('Dealer discount with tax'), validateOnlyPositiveNumber('Dealer discount with tax')]}>
                                <Input maxLength={50} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="otherCharges" label="Other Charges" initialValue={vehiclePrice?.otherCharges} rules={[validateRequiredInputField('Other Charges'), validateOnlyPositiveNumber('Other Charges')]}>
                                <Input maxLength={50} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="essentialKitWithTax" label="Essential Kit with Tax" initialValue={vehiclePrice?.essentialKitWithTax} rules={[validateRequiredInputField('Essential kit with tax'), validateOnlyPositiveNumber('Essential kit with tax')]}>
                                <Input maxLength={50} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <OnRoadPriceFormButton {...props} />
        </Form>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, { width: '90%' });
