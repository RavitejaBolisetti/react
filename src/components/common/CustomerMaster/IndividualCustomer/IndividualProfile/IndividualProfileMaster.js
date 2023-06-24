/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Row, Col, Form } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import dayjs from 'dayjs';

import { showGlobalNotification } from 'store/actions/notification';
import { supportingDocumentDataActions } from 'store/actions/data/supportingDocument';

import { indiviualProfileDataActions } from 'store/actions/data/customerMaster/individual/individualProfile/indiviualProfile';

import { documentViewDataActions } from 'store/actions/data/customerMaster/documentView';
import { FROM_ACTION_TYPE } from 'constants/formActionType';

import { ViewDetail } from './ViewDetail';
import { AddEditForm } from './AddEditForm';
import { CustomerFormButton } from '../../CustomerFormButton';

import styles from 'components/common/Common.module.css';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            CustomerMaster: {
                IndiviualProfile: { isLoaded: isIndiviualProfileLoaded = false, isLoading, data: indiviualData = [] },
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

            saveDocumentData: supportingDocumentDataActions.saveData,
            uploadDocumentFile: supportingDocumentDataActions.uploadFile,
            listDocumentShowLoading: supportingDocumentDataActions.listShowLoading,

            fecthViewDocument: documentViewDataActions.fetchList,
            downloadFile: supportingDocumentDataActions.downloadFile,

            showGlobalNotification,
        },
        dispatch
    ),
});
const IndividualProfileBase = (props) => {
    const { userId, isIndiviualProfileLoaded, fecthViewDocument, viewDocument, appCategoryData, listIndiviualShowLoading, fetchList, indiviualData, saveData, showGlobalNotification, handleButtonClick } = props;
    const { section, buttonData, setButtonData, formActionType, setFormActionType, defaultBtnVisiblity, downloadFile } = props;
    const { saveDocumentData, uploadDocumentFile, listDocumentShowLoading, isLoading, isViewDocumentLoading, selectedCustomerId, setSelectedCustomerId } = props;
    const [form] = Form.useForm();

    const [formData, setFormData] = useState([]);
    const [activeKey, setActiveKey] = useState([1]);
    const [uploadedFile, setUploadedFile] = useState();
    const [isBorder, setIsBorder] = useState(false);

    const [showDataLoading, setShowDataLoading] = useState(true);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const NEXT_EDIT_ACTION = FROM_ACTION_TYPE?.NEXT_EDIT;

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
            fetchList({ setIsLoading: listIndiviualShowLoading, userId, extraParams, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedCustomerId]);

    useEffect(() => {
        if (userId && isIndiviualProfileLoaded && indiviualData?.image) {
            const extraParams = [
                {
                    key: 'docId',
                    title: 'docId',
                    value: indiviualData?.image,
                    name: 'docId',
                },
            ];
            fecthViewDocument({ setIsLoading: listIndiviualShowLoading, userId, extraParams, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isIndiviualProfileLoaded, indiviualData?.image]);

    useEffect(() => {
        if (indiviualData?.dateOfBirth === null || indiviualData?.dateOfBirth === undefined || indiviualData?.dateOfBirth === '') {
            form.setFieldsValue({
                dateOfBirth: null,
            });
        } else {
            form.setFieldsValue({
                dateOfBirth: dayjs(indiviualData?.dateOfBirth),
            });
        }
        if (indiviualData?.weddingAnniversary === null || indiviualData?.weddingAnniversary === undefined || indiviualData?.weddingAnniversary === '') {
            form.setFieldsValue({
                weddingAnniversary: null,
            });
        } else {
            form.setFieldsValue({
                weddingAnniversary: dayjs(indiviualData?.weddingAnniversary),
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [indiviualData]);

    const onFinish = (values) => {
        const recordId = formData?.id || '';
        const { accountCode, accountName, accountSegment, accountClientName, accountMappingDate, personName, postion, companyName, remarks, ...rest } = values;

        const data = {
            ...rest,
            customerId: selectedCustomerId,
            keyAccountDetails: { customerId: selectedCustomerId, accountCode: values?.accountCode || '', accountName: values?.accountName || '', accountSegment: values?.accountSegment || '', accountClientName: values?.accountClientName || '', accountMappingDate: values?.accountMappingDate || '' },
            authorityRequest: { customerId: selectedCustomerId, personName: values.personName || '', postion: values.postion || '', companyName: values.companyName || '', remarks: values.remarks || '', id: recordId },
            id: recordId,
            profileFileDocId: uploadedFile ? uploadedFile : '',
            customerFormDocId: uploadedFile ? uploadedFile : '',
        };

        const onSuccess = (res) => {
            form.resetFields();
            setShowDataLoading(true);

            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            if (res.data) {
                handleButtonClick({ record: res?.data, buttonAction: NEXT_EDIT_ACTION });
                setSelectedCustomerId(res?.data?.customerId);
            }
            setButtonData({ ...buttonData, formBtnActive: false });
        };

        const onError = (message) => {
            showGlobalNotification({ message });
        };
        const requestData = {
            data: data,
            method: 'post',
            setIsLoading: listIndiviualShowLoading,
            userId,
            onError,
            onSuccess,
        };
        saveData(requestData);
    };

    const onFinishFailed = (errorInfo) => {};

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
        viewDocument = [];
    };

    const formProps = {
        isBorder,
        form,
        formData: indiviualData,
        formActionType,
        setFormActionType,
        onFinish,
        onFinishFailed,
        isVisible: isFormVisible,
        onCloseAction,
        buttonData,
        setButtonData,
        handleButtonClick,
        appCategoryData,
        listDocumentShowLoading,
        uploadDocumentFile,
        setUploadedFile,

        saveDocumentData,
        userId,
        showDataLoading,
        viewDocument,
        isViewDocumentLoading,
        NEXT_EDIT_ACTION,
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
    };

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    return (
        <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormValueChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <h2>{section?.title} </h2>
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
