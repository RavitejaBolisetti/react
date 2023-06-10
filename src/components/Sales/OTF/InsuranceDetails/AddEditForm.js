import React, { useState } from 'react';
import { Col, Input, Form, Row, DatePicker, Space, Card } from 'antd';
import { validateRequiredInputField } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import styles from 'components/common/Common.module.css';
import { ViewDetail } from './ViewDetail';

const AddEditFormMain = (props) => {
    const { onCloseAction, setIsViewModeVisible,formActionType } = props;
    const [customerForm] = Form.useForm();

    const [activeKey, setactiveKey] = useState([1]);

    const handleEdit = () => {
        setIsViewModeVisible(false);
    };

    const onChange = (values) => {
        const isPresent = activeKey.includes(values);

        if (isPresent) {
            const newActivekeys = [];

            activeKey.forEach((item) => {
                if (item !== values) {
                    newActivekeys.push(item);
                }
            });
            setactiveKey(newActivekeys);
        } else {
            setactiveKey([...activeKey, values]);
        }
    };

    const viewProps = {
        activeKey,
        setactiveKey,
        onChange,
        styles,
        onCloseAction,
        handleEdit,
    };

    return (
        <>
            {!formActionType?.viewMode ? (
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Space style={{ display: 'flex' }} size="middle" direction="vertical">
                            <Card style={{ backgroundColor: '#f2f2f2' }}>
                                <Form autoComplete="off" layout="vertical" form={customerForm}>
                                    <Row gutter={20}>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item initialValue={''} label="Insurance Company" name="2" rules={[validateRequiredInputField('Insurance Company')]}>
                                                <Input className={styles.inputBox} placeholder={preparePlaceholderText('Insurance Company')} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item initialValue={''} label="Insurance Cover Note" name="2" rules={[validateRequiredInputField('Insurance Cover Note')]}>
                                                <Input className={styles.inputBox} placeholder={preparePlaceholderText('Insurance Cover Note')} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item initialValue={''} label="Insurance Amount" name="3" rules={[validateRequiredInputField('Insurance Amount')]}>
                                                <Input className={styles.inputBox} placeholder={preparePlaceholderText('Insurance Amount')} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={20}>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item initialValue={''} label="Date" name="4" rules={[validateRequiredInputField('Date')]}>
                                                <DatePicker className={styles.inputBox} placeholder={preparePlaceholderText('Date')} onChange={onChange} style={{ width: '100%' }} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item initialValue={''} label="Registration Number" name="3" rules={[validateRequiredInputField('Registration Number')]}>
                                                <Input className={styles.inputBox} placeholder={preparePlaceholderText('Registration Number')} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card>
                        </Space>
                    </Col>
                </Row>
            ) : (
                <ViewDetail {...viewProps} />
            )}
        </>
    );
};

export const AddEditForm = AddEditFormMain;
