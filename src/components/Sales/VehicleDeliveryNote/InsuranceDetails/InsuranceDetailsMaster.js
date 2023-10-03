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
import { insuranceDetailDataActions } from 'store/actions/data/otf/insuranceDetail';

import styles from 'assets/sass/app.module.scss';
import { insuranceChallanDetailsDataActions } from 'store/actions/data/vehicleDeliveryNote/challanInsurance';
const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            OTF: {
                InsuranceDetail: { isLoaded: isDataLoaded = false, isLoading, data: insuranceData = [] },
            },
            PartyMaster: { isFilteredListLoaded: isInsuranceCompanyDataLoaded = false, detailData: insuranceCompanies },
            VehicleDeliveryNote: {
                InsuranceDetailChallan: { isLoaded: isInsuranceLoaded, isLoading: isInsuranceDataLoading, data: insuranceChallanData = [] },
            },
        },
    } = state;
    const moduleTitle = 'Insurance Details';

    let returnValue = {
        userId,
        isDataLoaded,
        // insuranceData,
        isLoading,
        moduleTitle,
        isInsuranceCompanyDataLoaded,
        insuranceCompanies,

        isInsuranceLoaded,
        isInsuranceDataLoading,
        insuranceChallanData,
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

            fetchChallanInsuranceList: insuranceChallanDetailsDataActions.fetchList,
            listChallanInsuranceShowLoading: insuranceChallanDetailsDataActions.listShowLoading,

            showGlobalNotification,
        },
        dispatch
    ),
});

const InsuranceDetailsMasterBase = (props) => {
    const { insuranceData, onCloseAction, fetchList, formActionType, userId, isDataLoaded, listShowLoading, showGlobalNotification } = props;
    const { form, selectedOrderId, handleFormValueChange, section, isLoading, NEXT_ACTION, handleButtonClick, onFinishFailed, saveData } = props;
    const { buttonData, setButtonData, formKey, onFinishCustom = undefined, FormActionButton, StatusBar, pageType, isInsuranceLoaded, isInsuranceDataLoading, fetchChallanInsuranceList, insuranceChallanData, listChallanInsuranceShowLoading, soldByDealer, record } = props;
    const [formData, setFormData] = useState();

    useEffect(() => {
        if (insuranceData) {
            setFormData(insuranceData);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [insuranceData, section]);

    // useEffect(() => {
    //     if (insuranceChallanData && formActionType?.addMode && !soldByDealer) {
    //         setFormData(insuranceChallanData);
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [insuranceChallanData]);
    useEffect(() => {
        setButtonData({ ...buttonData, formBtnActive: true });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [section]);

    const extraParams = [
        {
            key: 'otfNumber',
            title: 'otfNumber',
            value: selectedOrderId,
            name: 'Booking Number',
        },
    ];

    useEffect(() => {
        if (userId && selectedOrderId && soldByDealer) {
            const extraParams = [
                {
                    key: 'otfNumber',
                    title: 'otfNumber',
                    value: selectedOrderId,
                    name: 'Booking Number',
                },
            ];
            fetchList({ setIsLoading: listShowLoading, userId, extraParams, onErrorAction, onSuccessAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedOrderId]);

    // useEffect(() => {
    //     if (userId && record && !soldByDealer) {
    //         const extraParams = [
    //             {
    //                 key: 'invoiceNumber',
    //                 title: 'invoiceNumber',
    //                 value: record?.invoiceId,
    //                 name: 'Invoice ID',
    //             },
    //         ];
    //         fetchChallanInsuranceList({ setIsLoading: listChallanInsuranceShowLoading, userId, extraParams, onErrorAction, onSuccessAction });
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [userId, record?.invoiceId]);

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
        pageType,
    };

    const formProps = {
        ...props,
        form,
        fetchList,
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
        const recordId = insuranceData?.id || '';
        const data = { ...values, id: recordId, otfNumber: selectedOrderId };
        if (onFinishCustom) {
            onFinishCustom({ key: formKey, values: data });
            handleButtonClick({ buttonAction: NEXT_ACTION });
            setButtonData({ ...buttonData, formBtnActive: false });
        } else {
            const onSuccess = (res) => {
                handleButtonClick({ record: res?.data, buttonAction: NEXT_ACTION });
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
                fetchList({ setIsLoading: listShowLoading, userId, extraParams, onErrorAction, onSuccessAction });
            };

            const onError = (message) => {
                showGlobalNotification({ message });
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
