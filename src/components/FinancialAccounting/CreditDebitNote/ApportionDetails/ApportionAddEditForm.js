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

const { Search } = Input;

export const AdvanceForm = (props) => {
    const { apportionTableFormData, setApportionTableFormData } = props;
    const { handleCancel, handleFormValueChange, apportionForm } = props;
    const { setAdvanceSearchVisible } = props;
    const { isVisible, setisEditing, isEditing } = props;
    const { showGlobalNotification, fetchInvoiceList, listInvoiceShowLoading, userId, apportionTableData, setApportionTableData, documentTypeOptions, setDocumentTypeOptions } = props;

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
                id: apportionTableFormData?.id ?? '',
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [apportionTableFormData]);

    useEffect(() => {
        const arr = [];

        if (documentTypeOptions && documentTypeOptions?.length) {
            apportionTableData?.map((element) => {
                arr.push(element?.documentType);
                return undefined;
            });

            setDocumentTypeOptions(
                documentTypeOptions?.map((element) => {
                    if (arr?.includes(element?.documentDescription) || arr?.includes(element?.documentCode)) {
                        return { ...element, disabled: true };
                    } else {
                        return { ...element, disabled: false };
                    }
                })
            );
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [apportionTableData]);

    const onFinish = () => {
        apportionForm
            .validateFields()
            .then(() => {
                const values = apportionForm.getFieldsValue();
                if (parseInt(values?.balancedAmount) < parseInt(values?.writeOffAmount) + parseInt(values?.apportionAmount)) {
                    showGlobalNotification({ notificationType: 'error', title: translateContent('global.notificationSuccess.error'), message: translateContent('creditDebitNote.ApportionDetails.message.errorMessage') });
                } else if (!isEditing) {
                    const data = { ...values, id: '' };
                    setApportionTableData([data, ...apportionTableData]);
                    apportionForm.resetFields();
                    handleFormValueChange();
                    setAdvanceSearchVisible(false);
                } else {
                    const data = { ...values };
                    const newarr = [...apportionTableData];

                    newarr[apportionTableFormData?.index] = data;
                    setApportionTableData(newarr);
                    setAdvanceSearchVisible(false);
                    handleFormValueChange();
                    setisEditing(false);
                }
                setApportionTableFormData();
            })
            .catch((err) => {});
    };

    const handleDocumentNumberSearch = (values) => {
        const extraParams = [
            {
                key: 'invoiceId',
                title: 'Invoice ID',
                value: values,
            },
        ];
        const onErrorAction = (message) => {
            showGlobalNotification({ message });
        };
        const onSuccessAction = (res) => {
            if (typeof res?.data[0] === 'undefined') {
                showGlobalNotification({ notificationType: 'error', title: translateContent('global.notificationSuccess.error'), message: translateContent('creditDebitNote.ApportionDetails.message.documentInvalid') });
                return;
            }
            const apportionValues = res?.data[0];
            apportionForm.setFieldsValue({
                documentDate: formatDateToCalenderDate(apportionValues?.invoiceDate),
                documentAmount: apportionValues?.invoiceAmount,
                settledAmount: apportionValues?.receivedAmount,
                balancedAmount: apportionValues?.invoiceAmount - apportionValues?.receivedAmount,
            });
        };
        values && fetchInvoiceList({ setIsLoading: listInvoiceShowLoading, onErrorAction, onSuccessAction, userId, extraParams });
    };

    return (
        <Form autoComplete="off" layout="vertical" form={apportionForm}>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item label={translateContent('creditDebitNote.ApportionDetails.label.documentType')} name="documentType" rules={[validateRequiredSelectField(translateContent('creditDebitNote.ApportionDetails.validation.documentType'))]}>
                                {customSelectBox({ data: documentTypeOptions, placeholder: preparePlaceholderSelect(translateContent('creditDebitNote.ApportionDetails.placeholder.documentType')), fieldNames: { key: 'documentCode', value: 'documentDescription' } })}
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item name="documentNumber" label={translateContent('creditDebitNote.ApportionDetails.label.documentNumber')} rules={[validateRequiredInputField(translateContent('creditDebitNote.ApportionDetails.validation.documentNumber'))]}>
                                <Search allowClear placeholder={preparePlaceholderText(translateContent('creditDebitNote.ApportionDetails.placeholder.documentNumber'))} onSearch={handleDocumentNumberSearch} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item label={translateContent('creditDebitNote.ApportionDetails.label.documentDate')} name="documentDate" rules={[validateRequiredInputField(translateContent('creditDebitNote.ApportionDetails.validation.documentDate'))]}>
                                <DatePicker format={dateFormat} className={styles.fullWidth} disabledDate={disableFutureDate} disabled={true} />
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
                            <Form.Item label={translateContent('creditDebitNote.ApportionDetails.label.writeOffAmount')} name="writeOffAmount" rules={[validateRequiredInputField(translateContent('creditDebitNote.ApportionDetails.validation.writeOffAmount')), validateNumberWithTwoDecimalPlaces(translateContent('creditDebitNote.ApportionDetails.validation.writeOffAmount'))]}>
                                <Input maxLength={30} placeholder={preparePlaceholderText(translateContent('creditDebitNote.ApportionDetails.placeholder.writeOffAmount'))} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item label={translateContent('creditDebitNote.ApportionDetails.label.apportionAmount')} name="apportionAmount" rules={[validateRequiredInputField('Apportion Amount'), validateNumberWithTwoDecimalPlaces(translateContent('creditDebitNote.ApportionDetails.validation.apportionAmount'))]}>
                                <Input maxLength={30} placeholder={preparePlaceholderText(translateContent('creditDebitNote.ApportionDetails.placeholder.apportionAmount'))} />
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
