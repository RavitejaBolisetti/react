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
import { REPORT_TYPE } from 'constants/EmbeddedReports';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            Report: {
                Reports: { isLoaded: isDataLoaded = false, isLoading, data },
            },
        },
        common: {
            Header: { data: headerData },
        },
    } = state;

    let returnValue = {
        userId,
        isDataLoaded,
        isLoading,
        data,
        headerData,
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
    const { userId, data, fetchList, listShowLoading, reportDetail, headerData } = props;
    const [, setReport] = useState();
    const [sampleReportConfig, setReportConfig] = useState({
        type: 'report',
        embedUrl: undefined,
        tokenType: models.TokenType.Embed,
        accessToken: undefined,
        settings: undefined,
    });

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
        if (data && headerData) {
            let embedUrl = data?.embedReports?.[0]?.embedUrl;

            // if (reportDetail?.type === REPORT_TYPE) {
            //     let locationCode = headerData?.dealerLocations?.find((e) => e?.isDefault)?.locationCode;
            //     let param = `&filter=Query1/parent_group_code eq '${headerData?.parentGroupCode}' and Query1/location_code eq '${locationCode}'`;
            //     embedUrl += param;
            // } 

            if (reportDetail?.type === REPORT_TYPE) {
                let param = `&filter=Query1/user_login_id eq '${userId}'`;
                embedUrl += param;
            }

            setReportConfig({
                type: 'report',
                id: data?.embedReports?.[0]?.reportId.substr(46, 92),
                embedUrl: embedUrl,
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
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, headerData, reportDetail]);

    // Map of event handlers to be applied to the embedding report
    const eventHandlersMap = new Map([
        ['loaded', function () {}],
        ['rendered', function () {}],
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
