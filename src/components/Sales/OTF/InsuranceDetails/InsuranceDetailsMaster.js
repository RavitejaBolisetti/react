/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import styles from 'assets/sass/app.module.scss';
//import styles from 'components/common/Common.module.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showGlobalNotification } from 'store/actions/notification';
import { ViewDetail } from './ViewDetail';
import { Form, Row, Col } from 'antd';
import { insuranceDetailDataActions } from 'store/actions/data/otf/insuranceDetail';
import { OTFStatusBar } from '../utils/OTFStatusBar';
import { OTFFormButton } from '../OTFFormButton';
import { AddEditForm } from './AddEditForm';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            OTF: {
                InsuranceDetail: { isLoaded: isDataLoaded = false, isLoading, data: insuranceData = [] },
            },
        },
    } = state;

    const moduleTitle = 'Insurance Details';

    let returnValue = {
        userId,
        isDataLoaded,
        insuranceData,
        isLoading,
        moduleTitle,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: insuranceDetailDataActions.fetchList,
            listShowLoading: insuranceDetailDataActions.listShowLoading,
            resetData: insuranceDetailDataActions.reset,
            saveData: insuranceDetailDataActions.saveData,
            showGlobalNotification,
        },
        dispatch
    ),
});

const InsuranceDetailsMasterBase = (props) => {
    const { insuranceData, onCloseAction, fetchList, formActionType, userId, isDataLoaded, listShowLoading, showGlobalNotification } = props;
    const { form, selectedOrderId, handleFormValueChange, section, isLoading, NEXT_ACTION, handleButtonClick, onFinishFailed, saveData } = props;

    const [formData, setFormData] = useState();

    useEffect(() => {
        if (insuranceData) {
            setFormData(insuranceData);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [insuranceData]);

    const extraParams = [
        {
            key: 'otfNumber',
            title: 'otfNumber',
            value: selectedOrderId,
            name: 'OTF Number',
        },
    ];

    useEffect(() => {
        if (userId && selectedOrderId) {
            const extraParams = [
                {
                    key: 'otfNumber',
                    title: 'otfNumber',
                    value: selectedOrderId,
                    name: 'OTF Number',
                },
            ];
            fetchList({ setIsLoading: listShowLoading, userId, extraParams, onErrorAction, onSuccessAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedOrderId]);

    const onErrorAction = (message) => {
        showGlobalNotification({ message: message });
    };

    const onSuccessAction = (res) => {
        // showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
    };

    const viewProps = {
        styles,
        onCloseAction,
        formData,
        isLoading,
    };

    const formProps = {
        ...props,
        form,
        fetchList,
        userId,
        isDataLoaded,
        isLoading,
        formData,
    };

    const myProps = {
        ...props,
    };

    const onFinish = (values) => {
        const recordId = insuranceData?.id || '';
        const data = { ...values, id: recordId, otfNumber: selectedOrderId };

        const onSuccess = (res) => {
            handleButtonClick({ record: res?.data, buttonAction: NEXT_ACTION });
            showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, userId, extraParams, onErrorAction, onSuccessAction });
        };

        const onError = (message) => {
            // showGlobalNotification({ message });
        };

        const requestData = {
            data: data,
            method: insuranceData?.id ? 'put' : 'post',
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
        };

        saveData(requestData);
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
                            <OTFStatusBar status={props?.selectedOrder?.orderStatus} />
                        </Col>
                    </Row>

                    {formActionType?.viewMode ? <ViewDetail {...viewProps} /> : <AddEditForm {...formProps} />}
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <OTFFormButton {...myProps} />
                </Col>
            </Row>
        </Form>
    );
};

export const InsuranceDetailsMaster = connect(mapStateToProps, mapDispatchToProps)(InsuranceDetailsMasterBase);
