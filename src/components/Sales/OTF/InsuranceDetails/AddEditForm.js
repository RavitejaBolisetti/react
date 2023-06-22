import React from 'react';
import { Col, Input, Form, Row, DatePicker, Space, Card } from 'antd';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import styles from 'components/common/Common.module.css';
import { convertCalenderDate } from 'utils/formatDateTime';

const AddEditFormMain = (props) => {
    const { form, onFinishFailed, insuranceData, userId, onFinish } = props;
    const { buttonData, setButtonData } = props;

    const toDateInitialValue = { initialValue: convertCalenderDate(insuranceData?.insuranceDate, 'YYYY/MM/DD') };
    const [customerForm] = Form.useForm();

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleFormFieldChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    return (
        <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Space style={{ display: 'flex' }} size="middle" direction="vertical">
                        <Card style={{ backgroundColor: '#f2f2f2' }}>
                            <Form autoComplete="off" layout="vertical" form={customerForm}>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={insuranceData?.insuranceCompany} label="Insurance Company" name="insuranceCompany">
                                            <Input className={styles.inputBox} placeholder={preparePlaceholderText('Insurance Company')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={insuranceData?.insuranceCoverNote} label="Insurance Cover Note" name="insuranceCoverNote">
                                            <Input className={styles.inputBox} placeholder={preparePlaceholderText('Insurance Cover Note')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={insuranceData?.insuranceAmount} label="Insurance Amount" name="insuranceAmount">
                                            <Input className={styles.inputBox} placeholder={preparePlaceholderText('Insurance Amount')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item {...toDateInitialValue} label="Date" name="insuranceDate">
                                            <DatePicker className={styles.inputBox} placeholder={preparePlaceholderText('Date')} style={{ width: '100%' }} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={insuranceData?.registrationNumber} label="Registration Number" name="registrationNumber">
                                            <Input className={styles.inputBox} placeholder={preparePlaceholderText('Registration Number')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        </Card>
                    </Space>
                </Col>
            </Row>
        </Form>
    );
};

export const AddEditForm = AddEditFormMain;
