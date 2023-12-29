/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Col, Input, Form, Row, Button, DatePicker } from 'antd';

import { withModal } from 'components/withModal';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { dateFormat, formatDateToCalenderDate } from 'utils/formatDateTime';
import { disableFutureDate } from 'utils/disableDate';

import { validateRequiredInputField, validateRequiredSelectField, validateNumberWithTwoDecimalPlaces } from 'utils/validation';
import { customSelectBox } from 'utils/customSelectBox';
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';
import { APPORTION_CONSTANTS } from '../Constants/apportionConstants';
import { BASE_URL_APPORTION_DETAILS_SEARCH } from 'constants/routingApi';
import { CalculateSum } from 'utils/calculateSum';

const { Search } = Input;

export const AdvanceForm = (props) => {
    const { apportionTableFormData, setApportionTableFormData, record, voucherTableData } = props;
    const { handleCancel, handleFormValueChange, apportionForm } = props;
    const { setAdvanceSearchVisible } = props;
    const { isVisible, setisEditing, isEditing } = props;
    const { showGlobalNotification, fetchInvoiceList, listInvoiceShowLoading, userId, apportionTableData, setApportionTableData, documentTypeOptions, isApportionDetailsLoading } = props;
    const voucherTableSum = CalculateSum(voucherTableData, 'amount');

    useEffect(() => {
        if (apportionTableFormData && isVisible) {
            apportionForm.setFieldsValue({
                documentType: apportionTableFormData?.documentType ?? '',
                documentNumber: apportionTableFormData?.documentNumber ?? '',
                documentDate: formatDateToCalenderDate(apportionTableFormData?.documentDate) ?? '',
                documentAmount: apportionTableFormData?.documentAmount ?? '',
                settledAmount: apportionTableFormData?.settledAmount ?? '',
                balancedAmount: apportionTableFormData?.balancedAmount ?? '',
                writeOffAmount: apportionTableFormData?.writeOffAmount ?? '',
                apportionAmount: apportionTableFormData?.apportionAmount ?? '',
                trueBalanceAmount: apportionTableFormData?.trueBalanceAmount || 0,
                trueSettledAmount: apportionTableFormData?.trueSettledAmount || 0,
                id: apportionTableFormData?.id ?? '',
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [apportionTableFormData]);

    const onFinish = () => {
        apportionForm
            .validateFields()
            .then((values) => {
                if (parseInt(values?.balancedAmount) < parseInt(values?.writeOffAmount) + parseInt(values?.apportionAmount)) {
                    showGlobalNotification({ title: translateContent('global.notificationSuccess.error'), message: translateContent('creditDebitNote.ApportionDetails.message.errorMessage') });
                } else if (!isEditing) {
                    const data = { ...values, id: '', apportionAmount: Number(values?.apportionAmount), balancedAmount: Number(values?.balancedAmount), settledAmount: Number(values?.settledAmount), writeOffAmount: Number(values?.writeOffAmount) };
                    setApportionTableData([data, ...apportionTableData]);
                    apportionForm.resetFields();
                    handleFormValueChange();
                    setAdvanceSearchVisible(false);
                } else {
                    const data = { ...values, apportionAmount: Number(values?.apportionAmount), balancedAmount: Number(values?.balancedAmount), settledAmount: Number(values?.settledAmount), writeOffAmount: Number(values?.writeOffAmount) };
                    const newarr = [...apportionTableData];
                    newarr[apportionTableFormData?.index] = data;
                    setApportionTableData(newarr);
                    setAdvanceSearchVisible(false);
                    handleFormValueChange();
                    setisEditing(false);
                }
                setApportionTableFormData();
            })
            .catch((err) => console.error(err));
    };
    const calculateApportionDetails = ({ formValues, type }) => {
        switch (type) {
            case APPORTION_CONSTANTS?.APPORTION_AMOUNT?.key: {
                try {
                    if (formValues.apportionAmount >= 0 && formValues?.apportionAmount <= voucherTableSum) {
                        const settledCalculate = formValues?.settledAmount + formValues?.apportionAmount;
                        const balancedCalculate = formValues?.balancedAmount - (formValues?.writeOffAmount + formValues?.apportionAmount);
                        if (settledCalculate >= 0 && balancedCalculate >= 0) {
                            apportionForm.setFieldsValue({
                                settledAmount: settledCalculate?.toFixed(2),
                                balancedAmount: balancedCalculate?.toFixed(2),
                            });
                            return Promise.resolve();
                        } else {
                            if (settledCalculate < 0) return Promise.reject(new Error('settled amount cannot be negative'));
                            if (balancedCalculate < 0) {
                                return Promise.reject(new Error('apportion amount is greater than balanced amount '));
                            }
                        }
                    } else {
                        if (formValues.apportionAmount < 0) {
                            return Promise.reject(new Error('apportionAmount cannot be negative'));
                        } else {
                            if (formValues?.apportionAmount > voucherTableSum) {
                                return Promise.reject(new Error(`apportionAmount cannot be greater than ${voucherTableSum}`));
                            }
                            return Promise.resolve();
                        }
                    }
                } catch (err) {
                    console.error(err);
                }
                break;
            }
            case APPORTION_CONSTANTS?.WRITE_OFF_AMOUNT?.key: {
                try {
                    if (formValues?.writeOffAmount >= 0) {
                        const settledCalculate = formValues?.settledAmount + formValues?.apportionAmount;
                        const balancedCalculate = formValues?.balancedAmount - (formValues?.writeOffAmount + formValues?.apportionAmount);
                        if (settledCalculate >= 0 && balancedCalculate >= 0) {
                            apportionForm.setFieldsValue({
                                balancedAmount: balancedCalculate?.toFixed(2),
                            });
                            return Promise.resolve();
                        } else {
                            if (settledCalculate < 0) return Promise.reject(new Error('received amount cannot be negative'));
                            if (balancedCalculate < 0) {
                                return Promise.reject(new Error('write of amount is greater than balanced amount '));
                            }
                        }
                    } else {
                        if (Number(formValues?.writeOffAmount) < 0) {
                            return Promise.reject(new Error('write of amount cannot be negative'));
                        } else {
                            return Promise.resolve();
                        }
                    }
                } catch (err) {
                    console.error(err);
                }
                break;
            }
            default: {
                return Promise.resolve();
            }
        }
    };
    const handleDocumentNumberSearch = (values) => {
        if (!values) return false;

        if (apportionTableData?.find((i) => i?.documentNumber === values)) {
            showGlobalNotification({ message: translateContent('creditDebitNote.ApportionDetails.message.duplicateDocumentNumber') });
            return false;
        }

        const onErrorAction = (message) => {
            showGlobalNotification({ message });
        };
        const onSuccessAction = (res) => {
            if (!res?.data) {
                showGlobalNotification({ title: translateContent('global.notificationSuccess.error'), message: translateContent('creditDebitNote.ApportionDetails.message.documentInvalid') });
            } else {
                const apportionValues = res?.data;
                apportionForm.setFieldsValue({
                    ...apportionValues,
                    documentDate: formatDateToCalenderDate(apportionValues?.documentDate),
                    settledAmount: apportionValues?.receivedAmount,
                    trueBalanceAmount: apportionValues?.balancedAmount || 0,
                    trueSettledAmount: apportionValues?.receivedAmount || 0,
                });
            }
        };
        apportionForm
            .validateFields(['documentNumber', 'documentType'])
            .then(({ documentNumber, documentType }) => {
                fetchInvoiceList({
                    setIsLoading: listInvoiceShowLoading,
                    onErrorAction,
                    onSuccessAction,
                    userId,
                    extraParams: [
                        {
                            key: 'documentNumber',
                            value: documentNumber,
                        },
                        {
                            key: 'documentType',
                            value: documentType,
                        },
                        {
                            key: 'type',
                            value: record?.voucherType,
                        },
                    ],
                    customURL: BASE_URL_APPORTION_DETAILS_SEARCH,
                });
            })
            .catch((err) => console.error(err));
    };
    const resetApportionForm = () => {
        apportionForm.resetFields(['documentDate', 'documentAmount', 'settledAmount', 'balancedAmount', 'writeOffAmount', 'apportionAmount']);
    };
    return (
        <Form autoComplete="off" layout="vertical" form={apportionForm}>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item label={translateContent('creditDebitNote.ApportionDetails.label.documentType')} name="documentType" rules={[validateRequiredSelectField(translateContent('creditDebitNote.ApportionDetails.validation.documentType'))]}>
                                {customSelectBox({
                                    data: documentTypeOptions?.reduce((prev, curr) => {
                                        const finder = apportionTableData?.find((item) => item?.documentType === curr?.documentCode || item?.documentType === curr?.documentDescription);
                                        prev.push({ ...curr, disabled: !!finder });
                                        return prev;
                                    }, []),
                                    disabled: isEditing,
                                    placeholder: preparePlaceholderSelect(translateContent('creditDebitNote.ApportionDetails.placeholder.documentType')),
                                    fieldNames: { key: 'documentCode', value: 'documentDescription' },
                                })}
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item
                                name="documentNumber"
                                label={translateContent('creditDebitNote.ApportionDetails.label.documentNumber')}
                                rules={[
                                    validateRequiredInputField(translateContent('creditDebitNote.ApportionDetails.validation.documentNumber')),
                                    {
                                        validator: (_, value) => {
                                            if (apportionTableData?.find((item) => item?.documentNumber === value) && !isEditing) {
                                                return Promise.reject(new Error('documentNumber already present'));
                                            }
                                            return Promise.resolve();
                                        },
                                    },
                                ]}
                            >
                                <Search disabled={isEditing} loading={isApportionDetailsLoading} allowClear placeholder={preparePlaceholderText(translateContent('creditDebitNote.ApportionDetails.placeholder.documentNumber'))} onSearch={handleDocumentNumberSearch} onChange={(e) => resetApportionForm(apportionForm.getFieldValue('documentType'), e.target.value)} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item label={translateContent('creditDebitNote.ApportionDetails.label.documentDate')} name="documentDate" rules={[validateRequiredInputField(translateContent('creditDebitNote.ApportionDetails.validation.documentDate'))]}>
                                <DatePicker disabled={true} format={dateFormat} className={styles.fullWidth} disabledDate={disableFutureDate} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item label={translateContent('creditDebitNote.ApportionDetails.label.documentAmount')} name="documentAmount" rules={[validateRequiredInputField(translateContent('creditDebitNote.ApportionDetails.validation.documentAmount'))]}>
                                <Input maxLength={30} placeholder={preparePlaceholderText(translateContent('creditDebitNote.ApportionDetails.placeholder.documentAmount'))} disabled={true} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item label={translateContent('creditDebitNote.ApportionDetails.label.settledAmount')} name="settledAmount" rules={[validateRequiredInputField(translateContent('creditDebitNote.ApportionDetails.validation.settledAmount'))]}>
                                <Input maxLength={30} placeholder={preparePlaceholderText(translateContent('creditDebitNote.ApportionDetails.placeholder.settledAmount'))} disabled={true} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item label={translateContent('creditDebitNote.ApportionDetails.label.balancedAmount')} name="balancedAmount" rules={[validateRequiredInputField(translateContent('creditDebitNote.ApportionDetails.validation.balancedAmount'))]}>
                                <Input maxLength={30} placeholder={preparePlaceholderText(translateContent('creditDebitNote.ApportionDetails.placeholder.balancedAmount'))} disabled={true} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item
                                label={translateContent('creditDebitNote.ApportionDetails.label.writeOffAmount')}
                                name="writeOffAmount"
                                rules={[
                                    validateRequiredInputField(translateContent('creditDebitNote.ApportionDetails.validation.writeOffAmount')),
                                    validateNumberWithTwoDecimalPlaces(translateContent('creditDebitNote.ApportionDetails.validation.writeOffAmount')),
                                    { validator: (_, writeOfVal) => calculateApportionDetails({ formValues: { ...apportionForm.getFieldsValue(), writeOffAmount: Number(writeOfVal), apportionAmount: Number(apportionForm.getFieldValue('apportionAmount')) || 0, settledAmount: Number(apportionForm.getFieldValue('trueSettledAmount')) || 0, balancedAmount: Number(apportionForm.getFieldValue('trueBalanceAmount')) || 0 }, type: APPORTION_CONSTANTS?.WRITE_OFF_AMOUNT?.key }) },
                                ]}
                            >
                                <Input disabled={isApportionDetailsLoading} maxLength={30} placeholder={preparePlaceholderText(translateContent('creditDebitNote.ApportionDetails.placeholder.writeOffAmount'))} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item name="trueBalanceAmount" hidden />
                            <Form.Item name="trueSettledAmount" hidden />
                            <Form.Item
                                label={translateContent('creditDebitNote.ApportionDetails.label.apportionAmount')}
                                name="apportionAmount"
                                rules={[
                                    validateRequiredInputField('Apportion Amount'),
                                    validateNumberWithTwoDecimalPlaces(translateContent('creditDebitNote.ApportionDetails.validation.apportionAmount')),
                                    { validator: (_, apportionVal) => calculateApportionDetails({ formValues: { ...apportionForm.getFieldsValue(), apportionAmount: Number(apportionVal) || 0, settledAmount: Number(apportionForm.getFieldValue('trueSettledAmount')) || 0, balancedAmount: Number(apportionForm.getFieldValue('trueBalanceAmount')) || 0, writeOffAmount: Number(apportionForm.getFieldValue('writeOffAmount')) || 0 }, type: APPORTION_CONSTANTS?.APPORTION_AMOUNT?.key }) },
                                ]}
                            >
                                <Input disabled={isApportionDetailsLoading} maxLength={30} placeholder={preparePlaceholderText(translateContent('creditDebitNote.ApportionDetails.placeholder.apportionAmount'))} />
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
                            <Button onClick={onFinish} type="primary">
                                {translateContent('global.buttons.save')}
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Form>
    );
};

export const ApportionAddEditForm = withModal(AdvanceForm, {});
