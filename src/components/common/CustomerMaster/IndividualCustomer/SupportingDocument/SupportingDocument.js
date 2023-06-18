import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card } from 'antd';

import { configParamEditActions } from 'store/actions/data/configurableParamterEditing';
import { supportingDocumentDataActions } from 'store/actions/data/supportingDocument';
import { showGlobalNotification } from 'store/actions/notification';
import { PARAM_MASTER } from 'constants/paramMaster';

import AddEditForm from './AddEditForm';

const mapStateToProps = (state) => {
    const {
        auth: { userId, accessToken, token },
        data: {
            ConfigurableParameterEditing: { isLoaded: isDocumentDataLoaded = false, data: configData = [], paramdata: typeData = [] },
            SupportingDocument: { isLoaded: isDataLoaded = false, isLoading },
        },
    } = state;

    let returnValue = {
        userId,
        accessToken,
        token,
        configData,
        typeData: typeData && typeData[PARAM_MASTER.CUST_FILES.id],
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
            uploadFile: supportingDocumentDataActions.uploadFile,
            listShowLoading: supportingDocumentDataActions.listShowLoading,

            showGlobalNotification,
        },
        dispatch
    ),
});

const SupportingDocumentBase = (props) => {
    const { listShowLoading, saveData, uploadFile, userId, accessToken, token, typeData, configFetchList, configListShowLoading } = props;

    const [uploadedFile, setUploadedFile] = useState();

    useEffect(() => {
        if (userId) {
            configFetchList({ setIsLoading: configListShowLoading, userId, parameterType: PARAM_MASTER?.CUST_FILES.id });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    const onFinish = (values) => {
        const data = { ...values, customerId: 'CUS001', status: true, docId: uploadedFile?.docId, id: '' };
        const onSuccess = (res) => {
            showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
        };

        const onError = (message) => {
            showGlobalNotification({ message, placement: 'bottomRight' });
        };

        const requestData = {
            data: data,
            method: 'post',
            setIsLoading: listShowLoading,
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
        setUploadedFile,
        uploadFile,
        listShowLoading,
        showGlobalNotification,
    };

    return (
        <Card style={{ backgroundColor: '#f2f2f2' }}>
            <AddEditForm {...formProps} />
        </Card>
    );
};

export const SupportingDocument = connect(mapStateToProps, mapDispatchToProps)(SupportingDocumentBase);
