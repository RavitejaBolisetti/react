/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { LANGUAGE_EN } from 'language/en';

import { bindActionCreators } from 'redux';
import { Row, Col, Form, Card } from 'antd';

import { supportingDocumentDataActions } from 'store/actions/data/supportingDocument';
import { documentViewDataActions } from 'store/actions/data/customerMaster/documentView';
import { showGlobalNotification } from 'store/actions/notification';
import { PARAM_MASTER } from 'constants/paramMaster';
import { FROM_ACTION_TYPE } from 'constants/formActionType';

import AddEditForm from './AddEditForm';
import { ViewDetail } from './ViewDetail';
import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';
import { CorporateSchemeRegistrationFormButton } from '../CorporateSchemeRegistrationFormButton';

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
            viewListShowLoading: documentViewDataActions.listShowLoading,
            resetViewData: documentViewDataActions.reset,

            fetchList: supportingDocumentDataActions.fetchList,
            saveData: supportingDocumentDataActions.saveData,
            uploadDocumentFile: supportingDocumentDataActions.uploadFile,
            downloadFile: supportingDocumentDataActions.downloadFile,
            listShowLoading: supportingDocumentDataActions.listShowLoading,
            resetData: supportingDocumentDataActions.resetData,

            showGlobalNotification,
        },
        dispatch
    ),
});

const SupportingDocumentBase = (props) => {
    const { isViewDataLoaded, uploadDocumentFile, accessToken, token, form } = props;

    const { userId, showGlobalNotification, section, listShowLoading, typeData, saveData, fetchList, supportingData, fetchViewDocument, setIsFormVisible } = props;
    const { buttonData, setButtonData, formActionType } = props;
    const { selectedCustomerId, viewDocument, viewListShowLoading, downloadFile } = props;

    const [uploadedFile, setUploadedFile] = useState();
    const [uploadedFileList, setUploadedFileList] = useState();
    const [emptyList, setEmptyList] = useState(true);

    const [supportingDataView, setSupportingDataView] = useState();
    const [fileList, setFileList] = useState([]);
    const [uploadedFileName, setUploadedFileName] = useState('');
    const [payload, setPayload] = useState([]);
    const [mandatoryFields, setMandatoryFields] = useState(false);

    const supportedFileTypes = ['image/png', 'image/jpg', 'image/jpeg', 'application/pdf'];

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
        if (!formActionType?.addMode && selectedCustomerId) {
            fetchList({ setIsLoading: listShowLoading, userId, extraParams });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedCustomerId]);

    useEffect(() => {
        if (fileList.length === 0) {
            setMandatoryFields(false);
        }
        uploadedFile && setPayload([...payload, { customerId: selectedCustomerId, status: true, docId: uploadedFile, documentTypeId: form.getFieldValue('documentTypeId'), id: '', documentName: form.getFieldValue('documentName') }]);

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

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };
    const handleClearChange = () => {
        if (!form.getFieldValue('documentTypeId') && !form.getFieldValue('documentName')) {
            setMandatoryFields(false);
            form.resetFields();
        } else {
            setMandatoryFields(true);
        }
    };

    const deleteFile = (uploadData) => {
        const data = [{ customerId: uploadData?.customerId, status: false, docId: uploadData?.docId, documentTypeId: uploadData?.documentType, id: uploadData?.id, documentName: uploadData?.documentName }];
        const onSuccess = (res) => {
            showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: 'File deleted Successfully' });
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

    const onFinish = () => {
        const title = LANGUAGE_EN.GENERAL.CUSTOMER_UPDATE.TITLE;
        const message = LANGUAGE_EN.GENERAL.CUSTOMER_UPDATE.MESSAGE;

        if (fileList.length > 0) {
            const onSuccess = (res) => {
                setFileList([]);
                setEmptyList(false);
                setUploadedFile();
                form.resetFields();
                showGlobalNotification({ notificationType: 'success', title, message });

                fetchList({ setIsLoading: listShowLoading, userId, extraParams });
                setIsFormVisible(false);
            };

            const onError = (message) => {
                showGlobalNotification({ message });
            };

            const requestData = {
                data: payload,
                method: 'post',
                setIsLoading: listShowLoading,
                userId,
                onError,
                onSuccess,
            };

            saveData(requestData);
        } else {
            if (mandatoryFields) {
                showGlobalNotification({ notificationType: 'error', title: translateContent('global.notificationError.title'), message: 'Please upload at least one file to continue' });
            } else {
                showGlobalNotification({ notificationType: 'success', title, message });
                setFileList([]);
                setEmptyList(false);
                setUploadedFile();
                form.resetFields();
                setIsFormVisible(false);
            }
        }
    };

    const viewProps = {
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
        downloadFile,
    };

    const formProps = {
        ...props,
        onRemove,
        typeData,
        userId,
        accessToken,
        token,
        saveData,
        onFinish,
        uploadedFileName,
        setUploadedFileName,

        listShowLoading,
        showGlobalNotification,
        viewDocument,
        downloadFile,
        // downloadFileFromButton,
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
        formActionType,
        supportedFileTypes,
        isReplaceEnabled: false,
        uploadedFileList,
        setUploadedFileList,
        mandatoryFields,
        setMandatoryFields,
        supportingDocs: true,
        handleClearChange,
        tempFileName: form.getFieldValue('documentName'),
    };

    const myProps = {
        ...props,
        buttonData: { ...props.buttonData, formBtnActive: true },
    };
    return (
        <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormValueChange} onFinish={onFinish}>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <h2>{section?.title} </h2>
                    <Card>
                        {formActionType?.viewMode ? (
                            <ViewDetail {...viewProps} />
                        ) : (
                            <>
                                <AddEditForm {...formProps} />
                                <ViewDetail {...viewProps} />
                            </>
                        )}
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <CorporateSchemeRegistrationFormButton {...props} />
                </Col>
            </Row>
        </Form>
    );
};

const SupportingDocumentMaster = connect(mapStateToProps, mapDispatchToProps)(SupportingDocumentBase);
export default SupportingDocumentMaster;
