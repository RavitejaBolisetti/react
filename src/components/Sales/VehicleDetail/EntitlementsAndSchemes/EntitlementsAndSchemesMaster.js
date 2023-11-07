/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React, { useEffect } from 'react';
import { Row, Col } from 'antd';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { entitelmentDetailDataActions } from 'store/actions/data/vehicle/entitelmentDetail';
import { showGlobalNotification } from 'store/actions/notification';
import { DataTable } from 'utils/dataTable';

import { VehicleDetailFormButton } from '../VehicleDetailFormButton';

import { tableColumn } from './tableColumn';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            Vehicle: {
                EntitelmentDetail: { isLoaded: isDataLoaded = false, isLoading, data: entitelmentData = [] },
            },
        },
    } = state;
    const moduleTitle = 'Entitelment & Scheme Information';

    let returnValue = {
        userId,
        isDataLoaded,
        entitelmentData,
        isLoading,
        moduleTitle,
    };

    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: entitelmentDetailDataActions.fetchList,
            listShowLoading: entitelmentDetailDataActions.listShowLoading,
            resetData: entitelmentDetailDataActions.reset,
            showGlobalNotification,
        },
        dispatch
    ),
});

export const EntitlementsAndSchemesMasterBase = (props) => {
    const { fetchList, userId, entitelmentData, listShowLoading, showGlobalNotification } = props;
    const { section, selectedRecordId } = props;

    const extraParams = [
        {
            key: 'vin',
            title: 'vin',
            value: selectedRecordId,
            name: 'VIN ',
        },
    ];
    const errorAction = (message) => {
        showGlobalNotification(message);
    };

    const onSuccessAction = (res) => {
        showGlobalNotification({ notificationType: 'success', title:  translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
    };

    useEffect(() => {
        if (userId && selectedRecordId) {
            fetchList({ setIsLoading: listShowLoading, extraParams, onSuccessAction, errorAction, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedRecordId]);

    const myProps = {
        ...props,
        buttonData: { ...props.buttonData, editBtn: false, nextBtn: true, saveBtn: false },
    };

    return (
        <>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Row>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <h2>{section?.title}</h2>
                        </Col>
                    </Row>
                    <DataTable scroll={{ x: 1800 }} srlTitle={'#'} pagination={false} tableColumn={tableColumn()} tableData={entitelmentData?.entitlementsAndSchemeResponses} />
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <VehicleDetailFormButton {...myProps} />
                </Col>
            </Row>
        </>
    );
};

export const EntitlementsAndSchemesMaster = connect(mapStateToProps, mapDispatchToProps)(EntitlementsAndSchemesMasterBase);
