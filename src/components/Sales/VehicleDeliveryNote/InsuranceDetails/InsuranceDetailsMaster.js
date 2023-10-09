/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Form, Row, Col } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { AddEditForm, ViewDetail } from 'components/Sales/Common/InsuranceDetails';
import { showGlobalNotification } from 'store/actions/notification';

import styles from 'assets/sass/app.module.scss';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
    } = state;

    const moduleTitle = 'Insurance Details';

    let returnValue = {
        userId,
        moduleTitle,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            showGlobalNotification,
        },
        dispatch
    ),
});

const InsuranceDetailsMasterBase = (props) => {
    const { insuranceData, onCloseAction, formActionType, userId, isDataLoaded } = props;
    const { form, selectedOrderId, handleFormValueChange, section, isLoading = false, NEXT_ACTION, handleButtonClick, onFinishFailed } = props;
    const { buttonData, setButtonData, formKey, onFinishCustom = undefined, FormActionButton, StatusBar, pageType } = props;
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (insuranceData) {
            setFormData(insuranceData);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [insuranceData, section]);

    useEffect(() => {
        setButtonData({ ...buttonData, formBtnActive: true });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [section]);

    const viewProps = {
        ...props,
        styles,
        onCloseAction,
        formData,
        isLoading,
        pageType,
    };

    const formProps = {
        ...props,
        form,
        userId,
        isDataLoaded,
        isLoading,
        formData,
        pageType,
    };

    const myProps = {
        ...props,
    };

    const onFinish = (values) => {
        const id = insuranceData?.id || '';
        const otfId = insuranceData?.otfId || '';
        const otfNumber = selectedOrderId || '';
        const data = { ...values, id, otfNumber, otfId };
        if (onFinishCustom) {
            onFinishCustom({ key: formKey, values: data });
            handleButtonClick({ buttonAction: NEXT_ACTION });
            setButtonData({ ...buttonData, formBtnActive: false });
        }
    };

    return (
        <Form layout="vertical" autoComplete="off" form={form} onFinish={onFinish} onFinishFailed={onFinishFailed} onValuesChange={handleFormValueChange}>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Row>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <h2>{section?.title}</h2>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            {StatusBar && <StatusBar status={props?.selectedOrder?.orderStatus} />}
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

export const InsuranceDetailsMaster = connect(mapStateToProps, mapDispatchToProps)(InsuranceDetailsMasterBase);
