/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Form, Row, Col } from 'antd';

import { ViewDetail } from './ViewDetail';
import { AddEditForm } from './AddEditForm';
import { OTFFormButton } from '../OTFFormButton';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { configParamEditActions } from 'store/actions/data/configurableParamterEditing';
import { otfDetailsDataActions } from 'store/actions/data/otf/otfDetails';
import { showGlobalNotification } from 'store/actions/notification';

import { PARAM_MASTER } from 'constants/paramMaster';
import { InputSkeleton } from 'components/common/Skeleton';
import { OTFStatusBar } from '../utils/OTFStatusBar';

import styles from 'components/common/Common.module.css';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { isLoaded: isTypeDataLoaded = false, isLoading: isTypeDataLoading, paramdata: typeData = [] },
            OTF: {
                OtfDetails: { isLoaded: isDataLoaded = false, isLoading, data: otfData = [] },
            },
        },
    } = state;
    const moduleTitle = 'OTF Details';

    let returnValue = {
        userId,
        isTypeDataLoaded,
        isTypeDataLoading,
        typeData,
        isDataLoaded,

        otfData,
        isLoading,
        moduleTitle,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchConfigList: configParamEditActions.fetchList,
            listConfigShowLoading: configParamEditActions.listShowLoading,

            fetchList: otfDetailsDataActions.fetchList,
            saveData: otfDetailsDataActions.saveData,
            resetData: otfDetailsDataActions.reset,
            listShowLoading: otfDetailsDataActions.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

const OtfDetailsMasterBase = (props) => {
    const { isTypeDataLoaded, typeData, fetchConfigList, listConfigShowLoading } = props;
    const { userId, showGlobalNotification, section, fetchList, listShowLoading, isDataLoaded, otfData, saveData, isLoading } = props;
    const { form, selectedOrderId, formActionType, handleFormValueChange } = props;

    const [formData, setFormData] = useState();

    useEffect(() => {
        setFormData(otfData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [otfData]);

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
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
            fetchList({ setIsLoading: listShowLoading, userId, extraParams, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedOrderId]);

    useEffect(() => {
        if (!isTypeDataLoaded && userId) {
            fetchConfigList({ setIsLoading: listConfigShowLoading, parameterType: PARAM_MASTER?.PRC_TYP?.id, userId });
            fetchConfigList({ setIsLoading: listConfigShowLoading, parameterType: PARAM_MASTER?.SALE_TYP?.id, userId });
            fetchConfigList({ setIsLoading: listConfigShowLoading, parameterType: PARAM_MASTER?.FNC_ARNGD?.id, userId });
            fetchConfigList({ setIsLoading: listConfigShowLoading, parameterType: PARAM_MASTER?.DLVR_AT?.id, userId });
            fetchConfigList({ setIsLoading: listConfigShowLoading, parameterType: PARAM_MASTER?.REF?.id, userId });
            fetchConfigList({ setIsLoading: listConfigShowLoading, parameterType: PARAM_MASTER?.PRC_TYP?.id, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isTypeDataLoaded, userId]);

    const onFinish = (values) => {
        const recordId = otfData?.id || '';
        const otfNum = otfData?.otfNumber || '';
        const exchange = values?.exchange === true ? 1 : 0;
        const loyalityScheme = values?.loyaltyScheme === true ? 1 : 0;
        const data = { ...values, id: recordId, otfNumber: otfNum, loyaltyScheme: loyalityScheme, exchange: exchange, initialPromiseDeliveryDate: values?.initialPromiseDeliveryDate?.format('YYYY-MM-DD'), custExpectedDeliveryDate: values?.custExpectedDeliveryDate?.format('YYYY-MM-DD') };
        delete data?.mitraName;
        delete data?.mitraType;
        delete data?.modeOfPAyment;

        const onSuccess = (res) => {
            showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, userId });
        };

        const onError = (message) => {
            showGlobalNotification({ message });
        };

        const requestData = {
            data: data,
            method: 'put',
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
        };

        saveData(requestData);
    };

    const onFinishFailed = () => {};

    const formProps = {
        ...props,
        form,
        otfData,
        onFinish,
        onFinishFailed,
        fetchList,
        typeData,

        userId,
        isDataLoaded,
        formData,
        isLoading,
    };

    const viewProps = {
        formData,
        styles,
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

export const OtfDetailsMaster = connect(mapStateToProps, mapDispatchToProps)(OtfDetailsMasterBase);
