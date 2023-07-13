/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Space, Form, Select, Upload, Button, Empty, Divider, Typography } from 'antd';

import { FiEye, FiTrash } from 'react-icons/fi';

import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';
import { LANGUAGE_EN } from 'language/en';
import { PARAM_MASTER } from 'constants/paramMaster';
import { preparePlaceholderSelect } from 'utils/preparePlaceholder';

import styles from 'components/common/Common.module.css';

const { Option } = Select;
const { Dragger } = Upload;
const { Text, Title } = Typography;

const AddEditFormMain = (props) => {
    const { isViewDataLoaded, resetData, resetViewData, form, formData, onCloseAction, onFinish, onFinishFailed } = props;

    const { buttonData, setButtonData, handleButtonClick } = props;
    const { lessorData, fetchList, typeData, userId, uploadDocumentFile, setUploadedFile, listShowLoading, showGlobalNotification, viewDocument, emptyList, setEmptyList } = props;
    const { downloadForm, isDataLoaded, listLessorShowLoading, stateData, viewListShowLoading, fetchViewDocument } = props;

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
        if (isDataLoaded && lessorData) {
            const extraParams = [
                {
                    key: 'docId',
                    title: 'docId',
                    value: lessorData?.docId,
                    name: 'docId',
                },
            ];
            fetchViewDocument({ setIsLoading: viewListShowLoading, userId, extraParams, lessorData });
            resetData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lessorData]);

    const handleTemplateDownLoad = () => {
        showGlobalNotification({ notificationType: 'success', title: 'Success', message: LANGUAGE_EN.GENERAL.DOWNLOAD_START.MESSAGE });
        const filteredTypeData = typeData[PARAM_MASTER.FILE_DOWNLOAD_TMPLT.id].filter((value) => value.key === PARAM_MASTER.LSRCUSTTMPLT.id);
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
            docName: 'Lessor Template',
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

    const handleDownload = (file) => {
        showGlobalNotification({ notificationType: 'success', title: 'Success', message: LANGUAGE_EN.GENERAL.DOWNLOAD_START.MESSAGE });

        if (typeof form.getFieldValue('stateCode') === 'undefined') {
            fetchList({ setIsLoading: listLessorShowLoading, isDataLoaded, userId });
        } else {
            const extraParams = [
                {
                    key: 'stateCode',
                    value: `${form.getFieldValue('stateCode')}`,
                },
            ];
            fetchList({ setIsLoading: listLessorShowLoading, isDataLoaded, userId, extraParams });
        }
    };

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

    const selectProps = {
        optionFilterProp: 'children',
        showSearch: true,
        allowClear: true,
        className: styles.headerSelectField,
    };

    const buttonProps = {
        formData,
        onCloseAction,
        buttonData,
        setButtonData,
        handleButtonClick,
    };

    return (
        <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            {!downloadForm && (
                <>
                    <div className={styles.contentHeaderBackground}>
                        <Space direction="vertical">
                            <Space className={styles.accordianIconWithText}>Lessor Customer Form</Space>
                            <Space>Please download "Lessor Customer Template" using below button</Space>
                            <Space>
                                <Button type="primary" onClick={handleTemplateDownLoad}>
                                    Download Template
                                </Button>
                            </Space>
                        </Space>
                    </div>
                    <Divider className={`${styles.marT20} ${styles.marB20}`} />
                    <Space direction="vertical" style={{ width: '100%' }}>
                        <div className={styles.uploadContainer} style={{ opacity: '100' }}>
                            <Dragger customRequest={handleUpload} {...uploadProps} showUploadList={emptyList}>
                                <Empty
                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                    description={
                                        <>
                                            <Title level={5}>Click or drop your file here to upload</Title>
                                            <Text>File type should be .xlsx and max file size to be 8Mb</Text>
                                        </>
                                    }
                                />
                                <Button className={styles.marB20} type="primary">
                                    Upload Lessor Form
                                </Button>
                            </Dragger>
                        </div>
                    </Space>
                </>
            )}
            {downloadForm && (
                <>
                    <Space direction="vertical" style={{ width: '100%' }}>
                        <Form.Item label="State Name" name="stateCode">
                            <Select placeholder={preparePlaceholderSelect('State Name')} {...selectProps}>
                                {stateData?.map((item) => (
                                    <Option value={item?.key}>{item?.value}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Button type="primary" onClick={handleDownload}>
                            Download
                        </Button>
                    </Space>
                </>
            )}
            <DrawerFormButton {...buttonProps} />
        </Form>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
