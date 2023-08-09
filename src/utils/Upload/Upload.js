/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Typography, Upload, Image, Space, Avatar } from 'antd';
import { supportingDocumentDataActions } from 'store/actions/data/supportingDocument';
import { documentViewDataActions } from 'store/actions/data/customerMaster/documentView';
import { showGlobalNotification } from 'store/actions/notification';
import { AiOutlineCloseCircle, AiOutlineClose, AiOutlineEye } from 'react-icons/ai';
import { HiCheck } from 'react-icons/hi';
import { UploadBoxIcon } from 'Icons';
import styles from './UploadUtil.module.css';

const { Dragger } = Upload;
const { Text, Title } = Typography;

const mapStateToProps = (state) => {
    const {
        auth: { userId, accessToken, token },
        data: {
            SupportingDocument: { isLoaded: isDataLoaded = false, isLoading, data: supportingData },
            CustomerMaster: {
                ViewDocument: { isLoaded: isViewDataLoaded = false, data: viewDocument = [] },
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
        viewDocument,
        isViewDataLoaded,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            viewListShowLoading: documentViewDataActions.listShowLoading,
            resetViewData: documentViewDataActions.reset,
            fetchViewDocument: documentViewDataActions.fetchList,
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
        key = undefined,
        listType = 'text',
        accept = '',
        handleFormValueChange = () => {},
        multiple = false,
        flag= false,
        showRemoveIcon = true,
        showDownloadIcon = true,
        showProgress = { strokeWidth: 3, showInfo: true },
        showPreviewIcon = true,
        form = undefined,
        resetViewData,
        fetchViewDocument,
        viewListShowLoading,
        uploadedFile,
        viewDocument,
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
                Click or drop your file here <br /> to upload the signed and scanned customer form.
            </>
        ),
        validationText = <>(File type should be png, jpg or pdf and max file size to be 5Mb)</>,
        maxSize = 5,
        downloadFile,
        formActionType,
        isReplaceEnabled = false,
        onRemove = () => {},
        single = false,
        supportingDocs = false,
        setMandatoryFields,
        singleDisabled,
        setSingleDisabled,
    } = props;

    const [showStatus, setShowStatus] = useState('');
    const [visible, setVisible] = useState(false);
    const [isReplacing, setIsReplacing] = useState(false);
    const [base64Img, setBase64Img] = useState('');
    const [uploadTime, setUploadTime] = useState(false);

    const removeIcon = uploadTime ? <AiOutlineCloseCircle className={styles.iconSize} /> : <AiOutlineClose className={styles.iconSize} />;

    const onReplaceClick = () => {
        setIsReplacing(true);
    };

    const onCancelReplace = (e) => {
        e.stopPropagation();
        setIsReplacing(false);
    };
    // const formValues = form.getFieldsValue();
    // useEffect(() => {
    //     setUploadTime(false);
    // }, [formValues]);

    useEffect(() => {
        if (isReplaceEnabled && viewDocument?.base64) {
            setBase64Img(viewDocument?.base64);
            setIsReplacing(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [viewDocument?.base64]);

    useEffect(() => {
        if (uploadedFile && isReplaceEnabled) {
            const extraParams = [
                {
                    key: 'docId',
                    title: 'docId',
                    value: uploadedFile,
                    name: 'docId',
                },
            ];
            fetchViewDocument({ setIsLoading: viewListShowLoading, userId, extraParams });
        }

        return () => {
            resetViewData();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uploadedFile]);

    const onDrop = (e) => {};

    const onDownload = (file) => {
        const onSuccessAction = (res) => {
            showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
        };
        const extraParams = [
            {
                key: 'docId',
                title: 'docId',
                value: file?.response?.docId,
                name: 'docId',
            },
        ];
        downloadFile({ setIsLoading: listShowLoading, userId, extraParams, onSuccessAction });
    };

    const uploadProps = {
        beforeUpload: (file) => {
            if (supportingDocs) {
                setMandatoryFields(true);
            }
            const fileSize = file.size / 1024 / 1024;

            const isValid = supportedFileTypes.find((element) => element === file.type);
            if (supportedFileTypes?.length === 0) {
                return true;
            } else if (fileSize > maxSize) {
                showGlobalNotification({ notificationType: 'error', title: 'Error', message: `Please upload file under ${maxSize} Mb`, placement: 'bottomRight' });
                setUploadTime(false);
                return Upload.LIST_IGNORE;
            } else {
                if (!isValid) {
                    showGlobalNotification({ notificationType: 'error', title: 'Error', message: `${file.name} is not in accepted format`, placement: 'bottomRight' });
                    setUploadTime(false);
                }
                return isValid || Upload.LIST_IGNORE;
            }
        },
        multiple,
        accept,
        listType,
        onDownload,
        showUploadList: {
            showRemoveIcon,
            showDownloadIcon,
            removeIcon: removeIcon,
            downloadIcon: <AiOutlineEye className={styles.iconSize} />,
            showProgress,
            showPreviewIcon,
        },
        onRemove,
        progress: { strokeWidth: 3, showInfo: true, format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%` },
        onDrop,
        onChange: (info) => {
            let fileList = [...info.fileList];
            if (supportingDocs) {
                form.validateFields()
                    .then(() => {
                        setFileList(fileList);
                        if(!flag)
                        handleFormValueChange();
                        const { status } = info.file;
                        setShowStatus(info.file);
                        if (status === 'done') {
                            setTimeout(() => {
                                setUploadTime(false);
                            }, 2500);
                            setUploadedFile(info?.file?.response?.docId);
                            setUploadedFileName(info?.file?.response?.documentName);
                        }
                        setMandatoryFields(false);
                    })
                    .catch((err) => {
                        setUploadTime(false);
                        return;
                    });
            } else {
                if (single) {
                    fileList = fileList.slice(-1);
                }

                setFileList(fileList);
                if(!flag)
                handleFormValueChange();
                const { status } = info.file;
                setShowStatus(info.file);
                if (status === 'done') {
                    setTimeout(() => {
                        setUploadTime(false);
                    }, 2700);
                    setUploadedFile(info?.file?.response?.docId);
                    setUploadedFileName(info?.file?.response?.documentName);
                }
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
        setUploadTime(true);
        if (single) {
            setSingleDisabled(true);
        }

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
        <>
            <div className={styles.uploadDragger}>
                {(!isReplacing && base64Img) || formActionType?.viewMode ? (
                    <>
                        <Space direction="vertical" className={styles.viewDragger}>
                            <Space>
                                <Avatar size={24} icon={<HiCheck />} />
                                <Title level={5}>{uploadedFileName || 'Contact Picture'}</Title>
                            </Space>
                            <Space>
                                <Image
                                    key={key}
                                    style={{ borderRadius: '6px' }}
                                    width={80}
                                    preview={{
                                        visible,
                                        scaleStep: 0.5,
                                        src: `data:image/png;base64,${base64Img}`,
                                        onVisibleChange: (value) => {
                                            setVisible(value);
                                        },
                                    }}
                                    placeholder={<Image preview={false} src={`data:image/png;base64,${base64Img}`} width={80} />}
                                    src={`data:image/png;base64,${base64Img}`}
                                />
                                {!formActionType?.viewMode && (
                                    <Button onClick={onReplaceClick} type="link">
                                        Replace Image
                                    </Button>
                                )}
                            </Space>
                        </Space>
                    </>
                ) : (
                    <>
                        <Dragger key={key} className={fileList.length === 0 ? '' : uploadTime ? styles.uploadDraggerStrip : styles.uploadDraggerBox} fileList={fileList} customRequest={handleUpload} {...uploadProps}>
                            <Space direction="vertical">
                                <UploadBoxIcon />
                                <div>
                                    <Title level={5}>{messageText}</Title>
                                    <Text>{validationText}</Text>
                                </div>
                                <Space>
                                    <Button disabled={uploadTime || singleDisabled} type="primary">
                                        {uploadButtonName}
                                    </Button>
                                    {isReplacing && (
                                        <Button onClick={onCancelReplace} danger>
                                            Cancel
                                        </Button>
                                    )}
                                </Space>
                            </Space>
                        </Dragger>
                    </>
                )}
            </div>
        </>
    );
};

export const UploadUtil = connect(mapStateToProps, mapDispatchToProps)(UploadBase);
