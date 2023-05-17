import React from 'react';
import { Col, Input, Form, Row, Select, DatePicker, Button } from 'antd';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import styles from 'components/common/Common.module.css';

const { Option } = Select;
const { TextArea } = Input;

const AddEditFormMain = (props) => {
    const { form, type, value, onChange, selectRef, onFamilyFinish, onFinishFailed } = props;

    return (
        <Form form={form} id="myForm" autoComplete="off" layout="vertical" onFinish={onFamilyFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={'YES'} label="M&M Customer" name="mnmCustomer">
                        <Select placeholder={preparePlaceholderText('M&M Customer')} onChange={onChange} className={styles.inputBox} allowClear ref={selectRef}>
                            {type.map((item) => (
                                <Option value={item.value}>{item.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={'MO12'} label="Customer ID" name="customerCode">
                        <Input maxLength={50} placeholder={preparePlaceholderText('Customer ID')} className={styles.inputBox} disabled={value} />
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={'Nikhil'} label="Customer Name" name="familyMembername">
                        <Input maxLength={50} placeholder={preparePlaceholderText('Customer Name')} disabled={value} className={styles.inputBox} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={'Father'} label="Relationship" name="relationship">
                        <Select placeholder={preparePlaceholderText('Relationship')} className={styles.inputBox} allowClear ref={selectRef} disabled={value}>
                            {type.map((item) => (
                                <Option value={item.value}>{item.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label="Date of Birth" name="dateOfBirth">
                        <DatePicker format="YYYY-MM-DD" style={{ display: 'auto', width: '100%' }} placeholder={preparePlaceholderSelect('Date of Birth')} className={styles.inputBox} disabled={value} />
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={42} label="Age" name="relationAge">
                        <Input maxLength={50} placeholder={preparePlaceholderText('Age')} disabled={value} className={styles.inputBox} />
                    </Form.Item>
                </Col>
            </Row>
            {/*  */}
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Form.Item label="Remark" name="remarks">
                        <TextArea rows={4} maxLength={250} placeholder={preparePlaceholderText('Remark')} />
                    </Form.Item>
                </Col>
            </Row>
            {/* <Button className={styles.button} type="primary" htmlType="submit">
                Login
            </Button> */}
        </Form>
    );
};

export const AddEditForm = AddEditFormMain;
