import React, { useState } from 'react';
import { Col, Input, Form, Row, Select, Card, Space, DatePicker } from 'antd';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import dayjs from 'dayjs';

import styles from 'components/common/Common.module.css';
import { ViewDetail } from './ViewFinanceDetail';

const { Option } = Select;

const AddEditFormMain = (props) => {
    const { form, formData, onCloseAction, formActionType: { viewMode } = undefined, onFinish, onFinishFailed } = props;
    const { buttonData, setButtonData } = props;

    const { setIsViewModeVisible } = props;
    const [financeForm] = Form.useForm();
    const [selected, setSelected] = useState();

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleFormFieldChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

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

    const selectProps = {
        optionFilterProp: 'children',
        showSearch: true,
        allowClear: true,
        className: styles.headerSelectField,
    };
    // "id": "a0368e0e-ac87-4beb-b0f5-f4f8b69ff8f7",
    // "otfNumber": "OTF002",
    // "financier": "HDFC",
    // "branch": "HDFC",
    // "fileNumber": "FI187165",
    // "loanAmount": 20000000,
    // "emi": 10000,
    // "financeDone": "no",
    // "doReceived": "no",
    // "doNumber": "DO12755",
    // "doDate": "2023-06-16T00:00:00.000+00:00"
    return (
        <div className={styles.drawerCustomerMaster}>
            <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                {viewMode ? (
                    <ViewDetail {...viewProps} />
                ) : (
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Space style={{ display: 'flex' }} size="middle" direction="vertical">
                                <Card style={{ backgroundColor: '#F2F2F2' }}>
                                    <Form id="myform" autoComplete="off" layout="vertical" form={financeForm}>
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item initialValue={formData?.financier} label="Financier" name="financier" placeholder={preparePlaceholderSelect('Select')}>
                                                    <Select placeholder="Select" {...selectProps}>
                                                        <Option value="financier1">HDFC</Option>
                                                        <Option value="financier2">SBI</Option>
                                                        <Option value="financier3">ICICI</Option>
                                                        <Option value="financier4">PNB</Option>
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item initialValue={formData?.branch} label="Branch" name="branch">
                                                    <Input placeholder={preparePlaceholderText('branch')} maxLength={55} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item initialValue={formData?.fileNumber} label="File Number" name="fileNumber">
                                                    <Input placeholder={preparePlaceholderText('file number')} maxLength={55} />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item initialValue={formData?.loanAmount} label="Loan Amount" name="loanAmount">
                                                    <Input placeholder={preparePlaceholderText('loan amount')} maxLength={55} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item initialValue={formData?.emi} label="EMI" name="emi">
                                                    <Input placeholder={preparePlaceholderText('emi')} maxLength={55} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item initialValue={formData?.financeDone} label="Finance Done" name="financeDone">
                                                    <Select placeholder="Select" {...selectProps}>
                                                        <Option value="yes">Yes</Option>
                                                        <Option value="no">No</Option>
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item initialValue={formData?.doReceived} label="D.O. Recived" name="doReceived">
                                                    <Select placeholder="Select" {...selectProps}>
                                                        <Option value="yes">Yes</Option>
                                                        <Option value="no">No</Option>
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            {selected === 'yes' && (
                                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                    <Form.Item label="D.O. Number" name="doNumber" data-testid="customerType">
                                                        <Input placeholder={preparePlaceholderText('d.o. number')}></Input>
                                                    </Form.Item>
                                                </Col>
                                            )}
                                            {selected === 'yes' && (
                                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                    <Form.Item label="D.O. Date" name="doDate" data-testid="CustomerCategory">
                                                        <DatePicker placeholder={preparePlaceholderSelect('date')} style={datePickerStyle} disabledDate={(date) => date > dayjs()} />
                                                    </Form.Item>
                                                </Col>
                                            )}
                                        </Row>
                                    </Form>
                                </Card>
                            </Space>
                        </Col>
                    </Row>
                )}
            </Form>
        </div>
    );
};

export const AddEditForm = AddEditFormMain;
