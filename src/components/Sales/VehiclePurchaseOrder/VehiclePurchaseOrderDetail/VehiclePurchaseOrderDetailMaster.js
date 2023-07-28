/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Form, Row, Col } from 'antd';

import { ViewDetail } from './ViewDetail';
import { AddEditForm } from './AddEditForm';
import { VehiclePurchaseOrderFormButton } from '../VehiclePurchaseOrderFormButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { viewVehicleDetailDataActions } from 'store/actions/data/vehicle/viewVehicleDetails';
import { showGlobalNotification } from 'store/actions/notification';
import { ListDataTable } from 'utils/ListDataTable';
import { tableColumn } from './tableColumn';

import styles from 'components/common/Common.module.css';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            Vehicle: {
                ViewVehicleDetail: { isLoaded: isDataLoaded = false, isLoading, data: vehicleDetails = {} },
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
        vehicleDetails,
        userType: loginUserData?.userType || '',
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: viewVehicleDetailDataActions.fetchList,
            saveData: viewVehicleDetailDataActions.saveData,
            resetData: viewVehicleDetailDataActions.reset,
            listShowLoading: viewVehicleDetailDataActions.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

const VehiclePurchaseOrderDetailMasterBase = (props) => {
    const { typeData } = props;
    const { userId, showGlobalNotification, section, fetchList, listShowLoading, isDataLoaded, saveData, isLoading, vehicleDetails } = props;
    const { form, selectedRecordId, formActionType, handleFormValueChange, salesConsultantLov, NEXT_ACTION, handleButtonClick } = props;
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
            key: 'vin',
            title: 'vin',
            value: selectedRecordId,
            name: 'VIN Number',
        },
    ];
    useEffect(() => {
        if (userId && selectedRecordId) {
            fetchList({ setIsLoading: listShowLoading, userId, extraParams, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedRecordId]);

    const onSearch = (value) => {
        console.log('search vehicle-',value);
        if (!value) {
            return false;
        }


    };

    const onFinish = (values) => {
        console.log('values==>>', values);
        const recordId = vehicleDetails.vehicleDetails?.id || '';
        const vin = vehicleDetails.vehicleDetails?.vin || '';
        const registrationNumber = vehicleDetails.vehicleDetails?.registrationNumber || '';

        const data = { ...values, id: recordId, vin: vin, deliveryDate: values?.deliveryDate?.format('YYYY-MM-DD'), registrationNumber: registrationNumber };
        const onSuccess = (res) => {
            handleButtonClick({ record: res?.data, buttonAction: NEXT_ACTION });
            showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, userId, extraParams });
        };

        const onError = (message) => {
            showGlobalNotification({ message });
        };

        const requestData = {
            data: { vehicleDetails: data },
            method: 'put',
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
        formData: vehicleDetails?.vehicleDetails,
        isLoading,
        salesConsultantLov,
        onChange,
        activeKey,
        setactiveKey,
    };

    const viewProps = {
        typeData,
        fetchList,
        formData: vehicleDetails?.vehicleDetails,
        styles,
        isLoading,
        salesConsultantLov,
        onChange,
        activeKey,
        setactiveKey,
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
                {/* {formActionType?.viewMode ?<ViewDetail {...vieProps} /> : <AddEditForm {...formProps} /> } */}
                <AddEditForm {...formProps} />
            </Col>
        </Row>

        {/* <VehiclePurchaseOrderFormButton {...props} />  */} 
    </>
    )
};

export const VehiclePurchaseOrderDetailMaster = connect(mapStateToProps, mapDispatchToProps)(VehiclePurchaseOrderDetailMasterBase);
