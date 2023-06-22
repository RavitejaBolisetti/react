/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Row, Col, Form } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { showGlobalNotification } from 'store/actions/notification';
import { supportingDocumentDataActions } from 'store/actions/data/supportingDocument';

import { indiviualProfileDataActions } from 'store/actions/data/customerMaster/individual/individualProfile/indiviualProfile';
import { configParamEditActions } from 'store/actions/data/configurableParamterEditing';
import { PARAM_MASTER } from 'constants/paramMaster';

import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { btnVisiblity } from 'utils/btnVisiblity';

import { ViewDetail } from './ViewDetail';
import { AddEditForm } from './AddEditForm';
import { CustomerFormButton } from '../../CustomerFormButton';

import styles from 'components/common/Common.module.css';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            CustomerMaster: {
                IndiviualProfile: { isLoaded: isIndiviualProfileLoaded = false, isLoading: isIndiviualLoading, data: indiviualData = [] },
            },
            ConfigurableParameterEditing: { isLoaded: isAppCategoryDataLoaded = false, paramdata: appCategoryData = [] },
            SupportingDocument: { isLoaded: isDocumentDataLoaded = false, isDocumentLoading },
        },
    } = state;

    let returnValue = {
        userId,
        isIndiviualProfileLoaded,
        isIndiviualLoading,
        isAppCategoryDataLoaded,
        appCategoryData,
        indiviualData,
        isDocumentDataLoaded,
        isDocumentLoading,
    };
    console.log(appCategoryData, 'dhgsfdjhsakgS');
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: indiviualProfileDataActions.fetchList,
            listIndiviualShowLoading: indiviualProfileDataActions.listShowLoading,
            saveData: indiviualProfileDataActions.saveData,

            fetchApplicationCategorization: configParamEditActions.fetchList,
            fetchApplicationSubCategory: configParamEditActions.fetchList,
            fetchCustomerCategory: configParamEditActions.fetchList,
            fetchGenderCategory: configParamEditActions.fetchList,
            fetchMartialStatus: configParamEditActions.fetchList,
            fetchOccupationList: configParamEditActions.fetchList,
            fetchAnnualIncome: configParamEditActions.fetchList,
            fetchVehicleUsed: configParamEditActions.fetchList,
            fetchMotherTongue: configParamEditActions.fetchList,
            fetchReligionList: configParamEditActions.fetchList,

            saveDocumentData: supportingDocumentDataActions.saveData,
            uploadDocumentFile: supportingDocumentDataActions.uploadFile,
            listDocumentShowLoading: supportingDocumentDataActions.listShowLoading,

            showGlobalNotification,
        },
        dispatch
    ),
});
const IndividualProfileBase = (props) => {
    const { userId, fetchVehicleUsed, fetchMotherTongue, fetchReligionList, fetchAnnualIncome, fetchOccupationList, appCategoryData, listIndiviualShowLoading, fetchGenderCategory, fetchMartialStatus, fetchApplicationCategorization, fetchApplicationSubCategory, fetchCustomerCategory, isAppCategoryDataLoaded, isIndiviualProfileLoaded, fetchList, indiviualData, saveData, showGlobalNotification } = props;
    const { section, buttonData, setButtonData, formActionType, setFormActionType, defaultBtnVisiblity } = props;
    const { saveDocumentData, uploadDocumentFile, listDocumentShowLoading, selectedCustomerId, setSelectedCustomerId } = props;

    const [form] = Form.useForm();

    const [formData, setFormData] = useState([]);
    const [activeKey, setActiveKey] = useState([1]);
    const [uploadedFile, setUploadedFile] = useState();

    const [showDataLoading, setShowDataLoading] = useState(true);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const ADD_ACTION = FROM_ACTION_TYPE?.ADD;
    const EDIT_ACTION = FROM_ACTION_TYPE?.EDIT;
    const VIEW_ACTION = FROM_ACTION_TYPE?.VIEW;
    const NEXT_ACTION = FROM_ACTION_TYPE?.NEXT;


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
        fetchApplicationCategorization({ setIsLoading: listIndiviualShowLoading, userId, parameterType: PARAM_MASTER.CUST_APP_CAT.id });
        fetchApplicationSubCategory({ setIsLoading: listIndiviualShowLoading, userId, parameterType: PARAM_MASTER.CUST_APP_SUB_CAT.id });
        fetchCustomerCategory({ setIsLoading: listIndiviualShowLoading, userId, parameterType: PARAM_MASTER.CUST_CAT.id });
        fetchGenderCategory({ setIsLoading: listIndiviualShowLoading, userId, parameterType: PARAM_MASTER.GENDER_CD.id });
        fetchMartialStatus({ setIsLoading: listIndiviualShowLoading, userId, parameterType: PARAM_MASTER.MARITAL_STATUS.id });
        fetchOccupationList({ setIsLoading: listIndiviualShowLoading, userId, parameterType: PARAM_MASTER.OCC_TYPE.id });
        fetchAnnualIncome({ setIsLoading: listIndiviualShowLoading, userId, parameterType: PARAM_MASTER.Annual_Income.id });
        fetchVehicleUsed({ setIsLoading: listIndiviualShowLoading, userId, parameterType: PARAM_MASTER.Vehicle_Used.id });
        fetchMotherTongue({ setIsLoading: listIndiviualShowLoading, userId, parameterType: PARAM_MASTER.MOTHER_TOUNGE.id });
        fetchReligionList({ setIsLoading: listIndiviualShowLoading, userId, parameterType: PARAM_MASTER.RELGION.id });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isAppCategoryDataLoaded]);

    const onFinish = (values) => {
        const recordId = formData?.id || '';
        const restObj = {};
        const { accountCode, accountName, accountSegment, accountClientName, accountMappingDate, personName, postion, companyName, remarks, ...rest } = values;

        const data = {
            ...rest,
            customerId: selectedCustomerId,
            keyAccountDetails: { customerId: selectedCustomerId, accountCode: values?.accountCode, accountName: values?.accountName, accountSegment: values?.accountSegment, accountClientName: values?.accountClientName, accountMappingDate: values?.accountMappingDate },
            authorityRequest: { customerId: selectedCustomerId, personName: values.personName, postion: values.postion, companyName: values.companyName, remarks: values.remarks, id: recordId },
            id: recordId,
            profileFileDocId: uploadedFile ? uploadedFile : '',
            customerFormDocId: uploadedFile ? uploadedFile : '',
        };

        const onSuccess = (res) => {
            form.resetFields();
            setShowDataLoading(true);

            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            if (res.data) {
                handleButtonClick({ record: res?.data, buttonAction: NEXT_ACTION });
                setSelectedCustomerId(res?.data?.customerId);
            }
            setButtonData({ ...buttonData, formBtnActive: false });
            if (buttonData?.saveAndNewBtnClicked) {
                setIsFormVisible(true);
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage, placement: 'bottomRight' });
            } else {
                setIsFormVisible(false);
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
            }
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

    const onFinishFailed = (errorInfo) => {
        console.log('errorInfo', errorInfo);
    };

    const handleButtonClick = ({ record = null, buttonAction }) => {
        form.resetFields();
        setFormData([]);
        setFormActionType({ addMode: buttonAction === ADD_ACTION, editMode: buttonAction === EDIT_ACTION, viewMode: buttonAction === VIEW_ACTION });
        setButtonData(btnVisiblity({ defaultBtnVisiblity, buttonAction }));
        record && setFormData(record);
        setIsFormVisible(true);
    };

    const onCloseAction = () => {
        form.resetFields();
        setIsFormVisible(false);
        setButtonData({ ...defaultBtnVisiblity });
    };

    const formProps = {
        form,
        formData: indiviualData,
        formActionType,
        setFormActionType,
        onFinish,
        onFinishFailed,
        isVisible: isFormVisible,
        onCloseAction,

        ADD_ACTION,
        EDIT_ACTION,
        VIEW_ACTION,
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
    };

    const viewProps = {
        formData: indiviualData,
        styles,
        activeKey,
        setActiveKey,
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
