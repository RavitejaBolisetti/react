import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showGlobalNotification } from 'store/actions/notification';
import styles from 'components/common/Common.module.css';
import { AddEditForm } from './AddEditForm';
import { ViewDetail } from './ViewDetails';
import { otfSchemeDetailDataActions } from 'store/actions/data/otf/schemeDetails';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            OTF: {
                SchemeDetail: { isLoaded: isDataLoaded = false, isLoading, data: schemeData = [] },
            },
        },
    } = state;

    const moduleTitle = 'Scheme And Offer Details';

    let returnValue = {
        userId,
        isDataLoaded,
        schemeData,
        isLoading,
        moduleTitle,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: otfSchemeDetailDataActions.fetchList,
            listShowLoading: otfSchemeDetailDataActions.listShowLoading,
            resetData: otfSchemeDetailDataActions.reset,
            showGlobalNotification,
        },
        dispatch
    ),
});

const SchemeDetailsMasterBase = (props) => {
    const { schemeData, onCloseAction, fetchList, formActionType, userId, isDataLoaded, listShowLoading, showGlobalNotification } = props;

    const extraParams = [
        {
            key: 'otfNumber',
            title: 'otfNumber',
            value: 'OTF002',
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
        schemeData,
    };

    const formProps = {
        schemeData,
        formActionType,
        fetchList,
        onCloseAction,
    };
    return <>{!formActionType?.viewMode ? <AddEditForm {...formProps} /> : <ViewDetail {...viewProps} />}</>;
};

export const SchemeDetailsMaster = connect(mapStateToProps, mapDispatchToProps)(SchemeDetailsMasterBase);
