/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Row, Col, Form, Button } from 'antd';

import { AddEditForm } from './AddEditForm';
import { lessorCustomerCreationDataActions } from 'store/actions/data/lessorCustomerCreation';
import { documentViewDataActions } from 'store/actions/data/customerMaster/documentView';
import { supportingDocumentDataActions } from 'store/actions/data/supportingDocument';
import { geoStateDataActions } from 'store/actions/data/geo/states';

import { FROM_ACTION_TYPE } from 'constants/formActionType';

import { showGlobalNotification } from 'store/actions/notification';

import styles from 'components/common/Common.module.css';

const mapStateToProps = (state) => {
    const {
        auth: { userId, accessToken, token },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            LessorCustomerCreation: { isLoaded: isDataLoaded = false, isLoading, data: lessorData },
            SupportingDocument: { isLoaded: isSupportingDataLoaded = false, isSupportingDataLoading, data: supportingData },
            CustomerMaster: {
                ViewDocument: { isLoaded: isViewDataLoaded = false, data: viewDocument },
            },
            Geo: {
                State: { isFilteredListLoaded: isStateDataLoaded = false, isLoading: isStateLoading, filteredListData: stateData },
            },
        },
    } = state;

    const moduleTitle = 'Lessor Customer';

    let returnValue = {
        userId,
        accessToken,
        token,
        typeData,
        isDataLoaded,
        isSupportingDataLoaded,
        isSupportingDataLoading,
        supportingData,
        isLoading,
        lessorData,
        moduleTitle,
        viewDocument,
        isViewDataLoaded,
        isStateDataLoaded,
        isStateLoading,
        stateData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchStateLovList: geoStateDataActions.fetchFilteredList,
            listStateShowLoading: geoStateDataActions.listShowLoading,

            fetchViewDocument: documentViewDataActions.fetchList,
            viewListShowLoading: documentViewDataActions.listShowLoading,
            resetViewData: documentViewDataActions.reset,

            fetchList: lessorCustomerCreationDataActions.fetchList,
            saveData: lessorCustomerCreationDataActions.saveData,
            listLessorShowLoading: lessorCustomerCreationDataActions.listShowLoading,
            resetData: lessorCustomerCreationDataActions.reset,

            downloadFile: supportingDocumentDataActions.downloadFile,
            listShowLoading: supportingDocumentDataActions.listShowLoading,

            showGlobalNotification,
        },
        dispatch
    ),
});

export const ListCustomerCreationBase = (props) => {
    const { stateData, resetData, resetViewData, fetchStateLovList, isStateDataLoaded, listStateShowLoading, detailData, userId, isDataLoaded, listShowLoading, showGlobalNotification, moduleTitle } = props;
    const { listLessorShowLoading, isSupportingDataLoaded, isSupportingDataLoading, supportingData, accessToken, token } = props;

    const { typeData, saveData, fetchList, lessorData } = props;
    const { downloadFile,isViewDataLoaded, isLoading, viewListShowLoading, fetchViewDocument, viewDocument } = props;

    const [form] = Form.useForm();

    const [isFormVisible, setIsFormVisible] = useState(false);

    const defaultBtnVisiblity = { editBtn: false, saveBtn: false, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn: false, formBtnActive: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const ADD_ACTION = FROM_ACTION_TYPE?.ADD;
    const EDIT_ACTION = FROM_ACTION_TYPE?.EDIT;
    const VIEW_ACTION = FROM_ACTION_TYPE?.VIEW;

    const [uploadedFile, setUploadedFile] = useState();
    const [emptyList, setEmptyList] = useState(true);
    const [uploadedFileName, setUploadedFileName] = useState('');

    const [fileList, setFileList] = useState([]);

    const [downloadForm, setDownLoadForm] = useState(false);

    const supportedFileTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    const maxSize = 8;

    useEffect(() => {
        if (!isStateDataLoaded && userId) {
            fetchStateLovList({ setIsLoading: listStateShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isStateDataLoaded]);

    

    const onFinish = () => {
        const data = { docId: uploadedFile };

        const onSuccess = (res) => {
            setIsFormVisible(false);
            setEmptyList(false);
            setUploadedFile();
            form.resetFields();
            showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
        };

        const onError = (res) => {
            showGlobalNotification({ notificationType: 'error', title: 'Error', message: res });
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

    const onCloseAction = () => {
        form.resetFields();
        setIsFormVisible(false);
        resetData();
        resetViewData();
        setFileList();
    };
    const drawerTitle = downloadForm ? 'Download ' : 'Upload ';

   

    const formProps = {
        ...props,
        form,
        typeData,
        userId,
        accessToken,
        token,
        saveData,
        onFinish,
        fetchList,
        isSupportingDataLoaded,
        isSupportingDataLoading,
        supportingData,
        stateData,
        listLessorShowLoading,
        lessorData,
        isDataLoaded,
        downloadForm,
        setDownLoadForm,
        fileList,
        setFileList,

        listShowLoading,
        showGlobalNotification,
        viewDocument,
        isViewDataLoaded,
        viewListShowLoading,
        fetchViewDocument,

        isVisible: isFormVisible,
        onCloseAction,
        titleOverride: drawerTitle.concat(moduleTitle),

        ADD_ACTION,
        EDIT_ACTION,
        VIEW_ACTION,
        buttonData,
        setButtonData,

        uploadedFile,
        setUploadedFile,
        emptyList,
        setEmptyList,
        resetData,
        resetViewData,
        isLoading,
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

        uploadButtonName: 'Upload Lessor Form',
        messageText: 'Click or drop your file here to upload',
        validationText: 'File type should be .xlxs and max file size to be 8Mb',
        supportedFileTypes,
        maxSize,
    };

    const handleOnClick = () => {
        setButtonData({ ...defaultBtnVisiblity, saveAndNewBtn: false, cancelBtn: true, saveBtn: true });
        setDownLoadForm(false);
        setIsFormVisible(true);
        form.resetFields();
    };

    const handleDownload = () => {
        setButtonData({ ...defaultBtnVisiblity, cancelBtn: true, saveAndNewBtn: false, saveBtn: false });
        setDownLoadForm(true);
        setIsFormVisible(true);
    };
    const title = 'Lessor Customer Details';

    return (
        <>
            <div className={styles.contentHeaderBackground}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={16} lg={16} xl={16} className={styles.subheading}>
                        <Form autoComplete="off" colon={false} className={styles.masterListSearchForm}>
                            <Form.Item label={`${title}`} name="code" validateTrigger={['onSearch']}></Form.Item>
                        </Form>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8} className={styles.addGroup}>
                        <Button type="primary" onClick={handleOnClick}>
                            Upload
                        </Button>

                        <Button type="primary" onClick={handleDownload}>
                            Download
                        </Button>
                    </Col>
                </Row>
            </div>

            <AddEditForm {...formProps} uploadProps={uploadProps} />
        </>
    );
};

export const ListCustomerCreation = connect(mapStateToProps, mapDispatchToProps)(ListCustomerCreationBase);
