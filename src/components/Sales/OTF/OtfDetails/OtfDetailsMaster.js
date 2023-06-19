import React, { useEffect, useState } from 'react';
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
    console.log('state', state);
    const moduleTitle = 'OTF Details';

    let returnValue = {
        userId,
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
    const { fetchList, saveData, listShowLoading, userId, isDataLoaded, otfData, isLoading } = props;

    const [form] = Form.useForm();

    const [formData, setFormData] = useState(otfData);

    const extraParams = [
        {
            key: 'otfNumber',
            title: 'otfNumber',
            value: 'OTF001',
            name: 'OTF Number',
        },
    ];

    const errorAction = (message) => {
        showGlobalNotification(message);
    };

    const onSuccessAction = (res) => {
        showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
    };

    useEffect(() => {
        if (!isDataLoaded && userId) {
            fetchList({ setIsLoading: listShowLoading, extraParams, onSuccessAction, errorAction, userId });
        }
        setFormData(otfData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded, userId]);

    const onFinish = (values) => {
        const recordId = formData?.id || '';
        const data = { ...values, id: recordId };

        const onSuccess = (res) => {
            form.resetFields();

            showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage, placement: 'bottomRight' });
        };

        fetchList({ setIsLoading: listShowLoading, userId });

        const onError = (message) => {
            showGlobalNotification({ notificationType: 'error', title: 'Error', message, placement: 'bottomRight' });
        };

        const requestData = {
            data: [data],
            method: 'post',
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

        userId,
        isDataLoaded,
        otfData,
        isLoading,
    };

    return <AddEditForm {...formProps} />;
};

export const OtfDetailsMaster = connect(mapStateToProps, mapDispatchToProps)(OtfDetailsMasterBase);
