/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Col, Input, Form, Row, DatePicker, Space, Card, Select } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { showGlobalNotification } from 'store/actions/notification';
import { partyMasterDataActions } from 'store/actions/data/partyMaster';

import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { formattedCalendarDate, dateFormat } from 'utils/formatDateTime';
import { validateNumberWithTwoDecimalPlaces } from 'utils/validation';
import { disableFutureDate } from 'utils/disableDate';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            OTF: {
                InsuranceDetail: { isLoaded: isDataLoaded = false, isLoading, data: insuranceData = [] },
            },
            PartyMaster: { isFilteredListLoaded: isInsuranceCompanyDataLoaded = false, detailData: insuranceCompanies },
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
            fetchInsuranceCompanyList: partyMasterDataActions.fetchDetail,
            listInsuranceShowLoading: partyMasterDataActions.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

const AddEditFormMain = (props) => {
    const { userId, isInsuranceCompanyDataLoaded, listInsuranceShowLoading, fetchInsuranceCompanyList, insuranceCompanies, formActionType } = props;
    const { formData, form } = props;
    const { Option } = Select;
    console.log('formDataInsurance>>>', formData);

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
            fetchInsuranceCompanyList({ setIsLoading: listInsuranceShowLoading, userId, extraParams });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, !isInsuranceCompanyDataLoaded]);

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
                                <Form.Item label="Insurance Company" name="insuranceCompany" initialValue={formData?.insuranceCompany}>
                                    <Select placeholder={preparePlaceholderSelect('Insurance Company')}>
                                        {insuranceCompanies?.map((item) => (
                                            <Option value={item?.key} key={item?.key}>
                                                {item?.value}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item label="Insurance Cover Note" name="insuranceCoverNote" initialValue={formData?.insuranceCoverNote}>
                                    <Input placeholder={preparePlaceholderText('Insurance Cover Note')} maxLength={55} />
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item label="Insurance Amount" name="insuranceAmount" initialValue={formData?.insuranceAmount} rules={[validateNumberWithTwoDecimalPlaces('insurance amount')]}>
                                    <Input placeholder={preparePlaceholderText('Insurance Amount')} maxLength={20} />
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item label="Insurance Cover Note Date" name="insuranceDate" initialValue={formData?.insuranceDate}>
                                    <DatePicker disabledDate={disableFutureDate} format={dateFormat} placeholder={preparePlaceholderSelect('Date')} />
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item label="Registration Number" name="registrationNumber" initialValue={formData?.registrationNumber}>
                                    <Input placeholder={preparePlaceholderText('Registration Number')} maxLength={20} />
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
