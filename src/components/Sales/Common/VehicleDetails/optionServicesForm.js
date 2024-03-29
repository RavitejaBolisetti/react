/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Col, Input, Form, Row, Select, Button } from 'antd';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { validateRequiredInputField, validateNumberWithTwoDecimalPlaces, validateRequiredSelectField } from 'utils/validation';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

const OptionServicesFormMain = (props) => {
    const { vehicleServiceData, handleCancel, handleFormValueChange, optionalServices, setOptionalServices, selectedOrderId, formData, optionForm, editingOptionalData, setEditingOptionalData } = props;
    const [uniqueServiceOptions, setUniqueServiceOptions] = useState(vehicleServiceData);

    useEffect(() => {
        if (optionalServices) {
            setUniqueServiceOptions(uniqueServiceOptions?.map((element) => ({ ...element, disabled: optionalServices?.findIndex((i) => i?.serviceName === element?.chargeDescription && i?.status) !== -1 })));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [optionalServices]);

    const onFinish = () => {
        optionForm
            .validateFields()
            .then((values) => {
                const data = { serviceName: values?.serviceName, amount: values?.amount, taxId: values?.taxId, id: values?.id || '', status: values?.status || false };
                setOptionalServices((prev) => {
                    if (Object.keys(editingOptionalData || {})?.length) {
                        let updatedVal = [...prev];
                        const index = updatedVal?.findIndex((i) => i?.serviceName === editingOptionalData?.serviceName);
                        updatedVal?.splice(index, 1, { ...values });
                        return updatedVal;
                    } else {
                        return [...optionalServices, data];
                    }
                });
                optionForm.resetFields();
                handleFormValueChange();
                setEditingOptionalData({});
            })
            .catch((err) => console.error(err));
    };

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Form autoComplete="off" layout="vertical" form={optionForm} onFinish={onFinish} data-testid="logRole">
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                <Form.Item name="taxId" label={translateContent('vehicleInvoiceGeneration.label.vehicleDetails.optionalServices.serviceName')} rules={[validateRequiredSelectField(translateContent('vehicleInvoiceGeneration.label.vehicleDetails.optionalServices.serviceName'))]}>
                                    <Select onChange={(value, selectedObj) => optionForm.setFieldsValue({ serviceName: selectedObj?.chargeDescription })} options={uniqueServiceOptions} fieldNames={{ label: 'chargeDescription', value: 'id' }} placeholder={preparePlaceholderSelect(translateContent('vehicleInvoiceGeneration.label.vehicleDetails.optionalServices.serviceName'))} allowClear />
                                </Form.Item>
                                <Form.Item hidden name="otfNumber" initialValue={selectedOrderId} />
                                <Form.Item hidden name="otfId" initialValue={formData?.otfId ?? ''} />
                                <Form.Item hidden name="serviceName" />
                                <Form.Item hidden name="status" initialValue={true} />
                                <Form.Item hidden name="id" />
                            </Col>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item label={translateContent('vehicleInvoiceGeneration.label.vehicleDetails.optionalServices.amount')} name="amount" rules={[validateRequiredInputField(translateContent('vehicleInvoiceGeneration.label.vehicleDetails.optionalServices.amount')), validateNumberWithTwoDecimalPlaces(translateContent('vehicleInvoiceGeneration.label.vehicleDetails.optionalServices.amount'))]}>
                                    <Input maxLength={7} placeholder={preparePlaceholderText(translateContent('vehicleInvoiceGeneration.label.vehicleDetails.optionalServices.amount'))} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8} className={styles.marT30}>
                                <Button className={styles.marR20} onClick={onFinish} type="primary">
                                    {translateContent('global.buttons.save')}
                                </Button>
                                <Button onClick={handleCancel} danger>
                                    {translateContent('global.buttons.cancel')}
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </>
    );
};

export const OptionServicesForm = OptionServicesFormMain;
