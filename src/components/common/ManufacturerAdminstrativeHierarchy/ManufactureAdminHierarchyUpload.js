/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Form, Row, Col, Button, Space } from 'antd';

import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';
import { UploadUtil } from 'utils/Upload';

import styles from 'assets/sass/app.module.scss';

const UploadMain = (props) => {
    const { downloadFile, form, formData, onCloseAction, onFinishFailed } = props;
    const { buttonData, setButtonData, handleButtonClick } = props;
    const { userId, setUploadedFile, listShowLoading, showGlobalNotification, setEmptyList } = props;
    const { organizationId } = props;
    const { setFileList, setUploadedFileName, downloadShowLoading, resetData, authorityShowLoading, saveAuthorityData, uploadedFile, fetchDocumentFileDocId } = props;

    const downloadReport = (documentId) => {
        const onSuccessAction = (res) => {
            setFileList([]);
            setUploadedFile();
            setUploadedFileName();
            resetData();
            showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage, placement: 'bottomRight' });
        };

        const onErrorAction = (res) => {
            showGlobalNotification({ notificationType: 'error', title: 'Error', message: res, placement: 'bottomRight' });
        };

        const extraParams = [
            {
                key: 'docId',
                title: 'docId',
                value: documentId,
                name: 'docId',
            },
        ];
        downloadFile({ setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
        resetData();
    };

    const onFinish = () => {
        const data = { docId: uploadedFile };

        const onSuccess = (res) => {
            setEmptyList(false);
            setUploadedFile();
            form.resetFields();
            showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
        };

        const onError = (res, data) => {
            let message = res;
            if (data?.docId) {
                message = (
                    <>
                        {message}
                        <Button type="link" onClick={() => downloadReport(data?.docId)}>
                            Download Here
                        </Button>
                    </>
                );
            }

            showGlobalNotification({ notificationType: 'error', title: 'Error', message: message });
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

    const getDocIdFromOrgId = () => {
        const extraParams = [
            {
                key: 'manufacturerOrgId',
                title: 'manufacturerOrgId',
                value: organizationId,
                name: 'manufacturerOrgId',
            },
        ];

        const onSuccessAction = (res) => {
            const extraParams = [
                {
                    key: 'docId',
                    title: 'docId',
                    value: res?.data?.docId,
                    name: 'docId',
                },
            ];
            downloadFile({ setIsLoading: downloadShowLoading, userId, extraParams });
            resetData();
        };
        fetchDocumentFileDocId({
            setIsLoading: authorityShowLoading,
            extraParams,
            userId,
            onSuccessAction,
        });
    };

    // const handleTemplateDownLoad = () => {
    //     const filteredTypeData = typeData[PARAM_MASTER.FILE_DOWNLOAD_TMPLT.id].filter((value) => value.key === PARAM_MASTER.ADMINAUTHTMPLT.id);
    //     let templateID = null;
    //     if (filteredTypeData.length === 1) {
    //         templateID = filteredTypeData[0];
    //     }
    //     const extraParams = [
    //         {
    //             key: 'docId',
    //             title: 'docId',
    //             value: templateID?.value,
    //             name: 'docId',
    //         },
    //     ];

    //     downloadFile({ setIsLoading: listShowLoading, userId, extraParams });
    // };

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleFormFieldChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
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
                <Row gutter={20} className={styles.drawerBody}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <div className={styles.contentHeaderBackground}>
                            <Space direction="vertical">
                                <Space className={styles.accordianIconWithText}>Authority Form</Space>
                                <Space>Please download "Authority Form Template" using below button</Space>
                                <Space>
                                    <Button type="primary" onClick={getDocIdFromOrgId}>
                                        Download Template
                                    </Button>
                                </Space>
                            </Space>
                        </div>

                        <UploadUtil {...props} uploadButtonName={'Upload Authority Form'} messageText={'Click or drop your file here to upload'} validationText={'File type should be .xlsx and max file size to be 8Mb'} handleFormValueChange={handleFormValueChange} />
                    </Col>
                </Row>

                <DrawerFormButton {...buttonProps} />
            </Form>
        </>
    );
};

export const ManufactureAdminHierarchyUpload = withDrawer(UploadMain, { title: 'Upload', width: '520px' });
