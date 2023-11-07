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
import { translateContent } from 'utils/translateContent';

const UploadMain = (props) => {
    const { downloadFile, form, formData, onCloseAction } = props;
    const { buttonData, setButtonData, handleButtonClick } = props;
    const { userId, setUploadedFile, listShowLoading, showGlobalNotification, setEmptyList } = props;
    const { organizationId, setIsUploadDrawer } = props;
    const { setFileList, setUploadedFileName, downloadShowLoading, resetData, authorityShowLoading, saveAuthorityData, uploadedFile, fetchDocumentFileDocId } = props;

    const onErrorAction = (res) => {
        showGlobalNotification({ notificationType: 'error', title: translateContent('global.notificationError.title'), message: res, placement: 'bottomRight' });
    };

    const downloadReport = (documentId) => {
        const onSuccessAction = (res) => {
            setFileList([]);
            setUploadedFile();
            setUploadedFileName();
            resetData();
            showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage, placement: 'bottomRight' });
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
            showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
            setIsUploadDrawer(false);
        };

        const onError = (res, data) => {
            let message = res;
            if (data?.docId) {
                message = (
                    <>
                        {message}
                        <Button type="link" onClick={() => downloadReport(data?.docId)}>
                            {translateContent('adminHierarchy.label.downloadHere')}
                        </Button>
                    </>
                );
            }

            showGlobalNotification({ notificationType: 'error', title: translateContent('global.notificationError.title'), message: message });
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
            downloadFile({ setIsLoading: downloadShowLoading, userId, onErrorAction, extraParams });
            resetData();
        };
        fetchDocumentFileDocId({
            setIsLoading: authorityShowLoading,
            extraParams,
            userId,
            onSuccessAction,
            onErrorAction,
        });
    };

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
            <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish}>
                <Row gutter={20} className={styles.drawerBody}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <div className={styles.contentHeaderBackground}>
                            <Space direction="vertical">
                                <Space className={styles.accordianIconWithText}>{translateContent('adminHierarchy.label.authorityForm')}</Space>
                                <Space>{translateContent('adminHierarchy.label.downloadAuthorityForm')}</Space>
                                <Space>
                                    <Button type="primary" onClick={getDocIdFromOrgId}>
                                        {translateContent('global.buttons.downloadTemplate')}
                                    </Button>
                                </Space>
                            </Space>
                        </div>

                        <UploadUtil {...props} uploadButtonName={translateContent('adminHierarchy.label.uploadButtonName')} messageText={translateContent('adminHierarchy.label.messageText')} validationText={translateContent('adminHierarchy.validation.validationText')} handleFormValueChange={handleFormValueChange} />
                    </Col>
                </Row>

                <DrawerFormButton {...buttonProps} />
            </Form>
        </>
    );
};

export const ManufactureAdminHierarchyUpload = withDrawer(UploadMain, { title: translateContent('global.buttons.upload'), width: '520px' });
