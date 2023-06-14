import React from 'react';

import { Col, Input, Form, Row, Select, DatePicker, Switch, Card } from 'antd';
import { validateRequiredSelectField, validateRequiredInputField } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { ViewDetail } from './ViewDetail';
import styles from 'components/common/Common.module.css';

const { Option } = Select;

function AddEditForm(props) {
    const { form, formData, formActionType, onFinish, onFinishFailed } = props;

    return (
        <>
            {!formActionType?.viewMode ? (
                <Card className={styles.drawerCardView}>
                    <Form id="myform" form={form} autoComplete="off" layout="vertical" colon={false} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                        <Row gutter={20}>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                <Form.Item label="Initial Promise Delivery Date" name="initialPromiseDeliveryDate">
                                    <DatePicker format="DD-MM-YYYY" style={{ display: 'auto', width: '100%' }} />
                                </Form.Item>
                            </Col>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                <Form.Item label="Cust. Expected Delivery Date" name="custExpectedDeliveryDate">
                                    <DatePicker format="DD-MM-YYYY" style={{ display: 'auto', width: '100%' }} />
                                </Form.Item>
                            </Col>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                <Form.Item name="saleType" label="Sale Type">
                                    <Select placeholder="Select" showSearch allowClear>
                                        <Option value="GST">GST</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                <Form.Item label="Price Type" name="priceType" rules={[validateRequiredInputField('Initial Promise Delivery Date')]}>
                                    <Select placeholder="Select" showSearch allowClear>
                                        <Option value="Price Type">Price Type</Option>
                                    </Select>{' '}
                                </Form.Item>
                            </Col>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                <Form.Item label="Booking Amount" name="bookingAmount" rules={[validateRequiredInputField('Booking Amount')]}>
                                    <Input maxLength={10} placeholder={preparePlaceholderText('Booking Amount')} disabled={formActionType?.editMode ? true : false} />
                                </Form.Item>
                            </Col>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                <Form.Item name="salesConsultant" label="Sales Consultant" initialValue={formData?.salesConsultant} rules={[validateRequiredSelectField('Sales Consultant')]}>
                                    <Select placeholder="Select" showSearch allowClear>
                                        <Option value="salesConsultant">salesConsultant</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                <Form.Item label="Special Request" name="specialRequest" rules={[validateRequiredInputField('Special Request')]}>
                                    <Input maxLength={50} placeholder={preparePlaceholderText('Special Request')} disabled={formActionType?.editMode ? true : false} />
                                </Form.Item>
                            </Col>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                <Form.Item label="Place Of Registration" name="placeOfRegistration" rules={[validateRequiredInputField('Place Of Registration')]}>
                                    <Input maxLength={10} placeholder={preparePlaceholderText('Place Of Registration')} disabled={formActionType?.editMode ? true : false} />
                                </Form.Item>
                            </Col>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                <Form.Item name="financeAgreed" label="Finance Agreed" initialValue={formData?.financeAgreed} rules={[validateRequiredSelectField('Finance Agreed')]}>
                                    <Select placeholder="Select" showSearch allowClear>
                                        <Option value="financeAgreed">financeAgreed</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                <Form.Item label="Delivery At" name="deliveryAt" rules={[validateRequiredInputField('Delivery At')]}>
                                    <Select placeholder="Select" showSearch allowClear>
                                        <Option value="deliveryAt">deliveryAt</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                <Form.Item label="Referral" name="referral" rules={[validateRequiredInputField('Referral')]}>
                                    <Input maxLength={50} placeholder={preparePlaceholderText('Referral')} disabled={formActionType?.editMode ? true : false} />
                                </Form.Item>
                            </Col>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                <Form.Item name="influencerMitraType" label="Influencer/Mitra Type" initialValue={formData?.influencerMitraType} rules={[validateRequiredInputField('Influencer/Mitra Type')]}>
                                    <Input maxLength={50} placeholder={preparePlaceholderText('Influencer/Mitra Type')} disabled={formActionType?.editMode ? true : false} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                <Form.Item name="influencerMitraName" label="Influencer/Mitra Name" initialValue={formData?.influencerMitraType} rules={[validateRequiredInputField('Influencer/Mitra Name')]}>
                                    <Input maxLength={50} placeholder={preparePlaceholderText('Influencer/Mitra Name')} disabled={formActionType?.editMode ? true : false} />
                                </Form.Item>
                            </Col>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                <Form.Item label="Mode Of Payment" name="modeOfPayment" rules={[validateRequiredInputField('Mode Of Payment')]}>
                                    <Input maxLength={50} placeholder={preparePlaceholderText('Mode Of Payment')} disabled={formActionType?.editMode ? true : false} />
                                </Form.Item>
                            </Col>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                <Form.Item name="financeArrangedBy" label="Finance Arranged By" initialValue={formData?.financeArrangedBy} rules={[validateRequiredSelectField('Finance Arranged By')]}>
                                    <Select placeholder="Select" showSearch allowClear>
                                        <Option value="financeArrangedBy">financeArrangedBy</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                <Form.Item initialValue={formActionType?.editMode ? formData?.status : true} labelAlign="left" wrapperCol={{ span: 24 }} name="status" label="Exchange" valuePropName="checked">
                                    <Switch checkedChildren="Active" unCheckedChildren="Inactive" valuePropName="checked" onChange={(checked) => (checked ? 1 : 0)} />
                                </Form.Item>
                            </Col>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                <Form.Item initialValue={formActionType?.editMode ? formData?.status : true} labelAlign="left" wrapperCol={{ span: 24 }} name="status" label="Loyality Scheme" valuePropName="checked">
                                    <Switch checkedChildren="Active" unCheckedChildren="Inactive" valuePropName="checked" onChange={(checked) => (checked ? 1 : 0)} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Card>
            ) : (
                <ViewDetail />
            )}
        </>
    );
}

export default AddEditForm;
