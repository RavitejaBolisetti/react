/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Form } from 'antd';
import { bindActionCreators } from 'redux';

import { ViewDetail, AddEditForm } from 'components/Sales/Common/FinananceDetails';
import { financeLovDataActions } from 'store/actions/data/otf/financeLov';
import { showGlobalNotification } from 'store/actions/notification';

import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { convertDateToCalender } from 'utils/formatDateTime';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

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
    const { userId, financeData, setFormActionType, isFinanceLovLoading, FinanceLovData, isFinanceLovDataLoaded, fetchFinanceLovList, listFinanceLovShowLoading, section, isLoading,handleLocalFormChange } = props;
    const { typeData, form, selectedOrderId, formActionType, handleFormValueChange, handleButtonClick, NEXT_ACTION } = props;
    const { formKey, onFinishCustom = undefined, FormActionButton, StatusBar, pageType } = props;
    const { buttonData, setButtonData } = props;

    const [isFormVisible, setIsFormVisible] = useState(false);

    const ADD_ACTION = FROM_ACTION_TYPE?.ADD;
    const EDIT_ACTION = FROM_ACTION_TYPE?.EDIT;
    const VIEW_ACTION = FROM_ACTION_TYPE?.VIEW;

    const [formData, setFormData] = useState();

    useEffect(() => {
        if (financeData) {
            form.setFieldsValue({ ...financeData, doDate: convertDateToCalender(financeData?.doDate) });
            setFormData({ ...financeData, doDate: convertDateToCalender(financeData?.doDate) });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [financeData]);
    useEffect(() => {
        setButtonData({ ...buttonData, formBtnActive: true });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [section]);

    useEffect(() => {
        if (userId && !isFinanceLovDataLoaded) {
            fetchFinanceLovList({ setIsLoading: listFinanceLovShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isFinanceLovDataLoaded]);

    const onFinish = (values) => {
        const id = financeData?.id || '';
        const otfNumber = selectedOrderId || '';
        const otfId = financeData?.otfId || '';

        const data = { ...values, id, otfNumber, otfId, doDate: values?.doDate };

        if (onFinishCustom) {
            onFinishCustom({ key: formKey, values: data });
            handleButtonClick({ buttonAction: NEXT_ACTION });
            setButtonData({ ...buttonData, formBtnActive: false });
        }
    };

    const onCloseAction = () => {
        form.resetFields();
        setIsFormVisible(false);
    };

    const formProps = {
        ...props,
        typeData,
        form,
        formData,
        setFormData,
        formActionType,
        setFormActionType,
        onFinish,
        isVisible: isFormVisible,
        onCloseAction,
        isFinanceLovDataLoaded,
        isFinanceLovLoading,
        FinanceLovData,
        fetchFinanceLovList,
        listFinanceLovShowLoading,

        ADD_ACTION,
        EDIT_ACTION,
        VIEW_ACTION,
        buttonData,
        setButtonData,
        handleButtonClick,
        pageType,
    };

    const viewProps = {
        ...props,
        formData,
        styles,
        isLoading,
        FinanceLovData,
        typeData,
        pageType,
    };

    return (
        <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleLocalFormChange} onFinish={onFinish}>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Row>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <h2>{translateContent(section?.translateKey)}</h2>
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
                    <FormActionButton {...props} />
                </Col>
            </Row>
        </Form>
    );
};

const FinananceDetailsMaster = connect(mapStateToProps, mapDispatchToProps)(FinananceDetailsMasterBase);
export default FinananceDetailsMaster;
