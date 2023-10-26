/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'antd';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { vehicleChallanDetailsDataActions } from 'store/actions/data/vehicleDeliveryNote/vehicleChallanDetails';
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
                VehicleDetailsChallan: { isLoaded: isChallanDataLoaded = false, isChallanLoading, data: vehicleChallanData = {} },
            },
        },
    } = state;

    const moduleTitle = 'Vehicle Details';

    let returnValue = {
        userId,
        moduleTitle,
        isChallanDataLoaded,
        isChallanLoading,
        vehicleChallanData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchChallanList: vehicleChallanDetailsDataActions.fetchList,
            listChallanShowLoading: vehicleChallanDetailsDataActions.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

const VehicleDetailsMasterBase = (props) => {
    const { typeData, partySegmentType, vehicleChallanData } = props;
    const { userId, soldByDealer, setFormActionType, showGlobalNotification, isLoading, requestPayload } = props;
    const { form, formActionType, handleButtonClick, handleFormValueChange, section, openAccordian, setOpenAccordian, fetchList, vehicleData, NEXT_ACTION, setRequestPayload } = props;
    const { buttonData, setButtonData } = props;

    const [regNumber, setRegNumber] = useState();
    const [activeKey, setActiveKey] = useState([1, 2]);
    const [otfNumber, setOtfNumber] = useState();
    const ADD_ACTION = FROM_ACTION_TYPE?.ADD;
    const EDIT_ACTION = FROM_ACTION_TYPE?.EDIT;
    const VIEW_ACTION = FROM_ACTION_TYPE?.VIEW;
    const [formData, setFormData] = useState();
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [toolTipContent, setToolTipContent] = useState();

    useEffect(() => {
        setToolTipContent(
            <div>
                <p>
                    Color - <span>{formData?.modelColor ?? 'Na'}</span>
                </p>
                <p>
                    Seating - <span>{formData?.seatingCapacity ?? 'Na'}</span>
                </p>
                <p>
                    Fuel - <span>{formData?.fuel ?? 'Na'}</span>
                </p>
                <p>
                    Variant - <span>{formData?.varient ?? 'Na'}</span>
                </p>
                <p>
                    Name - <span>{formData?.modelDescription ?? 'Na'}</span>
                </p>
            </div>
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    useEffect(() => {
        if (vehicleData && section?.id) {
            form.setFieldsValue({ ...vehicleData });
            setFormData({ ...vehicleData });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vehicleData, soldByDealer, section, requestPayload]);

    useEffect(() => {
        setButtonData({ ...buttonData, formBtnActive: true });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [section]);

    const onFinish = (values) => {
        if (!soldByDealer) {
            setRequestPayload({ ...requestPayload, vehicleInformationDto: values?.vinNumber ? { ...values } : { ...vehicleChallanData }, vehicleDetails: values?.vinNumber ? { ...values } : { ...vehicleData } });
        }
        handleButtonClick({ buttonAction: NEXT_ACTION });
        setButtonData({ ...buttonData, formBtnActive: false });
    };
    const onCloseAction = () => {
        form.resetFields();
        setIsFormVisible(false);
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
        formData,
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
        toolTipContent,
    };

    const viewProps = {
        typeData,
        formData,
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
