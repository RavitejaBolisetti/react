/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Form } from 'antd';

import { bindActionCreators } from 'redux';
import { showGlobalNotification } from 'store/actions/notification';
import { VehicleDetailFormButton } from '../VehicleDetailFormButton';

import { ViewDetail } from './ViewDetail';
import { AddEditForm } from './AddEditForm';
import { BASE_URL_VEHICLE_CUSTOMER_COMMON_DETAIL as customURL } from 'constants/routingApi';

import styles from 'components/common/Common.module.css';
import { vehicleCustomerDetailsDataAction } from 'store/actions/data/vehicle/customerDetails';
import { PARAM_MASTER } from 'constants/paramMaster';
import { customerDetailDataActions } from 'store/actions/customer/customerDetail';
import { customerDetailsIndividualDataActions } from 'store/actions/data/customerMaster/customerDetailsIndividual';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            Vehicle: {
                CustomerDetails: { isLoaded: isDataLoaded = false, isLoading, data },
                // CustomerCommonDetails: {isLoaded: isCustomerCommonDetailsLoaded = false, isLoading: isCustomerCommonDetailsLoading = false, data: customerCommonDetails = []}
            },
            ConfigurableParameterEditing: { isLoaded: isTypeDataLoaded = false, isTypeDataLoading, filteredListData: typeData = [] },
            OTF: {
                Referrals: { isLoaded: isReferralDataLoaded = false, isReferralLoading, data: referralData = [], filter: filterString },
                // ReferralDetails: { isLoaded: isReferralDataLoaded = false, isLoading: isReferralLoading, data: referralDetail = [] },
            },
        },
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;

    console.log(state, 'state');

    const moduleTitle = 'Customer Details';

    let returnValue = {
        collapsed,
        userId,
        isDataLoaded,
        isLoading,
        data,
        isTypeDataLoaded,
        isTypeDataLoading,
        typeData: typeData,

        isReferralDataLoaded,
        isReferralLoading,
        referralData,
        filterString,

        moduleTitle,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            listShowLoading: vehicleCustomerDetailsDataAction.listShowLoading,
            fetchList: vehicleCustomerDetailsDataAction.fetchList,
            saveData: vehicleCustomerDetailsDataAction.saveData,
            resetData: vehicleCustomerDetailsDataAction.reset,

            fetchCustomerDetailData: customerDetailsIndividualDataActions.fetchData,
            listShowLoading: customerDetailsIndividualDataActions.listShowLoading,

            fetchCustomerList: customerDetailDataActions.fetchList,
            listCustomerShowLoading: customerDetailDataActions.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

export const CustomerDetailsMain = (props) => {
    const { resetData, saveData, isLoading, userId, isDataLoaded, fetchList, listShowLoading, fetchCustomerDetailData, showGlobalNotification, data, onFinishFailed } = props;
    const { isPinCodeLoading, listPinCodeShowLoading, fetchPincodeDetail, pincodeData, formActionType, NEXT_ACTION, handleButtonClick, section } = props;
    const { setButtonData, buttonData, typeData, selectedRecordId, filterString, isReferralDataLoaded, referralData, fetchOtfReferralList, setFilterString, listOtfReferralShowLoading, fetchCustomerList, listCustomerShowLoading, isCustomerCommonDetailsLoaded, isCustomerCommonDetailsLoading, customerCommonDetails } = props;
    const [form] = Form.useForm();
    const [searchForm] = Form.useForm();
    const [billCstmForm] = Form.useForm();
    const [formData, setFormData] = useState('');
    const [viewFormData, setViewFormData] = useState();
    const [activeKey, setActiveKey] = useState([]);
    const [resetField, setResetField] = useState(false);
    const [sameAsBookingCustomer, setSameAsBookingCustomer] = useState(false);

    const handleCollapse = (key) => {
        console.log('key', key);
        !activeKey?.includes(key) ? setActiveKey([key]) : setActiveKey([]);
    };

    const extraParams = [
        {
            key: 'vin',
            title: 'vin',
            value: selectedRecordId,
            name: 'VIN Number',
        },
    ];
    useEffect(() => {
        if (userId && selectedRecordId) {
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
    }, [userId, selectedRecordId]);

    useEffect(() => {
        if (userId && filterString?.searchType && filterString?.searchParam) {
            const searchParams = [
                // {
                //     key: 'customerType',
                //     title: 'Customer Type',
                //     value: 'ALL',
                //     canRemove: true,
                // },
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
            ];

            fetchList({
                setIsLoading: listShowLoading,
                extraParams: searchParams,
                onSuccessAction: (res) => {
                    // res?.data?.referralData && setFormData(res?.data?.referralData?.[0]);
                    res?.data?.ownerCustomer && setFormData(res?.data?.ownerCustomer?.[0]);

                    // res?.data?.referralData?.referralDetails.length === 1 ? setFormData(res?.data?.referralData?.referralDetails[0]);
                },
                onErrorAction,
                userId,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, filterString]);

    useEffect(() => {
        if (userId && data) {
            setFormData(data);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, data]);

    useEffect(() => {
        return () => {
            resetData();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSuccessAction = (res) => {
        showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
    };
    const onErrorAction = (message) => {
        showGlobalNotification({ message });
    };
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

        fetchList({
            setIsLoading: listShowLoading,
            extraParams: defaultExtraParam,
            userId,
            onSuccessAction: (res) => {
                setFormData(res?.data?.ownerCustomer[0]);
            },
            onErrorAction,
        });
    };

    useEffect(() => {
        if (userId && selectedRecordId) {
            const extraParams = [
                {
                    key: 'vin',
                    title: 'vin',
                    value: selectedRecordId,
                    name: 'VIN Number',
                },
            ];
            fetchList({ setIsLoading: listShowLoading, userId, extraParams });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedRecordId]);

    const onFinish = (values) => {
        const recordId = data?.id || '';
        form.getFieldsValue();
        const finaldata = {
            ownerCustomer: { ...values?.ownerCustomer, vin: selectedRecordId, id: data?.ownerCustomer?.id || '' },
            billingCustomer: { ...values?.billingCustomer, vin: selectedRecordId, id: data?.billingCustomer?.id || '' },
            vehicleKeyAccountDetails: { ...values?.vehicleKeyAccountDetails, vin: selectedRecordId, id: data?.vehicleKeyAccountDetails?.id },
            vehicleCustomerLoyaltyDetails: { ...values?.vehicleCustomerLoyaltyDetails, vin: selectedRecordId, id: data?.vehicleCustomerLoyaltyDetails?.id },
            id: recordId,
        };
        const onSuccess = (res) => {
            showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction, extraParams });
            handleButtonClick({ record: res?.data, buttonAction: NEXT_ACTION });
        };

        const onError = (message) => {
            showGlobalNotification({ message });
        };

        const requestData = {
            data: finaldata,
            // method: data?.ownerCustomer || data?.billingCustomer ? 'put' : 'post',
            method: 'put',
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
        };
        saveData(requestData);
    };

    const fnSetData = (data, type) => {
        if (data?.customerId) {
            const extraParams = [
                {
                    key: 'customerId',
                    title: 'customerId',
                    value: data?.customerId,
                    name: 'Customer ID',
                },
            ];
            fetchCustomerDetailData({
                customURL,
                setIsLoading: () => {},
                extraParams,
                userId,
                onSuccessAction: (response) => {
                    setFormData({ ...formData, [type]: { ...response?.data } });
                },
                onErrorAction,
            });
        }
    };
    const formProps = {
        ...props,
        fnSetData,
        form,
        billCstmForm,
        data,
        formData,
        formActionType,
        onFinish,
        onFinishFailed,
        optionType: typeData[PARAM_MASTER.VH_DTLS_SER.id],
        onSearch,
        listPinCodeShowLoading,
        fetchPincodeDetail,
        isPinCodeLoading,
        pincodeData,
        typeData,
        setSameAsBookingCustomer,
        sameAsBookingCustomer,
        resetField,
        isDataLoaded,
        isLoading,
        activeKey,
        setActiveKey,
        filterString,
        isReferralDataLoaded,
        referralData,
        fetchOtfReferralList,
        setFilterString,
        listOtfReferralShowLoading,
        searchForm,
        listCustomerShowLoading,
        fetchCustomerList,
        customerCommonDetails,
        isCustomerCommonDetailsLoaded,
        isCustomerCommonDetailsLoading,
        handleCollapse,
    };

    const viewProps = {
        formData,
        styles,
        isLoading,
        activeKey,
        setActiveKey,
    };

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
        if (sameAsBookingCustomer) {
            let ownerCustomer = form.getFieldsValue()?.ownerCustomer;
            form?.setFieldsValue({ billingCustomer: { ...ownerCustomer } });
        }
    };

    return (
        <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormValueChange} onFinish={onFinish} onFinishFailed={onFinishFailed} searchForm>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <h2>{section?.title}</h2>
                        </Col>
                    </Row>
                    {formActionType?.viewMode ? <ViewDetail {...viewProps} /> : <AddEditForm {...formProps} />}
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <VehicleDetailFormButton {...props} />
                </Col>
            </Row>
        </Form>
    );
};

export const CustomerDetailsMaster = connect(mapStateToProps, mapDispatchToProps)(CustomerDetailsMain);
