import React, { useEffect } from 'react';

import styles from 'components/common/Common.module.css';
import { ViewDetail } from './ViewDetail';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

import { validateRequiredInputField } from 'utils/validation';
import { Col, Input, Form, Row, Card, Skeleton } from 'antd';
const { TextArea } = Input;

const AddEditFormMain = (props) => {
    const { formActionType, formData, form, formdata, isLoyaltySchemeDataLoaded, onFinishFailed, onFinish } = props;
    useEffect(() => {
        if (formdata) {
            form.setFieldsValue({
                customerId: formdata?.customerCode,
                customerName: formdata?.customerName,
                make: formdata?.vehicleManufactureCode,
                modelGroup: formdata?.vehicleModelCode,
                variant: formdata?.variantDescription,
                oldRegNumber: formdata?.registrationNumber,
                oldChassisNumber: formdata?.oldChassisNumber,
                dob: formdata?.customerDOB,
                relationship: formdata?.relationCode,
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
    const viewProps = {
        styles,
        customerForm: formdata,
        isLoyaltySchemeDataLoaded,
    };

    return !formActionType?.viewMode ? (
        <Skeleton loading={!isLoyaltySchemeDataLoaded}>
            <Card className={styles.ExchangeCard}>
                <Form form={form} autoComplete="off" layout="vertical" colon={false} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                    <Row gutter={20}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="customerId" label="Customer ID" initialValue={formData?.customerId} rules={[validateRequiredInputField('id')]}>
                                <Input maxLength={6} placeholder={preparePlaceholderText('id')} disabled={true} />
                            </Form.Item>
                        </Col>

                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="customerName" label="Customer Name" initialValue={formData?.customerName} rules={[validateRequiredInputField('customer name')]}>
                                <Input disabled={true} placeholder={preparePlaceholderText('customer name')} maxLength={50} />
                            </Form.Item>
                        </Col>

                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="make" label="Make" initialValue={formData?.make} rules={[validateRequiredInputField('Make')]}>
                                <Input disabled={true} placeholder={preparePlaceholderText('make')} maxLength={50} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="modelGroup" label="Model Group" initialValue={formData?.modelGroup} rules={[validateRequiredInputField('Model Group')]}>
                                <Input maxLength={6} placeholder={preparePlaceholderText('Model Group')} disabled={true} />
                            </Form.Item>
                        </Col>

                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="variant" label="Variant" initialValue={formData?.variant} rules={[validateRequiredInputField('Variant')]}>
                                <Input disabled={true} placeholder={preparePlaceholderText('variant')} maxLength={50} />
                            </Form.Item>
                        </Col>

                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="oldRegNumber" label="Old Registration No" initialValue={formData?.oldRegNumber} rules={[validateRequiredInputField('Old Registration No')]}>
                                <Input disabled={true} placeholder={preparePlaceholderText('old registration no')} maxLength={50} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="oldChassisNumber" label="Old Chassis No" initialValue={formData?.oldChassisNumber} rules={[validateRequiredInputField('Old Chassis No')]}>
                                <Input maxLength={50} placeholder={preparePlaceholderText('old chassis no')} disabled={true} />
                            </Form.Item>
                        </Col>

                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="dob" label="Date Of Birth" initialValue={formData?.dob} rules={[validateRequiredInputField('Date Of Birth')]}>
                                <Input disabled={true} placeholder={preparePlaceholderText('date of birth')} maxLength={50} />
                            </Form.Item>
                        </Col>

                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="relationship" label="Relationship" initialValue={formData?.relationship} rules={[validateRequiredInputField('Relationship')]}>
                                <Input disabled={true} placeholder={preparePlaceholderText('relationship')} maxLength={50} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="year" label="Year Of Registration" initialValue={formData?.year} rules={[validateRequiredInputField('Year Of Registration')]}>
                                <Input disabled={true} maxLength={50} placeholder={preparePlaceholderText('year of registration')} />
                            </Form.Item>
                        </Col>

                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="month" label="Month Of Registration" initialValue={formData?.month} rules={[validateRequiredInputField('Month Of Registration')]}>
                                <Input disabled={true} placeholder={preparePlaceholderText('month of registration')} maxLength={50} />
                            </Form.Item>
                        </Col>

                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="usage" label="Usage" initialValue={formData?.usage} rules={[validateRequiredInputField('Usage')]}>
                                <Input disabled={true} placeholder={preparePlaceholderText('usage')} maxLength={50} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="schemeName" label="Scheme Name" initialValue={formData?.schemeName} rules={[validateRequiredInputField('schemeName')]}>
                                <Input disabled={true} maxLength={50} placeholder={preparePlaceholderText('scheme name')} />
                            </Form.Item>
                        </Col>

                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="schemeAmount" label="Scheme Amount" initialValue={formData?.schemeAmount} rules={[validateRequiredInputField('Scheme Amount')]}>
                                <Input disabled={true} placeholder={preparePlaceholderText('scheme amount')} maxLength={50} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <Form.Item name="remarks" label="Remarks" initialValue={formData?.remarks} rules={[validateRequiredInputField('Remarks')]}>
                                <TextArea disabled={true} placeholder={preparePlaceholderText('remarks')} maxLength={200} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </Skeleton>
    ) : (
        <ViewDetail {...viewProps} />
    );
};

export const AddEditForm = AddEditFormMain;
