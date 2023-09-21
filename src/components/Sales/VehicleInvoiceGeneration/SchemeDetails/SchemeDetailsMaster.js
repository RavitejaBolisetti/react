/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Form, Row, Col } from 'antd';

import { AddEditForm, ViewDetail } from 'components/Sales/Common/SchemeDetails';
import styles from 'assets/sass/app.module.scss';

export const SchemeDetailsMaster = (props) => {
    const { formData, onCloseAction, formActionType } = props;
    const { form, section, isLoading, NEXT_ACTION, handleButtonClick } = props;
    const { FormActionButton } = props;

    useEffect(() => {
        if (formData) {
            form?.setFieldsValue({ ...formData });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    const viewProps = {
        styles,
        onCloseAction,
        schemeData: formData,
        isLoading,
        ...props,
    };
    const formProps = {
        ...props,
        styles,
        schemeData: formData,
        buttonData: { ...props.buttonData, editBtn: false, nextBtn: true, saveBtn: false, formBtnActive: true },
    };

    const onFinish = (values) => {
        handleButtonClick({ buttonAction: NEXT_ACTION });
    };

    return (
        <Form layout="vertical" autoComplete="off" form={form} onFinish={onFinish} data-testid="logRole">
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Row>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <h2>{section?.title}</h2>
                        </Col>
                    </Row>
                    {formActionType?.viewMode ? <ViewDetail {...viewProps} /> : <AddEditForm {...formProps} viewOnly={true} />}
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <FormActionButton {...formProps} />
                </Col>
            </Row>
        </Form>
    );
};
