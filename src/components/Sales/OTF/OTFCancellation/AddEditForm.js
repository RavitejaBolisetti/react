/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState, useMemo } from 'react';
import { Row, Col, Input, Form, Select, Card, Descriptions, Upload, Button, Empty, AutoComplete } from 'antd';

import styles from 'components/common/Common.module.css';
import { convertDateTime } from 'utils/formatDateTime';
import { preparePlaceholderText, preparePlaceholderSelect, preparePlaceholderAutoComplete } from 'utils/preparePlaceholder';
import { validateRequiredSelectField } from 'utils/validation';
import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import TreeSelectField from 'components/common/TreeSelectField';
import { debounce } from 'utils/debounce';

import { FiEye, FiTrash } from 'react-icons/fi';
import Svg from 'assets/images/Filter.svg';

const { TextArea } = Input;
const { Dragger } = Upload;

const AddEditFormMain = (props) => {
    const { otfTransferForm, formData, otfData, selectedOrder, fieldNames, productHierarchyData, onFinishOTFCancellation } = props;
    const { handleButtonClick, buttonData, setButtonData, onCloseAction, handleFormValueChange, typeData, userId, uploadDocumentFile, setUploadedFile, listShowLoading, showGlobalNotification, viewDocument, handlePreview, emptyList, setEmptyList } = props;
    const { searchDealerValue, setSearchDealerValue, dealerDataList } = props;

    const treeFieldNames = { ...fieldNames, label: fieldNames.title, value: fieldNames.key };
    const [showStatus, setShowStatus] = useState('');
    const [reasonTypeChange, setReasonTypeChange] = useState('');
    const [dealerList, setDealerList] = useState([]);

    const onDrop = (e) => {};
    const onDownload = (file) => {
        showGlobalNotification({ notificationType: 'success', title: 'Success', message: 'Your download will start soon' });

        // handlePreview(file?.response);
        let a = document.createElement('a');

        a.href = `data:image/png;base64,${viewDocument?.base64}`;
        a.download = viewDocument?.fileName;
        a.click();
    };
    console.log('typeData', typeData);
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
            // handleFormValueChange();
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

    const handleCancellationReasonTypeChange = (value) => {
        setReasonTypeChange(value);
    };

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

    const onSearchDealer = debounce(function (text) {
        setSearchDealerValue(text?.trim());
    }, 300);

    const handleSelect = (value) => {};

    useEffect(() => {
        if (!searchDealerValue?.length > 2) {
            setDealerList([]);
        } else {
            setDealerList(highlightFinalLocatonList(dealerDataList) || []);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dealerDataList, searchDealerValue]);

    const highlightFinalLocatonList = useMemo(
        () => (data) => {
            if (data?.length < 1) return [];
            let finalLocations = data?.map((item) => {
                const index = item?.dealerName?.toLowerCase().indexOf(searchDealerValue);
                const beforeStr = item?.dealerName?.substring(0, index);
                const afterStr = item?.dealerName?.slice(index + searchDealerValue?.length);
                let locatonName =
                    index > -1 ? (
                        <span>
                            {beforeStr}
                            <span className="site-tree-search-value" style={{ color: 'red' }}>
                                {/* {searchString} */}
                                {item?.dealerName?.substring(index, index + searchDealerValue?.length)}
                            </span>
                            {afterStr}
                        </span>
                    ) : (
                        <span>{item?.dealerName}</span>
                    );
                return {
                    value: item?.dealerName,
                    label: locatonName,
                };
            });
            return finalLocations;
        },
        [searchDealerValue]
    );

    const selectProps = {
        optionFilterProp: 'children',
        showSearch: false,
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

    const treeSelectFieldProps = {
        treeFieldNames,
        treeData: productHierarchyData,
        //treeDisabled: treeCodeReadOnly || isReadOnly,
        //selectedTreeSelectKey,
        //handleSelectTreeClick,
        //defaultValue: treeCodeId,
        placeholder: preparePlaceholderSelect('Parent'),
    };

    const isLoading = false;
    return (
        <>
            <Card className={styles.ExchangeCard}>
                <Descriptions {...viewProps}>
                    <Descriptions.Item label="OTF No.">{checkAndSetDefaultValue(otfData?.otfNumber, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="OTF Date">{checkAndSetDefaultValue(convertDateTime(selectedOrder?.otfDate, 'DD MMM YYYY'), isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Customer Name">{checkAndSetDefaultValue(selectedOrder?.customerName, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Mobile No.">{checkAndSetDefaultValue(selectedOrder?.mobileNumber, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Model">{checkAndSetDefaultValue(selectedOrder?.model, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Order Status">{checkAndSetDefaultValue(selectedOrder?.orderStatus, isLoading)}</Descriptions.Item>
                </Descriptions>
            </Card>
            <Form form={otfTransferForm} onFinish={onFinishOTFCancellation} layout="vertical" autocomplete="off" colon="false">
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Form.Item name="reasonType" label="Cancellation Reason Type" initialValue={formData?.reasonType} rules={[validateRequiredSelectField('Reason Type')]}>
                            <Select
                                {...selectProps}
                                placeholder="Select"
                                onChange={handleCancellationReasonTypeChange}
                                // loading={isConfigLoading}
                                allowClear
                                fieldNames={{ label: 'value', value: 'key' }}
                                options={typeData['OTF_CANCL_REASON_TYPE']}
                            ></Select>
                        </Form.Item>
                    </Col>
                </Row>
                {reasonTypeChange === 'LTC' && (
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <Form.Item name="oemName" label="OEM Name" initialValue={formData?.oemName} rules={[validateRequiredSelectField('OEM Name')]}>
                                <Select
                                    {...selectProps}
                                    style={{
                                        width: '100%',
                                    }}
                                    fieldNames={{ label: 'value', value: 'key' }}
                                    options={typeData['OEM_CODE']}
                                    placeholder={preparePlaceholderSelect('OEM Name')}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                )}

                {reasonTypeChange === 'PRDCH' && (
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <Form.Item name="product" label="Product" initialValue={formData?.product} rules={[validateRequiredSelectField('product')]}>
                                <TreeSelectField {...treeSelectFieldProps} />
                            </Form.Item>
                        </Col>
                    </Row>
                )}

                {reasonTypeChange === 'LOMMD' && (
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <AutoComplete options={dealerList} backfill={false} onSelect={handleSelect} onSearch={onSearchDealer} allowSearch notFoundContent="No Dealer found">
                                <Input.Search size="large" allowClear placeholder={preparePlaceholderAutoComplete('')} />
                            </AutoComplete>
                        </Col>
                    </Row>
                )}

                <Row>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Form.Item name="reasonForCancellation" label="Reason For Cancellation" initialValue={formData?.reasonForCancellation} rules={[validateRequiredSelectField('Reason For Cancellation')]}>
                            <Select
                                {...selectProps}
                                style={{
                                    width: '100%',
                                }}
                                // loading={isConfigLoading}
                                options={typeData['DLR_OTF_CANC_RSN']}
                                placeholder={preparePlaceholderSelect('Reason For Cancellation')}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Form.Item name="remarks" label="Cancellation Remarks" initialValue={formData?.remarks}>
                            <TextArea placeholder={preparePlaceholderText('Cancellation Remarks')} />
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
                                            <span>
                                                Click or drop your file here to upload the signed and <br />
                                                scanned customer form.
                                            </span>
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
