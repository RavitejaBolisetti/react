/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState, useMemo } from 'react';
import { Row, Col, Input, Form, Select, Card, Descriptions, AutoComplete } from 'antd';
import { FiEye, FiTrash } from 'react-icons/fi';

import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';
import TreeSelectField from 'components/common/TreeSelectField';
import { productHierarchyData } from './ProductHierarchyJSON';
import { PARAM_MASTER } from 'constants/paramMaster';

import { preparePlaceholderText, preparePlaceholderSelect, preparePlaceholderAutoComplete } from 'utils/preparePlaceholder';
import { validateRequiredSelectField, validateRequiredInputField } from 'utils/validation';
import { checkAndSetDefaultValue, getStatus } from 'utils/checkAndSetDefaultValue';
import { convertDateTime } from 'utils/formatDateTime';
import { debounce } from 'utils/debounce';
import { UploadUtil } from 'utils/Upload';

import styles from 'components/common/Common.module.css';

const { TextArea, Search } = Input;

const AddEditFormMain = (props) => {
    const { otfCancellationForm, formData, selectedOrder, fieldNames, onFinishOTFCancellation } = props;
    const { handleButtonClick, buttonData, setButtonData, onCloseAction, handleFormValueChange, typeData, setUploadedFile, showGlobalNotification, viewDocument, setEmptyList } = props;
    const { searchDealerValue, setSearchDealerValue, dealerDataList } = props;
    const { uploadedFileName, setUploadedFileName, uploadedFile, parentAppCode, setparentAppCode, resetDealerList } = props;

    const treeFieldNames = { ...fieldNames, label: fieldNames.title, value: fieldNames.key };
    const [reasonTypeChange, setReasonTypeChange] = useState('');
    const [dealerList, setDealerList] = useState([]);
    const [fileList, setFileList] = useState([]);
    const [singleDisabled, setSingleDisabled] = useState(false);

    const onDrop = (e) => {};
    const onDownload = (file) => {
        showGlobalNotification({ notificationType: 'success', title: 'Success', message: 'Your download will start soon' });

        // handlePreview(file?.response);
        let a = document.createElement('a');

        a.href = `data:image/png;base64,${viewDocument?.base64}`;
        a.download = viewDocument?.fileName;
        a.click();
    };

    const uploadProps = {
        messageText: 'Upload Cancellation Letter',
        fileList,
        setFileList,
        setEmptyList,
        multiple: false,
        supportedFileTypes: ['image/png', 'image/jpeg', 'application/pdf'],
        maxSize: 5,
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
        uploadedFile,
        setUploadedFile,
        uploadedFileName,
        setUploadedFileName,
        single: true,
        singleDisabled,
        setSingleDisabled,
        isReplaceEnabled: false,
    };

    const handleCancellationReasonTypeChange = (value) => {
        setReasonTypeChange(value);
        otfCancellationForm.resetFields(['dealerCode', 'oemCode', 'productCode', 'dealerName', 'cancellationRemark', 'reasonForCancellation']);
        setUploadedFile('');
        setFileList([]);
        setDealerList([]);
        resetDealerList();
        setSearchDealerValue('');
    };

    const onSearchDealer = debounce(function (text) {
        setSearchDealerValue(text?.trim());
    }, 300);

    const handleSelect = (value) => {
        let dealerDetails = Object.values(dealerDataList)?.find((dealer) => dealer?.dealerName === value);
        otfCancellationForm.setFieldsValue({ dealerCode: dealerDetails?.dealerCode });
    };

    useEffect(() => {
        if (searchDealerValue?.length > 2) {
            if (Object.values(dealerDataList)?.length == 0) {
                setDealerList([
                    {
                        value: '',
                        label: 'No Dealer Found',
                        disabled: true, // disable this option
                    },
                ]);
            } else setDealerList(highlightFinalLocatonList(dealerDataList) || []);
        } else {
            setDealerList([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dealerDataList, searchDealerValue]);

    const highlightFinalLocatonList = useMemo(() => (data) => {
        if (Object.values(data)?.length === 0) return [];
        else {
            let finalLocations = Object.values(dealerDataList)?.map((item) => {
                return {
                    label: item?.dealerName,
                    value: item?.dealerName,
                };
            });
            return finalLocations;
        }
    });

    const handleSelectTreeClick = (value) => {
        setparentAppCode(value);
        otfCancellationForm.setFieldValue('productCode', value);
    };

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
        defaultParent: false,
        selectedTreeSelectKey: parentAppCode,
        handleSelectTreeClick,
        defaultValue: null,
        placeholder: preparePlaceholderSelect('Parent'),
    };

    const isLoading = false;
    return (
        <>
            <Form form={otfCancellationForm} data-testid="test" onFinish={onFinishOTFCancellation} layout="vertical" autocomplete="off" colon="false">
                <Row gutter={20} className={styles.drawerBody}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Card className={styles.ExchangeCard}>
                            <Descriptions {...viewProps}>
                                <Descriptions.Item label="OTF No.">{checkAndSetDefaultValue(selectedOrder?.otfNumber, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="OTF Date">{checkAndSetDefaultValue(convertDateTime(selectedOrder?.otfDate, 'DD MMM YYYY'), isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Customer Name">{checkAndSetDefaultValue(selectedOrder?.customerName, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Mobile No.">{checkAndSetDefaultValue(selectedOrder?.mobileNumber, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Model">{checkAndSetDefaultValue(selectedOrder?.model, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Order Status">{getStatus(selectedOrder?.orderStatus)}</Descriptions.Item>
                            </Descriptions>
                        </Card>
                        <Row gutter={20}>
                            <Form.Item name="dealerCode">
                                <Input type="hidden" />
                            </Form.Item>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                <Form.Item name="cancellationReasonType" label="Cancellation Reason Type" rules={[validateRequiredSelectField('Reason Type')]}>
                                    <Select {...selectProps} placeholder={preparePlaceholderSelect('Cancellation Reason Type')} onChange={handleCancellationReasonTypeChange} allowClear fieldNames={{ label: 'value', value: 'key' }} options={typeData['OTF_CANCL_REASON_TYPE']}></Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        {reasonTypeChange === PARAM_MASTER.LTC.id && (
                            <Row>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                    <Form.Item name="oemCode" label="OEM Name" rules={[validateRequiredSelectField('OEM Name')]}>
                                        <Select {...selectProps} fieldNames={{ label: 'value', value: 'key' }} options={typeData['COMPTR_MFG']} placeholder={preparePlaceholderSelect('OEM Name')} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        )}

                        {reasonTypeChange === PARAM_MASTER.PROCAN.id && (
                            <Row>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                    <Form.Item name="productCode" label="Product" rules={[validateRequiredSelectField('product')]}>
                                        <TreeSelectField {...treeSelectFieldProps} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        )}

                        {reasonTypeChange === PARAM_MASTER.LOMMD.id && (
                            <Row>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.inputAutFillWrapper}>
                                    <Form.Item name="dealerName" label="Find Dealer Name" rules={[validateRequiredSelectField('Dealer Name')]}>
                                        <AutoComplete label="Find Dealer Name" options={dealerList} backfill={false} onSelect={handleSelect} onSearch={onSearchDealer} allowSearch>
                                            <Search allowClear placeholder={preparePlaceholderAutoComplete(' / Search Dealer Name')} />
                                        </AutoComplete>
                                    </Form.Item>
                                </Col>
                            </Row>
                        )}

                        <Row>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                <Form.Item name="reasonForCancellation" label="Reason For Cancellation" rules={[validateRequiredSelectField('Reason For Cancellation')]}>
                                    <Select {...selectProps} fieldNames={{ label: 'value', value: 'key' }} options={typeData[reasonTypeChange]} placeholder={preparePlaceholderSelect('Reason For Cancellation')} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                <Form.Item name="cancellationRemark" label="Cancellation Remarks" rules={[validateRequiredInputField('Cancellation Remarks')]}>
                                    <TextArea maxLength={300} placeholder={preparePlaceholderText('Cancellation Remarks')} showCount />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <UploadUtil {...uploadProps} handleFormValueChange={handleFormValueChange} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <DrawerFormButton {...buttonProps} />
            </Form>
        </>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
