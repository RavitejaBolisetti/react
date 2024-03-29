/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Col, Input, Form, Row, DatePicker, Space, Card } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { showGlobalNotification } from 'store/actions/notification';
import { partyMasterDataActions } from 'store/actions/data/partyMaster';

import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { validateRequiredInputField } from 'utils/validation';

import { dateFormat, formattedCalendarDate } from 'utils/formatDateTime';
import { validateNumberWithTwoDecimalPlaces } from 'utils/validation';
import { disableFutureDate } from 'utils/disableDate';
import { BASE_URL_PARTY_MASTER_LOV as customURL } from 'constants/routingApi';
import { translateContent } from 'utils/translateContent';
import { customSelectBox } from 'utils/customSelectBox';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            OTF: {
                InsuranceDetail: { isLoaded: isDataLoaded = false, isLoading, data: insuranceData = [] },
            },
            PartyMaster: { isFilteredListLoaded: isInsuranceCompanyDataLoaded = false, filteredListData: insuranceCompanies },
        },
    } = state;
    const moduleTitle = 'Insurance Details';

    let returnValue = {
        userId,
        isDataLoaded,
        insuranceData,
        isLoading,
        moduleTitle,
        isInsuranceCompanyDataLoaded,
        insuranceCompanies,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchInsuranceCompanyList: partyMasterDataActions.fetchFilteredList,
            listInsuranceShowLoading: partyMasterDataActions.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

const AddEditFormMain = (props) => {
    const { deliveryNote = false, userId, isInsuranceCompanyDataLoaded, listInsuranceShowLoading, fetchInsuranceCompanyList, insuranceCompanies, formActionType } = props;
    const { formData, form } = props;

    const onErrorAction = () => {};

    useEffect(() => {
        const extraParams = [
            {
                key: 'partyType',
                title: 'partyType',
                value: 'IN',
                name: 'Party Type',
            },
        ];
        if (userId && !isInsuranceCompanyDataLoaded) {
            fetchInsuranceCompanyList({ setIsLoading: listInsuranceShowLoading, userId, extraParams, customURL, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isInsuranceCompanyDataLoaded]);

    useEffect(() => {
        if (formData) {
            form.setFieldsValue({ ...formData, insuranceDate: formattedCalendarDate(formData?.insuranceDate) });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData, formActionType, insuranceCompanies]);

    return (
        <Row gutter={20}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Space style={{ display: 'flex' }} size="middle" direction="vertical">
                    <Card style={{ backgroundColor: '#f2f2f2' }}>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item label={translateContent('commonModules.label.insuranceDetails.insuranceCompany')} name="insuranceCompany" initialValue={formData?.insuranceCompany}>
                                    {customSelectBox({ data: insuranceCompanies, placeholder: preparePlaceholderSelect(translateContent('commonModules.label.insuranceDetails.insuranceCompany')) })}
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item label={translateContent('commonModules.label.insuranceDetails.insuranceCoverNote')} name="insuranceCoverNote" initialValue={formData?.insuranceCoverNote}>
                                    <Input placeholder={preparePlaceholderText(translateContent('commonModules.label.insuranceDetails.insuranceCoverNote'))} maxLength={55} />
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item label={translateContent('commonModules.label.insuranceDetails.insuranceAmount')} name="insuranceAmount" initialValue={formData?.insuranceAmount} rules={[validateNumberWithTwoDecimalPlaces(translateContent('commonModules.label.insuranceDetails.insuranceAmount'))]}>
                                    <Input placeholder={preparePlaceholderText(translateContent('commonModules.label.insuranceDetails.insuranceAmount'))} maxLength={20} />
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item label={translateContent('commonModules.label.insuranceDetails.insuranceCoverNoteDate')} name="insuranceDate" initialValue={formattedCalendarDate(formData?.insuranceDate)}>
                                    <DatePicker disabledDate={disableFutureDate} format={dateFormat} placeholder={preparePlaceholderSelect(translateContent('commonModules.label.insuranceDetails.insuranceCoverNoteDate'))} />
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item label={translateContent('commonModules.label.insuranceDetails.registrationNumber')} name="registrationNumber" initialValue={formData?.registrationNumber} rules={deliveryNote ? [validateRequiredInputField(translateContent('commonModules.label.insuranceDetails.registrationNumber'))] : undefined}>
                                    <Input placeholder={preparePlaceholderText(translateContent('commonModules.label.insuranceDetails.registrationNumber'))} maxLength={20} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                </Space>
            </Col>
        </Row>
    );
};

export const AddEditForm = connect(mapStateToProps, mapDispatchToProps)(AddEditFormMain);
