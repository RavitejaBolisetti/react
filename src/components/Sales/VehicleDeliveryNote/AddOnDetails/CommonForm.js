/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Row, Button, Col, Input, Form } from 'antd';

import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { validateRequiredInputField } from 'utils/validation';
import { customSelectBox } from 'utils/customSelectBox';
import styles from 'assets/sass/app.module.scss';

const { Search } = Input;
const CommonForm = ({ formData, typeData, shieldForm, setformDataSetter, formDataSetter, openAccordian, formActionType, handleFormValueChange }) => {
    const [isReadOnly, setisReadOnly] = useState(false);
    useEffect(() => {
        if ((formData === undefined || formData?.id === null || formData?.id === '') && !formActionType?.viewMode) {
            setisReadOnly(false);
        } else {
            setisReadOnly(true);
        }
        shieldForm.setFieldsValue({
            schemeAmount: formData?.schemeAmount,
            // ? formData?.sheildRequest?.schemeAmount : !formActionType?.viewMode ? null : 'NA',
            // shieldRate: formData?.shield?.shieldRate ? formData?.shield?.shieldRate : !formActionType?.viewMode ? null : 'NA',
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    const onFinishFailed = () => {};
    const onValuesChange = (values) => {
        const Myvalues = shieldForm.getFieldsValue();
        setformDataSetter({ ...formDataSetter, shield: { ...Myvalues } });
    };

    return (
        <Form form={shieldForm} onValuesChange={onValuesChange} onFieldsChange={handleFormValueChange} autoComplete="off" layout="vertical" onFinishFailed={onFinishFailed}>
            <Row gutter={20}>
                {openAccordian === 'AMC' && (
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Scheme Type" name="schemeType" rules={[validateRequiredInputField('Scheme Type')]}>
                            {customSelectBox({ placeholder: preparePlaceholderText('Scheme Type') })}
                        </Form.Item>
                    </Col>
                )}
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label="Scheme Description" name="schemeDescription" rules={[validateRequiredInputField('Sale Type')]}>
                        {customSelectBox({ placeholder: preparePlaceholderText('Scheme Description') })}
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label="Sale Type" name="saleType" rules={[validateRequiredInputField('Sale Type')]}>
                        {customSelectBox({ data: typeData['DLVR_SALE_TYP'], placeholder: preparePlaceholderText('Sale Type') })}
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label="Scheme Amount (With Tax)" name="schemeAmount">
                        <Input placeholder={preparePlaceholderText('scheme amount')} disabled={true} />
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label="Employee Name" name="employeeName">
                        <Search placeholder={preparePlaceholderText('scheme amount')} allowClear />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label="Manager" name="manager">
                        <Input placeholder={preparePlaceholderText('manager')} disabled={true} />
                    </Form.Item>
                </Col>
            </Row>
            {!formActionType?.viewMode && (
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Button className={styles.marB20} type="primary">
                            Register
                        </Button>
                    </Col>
                </Row>
            )}
        </Form>
    );
};

export default CommonForm;
