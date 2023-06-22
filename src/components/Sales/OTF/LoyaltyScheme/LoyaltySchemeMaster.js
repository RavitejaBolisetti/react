/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import styles from 'components/common/Common.module.css';
import { AddEditForm } from './AddEditForm';
import { Form, Row, Col } from 'antd';
import { showGlobalNotification } from 'store/actions/notification';
import { otfLoyaltySchemeDataActions } from 'store/actions/data/otf/loyaltyAndScheme';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { InputSkeleton } from 'components/common/Skeleton';
import { OTFStatusBar } from '../utils/OTFStatusBar';
import { OTFFormButton } from '../OTFFormButton';
import { ViewDetail } from './ViewDetail';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            OTF: {
                LoyaltyScheme: { isLoaded: isLoyaltySchemeDataLoaded = false, isLoading, data: LoyaltySchemeData = [] },
            },
        },
    } = state;

    const moduleTitle = 'Loyalty And Scheme';

    let returnValue = {
        userId,
        isLoyaltySchemeDataLoaded,
        moduleTitle,
        isLoading,
        LoyaltySchemeData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: otfLoyaltySchemeDataActions.fetchList,
            resetData: otfLoyaltySchemeDataActions.reset,
            listShowLoading: otfLoyaltySchemeDataActions.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

const LoyaltySchemeMasterMain = (props) => {
    const { isLoyaltySchemeDataLoaded, isLoading, resetData, section, listShowLoading, fetchList, LoyaltySchemeData, userId, showGlobalNotification } = props;
    const { form, selectedOrderId, formActionType, handleFormValueChange } = props;

    const [formdata, setformdata] = useState();

    const onSuccessAction = (res) => {};

    const onErrorAction = (message) => {
        resetData();
        showGlobalNotification({ message });
    };
    const extraParams = [
        {
            key: 'otfNumber',
            title: 'otfNumber',
            value: selectedOrderId,
            name: 'otfNumber',
        },
    ];
    const onFinish = (values) => {};
    const onFinishFailed = (values) => {
        form.validateFields()
            .then(() => {})
            .catch((err) => {
                console.log('err');
            });
    };
    useEffect(() => {
        if (!isLoyaltySchemeDataLoaded && userId) {
            fetchList({ setIsLoading: listShowLoading, userId, onErrorAction, onSuccessAction, extraParams });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoyaltySchemeDataLoaded, userId]);
    useEffect(() => {
        if (LoyaltySchemeData) {
            setformdata(LoyaltySchemeData);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [LoyaltySchemeData]);
    const formProps = {
        ...props,
        form,
        onFinishFailed,
        onFinish,
        LoyaltySchemeData,
        formdata,
        setformdata,
        isLoyaltySchemeDataLoaded,
    };
    const viewProps = {
        styles,
        customerForm: formdata,
        isLoyaltySchemeDataLoaded,
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
        <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormValueChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
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
export const LoyaltySchemeMaster = connect(mapStateToProps, mapDispatchToProps)(LoyaltySchemeMasterMain);
