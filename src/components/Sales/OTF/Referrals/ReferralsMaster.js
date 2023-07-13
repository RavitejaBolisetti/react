/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect, useMemo } from 'react';
import { Row, Col, Form } from 'antd';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { customerDetailDataActions } from 'store/actions/customer/customerDetail';
import { otfReferralsDataActions } from 'store/actions/data/otf/referrals';
import { showGlobalNotification } from 'store/actions/notification';

import styles from 'components/common/Common.module.css';

import { AddEditForm } from './AddEditForm';
import { ViewDetail } from './ViewDetail';
import { OTFFormButton } from '../OTFFormButton';
import { OTFStatusBar } from '../utils/OTFStatusBar';
import { convertCalenderDate } from 'utils/formatDateTime';
import { PARAM_MASTER } from 'constants/paramMaster';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            OTF: {
                Referrals: { isLoaded: isDataLoaded = false, isLoading, data: referralData = [], filter: filterString },
                // ReferralDetails: { isLoaded: isReferralDataLoaded = false, isLoading: isReferralLoading, data: referralDetail = [] },
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
            fetchCustomerList: customerDetailDataActions.fetchList,
            listCustomerShowLoading: customerDetailDataActions.listShowLoading,
            fetchList: otfReferralsDataActions.fetchList,
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
    const { form, selectedOrderId, section, handleFormValueChange, onFinishFailed, fetchCustomerList, listCustomerShowLoading, typeData, handleButtonClick, NEXT_ACTION } = props;

    const [formData, setFormData] = useState();
    const [viewFormData, setViewFormData] = useState();
    const [resetField, setResetField] = useState(false);
    const { filterString, setFilterString } = props;
    const [vehicleRegNum, setVehicleRegNum] = useState();

    const extraParams = useMemo(() => {
        return [
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString]);

    useEffect(() => {
        if (userId) {
            fetchList({
                setIsLoading: listShowLoading,
                extraParams,
                onSuccessAction: (res) => {
                    res?.data?.referralData?.referralDetails.length === 1 ? setFormData(res?.data?.referralData?.referralDetails[0]) : setVehicleRegNum(res?.data?.referralData?.referralDetails);
                },
                onErrorAction,
                userId,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, extraParams]);

    const onFinish = (values) => {
        const data = { ...values, otfNumber: selectedOrderId, dob: convertCalenderDate(values?.dob, 'YYYY-MM-DD'), id: referralData?.id };

        const onSuccess = (res) => {
            form.resetFields();
            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, extraParams, onSuccessAction, onErrorAction, userId });
            handleButtonClick({ record: res?.data, buttonAction: NEXT_ACTION });
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
    };

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
    };

    const onSuccessAction = (res) => {
        showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
    };

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

    const onSearch = (value) => {
        setResetField(false);
        if (!value) {
            setFormData();
            return false;
        }
        const defaultExtraParam = [
            {
                key: 'customerType',
                title: 'Customer Type',
                value: 'ALL',
                canRemove: true,
            },
            {
                key: 'pageSize',
                title: 'Value',
                value: 1000,
                canRemove: true,
            },
            {
                key: 'pageNumber',
                title: 'Value',
                value: 1,
                canRemove: true,
            },

            {
                key: 'searchType',
                title: 'Type',
                value: 'mobileNumber',
                canRemove: true,
            },
            {
                key: 'searchParam',
                title: 'Value',
                value: value,
                canRemove: true,
            },
        ];

        fetchCustomerList({
            setIsLoading: listCustomerShowLoading,
            extraParams: defaultExtraParam,
            userId,
            onSuccessAction: (res) => {
                setFormData(res?.data?.customerMasterDetails[0]);
            },
            onErrorAction,
        });
    };

    const formProps = {
        ...props,
        form,
        formData,
        onFinish,
        onFinishFailed,
        onSearch,
        resetField,
        optionType: typeData[PARAM_MASTER.REFERRAL_SEARCH.id],
        // searchParamRule: referralSearchRules,
        filterString,
        setFilterString,
        vehicleRegNum,
        typeData,
    };

    const viewProps = {
        styles,
        formData: viewFormData,
        isLoading,
        typeData,
    };

    return (
        <Form form={form} autoComplete="off" layout="vertical" colon={false} onFinish={onFinish} onFinishFailed={onFinishFailed} onValuesChange={handleFormValueChange}>
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
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <OTFFormButton {...props} />
                </Col>
            </Row>
        </Form>
    );
};
export const ReferralsMaster = connect(mapStateToProps, mapDispatchToProps)(ReferralsMasterBase);
