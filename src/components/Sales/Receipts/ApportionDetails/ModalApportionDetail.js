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
import { APPORTION_CONSTANTS } from 'components/FinancialAccounting/CreditDebitNote/Constants/apportionConstants';

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
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [apportionTableFormData]);

    const checkDuplicateValidator = (_, value) => {
        if (apportionList.length > 0) {
            const filterItem = apportionList?.filter((item, index) => {
                return apportionTableFormData?.index !== index && item?.documentNumber === value;
            });
            if (!filterItem?.length) return Promise.resolve();
            return Promise.reject(new Error(translateContent('receipts.validation.checkDuplicate')));
        }
        return Promise.resolve();
    };

    const calculateApportionDetails = ({ formValues, type }) => {
        switch (type) {
            case APPORTION_CONSTANTS?.APPORTION_AMOUNT?.key: {
                if (parseFloat(formValues?.apportionedAmount) >= 0) {
                    const receivedCal = parseFloat(formValues?.receivedAmount ?? 0) + parseFloat(formValues?.apportionedAmount ?? 0);
                    const balancedCalculate = parseFloat(formValues?.balanceAmount) - (parseFloat(formValues?.writeOffAmount ?? 0) + parseFloat(formValues?.apportionedAmount ?? 0));
                    if (receivedCal >= 0 && balancedCalculate >= 0) {
                        apportionForm.setFieldsValue({
                            receivedAmount: receivedCal,
                            balanceAmount: balancedCalculate,
                        });
                        return Promise.resolve();
                    } else {
                        if (receivedCal < 0) return Promise.reject(new Error('received amount cannot be negative'));
                        if (balancedCalculate < 0) {
                            return Promise.reject(new Error('apportion amount is greater than balanced amount '));
                        }
                    }
                } else {
                    if (parseFloat(formValues?.apportionedAmount) < 0) {
                        return Promise.reject(new Error('apportionAmount cannot be negative'));
                    } else {
                        return Promise.reject(new Error('apportionAmount is not present'));
                    }
                }
                break;
            }
            case APPORTION_CONSTANTS?.WRITE_OFF_AMOUNT?.key: {
                if (parseFloat(formValues?.writeOffAmount) >= 0) {
                    const receivedCal = parseFloat(formValues?.receivedAmount) + parseFloat(formValues?.apportionedAmount ?? 0);
                    const balancedCalculate = parseFloat(formValues?.balanceAmount) - (parseFloat(formValues?.writeOffAmount ?? 0) + parseFloat(formValues?.apportionedAmount ?? 0));
                    if (receivedCal >= 0 && balancedCalculate >= 0) {
                        apportionForm.setFieldsValue({
                            balanceAmount: balancedCalculate,
                        });
                        return Promise.resolve();
                    } else {
                        if (receivedCal < 0) return Promise.reject(new Error('received amount cannot be negative'));
                        if (balancedCalculate < 0) {
                            return Promise.reject(new Error('write of amount is greater than balanced amount '));
                        }
                    }
                } else {
                    if (parseFloat(formValues?.writeOffAmount) < 0) {
                        return Promise.reject(new Error('write of amount cannot be negative'));
                    } else {
                        return Promise.reject(new Error('write of amount is not present'));
                    }
                }
                break;
            }
            default: {
                return Promise.resolve();
            }
        }
    };

    return (
        <Form autoComplete="off" layout="vertical" form={apportionForm}>
            <Row gutter={16}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item label={translateContent('receipts.label.apportionDetails.documentType')} name="documentType" rules={[validateRequiredSelectField(translateContent('receipts.label.apportionDetails.documentType'))]}>
                        {customSelectBox({
                            data: documentDescriptionList,
                            data: documentDescriptionList?.reduce((prev, curr) => {
                                const finder = apportionList?.find((item) => item?.documentType === curr?.documentCode || item?.documentType === curr?.documentDescription);
                                prev.push({ ...curr, disabled: !!finder });
                                return prev;
                            }, []),
                            placeholder: preparePlaceholderSelect(translateContent('receipts.label.apportionDetails.documentType')),
                            fieldNames: { key: 'documentCode', value: 'documentDescription' },
                        })}
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
                        <Search allowClear onChange={handleDocumentNumberChange} onSearch={() => handleDocumentNumberSearch(apportionForm.getFieldsValue())} placeholder={preparePlaceholderText(translateContent('receipts.label.apportionDetails.documentNumber'))} />
                    </Form.Item>
                </Col>
            </Row>

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
                    <Form.Item label={translateContent('receipts.label.apportionDetails.balanceAmount')} name="balanceAmount" rules={[validateNumberWithTwoDecimalPlaces(translateContent('receipts.label.apportionDetails.balanceAmount'))]}>
                        <Input placeholder={preparePlaceholderText(translateContent('receipts.placeholder.balanceAmount'))} disabled={true} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item
                        label={translateContent('receipts.label.apportionDetails.writeOffAmount')}
                        name="writeOffAmount"
                        rules={[validateRequiredInputField(translateContent('receipts.label.apportionDetails.writeOffAmount')), validateNumberWithTwoDecimalPlaces(translateContent('receipts.label.apportionDetails.writeOffAmount')), { validator: (_, writeOffVal) => calculateApportionDetails({ formValues: { ...apportionForm.getFieldsValue(), writeOffAmount: writeOffVal, balanceAmount: showApportionForm?.balancedAmount, receivedAmount: showApportionForm?.receivedAmount }, type: APPORTION_CONSTANTS?.WRITE_OFF_AMOUNT?.key }) }]}
                    >
                        <Input onChange={(e) => setWriteOffAmount(e.target.value)} placeholder={preparePlaceholderText(translateContent('receipts.placeholder.writeOffAmount'))} />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item
                        label={translateContent('receipts.label.apportionDetails.apportionAmount')}
                        name="apportionedAmount"
                        rules={[validateRequiredInputField(translateContent('receipts.label.apportionDetails.apportionAmount')), validateNumberWithTwoDecimalPlaces(translateContent('receipts.label.apportionDetails.apportionAmount')), { validator: (_, apportionVal) => calculateApportionDetails({ formValues: { ...apportionForm.getFieldsValue(), apportionedAmount: apportionVal, balanceAmount: showApportionForm?.balancedAmount, receivedAmount: showApportionForm?.receivedAmount }, type: APPORTION_CONSTANTS?.APPORTION_AMOUNT?.key }) }]}
                    >
                        <Input onChange={(e) => setApportionedAmount(e.target.value)} placeholder={preparePlaceholderText(translateContent('receipts.placeholder.apportionAmount'))} />
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
        </Form>
    );
};

export const ModalApportionDetail = withModal(ApportionDetailForm, {});
