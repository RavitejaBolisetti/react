/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Col, Form, Row, Input, Button, DatePicker, Divider } from 'antd';

import { withModal } from 'components/withModal';
import { customSelectBox } from 'utils/customSelectBox';
import { validateRequiredInputField, validateRequiredSelectField, validateNumberWithTwoDecimalPlaces, compareAmountValidator } from 'utils/validation';
import { preparePlaceholderText, preparePlaceholderSelect, prepareDatePickerText } from 'utils/preparePlaceholder';

import { dateFormat, formatDateToCalenderDate } from 'utils/formatDateTime';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

const { Search } = Input;

export const ApportionDetailForm = (props) => {
    const { handleCancel, handleAddApportion, apportionTableFormData, showApportionForm, apportionForm, documentAmount, setDocumentAmount, receivedAmount, setReceivedAmount, documentDescriptionList, handleDocumentNumberChange, handleDocumentNumberSearch, totalApportionAmount, totalReceivedAmount, apportionList } = props;

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

    const checkDuplicateValidator = (ObjValue, value) => {
        if (apportionList.length > 0) {
            const filterItem = apportionList?.filter((item, index) => {
                return apportionTableFormData?.index !== index && item?.documentNumber === value;
            });
            if (!filterItem?.length) return Promise.resolve();
            else return Promise.reject(new Error(translateContent('receipts.validation.checkDuplicate')));
        } else {
            return Promise.resolve();
        }
    };

    return (
        <Form autoComplete="off" layout="vertical" form={apportionForm}>
            <Row gutter={16}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item label={translateContent('receipts.label.apportionDetails.documentType')} name="documentType" rules={[validateRequiredSelectField(translateContent('receipts.label.apportionDetails.documentType'))]}>
                        {customSelectBox({ data: documentDescriptionList, placeholder: preparePlaceholderSelect(translateContent('receipts.label.apportionDetails.documentType')), fieldNames: { key: 'documentCode', value: 'documentDescription' } })}
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item
                        label={translateContent('receipts.label.apportionDetails.documentNumber')}
                        name="documentNumber"
                        rules={[
                            validateRequiredInputField(translateContent('receipts.label.apportionDetails.documentNumber')),
                            {
                                validator: checkDuplicateValidator,
                            },
                        ]}
                    >
                        <Search allowClear onChange={handleDocumentNumberChange} onSearch={handleDocumentNumberSearch} placeholder={preparePlaceholderText(translateContent('receipts.label.apportionDetails.documentNumber'))} />
                    </Form.Item>
                </Col>
            </Row>

            {showApportionForm && (
                <>
                    <Divider />
                    <Row gutter={16}>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item label={translateContent('receipts.label.apportionDetails.documentDate')} name="documentDate">
                                <DatePicker format={dateFormat} placeholder={prepareDatePickerText(dateFormat)} style={{ display: 'auto', width: '100%' }} disabled />
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item label={translateContent('receipts.label.apportionDetails.documentAmount')} name="documentAmount" rules={[validateNumberWithTwoDecimalPlaces(translateContent('receipts.label.apportionDetails.documentAmount'))]}>
                                <Input placeholder={preparePlaceholderText(translateContent('receipts.placeholder.documentAmount'))} disabled={true} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item label={translateContent('receipts.label.apportionDetails.receivedAmount')} name="receivedAmount" rules={[validateNumberWithTwoDecimalPlaces(translateContent('receipts.label.apportionDetails.receivedAmount'))]}>
                                <Input placeholder={preparePlaceholderText(translateContent('receipts.placeholder.receivedAmount'))} disabled={true} />
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item
                                label={translateContent('receipts.label.apportionDetails.apportionAmount')}
                                name="apportionedAmount"
                                rules={[
                                    validateRequiredInputField(translateContent('receipts.label.apportionDetails.apportionAmount')),
                                    validateNumberWithTwoDecimalPlaces(translateContent('receipts.label.apportionDetails.apportionAmount')),
                                    {
                                        validator: () => compareAmountValidator(parseFloat(documentAmount) - parseFloat(receivedAmount) - parseFloat(writeOffAmount), parseFloat(apportionedAmount), translateContent('receipts.validation.apportionAmount')),
                                    },
                                    {
                                        validator: () => compareAmountValidator(parseFloat(totalReceivedAmount), parseFloat(apportionedAmount) + parseFloat(totalApportionAmount), translateContent('receipts.validation.totalApportionAmount')),
                                    },
                                ]}
                            >
                                <Input onChange={(e) => setApportionedAmount(e.target.value)} placeholder={preparePlaceholderText(translateContent('receipts.placeholder.apportionAmount'))} />
                            </Form.Item>
                            {/* { validator: () => compareAmountValidator(documentAmount, totalApportionAmount + parseFloat(apportionedAmount), 'Total Amount') */}
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item label={translateContent('receipts.label.apportionDetails.writeOffAmount')} name="writeOffAmount" rules={[validateRequiredInputField(translateContent('receipts.label.apportionDetails.writeOffAmount')), validateNumberWithTwoDecimalPlaces(translateContent('receipts.label.apportionDetails.writeOffAmount')), { validator: () => compareAmountValidator(parseFloat(documentAmount) - parseFloat(receivedAmount) - parseFloat(apportionedAmount), parseFloat(writeOffAmount), translateContent('receipts.label.apportionDetails.writeOffAmount')) }]}>
                                <Input onChange={(e) => setWriteOffAmount(e.target.value)} placeholder={preparePlaceholderText(translateContent('receipts.placeholder.writeOffAmount'))} />
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item label={translateContent('receipts.label.apportionDetails.balanceAmount')} name="balanceAmount" rules={[validateNumberWithTwoDecimalPlaces(translateContent('receipts.label.apportionDetails.balanceAmount'))]}>
                                <Input placeholder={preparePlaceholderText(translateContent('receipts.placeholder.balanceAmount'))} disabled={true} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.alignLeft}>
                            <Button onClick={handleCancel} danger>
                                {translateContent('global.buttons.cancel')}
                            </Button>
                        </Col>

                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.alignRight}>
                            <Button type="primary" onClick={handleAddApportion}>
                                {translateContent('global.buttons.add')}
                            </Button>
                        </Col>
                    </Row>
                </>
            )}
        </Form>
    );
};

export const ModalApportionDetail = withModal(ApportionDetailForm, {});
