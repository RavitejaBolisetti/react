import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col, Form } from 'antd';
import { showGlobalNotification } from 'store/actions/notification';
import AddEditForm from './AddEditForm';
import { configParamEditActions } from 'store/actions/data/configurableParamterEditing';
import { PARAM_MASTER } from 'constants/paramMaster';

import { corporateCompanyProfileDataActions } from 'store/actions/data/customerMaster/corporateCompanyProfileAction';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { isLoaded: isAppCategoryDataLoaded = false, paramdata: appCategoryData = [] },
            // CompanyProfile: { isLoaded: isDataLoaded = false, data: DealerTermsConditionsData, isLoading, isLoadingOnSave, isFormDataLoaded },
        },
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;
    console.log('Redux State:', state);

    const moduleTitle = 'Company Profile';

    let returnValue = {
        collapsed,
        userId,
        isAppCategoryDataLoaded,
        appCategoryData,
        // isDataLoaded,
        // isLoading,
        // isLoadingOnSave,
        // isFormDataLoaded,
        moduleTitle,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchApplicationCategorization: configParamEditActions.fetchList,
            resetData: corporateCompanyProfileDataActions.reset,
            listShowLoading: corporateCompanyProfileDataActions.listShowLoading,

            saveData: corporateCompanyProfileDataActions.saveData,
            showGlobalNotification,
        },
        dispatch
    ),
});

const CompanyProfileBase = ({ listShowLoading, saveData, formActionType, userId, fetchApplicationCategorization, isAppCategoryDataLoaded, appCategoryData, formData }) => {
    const [form] = Form.useForm();
    // const [formActionType, setFormActionType] = useState('');
    // const [formData, setFormData] = useState({});
    const defaultBtnVisiblity = { editBtn: false, saveBtn: false, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn: false, formBtnActive: false };

    // const [isViewModeVisible, setIsViewModeVisible] = useState(false);

    useEffect(() => {
        fetchApplicationCategorization({ setIsLoading: listShowLoading, userId, parameterType: PARAM_MASTER.GEO_TEH_CAT.id });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isAppCategoryDataLoaded]);

    const onFinish = (values, e) => {
        const recordId = formData?.id || '';
        const data = { ...values, id: recordId };

        const onSuccess = (res) => {
            listShowLoading(false);
            form.resetFields();
            // setSelectedRecord({});
            // setIsFormVisible(false);
            showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
        };

        const onError = (message) => {
            listShowLoading(false);
            showGlobalNotification({ notificationType: 'error', title: 'Error', message, placement: 'bottomRight' });
        };

        const requestData = {
            data: data,
            // method: formActionType?.editMode ? 'put' : 'post',
            setIsLoading: listShowLoading,
            // userId,
            onError,
            onSuccess,
        };

        saveData(requestData);
    };

    const formProps = {
        // handleButtonClick,
        onFinish,

        // isViewModeVisible,
        // setIsViewModeVisible,
        formActionType,
        appCategoryData,
    };

    return <AddEditForm {...formProps} />;
};

export const CompanyProfile = connect(mapStateToProps, mapDispatchToProps)(CompanyProfileBase);
