/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState, useMemo } from 'react';
import { Row, Col, Input, Form, Select, Card, Descriptions, Upload, AutoComplete } from 'antd';

import styles from 'components/common/Common.module.css';
import style from '../../../common/LeftSideBar/LeftSideBar.module.css';
import { convertDateTime } from 'utils/formatDateTime';
import { preparePlaceholderText, preparePlaceholderSelect, preparePlaceholderAutoComplete } from 'utils/preparePlaceholder';
import { validateRequiredSelectField, validateRequiredInputField } from 'utils/validation';
import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';
import { checkAndSetDefaultValue, getStatus } from 'utils/checkAndSetDefaultValue';
import TreeSelectField from 'components/common/TreeSelectField';
import { debounce } from 'utils/debounce';
import { productHierarchyData } from './ProductHierarchyJSON';
import { UploadUtil } from 'utils/Upload';
import { PARAM_MASTER } from 'constants/paramMaster';

import { FiEye, FiTrash } from 'react-icons/fi';

const { TextArea, Search } = Input;

const AddEditFormMain = (props) => {
    const { otfCancellationForm, formData, otfData, selectedOrder, fieldNames, onFinishOTFCancellation, selectedTreeSelectKey, treeCodeId } = props;
    const { handleButtonClick, buttonData, setButtonData, onCloseAction, handleFormValueChange, typeData, userId, uploadDocumentFile, setUploadedFile, listShowLoading, showGlobalNotification, viewDocument, setEmptyList } = props;
    const { searchDealerValue, setSearchDealerValue, dealerDataList } = props;
    const { uploadedFileName, setUploadedFileName, uploadedFile, parentAppCode, setparentAppCode } = props;

    const treeFieldNames = { ...fieldNames, label: fieldNames.title, value: fieldNames.key };
    const [showStatus, setShowStatus] = useState('');
    const [reasonTypeChange, setReasonTypeChange] = useState('');
    const [dealerList, setDealerList] = useState([]);
    const [fileList, setFileList] = useState([]);

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
        supportedFileTypes : ['image/png', 'image/jpeg', 'application/pdf'],
        maxSize : 5,
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
        otfCancellationForm.setFieldsValue({dealerCode:'', oemCode:'', productCode:'', dealerName:'', reasonForCancellation:'', cancellationRemark:''});
        setUploadedFile('');
        setFileList([]);
    };

    const onSearchDealer = debounce(function (text) {
        setSearchDealerValue(text?.trim());
    }, 300);

    const handleSelect = (value) => {
        let dealerDetails = dealerDataList?.find((dealer) => dealer?.dealerName === value);
        otfCancellationForm.setFieldsValue({ dealerCode: dealerDetails?.dealerCode });
    };

    useEffect(() => {
        if (!(searchDealerValue?.length > 2)) {
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
                    label: item?.dealerName,
                    value: item?.dealerName,
                };
            });
            return finalLocations;
        },
        [searchDealerValue]
    );

    const handleSelectTreeClick = (value) => {
        setparentAppCode(value);
        otfCancellationForm.setFieldsValue({ productCode: value });
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
        //treeDisabled: treeCodeReadOnly || isReadOnly,
        selectedTreeSelectKey: parentAppCode,
        handleSelectTreeClick,
        //defaultValue: treeCodeId,
        placeholder: preparePlaceholderSelect('Parent'),
    };

    const isLoading = false;
    return (
        <>
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
            <Form form={otfCancellationForm} onFinish={onFinishOTFCancellation} layout="vertical" autocomplete="off" colon="false">
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
                                <Select
                                    {...selectProps}
                                    style={{
                                        width: '100%',
                                    }}
                                    fieldNames={{ label: 'value', value: 'key' }}
                                    options={typeData['COMPTR_MFG']}
                                    placeholder={preparePlaceholderSelect('OEM Name')}
                                />
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
                                <AutoComplete label="Find Dealer Name" options={dealerList} backfill={false} onSelect={handleSelect} onSearch={onSearchDealer} allowSearch notFoundContent="No Dealer found">
                                    <Search allowClear placeholder={preparePlaceholderAutoComplete(' / Search Dealer Name')} />
                                </AutoComplete>
                            </Form.Item>
                        </Col>
                    </Row>
                )}

                <Row>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Form.Item name="reasonForCancellation" label="Reason For Cancellation" rules={[validateRequiredSelectField('Reason For Cancellation')]}>
                            <Select
                                {...selectProps}
                                style={{
                                    width: '100%',
                                }}
                                fieldNames={{ label: 'value', value: 'key' }}
                                options={typeData[reasonTypeChange]}
                                placeholder={preparePlaceholderSelect('Reason For Cancellation')}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Form.Item name="cancellationRemark" label="Cancellation Remarks" rules={[validateRequiredInputField('Cancellation Remarks')]}>
                            <TextArea placeholder={preparePlaceholderText('Cancellation Remarks')} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <UploadUtil {...uploadProps} handleFormValueChange={handleFormValueChange} />
                    </Col>
                </Row>
                <DrawerFormButton {...buttonProps} />
            </Form>
        </>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
