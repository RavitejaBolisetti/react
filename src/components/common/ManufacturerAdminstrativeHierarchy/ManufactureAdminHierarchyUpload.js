/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Select, Upload, Button, Empty } from 'antd';

import { FiEye, FiTrash } from 'react-icons/fi';

import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';
import { LANGUAGE_EN } from 'language/en';
import { PARAM_MASTER } from 'constants/paramMaster';
import { preparePlaceholderSelect } from 'utils/preparePlaceholder';

import styles from 'components/common/Common.module.css';

const { Option } = Select;
const { Dragger } = Upload;

const UploadMain = (props) => {
    const { isViewDataLoaded, resetData, resetViewData, form, formData, onCloseAction, onFinishFailed } = props;

    const { buttonData, setButtonData, handleButtonClick } = props;
    const { lessorData, fetchList, typeData, userId, uploadDocumentFile, setUploadedFile, listShowLoading, showGlobalNotification, viewDocument, emptyList, setEmptyList } = props;
    const { downloadForm, isDataLoaded, listLessorShowLoading, viewListShowLoading, fetchViewDocument } = props;
    const { authorityShowLoading, saveAuthorityData, uploadedFile, isAuthorityDataLoaded, isAuthorityDataLoading, authorityData } = props;

    
    useEffect(() => {
        if (isViewDataLoaded && viewDocument) {
            let a = document.createElement('a');
            a.href = `data:image/png;base64,${viewDocument?.base64}`;
            a.download = viewDocument?.fileName;
            a.click();
            resetViewData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isViewDataLoaded, viewDocument]);

    useEffect(() => {
        if (isDataLoaded && authorityData) {
            const extraParams = [
                {
                    key: 'docId',
                    title: 'docId',
                    value: authorityData?.docId,
                    name: 'docId',
                },
            ];
            fetchViewDocument({ setIsLoading: viewListShowLoading, userId, extraParams, authorityData });
            resetData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authorityData]);

    const onFinish = () => {
        const data = { docId: uploadedFile };

        const onSuccess = (res) => {
            setEmptyList(false);
            setUploadedFile();
            form.resetFields();
            showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
        };

        const onError = (message) => {
            showGlobalNotification({ message });
        };

        const requestData = {
            data: data,
            method: 'post',
            setIsLoading: authorityShowLoading,
            userId,
            onError,
            onSuccess,
        };

        saveAuthorityData(requestData);
    };

    const handleTemplateDownLoad = () => {
        showGlobalNotification({ notificationType: 'success', title: 'Success', message: LANGUAGE_EN.GENERAL.DOWNLOAD_START.MESSAGE });
        const filteredTypeData = typeData[PARAM_MASTER.FILE_DOWNLOAD_TMPLT.id]?.filter((value) => value.key === PARAM_MASTER.ADMINAUTHTMPLT.id);
        let templateID = null;
        if (filteredTypeData.length === 1) {
            templateID = filteredTypeData[0];
        }
        const extraParams = [
            {
                key: 'docId',
                title: 'docId',
                value: templateID?.value,
                name: 'docId',
            },
        ];
        const name = {
            docName: 'Authority Template',
        };
        fetchViewDocument({ setIsLoading: viewListShowLoading, userId, extraParams, name });
        resetData();
    };

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleFormFieldChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const [showStatus, setShowStatus] = useState('');

    const onDrop = (e) => {};

    const uploadProps = {
        multiple: false,
        beforeUpload: (file) => {
            const isExcel = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
            if (!isExcel) {
                showGlobalNotification({ notificationType: 'error', title: 'Error', message: `${file.name} is not a excel file` });
            }
            return isExcel || Upload.LIST_IGNORE;
        },
        showUploadList: {
            showRemoveIcon: true,
            showDownloadIcon: false,
            removeIcon: <FiTrash />,
            downloadIcon: <FiEye style={{ color: '#ff3e5b' }} />,
            showProgress: true,
        },
        progress: { strokeWidth: 3, showInfo: true },
        onDrop,
        onChange: (info) => {
            handleFormValueChange();
            const { status } = info.file;
            setShowStatus(info.file);
            if (status === 'done') {
                setUploadedFile(info?.file?.response?.docId);
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

    const buttonProps = {
        formData,
        onCloseAction,
        buttonData,
        setButtonData,
        handleButtonClick,
    };

    return (
        <>
            <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <div className={styles.contentHeaderBackground}>
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.subheading}>
                            Authority Form
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            Please download "Authority Form Template" using below button
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Button type="primary" onClick={handleTemplateDownLoad}>
                                Download Template
                            </Button>
                        </Col>
                    </Row>
                </div>

                <Row gutter={16}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <div className={styles.uploadContainer} style={{ opacity: '100' }}>
                            <Dragger customRequest={handleUpload} {...uploadProps} showUploadList={emptyList}>
                                <Empty
                                    description={
                                        <>
                                            <span>
                                                Click or drop your file here to upload
                                                <br />
                                                scanned customer form.
                                            </span>
                                            <span>
                                                <br />
                                                File should be .xlsx and max file size to be 8Mb
                                            </span>
                                        </>
                                    }
                                />

                                <Button type="primary">Upload Authority Form</Button>
                            </Dragger>
                        </div>
                    </Col>
                    <DrawerFormButton {...buttonProps} />
                </Row>
            </Form>
        </>
    );
};

export const ManufactureAdminHierarchyUpload = withDrawer(UploadMain, { title: 'Upload', width: '520px' });
