import React from 'react';

import { Row, Col, Input, Form, Select, DatePicker, Switch, Card, Button } from 'antd';

import dayjs from 'dayjs';

import { validateRequiredSelectField, validateRequiredInputField } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

import { ViewDetail } from './ViewDetail';

import styles from 'components/common/Common.module.css';

const { Option } = Select;

function AddEditForm(props) {
    const { form, formData, formActionType, onFinish, onFinishFailed } = props;
    const innitValue = dayjs(formData?.initialPromiseDeliveryDate, 'YYYY/MM/DD');
    const expectedValue = dayjs(formData?.custExpectedDeliveryDate, 'YYYY/MM/DD');

    const viewProps = {
        formData,
    };

    return (
        <>
            {!formActionType?.viewMode ? (
                <Card className={styles.drawerCardView}>
                    <Form id="myform" form={form} autoComplete="off" layout="vertical" colon={false} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                        <Row gutter={20}>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                <Form.Item initialValue={innitValue} label="Initial Promise Delivery Date" name="initialPromiseDeliveryDate">
                                    <DatePicker format="YYYY-MM-DD" style={{ display: 'auto', width: '100%' }} />
                                </Form.Item>
                            </Col>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                <Form.Item initialValue={expectedValue} label="Cust. Expected Delivery Date" name="custExpectedDeliveryDate">
                                    <DatePicker format="YYYY-MM-DD" style={{ display: 'auto', width: '100%' }} />
                                </Form.Item>
                            </Col>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                <Form.Item initialValue={formData?.saleType} name="saleType" label="Sale Type">
                                    <Select placeholder="Select" showSearch allowClear>
                                        <Option value="GST">GST</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                <Form.Item initialValue={formData?.priceType} label="Price Type" name="priceType" rules={[validateRequiredInputField('Initial Promise Delivery Date')]}>
                                    <Select placeholder="Select" showSearch allowClear>
                                        <Option value="Price Type">Price Type</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                <Form.Item initialValue={formData?.bookingAmount} label="Booking Amount" name="bookingAmount" rules={[validateRequiredInputField('Booking Amount')]}>
                                    <Input maxLength={10} placeholder={preparePlaceholderText('Booking Amount')} disabled={formActionType?.editMode ? true : false} />
                                </Form.Item>
                            </Col>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                <Form.Item initialValue={formData?.saleConsultant} name="salesConsultant" label="Sales Consultant" rules={[validateRequiredSelectField('Sales Consultant')]}>
                                    <Select placeholder="Select" showSearch allowClear>
                                        <Option value="salesConsultant">salesConsultant</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                <Form.Item initialValue={formData?.specialRequest} label="Special Request" name="specialRequest" rules={[validateRequiredInputField('Special Request')]}>
                                    <Input maxLength={50} placeholder={preparePlaceholderText('Special Request')} disabled={formActionType?.editMode ? true : false} />
                                </Form.Item>
                            </Col>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                <Form.Item initialValue={formData?.placeOfRegistration} label="Place Of Registration" name="placeOfRegistration" rules={[validateRequiredInputField('Place Of Registration')]}>
                                    <Input maxLength={10} placeholder={preparePlaceholderText('Place Of Registration')} disabled={formActionType?.editMode ? true : false} />
                                </Form.Item>
                            </Col>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                <Form.Item initialValue={formData?.deliveryAt} label="Delivery At" name="deliveryAt" rules={[validateRequiredInputField('Delivery At')]}>
                                    <Select placeholder="Select" showSearch allowClear>
                                        <Option value="deliveryAt">deliveryAt</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                <Form.Item initialValue={formData?.referral} label="Referral" name="referral" rules={[validateRequiredInputField('Referral')]}>
                                    <Input maxLength={50} placeholder={preparePlaceholderText('Referral')} disabled={formActionType?.editMode ? true : false} />
                                </Form.Item>
                            </Col>

                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                <Form.Item initialValue={formData?.mitraType} name="mitraType" label="Influencer/Mitra Type" rules={[validateRequiredInputField('Influencer/Mitra Type')]}>
                                    <Input maxLength={50} placeholder={preparePlaceholderText('Influencer/Mitra Type')} disabled={formActionType?.editMode ? true : false} />
                                </Form.Item>
                            </Col>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                <Form.Item initialValue={formData?.mitraName} name="mitraName" label="Influencer/Mitra Name" rules={[validateRequiredInputField('Influencer/Mitra Name')]}>
                                    <Input maxLength={50} placeholder={preparePlaceholderText('Influencer/Mitra Name')} disabled={formActionType?.editMode ? true : false} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                <Form.Item
                                    initialValue={formData?.modeOfPAyment}
                                    label="Mode Of Payment"
                                    name="modeOfPAyment
"
                                    rules={[validateRequiredInputField('Mode Of Payment')]}
                                >
                                    <Input maxLength={50} placeholder={preparePlaceholderText('Mode Of Payment')} disabled={formActionType?.editMode ? true : false} />
                                </Form.Item>
                            </Col>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                <Form.Item initialValue={formData?.financeArrangedBy} name="financeArrangedBy" label="Finance Arranged By" rules={[validateRequiredSelectField('Finance Arranged By')]}>
                                    <Select placeholder="Select" showSearch allowClear>
                                        <Option value="financeArrangedBy">financeArrangedBy</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                <Form.Item initialValue={formActionType?.editMode ? formData?.exchange : true} labelAlign="left" wrapperCol={{ span: 24 }} name="exchange" label="Exchange" valuePropName="checked">
                                    <Switch checkedChildren="Active" unCheckedChildren="Inactive" valuePropName="checked" onChange={(checked) => (checked ? 1 : 0)} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                <Form.Item initialValue={formActionType?.editMode ? formData?.loyalityScheme : true} labelAlign="left" wrapperCol={{ span: 24 }} name="loyalityScheme" label="Loyality Scheme" valuePropName="checked">
                                    <Switch checkedChildren="Active" unCheckedChildren="Inactive" valuePropName="checked" onChange={(checked) => (checked ? 1 : 0)} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                <Button htmlType="submit" type="primary">
                                    Submit
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Card>
            ) : (
                <ViewDetail {...viewProps} />
            )}
        </>
    );
}

export default AddEditForm;
