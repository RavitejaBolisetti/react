/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Form, Row, Col } from 'antd';

import { AddEditForm, ViewDetail } from 'components/Sales/Common/InsuranceDetails';
import styles from 'assets/sass/app.module.scss';

export const InsuranceDetailsMaster = (props) => {
    const { formData, insuranceData, onCloseAction, formActionType, userId, isDataLoaded } = props;
    const { form, selectedOrderId, handleFormValueChange, section, isLoading, NEXT_ACTION, handleButtonClick, onFinishFailed } = props;
    const { buttonData, setButtonData, formKey, onFinishCustom = undefined, FormActionButton, pageType } = props;

    const viewProps = {
        styles,
        onCloseAction,
        formData,
        isLoading,
        pageType,
    };

    const formProps = {
        ...props,
        formData,
        form,
        userId,
        isDataLoaded,
        isLoading,
        pageType,
    };

    const myProps = {
        ...props,
    };

    const onFinish = (values) => {
        const recordId = insuranceData?.id || '';
        const data = { ...values, id: recordId, otfNumber: selectedOrderId };
        onFinishCustom({ key: formKey, values: data });
        handleButtonClick({ buttonAction: NEXT_ACTION });
        setButtonData({ ...buttonData, formBtnActive: false });
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
                    <FormActionButton {...myProps} />
                </Col>
            </Row>
        </Form>
    );
};
