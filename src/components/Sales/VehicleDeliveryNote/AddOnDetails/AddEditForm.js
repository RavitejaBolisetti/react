/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Row, Col, Collapse, Typography, Form, Divider } from 'antd';

import { PlusOutlined } from '@ant-design/icons';

import { expandIcon } from 'utils/accordianExpandIcon';
import CommonForm from './CommonForm';

const { Panel } = Collapse;
const { Text } = Typography;

const AddEditFormMain = (props) => {
    const { formData, shieldForm, rsaForm, amcForm, formActionType, handleFormValueChange, openAccordian, setOpenAccordian, onSingleFormFinish, schemeDescriptionData } = props;

    const handleCollapse = (key) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };

    const shieldInfoProps = { ...props, formActionType, openAccordian, formData: formData?.sheildRequest, onSingleFormFinish, schemeDescriptionData, addOnForm: shieldForm };
    const rsaProps = { ...props, formActionType, openAccordian, formData: formData?.rsaRequest, onSingleFormFinish, schemeDescriptionData, addOnForm: rsaForm };
    const amcProps = { ...props, formActionType, openAccordian, formData: formData?.amcRequest, onSingleFormFinish, schemeDescriptionData, addOnForm: amcForm };

    return (
        <Row gutter={20}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Collapse onChange={() => handleCollapse('Shield')} expandIcon={expandIcon} activeKey={openAccordian} expandIconPosition="end">
                    <Panel header="Shield Information" key="Shield">
                        <Divider />
                        <Form layout="vertical" autoComplete="off" form={shieldForm} onValuesChange={handleFormValueChange} onFieldsChange={handleFormValueChange}>
                            <CommonForm {...shieldInfoProps} formKey={'sheildRequest'} />
                        </Form>
                    </Panel>
                </Collapse>

                <Collapse onChange={() => handleCollapse('RSA')} expandIcon={expandIcon} activeKey={openAccordian} expandIconPosition="end">
                    <Panel header="RSA" key="RSA">
                        <Divider />
                        <Form layout="vertical" autoComplete="off" form={rsaForm} onValuesChange={handleFormValueChange} onFieldsChange={handleFormValueChange}>
                            <CommonForm {...rsaProps} formKey={'rsaRequest'} />
                        </Form>
                    </Panel>
                </Collapse>

                <Collapse onChange={() => handleCollapse('AMC')} expandIcon={expandIcon} activeKey={openAccordian} expandIconPosition="end">
                    <Panel header="AMC" key="AMC">
                        <Divider />
                        <Form layout="vertical" autoComplete="off" form={amcForm} onValuesChange={handleFormValueChange} onFieldsChange={handleFormValueChange}>
                            <CommonForm {...amcProps} formKey={'amcRequest'} />
                        </Form>
                    </Panel>
                </Collapse>
            </Col>
        </Row>
    );
};

export const AddEditForm = AddEditFormMain;
