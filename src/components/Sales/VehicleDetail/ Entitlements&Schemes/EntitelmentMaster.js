/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React, { useEffect } from 'react';
import { Row, Col, Space, Form, Card } from 'antd';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { entitelmentDetailDataActions } from 'store/actions/data/vehicle/entitelmentDetail';
import { showGlobalNotification } from 'store/actions/notification';
import { DataTable } from 'utils/dataTable';

import { VehicleDetailFormButton } from '../VehicleDetailFormButton';

import { tableColumn } from './tableColumn';

import styles from 'components/common/Common.module.css';

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

export const EntitelmentMasterBase = (props) => {
    const { form, fetchList, userId, isDataLoaded, entitelmentData, listShowLoading, showGlobalNotification, handleButtonClick, NEXT_ACTION } = props;
    const { section, selectedOrderId, selectedOrder: { orderStatus = false } = {} } = props;
    const selectedVinOrder = 'MAKGF1F57A7192174';

    const extraParams = [
        {
            key: 'vin',
            title: 'vin',
            value: selectedVinOrder,
            name: 'VIN ',
        },
    ];
    const errorAction = (message) => {
        // showGlobalNotification(message);
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

    const myProps = {
        ...props,
        buttonData: { ...props.buttonData, nextBtn: true, saveBtn: false },
    };

    const onFinish = (values) => {
        handleButtonClick({ record: undefined, buttonAction: NEXT_ACTION });
    };
    const onFinishFailed = () => {};

    return (
        <Form layout="vertical" autoComplete="off" form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Row>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <h2>{section?.title}</h2>
                        </Col>
                    </Row>
                    <Space size="middle" direction="vertical" className={styles.accordianContainer}>
                        <Card>
                            <DataTable srlTitle={'#'} removePagination={true} tableColumn={tableColumn()} tableData={entitelmentData?.entitlementsAndSchemeResponses} />
                        </Card>
                    </Space>
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <VehicleDetailFormButton {...myProps} />
                </Col>
            </Row>
        </Form>
    );
};

export const EntitelmentMaster = connect(mapStateToProps, mapDispatchToProps)(EntitelmentMasterBase);
