/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Row, Col, Space, Form, Select, Button } from 'antd';

import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';
import { PARAM_MASTER } from 'constants/paramMaster';
import { preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { UploadUtil } from 'utils/Upload';

import styles from 'components/common/Common.module.css';

const { Option } = Select;

const AddEditFormMain = (props) => {
    const { resetData, form, formData, onCloseAction, onFinish, onFinishFailed } = props;

    const { buttonData, setButtonData, handleButtonClick } = props;
    const { lessorData, fetchList, typeData, userId, showGlobalNotification } = props;
    const { downloadFile, listShowLoading, downloadForm, isDataLoaded, listLessorShowLoading, stateData } = props;

    const { uploadProps } = props;

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
            downloadFile({ setIsLoading: listShowLoading, userId, extraParams });
            resetData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lessorData]);

    const handleTemplateDownLoad = () => {
        const onSuccessAction = (res) => {
            showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage, placement: 'bottomRight' });
        };

        const onErrorAction = (res) => {
            showGlobalNotification({ notificationType: 'error', title: 'Error', message: res, placement: 'bottomRight' });
        };

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
        downloadFile({ setIsLoading: listShowLoading, userId, extraParams, name, onSuccessAction, onErrorAction });
        resetData();
    };

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleFormFieldChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleDownload = () => {
        const onSuccessAction = (res) => {
            showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage, placement: 'bottomRight' });
        };

        const onErrorAction = (res) => {
            showGlobalNotification({ notificationType: 'error', title: 'Error', message: res, placement: 'bottomRight' });
        };

        if (typeof form.getFieldValue('stateCode') === 'undefined') {
            fetchList({ setIsLoading: listLessorShowLoading, isDataLoaded, userId, onSuccessAction, onErrorAction });
        } else {
            const extraParams = [
                {
                    key: 'stateCode',
                    value: `${form.getFieldValue('stateCode')}`,
                },
            ];
            fetchList({ setIsLoading: listLessorShowLoading, isDataLoaded, userId, extraParams, onSuccessAction, onErrorAction });
        }
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
            <Row gutter={20} className={styles.drawerBody}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
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

                            <UploadUtil {...uploadProps} handleFormValueChange={handleFormValueChange} />
                        </>
                    )}
                    {downloadForm && (
                        <>
                            <Row>
                                <Col xs={24} sm={24} md={24} lg={24}>
                                    <Form.Item label="State Name" name="stateCode">
                                        <Select placeholder={preparePlaceholderSelect('State Name')} {...selectProps}>
                                            {stateData?.map((item) => (
                                                <Option value={item?.key}>{item?.value}</Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>

                                <Button type="primary" onClick={handleDownload}>
                                    Download
                                </Button>
                            </Row>
                        </>
                    )}
                </Col>
            </Row>
            <DrawerFormButton {...buttonProps} />
        </Form>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
