/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';

import styles from 'components/common/Common.module.css';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

import { Col, Input, Form, Row, Card } from 'antd';
const { TextArea } = Input;

const AddEditFormMain = (props) => {
    const { formData, form, formdata, onFinishFailed, onFinish } = props;

    useEffect(() => {
        if (formdata) {
            form.setFieldsValue({
                customerId: formdata?.customerCode,
                customerName: formdata?.customerName,
                make: formdata?.make,
                modelGroup: formdata?.vehicleModelGroup,
                variant: formdata?.variantName,
                oldRegNumber: formdata?.registrationNumber,
                oldChassisNumber: formdata?.oldChassisNumber,
                dob: formdata?.customerDOB,
                relationship: formdata?.relationName,
                year: formdata?.registrationYear,
                month: formdata?.registrationMonth,
                usage: formdata?.vehicleUsage,
                schemeName: formdata?.schemeName,
                schemeAmount: formdata?.schemeBase,
                remarks: formdata?.remarks,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formdata]);

    return (
        <Card className={styles.ExchangeCard}>
            <Form form={form} autoComplete="off" layout="vertical" colon={false} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="customerId" label="Customer ID" initialValue={formData?.customerId}>
                            <Input maxLength={6} placeholder={preparePlaceholderText('id')} disabled={true} />
                        </Form.Item>
                    </Col>

                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="customerName" label="Customer Name" initialValue={formData?.customerName}>
                            <Input disabled={true} placeholder={preparePlaceholderText('customer name')} maxLength={50} />
                        </Form.Item>
                    </Col>

                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="make" label="Make" initialValue={formData?.make}>
                            <Input disabled={true} placeholder={preparePlaceholderText('make')} maxLength={50} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="modelGroup" label="Model Group" initialValue={formData?.modelGroup}>
                            <Input maxLength={6} placeholder={preparePlaceholderText('Model Group')} disabled={true} />
                        </Form.Item>
                    </Col>

                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="variant" label="Variant" initialValue={formData?.variant}>
                            <Input disabled={true} placeholder={preparePlaceholderText('variant')} maxLength={50} />
                        </Form.Item>
                    </Col>

                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="oldRegNumber" label="Old Registration No" initialValue={formData?.oldRegNumber}>
                            <Input disabled={true} placeholder={preparePlaceholderText('old registration no')} maxLength={50} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="oldChassisNumber" label="Old Chassis No" initialValue={formData?.oldChassisNumber}>
                            <Input maxLength={50} placeholder={preparePlaceholderText('old chassis no')} disabled={true} />
                        </Form.Item>
                    </Col>

                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="dob" label="Date Of Birth" initialValue={formData?.dob}>
                            <Input disabled={true} placeholder={preparePlaceholderText('date of birth')} maxLength={50} />
                        </Form.Item>
                    </Col>

                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="relationship" label="Relationship" initialValue={formData?.relationship}>
                            <Input disabled={true} placeholder={preparePlaceholderText('relationship')} maxLength={50} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="year" label="Year Of Registration" initialValue={formData?.year}>
                            <Input disabled={true} maxLength={50} placeholder={preparePlaceholderText('year of registration')} />
                        </Form.Item>
                    </Col>

                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="month" label="Month Of Registration" initialValue={formData?.month}>
                            <Input disabled={true} placeholder={preparePlaceholderText('month of registration')} maxLength={50} />
                        </Form.Item>
                    </Col>

                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="usage" label="Usage" initialValue={formData?.usage}>
                            <Input disabled={true} placeholder={preparePlaceholderText('usage')} maxLength={50} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="schemeName" label="Scheme Name" initialValue={formData?.schemeName}>
                            <Input disabled={true} maxLength={50} placeholder={preparePlaceholderText('scheme name')} />
                        </Form.Item>
                    </Col>

                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="schemeAmount" label="Scheme Amount" initialValue={formData?.schemeAmount}>
                            <Input disabled={true} placeholder={preparePlaceholderText('scheme amount')} maxLength={50} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Form.Item name="remarks" label="Remarks" initialValue={formData?.remarks}>
                            <TextArea disabled={true} placeholder={preparePlaceholderText('remarks')} maxLength={300} showCount />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Card>
    );
};

export const AddEditForm = AddEditFormMain;
