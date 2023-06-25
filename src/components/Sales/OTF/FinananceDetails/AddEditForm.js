/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Col, Input, Form, Row, Select, Card, DatePicker, Space } from 'antd';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { validateNumberWithTwoDecimalPlaces } from 'utils/validation';

import dayjs from 'dayjs';

import styles from 'components/common/Common.module.css';

const { Option } = Select;

const AddEditFormMain = (props) => {
    const { formData, FinanceLovData } = props;
    const [doReceived, setDoReceived] = useState(formData?.doReceived || 'No');

    const datePickerStyle = {
        width: '100%',
    };

    const handleDOChange = (item) => {
        setDoReceived(item);
    };

    const selectProps = {
        optionFilterProp: 'children',
        showSearch: true,
        allowClear: true,
        className: styles.headerSelectField,
    };
    return (
        <>
            <div className={styles.drawerCustomerMaster}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Space style={{ display: 'flex' }} size="middle" direction="vertical">
                            <Card style={{ backgroundColor: '#F2F2F2' }}>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.financier} label="Financier" name="financier" placeholder={preparePlaceholderSelect('Select')}>
                                            <Select disabled={false} loading={false} placeholder="Select" {...selectProps}>
                                                {FinanceLovData?.map((item) => (
                                                    <Option key={item?.key} value={item?.key}>
                                                        {item?.value}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.branch} label="Branch" name="branch">
                                            <Input placeholder={preparePlaceholderText('branch')} maxLength={55} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.fileNumber} label="File Number" name="fileNumber">
                                            <Input placeholder={preparePlaceholderText('file number')} maxLength={55} />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.loanAmount} label="Loan Amount" name="loanAmount" rules={[validateNumberWithTwoDecimalPlaces('loan amount')]}>
                                            <Input placeholder={preparePlaceholderText('loan amount')} maxLength={55} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.emi} label="EMI" name="emi" rules={[validateNumberWithTwoDecimalPlaces('emi')]}>
                                            <Input placeholder={preparePlaceholderText('emi')} maxLength={55} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.doReceived} label="D.O. Recived" name="doReceived">
                                            <Select onChange={handleDOChange} placeholder="Select" {...selectProps}>
                                                <Option value="yes">Yes</Option>
                                                <Option value="no">No</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    {doReceived === 'yes' && (
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item initialValue={formData?.doNumber} label="D.O. Number" name="doNumber">
                                                <Input placeholder={preparePlaceholderText('d.o. number')}></Input>
                                            </Form.Item>
                                        </Col>
                                    )}
                                    {doReceived === 'yes' && (
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item initialValue={formData?.doDate ? dayjs(formData?.doDate) : null} label="D.O. Date" name="doDate">
                                                <DatePicker disabledDate={(date) => date > dayjs()} placeholder={preparePlaceholderSelect('date')} style={datePickerStyle} />
                                            </Form.Item>
                                        </Col>
                                    )}
                                </Row>
                            </Card>
                        </Space>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export const AddEditForm = AddEditFormMain;
