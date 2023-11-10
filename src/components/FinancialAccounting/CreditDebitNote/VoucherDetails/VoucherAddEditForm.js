/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Col, Input, Form, Row, Button } from 'antd';

import { withModal } from 'components/withModal';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

import { validateRequiredInputField, validateRequiredSelectField, validateNumberWithTwoDecimalPlaces } from 'utils/validation';
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';

const { Search } = Input;

export const AdvanceForm = (props) => {
    const { voucherTableFormData, setVoucherTableFormData } = props;
    const { handleCancel, handleFormValueChange, voucherForm } = props;
    const { setAdvanceSearchVisible } = props;
    const { isVisible, setisEditing, isEditing } = props;
    const { itemOptions, setitemOptions, userId, showGlobalNotification } = props;

    const { fetchFinancialAccountList, listFinanceShowLoading, voucherTableData, setVoucherTableData, isAccountHeadValidated, setIsAccountHeadValidated } = props;

    const handleFinancialAccountValidate = (values) => {
        const extraParams = [
            {
                key: 'code',
                title: 'Code',
                value: values,
            },
            {
                key: 'onlyActive',
                title: 'onlyActive',
                value: 'YES',
            },
        ];
        const onErrorAction = (message) => {
            showGlobalNotification({ message });
        };

        const onSuccessAction = (res) => {
            if (res.data) {
                showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: translateContent('creditDebitNote.voucherDetails.message.successMessage') });
                setIsAccountHeadValidated(false);
            } else {
                showGlobalNotification({ notificationType: 'error', title: translateContent('global.notificationSuccess.error'), message: translateContent('creditDebitNote.voucherDetails.message.errorMessage') });
            }
        };
        values && fetchFinancialAccountList({ setIsLoading: listFinanceShowLoading, onErrorAction, onSuccessAction, userId, extraParams });
    };

    useEffect(() => {
        if (voucherTableFormData && isVisible) {
            voucherForm.setFieldsValue({
                accountCode: voucherTableFormData?.accountCode ?? '',
                accountNarration: voucherTableFormData?.accountNarration ?? '',
                amount: voucherTableFormData?.amount ?? '',
                id: voucherTableFormData?.id ?? '',
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [voucherTableFormData]);

    useEffect(() => {
        const arr = [];
        if (itemOptions && itemOptions?.length) {
            voucherTableData?.map((element) => {
                arr.push(element?.item);
                return undefined;
            });
            setitemOptions(
                itemOptions?.map((element) => {
                    if (arr?.includes(element?.value) || arr?.includes(element?.key)) {
                        return { ...element, disabled: true };
                    } else {
                        return { ...element, disabled: false };
                    }
                })
            );
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [voucherTableData]);

    const onFinish = () => {
        voucherForm
            .validateFields()
            .then(() => {
                const values = voucherForm.getFieldsValue();
                if (!isEditing) {
                    const data = { ...values, id: '' };
                    setVoucherTableData([data, ...voucherTableData]);

                    voucherForm.resetFields();
                    handleFormValueChange();
                    setAdvanceSearchVisible(false);
                    setIsAccountHeadValidated(true);
                } else {
                    const data = { ...values };
                    const newarr = [...voucherTableData];

                    newarr[voucherTableFormData?.index] = data;
                    setVoucherTableData(newarr);
                    setAdvanceSearchVisible(false);
                    handleFormValueChange();
                    setisEditing(false);
                    setIsAccountHeadValidated(true);
                }
                setVoucherTableFormData();
            })
            .catch((err) => {});
    };

    const handleAccountChange = () => {
        setIsAccountHeadValidated(true);
    };

    const handleFormValuesChange = (value) => {
        if (!isEditing) return false;
        if (Object.keys(value).includes('accountCode')) {
            setIsAccountHeadValidated(true);
        } else {
            setIsAccountHeadValidated(false);
        }
    };
    return (
        <Form autoComplete="off" layout="vertical" form={voucherForm} onValuesChange={handleFormValuesChange}>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item name="accountCode" label={translateContent('creditDebitNote.voucherDetails.label.accountHead')} rules={[validateRequiredSelectField(translateContent('creditDebitNote.voucherDetails.label.accountHead'))]}>
                                <Search allowClear placeholder={preparePlaceholderText(translateContent('creditDebitNote.voucherDetails.placeholder.accountHead'))} onChange={handleAccountChange} onSearch={handleFinancialAccountValidate} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item label={translateContent('creditDebitNote.voucherDetails.label.accountNarration')} name="accountNarration" rules={[validateRequiredInputField(translateContent('creditDebitNote.voucherDetails.label.accountNarration'))]}>
                                <Input allowClear placeholder={preparePlaceholderText(translateContent('creditDebitNote.voucherDetails.placeholder.accountNarration'))} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <Form.Item label={translateContent('creditDebitNote.voucherDetails.label.amount')} name="amount" rules={[validateRequiredInputField(translateContent('creditDebitNote.voucherDetails.label.amount')), validateNumberWithTwoDecimalPlaces(translateContent('creditDebitNote.voucherDetails.label.amount'))]}>
                                <Input maxLength={30} placeholder={preparePlaceholderText(translateContent('creditDebitNote.voucherDetails.placeholder.amount'))} />
                            </Form.Item>
                            <Form.Item name="id" hidden></Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.alignLeft}>
                            <Button onClick={handleCancel} danger>
                                {translateContent('global.buttons.cancel')}
                            </Button>
                        </Col>

                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.alignRight}>
                            <Button disabled={isAccountHeadValidated} onClick={onFinish} type="primary">
                                {translateContent('global.buttons.save')}
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Form>
    );
};

export const VoucherAddEditForm = withModal(AdvanceForm, {});
