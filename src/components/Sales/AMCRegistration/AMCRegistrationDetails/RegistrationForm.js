/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Row, Col, Form, DatePicker, Input, Divider } from 'antd';
import { dateFormat, formattedCalendarDate } from 'utils/formatDateTime';
import { validateRequiredSelectField, validateRequiredInputField } from 'utils/validation';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { customSelectBox } from 'utils/customSelectBox';
import { PARAM_MASTER } from 'constants/paramMaster';
import { prepareCaption } from 'utils/prepareCaption';
import { getCodeValue } from 'utils/getCodeValue';

const { Search } = Input;
const { TextArea } = Input;

const RegistrationForm = (props) => {
    const { formName, registrationForm, formData, typeData, handleFormValueChange, handleBookingNumberSearch, handleEmployeeNameSearch, isVehicleInvoiceDataLoading, handleBookingChange, salesConsultantLovData } = props;

    const handleSaleTypeChange = (value, recordValue) => {
        console.log('recordValue', value, recordValue);
        if (value === 'DMFOC') {
        }
        registrationForm.setFieldsValue({ bookingNumber: '67KLGYH90', vin: 'MK7867878KL' });
    };

    return (
        <>
            <Form layout="vertical" autoComplete="off" form={registrationForm} onFieldsChange={handleFormValueChange}>
                <Row gutter={16}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item initialValue={formData?.saleType} label="Sale Type" name="saleType" rules={[validateRequiredSelectField('Sale Type')]}>
                            {customSelectBox({ data: typeData?.[PARAM_MASTER.DLVR_SALE_TYP.id], placeholder: preparePlaceholderSelect('Sale Type'), onChange: handleSaleTypeChange })}
                        </Form.Item>
                    </Col>
                    {registrationForm.getFieldValue('saleType') === 'DMFOC' && (
                        <>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                <Form.Item label="Booking Number" name="bookingNumber" rules={[validateRequiredInputField('Booking Number')]}>
                                    <Search maxLength={50} placeholder={preparePlaceholderText('Booking Number')} loading={isVehicleInvoiceDataLoading} onSearch={(value) => handleBookingNumberSearch(value)} allowClear onChange={handleBookingChange} />
                                </Form.Item>
                            </Col>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                <Form.Item label="VIN" name="vin" rules={[validateRequiredInputField('vin')]}>
                                    <Input disabled maxLength={50} placeholder={preparePlaceholderText('vin')} />
                                </Form.Item>
                            </Col>
                        </>
                    )}
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Employee Name" name="employeeName" rules={[validateRequiredInputField('Employee Name')]}>
                            <Search maxLength={50} placeholder={preparePlaceholderText('Employee Name')} loading={isVehicleInvoiceDataLoading} onSearch={(value) => handleEmployeeNameSearch(value)} allowClear />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Manager Name" name="managerName" rules={[validateRequiredInputField('Manager Name')]}>
                            <Input disabled maxLength={50} placeholder={preparePlaceholderText('Manager Name')} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Form.Item initialValue={formData?.remarks} label="Remarks" name="remarks" rules={[validateRequiredSelectField('Remarks')]}>
                            <TextArea maxLength={300} placeholder={preparePlaceholderText('Remarks')} showCount />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export default RegistrationForm;
