/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Col, Input, Form, Row, DatePicker, Space, Card, Select } from 'antd';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { formattedCalendarDate, dateFormat } from 'utils/formatDateTime';
import { validateNumberWithTwoDecimalPlaces } from 'utils/validation';
import { disableFutureDate } from 'utils/disableDate';
import { customSelectBox } from 'utils/customSelectBox';
import { PAGE_TYPE } from 'components/Sales/VehicleDeliveryNote/utils/pageType';

const AddEditFormMain = (props) => {
    const { formData, form, pageType,insuranceCompanies } = props;
    const { Option } = Select;

    useEffect(() => {
        if (formData) {
            form.setFieldsValue({ ...formData, insuranceDate: formattedCalendarDate(formData?.insuranceDate) });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    return (
        <Row gutter={20}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Space style={{ display: 'flex' }} size="middle" direction="vertical">
                    <Card style={{ backgroundColor: '#f2f2f2' }}>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item label="Insurance Company" name="insuranceCompany">
                                    {pageType === PAGE_TYPE?.OTF_PAGE_TYPE?.key && (
                                        <Select placeholder={preparePlaceholderSelect('Insurance Company')}>
                                            {insuranceCompanies?.map((item) => (
                                                <Option value={item?.partyName} key={'ic' +item?.partyCode}>{item?.partyName}</Option>
                                            ))}
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item label="Insurance Cover Note" name="insuranceCoverNote">
                                    <Input placeholder={preparePlaceholderText('Insurance Cover Note')} maxLength={55} />
                                </Form.Item>
                            </Col>
                            {pageType != PAGE_TYPE?.OTF_PAGE_TYPE?.key && (
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item label="Cover Note Date" name="coverNoteDate">
                                        <DatePicker disabledDate={disableFutureDate} format={dateFormat} placeholder={preparePlaceholderSelect('Cover Note Date')} />
                                    </Form.Item>
                                </Col>
                            )}
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item label="Insurance Amount" name="insuranceAmount" rules={[validateNumberWithTwoDecimalPlaces('insurance amount')]}>
                                    <Input placeholder={preparePlaceholderText('Insurance Amount')} maxLength={20} />
                                </Form.Item>
                            </Col>
                            {pageType === PAGE_TYPE?.OTF_PAGE_TYPE?.key && (
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item label="Date" name="insuranceDate">
                                        <DatePicker disabledDate={disableFutureDate} format={dateFormat} placeholder={preparePlaceholderSelect('Date')} />
                                    </Form.Item>
                                </Col>
                            )}
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item label="Registration Number" name="registrationNumber">
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

export const AddEditForm = AddEditFormMain;
