/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col, Form } from 'antd';

import { supportingDocumentDataActions } from 'store/actions/data/supportingDocument';
import { vehicleDetailDocumentDataActions } from 'store/actions/data/vehicle/vehicleDetailDocument';
import { documentViewDataActions } from 'store/actions/data/customerMaster/documentView';
import { showGlobalNotification } from 'store/actions/notification';
import { PARAM_MASTER } from 'constants/paramMaster';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { VehicleDetailFormButton } from '../VehicleDetailFormButton';
import AddEditForm from './AddEditForm';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

import { getNameFromKey } from 'utils/checkAndSetDefaultValue';

const mapStateToProps = (state) => {
    const {
        auth: { userId, accessToken, token },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            Vehicle: {
                VehicleDetailDocument: { isLoaded: isDataLoaded = false, isLoading, data: documentData },
            },
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
        documentData,
        isViewDataLoaded,
        viewDocument,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: vehicleDetailDocumentDataActions.fetchList,
            saveData: vehicleDetailDocumentDataActions.saveData,
            viewListShowLoading: vehicleDetailDocumentDataActions.listShowLoading,
            resetData: vehicleDetailDocumentDataActions.reset,
            uploadDocumentFile: supportingDocumentDataActions.uploadFile,
            downloadFile: supportingDocumentDataActions.downloadFile,
            fetchViewDocument: documentViewDataActions.fetchList,
            resetViewData: documentViewDataActions.reset,
            listShowLoading: supportingDocumentDataActions.listShowLoading,

            showGlobalNotification,
        },
        dispatch
    ),
});

const SupportingDocumentBase = (props) => {
    const { isViewDataLoaded, uploadDocumentFile, accessToken, token, form, setIsFormVisible } = props;

    const { userId, selectedRecordId, showGlobalNotification, section, listShowLoading, typeData, saveData, fetchList, documentData } = props;
    const { buttonData, setButtonData, formActionType, handleFormValueChange } = props;
    const { downloadFile, viewDocument, viewListShowLoading } = props;

    const [uploadedFile, setUploadedFile] = useState();
    const [emptyList, setEmptyList] = useState(true);
    const [fileList, setFileList] = useState([]);
    const [supportingDocs, setSupportingDocs] = useState([]);
    const [uploadedFileName, setUploadedFileName] = useState('');
    const [documentTypeRule, setDocumentTypeRule] = useState([]);
    const [documentTitleRule, setDocumentTitleRule] = useState([]);
    const [mandatoryFields, setMandatoryFields] = useState(false);
    const [payload, setPayload] = useState([]);

    const ADD_ACTION = FROM_ACTION_TYPE?.ADD;
    const EDIT_ACTION = FROM_ACTION_TYPE?.EDIT;
    const VIEW_ACTION = FROM_ACTION_TYPE?.VIEW;

    const extraParams = [
        {
            key: 'vin',
            value: selectedRecordId,
        },
    ];

    useEffect(() => {
        if (userId) {
            fetchList({ setIsLoading: listShowLoading, userId, extraParams });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    useEffect(() => {
        if (fileList.length === 0) {
            setMandatoryFields(false);
        }
        uploadedFile && setPayload([...payload, { documentId: uploadedFile, documentTypeCd: form.getFieldValue('documentTypeCd'), id: '', documentTitle: form.getFieldValue('documentTitle'), documentTypeName: getNameFromKey(typeData, form.getFieldValue('documentTypeCd')) }]);

        uploadedFile && form.resetFields();

        return () => {
            setUploadedFile(undefined);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fileList]);

    const onRemove = (file) => {
        const index = payload.findIndex((payload) => payload.docId === file.response.docId);
        payload.splice(index, 1);
    };

    const downloadFileFromButton = (uploadData) => {
        const onSuccessAction = (res) => {
            showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
        };
        const extraParams = [
            {
                key: 'docId',
                title: 'docId',
                value: uploadData?.documentId,
                name: 'docId',
            },
        ];
        downloadFile({ setIsLoading: listShowLoading, userId, extraParams, onSuccessAction });
    };

    const downloadFileFromList = (info) => {
        showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: translateContent('vehicleDetail.documents.label.startDownload') });
        const extraParams = [
            {
                key: 'docId',
                title: 'docId',
                value: info?.response?.docId,
                name: 'docId',
            },
        ];
        downloadFile({ setIsLoading: listShowLoading, userId, extraParams });
    };

    const onFinish = () => {
        if ((!form.getFieldValue('documentTitle') || !form.getFieldValue('documentTypeCd')) && payload?.length === 0) {
            form.resetFields();
        }

        const data = { vehicleIdentificationNumber: selectedRecordId, supportingDocuments: payload, technicalDocuments: null };

        if (fileList.length > 0) {
            const onSuccess = (res) => {
                setFileList([]);
                setEmptyList(false);
                setUploadedFile();
                form.resetFields();
                showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });

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
            setPayload([]);
        } else {
            if (mandatoryFields) {
                showGlobalNotification({ notificationType: 'error', title: translateContent('global.notificationError.title'), message: translateContent('vehicleDetail.documents.label.atleastOneFile') });
            } else {
                setFileList([]);
                setEmptyList(false);
                setUploadedFile();
                form.resetFields();
                setIsFormVisible(false);
            }
        }
    };

    const handleClearChange = () => {
        if (!form.getFieldValue('documentTypeCd') && !form.getFieldValue('documentTitle')) {
            setMandatoryFields(false);
            form.resetFields();
        } else {
            setMandatoryFields(true);
        }
    };

    const viewProps = {
        downloadFileFromButton,
        isViewDataLoaded,
        documentData,
        viewDocument,
        showGlobalNotification,
        formActionType,
        listShowLoading,
        userId,
    };

    const formProps = {
        ...props,
        ...viewProps,
        typeData,
        userId,
        accessToken,
        token,
        onFinish,
        setUploadedFileName,

        listShowLoading,
        showGlobalNotification,
        viewDocument,
        downloadFileFromButton,
        downloadFileFromList,

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
        supportingDocs,
        setSupportingDocs,
        documentTypeRule,
        setDocumentTypeRule,
        documentTitleRule,
        setDocumentTitleRule,
        mandatoryFields,
        setMandatoryFields,
        handleClearChange,
    };

    const uploadProps = {
        form,
        typeData,
        userId,
        accessToken,
        token,
        saveData,
        onFinish,
        uploadedFileName,
        setUploadedFileName,

        listShowLoading,
        downloadFile,
        showGlobalNotification,
        viewDocument,
        viewListShowLoading,

        uploadedFile,
        setUploadedFile,
        emptyList,
        setEmptyList,
        fileList,
        setFileList,

        uploadButtonName: translateContent('vehicleDetail.documents.label.uploadFile'),
        messageText: translateContent('vehicleDetail.documents.label.clickOrDrop'),
        validationText: translateContent('vehicleDetail.documents.label.FileSize'),
        supportedFileTypes: ['image/png', 'image/jpeg', 'application/pdf'],
        maxSize: 8,
        supportingDocs: true,
        setMandatoryFields,
        onRemove,
        tempFileName: form.getFieldValue('documentTitle'),
    };

    const myProps = {
        ...props,
        buttonData: { ...props.buttonData, formBtnActive: true },
    };
    return (
        <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormValueChange} onFinish={onFinish}>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <h2>{section?.title}</h2>
                    <AddEditForm uploadProps={uploadProps} {...formProps} />
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <VehicleDetailFormButton {...myProps} />
                </Col>
            </Row>
        </Form>
    );
};

export const SupportingDocumentMaster = connect(mapStateToProps, mapDispatchToProps)(SupportingDocumentBase);
