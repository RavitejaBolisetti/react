/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Form } from 'antd';

import { customerDetailsIndividualDataActions } from 'store/actions/data/customerMaster/customerDetailsIndividual';
import { corporateDataActions } from 'store/actions/data/customerMaster/corporate';
import { showGlobalNotification } from 'store/actions/notification';
import { ViewDetail } from './ViewDetail';
import { AddEditForm } from './AddEditForm';
import { CustomerFormButton } from '../../CustomerFormButton';

import styles from 'components/common/Common.module.css';
import { documentViewDataActions } from 'store/actions/data/customerMaster/documentView';
import { supportingDocumentDataActions } from 'store/actions/data/supportingDocument';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            CustomerMaster: {
                CustomerDetailsIndividual: { isLoaded: isDataLoaded = false, isLoading, data },
                Corporate: { isFilteredListLoaded: isCorporateLovDataLoaded = false, isLoading: isCorporateLovLoading, filteredListData: corporateLovData },
                ViewDocument: { isLoaded: isViewDataLoaded = false, data: viewDocument },
            },
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            SupportingDocument: { isLoaded: isSupportingDocumentDataLoaded = false, isSupportingDocumentLoading, data: supportingData },
        },
    } = state;

    let returnValue = {
        userId,
        isDataLoaded,
        isLoading,
        data,
        typeData,
        isSupportingDocumentLoading,
        isSupportingDocumentDataLoaded,
        supportingData,
        isViewDataLoaded,
        viewDocument,
        isCorporateLovDataLoaded,
        isCorporateLovLoading,
        corporateLovData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchCorporateLovList: corporateDataActions.fetchFilteredList,
            listCorporateLovShowLoading: corporateDataActions.listShowLoading,

            fetchViewDocument: documentViewDataActions.fetchList,
            viewListShowLoading: documentViewDataActions.listShowLoading,
            fetchSupportingDocumentList: supportingDocumentDataActions.fetchList,
            uploadDocumentFile: supportingDocumentDataActions.uploadFile,
            downloadFile: supportingDocumentDataActions.downloadFile,
            listSupportingDocumentShowLoading: supportingDocumentDataActions.listShowLoading,

            fetchList: customerDetailsIndividualDataActions.fetchList,
            listShowLoading: customerDetailsIndividualDataActions.listShowLoading,
            saveData: customerDetailsIndividualDataActions.saveData,
            resetData: customerDetailsIndividualDataActions.reset,

            showGlobalNotification,
        },
        dispatch
    ),
});

const CustomerDetailMasterBase = (props) => {
    const { typeData, fetchCorporateLovList, isCorporateLovDataLoaded, listCorporateLovShowLoading, corporateLovData } = props;
    const { userId, showGlobalNotification, section, fetchList, listShowLoading, isDataLoaded, data, saveData, isLoading, resetData, form, handleFormValueChange, onFinishFailed } = props;
    const { selectedCustomer, setSelectedCustomer, selectedCustomerId, setSelectedCustomerId } = props;
    const { buttonData, setButtonData, formActionType, setFormActionType, handleButtonClick, NEXT_ACTION } = props;
    const { fetchViewDocument, viewListShowLoading, listSupportingDocumentShowLoading, isSupportingDocumentDataLoaded, supportingData, isViewDataLoaded, viewDocument } = props;

    const [showForm, setShowForm] = useState(false);
    const [emptyList, setEmptyList] = useState(true);
    const [fileList, setFileList] = useState([]);
    const [uploadedFileName, setUploadedFileName] = useState('');
    const [uploadedFile, setUploadedFile] = useState();
    const [formData, setFormData] = useState();
    const [uploadImgDocId, setUploadImgDocId] = useState('');
    const [supportingDataView, setSupportingDataView] = useState();

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
    };

    useEffect(() => {
        if (isDataLoaded) {
            form.setFieldsValue({ ...data });
            setFormData(data);
        }
        return () => {
            resetData();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded]);

    useEffect(() => {
        if (userId && !isCorporateLovDataLoaded) {
            fetchCorporateLovList({ setIsLoading: listCorporateLovShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isCorporateLovDataLoaded]);

    useEffect(() => {
        if (userId && selectedCustomerId) {
            const extraParams = [
                {
                    key: 'customerId',
                    title: 'customerId',
                    value: selectedCustomerId,
                    name: 'Customer ID',
                },
            ];
            fetchList({ setIsLoading: listShowLoading, userId, extraParams, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedCustomerId]);
    useEffect(() => {
        if (viewDocument && isViewDataLoaded) {
            let a = document.createElement('a');
            a.href = `data:image/png;base64,${viewDocument?.base64}`;
            a.download = viewDocument?.fileName;
            a.click();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isViewDataLoaded, viewDocument]);
    const downloadFileFromButton = (uploadData) => {
        showGlobalNotification({ notificationType: 'success', title: 'Success', message: 'Your download will start soon' });
        const extraParams = [
            {
                key: 'docId',
                title: 'docId',
                value: uploadData?.docId,
                name: 'docId',
            },
        ];
        const supportingDocument = uploadData?.documentName;
        fetchViewDocument({ setIsLoading: viewListShowLoading, userId, extraParams, supportingDocument });
    };
    const deleteFile = (uploadData) => {
        const data = { customerId: uploadData?.customerId, status: false, docId: uploadData?.docId, documentTypeId: uploadData?.documentType, id: uploadData?.id, documentName: uploadData?.documentName };
        const onSuccess = (res) => {
            showGlobalNotification({ notificationType: 'success', title: 'Success', message: 'File deleted Successfully' });
            fetchList({ setIsLoading: listSupportingDocumentShowLoading, userId });
        };

        const onError = (message) => {
            showGlobalNotification({ message });
        };
        const requestData = {
            data: data,
            method: 'post',
            setIsLoading: listSupportingDocumentShowLoading,
            userId,
            onError,
            onSuccess,
        };

        saveData(requestData);
    };
    const downloadFileFromList = () => {
        showGlobalNotification({ notificationType: 'success', title: 'Success', message: 'Your download will start soon' });
        const extraParams = [
            {
                key: 'docId',
                title: 'docId',
                value: uploadedFile,
                name: 'docId',
            },
        ];
        const supportingDocument = uploadedFileName;
        fetchViewDocument({ setIsLoading: viewListShowLoading, userId, extraParams, supportingDocument });
    };

    const onFinish = (values) => {
        setFileList([]);
        setEmptyList(false);
        setUploadedFile();
        const data = { ...values, customerId: selectedCustomer?.customerId, status: true, docId: uploadedFile, documentTypeId: form.getFieldValue('documentTypeId') };

        const onSuccess = (res) => {
            form.resetFields();
            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, userId });
            setButtonData({ ...buttonData, formBtnActive: false });

            if (res.data) {
                handleButtonClick({ record: res?.data, buttonAction: NEXT_ACTION });
                setSelectedCustomer({ ...res.data, customerName: res?.data?.firstName + ' ' + res?.data?.middleName + ' ' + res?.data?.lastName });
                setSelectedCustomerId(res?.data?.customerId);
            }
        };

        const onError = (message) => {
            showGlobalNotification({ message });
        };

        const requestData = {
            data: data,
            method: formActionType?.editMode ? 'put' : 'post',
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
        };

        saveData(requestData);
    };

    const handlePreview = (selectedDocument) => {
        const extraParams = [
            {
                key: 'docId',
                title: 'docId',
                value: selectedDocument?.docId,
                name: 'docId',
            },
        ];
        fetchViewDocument({ setIsLoading: viewListShowLoading, userId, extraParams, selectedDocument });
        setSupportingDataView(supportingData);
    };

    const formProps = {
        ...props,
        formActionType,
        form,
        onFinish,
        saveData,
        corporateLovData,
        setFormActionType,
        onFinishFailed,
        handleButtonClick,
        showForm,
        fetchCorporateLovList,
        setShowForm,
        setUploadImgDocId,
        uploadImgDocId,
        setButtonData,
        typeData,
        formData,
        isSupportingDocumentDataLoaded,
        supportingData,
        isViewDataLoaded,
        viewDocument,
        setUploadedFile,
        downloadFileFromButton,
        deleteFile,
        downloadFileFromList,
        setUploadedFileName,
        setFileList,
        fileList,
        setEmptyList,
        emptyList,
        handlePreview,
        supportingDataView,
        setSupportingDataView,
    };

    const viewProps = {
        ...formProps,
        formActionType,
        formData,
        styles,
        isLoading,
    };

    return (
        <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormValueChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <h2>{section?.title}</h2>
                    {formActionType?.viewMode ? <ViewDetail {...viewProps} /> : <AddEditForm {...formProps} />}
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <CustomerFormButton {...props} />
                </Col>
            </Row>
        </Form>
    );
};
export const CustomerDetailMaster = connect(mapStateToProps, mapDispatchToProps)(CustomerDetailMasterBase);
