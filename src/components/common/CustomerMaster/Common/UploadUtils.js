/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Button, Typography, Upload, Image, Space, Avatar, message } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { supportingDocumentDataActions } from 'store/actions/data/supportingDocument';
import { documentViewDataActions } from 'store/actions/data/customerMaster/documentView';

import { FiEye } from 'react-icons/fi';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { HiCheck } from 'react-icons/hi';
import { UploadBoxIcon } from 'Icons';
import styles from './UploadUtils.module.css';

const { Dragger } = Upload;
const { Text, Title } = Typography;

const mapStateToProps = (state) => {
    const {
        auth: { userId, accessToken, token },
        data: {
            SupportingDocument: { isLoaded: isDataLoaded = false, isLoading },
            CustomerMaster: {
                ViewDocument: { data: viewDocument },
            },
        },
    } = state;

    let returnValue = {
        userId,
        accessToken,
        token,
        isDataLoaded,
        isLoading,
        viewDocument,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            saveData: supportingDocumentDataActions.saveData,
            uploadFile: supportingDocumentDataActions.uploadFile,
            listShowLoading: supportingDocumentDataActions.listShowLoading,

            fecthViewDocument: documentViewDataActions.fetchList,
            listShowLoadingOnLoad: documentViewDataActions.listShowLoading,
            resetData: documentViewDataActions.reset,
        },
        dispatch
    ),
});

const UploadUtilsMain = (props) => {
    const { uploadTitle, uploadDescription, uploadBtnName, uploadImgTitle, viewDocument, formData, setButtonData = () => {}, buttonData, resetData } = props;
    const { formActionType, listShowLoading, userId, uploadFile, fecthViewDocument, listShowLoadingOnLoad, setUploadImgDocId, uploadImgDocId, fileList, setFileList } = props;
    const [uploadedFile, setUploadedFile] = useState();
    const [visible, setVisible] = useState(false);
    const [isReplacing, setIsReplacing] = useState(false);

    const onDrop = (e) => {
        // console.log('Dropped files', e.dataTransfer.files);
    };

    const onReplaceClick = () => {
        setIsReplacing(true);
    };
    const onCancelReplac = (e) => {
        e.stopPropagation();
        setIsReplacing(false);
    };

    useEffect(() => {
        if (uploadedFile || formData?.docId) {
            setUploadImgDocId(uploadedFile);
            const extraParams = [
                {
                    key: 'docId',
                    title: 'docId',
                    value: uploadedFile || formData?.docId,
                    name: 'docId',
                },
            ];
            fecthViewDocument({ setIsLoading: listShowLoadingOnLoad, userId, extraParams });
        }

        return () => {
            resetData();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uploadedFile, formData?.docId]);

    const uploadProps = {
        showUploadList: {
            showRemoveIcon: true,
            showDownloadIcon: true,
            previewIcon: <FiEye onClick={(e) => console.log(e, 'custom removeIcon event')} />,
            removeIcon: <AiOutlineCloseCircle onClick={(e) => console.log(e, 'custom removeIcon event')} />,
            showProgress: true,
        },
        beforeUpload: (file) => {
            const isPNG = file.type === 'image/png';
            const isJPG = file.type === 'image/jpeg';
            if (!isPNG && !isJPG) {
                message.error(`${file.name} is not a correct file format`);
            }
            return isPNG || isJPG || Upload.LIST_IGNORE;
        },
        progress: { strokeWidth: 3, showInfo: true },
        accept: 'image/png, image/jpeg',
        onDrop,
        onChange: (info, event) => {
            let fileList = [...info.fileList];
            fileList = fileList.slice(-1);
            setFileList(fileList);
            const { status } = info.file;
            if (status === 'uploading') {
                setButtonData({ ...buttonData, formBtnActive: false });
            } else if (status === 'done') {
                setUploadedFile(info?.file?.response?.docId);
                message.success(`${info.file.name} file uploaded successfully.`);
                setButtonData({ ...buttonData, formBtnActive: true });
                setIsReplacing(false);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
                setButtonData({ ...buttonData, formBtnActive: true });
            }
        },
    };

    const handleUpload = (options) => {
        const { file, onSuccess, onError } = options;

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

        uploadFile(requestData);
    };

    return (
        <>
            <div className={styles.uploadDragger}>
                {(!isReplacing && uploadImgDocId) || formActionType?.viewMode ? (
                    <>
                        <Space direction="vertical" className={styles.viewDragger}>
                            <Space>
                                <Avatar size={24} icon={<HiCheck />} />
                                <Title level={5}>{uploadImgTitle || 'Contact Picture'}</Title>
                                {/* <div>
                                        <Title level={5}>{uploadImgTitle || 'Profile Picture'}</Title>
                                        <Text>File type should be .png and .jpg and max file size to be 5Mb</Text>
                                    </div> */}
                            </Space>
                            <Space>
                                <Image
                                    style={{ borderRadius: '6px' }}
                                    width={80}
                                    preview={{
                                        visible,
                                        scaleStep: 0.5,
                                        src: `data:image/png;base64,${viewDocument?.base64}`,
                                        onVisibleChange: (value) => {
                                            setVisible(value);
                                        },
                                    }}
                                    placeholder={<Image preview={false} src={`data:image/png;base64,${viewDocument?.base64}`} width={80} />}
                                    src={`data:image/png;base64,${viewDocument?.base64}`}
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
                        <Dragger fileList={fileList} customRequest={handleUpload} {...uploadProps} multiple={false}>
                            <Space direction="vertical">
                                <UploadBoxIcon />
                                <div>
                                    <Title level={5}>{uploadTitle || 'Upload your contact picture '}</Title>
                                    <Text>{uploadDescription || '(File type should be png, jpg or pdf and max file size to be 5Mb)'}</Text>
                                </div>
                                <Space>
                                    <Button type="primary">{uploadBtnName || 'Upload File'}</Button>
                                    {isReplacing && (
                                        <Button onClick={onCancelReplac} danger>
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
const UploadUtils = connect(mapStateToProps, mapDispatchToProps)(UploadUtilsMain);

export default UploadUtils;
