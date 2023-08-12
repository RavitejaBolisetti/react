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
import { STATUS } from '../statusConstant';

import styles from 'components/common/Common.module.css';
import { documentViewDataActions } from 'store/actions/data/customerMaster/documentView';
import { supportingDocumentDataActions } from 'store/actions/data/supportingDocument';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            CustomerMaster: {
                CustomerDetailsIndividual: { isLoaded: isDataLoaded = false, isLoading, data },
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

const CustomerNameChangeMasterBase = (props) => {
    const { setRefreshCustomerList, typeData } = props;
    const { formData, userId, showGlobalNotification, fetchList, listShowLoading, data, saveData, isLoading, resetData, form, handleFormValueChange, onFinishFailed } = props;
    const { selectedCustomer, selectedCustomerId, setSelectedCustomerId } = props;
    const { buttonData, setButtonData, formActionType, setFormActionType, handleButtonClick, NEXT_ACTION } = props;
    const { fetchViewDocument, viewListShowLoading, listSupportingDocumentShowLoading, isSupportingDocumentDataLoaded, supportingData, isViewDataLoaded, viewDocument } = props;

    const [showForm, setShowForm] = useState(false);
    const [status, setStatus] = useState(null);
    const [emptyList, setEmptyList] = useState(true);
    const [nameChangeRequestform] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const [uploadedFileName, setUploadedFileName] = useState('');
    const [editedMode, setEditedMode] = useState(false);
    const [uploadedFile, setUploadedFile] = useState();
    const [uploadImgDocId, setUploadImgDocId] = useState('');
    const [customerNameList, setCustomerNameList] = useState({});
    const [supportingDataView, setSupportingDataView] = useState();
    const [isHistoryVisible, setIsHistoryVisible] = useState(false);
    const [activeKey, setActiveKey] = useState([]);

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
    };

    useEffect(() => {
        if (data?.pendingNameChangeRequest === null) {
            setCustomerNameList({
                titleCode: data?.titleCode,
                firstName: data?.firstName,
                middleName: data?.middleName,
                lastName: data?.lastName,
            });
        } else {
            setCustomerNameList({
                titleCode: data?.pendingNameChangeRequest?.newTitleCode,
                firstName: data?.pendingNameChangeRequest?.newFirstName,
                middleName: data?.pendingNameChangeRequest?.newMiddleName,
                lastName: data?.pendingNameChangeRequest?.newLastName,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);
    useEffect(() => {
        return () => {
            resetData();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

    const changeHistoryClose = () => {
        setIsHistoryVisible(false);
    };

    const onViewHistoryChange = () => {
        setIsHistoryVisible(true);
    };

    const onFinish = (values) => {
        setFileList([]);
        setEmptyList(false);
        setUploadedFile();
        const data = { ...values, customerId: selectedCustomer?.customerId, status: STATUS?.PENDING?.title, supportingDocuments: [{ id: formData?.id || '', documentName: uploadedFileName, documentId: uploadedFile || '' }], titleCode: customerNameList?.titleCode, firstName: customerNameList?.firstName, middleName: customerNameList?.middleName, lastName: customerNameList?.lastName };

        const onSuccess = (res) => {
            setStatus(STATUS?.APPROVED?.title);
            form.resetFields();
            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, userId });
            setButtonData({ ...buttonData, formBtnActive: false });
            setRefreshCustomerList(true);

            if (res.data) {
                handleButtonClick({ record: res?.data, buttonAction: NEXT_ACTION });
                setSelectedCustomerId(res?.data?.customerId);
                if (res?.data?.pendingNameChangeRequest === null) {
                    setCustomerNameList({
                        titleCode: res?.data?.titleCode,
                        firstName: res?.data?.firstName,
                        middleName: res?.data?.middleName,
                        lastName: res?.data?.lastName,
                    });
                } else {
                    setCustomerNameList({
                        titleCode: res?.data?.pendingNameChangeRequest?.newTitleCode,
                        firstName: res?.data?.pendingNameChangeRequest?.newFirstName,
                        middleName: res?.data?.pendingNameChangeRequest?.newMiddleName,
                        lastName: res?.data?.pendingNameChangeRequest?.newLastName,
                    });
                }
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
        form,
        onFinish,
        saveData,
        data,
        setFormActionType,
        onFinishFailed,
        handleButtonClick,
        showForm,
        setShowForm,
        setUploadImgDocId,
        uploadImgDocId,
        setButtonData,
        buttonData,
        nameChangeRequestform,
        typeData,
        formData,
        isSupportingDocumentDataLoaded,
        supportingData,
        isViewDataLoaded,
        viewDocument,
        selectedCustomerId,
        setUploadedFile,
        uploadedFile,
        downloadFileFromButton,
        handleFormValueChange,
        deleteFile,
        editedMode,
        setEditedMode,
        downloadFileFromList,
        setUploadedFileName,
        uploadedFileName,
        setFileList,
        fileList,
        setEmptyList,
        emptyList,
        handlePreview,
        supportingDataView,
        setSupportingDataView,
        setCustomerNameList,
        onViewHistoryChange,
        changeHistoryClose,
        isHistoryVisible,
        customerNameList,
        status,
        setStatus,
        activeKey,
        fetchList,
        setActiveKey,
    };

    const viewProps = {
        ...formProps,
        formActionType,
        formData,
        styles,
        isLoading,
    };

    return formActionType?.viewMode ? <ViewDetail {...viewProps} /> : <AddEditForm {...formProps} />;
};
export const CustomerNameChangeMaster = connect(mapStateToProps, mapDispatchToProps)(CustomerNameChangeMasterBase);
