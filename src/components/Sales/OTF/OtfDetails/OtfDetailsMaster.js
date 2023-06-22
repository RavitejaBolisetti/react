import React, { useEffect, useState, useReducer } from 'react';
import { Form } from 'antd';

import AddEditForm from './AddEditForm';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { configParamEditActions } from 'store/actions/data/configurableParamterEditing';
import { otfDetailsDataActions } from 'store/actions/data/otf/otfDetails';
import { showGlobalNotification } from 'store/actions/notification';

import { PARAM_MASTER } from 'constants/paramMaster';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { isLoaded: isConfigDataLoaded = false, isLoading: isConfigLoading, paramdata: typeData = [] },

            OTF: {
                OtfDetails: { isLoaded: isDataLoaded = false, isLoading, data: otfData = [] },
            },
        },
    } = state;
    const moduleTitle = 'OTF Details';

    let returnValue = {
        userId,
        isConfigDataLoaded,
        isConfigLoading,
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
    const { fetchList, saveData, listShowLoading, userId, fetchConfigList, listConfigShowLoading, isConfigDataLoaded, isConfigLoading, typeData, isDataLoaded, otfData, isLoading, formData, setFormData, isNewDataLoading } = props;

    const [form] = Form.useForm();
    const [, forceUpdate] = useReducer((x) => x + 1, 0);

    useEffect(() => {
        setFormData(otfData);
    }, [otfData]);

   
    const errorAction = (message) => {
        showGlobalNotification(message);
    };

    const onSuccessAction = (res) => {
        showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
    };
    useEffect(() => {
        if (!isConfigDataLoaded && userId) {
            fetchConfigList({ setIsLoading: listConfigShowLoading, parameterType: PARAM_MASTER?.PRC_TYP?.id, userId });
            fetchConfigList({ setIsLoading: listConfigShowLoading, parameterType: PARAM_MASTER?.SALE_TYP?.id, userId });
            fetchConfigList({ setIsLoading: listConfigShowLoading, parameterType: PARAM_MASTER?.FNC_ARNGD?.id, userId });
            fetchConfigList({ setIsLoading: listConfigShowLoading, parameterType: PARAM_MASTER?.DLVR_AT?.id, userId });
            fetchConfigList({ setIsLoading: listConfigShowLoading, parameterType: PARAM_MASTER?.REF?.id, userId });
            fetchConfigList({ setIsLoading: listConfigShowLoading, parameterType: PARAM_MASTER?.PRC_TYP?.id, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isConfigDataLoaded, userId]);

    

    const onFinish = (values) => {
        const recordId = formData?.id || '';
        const otfNum = formData?.otfNumber || '';
        const exchange = values?.exchange == true ? 1 : 0;
        const loyalityScheme = values?.loyaltyScheme == true ? 1 : 0;
        const data = { ...values, id: recordId, otfNumber: otfNum, loyaltyScheme: loyalityScheme, exchange: exchange, initialPromiseDeliveryDate: values?.initialPromiseDeliveryDate?.format('YYYY-MM-DD'), custExpectedDeliveryDate: values?.custExpectedDeliveryDate?.format('YYYY-MM-DD') };
        delete data?.mitraName;
        delete data?.mitraType;
        delete data?.modeOfPAyment;

        const onSuccess = (res) => {
            showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage, placement: 'bottomRight' });
        };

        fetchList({ setIsLoading: listShowLoading, userId });

        const onError = (message) => {
            showGlobalNotification({ notificationType: 'error', title: 'Error', message, placement: 'bottomRight' });
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
        formData,
        onFinish,
        onFinishFailed,
        fetchList,
        typeData,

        userId,
        isDataLoaded,
        otfData,
        isLoading,
    };

    return <AddEditForm {...formProps} />;
};

export const OtfDetailsMaster = connect(mapStateToProps, mapDispatchToProps)(OtfDetailsMasterBase);
