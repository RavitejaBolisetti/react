/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Col, Input, Form, Row, Select, Button, DatePicker } from 'antd';

import { withModal } from 'components/withModal';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { dateFormat, formatDateToCalenderDate } from 'utils/formatDateTime';
import { disableFutureDate } from 'utils/disableDate';

import { validateRequiredInputField, validateRequiredSelectField, validateNumberWithTwoDecimalPlaces } from 'utils/validation';
import { customSelectBox } from 'utils/customSelectBox';

import styles from 'components/common/Common.module.css';

const { Search } = Input;

export const AdvanceForm = (props) => {
    const { apportionTableFormData, setApportionTableFormData } = props;
    const { handleCancel, handleFormValueChange, apportionForm } = props;
    const { setAdvanceSearchVisible } = props;
    const { isVisible, setisEditing, isEditing } = props;
    const { showGlobalNotification, fetchInvoiceList, listInvoiceShowLoading, userId, apportionTableData, setApportionTableData, isDocumentTypeLoading, documentTypeOptions, setDocumentTypeOptions } = props;

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
                    showGlobalNotification({ notificationType: 'error', title: 'Error', message: 'Write-off and apportion amount cannot exceed balance amount' });
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
    const onFinishFailed = () => {
        return;
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
                showGlobalNotification({ notificationType: 'error', title: 'Error', message: 'Document Number is invalid' });
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

    const selectProps = {
        optionFilterProp: 'children',
        showSearch: true,
        allowClear: true,
        loading: isDocumentTypeLoading,
    };
    return (
        <Form autoComplete="off" layout="vertical" form={apportionForm} onFinishFailed={onFinishFailed}>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item label="Document Type" name="documentType" rules={[validateRequiredSelectField('Document Type')]}>
                                {customSelectBox({ data: documentTypeOptions, placeholder: preparePlaceholderSelect('Document type'), fieldNames: { key: 'documentCode', value: 'documentDescription' } })}
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item name="documentNumber" label="Document Number" rules={[validateRequiredInputField('Document Number')]}>
                                <Search allowClear placeholder={preparePlaceholderText('Document Number')} onSearch={handleDocumentNumberSearch} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item label="Document Date" name="documentDate" rules={[validateRequiredInputField('Document Date')]}>
                                <DatePicker format={dateFormat} className={styles.fullWidth} disabledDate={disableFutureDate} disabled={true} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item label="Document Amount" name="documentAmount" rules={[validateRequiredInputField('Document Amount')]}>
                                <Input maxLength={30} placeholder={preparePlaceholderText('Document Amount')} disabled={true} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item label="Settled Amount" name="settledAmount" rules={[validateRequiredInputField('Settled Amount')]}>
                                <Input maxLength={30} placeholder={preparePlaceholderText('Settled Amount')} disabled={true} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item label="Balanced Amount" name="balancedAmount" rules={[validateRequiredInputField('Balanced Amount')]}>
                                <Input maxLength={30} placeholder={preparePlaceholderText('Balanced Amount')} disabled={true} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item label="Write-Off Amount" name="writeOffAmount" rules={[validateRequiredInputField('Write-Off Amount'), validateNumberWithTwoDecimalPlaces('write-off amount')]}>
                                <Input maxLength={30} placeholder={preparePlaceholderText('Write-Off Amount')} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item label="Apportion Amount" name="apportionAmount" rules={[validateRequiredInputField('Apportion Amount'), validateNumberWithTwoDecimalPlaces('apportion amount')]}>
                                <Input maxLength={30} placeholder={preparePlaceholderText('Apportion Amount')} />
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
                            <Button onClick={onFinish} type="primary">
                                Save
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Form>
    );
};

export const ApportionAddEditForm = withModal(AdvanceForm, {});
