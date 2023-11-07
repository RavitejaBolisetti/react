/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Row, Col, Form } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { formatDate, formattedCalendarDate } from 'utils/formatDateTime';

import { showGlobalNotification } from 'store/actions/notification';
import { supportingDocumentDataActions } from 'store/actions/data/supportingDocument';

import { indiviualProfileDataActions } from 'store/actions/data/customerMaster/individual/individualProfile/indiviualProfile';

import { documentViewDataActions } from 'store/actions/data/customerMaster/documentView';

import { ViewDetail } from './ViewDetail';
import { AddEditForm } from './AddEditForm';
import { CustomerFormButton } from '../../CustomerFormButton';
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            CustomerMaster: {
                IndiviualProfile: { isLoaded: isIndiviualProfileLoaded = false, isLoading, data: indiviualData },
                ViewDocument: { isLoaded: isViewDataLoaded = false, isLoading: isViewDocumentLoading, data: viewDocument },
            },
            ConfigurableParameterEditing: { filteredListData: appCategoryData = [] },
            SupportingDocument: { isLoaded: isDocumentDataLoaded = false, isDocumentLoading },
        },
    } = state;

    let returnValue = {
        userId,
        isIndiviualProfileLoaded,
        isLoading,
        appCategoryData,
        indiviualData,
        isDocumentDataLoaded,
        isDocumentLoading,
        isViewDataLoaded,
        isViewDocumentLoading,
        viewDocument,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: indiviualProfileDataActions.fetchList,
            listIndiviualShowLoading: indiviualProfileDataActions.listShowLoading,
            saveData: indiviualProfileDataActions.saveData,
            resetData: indiviualProfileDataActions.reset,

            saveDocumentData: supportingDocumentDataActions.saveData,
            uploadDocumentFile: supportingDocumentDataActions.uploadFile,
            uploadConsentDocumentFile: supportingDocumentDataActions.uploadFile,
            listDocumentShowLoading: supportingDocumentDataActions.listShowLoading,

            fetchViewDocument: documentViewDataActions.fetchList,
            downloadFile: supportingDocumentDataActions.downloadFile,
            resetViewData: documentViewDataActions.reset,
            viewListShowLoading: documentViewDataActions.listShowLoading,

            showGlobalNotification,
        },
        dispatch
    ),
});
const IndividualProfileBase = (props) => {
    const { userId, isIndiviualProfileLoaded, fetchViewDocument, viewDocument, appCategoryData, listIndiviualShowLoading, fetchList, indiviualData, saveData, showGlobalNotification, handleButtonClick } = props;
    const { section, buttonData, setButtonData, formActionType, setFormActionType, defaultBtnVisiblity, downloadFile } = props;
    const { saveDocumentData, uploadDocumentFile, uploadConsentDocumentFile, listDocumentShowLoading, isLoading, isViewDocumentLoading, selectedCustomerId, NEXT_ACTION } = props;
    const { resetViewData, resetData, viewListShowLoading } = props;
    const [form] = Form.useForm();

    const [activeKey, setActiveKey] = useState([1]);

    const [fileList, setFileList] = useState([]);
    const [uploadedFile, setUploadedFile] = useState();
    const [emptyList, setEmptyList] = useState(true);
    const [uploadedFileName, setUploadedFileName] = useState('');

    const [fileConsentList, setFileConsentList] = useState([]);
    const [uploadedConsentFile, setUploadedConsentFile] = useState();
    const [emptyConsentList, setEmptyConsentList] = useState(true);
    const [uploadedConsentFileName, setUploadedConsentFileName] = useState('');

    const [showDataLoading, setShowDataLoading] = useState(true);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
    };

    useEffect(() => {
        return () => {
            resetData();
            resetViewData();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (userId && selectedCustomerId && !isIndiviualProfileLoaded) {
            const extraParams = [
                {
                    key: 'customerId',
                    title: 'customerId',
                    value: selectedCustomerId,
                    name: 'Customer ID',
                },
            ];
            resetData();
            resetViewData();
            fetchList({ setIsLoading: listIndiviualShowLoading, userId, extraParams, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedCustomerId, isIndiviualProfileLoaded]);

    const downloadFileFromButton = () => {
        const onSuccessAction = (res) => {
            showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
        };
        const onErrorAction = (res) => {
            showGlobalNotification({ notificationType: 'error', title: translateContent('global.notificationError.title'), message: res });
        };
        const extraParams = [
            {
                key: 'docId',
                title: 'docId',
                value: indiviualData?.customerConsentForm,
                name: 'docId',
            },
        ];
        downloadFile({ setIsLoading: listIndiviualShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
    };

    useEffect(() => {
        if (indiviualData?.dateOfBirth === null || indiviualData?.dateOfBirth === undefined || indiviualData?.dateOfBirth === '') {
            form.setFieldsValue({
                dateOfBirth: null,
            });
        } else {
            form.setFieldsValue({
                dateOfBirth: formattedCalendarDate(indiviualData?.dateOfBirth),
            });
        }
        if (indiviualData?.weddingAnniversary === null || indiviualData?.weddingAnniversary === undefined || indiviualData?.weddingAnniversary === '') {
            form.setFieldsValue({
                weddingAnniversary: null,
            });
        } else {
            form.setFieldsValue({
                weddingAnniversary: formattedCalendarDate(indiviualData?.weddingAnniversary),
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [indiviualData]);

    useEffect(() => {
        if (userId && selectedCustomerId && indiviualData) {
            const extraParams = [
                {
                    key: 'docId',
                    title: 'docId',
                    value: indiviualData?.image,
                    name: 'docId',
                },
            ];
            fetchViewDocument({ setIsLoading: viewListShowLoading, userId, extraParams });
        }
        return () => {
            resetViewData();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedCustomerId, isIndiviualProfileLoaded, indiviualData]);

    const onFinish = (values) => {
        const recordId = '';
        const { accountCode, accountName, accountSegment, accountClientName, accountMappingDate, personName, postion, companyName, remarks, ...rest } = values;

        const data = {
            ...rest,
            customerId: selectedCustomerId,
            dateOfBirth: formatDate(values?.dateOfBirth),
            weddingAnniversary: formatDate(values?.weddingAnniversary),
            // keyAccountDetails: { customerId: selectedCustomerId, accountCode: values?.accountCode || '', accountName: values?.accountName || '', accountSegment: values?.accountSegment || '', accountClientName: values?.accountClientName || '', accountMappingDate: values?.accountMappingDate || '' },
            // authorityRequest: { customerId: selectedCustomerId, personName: values.personName || '', postion: values.postion || '', companyName: values.companyName || '', remarks: values.remarks || '', id: recordId },
            id: recordId,
            // profileFileDocId: uploadedFile ? uploadedFile : '',
            // customerFormDocId: uploadedConsentFile ? uploadedConsentFile : '',
        };

        const onSuccess = (res) => {
            form.resetFields();
            setShowDataLoading(true);

            showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
            if (res.data) {
                handleButtonClick({ record: res?.data, buttonAction: NEXT_ACTION });
            }
            setButtonData({ ...buttonData, formBtnActive: false });
        };

        const onError = (message) => {
            showGlobalNotification({ message });
        };
        const requestData = {
            data: data,
            method: indiviualData?.customerId ? 'put' : 'post',
            setIsLoading: listIndiviualShowLoading,
            userId,
            onError,
            onSuccess,
        };
        saveData(requestData);
    };

    const handleOnClick = () => {
        const extraParams = [
            {
                key: 'docId',
                title: 'docId',
                value: indiviualData?.image,
                name: 'docId',
            },
        ];
        downloadFile({ setIsLoading: listIndiviualShowLoading, userId, extraParams });
    };
    const onCloseAction = () => {
        form.resetFields();
        setIsFormVisible(false);
        setButtonData({ ...defaultBtnVisiblity });
    };

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const formProps = {
        form,
        formData: indiviualData,
        formActionType,
        setFormActionType,
        onFinish,
        isVisible: isFormVisible,
        onCloseAction,
        buttonData,
        setButtonData,
        handleButtonClick,
        appCategoryData,
        listDocumentShowLoading,
        uploadDocumentFile,
        uploadConsentDocumentFile,

        setUploadedConsentFile,
        uploadedConsentFile,
        showGlobalNotification,

        saveDocumentData,
        userId,
        showDataLoading,
        viewDocument,
        isViewDocumentLoading,
        downloadFileFromButton,
        NEXT_ACTION,
        fileList,
        setFileList,
        uploadedFile,
        setUploadedFile,
        emptyList,
        setEmptyList,
        uploadedFileName,
        setUploadedFileName,
        fetchViewDocument,

        fileConsentList,
        setFileConsentList,

        emptyConsentList,
        setEmptyConsentList,
        uploadedConsentFileName,
        setUploadedConsentFileName,
        handleFormValueChange,
    };

    const viewProps = {
        ...props,
        formData: indiviualData,
        styles,
        activeKey,
        setActiveKey,
        viewDocument,
        isViewDocumentLoading,
        handleOnClick,
        isLoading,
        downloadFileFromButton,
    };

    return (
        <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormValueChange} onFinish={onFinish}>
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
    );
};

export const IndividualProfileMaster = connect(mapStateToProps, mapDispatchToProps)(IndividualProfileBase);
