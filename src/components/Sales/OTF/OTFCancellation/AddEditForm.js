/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Row, Col, Input, Form, Select, Card, Descriptions, AutoComplete } from 'antd';
import { FiEye, FiTrash } from 'react-icons/fi';

import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';
import { ProductModelHierarchy } from 'components/utils/ProductModelHierarchy';
import { PARAM_MASTER } from 'constants/paramMaster';

import { preparePlaceholderText, preparePlaceholderSelect, preparePlaceholderAutoComplete } from 'utils/preparePlaceholder';
import { validateRequiredSelectField, validateRequiredInputField } from 'utils/validation';
import { checkAndSetDefaultValue, getStatus } from 'utils/checkAndSetDefaultValue';
import { convertDateTime, dateFormatView } from 'utils/formatDateTime';
import { debounce } from 'utils/debounce';
import { UploadUtil } from 'utils/Upload';
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';

const { TextArea, Search } = Input;

const AddEditFormMain = (props) => {
    const { otfCancellationForm, formData, selectedOrder, fieldNames, onFinishOTFCancellation } = props;
    const { handleButtonClick, buttonData, setButtonData, onCloseAction, handleFormValueChange, typeData, setUploadedFile, showGlobalNotification, viewDocument, setEmptyList } = props;
    const { searchDealerValue, setSearchDealerValue, dealerDataList, productHierarchyData } = props;
    const { uploadedFileName, setUploadedFileName, uploadedFile, parentAppCode, setParentAppCode, resetDealerList,singleDisabled, setSingleDisabled } = props;

    const treeFieldNames = { ...fieldNames, label: fieldNames.title, value: fieldNames.key };
    const [reasonTypeChange, setReasonTypeChange] = useState('');
    const [dealerList, setDealerList] = useState([]);
    const [fileList, setFileList] = useState([]);

    const onDrop = () => {
        return;
    };
    const onDownload = () => {
        showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: translateContent('global.generalMessage.downloadStart') });

        // handlePreview(file?.response);
        let a = document.createElement('a');

        a.href = `data:image/png;base64,${viewDocument?.base64}`;
        a.download = viewDocument?.fileName;
        a.click();
    };

    const uploadProps = {
        messageText: translateContent('bookingManagement.label.uploadCancellationLetter'),
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
        let dealerCd = value.split('-');
        let dealerDetails = Object.values(dealerDataList)?.find((dealer) => dealer?.dealerCode === dealerCd[dealerCd?.length - 1]);
        otfCancellationForm.setFieldsValue({ dealerCode: dealerDetails?.dealerCode });
    };

    useEffect(() => {
        if (searchDealerValue?.length > 2) {
            if (Object.values(dealerDataList)?.length === 0) {
                setDealerList([
                    {
                        value: '',
                        label:translateContent('bookingManagement.label.noDealerFound'),
                        disabled: true, // disable this option
                    },
                ]);
            } else {
                setDealerList(highlightFinalLocatonList(dealerDataList) || []);
            }
        } else {
            setDealerList([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dealerDataList, searchDealerValue]);

    const highlightFinalLocatonList = (data) => {
        if (Object.values(data)?.length === 0) return [];
        else {
            let finalLocations = Object.values(dealerDataList)?.map((item) => {
                return {
                    label: `${item?.dealerName}-${item?.dealerCode}`,
                    value: `${item?.dealerName}-${item?.dealerCode}`,
                };
            });
            return finalLocations;
        }
    };

    const handleSelectTreeClick = (value) => {
        setParentAppCode(value);
        otfCancellationForm.setFieldValue('productCode', value);
    };

    const selectProps = {
        optionFilterProp: 'children',
        showSearch: false,
        allowClear: true,
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

    const singleItemViewProps = {
        ...viewProps,
        column: { xs: 1, sm: 1, lg: 1, xl: 1, xxl: 1 },
    };

    const treeSelectFieldProps = {
        treeFieldNames,
        treeData: productHierarchyData,
        defaultParent: false,
        selectedTreeSelectKey: parentAppCode,
        handleSelectTreeClick,
        defaultValue: null,
        placeholder: preparePlaceholderSelect(translateContent('bookingManagement.placeholder.model')),
        name: 'productCode',
        labelName: 'Product',
    };

    const isLoading = false;
    return (
        <>
            <Form form={otfCancellationForm} data-testid="test" onFinish={onFinishOTFCancellation} layout="vertical" autocomplete="off" colon="false">
                <Row gutter={20} className={styles.drawerBody}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Card className={styles.marB20}>
                            <Descriptions {...viewProps}>
                                <Descriptions.Item label={translateContent('bookingManagement.heading.profileCard.bookingNumber')}>{checkAndSetDefaultValue(selectedOrder?.bookingNumber || selectedOrder?.otfNumber, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('bookingManagement.heading.profileCard.bookingDate')}>{checkAndSetDefaultValue(convertDateTime(selectedOrder?.otfDate, dateFormatView), isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('commonModules.label.bookingCustomerAndBillingCustomer.customerName')}>{checkAndSetDefaultValue(selectedOrder?.customerName, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('bookingManagement.heading.profileCard.mobileNumber')}>{checkAndSetDefaultValue(selectedOrder?.mobileNumber, isLoading)}</Descriptions.Item>
                            </Descriptions>
                            <Descriptions {...singleItemViewProps}>
                                <Descriptions.Item label={translateContent('commonModules.label.vehicleDetails.modelDescription')}>{checkAndSetDefaultValue(selectedOrder?.model, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('bookingManagement.label.orderStatus')}>{getStatus(selectedOrder?.orderStatus)}</Descriptions.Item>
                            </Descriptions>
                        </Card>
                        <Row gutter={20}>
                            <Form.Item name="dealerCode">
                                <Input type="hidden" />
                            </Form.Item>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                <Form.Item name="cancellationReasonType" label={translateContent('bookingManagement.label.cancellationReasonType')} rules={[validateRequiredSelectField(translateContent('bookingManagement.label.cancellationReasonType'))]}>
                                    <Select {...selectProps} placeholder={preparePlaceholderSelect(translateContent('bookingManagement.label.cancellationReasonType'))} onChange={handleCancellationReasonTypeChange} allowClear fieldNames={{ label: 'value', value: 'key' }} options={typeData['OTF_CANCL_REASON_TYPE']}></Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        {reasonTypeChange === PARAM_MASTER.LTC.id && (
                            <Row>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                    <Form.Item name="oemCode" label={translateContent('bookingManagement.label.oemName')} rules={[validateRequiredSelectField(translateContent('bookingManagement.label.oemName'))]}>
                                        <Select {...selectProps} fieldNames={{ label: 'value', value: 'key' }} options={typeData['COMPTR_MFG']} placeholder={preparePlaceholderSelect(translateContent('bookingManagement.label.oemName'))} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        )}

                        {reasonTypeChange === PARAM_MASTER.PROCAN.id && (
                            <Row>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                    {/* <Form.Item name="productCode" label="Product" rules={[validateRequiredSelectField('product')]}>
                                        <TreeSelectField {...treeSelectFieldProps} />
                                    </Form.Item> */}
                                    <ProductModelHierarchy {...treeSelectFieldProps} />
                                </Col>
                            </Row>
                        )}

                        {reasonTypeChange === PARAM_MASTER.LOMMD.id && (
                            <Row>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                    <Form.Item name="dealerName" label={translateContent('bookingManagement.label.findDealerName')} rules={[validateRequiredSelectField(translateContent('bookingManagement.label.dealerName'))]}>
                                        <AutoComplete label={translateContent('bookingManagement.label.findDealerName')} options={dealerList} backfill={false} onSelect={handleSelect} onSearch={onSearchDealer} allowSearch>
                                            <Search allowClear placeholder={preparePlaceholderAutoComplete(translateContent('bookingManagement.placeholder.searchDealerName'))} />
                                        </AutoComplete>
                                    </Form.Item>
                                </Col>
                            </Row>
                        )}

                        <Row>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                <Form.Item name="reasonForCancellation" label={translateContent('bookingManagement.label.reasonForCancellation')} rules={[validateRequiredSelectField(translateContent('bookingManagement.label.reasonForCancellation'))]}>
                                    <Select {...selectProps} fieldNames={{ label: 'value', value: 'key' }} options={typeData[reasonTypeChange]} placeholder={preparePlaceholderSelect(translateContent('bookingManagement.label.reasonForCancellation'))} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.textareaError}>
                                <Form.Item name="cancellationRemark" label={translateContent('bookingManagement.label.cancellationRemark')} rules={[validateRequiredInputField(translateContent('bookingManagement.label.cancellationRemark'))]}>
                                    <TextArea maxLength={300} placeholder={preparePlaceholderText(translateContent('bookingManagement.label.cancellationRemark'))} showCount />
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
