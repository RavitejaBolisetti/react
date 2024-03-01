/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Form, Input } from 'antd';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { validateRequiredInputField } from 'utils/validation';
import { customSelectBox } from 'utils/customSelectBox';
import { PARAM_MASTER } from 'constants/paramMaster';
import { translateContent } from 'utils/translateContent';
import { SCHEME_TYPE } from '../constant';

const { Search } = Input;

const EnrolmentAdd = (props) => {
    const { typeData, onHandleRegistrationNumber, isSearchLoading, onSchemeChange, schemeType, setCustomerData, setVehicleDataDetails } = props;

    return (
        <>
            <Row gutter={16}>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item label={translateContent('crmSchemeEnrolment.label.schemeType')} name="schemeType" rules={[validateRequiredInputField(translateContent('crmSchemeEnrolment.label.schemeType'))]}>
                        {customSelectBox({ data: typeData[PARAM_MASTER?.CRM_SCHEME_TYPE?.id], placeholder: preparePlaceholderSelect(translateContent('crmSchemeEnrolment.label.schemeType')), onChange: onSchemeChange })}
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item label={translateContent('crmSchemeEnrolment.label.vehicleRegistrationNumber')} name="registrationNumber" rules={[validateRequiredInputField(translateContent('crmSchemeEnrolment.label.vehicleRegistrationNumber'))]}>
                        <Search
                            placeholder={preparePlaceholderText(translateContent('crmSchemeEnrolment.label.vehicleRegistrationNumber'), false)}
                            onChange={() => {
                                setVehicleDataDetails({});
                                setCustomerData({});
                            }}
                            onSearch={onHandleRegistrationNumber}
                            loading={isSearchLoading}
                            allowClear
                        />
                    </Form.Item>
                </Col>
                {schemeType !== SCHEME_TYPE?.REFERRAL?.key && (
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item label={translateContent('crmSchemeEnrolment.label.bookletNumber')} name="bookletNumber" rules={[validateRequiredInputField(translateContent('crmSchemeEnrolment.label.bookletNumber'))]}>
                            <Input placeholder={preparePlaceholderText(translateContent('crmSchemeEnrolment.label.bookletNumber'), false)} />
                        </Form.Item>
                    </Col>
                )}

                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item label={translateContent('crmSchemeEnrolment.label.enrolledBy')} name="enrolledBy" rules={[validateRequiredInputField(translateContent('crmSchemeEnrolment.label.enrolledBy'))]}>
                        {customSelectBox({ data: typeData[PARAM_MASTER?.ENROLLED_BY?.id], placeholder: preparePlaceholderSelect(translateContent('crmSchemeEnrolment.label.enrolledBy')) })}
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
};

export default EnrolmentAdd;
