/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Col, Input, Form, Row, Button } from 'antd';

import { withModal } from 'components/withModal';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

import { validateRequiredInputField, validationNumber } from 'utils/validation';

import styles from 'components/common/Common.module.css';

export const AdvanceForm = (props) => {
    const { AdvanceformData, setAdvanceformData } = props;
    const { handleCancel, handleFormValueChange, optionsServiceModified, setoptionsServiceModified, aggregateForm } = props;
    const { setAdvanceSearchVisible } = props;
    const { isVisible, setisEditing, isEditing } = props;
    const { itemOptions, setitemOptions } = props;

    useEffect(() => {
        if (AdvanceformData && isVisible) {
            aggregateForm.setFieldsValue({
                item: AdvanceformData?.item ?? '',
                make: AdvanceformData?.make ?? '',
                serialNo: AdvanceformData?.serialNo ?? '',
                id: AdvanceformData?.id ?? '',
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [AdvanceformData]);
    useEffect(() => {
        const arr = [];
        if (itemOptions && itemOptions?.length) {
            optionsServiceModified?.map((element) => {
                arr.push(element?.item);
                return false;
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
    }, [optionsServiceModified]);

    const onFinish = () => {
        aggregateForm
            .validateFields()
            .then(() => {
                const values = aggregateForm.getFieldsValue();
                if (!isEditing) {
                    const data = { ...values, id: '' };
                    setoptionsServiceModified([data, ...optionsServiceModified]); //Adding data to table

                    aggregateForm.resetFields();
                    handleFormValueChange();
                    setAdvanceSearchVisible(false);
                } else {
                    const data = { ...values };
                    //console.log('data', data);
                    const newarr = [...optionsServiceModified];
                    //console.log('newarr', newarr);

                    newarr[AdvanceformData?.index] = data;
                    setoptionsServiceModified(newarr);
                    setAdvanceSearchVisible(false);
                    handleFormValueChange();
                    setisEditing(false);
                }
                setAdvanceformData();
            })
            .catch((err) => {});
    };
    const onFinishFailed = () => {
        return;
    };

    return (
        <Form autoComplete="off" layout="vertical" form={aggregateForm} onFinishFailed={onFinishFailed}>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item label="Service Name" name="serviceName" rules={[validateRequiredInputField('service name')]}>
                                <Input maxLength={30} placeholder={preparePlaceholderText('service name')} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item label="Amount" name="amount" rules={[validateRequiredInputField('amount'), validationNumber('amount')]}>
                                <Input maxLength={30} placeholder={preparePlaceholderText('amount')} />
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

export const OptionalServiceAddEditForm = withModal(AdvanceForm, {});
