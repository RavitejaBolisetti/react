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

import { btnVisiblity } from 'utils/btnVisiblity';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import styles from 'components/common/Common.module.css';

import { corporateCompanyProfileDataActions } from 'store/actions/data/customerMaster/corporateCompanyProfileAction';
import { supportingDocumentDataActions } from 'store/actions/data/supportingDocument';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { isLoaded: isAppCategoryDataLoaded = false, filteredListData: appCategoryData = [] },
            CustomerMaster: {
                CompanyProfile: { isLoaded: isDataLoaded = false, data: customerProfileData = [] },
            },
            SupportingDocument: { isLoaded: isUploadDataLoaded = false, isLoading: isUploadDataLoading },
        },
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;

    const moduleTitle = 'Company Profile';

    let returnValue = {
        collapsed,
        userId,
        isAppCategoryDataLoaded,
        appCategoryData,
        isDataLoaded,
        customerProfileData,
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

            saveData: corporateCompanyProfileDataActions.saveData,
            uploadFile: supportingDocumentDataActions.uploadFile,
            uploadListShowLoading: supportingDocumentDataActions.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

const CompanyProfileBase = (props) => {
    const { listShowLoading, section, saveData, uploadFile, userId, fetchCompanyProfileData, appCategoryData, customerProfileData } = props;
    const { buttonData, setButtonData, formActionType, setFormActionType, defaultBtnVisiblity, selectedCustomer } = props;
    const { uploadListShowLoading } = props;

    const [form] = Form.useForm();
    const [uploadedFile, setUploadedFile] = useState();

    const ADD_ACTION = FROM_ACTION_TYPE?.ADD;
    const EDIT_ACTION = FROM_ACTION_TYPE?.EDIT;
    const VIEW_ACTION = FROM_ACTION_TYPE?.VIEW;

    useEffect(() => {
        if (userId && selectedCustomer) {
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

    const handleButtonClick = ({ record = null, buttonAction }) => {
        form.resetFields();
        setFormActionType({ addMode: buttonAction === ADD_ACTION, editMode: buttonAction === EDIT_ACTION, viewMode: buttonAction === VIEW_ACTION });
        setButtonData(btnVisiblity({ defaultBtnVisiblity, buttonAction }));
    };

    const onFinish = (values) => {
        const recordId = customerProfileData?.id || '';
        const { accountCode, accountName, accountSegment, accountClientName, accountMappingDate, personName, postion, companyName, remarks, ...rest } = values;
        const data = { ...rest, customerId: customerProfileData.customerId, keyAccountDetails: { customerId: customerProfileData.customerId, accountCode: values.accountCode, accountName: values.accountName, accountSegment: values.accountSegment, accountClientName: values.accountClientName, accountMappingDate: values.accountMappingDate }, authorityRequest: { customerId: customerProfileData.customerId, personName: values.personName, postion: values.postion, companyName: values.companyName }, customerFormDocId: uploadedFile, customerConsent: values.customerConsent, id: recordId };

        const onSuccess = (res) => {
            listShowLoading(false);
            form.resetFields();
            showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
            setButtonData({ ...buttonData, formBtnActive: false });
            showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage, placement: 'bottomRight' });
        };

        const onError = (message) => {
            listShowLoading(false);
            showGlobalNotification({ notificationType: 'error', title: 'Error', message, placement: 'bottomRight' });
        };

        const requestData = {
            data: data,
            method: formActionType?.editMode ? 'put' : 'post',
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
    };

    const viewProps = {
        onCloseAction,
        styles,
        formData: customerProfileData,
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
