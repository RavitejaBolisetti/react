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
import { showGlobalNotification, hideGlobalNotification } from 'store/actions/notification';

import { ViewDetail } from './ViewDetail';
import { AddEditForm } from './AddEditForm';
import { CustomerFormButton } from '../../CustomerFormButton';
import { CustomerNameChangeHistory } from './CustomerNameChange';
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';
import { customerMobileDetailsDataActions } from 'store/actions/data/customerMaster/searchMobileNumber';
import { corporateCompanyDescriptionDataActions } from 'store/actions/data/customerMaster/corporateDescription';
import { corporateCompanyDescriptionTypeDataActions } from 'store/actions/data/customerMaster/corporateDescriptionType';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            CustomerMaster: {
                CustomerDetailsIndividual: { isLoaded: isDataLoaded = false, isLoading, data },
                Corporate: { isFilteredListLoaded: isCorporateLovDataLoaded = false, isLoading: isCorporateLovLoading, filteredListData: corporateLovData },
                CorporateDescription: { isFilteredListLoaded: isCorporateDescriptionLoaded = false, isLoading: isCorporateDescriptionLovLoading, filteredListData: corporateDescriptionLovData },
                CorporateDescriptionType: { isFilteredListLoaded: isCorporateDescriptionTypeLoaded = false, isLoading: isCorporateDescriptionTypeLovLoading, filteredListData: corporateTypeLovData },

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

        isCorporateDescriptionLoaded,
        isCorporateDescriptionTypeLoaded,
        isCorporateDescriptionLovLoading,
        isCorporateDescriptionTypeLovLoading,
        corporateDescriptionLovData,
        corporateTypeLovData,
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

            fetchContactMobileNoDetails: customerMobileDetailsDataActions.fetchList,
            listContactMobileNoShowLoading: customerMobileDetailsDataActions.listShowLoading,
            resetContactMobileNoData: customerMobileDetailsDataActions.reset,

            fetchList: customerDetailsIndividualDataActions.fetchList,
            listShowLoading: customerDetailsIndividualDataActions.listShowLoading,
            saveData: customerDetailsIndividualDataActions.saveData,
            resetData: customerDetailsIndividualDataActions.reset,

            fetchCorporateDescriptionLovList: corporateCompanyDescriptionDataActions.fetchFilteredList,
            listCorporateDescriptionLovShowLoading: corporateCompanyDescriptionDataActions.listShowLoading,

            fetchCorporateTypeLovList: corporateCompanyDescriptionTypeDataActions.fetchFilteredList,
            listCorporateTypeLovShowLoading: corporateCompanyDescriptionTypeDataActions.listShowLoading,

            hideGlobalNotification,
            showGlobalNotification,
        },
        dispatch
    ),
});

const CustomerDetailMasterBase = (props) => {
    const { setRefreshCustomerList, handleResetFilter, typeData, fetchCorporateLovList, isCorporateLovDataLoaded, listCorporateLovShowLoading, corporateLovData, fetchContactMobileNoDetails, listContactMobileNoShowLoading, resetContactMobileNoData } = props;
    const { userId, showGlobalNotification, section, fetchList, listShowLoading, data, saveData, isLoading, resetData, form, handleFormValueChange } = props;
    const { selectedCustomer, selectedCustomerId, setSelectedCustomerId, mobNoVerificationData } = props;
    const { buttonData, setButtonData, formActionType, setFormActionType, handleButtonClick, NEXT_ACTION } = props;
    const { fetchViewDocument, viewListShowLoading, listSupportingDocumentShowLoading, isSupportingDocumentDataLoaded, supportingData, isViewDataLoaded, viewDocument, hideGlobalNotification, customerType } = props;
    const { sendOTP, validateOTP } = props;
    const [refreshData, setRefreshData] = useState(false);
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
    const [numbValidatedSuccess, setNumbValidatedSuccess] = useState(false);

    useEffect(() => {
        if (data) {
            form.setFieldsValue({ ...data });
            setFormData(data);
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
        if (userId && !isCorporateLovDataLoaded) {
            fetchCorporateLovList({ setIsLoading: listCorporateLovShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isCorporateLovDataLoaded]);

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
    };

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
    }, [userId, selectedCustomerId, refreshData]);

    const defaultExtraParam = [
        {
            key: 'customerType',
            title: 'Customer Type',
            value: customerType,
            canRemove: true,
        },
        {
            key: 'pageSize',
            title: 'Value',
            value: 1,
            canRemove: true,
        },
        {
            key: 'pageNumber',
            title: 'Value',
            value: 1,
            canRemove: true,
        },
        {
            key: 'searchType',
            title: 'searchType',
            value: 'mobileNumber',
            canRemove: true,
        },
    ];

    const downloadFileFromButton = (uploadData) => {
        showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: translateContent('global.generalMessage.downloadStart') });
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
            showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: translateContent('customerMaster.notification.deleted') });
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
        showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: translateContent('global.generalMessage.downloadStart') });
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
        console.log('🚀 ~ onFinish ~ values:', values);
        if (!formActionType?.addMode && !numbValidatedSuccess && data?.mobileNumber !== values?.mobileNumber) {
            showGlobalNotification({ message: translateContent('customerMaster.notification.verify') });
            return;
        }
        setFileList([]);
        setEmptyList(false);
        setUploadedFile();
        let reqdata = { ...values, customerId: selectedCustomer?.customerId };
        if (formActionType?.editMode) {
            const customerCurrentName = {
                titleCode: formData?.titleCode,
                firstName: formData?.firstName,
                middleName: formData?.middleName,
                lastName: formData?.lastName,
            };
            reqdata = { ...reqdata, ...customerCurrentName, editMode: formActionType?.editMode };

            if (nameChangeRequested) {
                reqdata = { ...reqdata, customerNameChangeRequest: customerNameList };
                delete reqdata.titleCodeNew;
                delete reqdata.firstNameNew;
                delete reqdata.middleNameNew;
                delete reqdata.lastNameNew;
            }
        }

        const onSuccess = (res) => {
            form.resetFields();
            showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, userId });
            setButtonData({ ...buttonData, formBtnActive: false });
            setRefreshCustomerList(true);
            handleResetFilter();

            if (res.data) {
                handleButtonClick({ record: res?.data, buttonAction: NEXT_ACTION });
                setSelectedCustomerId(res?.data?.customerId);
                if (res?.data?.customerNameChangeRequest === null) {
                    setCustomerNameList({
                        titleCode: res?.data?.titleCode,
                        firstName: res?.data?.firstName,
                        middleName: res?.data?.middleName,
                        lastName: res?.data?.lastName,
                    });
                } else {
                    setCustomerNameList({
                        titleCode: res?.data?.customerNameChangeRequest?.titleCode,
                        firstName: res?.data?.customerNameChangeRequest?.firstName,
                        middleName: res?.data?.customerNameChangeRequest?.middleName,
                        lastName: res?.data?.customerNameChangeRequest?.lastName,
                    });
                }
            }
        };

        const onError = (message) => {
            showGlobalNotification({ message });
        };

        const requestData = {
            data: reqdata,
            method: selectedCustomerId ? 'put' : 'post',
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
    const handleFormFieldChange = () => {
        const { whatsappCommunicationIndicator, mobileNumberAsWhatsappNumber, whatsAppNumber, mobileNumber } = form.getFieldsValue();

        if (whatsappCommunicationIndicator) {
            if (mobileNumberAsWhatsappNumber) {
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
        refreshData,
        setRefreshData,
        sendOTP,
        validateOTP,
        showGlobalNotification,
        fetchContactMobileNoDetails,
        listContactMobileNoShowLoading,
        selectedCustomer,
        resetContactMobileNoData,
        mobNoVerificationData,
        hideGlobalNotification,
        numbValidatedSuccess,
        setNumbValidatedSuccess,
        defaultExtraParam,
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
            <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish}>
                <Row gutter={20} className={styles.drawerBodyRight}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <h2>{translateContent(section?.translateKey)} </h2>
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
