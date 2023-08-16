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
import { documentViewDataActions } from 'store/actions/data/customerMaster/documentView';
import { supportingDocumentDataActions } from 'store/actions/data/supportingDocument';
import { corporateDataActions } from 'store/actions/data/customerMaster/corporate';
import { showGlobalNotification } from 'store/actions/notification';

import { ViewDetail } from './ViewDetail';
import { AddEditForm } from './AddEditForm';
import { CustomerFormButton } from '../../CustomerFormButton';
import { CustomerNameChangeHistory } from './CustomerNameChange';

import styles from 'components/common/Common.module.css';

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
    const { setRefreshCustomerList, handleResetFilter, typeData, fetchCorporateLovList, isCorporateLovDataLoaded, listCorporateLovShowLoading, corporateLovData } = props;
    const { userId, showGlobalNotification, section, fetchList, listShowLoading, isDataLoaded, data, saveData, isLoading, resetData, form, handleFormValueChange, onFinishFailed } = props;
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
    const [formData, setFormData] = useState();
    const [uploadImgDocId, setUploadImgDocId] = useState('');
    const [customerNameList, setCustomerNameList] = useState({});
    const [supportingDataView, setSupportingDataView] = useState();
    const [isHistoryVisible, setIsHistoryVisible] = useState(false);
    const [activeKey, setactiveKey] = useState([]);
    const [nameChangeRequested, setNameChangeRequested] = useState(false);
    const [whatsAppConfiguration, setWhatsAppConfiguration] = useState({ contactOverWhatsApp: null, contactOverWhatsAppActive: null, sameMobileNoAsWhatsApp: null, sameMobileNoAsWhatsAppActive: null });

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
    };

    useEffect(() => {
        if (isDataLoaded) {
            form.setFieldsValue({ ...data });
            setFormData(data);
            // setWhatsAppConfiguration({ contactOverWhatsApp: data?.whatsappCommunicationIndicator, sameMobileNoAsWhatsApp: data?.mobileNumberAsWhatsappNumber });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded]);

    useEffect(() => {
        return () => {
            resetData();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

        let data = { ...values, customerId: selectedCustomer?.customerId };
        console.log(nameChangeRequested, 'nameChangeRequested');
        if (formActionType?.editMode && nameChangeRequested) {
            data = { ...data, ...customerNameList };
            delete data.titleCodeNew;
            delete data.firstNameNew;
            delete data.middleNameNew;
            delete data.lastNameNew;
        } else if (formActionType?.editMode) {
            data = { ...data, titleCode: formData?.titleCode, firstName: formData?.firstName, middleName: formData?.middleName, lastName: formData?.lastName };
        }

        const onSuccess = (res) => {
            form.resetFields();
            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, userId });
            setButtonData({ ...buttonData, formBtnActive: false });
            setRefreshCustomerList(true);
            handleResetFilter();

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
    const handleFormFieldChange = (data = undefined) => {
        const { whatsappCommunicationIndicator, mobileNumberAsWhatsappNumber, whatsAppNumber, mobileNumber } = form.getFieldsValue();

        if (whatsappCommunicationIndicator) {
            if (whatsappCommunicationIndicator && mobileNumberAsWhatsappNumber) {
                form.setFieldsValue({ whatsAppNumber: mobileNumber });
                setWhatsAppConfiguration({ contactOverWhatsAppActive: true, sameMobileNoAsWhatsApp: true, contactOverWhatsApp: true });
            } else {
                form.setFieldsValue({ whatsAppNumber: whatsAppNumber });
                setWhatsAppConfiguration({ contactOverWhatsAppActive: false, sameMobileNoAsWhatsAppActive: false, contactOverWhatsApp: true });
            }
        } else if (!whatsappCommunicationIndicator) {
            if (mobileNumberAsWhatsappNumber) {
                form.setFieldsValue({ mobileNumberAsWhatsappNumber: null });
                setWhatsAppConfiguration({ contactOverWhatsAppActive: true, sameMobileNoAsWhatsApp: false });
            } else {
                setWhatsAppConfiguration({ contactOverWhatsAppActive: true, sameMobileNoAsWhatsApp: false, sameMobileNoAsWhatsAppActive: true });
                form.setFieldsValue({ whatsAppNumber: null });
            }
        }
    };

    const formProps = {
        ...props,
        formActionType,
        form,
        onFinish,
        saveData,
        data,
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
        buttonData,
        nameChangeRequestform,
        typeData,
        formData: data,
        setFormData,
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
        whatsAppConfiguration,
        setWhatsAppConfiguration,
        handleFormFieldChange,
        setCustomerNameList,
        onViewHistoryChange,
        changeHistoryClose,
        isHistoryVisible,
        customerNameList,
        status,
        setStatus,
        activeKey,
        fetchList,
        setactiveKey,
        nameChangeRequested,
        setNameChangeRequested,
    };

    const viewProps = {
        ...formProps,
        formActionType,
        formData,
        styles,
        isLoading,
    };

    const nameChangeHistoryProps = {
        isVisible: isHistoryVisible,
        onCloseAction: changeHistoryClose,
        selectedCustomerId,
        downloadFileFromButton,
    };

    return (
        <>
            <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
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
            <CustomerNameChangeHistory {...nameChangeHistoryProps} />
        </>
    );
};
export const CustomerDetailMaster = connect(mapStateToProps, mapDispatchToProps)(CustomerDetailMasterBase);
