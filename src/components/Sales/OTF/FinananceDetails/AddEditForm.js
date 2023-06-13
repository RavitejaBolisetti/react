import React, { useState } from 'react';
import { Col, Input, Form, Row, Select, Card, Space, DatePicker } from 'antd';
import { validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import dayjs from 'dayjs';

import styles from 'components/common/Common.module.css';
import { ViewDetail } from './ViewFinanceDetail';

const { Option } = Select;

const AddEditFormMain = (props) => {
    const { formActionType } = props;
    const { onCloseAction, setIsViewModeVisible } = props;
    const [financeForm] = Form.useForm();
    const [selected, setSelected] = useState();

    const handleEdit = () => {
        setIsViewModeVisible(false);
    };

    const datePickerStyle = {
        width: '100%',
    };

    const handleDOChange = (item) => {
        console.log(item);
        setSelected(item);
    };

    const viewProps = {
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
                            <Card style={{ backgroundColor: '#F2F2F2' }}>
                                <Form autoComplete="off" layout="vertical" form={financeForm}>
                                    <Row gutter={20}>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label="Financier" name="financier" data-testid="customerType">
                                                <Select placeholder="Select" disabled={false} loading={false} allowClear>
                                                    <Option value="financier1">HDFC</Option>
                                                    <Option value="financier2">SBI</Option>
                                                    <Option value="financier3">ICICI</Option>
                                                    <Option value="financier4">PNB</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label="Branch" name="branch" data-testid="corporateCode">
                                                <Input placeholder={preparePlaceholderText('branch')}></Input>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label="File Number" name="filenumber" data-testid="usageCategorization">
                                                <Input placeholder={preparePlaceholderText('file number')}></Input>
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row gutter={20}>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label="Loan Amount" name="loanamoount" data-testid="usageCategorization">
                                                <Input placeholder={preparePlaceholderText('loan amount')}></Input>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label="EMI" name="emi" data-testid="customerType">
                                                <Input placeholder={preparePlaceholderText('emi')}></Input>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label="Finance Done" name="financedone" data-testid="CustomerCategory">
                                                <Select disabled={false} loading={false} placeholder="Select" allowClear>
                                                    <Option value="financedone1">Yes</Option>
                                                    <Option value="financedone2">No</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={20}>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label="D.O. Recived" name="dorecived" data-testid="CustomerCategory">
                                                <Select disabled={false} loading={false} placeholder="Select" allowClear onChange={handleDOChange}>
                                                    <Option value="dorecived1">Yes</Option>
                                                    <Option value="dorecived2">No</Option>
                                                    <Option value="dorecived3">NA</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label="D.O. Number" name="donumber" data-testid="customerType" rules={[validateRequiredSelectField('D.O. number')]}>
                                                <Input disabled={selected === 'dorecived1' ? false : true} placeholder={preparePlaceholderText('d.o. number')}></Input>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label="D.O. Date" name="dodate" data-testid="CustomerCategory" rules={[validateRequiredSelectField('D.O. date')]}>
                                                <DatePicker disabled={selected === 'dorecived1' ? false : true} placeholder={preparePlaceholderSelect('date')} style={datePickerStyle} disabledDate={(date) => date > dayjs()} />
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
