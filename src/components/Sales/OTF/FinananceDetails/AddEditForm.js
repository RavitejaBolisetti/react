import React, { useState } from 'react';
import { Col, Input, Form, Row, Select, Card, DatePicker } from 'antd';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import dayjs from 'dayjs';
import { ViewDetail } from './ViewDetail';

import styles from 'components/common/Common.module.css';
import { validationNumber } from 'utils/validation';

const { Option } = Select;

const AddEditFormMain = (props) => {
    const { form, formData, onCloseAction, formActionType, onFinish, onFinishFailed, FinanceLovData } = props;
    const { buttonData, setButtonData } = props;

    const { setIsViewModeVisible } = props;
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
        formData,
    };

    const selectProps = {
        optionFilterProp: 'children',
        showSearch: true,
        allowClear: true,
        className: styles.headerSelectField,
    };
    return (
        <>
            {!formActionType?.viewMode ? (
                <Card className={styles.drawerCardView}>
                    <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item initialValue={formData?.financier} label="Financier" name="financier" placeholder={preparePlaceholderSelect('Select')}>
                                    <Select disabled={false} loading={false} placeholder="Select" allowClear>
                                        {FinanceLovData?.map((item) => (
                                            <Option key={item?.key} value={item?.key}>
                                                {item?.value}
                                            </Option>
                                        ))}
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
                                <Form.Item initialValue={formData?.loanAmount} label="Loan Amount" name="loanAmount" rules={[validationNumber('loan amount')]}>
                                    <Input placeholder={preparePlaceholderText('loan amount')} maxLength={55} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item initialValue={formData?.emi} label="EMI" name="emi" rules={[validationNumber('emi')]}>
                                    <Input placeholder={preparePlaceholderText('emi')} maxLength={55} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item initialValue={formData?.doReceived} label="D.O. Recived" name="doReceived">
                                    <Select placeholder="Select">
                                        <Option value="yes">Yes</Option>
                                        <Option value="no">No</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            {selected === 'yes' && (
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.doNumber} label="D.O. Number" name="doNumber">
                                        <Input placeholder={preparePlaceholderText('d.o. number')}></Input>
                                    </Form.Item>
                                </Col>
                            )}
                            {selected === 'yes' && (
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={formData?.doDate} label="D.O. Date" name="doDate" data-testid="CustomerCategory">
                                        <DatePicker placeholder={preparePlaceholderSelect('date')} style={datePickerStyle} disabledDate={(date) => date > dayjs()} />
                                    </Form.Item>
                                </Col>
                            )}
                        </Row>
                    </Form>
                </Card>
            ) : (
                <ViewDetail {...viewProps} />
            )}
        </>
    );
};

export const AddEditForm = AddEditFormMain;
