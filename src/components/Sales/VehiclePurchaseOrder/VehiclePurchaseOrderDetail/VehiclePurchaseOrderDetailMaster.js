/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'antd';

import { AddEditForm } from './AddEditForm';
import { tncProductHierarchyDataActions } from 'store/actions/data/termsConditions/tncProductHierarchy';

import { dealerParentLovDataActions } from 'store/actions/data/dealer/dealerParentsLov';
import { viewVPODataActions } from 'store/actions/data/vehicle/viewVPODetails';
import { showGlobalNotification } from 'store/actions/notification';

import { saveVPODataActions } from 'store/actions/data/vehicle/vehiclePurchaseOrderAction';
import { dealerLocationDataActions } from 'store/actions/data/vehicle/dealerLocationAction';
import { vehiclePurchaseOrderDataActions } from 'store/actions/data/vehicle/vehiclePurchaseOrderDetails';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            TermCondition: {
                ProductHierarchyData: { isLoaded: isDataLoaded = false, data: productHierarchyList },
            },
            DealerHierarchy: {
                DealerParent: { data: dealerParentsLovList },
            },
            Vehicle: {
                ViewVPODetail: { isLoading, data: viewVehiclePODetails = {} },
                DealerLocationDetail: { data: dealerLocationList = {} },
            },
        },
        common: {
            Header: { data: loginUserData = [] },
        },
    } = state;

    const moduleTitle = 'Vehicle Purchase Order';

    let returnValue = {
        userId,
        typeData,
        isDataLoaded,
        isLoading,
        moduleTitle,
        vehicleDetails: '',
        productHierarchyList,
        userType: loginUserData?.userType || '',
        dealerParentsLovList,
        viewVehiclePODetails,
        dealerLocationList,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchProductList: tncProductHierarchyDataActions.fetchList,
            listShowLoading: tncProductHierarchyDataActions.listShowLoading,
            fetchDealerParentsLovList: dealerParentLovDataActions.fetchList,
            listShowLoadingOnLoad: dealerParentLovDataActions.listShowLoading,
            fetchList: viewVPODataActions.fetchList,
            fetchListView: vehiclePurchaseOrderDataActions.fetchList,

            saveData: saveVPODataActions.saveData,
            resetData: saveVPODataActions.reset,

            fetchDealerLocation: dealerLocationDataActions.fetchList,
            showGlobalNotification,
        },
        dispatch
    ),
});

const VehiclePurchaseOrderDetailMasterBase = (props) => {
    const { typeData, fetchProductList, productHierarchyList, fetchDealerParentsLovList, viewVehiclePODetails, fetchDealerLocation, selectedRecord, setSelectedRecord,setIsFormVisible, } = props;
    const { userId, formActionType, showGlobalNotification, section, fetchList, listShowLoading, isDataLoaded, saveData, isLoading } = props;
    const { form, selectedRecordId, salesConsultantLov, NEXT_ACTION, handleButtonClick, fetchListView, extraParamsAfterSave } = props;
    const [activeKey, setactiveKey] = useState([1]);

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
    };

    const onChange = (values) => {
        const isPresent = activeKey.includes(values);

        if (isPresent) {
            const newActivekeys = [];

            activeKey.forEach((item) => {
                if (item !== values) {
                    newActivekeys.push(item);
                }
            });
            setactiveKey(newActivekeys);
        } else {
            setactiveKey([...activeKey, values]);
        }
    };

    const extraParams = [
        {
            key: 'purchaseOrderId',
            title: 'purchaseOrderId',
            value: selectedRecordId,
            name: 'Purchase Order Id',
        },
    ];

    useEffect(() => {
        if (userId) {
            fetchProductList({ setIsLoading: listShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    useEffect(() => {
        if (userId) {
            fetchDealerParentsLovList({ setIsLoading: listShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    useEffect(() => {
        if (userId && selectedRecordId) {
            fetchList({ setIsLoading: listShowLoading, userId, extraParams, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedRecordId]);

    useEffect(() => {
        if (userId && viewVehiclePODetails.dealerParentCode) {
            const extraParams = [
                {
                    key: 'dealerParentCode',
                    title: 'dealerParentCode',
                    value: viewVehiclePODetails.dealerParentCode,
                    name: 'Dealer Parent Code',
                },
            ];
            fetchDealerLocation({ setIsLoading: listShowLoading, extraParams, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, viewVehiclePODetails]);

    const getDealerlocation = (e) => {
        const extraParams = [
            {
                key: 'dealerParentCode',
                title: 'dealerParentCode',
                value: e,
                name: 'Dealer Parent Code',
            },
        ];
        fetchDealerLocation({ setIsLoading: listShowLoading, extraParams, onErrorAction });
    };

    const onFinish = (values) => {
        console.log('save');
        const recordId = viewVehiclePODetails?.id || '';

        const onSuccess = (res) => {
            showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });

            fetchListView({ setIsLoading: listShowLoading, userId, extraParams: extraParamsAfterSave, onErrorAction });
            handleButtonClick({ record: res?.data, buttonAction: NEXT_ACTION });
            setIsFormVisible(false);
        };

        const onError = (message) => {
            showGlobalNotification({ message });
        };

        const requestData = {
            data: {
                id: recordId,
                orderTypeCode: values?.orderTypeCode,
                dealerParentCode: values?.dealerParentCode,
                modelCode: values?.modelCode,
                quantity: values?.quantity,
                purchaseOrderDate: values?.purchaseOrderDate?.format('YYYY-MM-DD'),
                purchaseOrderNumber: '',
                purchaseOrderStatusCode: '',
                dealerLocationId: values?.dealerLocation,
                cancelRemarksCode: '',
            },
            method: 'post',
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
        };

        saveData(requestData);
    };

    const onFinishFailed = () => {};

    const formProps = {
        ...props,
        form,
        onFinish,
        onFinishFailed,
        fetchList,
        typeData,
        userId,
        isDataLoaded,
        formData: formActionType?.addMode === true ? {} : viewVehiclePODetails,
        isLoading,
        salesConsultantLov,
        onChange,
        activeKey,
        setactiveKey,
        productHierarchyList,
        getDealerlocation,
        selectedRecordId,
        selectedRecord,
        setSelectedRecord,
        // viewVehiclePODetails,
    };

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <h2>{section?.title}</h2>
                        </Col>
                    </Row>
                    <AddEditForm {...formProps} />
                </Col>
            </Row>
        </>
    );
};

export const VehiclePurchaseOrderDetailMaster = connect(mapStateToProps, mapDispatchToProps)(VehiclePurchaseOrderDetailMasterBase);
