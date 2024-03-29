/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Row, Col, Form } from 'antd';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { BASE_URL_CUSTOMER_MASTER_VEHICLE_LIST as customURL } from 'constants/routingApi';
import { otfReferralsDataActions } from 'store/actions/data/otf/referrals';
import { showGlobalNotification } from 'store/actions/notification';

import { AddEditForm } from './AddEditForm';
import { ViewDetail } from './ViewDetail';

import { formatDate } from 'utils/formatDateTime';
import { PARAM_MASTER } from 'constants/paramMaster';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            OTF: {
                Referrals: { isLoaded: isDataLoaded = false, isLoading, data: referralData = [], filter: filterString },
            },
        },
        customer: {
            customerDetail: { isLoaded: isDataCustomerLoaded = false, isLoading: isCustomerLoading = false, data: customerDetail = [] },
        },
    } = state;

    let returnValue = {
        userId,
        isDataLoaded,
        referralData,
        isLoading,
        isDataCustomerLoaded,
        isCustomerLoading,
        customerDetail,
        typeData,
        filterString,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: otfReferralsDataActions.fetchList,
            fetchCustomerList: otfReferralsDataActions.fetchData,
            setFilterString: otfReferralsDataActions.setFilter,
            listShowLoading: otfReferralsDataActions.listShowLoading,
            resetData: otfReferralsDataActions.reset,
            saveData: otfReferralsDataActions.saveData,
            showGlobalNotification,
        },
        dispatch
    ),
});

const ReferralsMasterBase = (props) => {
    const { formActionType, fetchList, showGlobalNotification, saveData, listShowLoading, userId, referralData, isLoading } = props;
    const { form, selectedOrderId, section, handleFormValueChange, fetchCustomerList, typeData, handleButtonClick, NEXT_ACTION } = props;
    const { buttonData, setButtonData, formKey, onFinishCustom = undefined, FormActionButton, StatusBar } = props;

    const [searchForm] = Form.useForm();
    const [formData, setFormData] = useState();
    const [viewFormData, setViewFormData] = useState();
    const { filterString, setFilterString } = props;

    const [customerList, setCustomerList] = useState();

    useEffect(() => {
        setFilterString();
        if (referralData) {
            setFormData({ ...referralData });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [referralData]);

    const extraParams = [
        {
            key: 'otfNumber',
            title: 'otfNumber',
            value: selectedOrderId,
            name: 'Booking Number',
        },
    ];
    useEffect(() => {
        if (userId && selectedOrderId) {
            fetchList({
                setIsLoading: listShowLoading,
                userId,
                extraParams,
                onSuccessAction: (res) => {
                    setViewFormData(res?.data);
                },
                onErrorAction,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedOrderId]);

    useEffect(() => {
        if (userId && filterString?.searchType && filterString?.searchParam) {
            const searchParams = [
                {
                    key: 'searchType',
                    title: 'Type',
                    value: filterString?.searchType,
                    canRemove: false,
                    filter: true,
                },
                {
                    key: 'searchParam',
                    title: 'Value',
                    value: filterString?.searchParam,
                    canRemove: true,
                    filter: true,
                },
                {
                    key: 'pageNumber',
                    title: 'Value',
                    value: 1,
                    canRemove: true,
                    filter: false,
                },
                {
                    key: 'pageSize',
                    title: 'Value',
                    value: 1000,
                    canRemove: true,
                    filter: false,
                },
            ];

            fetchCustomerList({
                customURL,
                setIsLoading: listShowLoading,
                extraParams: searchParams,
                onSuccessAction: (res) => {
                    if (res?.data?.customerMasterDetails?.length > 0) {
                        setCustomerList(res?.data?.customerMasterDetails);
                    } else {
                        res?.data?.customerMasterDetails && setFormData(res?.data?.customerMasterDetails?.[0]);
                        handleFormValueChange();
                    }
                },
                onErrorAction,
                userId,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString]);

    const onFinish = (values) => {
        const data = { ...values, otfNumber: selectedOrderId, dob: formatDate(values?.dob), id: referralData?.id };
        if (onFinishCustom) {
            onFinishCustom({ key: formKey, values: data });
            handleButtonClick({ buttonAction: NEXT_ACTION });
            setButtonData({ ...buttonData, formBtnActive: false });
        } else {
            const onSuccess = (res) => {
                form.resetFields();
                showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
                handleButtonClick({ record: res?.data, buttonAction: NEXT_ACTION });
                fetchList({ setIsLoading: listShowLoading, extraParams, onSuccessAction, errorAction: onError, userId });
            };

            const onError = (message) => {
                showGlobalNotification({ message });
            };

            const requestData = {
                data: data,
                method: referralData?.id ? 'put' : 'post',
                setIsLoading: listShowLoading,
                userId,
                onError,
                onSuccess,
            };

            saveData(requestData);
        }
    };

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
    };

    const onSuccessAction = (res) => {
        showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
    };

    const fnSetData = (data) => {
        setFormData(data);
        handleFormValueChange();
    };

    const formProps = {
        ...props,
        form,
        formData,
        onFinish,
        customerList,
        optionType: typeData[PARAM_MASTER?.CUST_VEH_SEARCH?.id],
        filterString,
        setFilterString,
        typeData,
        searchForm,
        fnSetData,
    };

    const viewProps = {
        styles,
        formData: viewFormData,
        isLoading,
        typeData,
    };

    return (
        <>
            <Form form={form} autoComplete="off" layout="vertical" data-testid="test" colon={false} onFinish={onFinish} onValuesChange={handleFormValueChange}>
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
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <FormActionButton {...props} />
                    </Col>
                </Row>
            </Form>
        </>
    );
};
export const ReferralsMaster = connect(mapStateToProps, mapDispatchToProps)(ReferralsMasterBase);
