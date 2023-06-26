/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Row, Col } from 'antd';

import { showGlobalNotification } from 'store/actions/notification';
import { AddEditForm } from './AddEditForm';
import { ViewDetail } from './ViewDetail';

import { OTFStatusBar } from '../utils/OTFStatusBar';
import { OTFFormButton } from '../OTFFormButton';

import styles from 'components/common/Common.module.css';

import { otfSchemeDetailDataActions } from 'store/actions/data/otf/schemeDetail';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            OTF: {
                SchemeDetail: { isLoaded: isDataLoaded = false, isLoading, data: schemeData = [] },
            },
        },
    } = state;

    let returnValue = {
        userId,
        isDataLoaded,
        schemeData,
        isLoading,
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
    const { schemeData, onCloseAction, fetchList, formActionType, userId, listShowLoading, showGlobalNotification } = props;
    const { form, selectedOrderId, section, isLoading, NEXT_ACTION, handleButtonClick } = props;

    const onErrorAction = (message) => {
        showGlobalNotification(message);
    };

    const onSuccessAction = (res) => {
        showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
    };

    useEffect(() => {
        if (userId && selectedOrderId) {
            const extraParams = [
                {
                    key: 'otfNumber',
                    title: 'otfNumber',
                    value: selectedOrderId,
                    name: 'OTF Number',
                },
            ];
            fetchList({ setIsLoading: listShowLoading, userId, extraParams, onErrorAction, onSuccessAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedOrderId]);

    const viewProps = {
        styles,
        onCloseAction,
        schemeData,
        isLoading,
        ...props,
    };
    const myProps = {
        ...props,
        buttonData: { ...props.buttonData, nextBtn: true, saveBtn: false },
    };

    const onFinish = (values) => {
        handleButtonClick({ buttonAction: NEXT_ACTION });
    };

    return (
        <Form layout="vertical" autoComplete="off" onFinish={onFinish} form={form}>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Row>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <h2>{section?.title}</h2>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <OTFStatusBar status={props?.selectedOrder?.orderStatus} />
                        </Col>
                    </Row>
                    {formActionType?.viewMode ? <ViewDetail {...viewProps} /> : <AddEditForm {...props} />}
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <OTFFormButton {...myProps} />
                </Col>
            </Row>
        </Form>
    );
};

export const SchemeDetailsMaster = connect(mapStateToProps, mapDispatchToProps)(SchemeDetailsMasterBase);
