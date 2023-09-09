/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { models } from 'powerbi-client';
import { PowerBIEmbed } from 'powerbi-client-react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { reportDataActions } from 'store/actions/data/report/reports';
import { showGlobalNotification } from 'store/actions/notification';

import styles from './EmbeddedReportMaster.module.scss';

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

export const EmbeddedReportMasterMain = (props) => {
    const { userId, data, fetchList, listShowLoading, reportDetail } = props;
    const [, setReport] = useState();
    const [sampleReportConfig, setReportConfig] = useState({
        type: 'report',
        embedUrl: undefined,
        tokenType: models.TokenType.Embed,
        accessToken: undefined,
        settings: undefined,
    });
    console.log('sampleReportConfig', sampleReportConfig);

    const onSuccessAction = (res) => {
        // showGlobalNotification({ notificationType: 'success', title: 'Success', message: 'File deleted Successfully' });
    };

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
    };

    useEffect(() => {
        if (userId && reportDetail) {
            const extraParams = [
                {
                    key: 'reportName',
                    title: 'reportName',
                    value: reportDetail?.key,
                    name: 'Report Name',
                },
                {
                    key: 'reportType',
                    title: 'reportType',
                    value: reportDetail?.type,
                    name: 'Report Type',
                },
            ];
            fetchList({ setIsLoading: listShowLoading, userId, tempRespone: true, extraParams, onSuccessAction, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, reportDetail]);

    useEffect(() => {
        setReportConfig({
            type: 'report',
            id: data?.embedReports?.[0]?.reportId.substr(46, 92),
            embedUrl: data?.embedReports?.[0]?.embedUrl,
            accessToken: data.embedToken,
            tokenType: models.TokenType.Embed,
            settings: {
                panes: {
                    filters: {
                        expanded: false,
                        visible: false,
                    },
                },
            },
        });
    }, [data]);

    // Map of event handlers to be applied to the embedding report
    const eventHandlersMap = new Map([
        [
            'loaded',
            function () {
                // console.log('Report has loaded');
            },
        ],
        [
            'rendered',
            function () {
                //console.log('Report has rendered');
            },
        ],
        [
            'error',
            function (event) {
                if (event) {
                    console.error(event.detail);
                }
            },
        ],
    ]);

    return (
        <div>
            {sampleReportConfig?.accessToken && (
                <PowerBIEmbed
                    embedConfig={sampleReportConfig}
                    eventHandlers={eventHandlersMap}
                    cssClassName={styles.reportClass}
                    getEmbeddedComponent={(embedObject) => {
                        setReport(embedObject);
                    }}
                />
            )}
        </div>
    );
};

export const EmbeddedReportMaster = connect(mapStateToProps, mapDispatchToProps)(EmbeddedReportMasterMain);
