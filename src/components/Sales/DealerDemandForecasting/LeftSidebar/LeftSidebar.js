/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
//import React from 'react';
import React, { useState, useEffect } from 'react';
// import MenuNav from './MenuNav';
import ClaimDetailCard from './demandForecastingDetailCard';
import { Row, Col, Card, Button, Form, Input, Upload, Typography, Descriptions, Collapse, Divider } from 'antd';
import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';
import { validateRequiredSelectField } from 'utils/validation';
import { customSelectBox } from 'utils/customSelectBox';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
const disabledProps = { disabled: true };

const LeftSidebar = (props) => {
    const { previousSection, setPreviousSection, currentSection, handleFormValueChange, addressForm } = props;
    if (currentSection > previousSection) setPreviousSection(currentSection);

    const [dlrName, setDlrName] = useState(false);

    const handleDlrChange = (value) => {
        const name = dealerCode.find((el) => el.key === value).key;
        setDlrName(name);
    };
    const dealerCode = [
        { key: 'Nbs International Ltd.', value: 'SMO11151' },
        { key: 'Bhavna Automobiles Pvt. Ltd.', value: 'SMO11152' },
        { key: 'Prime Automobiles Pvt Ltd', value: 'SMO11153' },
        { key: 'Koncept Automobiles Pvt. Ltd.', value: 'SMO11154' },
    ];
    const finYear = [
        { key: '1', value: '2023-2024' },
        { key: '2', value: '2024-2025' },
        { key: '3', value: '2025-2026' },
        { key: '4', value: '2026-2027' },
        { key: '5', value: '2027-2028' },
    ];

    const month = [
        { key: '1', value: 'March' },
        { key: '2', value: 'April' },
        { key: '3', value: 'May' },
        { key: '4', value: 'June' },
        { key: '5', value: 'July' },
        { key: '6', value: 'August' },
        { key: '7', value: 'September' },
    ];

    return (
        <>
            {/* <ClaimDetailCard {...props} /> */}
            <Form form={addressForm} id="myAdd" onFieldsChange={handleFormValueChange} autoComplete="off" layout="vertical">
                {/* //    <Row gutter={20}> */}
                <Card>
                    {/* <Row align="middle">
                        <Text strong> {'Change Request'}</Text>
                    </Row> */}
                    {/* <Divider className={styles.marT20} /> */}
                    <Row gutter={24}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item label={translateContent('demandForecasting.label.dealerCode')} name="dealerCode" rules={[validateRequiredSelectField(translateContent('demandForecasting.validation.dealerCode'))]}>
                                {customSelectBox({ onChange: handleDlrChange, data: dealerCode, placeholder: preparePlaceholderSelect(translateContent('demandForecasting.label.dealerCode')) })}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item label={translateContent('demandForecasting.label.dealerName')}>
                                <Input value={dlrName} placeholder={preparePlaceholderText(translateContent('demandForecasting.placeholder.dealerName'))} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item label={translateContent('demandForecasting.label.finYear')} name="finYear" rules={[validateRequiredSelectField(translateContent('demandForecasting.validation.finYear'))]}>
                                {customSelectBox({ data: finYear, placeholder: preparePlaceholderSelect(translateContent('demandForecasting.label.finYear')) })}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item label={translateContent('demandForecasting.label.month')} name="month" rules={[validateRequiredSelectField(translateContent('demandForecasting.validation.month'))]}>
                                {customSelectBox({ data: month, placeholder: preparePlaceholderSelect(translateContent('demandForecasting.label.month')) })}
                            </Form.Item>
                        </Col>
                    </Row>

                    {/* <Col xs={24} sm={8} md={8} lg={8} xl={8} className={`${styles.leftPannelButton} ${styles.marT20}`}>
                            <Button type="primary" onClick={() => setIsDataFetch((prev) => !prev)}>
                                View Model Forecasting Details
                            </Button>
                        </Col> */}
                </Card>
                {/* Drawer data  */}
            </Form>
            <div>
                <Row gutter={20}>
                    <Col xs={24} sm={20} md={20} lg={20} xl={20}>
                        <Button type="primary">Upload Forecasting Data</Button>
                    </Col>
                </Row>
                <Row gutter={20} className={styles.marT5}>
                    <Col xs={24} sm={20} md={20} lg={20} xl={20}>
                        <Button type="primary">Download Template</Button>
                    </Col>
                </Row>
            </div>
            {/* <MenuNav {...props} /> */}
        </>
    );
};

export default LeftSidebar;
