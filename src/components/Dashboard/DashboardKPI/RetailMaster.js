/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card } from 'antd';
import { StatusBar } from './StatusBar';

import { showGlobalNotification } from 'store/actions/notification';
import { retailDataActions } from 'store/actions/data/dashboard/retail';

import { translateContent } from 'utils/translateContent';
import { withSpinner } from 'components/withSpinner';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        common: {
            Header: { dealerLocationId },
            LeftSideBar: { collapsed = false },
        },
        data: {
            Dashboard: {
                Retail: { data, isLoaded, isLoading, dealerLocationId: dataDealerLoactionId },
            },
        },
    } = state;

    return {
        userId,
        dealerLocationId,
        collapsed,

        isLoaded: isLoaded && dealerLocationId === dataDealerLoactionId,
        isLoading,
        retailData: data?.records || [],
    };
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchRetailList: retailDataActions.fetchList,
            retailListShowLoading: retailDataActions.listShowLoading,

            showGlobalNotification,
        },
        dispatch
    ),
});

const RetailMasterBase = (props) => {
    const { dealerLocationId, userId, fetchRetailList, retailListShowLoading, isLoaded, retailData } = props;

    const onErrorAction = (message) => {
        showGlobalNotification(message);
    };

    useEffect(() => {
        if (userId && !isLoaded) {
            fetchRetailList({ setIsLoading: retailListShowLoading, userId, onErrorAction,dealerLocationId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isLoaded, dealerLocationId]);

    return (
        <Card title={translateContent('dashboard.heading.retail')}>
            <StatusBar data={retailData} />
        </Card>
    );
};

export const RetailMaster = connect(mapStateToProps, mapDispatchToProps)(withSpinner(RetailMasterBase));
