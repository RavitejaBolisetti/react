import React, { useState, useEffect } from 'react';
import AddEditForm from './AddEditForm';
import { Form } from 'antd';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { showGlobalNotification } from 'store/actions/notification';
import { indiviualProfileDataActions } from 'store/actions/data/customerMaster/individual/individualProfile/indiviualProfile';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            CustomerMaster: {
                IndiviualProfile: { isLoaded: isIndiviualProfileLoaded = false, isLoading: isIndiviualLoading, data: indiviualData = [] },
            },
        },
    } = state;

    let returnValue = {
        userId,
        isIndiviualProfileLoaded,
        isIndiviualLoading,

        indiviualData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchIndiviualList: indiviualProfileDataActions.fetchList,
            listIndiviualShowLoading: indiviualProfileDataActions.listShowLoading,
            saveData: indiviualProfileDataActions.saveData,

            showGlobalNotification,
        },
        dispatch
    ),
});
const IndividualProfileBase = (props) => {
    const { userId, fetchIndiviualList, onFieldsChange, listIndiviualShowLoading, isIndiviualProfileLoaded, formActionType, indiviualData, saveData, showGlobalNotification } = props;
    const [indiviualForm] = Form.useForm();

    useEffect(() => {
        if (userId && !isIndiviualProfileLoaded) {
            fetchIndiviualList({ setIsLoading: listIndiviualShowLoading, userId, extraParams });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isIndiviualProfileLoaded]);

    const extraParams = [
        {
            key: 'customerId',
            title: 'Customer',
            value: 'CUS1686811036620',
            name: 'customerId',
        },
    ];
    const onIndiviualFinish = (values) => {
        console.log(values, 'ssss');
        let data = { ...values };

        const onSuccess = (res) => {
            indiviualForm.resetFields();
            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            fetchIndiviualList({ setIsLoading: listIndiviualShowLoading, userId });
        };

        const onError = (message) => {
            showGlobalNotification({ message });
        };
        const requestData = {
            data: data,
            method: 'post',
            setIsLoading: listIndiviualShowLoading,
            userId,
            onError,
            onSuccess,
        };

        saveData(requestData);
    };

    const onFinishFailed = (errorInfo) => {
        indiviualForm.validateFields().then((values) => {});
    };
    const formProps = {
        indiviualForm,
        onIndiviualFinish,
        indiviualData,
        onFieldsChange,
        onFinishFailed,
        props,
        formActionType,
    };
    return (
        <>
            <AddEditForm {...formProps} />
        </>
    );
};

export const IndividualProfileMaster = connect(mapStateToProps, mapDispatchToProps)(IndividualProfileBase);
