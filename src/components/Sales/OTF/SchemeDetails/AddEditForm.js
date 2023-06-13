import React, { useState } from 'react';
import { Col, Input, Form, Row, Select, DatePicker, Space, Collapse, Typography } from 'antd';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import styles from 'components/common/Common.module.css';
import { ViewDetail } from './ViewDetails';
const { Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;
const { Panel } = Collapse;

const AddEditFormMain = (props) => {
    const { onCloseAction, setIsViewModeVisible, formActionType } = props;
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

    const schemeType = [{ code: 'hey' }, { code: 'bud' }];

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
                <div className={`${styles.viewContainer} ${styles.hierarchyRightContaners}`}>
                    <Space style={{ display: 'flex' }} size="middle" direction="vertical" className={styles.accordianContainer}>
                        <Collapse
                            expandIcon={() => {
                                if (activeKey.includes(1)) {
                                    return <MinusOutlined className={styles.iconsColor} />;
                                } else {
                                    return <PlusOutlined className={styles.iconsColor} />;
                                }
                            }}
                            activeKey={activeKey}
                            onChange={() => onChange(1)}
                            expandIconPosition="end"
                        >
                            <Panel
                                header={
                                    <div className={styles.alignUser}>
                                        <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                            Scheme
                                        </Text>
                                    </div>
                                }
                                key="1"
                            >
                                <Form autoComplete="off" layout="vertical" form={customerForm}>
                                    <Row gutter={20}>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item initialValue={''} label="Scheme Type" name="1" rules={[validateRequiredSelectField('Scheme Type')]}>
                                                <Select
                                                    placeholder={preparePlaceholderSelect('Scheme Type')}
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                    className={styles.inputBox}
                                                >
                                                    {schemeType?.map((item) => {
                                                        return (
                                                            <Option key={'st' + item.code} value={item?.code}>
                                                                {item?.code}
                                                            </Option>
                                                        );
                                                    })}
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item initialValue={''} label="Scheme Category" name="2" rules={[validateRequiredInputField('Scheme Category')]}>
                                                <Input className={styles.inputBox} placeholder={preparePlaceholderText('Scheme Category')} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item initialValue={''} label="Amount" name="3" rules={[validateRequiredInputField('Amount')]}>
                                                <Input className={styles.inputBox} placeholder={preparePlaceholderText('Amount')} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={20}>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item initialValue={''} label="Valid From" name="4" rules={[validateRequiredInputField('Valid From')]}>
                                                <DatePicker className={styles.inputBox} placeholder={preparePlaceholderText('Valid From')} onChange={onChange} style={{ width: '100%' }} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item initialValue={''} label="Valid To" name="5" rules={[validateRequiredInputField('Valid To')]}>
                                                <DatePicker className={styles.inputBox} placeholder={preparePlaceholderText('Valid To')} onChange={onChange} style={{ width: '100%' }} />
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row gutter={20}>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                            <Form.Item initialValue={''} label="Description" name="6" rules={[validateRequiredInputField('Description')]}>
                                                <TextArea className={styles.inputBox} placeholder={preparePlaceholderText('Description')} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form>
                            </Panel>
                        </Collapse>
                    </Space>
                </div>
            ) : (
                <ViewDetail {...viewProps} />
            )}
        </>
    );
};

export const AddEditForm = AddEditFormMain;
