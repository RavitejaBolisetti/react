/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Row, Col, Input, Form, Select, Card, Descriptions, Upload, Button, Empty } from 'antd';

import styles from 'components/common/Common.module.css';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';

import { validateRequiredInputField, validateRequiredSelectField, validateNumberWithTwoDecimalPlaces } from 'utils/validation';
import Svg from 'assets/images/Filter.svg';
import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';

import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';

import { FiEye, FiTrash } from 'react-icons/fi';

const { Search } = Input;
const { Dragger } = Upload;

const AddEditFormMain = (props) => {
    const { formData, form, isLoading } = props;
    const { handleButtonClick, buttonData, setButtonData, onCloseAction, handleFormValueChange, typeData, userId, uploadDocumentFile, setUploadedFile, listShowLoading, showGlobalNotification, viewDocument, handlePreview, emptyList, setEmptyList } = props;

    const [showStatus, setShowStatus] = useState('');
    const [cancelForm] = Form.useForm();

    const onDrop = (e) => {};

    const onDownload = (file) => {
        showGlobalNotification({ notificationType: 'success', title: 'Success', message: 'Your download will start soon' });

        handlePreview(file?.response);
        let a = document.createElement('a');

        a.href = `data:image/png;base64,${viewDocument?.base64}`;
        a.download = viewDocument?.fileName;
        a.click();
    };

    const uploadProps = {
        multiple: false,
        accept: 'image/png, image/jpeg, application/pdf',
        showUploadList: {
            showRemoveIcon: true,
            showDownloadIcon: true,
            removeIcon: <FiTrash />,
            downloadIcon: <FiEye onClick={(e) => onDownload(e)} style={{ color: '#ff3e5b' }} />,
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

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 2, lg: 2, xl: 2, xxl: 2 },
    };

    return (
        <>
            <Card className={styles.ExchangeCard}>
                <Descriptions {...viewProps}>
                    <Descriptions.Item label="OTF No.">{checkAndSetDefaultValue(formData?.customerId, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="OTF Date">{checkAndSetDefaultValue(formData?.customerName, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Customer Name">{checkAndSetDefaultValue(formData?.make, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Mobile No.">{checkAndSetDefaultValue(formData?.modelGroup, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Model">{checkAndSetDefaultValue(formData?.variant, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Order Status">{checkAndSetDefaultValue(formData?.oldRegistrationNumber, isLoading)}</Descriptions.Item>
                </Descriptions>
            </Card>
            <Form form={cancelForm} layout="vertical" autocomplete="off" colon="false">
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Form.Item name="reasonType" label="Cancellation Reason Type" initialValue={formData?.reasonType} rules={[validateRequiredSelectField('Reason Type')]}>
                            <Select
                                {...selectProps}
                                placeholder="Select"
                                // loading={isConfigLoading}
                                allowClear
                                fieldNames={{ label: 'value', value: 'key' }}
                                options={typeData['REL_TYPE']}
                            ></Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Form.Item name="oemName" label="OEM Name" initialValue={formData?.oemName} rules={[validateRequiredSelectField('OEM Name')]}>
                            <Select
                                {...selectProps}
                                style={{
                                    width: '100%',
                                }}
                                // loading={isConfigLoading}
                                options={typeData['MONTH']}
                                placeholder={preparePlaceholderSelect('OEM Name')}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Form.Item name="product" label="Product" initialValue={formData?.product} rules={[validateRequiredSelectField('product')]}>
                            <Select
                                {...selectProps}
                                style={{
                                    width: '100%',
                                }}
                                // loading={isConfigLoading}
                                options={typeData['MONTH']}
                                placeholder={preparePlaceholderSelect('Product')}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Form.Item name="findDealerName" label="Find Dealer Name" initialValue={formData?.findDealerName} rules={[validateRequiredSelectField('Find Dealer Name')]}>
                            <Input placeholder={preparePlaceholderText('Find Dealer Name')} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Form.Item name="reasonForCancellation" label="Reason For Cancellation" initialValue={formData?.reasonForCancellation} rules={[validateRequiredSelectField('Reason For Cancellation')]}>
                            <Select
                                {...selectProps}
                                style={{
                                    width: '100%',
                                }}
                                // loading={isConfigLoading}
                                options={typeData['MONTH']}
                                placeholder={preparePlaceholderSelect('Reason For Cancellation')}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Form.Item name="remarks" label="Cancellation Remarks" initialValue={formData?.remarks} >
                            <Input placeholder={preparePlaceholderText('Cancellation Remarks')} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <div className={styles.uploadContainer} style={{ opacity: '100' }}>
                            <Dragger customRequest={handleUpload} {...uploadProps} showUploadList={emptyList}>
                                <div>
                                    <img src={Svg} alt="" />
                                </div>
                                <Empty
                                    description={
                                        <>
                                            <span>Upload Cancellation Letter</span>
                                            <span>
                                                <br />
                                                File type should be png, jpg or pdf and max file size to be 5Mb
                                            </span>
                                        </>
                                    }
                                />

                                <Button type="primary">Upload File</Button>
                            </Dragger>
                        </div>
                    </Col>
                </Row>
                <DrawerFormButton {...buttonProps} />
            </Form>
        </>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
