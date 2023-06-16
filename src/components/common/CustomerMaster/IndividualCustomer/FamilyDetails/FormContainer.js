import React from 'react';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { Input, Select, DatePicker, Row, Col, Button, Form } from 'antd';
import styles from 'components/common/Common.module.css';
const { Option } = Select;
const { TextArea } = Input;

const FormBase = (props) => {
    const { customerType, onSave, selectRef, onFamilyFinish, onFinishFailed, familyForm, onChange, editedMode } = props;
    const type = [
        { name: 'YES', key: 1 },
        { name: 'NO', key: 0 },
    ];

    const relation = [
        { name: 'Brother', key: 'BHOTHER' },
        { name: 'Sister', key: 'SISTER' },
    ];

    return (
        <Form form={familyForm} id="familyForm" autoComplete="off" layout="vertical" onFinish={onFamilyFinish} onFinishFailed={onFinishFailed} style={{ background: 'transparent' }}>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={null} label="M&M Customer" name="mnmCustomer" rules={[validateRequiredSelectField('M&M Customer')]}>
                        <Select placeholder={preparePlaceholderText('M&M Customer')} onChange={onChange} className={styles.inputBox} allowClear ref={selectRef}>
                            {type?.map((item) => (
                                <Option key={'mc' + item?.key} value={item?.key}>
                                    {item?.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
                {customerType ? (
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item initialValue={null} label="Customer ID" name="customerId">
                            <Input maxLength={6} placeholder={preparePlaceholderText('Customer ID')} className={styles.inputBox} />
                        </Form.Item>
                    </Col>
                ) : null}

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={null} label="Customer Name" name="customerName" rules={[validateRequiredInputField('Customer Name')]}>
                        <Input maxLength={50} placeholder={preparePlaceholderText('Customer Name')} disabled={customerType} className={styles.inputBox} />
                    </Form.Item>
                </Col>
                {!customerType ? (
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item initialValue={null} label="Relationship" name="relationship" rules={[validateRequiredSelectField('Relationship')]}>
                            <Select placeholder={preparePlaceholderText('Relationship')} className={styles.inputBox} allowClear ref={selectRef} disabled={customerType}>
                                {relation?.map((item) => (
                                    <Option key={'rel' + item?.key} value={item.key}>
                                        {item?.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                ) : null}
            </Row>

            <Row gutter={20}>
                {customerType ? (
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item initialValue={null} label="Relationship" name="relationship" rules={[validateRequiredSelectField('Relationship')]}>
                            <Select placeholder={preparePlaceholderText('Relationship')} className={styles.inputBox} allowClear ref={selectRef} disabled={customerType}>
                                {relation?.map((item) => (
                                    <Option key={'rel' + item?.key} value={item.key}>
                                        {item?.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                ) : null}

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label="Date of Birth" name="dateOfBirth" rules={[validateRequiredInputField('Date of Birth')]}>
                        <DatePicker format="YYYY-MM-DD" style={{ display: 'auto', width: '100%' }} disabled={customerType} placeholder={preparePlaceholderSelect('Date of Birth')} className={styles.inputBox} />
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={null} label="Age" name="relationAge" rules={[validateRequiredInputField('Age')]}>
                        <Input maxLength={3} placeholder={preparePlaceholderText('Age')} disabled={customerType} className={styles.inputBox} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Form.Item label="Remark" name="remarks">
                        <TextArea rows={2} maxLength={250} placeholder={preparePlaceholderText('Remark')} />
                    </Form.Item>
                </Col>
            </Row>
            {editedMode && (
                <Row style={{ display: 'flex' }}>
                    <Button type="primary" onClick={onSave}>
                        Save
                    </Button>
                    <Button type="primary" style={{ margin: '0 0 0 1rem' }}>
                        Reset
                    </Button>
                </Row>
            )}

            <Form.Item>
                <Button form="familyForm" type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export const FormContainer = FormBase;
