/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Form } from 'antd';
import { bindActionCreators } from 'redux';

import { AddEditForm, ViewDetail } from 'components/Sales/Common/FinananceDetails';

import { financeLovDataActions } from 'store/actions/data/otf/financeLov';
import { showGlobalNotification } from 'store/actions/notification';

import styles from 'assets/sass/app.module.scss';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            OTF: {
                FinanceLov: { isLoaded: isFinanceLovDataLoaded = false, isloading: isFinanceLovLoading, data: FinanceLovData = [] },
            },
        },
    } = state;

    const moduleTitle = 'Finance Detail';

    let returnValue = {
        userId,
        moduleTitle,
        isFinanceLovDataLoaded,
        isFinanceLovLoading,
        FinanceLovData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchFinanceLovList: financeLovDataActions.fetchList,
            listFinanceLovShowLoading: financeLovDataActions.listShowLoading,

            showGlobalNotification,
        },
        dispatch
    ),
});

export const FinananceDetailsMasterBase = (props) => {
    const { userId, formData: financeData, isFinanceLovDataLoaded, setFormActionType, isFinanceLovLoading, FinanceLovData, fetchFinanceLovList, listFinanceLovShowLoading, section, isLoading } = props;
    const { typeData, form, selectedOrderId, formActionType, handleFormValueChange, buttonData, handleButtonClick, NEXT_ACTION } = props;
    const { formKey, onFinishCustom = undefined, FormActionButton, pageType } = props;

    const [formData, setFormData] = useState();

    useEffect(() => {
        setFormData(financeData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [financeData]);

    useEffect(() => {
        if (userId && !isFinanceLovDataLoaded) {
            fetchFinanceLovList({ setIsLoading: listFinanceLovShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isFinanceLovDataLoaded]);

    const onFinish = (values) => {
        const recordId = formData?.id || '';
        const otfId = formData?.otfId || '';
        const data = { ...values, id: recordId, otfId, otfNumber: selectedOrderId, doDate: values?.doDate };

        onFinishCustom({ key: formKey, values: data });
        handleButtonClick({ buttonAction: NEXT_ACTION });
    };

    const formProps = {
        ...props,
        formData,
        typeData,
        form,
        formActionType,
        setFormActionType,
        onFinish,
        isFinanceLovDataLoaded,
        isFinanceLovLoading,
        FinanceLovData,
        fetchFinanceLovList,
        listFinanceLovShowLoading,
        pageType,
    };

    const viewProps = {
        formData,
        styles,
        isLoading,
        FinanceLovData,
        typeData,
        pageType,
    };

    const buttonProps = {
        ...props,
        buttonData: { ...buttonData, formBtnActive: true },
    };

    return (
        <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormValueChange} onFinish={onFinish}>
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

const FinananceDetailsMaster = connect(mapStateToProps, mapDispatchToProps)(FinananceDetailsMasterBase);
export default FinananceDetailsMaster;
