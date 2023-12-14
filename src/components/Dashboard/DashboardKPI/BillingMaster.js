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

import { billingDataActions } from 'store/actions/data/dashboard/billing';
import { showGlobalNotification } from 'store/actions/notification';

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
                Billing: { data, isLoaded, isLoading, dealerLocationId: dataDealerLoactionId },
            },
        },
    } = state;

    return {
        userId,
        dealerLocationId,
        dataDealerLoactionId,
        collapsed,
        isLoaded: isLoaded && dealerLocationId === dataDealerLoactionId,
        isLoading: isLoading,
        billingData: data?.records || [],
    };
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchBillingList: billingDataActions.fetchList,
            billingListShowLoading: billingDataActions.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

const BillingMasterBase = (props) => {
    // const { dealerLocationId, userId, isLoaded, billingData, fetchBillingList, billingListShowLoading, showGlobalNotification } = props;

    // const onErrorAction = (message) => {
    //     showGlobalNotification(message);
    // };

    // useEffect(() => {
    //     if (userId && !isLoaded) {
    //         fetchBillingList({ setIsLoading: billingListShowLoading, userId, onErrorAction, dealerLocationId });
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [userId, isLoaded, dealerLocationId]);

    const billingData = [
        { type: 'Scorpio', sales: 60 },
        { type: 'XUV700', sales: 120 },
        { type: 'Thar', sales: 80 },
        { type: 'XUV300', sales: 50 },
        { type: 'Marazzo', sales: 10 },
        { type: 'Bolero Neo', sales: 75 },
        { type: 'Bolero', sales: 120 },
        { type: 'Scarpio Classic', sales: 50 },
    ];

    return (
        <Card title={translateContent('dashboard.heading.billing')}>
            <StatusBar data={billingData} />
        </Card>
    );
};

export const BillingMaster = connect(mapStateToProps, mapDispatchToProps)(withSpinner(BillingMasterBase));
