/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import { Row, Col, Form } from 'antd';
import { LANGUAGE_EN } from 'language/en';

import { supportingDocumentDataActions } from 'store/actions/data/supportingDocument';
import { documentViewDataActions } from 'store/actions/data/customerMaster/documentView';
import { showGlobalNotification } from 'store/actions/notification';
import { PARAM_MASTER } from 'constants/paramMaster';
import { FROM_ACTION_TYPE } from 'constants/formActionType';

import { CustomerFormButton } from '../../CustomerFormButton';
import AddEditForm from './AddEditForm';
import { ViewDetail } from './ViewDetail';

import styles from 'components/common/Common.module.css';

const mapStateToProps = (state) => {
    const {
        auth: { userId, accessToken, token },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            SupportingDocument: { isLoaded: isDataLoaded = false, isLoading, data: supportingData },
            CustomerMaster: {
                ViewDocument: { isLoaded: isViewDataLoaded = false, data: viewDocument },
            },
        },
    } = state;

    let returnValue = {
        userId,
        accessToken,
        token,
        typeData: typeData && typeData[PARAM_MASTER.CUST_FILES.id],
        isDataLoaded,
        isLoading,
        supportingData,
        isViewDataLoaded,
        viewDocument,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchViewDocument: documentViewDataActions.fetchList,
            resetViewData: documentViewDataActions.reset,
            viewListShowLoading: documentViewDataActions.listShowLoading,
            fetchList: supportingDocumentDataActions.fetchList,
            resetData: supportingDocumentDataActions.reset,
            saveData: supportingDocumentDataActions.saveData,
            uploadDocumentFile: supportingDocumentDataActions.uploadFile,
            downloadFile: supportingDocumentDataActions.downloadFile,
            listShowLoading: supportingDocumentDataActions.listShowLoading,

            showGlobalNotification,
        },
        dispatch
    ),
});

const SupportingDocumentBase = (props) => {
    const { isViewDataLoaded, resetData, resetViewData, isDataLoaded, uploadDocumentFile, accessToken, token, onFinishFailed, form } = props;

    const { userId, showGlobalNotification, section, listShowLoading, typeData, saveData, fetchList, supportingData, fetchViewDocument } = props;
    const { buttonData, setButtonData, formActionType, handleFormValueChange } = props;
    const { selectedCustomerId, viewDocument, viewListShowLoading, downloadFile, setIsFormVisible } = props;

    const [uploadedFile, setUploadedFile] = useState();
    const [emptyList, setEmptyList] = useState(true);

    const [supportingDataView, setSupportingDataView] = useState();
    const [fileList, setFileList] = useState([]);
    const [uploadedFileName, setUploadedFileName] = useState('');

    const ADD_ACTION = FROM_ACTION_TYPE?.ADD;
    const EDIT_ACTION = FROM_ACTION_TYPE?.EDIT;
    const VIEW_ACTION = FROM_ACTION_TYPE?.VIEW;

    const extraParams = [
        {
            key: 'customerId',
            value: selectedCustomerId,
        },
    ];

    useEffect(() => {
        if (!formActionType?.addMode && selectedCustomerId && !isDataLoaded) {
            resetData();
            resetViewData();
            fetchList({ setIsLoading: listShowLoading, userId, extraParams });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedCustomerId, isDataLoaded]);

    useEffect(() => {
        return () => {
            resetData();
            resetViewData();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (viewDocument && isViewDataLoaded && isDataLoaded) {
            let a = document.createElement('a');
            a.href = `data:image/png;base64,${viewDocument?.base64}`;
            a.download = viewDocument?.fileName;
            a.click();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isViewDataLoaded, viewDocument]);

    const downloadFileFromButton = (uploadData) => {
        showGlobalNotification({ notificationType: 'success', title: 'Success', message: 'Your download will start soon' });
        const extraParams = [
            {
                key: 'docId',
                title: 'docId',
                value: uploadData?.docId,
                name: 'docId',
            },
        ];
        const supportingDocument = uploadData?.documentName;
        fetchViewDocument({ setIsLoading: viewListShowLoading, userId, extraParams, supportingDocument });
    };

    const deleteFile = (uploadData) => {
        const data = { customerId: uploadData?.customerId, status: false, docId: uploadData?.docId, documentTypeId: uploadData?.documentType, id: uploadData?.id, documentName: uploadData?.documentName };

        const onSuccess = (res) => {
            showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, userId, extraParams });
        };

        const onError = (message) => {
            showGlobalNotification({ message });
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

    const downloadFileFromList = () => {
        const onSuccessAction = (res) => {
            showGlobalNotification({ notificationType: 'success', title: 'Success', message: res.responseMessage });
        };
        const onErrorAction = (message) => {
            showGlobalNotification({ notificationType: 'error', title: 'Error', message });
        };
        const extraParams = [
            {
                key: 'docId',
                title: 'docId',
                value: uploadedFile,
                name: 'docId',
            },
        ];
        const supportingDocument = uploadedFileName;
        fetchViewDocument({ setIsLoading: viewListShowLoading, userId, extraParams, supportingDocument, onSuccessAction, onErrorAction });
    };

    const onFinish = (values) => {
        const data = { ...values, customerId: selectedCustomerId, status: true, docId: uploadedFile, documentTypeId: form.getFieldValue('documentTypeId'), id: '' };

        const title = LANGUAGE_EN.GENERAL.CUSTOMER_UPDATE.TITLE;
        const message = LANGUAGE_EN.GENERAL.CUSTOMER_UPDATE.MESSAGE;

        if (data?.docId && data?.documentName && data?.documentTypeId) {
            const onSuccess = (res) => {
                setFileList([]);
                setEmptyList(false);
                setUploadedFile();
                form.resetFields();
                showGlobalNotification({ notificationType: 'success', title, message: res?.responseMessage });
                fetchList({ setIsLoading: listShowLoading, userId, extraParams });
                setIsFormVisible(false);
            };

            const onError = (message) => {
                showGlobalNotification({ message });
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
        } else {
            showGlobalNotification({ notificationType: 'success', title, message });
            setFileList([]);
            setEmptyList(false);
            setUploadedFile();
            form.resetFields();
            setIsFormVisible(false);
        }
    };

    const viewProps = {
        downloadFileFromButton,
        isViewDataLoaded,
        supportingData,
        supportingDataView,
        setSupportingDataView,
        deleteFile,

        viewDocument,
        showGlobalNotification,
        formActionType,
        listShowLoading,
        saveData,
        userId,
        fetchViewDocument,
        viewListShowLoading,
    };

    const formProps = {
        ...props,
        typeData,
        userId,
        accessToken,
        token,
        saveData,
        onFinish,
        setUploadedFileName,

        listShowLoading,
        showGlobalNotification,
        viewDocument,
        downloadFile,
        downloadFileFromButton,
        downloadFileFromList,
        viewListShowLoading,

        ADD_ACTION,
        EDIT_ACTION,
        VIEW_ACTION,
        buttonData,
        setButtonData,

        uploadedFile,
        setUploadedFile,
        uploadDocumentFile,
        emptyList,
        setEmptyList,
        fileList,
        setFileList,
    };

    const myProps = {
        ...props,
        buttonData: { ...props.buttonData, formBtnActive: true },
    };

    return (
        <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormValueChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <h2>{section?.title}</h2>
                    {formActionType?.viewMode ? (
                        <ViewDetail {...viewProps} />
                    ) : (
                        <>
                            <AddEditForm {...formProps} />
                            <ViewDetail {...viewProps} />
                        </>
                    )}
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <CustomerFormButton {...myProps} />
                </Col>
            </Row>
        </Form>
    );
};

export const SupportingDocumentMaster = connect(mapStateToProps, mapDispatchToProps)(SupportingDocumentBase);
