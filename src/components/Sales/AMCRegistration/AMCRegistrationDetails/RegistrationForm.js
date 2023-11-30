/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Form, Input } from 'antd';
import { validateRequiredSelectField, validateRequiredInputField } from 'utils/validation';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { customSelectBox } from 'utils/customSelectBox';
import { PARAM_MASTER } from 'constants/paramMaster';
import { AMC_CONSTANTS } from '../utils/AMCConstants';
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';

const { Search } = Input;
const { TextArea } = Input;

const RegistrationForm = (props) => {
    const { employeeData, managerData, registrationForm, formData, typeData, handleFormValueChange, handleBookingNumberSearch, isVehicleInvoiceDataLoading, handleBookingNumberChange, handleSaleTypeChange, selectedSaleType, handleTaxChange } = props;

    return (
        <>
            <Form layout="vertical" autoComplete="off" form={registrationForm} onFieldsChange={handleFormValueChange}>
                <Row gutter={16}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item initialValue={formData?.priceType} label={translateContent('amcRegistration.label.priceType')} name="priceType" rules={[validateRequiredSelectField(translateContent('amcRegistration.label.priceType'))]}>
                            {customSelectBox({ data: typeData?.[PARAM_MASTER.DLVR_SALE_TYP.id], placeholder: preparePlaceholderSelect(translateContent('amcRegistration.label.priceType')), onChange: handleSaleTypeChange })}
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item initialValue={formData?.saleType} label={translateContent('amcRegistration.label.saleType')} name="saleType" rules={[validateRequiredSelectField(translateContent('amcRegistration.label.saleType'))]}>
                            {customSelectBox({ data: typeData['SALE_TYP'], placeholder: preparePlaceholderSelect(translateContent('amcRegistration.label.saleType')), onChange: handleTaxChange })}
                        </Form.Item>
                    </Col>
                    {selectedSaleType === AMC_CONSTANTS?.MNM_FOC?.key && (
                        <>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                <Form.Item label={translateContent('amcRegistration.label.bookingNumber')} name="bookingNumber" rules={[validateRequiredInputField(translateContent('amcRegistration.label.bookingNumber'))]}>
                                    <Search maxLength={50} placeholder={preparePlaceholderText(translateContent('amcRegistration.label.bookingNumber'))} loading={isVehicleInvoiceDataLoading} onSearch={(value) => handleBookingNumberSearch(value)} onChange={handleBookingNumberChange} allowClear />
                                </Form.Item>
                            </Col>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                <Form.Item label={translateContent('amcRegistration.label.vin')} name="vin">
                                    <Input disabled maxLength={50} placeholder={preparePlaceholderText(translateContent('amcRegistration.label.vin'))} />
                                </Form.Item>
                            </Col>
                        </>
                    )}
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label={translateContent('amcRegistration.label.employeeName')} name="employeeCode" rules={[validateRequiredInputField(translateContent('amcRegistration.label.employeeName'))]}>
                            {customSelectBox({ data: employeeData, placeholder: preparePlaceholderSelect(translateContent('amcRegistration.label.employeeName')) })}
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label={translateContent('amcRegistration.label.managerName')} name="managerCode">
                            {customSelectBox({ data: managerData, placeholder: preparePlaceholderSelect(translateContent('amcRegistration.label.managerName')) })}
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.textareaError}>
                        <Form.Item initialValue={formData?.remarks} label={translateContent('amcRegistration.label.remarks')} name="remarks" rules={[validateRequiredSelectField(translateContent('amcRegistration.label.remarks'))]}>
                            <TextArea maxLength={300} placeholder={preparePlaceholderText(translateContent('amcRegistration.label.remarks'))} showCount />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export default RegistrationForm;
