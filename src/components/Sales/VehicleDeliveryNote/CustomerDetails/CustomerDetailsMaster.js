/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Row, Col, Form } from 'antd';

import { showGlobalNotification } from 'store/actions/notification';
import { vehicleDeliveryNoteCustomerDetailDataActions } from 'store/actions/data/vehicleDeliveryNote/customerDetails';

import { VehicleDeliveryNoteFormButton } from '../VehicleDeliveryNoteFormButton';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { AddEditForm } from './AddEditForm';
import { ViewDetail } from './ViewDetail';

import styles from 'assets/sass/app.module.scss';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            VehicleDeliveryNote: {
                CustomerDetailsDeliveryNote: { isLoaded, isLoading, data: customerDetailsDataSearched = [] },
            },
        },
    } = state;

    const moduleTitle = 'Customer Details';

    let returnValue = {
        userId,
        isLoaded,
        // customerDetailsData,
        customerDetailsDataSearched,
        isLoading,
        moduleTitle,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: vehicleDeliveryNoteCustomerDetailDataActions.fetchList,
            listShowLoading: vehicleDeliveryNoteCustomerDetailDataActions.listShowLoading,
            resetData: vehicleDeliveryNoteCustomerDetailDataActions.reset,
            showGlobalNotification,
        },
        dispatch
    ),
});

export const CustomerDetailsMasterBase = (props) => {
    const { fetchList, customerDetailsDataSearched, customerDetailsData, setFormActionType, FinanceLovData, fetchFinanceLovList, listFinanceLovShowLoading, isLoading } = props;
    const { requestPayload, setRequestPayload } = props;
    const { listShowLoading, userId, typeData, form, selectedOrder, selectedCustomerId, soldByDealer, challanRequestPayload, setChallanRequestPayload, formActionType, handleFormValueChange, handleButtonClick, NEXT_ACTION, section, customerIdValue, setCustomerIdValue, resetData } = props;
    const { buttonData, setButtonData } = props;

    const [isFormVisible, setIsFormVisible] = useState(false);

    const ADD_ACTION = FROM_ACTION_TYPE?.ADD;
    const EDIT_ACTION = FROM_ACTION_TYPE?.EDIT;
    const VIEW_ACTION = FROM_ACTION_TYPE?.VIEW;

    const [formData, setFormData] = useState();

    useEffect(() => {
        if (customerDetailsData) {
            setFormData({ ...customerDetailsData });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [customerDetailsData]);

    // useEffect(() => {
    //     if (customerDetailsData || customerDetailsDataSearched) {
    //         customerDetailsData && form.setFieldsValue({ ...customerDetailsData, customerType: typeData?.[PARAM_MASTER?.CUST_TYPE?.id]?.find((customer) => customer?.key === customerDetailsData?.customerType)?.value });
    //         customerDetailsData && setFormData({ ...customerDetailsData });
    //         customerDetailsDataSearched && form.setFieldsValue({ ...customerDetailsDataSearched, customerType: typeData?.[PARAM_MASTER?.CUST_TYPE?.id]?.find((customer) => customer?.key === customerDetailsDataSearched?.customerType)?.value });
    //         customerDetailsDataSearched && setFormData({ ...customerDetailsDataSearched });
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [customerDetailsData, section, customerDetailsDataSearched]);

    useEffect(() => {
        setButtonData({ ...buttonData, formBtnActive: true });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [section]);

    // const extraParams = [
    //     {
    //         key: 'customerId',
    //         title: 'customerId',
    //         value: selectedCustomerId,
    //         name: 'Customer Id',
    //     },
    // ];

    // useEffect(() => {
    //     if (userId && selectedCustomerId) {
    //         fetchList({ setIsLoading: listShowLoading, extraParams, onErrorAction, userId });
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [userId, selectedCustomerId]);

    const handleOnChange = (e) => {
        form.setFieldsValue({
            customerType: '',
            customerName: '',
            mobile: '',
            address: '',
            city: '',
            district: '',
            state: '',
            pincode: '',
            email: '',
        });
        setCustomerIdValue(e.target.value);
    };

    const handleCustomerIdSearch = () => {
        const onSuccessAction = (res) => {
            showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
        };
        const onErrorAction = (message) => {
            showGlobalNotification({ message });
        };
        const searchParams = [
            {
                key: 'customerId',
                title: 'customerId',
                value: customerIdValue,
                name: 'Customer ID',
            },
        ];
        fetchList({ setIsLoading: listShowLoading, userId, extraParams: searchParams, onSuccessAction, onErrorAction });
    };

    // useEffect(() => {
    //     if (userId && !isFinanceLovDataLoaded) {
    //         fetchFinanceLovList({ setIsLoading: listFinanceLovShowLoading, userId });
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [userId, isFinanceLovDataLoaded]);

    const onSuccessAction = (res) => {
        showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
    };

    const onErrorAction = (message) => {
        showGlobalNotification(message);
    };
    const onFinish = (values) => {
        if (soldByDealer) {
            setRequestPayload({ ...requestPayload, customerDetails: customerDetailsData });
        } else {
            setRequestPayload({ ...requestPayload, customerDetails: customerDetailsDataSearched });
        }

        setChallanRequestPayload({ ...challanRequestPayload, customerDetails: customerDetailsDataSearched });

        handleButtonClick({ buttonAction: NEXT_ACTION });
        setButtonData({ ...buttonData, formBtnActive: false });
    };

    const onFinishFailed = () => {};

    const onCloseAction = () => {
        form.resetFields();
        setIsFormVisible(false);
    };

    const formProps = {
        ...props,
        typeData,
        form,
        formData,
        formActionType,
        setFormActionType,
        fetchList,
        onFinish,
        onFinishFailed,
        isVisible: isFormVisible,
        onCloseAction,

        fetchFinanceLovList,
        listFinanceLovShowLoading,

        ADD_ACTION,
        EDIT_ACTION,
        VIEW_ACTION,
        buttonData,
        setButtonData,
        handleButtonClick,
        handleCustomerIdSearch,
        handleOnChange,
        customerIdValue,
        soldByDealer,
    };

    const viewProps = {
        formData,
        styles,
        isLoading,
        FinanceLovData,
        typeData,
        soldByDealer,
        customerIdValue,
    };

    return (
        <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormValueChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Row>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <h2>{section?.title}</h2>
                        </Col>
                    </Row>

                    {formActionType?.viewMode ? <ViewDetail {...viewProps} /> : <AddEditForm {...formProps} />}
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <VehicleDeliveryNoteFormButton {...props} />
                </Col>
            </Row>
        </Form>
    );
};

export const CustomerDetailsMaster = connect(mapStateToProps, mapDispatchToProps)(CustomerDetailsMasterBase);
