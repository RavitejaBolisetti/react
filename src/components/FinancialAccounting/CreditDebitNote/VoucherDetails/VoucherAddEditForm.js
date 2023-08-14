/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Col, Input, Form, Row, Button } from 'antd';

import { withModal } from 'components/withModal';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

import { validateRequiredInputField, validateRequiredSelectField, validationNumber } from 'utils/validation';

import styles from 'components/common/Common.module.css';

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
        ];
        const onErrorAction = (message) => {
            showGlobalNotification({ message });
        };
        // message english has to be verified and made constant
        const onSuccessAction = (res) => {
            if (res.data) {
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: 'Account Head validated successfully ' });
                setIsAccountHeadValidated(false);
            } else {
                showGlobalNotification({ notificationType: 'error', title: 'Error', message: 'Account Head is not correct' });
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
                } else {
                    const data = { ...values };
                    const newarr = [...voucherTableData];

                    newarr[voucherTableFormData?.index] = data;
                    setVoucherTableData(newarr);
                    setAdvanceSearchVisible(false);
                    handleFormValueChange();
                    setisEditing(false);
                }
                setVoucherTableFormData();
            })
            .catch((err) => {
                console.log('err', err);
                console.log('voucherTableData', voucherTableData);
            });
    };
    const onFinishFailed = () => {
        return;
    };
    const handleAccountChange = () => {
        setIsAccountHeadValidated(true);
    };
    return (
        <Form autoComplete="off" layout="vertical" form={voucherForm} onFinishFailed={onFinishFailed}>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item name="accountCode" label="Account Head" rules={[validateRequiredSelectField('Account Head')]}>
                                <Search allowClear placeholder={preparePlaceholderText('Account Head')} onChange={handleAccountChange} onSearch={handleFinancialAccountValidate} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item label="Narration" name="accountNarration" rules={[validateRequiredInputField('narration')]}>
                                <Input allowClear placeholder={preparePlaceholderText('narration')} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <Form.Item label="Amount" name="amount" rules={[validateRequiredInputField('Amount'), validationNumber('amount')]}>
                                <Input maxLength={30} placeholder={preparePlaceholderText('Amount')} />
                            </Form.Item>
                            <Form.Item name="id" hidden></Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.alignLeft}>
                            <Button onClick={handleCancel} danger>
                                Cancel
                            </Button>
                        </Col>

                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.alignRight}>
                            <Button disabled={isAccountHeadValidated} onClick={onFinish} type="primary">
                                Save
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Form>
    );
};

export const VoucherAddEditForm = withModal(AdvanceForm, {});
