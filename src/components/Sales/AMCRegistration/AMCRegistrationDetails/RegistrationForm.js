/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Form, Input, AutoComplete } from 'antd';
import { validateRequiredSelectField, validateRequiredInputField } from 'utils/validation';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { customSelectBox } from 'utils/customSelectBox';
import { PARAM_MASTER } from 'constants/paramMaster';
import { AMC_CONSTANTS } from '../utils/AMCConstants';
import styles from 'assets/sass/app.module.scss';

const { Search } = Input;
const { TextArea } = Input;

const RegistrationForm = (props) => {
    const { options, handleOnSelect, handleOnClear, registrationForm, formData, typeData, handleFormValueChange, handleBookingNumberSearch, isEmployeeDataLoading, handleEmployeeNameSearch, isVehicleInvoiceDataLoading } = props;

    return (
        <>
            <Form layout="vertical" autoComplete="off" form={registrationForm} onFieldsChange={handleFormValueChange}>
                <Row gutter={16}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item initialValue={formData?.saleType} label="Sale Type" name="saleType" rules={[validateRequiredSelectField('Sale Type')]}>
                            {customSelectBox({ data: typeData?.[PARAM_MASTER.DLVR_SALE_TYP.id], placeholder: preparePlaceholderSelect('Sale Type') })}
                        </Form.Item>
                    </Col>
                    {registrationForm.getFieldValue('saleType') === AMC_CONSTANTS?.MNM_FOC?.key && (
                        <>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                <Form.Item label="Booking Number" name="bookingNumber" rules={[validateRequiredInputField('Booking Number')]}>
                                    <Search maxLength={50} placeholder={preparePlaceholderText('Booking Number')} loading={isVehicleInvoiceDataLoading} onSearch={(value) => handleBookingNumberSearch(value)} allowClear />
                                </Form.Item>
                            </Col>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                <Form.Item label="VIN" name="vin">
                                    <Input disabled maxLength={50} placeholder={preparePlaceholderText('vin')} />
                                </Form.Item>
                            </Col>
                        </>
                    )}
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Employee Name" name="employeeName" rules={[validateRequiredInputField('Employee Name')]}>
                            <AutoComplete maxLength={50} options={options} onSelect={handleOnSelect} getPopupContainer={(triggerNode) => triggerNode.parentElement}>
                                <Search onSearch={handleEmployeeNameSearch} onChange={handleOnClear} placeholder="Search" loading={isEmployeeDataLoading} type="text" allowClear />
                            </AutoComplete>
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Manager Name" name="managerName">
                            <Input disabled maxLength={50} placeholder={preparePlaceholderText('Manager Name')} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.textareaError}>
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
