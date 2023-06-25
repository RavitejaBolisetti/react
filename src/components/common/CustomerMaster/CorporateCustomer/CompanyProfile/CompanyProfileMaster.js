/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col, Form } from 'antd';
import { showGlobalNotification } from 'store/actions/notification';
import { ViewDetail } from './ViewDetail';
import { AddEditForm } from './AddEditForm';
import { CustomerFormButton } from '../../CustomerFormButton';

import { FROM_ACTION_TYPE } from 'constants/formActionType';
import styles from 'components/common/Common.module.css';

import { corporateCompanyProfileDataActions } from 'store/actions/data/customerMaster/corporateCompanyProfileAction';
import { supportingDocumentDataActions } from 'store/actions/data/supportingDocument';
import { documentViewDataActions } from 'store/actions/data/customerMaster/documentView';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: appCategoryData = [] },
            CustomerMaster: {
                CompanyProfile: { isLoaded: isDataLoaded = false, data: customerProfileData = [] },
                ViewDocument: { isLoaded: isViewDataLoaded = false, data: viewDocument },
            },
        },
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;

    const moduleTitle = 'Company Profile';

    let returnValue = {
        collapsed,
        userId,
        appCategoryData,
        isDataLoaded,
        isViewDataLoaded,
        customerProfileData,
        viewDocument,
        moduleTitle,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            resetData: corporateCompanyProfileDataActions.reset,
            listShowLoading: corporateCompanyProfileDataActions.listShowLoading,

            fetchCompanyProfileData: corporateCompanyProfileDataActions.fetchList,
            fecthViewDocument: documentViewDataActions.fetchList,

            saveData: corporateCompanyProfileDataActions.saveData,
            uploadFile: supportingDocumentDataActions.uploadFile,
            uploadListShowLoading: supportingDocumentDataActions.listShowLoading,
            downloadFile: supportingDocumentDataActions.downloadFile,
            showGlobalNotification,
        },
        dispatch
    ),
});

const CompanyProfileBase = (props) => {
    const { showGlobalNotification, buttonData, setButtonData, formActionType, handleButtonClick, defaultBtnVisiblity, selectedCustomer, selectedCustomerId } = props;
    const { listShowLoading, section, saveData, uploadFile, userId, fetchCompanyProfileData, downloadFile, appCategoryData, customerProfileData, fecthViewDocument, viewDocument, resetData } = props;
    const { uploadListShowLoading } = props;

    const [form] = Form.useForm();
    const [uploadedFile, setUploadedFile] = useState();

    const [appCategory, setAppCustomerCategory] = useState();
    const [appSubCategory, setAppSubCategory] = useState();
    const [customerCategory, setCustomerCategory] = useState();

    const NEXT_ACTION = FROM_ACTION_TYPE?.NEXT;

    useEffect(() => {
        if (userId && selectedCustomer) {
            resetData();
            const extraParams = [
                {
                    key: 'customerId',
                    title: 'customerId',
                    value: selectedCustomer?.customerId,
                    name: 'customerId',
                },
            ];
            fetchCompanyProfileData({ setIsLoading: listShowLoading, userId, extraParams });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedCustomer]);

    useEffect(() => {
        if (userId && customerProfileData?.customerFormDocId) {
            const extraParams = [
                {
                    key: 'docId',
                    title: 'docId',
                    value: customerProfileData?.customerFormDocId,
                    name: 'docId',
                },
            ];
            fecthViewDocument({ setIsLoading: listShowLoading, userId, extraParams });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, customerProfileData?.customerFormDocId]);

    const onFinish = (values) => {
        const recordId = customerProfileData?.id || '';
        if (uploadedFile && !values?.customerConsent) {
            showGlobalNotification({ notificationType: 'error', title: 'Error', message: 'Please accept consent.', placement: 'bottomRight' });
            return;
        }
        const customerId = selectedCustomerId;
        const authorityId = customerProfileData?.authorityDetails ? customerProfileData?.authorityDetails.id : '';
        const { accountCode, accountName, accountSegment, accountClientName, accountMappingDate, personName, postion, companyName, remarks, ...rest } = values;
        const data = {
            ...rest,
            customerId: customerId,
            authorityRequest: { id: authorityId, personName: values.personName, postion: values.postion, companyName: values.companyName, remarks: values.remarks },
            customerFormDocId: uploadedFile ? uploadedFile : values?.customerFormDocId,
            customerConsent: values.customerConsent,
            id: recordId,
        };
        // customerId: customerId

        const onSuccess = (res) => {
            listShowLoading(false);
            form.resetFields();

            showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
            setButtonData({ ...buttonData, formBtnActive: false });
            if (res.data) {
                handleButtonClick({ record: res?.data, buttonAction: NEXT_ACTION });
            }
            const extraParams = [
                {
                    key: 'customerId',
                    title: 'customerId',
                    value: selectedCustomer?.customerId,
                    name: 'customerId',
                },
            ];
            fetchCompanyProfileData({ setIsLoading: listShowLoading, userId, extraParams });
        };

        const onError = (message) => {
            listShowLoading(false);
            showGlobalNotification({ message });
        };

        const requestData = {
            data: data,
            method: customerProfileData.customerId ? 'put' : 'post',
            setIsLoading: listShowLoading,
            onError,
            onSuccess,
        };

        saveData(requestData);
    };

    const onFinishFailed = (errorInfo) => {
        return;
    };

    const onCloseAction = () => {
        form.resetFields();
        setButtonData({ ...defaultBtnVisiblity });
    };

    const handleOnClick = () => {
        const extraParams = [
            {
                key: 'docId',
                title: 'docId',
                value: customerProfileData?.customerFormDocId,
                name: 'docId',
            },
        ];
        downloadFile({ setIsLoading: listShowLoading, userId, extraParams });
    };

    const formProps = {
        handleButtonClick,
        buttonData,
        onFinish,
        formActionType,
        appCategoryData,
        styles,
        form,
        formData: customerProfileData,
        uploadFile,
        uploadListShowLoading,
        uploadedFile,
        setUploadedFile,
        handleOnClick,
        appCategory,
        setAppCustomerCategory,
        appSubCategory,
        setAppSubCategory,
        customerCategory,
        setCustomerCategory,
        viewDocument,
    };

    const viewProps = {
        ...props,
        onCloseAction,
        styles,
        formData: customerProfileData,
        handleOnClick,
        viewDocument,
    };

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    return (
        <>
            <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormValueChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Row gutter={20} className={styles.drawerBodyRight}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.box}>
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
        </>
    );
};

export const CompanyProfileMaster = connect(mapStateToProps, mapDispatchToProps)(CompanyProfileBase);
