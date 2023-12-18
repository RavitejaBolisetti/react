/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Card } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { PieChart } from './PieChart';
import { showGlobalNotification } from 'store/actions/notification';
import { stockDataActions } from 'store/actions/data/dashboard/stocks';

import { translateContent } from 'utils/translateContent';
import { withSpinner } from 'components/withSpinner';

import styles from './DashboardKPI.module.scss';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        common: {
            Header: { dealerLocationId },
            LeftSideBar: { collapsed = false },
        },
        data: {
            Dashboard: {
                Stock: { data, isLoaded, isLoading, dealerLocationId: dataDealerLoactionId },
            },
        },
    } = state;

    return {
        userId,
        dealerLocationId,
        collapsed,

        isLoaded: isLoaded && dealerLocationId === dataDealerLoactionId,
        isLoading,
        stockData: data?.records || [],
    };
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchStockList: stockDataActions.fetchList,
            stockListShowLoading: stockDataActions.listShowLoading,

            showGlobalNotification,
        },
        dispatch
    ),
});

const StockMasterBase = (props) => {
    const { dealerLocationId, userId, fetchStockList, stockListShowLoading, isLoaded, stockData } = props;

    const onErrorAction = (message) => {
        showGlobalNotification(message);
    };

    useEffect(() => {
        if (userId && !isLoaded) {
            fetchStockList({ setIsLoading: stockListShowLoading, userId, onErrorAction, dealerLocationId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isLoaded, dealerLocationId]);

    // const stockData = [
    //     {
    //         type: '0-30',
    //         value: 27,
    //     },
    //     {
    //         type: '30-60',
    //         value: 25,
    //     },
    //     {
    //         type: '60-90',
    //         value: 18,
    //     },
    //     {
    //         type: '>90',
    //         value: 27,
    //     },
    // ];

    return <Card title={translateContent('dashboard.heading.stockInDays')}>{isLoaded && (stockData?.length > 0 ? <PieChart data={stockData} /> : <div className={styles.cardAlignCenter}>{translateContent('dashboard.label.noDataFound')}</div>)}</Card>;
};

export const StockMaster = connect(mapStateToProps, mapDispatchToProps)(withSpinner(StockMasterBase));
