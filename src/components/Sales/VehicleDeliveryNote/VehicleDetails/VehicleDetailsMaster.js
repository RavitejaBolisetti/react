/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'antd';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { vehicleBatteryDetailsDataActions } from 'store/actions/data/vehicleDeliveryNote/vehicleBatteryDetails';
import { showGlobalNotification } from 'store/actions/notification';

import styles from 'assets/sass/app.module.scss';
import { VehicleDeliveryNoteFormButton } from '../VehicleDeliveryNoteFormButton';
import { FROM_ACTION_TYPE } from 'constants/formActionType';

import { ViewDetail } from './ViewDetail';
import { AddEditForm } from './AddEditForm';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            VehicleDeliveryNote: {
                VehicleBatteryDetails: { isLoaded: isDataLoaded = false, isLoading, data: vehicleData = {} },
            },
        },
    } = state;

    const moduleTitle = 'Vehicle Details';

    let returnValue = {
        userId,
        isDataLoaded,
        isLoading,
        moduleTitle,
        vehicleData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: vehicleBatteryDetailsDataActions.fetchList,
            listShowLoading: vehicleBatteryDetailsDataActions.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

const VehicleDetailsMasterBase = (props) => {
    const { typeData, partySegmentType } = props;
    const { userId, resetData, selectedOrderId, selectedInvoiceId, setFormActionType, showGlobalNotification, listShowLoading, isDataLoaded, isLoading } = props;
    const { form, formActionType, handleButtonClick, handleFormValueChange, section, openAccordian, setOpenAccordian, fetchList, vehicleData, NEXT_ACTION } = props;
    const [partySegment, setPartySegment] = useState('');
    const [regNumber, setRegNumber] = useState();
    const [activeKey, setActiveKey] = useState([]);
    const [otfNumber, setOtfNumber] = useState();
    const ADD_ACTION = FROM_ACTION_TYPE?.ADD;
    const EDIT_ACTION = FROM_ACTION_TYPE?.EDIT;
    const VIEW_ACTION = FROM_ACTION_TYPE?.VIEW;
    const [formData, setFormData] = useState();
    const defaultBtnVisiblity = { editBtn: false, saveBtn: false, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn: false, formBtnActive: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });
    const [isFormVisible, setIsFormVisible] = useState(false);

    const extraParams = [
        {
            key: 'invoicenumber',
            title: 'invoicenumber',
            value: selectedInvoiceId,
            name: 'Invoice Number',
        },
        {
            key: 'otfNumber',
            title: 'otfNumber',
            value: selectedOrderId,
            name: 'Invoice Number',
        },
    ];

    useEffect(() => {
        if (userId && selectedOrderId && selectedInvoiceId) {
            fetchList({ setIsLoading: listShowLoading, extraParams, userId, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedOrderId, selectedInvoiceId]);

    useEffect(() => {
        if (vehicleData && selectedOrderId && selectedInvoiceId) {
            form.setFieldsValue({ ...vehicleData });
            setFormData({ ...vehicleData });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vehicleData]);

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
    };

    const onFinish = (values) => {
        // const vehicleDetailsRequest = { ...values };
        // if (vehicleDetailsRequest?.hasOwnProperty('vehicle')) {
        //     setRequestPayload({ ...requestPayload, vehicleDetails: vehicleDetailsRequest });
        // } else {
        //     setRequestPayload({ ...requestPayload, vehicleDetails: vehicleData });
        // }
        handleButtonClick({ buttonAction: NEXT_ACTION });
        setButtonData({ ...buttonData, formBtnActive: false });
    };

    const onCloseAction = () => {
        form.resetFields();
        setIsFormVisible(false);
        setButtonData({ ...defaultBtnVisiblity });
    };

    const onFinishFailed = () => {};

    const formProps = {
        ...props,
        form,
        onFinish,
        onFinishFailed,
        fetchList,
        regNumber,
        formActionType,
        setFormActionType,

        userId,
        ADD_ACTION,
        EDIT_ACTION,
        VIEW_ACTION,
        isVisible: isFormVisible,
        isDataLoaded,
        formData: vehicleData,
        isLoading,
        setActiveKey,
        activeKey,
        otfNumber,
        setOtfNumber,
        handleFormValueChange,
        handleButtonClick,
        onCloseAction,
        buttonData,
        setButtonData,
    };

    const viewProps = {
        typeData,
        formData: vehicleData,
        styles,
        partySegmentType,
        isLoading,
        openAccordian,
        setOpenAccordian,
    };

    return (
        <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
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

export const VehicleDetailsMaster = connect(mapStateToProps, mapDispatchToProps)(VehicleDetailsMasterBase);
