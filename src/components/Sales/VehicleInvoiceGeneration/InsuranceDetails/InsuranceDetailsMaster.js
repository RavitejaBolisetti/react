/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'antd';
import { AddEditForm, ViewDetail } from 'components/Sales/Common/InsuranceDetails';

import styles from 'assets/sass/app.module.scss';

export const InsuranceDetailsMaster = (props) => {
    const { formData: insuranceData, onCloseAction, formActionType, userId, isDataLoaded } = props;
    const { form, selectedRecordId, selectedOrderId, handleFormValueChange, section, isLoading, NEXT_ACTION, handleButtonClick, onFinishFailed } = props;
    const { buttonData, formKey, onFinishCustom = undefined, FormActionButton, pageType } = props;
    const [formData, setFormData] = useState();

    useEffect(() => {
        setFormData(insuranceData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [insuranceData]);

    const viewProps = {
        styles,
        onCloseAction,
        formData,
        isLoading,
        pageType,
    };

    const formProps = {
        ...props,
        form,
        formData,
        userId,
        isDataLoaded,
        isLoading,
        pageType,
    };

    const onFinish = (values) => {
        const recordId = formData?.id || '';
        const otfId = selectedRecordId || formData?.otfId || '';
        const data = { ...values, id: recordId, otfId, otfNumber: selectedOrderId };
        onFinishCustom({ key: formKey, values: data });
        handleButtonClick({ buttonAction: NEXT_ACTION });
    };

    const buttonProps = {
        ...props,
        buttonData: { ...buttonData, formBtnActive: true },
    };

    return (
        <Form layout="vertical" autoComplete="off" form={form} onFinish={onFinish} onFinishFailed={onFinishFailed} onValuesChange={handleFormValueChange}>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <h2>{section?.title}</h2>
                        </Col>
                    </Row>
                    {formActionType?.viewMode ? <ViewDetail {...viewProps} /> : <AddEditForm {...formProps} />}
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <FormActionButton {...buttonProps} />
                </Col>
            </Row>
        </Form>
    );
};
