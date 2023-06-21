import React, { useEffect } from 'react';
import styles from 'components/common/Common.module.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showGlobalNotification } from 'store/actions/notification';
import { ViewDetail } from './ViewDetail';

import { insuranceDetailDataActions } from 'store/actions/data/otf/insuranceDetail';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            OTF: {
                InsuranceDetail: { isLoaded: isDataLoaded = false, isLoading, data: insuranceData = [] },
            },
        },
    } = state;

    const moduleTitle = 'Insurance Details';

    let returnValue = {
        userId,
        isDataLoaded,
        insuranceData,
        isLoading,
        moduleTitle,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: insuranceDetailDataActions.fetchList,
            listShowLoading: insuranceDetailDataActions.listShowLoading,
            resetData: insuranceDetailDataActions.reset,
            showGlobalNotification,
        },
        dispatch
    ),
});

const InsuranceDetailsMasterBase = (props) => {
    const { insuranceData, onCloseAction, fetchList, formActionType, userId, isDataLoaded, listShowLoading, showGlobalNotification } = props;

    const extraParams = [
        {
            key: 'otfNumber',
            title: 'otfNumber',
            value: 'OTF001',
            name: 'OTF Number',
        },
    ];

    const errorAction = (message) => {
        showGlobalNotification(message);
    };

    const onSuccessAction = (res) => {
        showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
    };

    useEffect(() => {
        if (!isDataLoaded && userId) {
            fetchList({ setIsLoading: listShowLoading, extraParams, onSuccessAction, errorAction, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded, userId]);

    const viewProps = {
        styles,
        onCloseAction,
        insuranceData,
    };
    return <>{!formActionType?.viewMode ? <ViewDetail {...viewProps} /> : <ViewDetail {...viewProps} />}</>;
};

export const InsuranceDetailsMaster = connect(mapStateToProps, mapDispatchToProps)(InsuranceDetailsMasterBase);
