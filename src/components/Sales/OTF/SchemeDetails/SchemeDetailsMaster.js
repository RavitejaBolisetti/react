import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import dayjs from 'dayjs'
import { showGlobalNotification } from 'store/actions/notification';
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

    // const viewProps = {
    //     styles,
    //     onCloseAction,
    //     schemeData,
    // };

    const formProps = {
        formActionType,
        fetchList,
        onCloseAction,
    };

    console.log(schemeData,'DATA')

    return (
        // <>{!formActionType?.viewMode ? schemeData[0]?.schemes?.map((item) => <AddEditForm {...formProps} schemeCategory={item?.schemeCategory} amount={item?.amount} description={item?.description} />) : <ViewDetail {...viewProps} />}</>
        schemeData[0]?.schemes?.map((item) => <AddEditForm {...formProps} schemeType={item?.schemeType} schemeCategory={item?.schemeCategory} amount={item?.amount} description={item?.description} id={item?.id} schemeName={item?.schemeName} validFrom={dayjs(item?.validFrom)} validTo={dayjs(item?.validTo)} />)
    ) 
};

export const SchemeDetailsMaster = connect(mapStateToProps, mapDispatchToProps)(SchemeDetailsMasterBase);
