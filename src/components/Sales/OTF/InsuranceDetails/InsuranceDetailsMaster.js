/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import styles from 'components/common/Common.module.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showGlobalNotification } from 'store/actions/notification';
import { ViewDetail } from './ViewDetail';
import { InputSkeleton } from 'components/common/Skeleton';
import { Form, Row, Col } from 'antd';
import { insuranceDetailDataActions } from 'store/actions/data/otf/insuranceDetail';
import { OTFStatusBar } from '../utils/OTFStatusBar';
import { OTFFormButton } from '../OTFFormButton';
import { AddEditForm } from './AddEditForm';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            OTF: {
                InsuranceDetail: { isLoaded: isDataLoaded = false, isLoading, data: insuranceData = [] },
            },
        },
    } = state;

    const moduleTitle = 'Insurance Details';

    let returnValue = {
        userId,
        isDataLoaded,
        insuranceData,
        isLoading,
        moduleTitle,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: insuranceDetailDataActions.fetchList,
            listShowLoading: insuranceDetailDataActions.listShowLoading,
            resetData: insuranceDetailDataActions.reset,
            showGlobalNotification,
        },
        dispatch
    ),
});

const InsuranceDetailsMasterBase = (props) => {
    const { insuranceData, onCloseAction, fetchList, formActionType, userId, isDataLoaded, listShowLoading, showGlobalNotification } = props;
    const { form, selectedOrderId, handleFormValueChange, section, isLoading } = props;

    const [formData, setFormData] = useState();

    useEffect(() => {
        setFormData(insuranceData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [insuranceData]);

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

    const onErrorAction = (message) => {
        showGlobalNotification(message);
    };

    const onSuccessAction = (res) => {
        showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
    };

    const viewProps = {
        styles,
        onCloseAction,
        insuranceData,
    };

    const formProps = {
        ...props,
        form,
        fetchList,
        userId,
        isDataLoaded,
        formData,
        isLoading,
        insuranceData,
    };

    const formContainer = formActionType?.viewMode ? <ViewDetail {...viewProps} /> : <AddEditForm {...formProps} />;
    const formSkeleton = (
        <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <InputSkeleton height={'100vh'} />
            </Col>
        </Row>
    );

    return (
        <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormValueChange}>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Row>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <h2>{section?.title}</h2>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <OTFStatusBar status={1} />
                        </Col>
                    </Row>

                    {isLoading ? formSkeleton : formContainer}
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <OTFFormButton {...props} />
                </Col>
            </Row>
        </Form>
    );
};

export const InsuranceDetailsMaster = connect(mapStateToProps, mapDispatchToProps)(InsuranceDetailsMasterBase);
