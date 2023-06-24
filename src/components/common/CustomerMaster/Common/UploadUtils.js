/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Button, Typography, Upload, Row, Col, Empty, Image, Card, Space, Avatar, message } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { supportingDocumentDataActions } from 'store/actions/data/supportingDocument';
import { documentViewDataActions } from 'store/actions/data/customerMaster/documentView';

import { FiEye, FiTrash } from 'react-icons/fi';
import { HiCheck } from 'react-icons/hi';
import styles from 'components/common/Common.module.css';

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
        },
        dispatch
    ),
});

const UploadUtilsMain = (props) => {
    const { uploadTitle, uploadDescription, uploadBtnName, uploadImgTitle, viewDocument, formData } = props;
    const { listShowLoading, userId, uploadFile, fecthViewDocument, listShowLoadingOnLoad, setUploadImgDocId } = props;
    const [uploadedFile, setUploadedFile] = useState();

    const onDrop = (e) => {
        console.log('Dropped files', e.dataTransfer.files);
    };
    useEffect(() => {
        if (uploadedFile) {
            const extraParams = [
                {
                    key: 'docId',
                    title: 'docId',
                    value: uploadedFile,
                    name: 'docId',
                },
            ];
            setUploadImgDocId(uploadedFile);
            fecthViewDocument({ setIsLoading: listShowLoadingOnLoad, userId, extraParams });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uploadedFile]);

    const uploadProps = {
        showUploadList: {
            showRemoveIcon: true,
            showDownloadIcon: true,
            previewIcon: <FiEye onClick={(e) => console.log(e, 'custom removeIcon event')} />,
            removeIcon: <FiTrash onClick={(e) => console.log(e, 'custom removeIcon event')} />,
            showProgress: true,
        },
        progress: { strokeWidth: 3, showInfo: true },

        onDrop,
        onChange: (info, event) => {
            const { status } = info.file;
            if (status === 'uploading') {
            } else if (status === 'done') {
                setUploadedFile(info?.file?.response?.docId);
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
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
            <>
                <Card className={styles.dashedBorder}>
                    <Space direction="vertical">
                        <Space>
                            <Avatar icon={<HiCheck />} />
                            <div>
                                <Title level={5}>{uploadImgTitle || 'Profile Picture'}</Title>
                                <Text>File type should be .png and .jpg and max file size to be 5Mb</Text>
                            </div>
                        </Space>
                        <Space>
                            <Image style={{ borderRadius: '6px' }} width={150} preview={false} src={`data:image/png;base64,${viewDocument?.base64}` || `data:image/png;base64,${formData?.viewDocument?.base64}`} />
                            <Button type="link">Replace Image</Button>
                        </Space>
                    </Space>
                </Card>
            </>
        </>
    );
};
const UploadUtils = connect()(UploadUtilsMain);

export default UploadUtils;
