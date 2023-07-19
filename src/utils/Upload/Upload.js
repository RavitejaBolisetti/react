/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Row, Col, Upload, Button, Empty } from 'antd';

import { FiDownload, FiTrash } from 'react-icons/fi';

import { supportingDocumentDataActions } from 'store/actions/data/supportingDocument';
import { documentViewDataActions } from 'store/actions/data/customerMaster/documentView';
import { showGlobalNotification } from 'store/actions/notification';

import styles from 'components/common/Common.module.css';

const { Dragger } = Upload;

const mapStateToProps = (state) => {
    const {
        auth: { userId, accessToken, token },
        data: {
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

            showGlobalNotification,
        },
        dispatch
    ),
});

const UploadBase = (props) => {
    const {
        listType = 'text',
        accept = '',
        handleFormValueChange = () => {},
        multiple = false,
        showRemoveIcon = true,
        showDownloadIcon = true,
        showProgress = { strokeWidth: 3, showInfo: true },
        showPreviewIcon = true,
        // docId = '',
        // documentName = '',
        // isUploadDataLoaded = false,
        // resetViewData,
        fetchViewDocument,
        viewListShowLoading,
        uploadedFile,
        // isViewDataLoaded,
        // viewDocument,

        uploadedFileName,
        setUploadedFileName,
        fileList,
        setFileList,
        userId,
        uploadDocumentFile,
        setUploadedFile,
        listShowLoading,
        showGlobalNotification,
        setEmptyList,
        uploadButtonName = 'Upload File',
        supportedFileTypes = [],
        messageText = (
            <>
                Click or drop your file here to upload the signed and <br /> scanned customer form.
            </>
        ),
        validationText = 'File type should be png, jpg or pdf and max file size to be 5Mb',
        maxSize = 5,
    } = props;

    const [showStatus, setShowStatus] = useState('');

    const downloadFileFromList = () => {
        const onSuccessAction = (res) => {
            showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
        };
        const onErrorAction = (res) => {
            showGlobalNotification({ notificationType: 'error', title: 'Error', message: res });
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

    const onDrop = (e) => {};

    const uploadProps = {
        beforeUpload: (file) => {
            const fileSize = file.size / 1024 / 1024;

            const isValid = supportedFileTypes.find((element) => element === file.type);
            if (supportedFileTypes?.length === 0) {
                return true;
            } else if (fileSize > maxSize) {
                showGlobalNotification({ notificationType: 'error', title: 'Error', message: `Please upload file under ${maxSize} Mb`, placement: 'bottomRight' });
                return Upload.LIST_IGNORE;
            } else {
                if (!isValid) {
                    showGlobalNotification({ notificationType: 'error', title: 'Error', message: `${file.name} is not a excel file`, placement: 'bottomRight' });
                }
                return isValid || Upload.LIST_IGNORE;
            }
        },
        multiple,
        accept,
        listType,
        showUploadList: {
            showRemoveIcon,
            showDownloadIcon,
            removeIcon: <FiTrash />,
            downloadIcon: <FiDownload onClick={() => downloadFileFromList()} style={{ color: '#ff3e5b' }} />,
            showProgress,
            showPreviewIcon,
        },
        progress: { strokeWidth: 3, showInfo: true },
        onDrop,
        onChange: (info) => {
            let fileList = [...info.fileList];
            fileList = fileList.slice(-1);
            setFileList(fileList);
            handleFormValueChange();
            const { status } = info.file;
            setShowStatus(info.file);
            if (status === 'done') {
                setUploadedFile(info?.file?.response?.docId);
                setUploadedFileName(info?.file?.response?.documentName);
            }
        },
    };

    useEffect(() => {
        if (showStatus.status === 'done') {
            showGlobalNotification({ notificationType: 'success', title: 'Success', message: `${showStatus.name + ' file uploaded successfully'}` });
        } else if (showStatus.status === 'error') {
            showGlobalNotification({ notificationType: 'error', title: 'Error', message: 'Error' });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showStatus]);

    const handleUpload = (options) => {
        const { file, onSuccess, onError } = options;
        setEmptyList(true);

        const data = new FormData();
        data.append('applicationId', 'app');
        data.append('file', file);

        const requestData = {
            data: data,
            method: 'post',
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
        };

        uploadDocumentFile(requestData);
    };

    return (
        <Row gutter={16}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <div className={styles.uploadContainer} style={{ opacity: '100' }}>
                    <Dragger fileList={fileList} customRequest={handleUpload} {...uploadProps}>
                        <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description={
                                <>
                                    <span>{messageText}</span>
                                    <span>
                                        <br />
                                        {validationText}
                                    </span>
                                </>
                            }
                        />

                        <Button type="primary">{uploadButtonName}</Button>
                    </Dragger>
                </div>
            </Col>
        </Row>
    );
};

export const UploadUtil = connect(mapStateToProps, mapDispatchToProps)(UploadBase);
