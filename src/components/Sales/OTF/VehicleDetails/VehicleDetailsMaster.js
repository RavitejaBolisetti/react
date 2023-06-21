/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Space, Collapse } from 'antd';

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
    const { VehicleDetailsData, fetchProductLov, ProductLovLoading, isProductHierarchyDataLoaded, ProductHierarchyData, formActionType, typeData, fetchList, isTypeDataLoaded, resetData, configLoading, fetchconfigList, userId, isDataLoaded, listShowLoading, showGlobalNotification } = props;
    const [activeKey, setactiveKey] = useState([1]);
    const [formData, setformData] = useState({});
    const [keys, setkeys] = useState(true);

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

    const extraParams = [
        {
            key: 'otfNumber',
            title: 'otfNumber',
            value: 'OTF002',
            name: 'OTF Number',
        },
    ];

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
        if (userId && !isTypeDataLoaded) {
            loadDependendData();
        }
        if (userId && !isDataLoaded) {
            fetchList({ setIsLoading: listShowLoading, userId, onErrorAction, onSuccessAction, extraParams });
        }
        if (userId && isDataLoaded) {
            setformData(VehicleDetailsData);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isTypeDataLoaded, isDataLoaded]);
    useEffect(() => {
        if (ProductHierarchyData && isProductHierarchyDataLoaded && userId && keys) {
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
            fetchProductLov({ setIsLoading: ProductLovLoading, userId, onErrorAction, extraparams: LovParams });
            setkeys(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [VehicleDetailsData, isDataLoaded]);
    const formProps = {
        formData,
        formActionType,
        activeKey,
        setactiveKey,
        onChange,
        typeData,
        ProductHierarchyData: ProductHierarchyDataOptions,
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

    return (
        <>
            {!formActionType?.viewMode ? (
                <div className={styles.drawerCustomerMaster}>
                    <AddEditForm {...formProps} />
                </div>
            ) : (
                <ViewDetail {...viewProps} />
            )}
        </>
    );
};
export const VehicleDetailsMaster = connect(mapStateToProps, mapDispatchToProps)(VehicleDetailsMasterMain);
