/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useMemo } from 'react';
import { Form, Col, Row, Card, Space, Input } from 'antd';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { convertDateTimedayjs, dateFormatView } from 'utils/formatDateTime';
import { CardSkeleton } from 'components/common/Skeleton';

export const AddEditForm = (props) => {
    const { formData, isReadOnly = true, form } = props;
    const disabledProps = { disabled: isReadOnly };

    useEffect(() => {
        if (formData) {
            form.setFieldsValue({ ...formData, indentDate: convertDateTimedayjs(formData?.indentDate, dateFormatView) });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    if (!formData) return <CardSkeleton title={false} contentHeight={230} />;

    return (
        <>
            <div className={styles.drawerCustomerMaster}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Space style={{ display: 'flex' }} size="middle" direction="vertical">
                            <Card style={{ backgroundColor: '#F2F2F2' }}>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item initialValue={formData?.indentNumber} label={translateContent('coDealer.label.indentDetails.indentNumber')} name="indentNumber" data-testid="indent number">
                                            <Input placeholder={preparePlaceholderText(translateContent('coDealer.label.indentDetails.indentNumber'))} {...disabledProps} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item label={translateContent('coDealer.label.indentDetails.indentDate')} name="indentDate" data-testid="indent date">
                                            <Input placeholder={preparePlaceholderText(translateContent('coDealer.label.indentDetails.indentDate'))} {...disabledProps} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item initialValue={formData?.dealerCode} label={translateContent('coDealer.label.indentDetails.dealerCode')} name="dealerCode" data-testid="dealer code">
                                            <Input placeholder={preparePlaceholderText(translateContent('coDealer.label.indentDetails.dealerCode'))} {...disabledProps} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item initialValue={formData?.dealerName} label={translateContent('coDealer.label.indentDetails.dealerName')} name="dealerName" data-testid="dealer name">
                                            <Input placeholder={preparePlaceholderText(translateContent('coDealer.label.indentDetails.dealerName'))} {...disabledProps} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item initialValue={formData?.address} label={translateContent('coDealer.label.indentDetails.address')} name="address" data-testid="address">
                                            <Input placeholder={preparePlaceholderText(translateContent('coDealer.label.indentDetails.address'))} {...disabledProps} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item initialValue={formData?.city} label={translateContent('coDealer.label.indentDetails.cityDistrict')} name="city" data-testid="citydistrict">
                                            <Input placeholder={preparePlaceholderText(translateContent('coDealer.label.indentDetails.cityDistrict'))} {...disabledProps} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item initialValue={formData?.state} label={translateContent('coDealer.label.indentDetails.state')} name="state" data-testid="state">
                                            <Input placeholder={preparePlaceholderText(translateContent('coDealer.label.indentDetails.state'))} {...disabledProps} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item initialValue={formData?.pinCode} label={translateContent('coDealer.label.indentDetails.pinCode')} name="pinCode" data-testid="pincode">
                                            <Input placeholder={preparePlaceholderText(translateContent('coDealer.label.indentDetails.pinCode'))} {...disabledProps} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item initialValue={formData?.gstIn} label={translateContent('coDealer.label.indentDetails.gstIn')} name="gstIn" data-testid="gstIn">
                                            <Input placeholder={preparePlaceholderText(translateContent('coDealer.label.indentDetails.gstIn'))} {...disabledProps} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Card>
                        </Space>
                    </Col>
                </Row>
            </div>
        </>
    );
};
