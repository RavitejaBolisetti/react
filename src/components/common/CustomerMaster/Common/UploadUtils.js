/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Button, Typography, Upload, Image, Space, Avatar, message, Col, Skeleton } from 'antd';
import { connect } from 'react-redux';

import { axiosAPICall } from 'utils/axiosAPICall';
import { BASE_URL_DOCUMENT_UPLOAD as baseUploadURL, BASE_URL_DOCUMENT_VIEW_URL as baseDownloadUrl } from 'constants/routingApi';

import { FiEye } from 'react-icons/fi';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { HiCheck } from 'react-icons/hi';
import { UploadBoxIcon } from 'Icons';

import styles from './UploadUtils.module.scss';
const { Dragger } = Upload;
const { Text, Title } = Typography;

const mapStateToProps = (state) => {
    const {
        auth: { userId, accessToken, token },
    } = state;

    let returnValue = {
        userId,
        accessToken,
        token,
    };
    return returnValue;
};

const imageUploadSkeleton = (
    <>
        <Col span={16}>
            <Skeleton
                avatar
                paragraph={{
                    rows: 2,
                }}
            />
        </Col>
    </>
);
const UploadUtilsMain = (props) => {
    const { uploadTitle, uploadDescription, uploadBtnName, uploadImgTitle, formData } = props;
    const { formActionType, isAdding, setUploadImgDocId } = props;
    const { uploadedFile, setUploadedFile, base64Img, setBase64Img } = props;
    const { userId, accessToken, token } = props;

    const [visible, setVisible] = useState(false);
    const [isReplacing, setIsReplacing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onError = (msg) => {
        setIsLoading(false);
    };

    const onDrop = (e) => {};

    const onReplaceClick = () => {
        setIsReplacing(true);
    };
    const onCancelReplac = (e) => {
        e.stopPropagation();
        setIsReplacing(false);
    };

    useEffect(() => {
        if ((!isReplacing && base64Img) || (!isAdding && base64Img)) return;
        if (uploadedFile || formData?.docId) {
            downloadImage(uploadedFile, formData?.docId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uploadedFile, formData?.docId]);

    const downloadImage = (uploadedFile, docId) => {
        setIsLoading(true);

        const onSuccess = (res) => {
            setBase64Img(res?.data?.base64);
            setIsLoading(false);
        };

        const apiCallParams = {
            method: 'get',
            url: baseDownloadUrl + '?docId=' + (uploadedFile || formData?.docId),
            token,
            accessToken,
            userId,
            onSuccess,
            onError,
            onTimeout: () => onError('Request timed out, Please try again'),
            postRequest: () => setIsLoading(false),
        };

        axiosAPICall(apiCallParams);
    };

    const uploadProps = {
        showUploadList: {
            showRemoveIcon: true,
            showDownloadIcon: true,
            previewIcon: <FiEye />,
            removeIcon: <AiOutlineCloseCircle />,
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
        progress: { size: 3, showInfo: true },
        accept: 'image/png, image/jpeg',
        onDrop,
        onChange: (info) => {
            const { status } = info.file;
            if (status === 'uploading') {
                // setButtonData({ ...buttonData, formBtnActive: false });
            } else if (status === 'done') {
                setUploadedFile(info?.file?.response?.docId);
                setUploadImgDocId(info?.file?.response?.docId);
                message.success(`${info.file.name} file uploaded successfully.`);
                // setButtonData({ ...buttonData, formBtnActive: true });
                setIsReplacing(false);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
                // setButtonData({ ...buttonData, formBtnActive: true });
            }
        },
    };

    const handleUpload = (options) => {
        if (!userId) return;
        const { file, onSuccess, onError } = options;

        const data = new FormData();
        data.append('applicationId', 'app');
        data.append('file', file);

        const apiCallParams = {
            data,
            method: 'post',
            url: baseUploadURL,
            token,
            accessToken,
            userId,
            onSuccess,
            // onSuccess: (data) => {
            //     setUploadedFile(data?.data?.docId);
            //     setUploadImgDocId(data?.data?.docId);
            //     setIsLoading(false);
            //     setIsReplacing(false);
            // },
            onError,
            onTimeout: () => onError('Request timed out, Please try again'),
            postRequest: () => {},
        };

        axiosAPICall(apiCallParams);
    };

    return (
        <>
            {isLoading && imageUploadSkeleton}
            {!isLoading && (
                <div className={styles.uploadDragger}>
                    {((formActionType?.viewMode && !isReplacing) || (base64Img && !isReplacing)) && (
                        <>
                            <Space direction="vertical" className={styles.viewDragger}>
                                <Space>
                                    <Avatar size={24} icon={<HiCheck />} />
                                    <Title level={5}>{uploadImgTitle || 'Contact Picture'}</Title>
                                </Space>
                                <Space>
                                    <Image
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
                    )}
                    {(isReplacing || (isAdding && !base64Img) || formActionType?.addMode) && (
                        <>
                            <Dragger {...uploadProps} customRequest={handleUpload} multiple={false}>
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
            )}
        </>
    );
};
const UploadUtils = connect(mapStateToProps, null)(UploadUtilsMain);

export default UploadUtils;
