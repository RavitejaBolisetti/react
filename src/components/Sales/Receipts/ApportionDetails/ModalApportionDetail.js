/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Col, Form, Row, Input, Select, Button, DatePicker, Divider } from 'antd';

import { withModal } from 'components/withModal';
import { validateRequiredInputField, validateRequiredSelectField, validateNumberWithTwoDecimalPlaces, compareAmountValidator } from 'utils/validation';
import { preparePlaceholderText, preparePlaceholderSelect, prepareDatePickerText } from 'utils/preparePlaceholder';

import { dateFormat, formatDate, formatDateToCalenderDate } from 'utils/formatDateTime';

import styles from 'components/common/Common.module.css';

const { Search } = Input;
const { Option } = Select;

export const ApportionDetailForm = (props) => {
    const { handleCancel, handleAddApportion, apportionTableFormData, showApportionForm, apportionForm, totalApportionAmount, documentAmount, setDocumentAmount, receivedAmount, setReceivedAmount, documentDescriptionList, handleDocumentNumberSearch } = props;

    const [apportionedAmount, setApportionedAmount] = useState();
    const [writeOffAmount, setWriteOffAmount] = useState();

    useEffect(() => {
        if (apportionTableFormData) {
            apportionForm.setFieldsValue({
                documentType: apportionTableFormData?.documentType ?? '',
                documentNumber: apportionTableFormData?.documentNumber ?? '',
                documentDate: formatDateToCalenderDate(apportionTableFormData?.documentDate) ?? '',
                documentAmount: apportionTableFormData?.documentAmount ?? '',
                receivedAmount: apportionTableFormData?.receivedAmount ?? '',
                balanceAmount: apportionTableFormData?.balanceAmount ?? '',
                writeOffAmount: apportionTableFormData?.writeOffAmount ?? '',
                apportionedAmount: apportionTableFormData?.apportionedAmount ?? '',
                id: apportionTableFormData?.id ?? '',
            });
            setDocumentAmount(apportionTableFormData?.documentAmount);
            setReceivedAmount(apportionTableFormData?.receivedAmount);
            // setWriteOffAmount(apportionTableFormData?.writeOffAmount);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [apportionTableFormData]);

    // useEffect(() => {
    //     setApportionedAmount(apportionedAmount);
    // }, [writeOffAmount]);

    const onFinishFailed = () => {
        return;
    };

    return (
        <Form autoComplete="off" layout="vertical" form={apportionForm} onFinishFailed={onFinishFailed}>
            <Row gutter={16}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item label="Document Type" name="documentType" rules={[validateRequiredSelectField('Document Type')]}>
                        <Select maxLength={50} placeholder={preparePlaceholderSelect('Select')} showSearch>
                            {documentDescriptionList?.map((item) => (
                                <Option key={'dv' + item.documentCode} value={item.documentCode}>
                                    {item.documentDescription}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item label="Document Number" name="documentNumber" rules={[validateRequiredInputField('Document Number')]}>
                        <Search allowClear onSearch={handleDocumentNumberSearch} placeholder={preparePlaceholderText('Document Number')} />
                    </Form.Item>
                </Col>
            </Row>

            {showApportionForm && (
                <>
                    <Divider />
                    <Row gutter={16}>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item label="Document Date" name="documentDate">
                                <DatePicker format={dateFormat} placeholder={prepareDatePickerText(dateFormat)} style={{ display: 'auto', width: '100%' }} disabled />
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item label="Document Amount" name="documentAmount" rules={[validateNumberWithTwoDecimalPlaces('Document Amount')]}>
                                <Input placeholder={preparePlaceholderText('document amount')} disabled={true} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item label="Received Amount" name="receivedAmount" rules={[validateNumberWithTwoDecimalPlaces('Received Amount')]}>
                                <Input placeholder={preparePlaceholderText('received amount')} disabled={true} />
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item label="Apportioned Amount" name="apportionedAmount" rules={[validateRequiredInputField('Apportion Amount'), validateNumberWithTwoDecimalPlaces('Apportioned Amount'), { validator: () => compareAmountValidator(parseFloat(documentAmount) - parseFloat(receivedAmount) - parseFloat(writeOffAmount), parseFloat(apportionedAmount), 'Total Amount') }]}>
                                <Input onChange={(e) => setApportionedAmount(e.target.value)} placeholder={preparePlaceholderText('apportioned amount')} />
                            </Form.Item>
                            {/* { validator: () => compareAmountValidator(documentAmount, totalApportionAmount + parseFloat(apportionedAmount), 'Total Amount') */}
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item label="Write Off Amount" name="writeOffAmount" rules={[validateRequiredInputField('Write-Off Amount'), validateNumberWithTwoDecimalPlaces('Write Off Amount')]}>
                                <Input onChange={(e) => setWriteOffAmount(e.target.value)} placeholder={preparePlaceholderText('write off amount')} />
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item label="Balance Amount" name="balanceAmount" rules={[validateNumberWithTwoDecimalPlaces('Balance Amount')]}>
                                <Input placeholder={preparePlaceholderText('balance amount')} disabled={true} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.alignLeft}>
                            <Button onClick={handleCancel} danger>
                                Cancel
                            </Button>
                        </Col>

                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.alignRight}>
                            <Button type="primary" onClick={handleAddApportion}>
                                Add
                            </Button>
                        </Col>
                    </Row>
                </>
            )}
        </Form>
    );
};

export const ModalApportionDetail = withModal(ApportionDetailForm, {});