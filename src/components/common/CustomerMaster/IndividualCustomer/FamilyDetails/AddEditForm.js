import React, { useState } from 'react';
import { Col, Input, Form, Row, Select, DatePicker, Collapse, Space, Card, Typography, Button, Divider } from 'antd';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import styles from 'components/common/Common.module.css';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { ViewDetail } from './ViewFamilyDetails';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { FiEdit } from 'react-icons/fi';

const { Option } = Select;
const { TextArea } = Input;
const { Panel } = Collapse;

const AddEditFormMain = (props) => {
    const { familyForm, type, value, onChange, selectRef, onFamilyFinish, onFinishFailed, showForm, setShowForm } = props;
    const { onCloseAction, isViewModeVisible, setIsViewModeVisible, familyDetailList, customerType } = props;
    const [activeKey, setactiveKey] = useState([null]);

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

    const addFunction = () => {
        setShowForm(true);
        familyForm.resetFields();
    };

    const onEdit = (values) => {
        console.log(values, 'values');
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
                        <Card className="cardStyle">
                            <div className="flex">
                                <Typography className="subHeading">Family Details</Typography>
                                <Button type="primary" icon={<PlusOutlined />} onClick={addFunction} className="addBtn" disabled={showForm}>
                                    Add
                                </Button>
                            </div>
                            {showForm || familyDetailList?.length > 0 ? <Divider /> : null}
                            <Space style={{ display: 'flex' }} size="middle" direction="vertical">
                                {showForm && (
                                    <Form form={familyForm} id="familyForm" autoComplete="off" layout="vertical" onFinish={onFamilyFinish} onFinishFailed={onFinishFailed}>
                                        <Row gutter={20}>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item initialValue={null} label="M&M Customer" name="mnmCustomer" rules={[validateRequiredSelectField('M&M Customer')]}>
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
                                                <Form.Item initialValue={null} label="Customer ID" name="customerId">
                                                    <Input maxLength={6} placeholder={preparePlaceholderText('Customer ID')} className={styles.inputBox} disabled={true} />
                                                </Form.Item>
                                            </Col>

                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item initialValue={null} label="Customer Name" name="familyMembername" rules={[validateRequiredInputField('Customer Name')]}>
                                                    <Input maxLength={50} placeholder={preparePlaceholderText('Customer Name')} disabled={value} className={styles.inputBox} />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Row gutter={20}>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item initialValue={null} label="Relationship" name="relationship" rules={[validateRequiredSelectField('Relationship')]}>
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
                                                <Form.Item label="Date of Birth" rules={[validateRequiredInputField('Date of Birth')]}>
                                                    {/* name="dateOfBirth" */}
                                                    <DatePicker format="YYYY-MM-DD" style={{ display: 'auto', width: '100%' }} placeholder={preparePlaceholderSelect('Date of Birth')} className={styles.inputBox} disabled={value} />
                                                </Form.Item>
                                            </Col>

                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item initialValue={null} label="Age" name="relationAge" rules={[validateRequiredInputField('Age')]}>
                                                    <Input maxLength={3} placeholder={preparePlaceholderText('Age')} disabled={value} className={styles.inputBox} />
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
                                        <Form.Item>
                                            <Button form="familyForm" type="primary" htmlType="submit">
                                                Submit
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                )}

                                {familyDetailList?.length > 0 &&
                                    familyDetailList?.map((item) => (
                                        <Collapse
                                            expandIcon={() => {
                                                if (activeKey.includes(1)) {
                                                    return <MinusOutlined style={{ color: '#FF3E5B', width: '19.2px', height: '19.2px' }} />;
                                                } else {
                                                    return <PlusOutlined style={{ color: '#FF3E5B', width: '19.2px', height: '19.2px' }} />;
                                                }
                                            }}
                                            activeKey={activeKey}
                                            onChange={() => onCollapseChange(1)}
                                            expandIconPosition="end"
                                            collapsible="icon"
                                        >
                                            <Panel
                                                header={
                                                    <div className="flex100">
                                                        <div className={styles.alignUser}>
                                                            <Typography className="heading">
                                                                {item?.familyMembername} | {item?.relationship}
                                                            </Typography>
                                                            <div className="flex red" style={{ margin: '0 0 0 1rem', cursor: 'pointer' }}>
                                                                <FiEdit onClick={onEdit(item)} />
                                                                <Typography className="red heading" style={{ fontSize: '14px', margin: '0 0 0 0.5rem' }}>
                                                                    Edit
                                                                </Typography>
                                                            </div>
                                                        </div>

                                                        {customerType ? <Typography>M&M user </Typography> : !customerType ? <Typography>Non-M&M user</Typography> : null}
                                                    </div>
                                                }
                                                key="1"
                                            >
                                                <ViewDetail mnmCustomer={item?.mnmCustomer} customerId={item?.customerId} familyMembername={item?.familyMembername} relationship={item?.relationship} dateOfBirth={item?.dateOfBirth} relationAge={item?.relationAge} remarks={item?.remarks} />
                                            </Panel>
                                        </Collapse>
                                    ))}
                            </Space>
                        </Card>
                    </Col>
                </Row>
            ) : (
                <ViewDetail {...viewProps} />
            )}
        </>
    );
};

export const AddEditForm = AddEditFormMain;
