import React, { useEffect, useState } from 'react';
import { Col, Input, Form, Row, Select, DatePicker, Space, Collapse, Typography } from 'antd';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import styles from 'components/common/Common.module.css';
const { Text } = Typography;
const { TextArea } = Input;
const { Panel } = Collapse;

const AddEditFormMain = (props) => {
    const { onCloseAction, setIsViewModeVisible, onFinishFailed, onFinish, form, schemeData } = props;
    // const { buttonData, setButtonData } = props;

    const [customerForm] = Form.useForm();

    // const handleFormValueChange = () => {
    //     setButtonData({ ...buttonData, formBtnActive: true });
    // };

    // const handleFormFieldChange = () => {
    //     setButtonData({ ...buttonData, formBtnActive: true });
    // };

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

    console.log(props,'ITEM')

    return (
        <div className={`${styles.viewContainer} ${styles.hierarchyRightContaners}`}>
            <Space style={{ display: 'flex' }} size="middle" direction="vertical" className={styles.accordianContainer}>
                <Collapse
                    expandIcon={() => {
                        if (activeKey.includes(props?.id)) {
                            return <MinusOutlined className={styles.iconsColor} />;
                        } else {
                            return <PlusOutlined className={styles.iconsColor} />;
                        }
                    }}
                    activeKey={activeKey}
                    onChange={() => onChange(props?.id)}
                    expandIconPosition="end"
                >
                    <Panel
                        header={
                            <div className={styles.alignUser}>
                                <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                    {props?.schemeName}
                                </Text>
                            </div>
                        }
                        key={props?.id}
                    >
                        <Form autoComplete="off" layout="vertical" form={customerForm}>
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={props?.schemeType} label="Scheme Type" name="schemeType">
                                        <Select
                                            disabled={true}
                                            placeholder={preparePlaceholderSelect('Scheme Type')}
                                            style={{
                                                width: '100%',
                                            }}
                                            className={styles.inputBox}
                                        ></Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={props?.schemeCategory} label="Scheme Category" name="schemeCategory">
                                        <Input className={styles.inputBox} placeholder={preparePlaceholderText('Scheme Category')} disabled={true} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={props?.amount} label="Amount" name="amount">
                                        <Input className={styles.inputBox} placeholder={preparePlaceholderText('Amount')} disabled={true} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            {/* <Row gutter={20}>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item initialValue={props?.validFrom} label="Valid From" name="validFrom">
                                                <DatePicker className={styles.inputBox} placeholder={preparePlaceholderText('Valid From')} onChange={onChange} style={{ width: '100%' }} disabled={true} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item initialValue={props?.validTo} label="Valid To" name="validTo">
                                                <DatePicker className={styles.inputBox} placeholder={preparePlaceholderText('Valid To')} onChange={onChange} style={{ width: '100%' }} disabled={true} />
                                            </Form.Item>
                                        </Col>
                                    </Row> */}

                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <Form.Item initialValue={props?.description} label="Description" name="description">
                                        <TextArea className={styles.inputBox} placeholder={preparePlaceholderText('Description')} disabled={true} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </Panel>
                </Collapse>
            </Space>
        </div>
    );
};

export const AddEditForm = AddEditFormMain;
