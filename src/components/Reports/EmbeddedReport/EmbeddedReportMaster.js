/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { reportDataActions } from 'store/actions/data/report/reports';
import { showGlobalNotification } from 'store/actions/notification';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            Report: {
                Reports: { isLoaded: isDataLoaded = false, isLoading, data },
            },
        },
    } = state;

    let returnValue = {
        userId,
        isDataLoaded,
        isLoading,
        data,
        reportLink: data?.embedReports?.[0]?.embedUrl || '',
    };

    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: reportDataActions.fetchList,
            listShowLoading: reportDataActions.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

const EmbeddedReportMasterMain = (props) => {
    const { userId, isDataLoaded, reportLink, fetchList, listShowLoading } = props;
    // const reportLink = process.env.REACT_APP_POWER_BI_EMBEDDED_REPORT;

    const onSuccessAction = (res) => {
        // showGlobalNotification({ notificationType: 'success', title: 'Success', message: 'File deleted Successfully' });
    };

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
    };

    useEffect(() => {
        if (userId && !isDataLoaded) {
            fetchList({ setIsLoading: listShowLoading, userId, tempRespone: true, onSuccessAction, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isDataLoaded]);

    return (
        reportLink && (
            <object data={reportLink} width="100%" height="90%">
                <embed src={reportLink} width="100%" height="90%"></embed>
                Issue with report
            </object>
        )
    );
};

export const EmbeddedReportMaster = connect(mapStateToProps, mapDispatchToProps)(EmbeddedReportMasterMain);
