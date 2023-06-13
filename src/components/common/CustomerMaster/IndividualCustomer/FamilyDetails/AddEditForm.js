import React, { useState } from 'react';
import { Col, Input, Form, Row, Select, DatePicker, Collapse, Space } from 'antd';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import styles from 'components/common/Common.module.css';
import { FaRegUserCircle } from 'react-icons/fa';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { ViewDetail } from './ViewFamilyDetails';

const { Option } = Select;
const { TextArea } = Input;
const { Panel } = Collapse;

const AddEditFormMain = (props) => {
    const { form, type, value, onChange, selectRef, onFamilyFinish, onFinishFailed } = props;
    const { onCloseAction, isViewModeVisible, setIsViewModeVisible } = props;
    const [activeKey, setactiveKey] = useState([1]);

    const handleEdit = () => {
        setIsViewModeVisible(false);
    };

    const onCollapseChange = (values) => {
        const isPresent = activeKey.includes(values);
        if (isPresent) {
            const newActivekeys = [];
            // eslint-disable-next-line array-callback-return
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
            {!isViewModeVisible ? (
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Space style={{ display: 'flex' }} size="middle" direction="vertical">
                            <Collapse
                                expandIcon={() => {
                                    if (activeKey.includes(1)) {
                                        return <MinusOutlined className={styles.iconsColor} />;
                                    } else {
                                        return <PlusOutlined className={styles.iconsColor} />;
                                    }
                                }}
                                activeKey={activeKey}
                                onChange={() => onCollapseChange(1)}
                                expandIconPosition="end"
                            >
                                <Panel
                                    header={
                                        <div className={styles.alignUser}>
                                            <FaRegUserCircle className={styles.userCircle} />
                                            <div style={{ paddingLeft: '10px', paddingTop: '3px' }}> Family Details</div>
                                        </div>
                                    }
                                    key="1"
                                >
                                    <Form form={form} id="myForm" autoComplete="off" layout="vertical" onFinish={onFamilyFinish} onFinishFailed={onFinishFailed}>
                                        <Row gutter={20}>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item initialValue={'YES'} label="M&M Customer" name="mnmCustomer">
                                                    <Select placeholder={preparePlaceholderText('M&M Customer')} onChange={onChange} className={styles.inputBox} allowClear ref={selectRef}>
                                                        {type.map((item) => (
                                                            <Option key={'mc' + item?.value} value={item.value}>
                                                                {item.name}
                                                            </Option>
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
                                                            <Option key={'rel' + item?.value} value={item.value}>
                                                                {item.name}
                                                            </Option>
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
                                    </Form>
                                </Panel>
                            </Collapse>
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
