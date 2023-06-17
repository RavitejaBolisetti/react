import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import { Card } from 'antd';

import { showGlobalNotification } from 'store/actions/notification';

import { configParamEditActions } from 'store/actions/data/configurableParamterEditing';

import { supportingDocumentDataActions } from 'store/actions/data/supportingDocument';

import AddEditForm from './AddEditForm';

const mapStateToProps = (state) => {
    const {
        auth: { userId, accessToken, token },
        data: {
            ConfigurableParameterEditing: { isLoaded: isDocumentDataLoaded = false, isDocumentDataLoading, data: configData = [], paramdata: typeData = [] },
            SupportingDocument: { isLoaded: isDataLoaded = false, isLoading, data, isLoadingOnSave },
        },
    } = state;

    console.log('state', state);

    let returnValue = {
        userId,
        accessToken,
        token,
        configData,
        typeData,
        isDataLoaded,
        isLoading,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            configFetchList: configParamEditActions.fetchList,
            configListShowLoading: configParamEditActions.listShowLoading,

            saveData: supportingDocumentDataActions.saveData,
            supportingDocumentListShowLoading: supportingDocumentDataActions.listShowLoading,

            showGlobalNotification,
        },
        dispatch
    ),
});

const SupportingDocumentBase = (props) => {
    const { supportingDocumentListShowLoading,saveData, isDataLoaded, isLoading, userId, accessToken, token, configData, typeData, configFetchList, configListShowLoading } = props;

    const [docId, setDocId] = useState('');

    useEffect(() => {
        if (userId) {
            configFetchList({ setIsLoading: configListShowLoading, userId, parameterType: 'CUST_FILES' });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    const onFinish = (values) => {
        const data = { ...values, customerId: 'CUS001', status: true, docId: docId, id: '' };
        const onSuccess = (res) => {
            showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
        };

        const onError = (message) => {
            showGlobalNotification({ message, placement: 'bottomRight' });
        };

        const requestData = {
            data: data,
            method: 'post',
            setIsLoading: supportingDocumentListShowLoading,
            userId,
            onError,
            onSuccess,
        };

        saveData(requestData);
    };

    const onFinishFailed = () => {
        console.log('failed');
    };
    const formProps = {
        typeData,
        userId,
        accessToken,
        token,
        saveData,
        onFinish,
        onFinishFailed,
        setDocId,
    };

    return (
        <Card style={{ backgroundColor: '#f2f2f2' }}>
            <AddEditForm {...formProps} />
        </Card>
    );
};

export const SupportingDocument = connect(mapStateToProps, mapDispatchToProps)(SupportingDocumentBase);
