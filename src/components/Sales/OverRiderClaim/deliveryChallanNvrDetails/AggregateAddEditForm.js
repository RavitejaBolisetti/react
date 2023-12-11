/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Col, Input, Form, Row, Select, Button } from 'antd';

import { withModal } from 'components/withModal';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { translateContent } from 'utils/translateContent';
import { PARAM_MASTER } from 'constants/paramMaster';

import { validateRequiredInputField, validateRequiredSelectField, validationFieldLetterAndNumber } from 'utils/validation';

import styles from 'assets/sass/app.module.scss';

export const AdvanceForm = (props) => {
    const { AdvanceformData, setAdvanceformData } = props;
    const { handleCancel, handleFormValueChange, optionalServices, typeData, setOptionalServices, aggregateForm } = props;
    const { setAdvanceSearchVisible } = props;
    const { isVisible, setisEditing, isEditing } = props;
    const { itemOptions, setitemOptions, makeOptions, MakefieldNames, ItemFieldNames, page, setmakeOptions, setPage } = props;
 
    useEffect(() => {
        const arr = [];
        if (itemOptions && itemOptions?.length) {
            optionalServices?.map((element) => {
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
    }, [optionalServices]);

    const onFinish = () => {
        aggregateForm
            .validateFields()
            .then(() => {
                const values = aggregateForm.getFieldsValue();
                if (!isEditing) {
                    const data = { ...values, id: '' };
                    setOptionalServices([data, ...optionalServices]?.map((item, indexVal) => ({ ...item, uniqueId: indexVal }))); //Adding data to table
                    aggregateForm.resetFields();
                    setAdvanceSearchVisible(false);
                    setPage((prev) => ({ ...prev, current: 1 }));
                } else {
                    const data = { ...values };
                    const newarr = [...optionalServices];
                    newarr[AdvanceformData?.index] = data;
                    setOptionalServices(newarr);
                    setAdvanceSearchVisible(false);
                    setisEditing(false);
                    setPage((prev) => ({ ...prev, current: prev?.current }));
                }
                setAdvanceformData();
                handleFormValueChange();
            })
            .catch((err) => {});
    };


    return (
        <Form autoComplete="off" layout="vertical" form={aggregateForm}>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item name="item" label={translateContent('vehicleDetail.productDetails.label.item')} rules={[validateRequiredSelectField('Item')]}>
                                <Select allowClear placeholder={preparePlaceholderText(translateContent('vehicleDetail.productDetails.label.item'))} options={itemOptions} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item label={translateContent('vehicleDetail.productDetails.label.make')} name="make" rules={[validateRequiredInputField('Make')]}>
                                <Select allowClear placeholder={preparePlaceholderText(translateContent('vehicleDetail.productDetails.label.make'))} fieldNames={MakefieldNames} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <Form.Item label={translateContent('vehicleDetail.productDetails.label.serialNo')} name="serialNo" rules={[validateRequiredInputField('Srl no'), validationFieldLetterAndNumber('Srl no')]}>
                                <Input maxLength={30} placeholder={preparePlaceholderText(translateContent('vehicleDetail.productDetails.label.serialNo'))} />
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

export const AggregateAddEditForm = withModal(AdvanceForm, {});
