/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'antd';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { otfvehicleDetailsDataActions } from 'store/actions/data/otf/vehicleDetails';
import { otfvehicleDetailsLovDataActions } from 'store/actions/data/otf/vehicleDetailsLov';
import { productHierarchyDataActions } from 'store/actions/data/productHierarchy';

import { showGlobalNotification } from 'store/actions/notification';
import { PARAM_MASTER } from 'constants/paramMaster';

import styles from 'components/common/Common.module.css';
import { AddEditForm } from './AddEditForm';
import { ViewDetail } from './ViewDetail';
import { OTFFormButton } from '../OTFFormButton';
import { OTFStatusBar } from '../utils/OTFStatusBar';

import dayjs from 'dayjs';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            OTF: {
                VehicleDetails: { isLoaded: isDataLoaded = false, isLoading, data: VehicleDetailsData = [] },
                VehicleDetailsLov: { isFilteredListLoaded: isVehicleLovDataLoaded = false, isLoading: isVehicleLovDataLoading, filteredListData: VehicleLovData },
            },
            ProductHierarchy: { isFilteredListLoaded: isProductHierarchyDataLoaded = false, isLoading: isProductHierarchyLoading, filteredListData: VehicleLovCodeData = [] },
        },
    } = state;

    const moduleTitle = 'Vehicle Details';

    let returnValue = {
        userId,
        isDataLoaded,
        VehicleDetailsData,
        isLoading,
        moduleTitle,
        ProductHierarchyData: VehicleLovCodeData,
        isProductHierarchyDataLoaded,
        isProductHierarchyLoading,
        isVehicleLovDataLoaded,
        VehicleLovData,
        isVehicleLovDataLoading,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: otfvehicleDetailsDataActions.fetchList,
            saveData: otfvehicleDetailsDataActions.saveData,
            fetchProductLovCode: productHierarchyDataActions.fetchFilteredList,
            fetchProductLov: otfvehicleDetailsLovDataActions.fetchFilteredList,
            ProductLovCodeLoading: productHierarchyDataActions.listShowLoading,
            ProductLovLoading: otfvehicleDetailsLovDataActions.listShowLoading,
            listShowLoading: otfvehicleDetailsDataActions.listShowLoading,
            resetData: otfvehicleDetailsDataActions.reset,
            showGlobalNotification,
        },
        dispatch
    ),
});

const VehicleDetailsMasterMain = (props) => {
    const { VehicleDetailsData, VehicleLovData, isVehicleLovDataLoaded, ProductHierarchyData, fetchProductLovCode, fetchProductLov, isLoading, saveData, ProductLovLoading, isProductHierarchyDataLoaded, typeData, fetchList, resetData, userId, isDataLoaded, listShowLoading, showGlobalNotification } = props;
    const { form, selectedOrderId, section, formActionType, handleFormValueChange, NEXT_ACTION, handleButtonClick } = props;

    const [activeKey, setactiveKey] = useState([1]);
    const [formData, setformData] = useState({});
    const [optionsServiceModified, setoptionsServiceModified] = useState([]);
    const [optionsServicesMapping, setoptionsServicesMapping] = useState([]);
    const [openAccordian, setOpenAccordian] = useState('1');

    const [tooltTipText, settooltTipText] = useState();
    const [isReadOnly, setIsReadOnly] = useState();

    const [ProductHierarchyDataOptions, setProductHierarchyDataOptions] = useState();
    const [modelData, setmodelData] = useState();
    const onSuccessAction = (res) => {
        showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
    };

    const onErrorAction = (message) => {
        resetData();
        showGlobalNotification({ message });
    };
    console.log(typeData[PARAM_MASTER?.VEHCL_TYPE?.id]);

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
            fetchList({ setIsLoading: listShowLoading, userId, extraParams, onErrorAction });
            fetchProductLov({ setIsLoading: ProductLovLoading, userId, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedOrderId]);

    useEffect(() => {
        if (ProductHierarchyData && isProductHierarchyDataLoaded && userId) {
            setmodelData(ProductHierarchyData['0']);
            form.setFieldsValue({
                modelCode: ProductHierarchyData['0']['model'] ?? 'NA',
            });
            settooltTipText(
                <div>
                    <p>
                        Color - <span>{ProductHierarchyData['0']['color'] ?? 'Na'}</span>
                    </p>
                    <p>
                        Seating - <span>{ProductHierarchyData['0']['seatingCapacity'] ?? 'Na'}</span>
                    </p>
                    <p>
                        Fuel - <span>{ProductHierarchyData['0']['fuel'] ?? 'Na'}</span>
                    </p>
                    <p>
                        Variant - <span>{ProductHierarchyData['0']['variant'] ?? 'Na'}</span>
                    </p>
                    <p>
                        Name - <span>{ProductHierarchyData['0']['name'] ?? 'Na'}</span>
                    </p>
                </div>
            );
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ProductHierarchyData, isProductHierarchyDataLoaded, userId]);
    useEffect(() => {
        if (VehicleLovData && isVehicleLovDataLoaded && userId) {
            setProductHierarchyDataOptions(VehicleLovData);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [VehicleLovData, isVehicleLovDataLoaded, userId]);

    useEffect(() => {
        if (VehicleDetailsData && isDataLoaded) {
            setformData(VehicleDetailsData);
            setoptionsServiceModified(VehicleDetailsData['optionalServices']);
            const LovParams = [
                {
                    key: 'prodctCode',
                    title: 'prodctCode',
                    value: VehicleDetailsData?.model,
                    name: 'Product Code',
                },
            ];
            fetchProductLovCode({ setIsLoading: ProductLovLoading, userId, onErrorAction, extraparams: LovParams });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [VehicleDetailsData, isDataLoaded]);

    const onHandleSelect = (values) => {
        const LovParams = [
            {
                key: 'prodctCode',
                title: 'prodctCode',
                value: values,
                name: 'Product Code',
            },
        ];
        fetchProductLovCode({ setIsLoading: ProductLovLoading, userId, onErrorAction, extraparams: LovParams });
    };
    const onFinish = (values) => {
        let data;
        if (!values.hasOwnProperty('vehicleUsageType')) {
            data = { otfNumber: selectedOrderId, OtfId: formData?.id, id: formData?.id, podate: dayjs(formData?.podate?.substr(0, 10)).format('DD/MM/YYYY'), vehicleUsageType: VehicleDetailsData?.vehicleUsageType, model: VehicleDetailsData?.model, modelCode: VehicleDetailsData?.modelCode, discountAmount: VehicleDetailsData?.discountAmount, optionalServices: optionsServicesMapping };
            console.log('data', data);
        } else {
            data = { ...values, otfNumber: selectedOrderId, OtfId: formData?.id, id: formData?.id, optionalServices: optionsServicesMapping };
        }

        const onSuccess = (res) => {
            setoptionsServicesMapping([]);
            setoptionsServiceModified([]);
            setformData({});
            setOpenAccordian('1');
            setIsReadOnly(false);
            const extraParams = [
                {
                    key: 'otfNumber',
                    title: 'otfNumber',
                    value: selectedOrderId,
                    name: 'OTF Number',
                },
            ];
            form.resetFields();
            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, userId, onErrorAction, onSuccessAction, extraParams });
            handleButtonClick({ record: res?.data, buttonAction: NEXT_ACTION });
        };

        const onError = (message) => {
            showGlobalNotification({ message });
        };

        const requestData = {
            data: data,
            method: 'put',
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
        };

        saveData(requestData);
    };
    const onFinishFailed = () => {
        form.validateFields()
            .then(() => {})
            .catch(() => {});
    };

    const formProps = {
        ...props,
        formData,
        formActionType,
        activeKey,
        setactiveKey,
        onChange,
        typeData,
        ProductHierarchyData: ProductHierarchyDataOptions,
        showGlobalNotification,
        fetchList,
        userId,
        listShowLoading,
        saveData,
        onSuccessAction,
        selectedOrderId,
        onErrorAction,
        form,
        onFinish,
        onFinishFailed,
        openAccordian,
        setOpenAccordian,
        isReadOnly,
        setIsReadOnly,
        optionsServiceModified,
        setoptionsServiceModified,
        optionsServicesMapping,
        setoptionsServicesMapping,
        handleFormValueChange,
        onHandleSelect,
        tooltTipText,
    };

    const viewProps = {
        activeKey,
        setactiveKey,
        onChange,
        styles,
        formData,
        modelData,
        tooltTipText,
        settooltTipText,
        typeData,
        isLoading,
    };

    return (
        <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormValueChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Row>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <h2>{section?.title}</h2>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <OTFStatusBar status={1} />
                        </Col>
                    </Row>
                    {formActionType?.viewMode ? <ViewDetail {...viewProps} /> : <AddEditForm {...formProps} />}
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <OTFFormButton {...props} />
                </Col>
            </Row>
        </Form>
    );
};
export const VehicleDetailsMaster = connect(mapStateToProps, mapDispatchToProps)(VehicleDetailsMasterMain);
