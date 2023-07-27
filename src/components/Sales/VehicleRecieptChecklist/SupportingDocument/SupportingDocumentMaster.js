/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { LANGUAGE_EN } from 'language/en';

import { bindActionCreators } from 'redux';
import { Row, Col, Form } from 'antd';

import { supportingDocumentDataActions } from 'store/actions/data/supportingDocument';
import { vehicleDetailDocumentDataActions } from 'store/actions/data/vehicle/vehicleDetailDocument';
import { documentViewDataActions } from 'store/actions/data/customerMaster/documentView';
import { showGlobalNotification } from 'store/actions/notification';
import { PARAM_MASTER } from 'constants/paramMaster';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { VehicleCheckListbutton } from '../VehicleRecieptFormButton';

import AddEditForm from './AddEditForm';

import styles from 'components/common/Common.module.css';

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
            fetchViewDocument: documentViewDataActions.fetchList,
            resetViewData: documentViewDataActions.reset,
            listShowLoading: supportingDocumentDataActions.listShowLoading,

            showGlobalNotification,
        },
        dispatch
    ),
});

const SupportingDocumentBase = (props) => {
    const { isViewDataLoaded, uploadDocumentFile, accessToken, token, onFinishFailed, form, setIsFormVisible } = props;

    const { userId, selectedRecordId, showGlobalNotification, section, listShowLoading, typeData, saveData, fetchList, documentData, fetchViewDocument, resetData, resetViewData } = props;
    const { buttonData, setButtonData, formActionType, handleFormValueChange } = props;
    const { viewDocument, viewListShowLoading } = props;

    const [uploadedFile, setUploadedFile] = useState();
    const [emptyList, setEmptyList] = useState(true);
    const [fileList, setFileList] = useState([]);
    const [supportingDocs, setSupportingDocs] = useState([]);
    const [uploadedFileName, setUploadedFileName] = useState('');
    const [documentTypeRule, setDocumentTypeRule] = useState([]);
    const [documentTitleRule, setDocumentTitleRule] = useState([]);

    const ADD_ACTION = FROM_ACTION_TYPE?.ADD;
    const EDIT_ACTION = FROM_ACTION_TYPE?.EDIT;
    const VIEW_ACTION = FROM_ACTION_TYPE?.VIEW;

    useEffect(() => {
        return () => {
            resetData();
            resetViewData();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
        if (viewDocument && isViewDataLoaded) {
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
                value: uploadData?.documentId,
                name: 'docId',
            },
        ];
        const supportingDocument = uploadData?.documentName;
        fetchViewDocument({ setIsLoading: viewListShowLoading, userId, extraParams, supportingDocument });
    };

    const downloadFileFromList = (info) => {
        showGlobalNotification({ notificationType: 'success', title: 'Success', message: 'Your download will start soon' });
        const extraParams = [
            {
                key: 'docId',
                title: 'docId',
                value: info?.response?.docId,
                name: 'docId',
            },
        ];
        const supportingDocument = uploadedFileName;
        fetchViewDocument({ setIsLoading: viewListShowLoading, userId, extraParams, supportingDocument });
    };

    const deleteFileFromList = (info) => {
        const index = supportingDocs?.findIndex((el) => el?.documentId === info?.response?.docId);
        supportingDocs.splice(index, 1);
    };

    const onFinish = (values) => {
        const data = { vehicleIdentificationNumber: selectedRecordId, supportingDocuments: supportingDocs, technicalDocuments: null };
        // const title = LANGUAGE_EN.GENERAL.CUSTOMER_UPDATE.TITLE;
        // const message = LANGUAGE_EN.GENERAL.CUSTOMER_UPDATE.MESSAGE;

        if (supportingDocs.length) {
            const onSuccess = (res) => {
                setFileList([]);
                setEmptyList(false);
                setUploadedFile();
                form.resetFields();
                showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });

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
            setSupportingDocs([]);
        } else {
            // showGlobalNotification({ notificationType: 'success', title, message });
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
        deleteFileFromList,

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
                    {/* {formActionType?.viewMode ? (
                        <ViewSupportingDocDetail {...viewProps} />
                    ) : (
                        <> */}
                    <AddEditForm {...formProps} />
                    {/* <ViewSupportingDocDetail {...viewProps} /> */}
                    {/* </>
                    )} */}
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <VehicleCheckListbutton {...myProps} />
                </Col>
            </Row>
        </Form>
    );
};

export const SupportingDocumentMaster = connect(mapStateToProps, mapDispatchToProps)(SupportingDocumentBase);
