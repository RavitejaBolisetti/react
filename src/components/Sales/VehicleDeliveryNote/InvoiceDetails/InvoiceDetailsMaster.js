/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Form } from 'antd';
import { bindActionCreators } from 'redux';

import { relationshipManagerDataActions } from 'store/actions/data/vehicleDeliveryNote/relationshipManager';
import { vinNumberNoteDataActions } from 'store/actions/data/vehicleDeliveryNote/challanVinNumber';
import { vehicleChallanDetailsDataActions } from 'store/actions/data/vehicleDeliveryNote/vehicleChallanDetails';
import { showGlobalNotification } from 'store/actions/notification';
import { convertDate } from 'utils/formatDateTime';
import { RELATIONSHIP_MANAGER_CONSTANTS } from 'components/Sales/VehicleDeliveryNote/constants/relationShipMangerCodeConstants';

import { VehicleDeliveryNoteFormButton } from '../VehicleDeliveryNoteFormButton';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { AddEditForm } from './AddEditForm';
import { ViewDetail } from './ViewDetail';
import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            VehicleDeliveryNote: {
                RelationshipManager: { isLoaded: isRelationshipManagerLoaded = false, isloading: isRelationshipManagerLoading, data: relationshipManagerData = [] },
                VinNumberSearch: { isLoaded: vinNumberDataLoaded = false, isloading: vinNumberDataLoading, data: vinData = [] },
                VehicleDetailsChallan: { isLoaded: isChallanDataLoaded = false, isloading: isChallanLoading, data: vehicleChallanData = {} },
            },
        },
    } = state;

    const moduleTitle = translateContent('vehicleDeliveryNote.invoiceDetails.heading.mainTitle');
    const codeSetName = 'relationShipManagerCode';

    let returnValue = {
        userId,
        moduleTitle,
        isRelationshipManagerLoaded,
        isRelationshipManagerLoading,
        relationshipManagerData,
        typeData,
        vinNumberDataLoaded,
        vinNumberDataLoading,
        vinData,

        isChallanDataLoaded,
        isChallanLoading,
        vehicleChallanData,
        codeSetName,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchvinNumber: vinNumberNoteDataActions.fetchList,
            listvinNumberShowLoading: vinNumberNoteDataActions.listShowLoading,

            fetchRelationshipManger: relationshipManagerDataActions.fetchList,
            listRelationshipMangerShowLoading: relationshipManagerDataActions.listShowLoading,

            fetchChallanList: vehicleChallanDetailsDataActions.fetchList,
            listChallanShowLoading: vehicleChallanDetailsDataActions.listShowLoading,

            showGlobalNotification,
        },
        dispatch
    ),
});

export const InvoiceDetailsMasterBase = (props) => {
    const { userId, vinData, listvinNumberShowLoading, listEngineNumberShowLoading, fetchvinNumber, selectedOrder, relationshipManagerData, invoiceData, isRelationshipManagerLoaded, setFormActionType, fetchRelationshipManger, listRelationshipMangerShowLoading, isLoading } = props;

    const { typeData, form, selectedOrderId, requestPayload, setRequestPayload, soldByDealer, formActionType, handleFormValueChange, handleButtonClick, NEXT_ACTION, section, engineNumberData, chassisNoValue } = props;

    const { fetchChallanList, listChallanShowLoading } = props;

    const { buttonData, setButtonData, codeSetName } = props;

    const [formData, setFormData] = useState({});

    const ADD_ACTION = FROM_ACTION_TYPE?.ADD;
    const EDIT_ACTION = FROM_ACTION_TYPE?.EDIT;
    const VIEW_ACTION = FROM_ACTION_TYPE?.VIEW;

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
    };
    const getChallanDetails = (chassisNumber, engineNumber) => {
        if (engineNumber && chassisNumber) {
            const extraParams = [
                {
                    key: 'chassisNumber',
                    title: 'chassisNumber',
                    value: chassisNumber,
                    name: 'Chassis Number',
                },
                {
                    key: 'engineNumber',
                    title: 'engineNumber',
                    value: engineNumber,
                    name: 'Engine Number',
                },
            ];

            fetchChallanList({ setIsLoading: listChallanShowLoading, extraParams, userId, onErrorAction });
        }
    };
    useEffect(() => {
        if (formActionType.addMode && !soldByDealer) {
            const disableFormButton = invoiceData?.chassisNumber && invoiceData?.engineNumber;
            setButtonData({ ...buttonData, formBtnActive: disableFormButton });
            setFormData((prev) => ({ ...prev, deliveryNoteFor: translateContent('vehicleDeliveryNote.invoiceDetails.label.directlyBilled') }));
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [section, soldByDealer]);

    useEffect(() => {
        if (invoiceData && Object?.keys(invoiceData)?.length > 0) {
            setFormData((prev) => ({ ...invoiceData, deliveryNoteFor: translateContent('vehicleDeliveryNote.invoiceDetails.label.soldByDealer') }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [invoiceData, section]);

    useEffect(() => {
        if (userId && !soldByDealer) {
            const searchParams = [
                {
                    key: 'invoiceHdrId',
                    value: selectedOrder?.invoicehdrId,
                    name: 'invoiceHdrId',
                },
            ];
            fetchvinNumber({ setIsLoading: listvinNumberShowLoading, userId, extraParams: searchParams, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [section, userId, soldByDealer]);

    useEffect(() => {
        const extraParams = [
            {
                key: 'employeeType',
                title: 'employeeType',
                value: RELATIONSHIP_MANAGER_CONSTANTS?.RELATIONSHIP_MANAGER?.key,
                name: 'All employees',
            },
        ];
        if (userId && soldByDealer && section?.id) {
            fetchRelationshipManger({ setIsLoading: listRelationshipMangerShowLoading, userId, extraParams, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, soldByDealer, section]);

    const handleChassisNoSearch = (val) => {
        if (!val) return;

        const onSuccessAction = (res) => {
            showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
        };
        const searchParams = [
            {
                key: 'chassisNumber',
                title: 'chassisNumber',
                value: val || chassisNoValue,
                name: 'Chassis Number',
            },
        ];
        fetchvinNumber({ setIsLoading: listvinNumberShowLoading, userId, extraParams: searchParams, onSuccessAction, onErrorAction });
    };

    const onFinish = (values) => {
        const invoiceDetailsRequest = { ...values, relationShipManagerCode: values?.relationShipManager, relationShipManager: values?.relationShipManagerCode };
        setRequestPayload({ ...requestPayload, engineDetailDto: { ...invoiceDetailsRequest }, deliveryNoteInvoiveDetails: { ...invoiceDetailsRequest, invoiceDate: convertDate(invoiceData?.invoiceDate), customerPromiseDate: invoiceData?.customerPromiseDate ? convertDate(invoiceData?.customerPromiseDate) : '' } });
        handleButtonClick({ buttonAction: NEXT_ACTION });
        setButtonData({ ...buttonData, formBtnActive: false });
    };

    const handleRelationShipManagerChange = (value) => {
        form.setFieldValue(codeSetName, value);
    };

    const formProps = {
        ...props,
        typeData,
        form,
        formData,
        formActionType,
        setFormActionType,
        onFinish,
        isRelationshipManagerLoaded,
        fetchRelationshipManger,
        listRelationshipMangerShowLoading,
        ADD_ACTION,
        EDIT_ACTION,
        VIEW_ACTION,
        buttonData,
        setButtonData,
        handleButtonClick,
        soldByDealer,
        selectedOrderId,
        handleChassisNoSearch,
        chassisNoValue,
        vinData,
        relationshipManagerData,
        listEngineNumberShowLoading,
        engineNumberData,
        userId,
        handleRelationShipManagerChange,
        getChallanDetails,
    };

    const viewProps = {
        formData,
        styles,
        isLoading,
        typeData,
        soldByDealer,
        handleChassisNoSearch,
        relationshipManagerData,
    };

    return (
        <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormValueChange} onFinish={onFinish}>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Row>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <h2>{translateContent(section?.translateKey)}</h2>
                        </Col>
                    </Row>

                    {formActionType?.viewMode ? <ViewDetail {...viewProps} /> : <AddEditForm {...formProps} />}
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <VehicleDeliveryNoteFormButton {...formProps} />
                </Col>
            </Row>
        </Form>
    );
};

export const InvoiceDetailsMaster = connect(mapStateToProps, mapDispatchToProps)(InvoiceDetailsMasterBase);
