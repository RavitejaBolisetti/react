import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Space, Collapse } from 'antd';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { otfvehicleDetailsDataActions } from 'store/actions/data/otf/vehicleDetails';
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
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: otfvehicleDetailsDataActions.fetchList,
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
    const { VehicleDetailsData, formActionType, typeData, fetchList, isTypeDataLoaded, resetData, configLoading, fetchconfigList, userId, isDataLoaded, listShowLoading, showGlobalNotification } = props;
    const [activeKey, setactiveKey] = useState([1]);
    const [formData, setformData] = useState([{}]);

    const onSuccessAction = (res) => {
        showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
    };

    const onErrorAction = (message) => {
        resetData();
        showGlobalNotification({ message });
    };
    const loadDependendData = () => {
        fetchconfigList({ setIsLoading: configLoading, userId, onErrorAction, parameterType: PARAM_MASTER.VEHCL_TYPE.id });
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
    const formProps = {
        formData,
        formActionType,
        activeKey,
        setactiveKey,
        onChange,
        typeData,
    };
    const viewProps = {
        activeKey,
        setactiveKey,
        onChange,
        styles,
        formData,
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
