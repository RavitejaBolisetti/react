/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Space, Collapse, Form } from 'antd';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { otfvehicleDetailsDataActions } from 'store/actions/data/otf/vehicleDetails';
import { productHierarchyDataActions } from 'store/actions/data/productHierarchy';

import { showGlobalNotification } from 'store/actions/notification';
import { configParamEditActions } from 'store/actions/data/configurableParamterEditing';
import { PARAM_MASTER } from 'constants/paramMaster';

import styles from 'components/common/Common.module.css';
import { AddEditForm } from './AddEditForm';
import { ViewDetail } from './ViewDetail';
import { OTFFormButton } from '../OTFFormButton';
import { InputSkeleton } from 'components/common/Skeleton';
import { OTFStatusBar } from '../utils/OTFStatusBar';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            OTF: {
                VehicleDetails: { isLoaded: isDataLoaded = false, isLoading, data: VehicleDetailsData = [] },
            },
            ConfigurableParameterEditing: { isLoaded: isTypeDataLoaded = false, isTypeDataLoading, paramdata: typeData = [] },
            ProductHierarchy: { isFilteredListLoaded: isProductHierarchyDataLoaded = false, isLoading: isProductHierarchyLoading, filteredListData: ProductHierarchyData = [] },
        },
    } = state;

    const moduleTitle = 'Vehicle Details';

    let returnValue = {
        userId,
        isDataLoaded,
        VehicleDetailsData,
        isLoading,
        moduleTitle,
        typeData: typeData,
        isTypeDataLoaded,
        ProductHierarchyData,
        isProductHierarchyDataLoaded,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: otfvehicleDetailsDataActions.fetchList,
            saveData: otfvehicleDetailsDataActions.saveData,
            fetchProductLov: productHierarchyDataActions.fetchFilteredList,
            ProductLovLoading: productHierarchyDataActions.listShowLoading,
            fetchconfigList: configParamEditActions.fetchList,
            configLoading: configParamEditActions.listShowLoading,
            listShowLoading: otfvehicleDetailsDataActions.listShowLoading,
            resetData: otfvehicleDetailsDataActions.reset,
            showGlobalNotification,
        },
        dispatch
    ),
});

const VehicleDetailsMasterMain = (props) => {
    const { VehicleDetailsData, fetchProductLov, isLoading, saveData, ProductLovLoading, isProductHierarchyDataLoaded, ProductHierarchyData, typeData, fetchList, isTypeDataLoaded, resetData, configLoading, fetchconfigList, userId, isDataLoaded, listShowLoading, showGlobalNotification } = props;
    const { form, selectedOrderId, section, formActionType, handleFormValueChange } = props;

    const [activeKey, setactiveKey] = useState([1]);
    const [formData, setformData] = useState({});

    const [tooltTipText, settooltTipText] = useState();

    const [ProductHierarchyDataOptions, setProductHierarchyDataOptions] = useState();

    const onSuccessAction = (res) => {
        showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
    };

    const onErrorAction = (message) => {
        resetData();
        showGlobalNotification({ message });
    };
    const loadDependendData = () => {
        fetchconfigList({ setIsLoading: configLoading, userId, onErrorAction, parameterType: PARAM_MASTER.VEHCL_TYPE.id });
        fetchProductLov({ setIsLoading: ProductLovLoading, userId, onErrorAction });
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
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedOrderId]);
    useEffect(() => {
        if (userId && !isTypeDataLoaded) {
            loadDependendData();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isTypeDataLoaded]);

    useEffect(() => {
        if (ProductHierarchyData && isProductHierarchyDataLoaded && userId) {
            setProductHierarchyDataOptions(ProductHierarchyData);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ProductHierarchyData, isProductHierarchyDataLoaded, userId]);
    useEffect(() => {
        if (VehicleDetailsData && isDataLoaded) {
            const LovParams = [
                {
                    key: 'prodctCode',
                    title: 'prodctCode',
                    value: VehicleDetailsData?.model,
                    name: 'Product Code',
                },
            ];
            setformData(VehicleDetailsData);

            // fetchProductLov({ setIsLoading: ProductLovLoading, userId, onErrorAction, extraparams: LovParams });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [VehicleDetailsData, isDataLoaded]);

    const onFinish = (values) => {
        const data = { ...values, otfNumber: selectedOrderId, OtfId: formData?.id, id: '' };
        console.log('data', data, selectedOrderId);

        const onSuccess = (res) => {
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
    };
    const viewProps = {
        activeKey,
        setactiveKey,
        onChange,
        styles,
        formData,
        modelData: ProductHierarchyData,
        tooltTipText,
        settooltTipText,
    };
    const formContainer = formActionType?.viewMode ? <ViewDetail {...viewProps} /> : <AddEditForm {...formProps} />;
    const formSkeleton = (
        <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <InputSkeleton height={'100vh'} />
            </Col>
        </Row>
    );

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
                    {isLoading ? formSkeleton : formContainer}
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
