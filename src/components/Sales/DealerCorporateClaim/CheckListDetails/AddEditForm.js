/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Row, Col, Input, Form, DatePicker, InputNumber } from 'antd';
import { withDrawer } from 'components/withDrawer';
import { validateRequiredInputField, validateOnlyPositiveNumber, valueBetween0to100 } from 'utils/validation';

import { dateFormat, formattedCalendarDate } from 'utils/formatDateTime';
import { preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { translateContent } from 'utils/translateContent';
import styles from 'assets/sass/app.module.scss';
import { OnRoadPriceFormButton } from 'components/Sales/OnRoadPriceMaster/OnRoadPriceFormButton';

const AddEditFormMain = (props) => {
    const { buttonData, setButtonData, vehiclePrice, saveData, isLoading, onFinish } = props;
    const { form, isReadOnly = true, userId, listShowLoading, handleButtonClick, setIsFormVisible, showGlobalNotification } = props;
    const disabledProps = { disabled: isReadOnly };

    useEffect(() => {
        if (vehiclePrice) {
            form.setFieldsValue({ ...vehiclePrice, currentExShowroomDate: formattedCalendarDate(vehiclePrice?.currentExShowroomDate) });
        }
    }, [vehiclePrice, isLoading, form]);

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleFormFieldChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };
   
    return (
        <Form form={form} layout="vertical" autocomplete="off" colon="false" onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish}>
            <Row gutter={20} className={styles.drawerBody}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="model" label={translateContent('onRoadPriceMaster.label.model')} initialValue={vehiclePrice?.model}>
                                <Input maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="stateCode" label={translateContent('onRoadPriceMaster.label.stateCode')} initialValue={vehiclePrice?.stateCode}>
                                <Input maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="pricingCityCode" label={translateContent('onRoadPriceMaster.label.cityCode')} initialValue={vehiclePrice?.pricingCityCode}>
                                <Input maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="currentExShowroomPrice" label={translateContent('onRoadPriceMaster.label.currentEXShowroomPrice')} initialValue={vehiclePrice?.currentExShowroomPrice}>
                                <Input maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item initialValue={vehiclePrice?.currentExShowroomDate} label={translateContent('onRoadPriceMaster.label.currentEXShowroomDate')} name="currentExShowroomDate" className={styles?.datePicker}>
                                <DatePicker placeholder={preparePlaceholderSelect('')} format={dateFormat} className={styles.fullWidth} {...disabledProps} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="tcsWithGst" label={translateContent('onRoadPriceMaster.label.TCSwithGST')} initialValue={vehiclePrice?.tcsWithGst}>
                                <Input maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="epc" label={translateContent('onRoadPriceMaster.label.EPC')} initialValue={vehiclePrice?.epc}>
                                <Input maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="registrationCharges" label={translateContent('onRoadPriceMaster.label.registrationCharges')} initialValue={vehiclePrice?.registrationCharges}>
                                <Input maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="fastTag" label={translateContent('onRoadPriceMaster.label.fastTag')} initialValue={vehiclePrice?.fastTag}>
                                <Input maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="insurancePremiunm" label={translateContent('onRoadPriceMaster.label.insurancePremium')} initialValue={vehiclePrice?.insurancePremiunm}>
                                <Input maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="addOnZeroDepWithTax" label={translateContent('onRoadPriceMaster.label.addonZeroDepwithTax')} initialValue={vehiclePrice?.addOnZeroDepWithTax}>
                                <Input maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="comprehensiveInsurance" label={translateContent('onRoadPriceMaster.label.comprehensiveInsurance')} initialValue={vehiclePrice?.comprehensiveInsurance}>
                                <Input maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="basicOnRoadPrice" label={translateContent('onRoadPriceMaster.label.basicOnRoadPrice')} initialValue={vehiclePrice?.basicOnRoadPrice}>
                                <Input maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="consumerSchemaWithTax" label={translateContent('onRoadPriceMaster.label.consumerSchemeWithTax')} initialValue={vehiclePrice?.consumerSchemaWithTax}>
                                <Input maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="rsaWithTax" label={translateContent('onRoadPriceMaster.label.RSAwithTax')} initialValue={vehiclePrice?.rsaWithTax}>
                                <Input maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="shieldWithTax" label={translateContent('onRoadPriceMaster.label.shieldWithTax')} initialValue={vehiclePrice?.shieldWithTax}>
                                <Input maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="amcWithTax" label={translateContent('onRoadPriceMaster.label.AMCwithTax')} initialValue={vehiclePrice?.amcWithTax}>
                                <Input maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="odDiscount" label={translateContent('onRoadPriceMaster.label.ODdiscount')} initialValue={vehiclePrice?.odDiscount} rules={[validateRequiredInputField(translateContent('onRoadPriceMaster.label.ODdiscount')), validateOnlyPositiveNumber(translateContent('onRoadPriceMaster.label.ODdiscount')), valueBetween0to100(translateContent('onRoadPriceMaster.label.ODdiscount'))]}>
                                <InputNumber maxLength={50} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="dealerDiscountWithTax" label={translateContent('onRoadPriceMaster.label.dealerDiscountWithTax')} initialValue={vehiclePrice?.dealerDiscountWithTax} rules={[validateRequiredInputField(translateContent('onRoadPriceMaster.label.dealerDiscountWithTax')), validateOnlyPositiveNumber(translateContent('onRoadPriceMaster.label.dealerDiscountWithTax'))]}>
                                <Input maxLength={50} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="otherCharges" label={translateContent('onRoadPriceMaster.label.otherCharges')} initialValue={vehiclePrice?.otherCharges} rules={[validateRequiredInputField(translateContent('onRoadPriceMaster.label.otherCharges')), validateOnlyPositiveNumber(translateContent('onRoadPriceMaster.label.otherCharges'))]}>
                                <Input maxLength={50} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="essentialKitWithTax" label={translateContent('onRoadPriceMaster.label.essentialKitWithTax')} initialValue={vehiclePrice?.essentialKitWithTax} rules={[validateRequiredInputField(translateContent('onRoadPriceMaster.label.essentialKitWithTax')), validateOnlyPositiveNumber(translateContent('onRoadPriceMaster.label.essentialKitWithTax'))]}>
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
