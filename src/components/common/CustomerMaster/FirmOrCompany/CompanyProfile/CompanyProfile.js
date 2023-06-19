import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col, Form } from 'antd';
import { showGlobalNotification } from 'store/actions/notification';
import AddEditForm from './AddEditForm';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { btnVisiblity } from 'utils/btnVisiblity';

import { corporateCompanyProfileDataActions } from 'store/actions/data/customerMaster/corporateCompanyProfileAction';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            // CompanyProfile: { isLoaded: isDataLoaded = false, data: DealerTermsConditionsData, isLoading, isLoadingOnSave, isFormDataLoaded },
        },
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;

    const moduleTitle = 'Company Profile';

    let returnValue = {
        collapsed,
        userId,
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
            fetchProductList: corporateCompanyProfileDataActions.fetchList,
            resetData: corporateCompanyProfileDataActions.reset,
            listShowLoading: corporateCompanyProfileDataActions.listShowLoading,

            saveData: corporateCompanyProfileDataActions.saveData,
            showGlobalNotification,
        },
        dispatch
    ),
});

const CompanyProfileBase = ({ listShowLoading, saveData }) => {
    const [form] = Form.useForm();
    const [formActionType, setFormActionType] = useState('');
    const [formData, setFormData] = useState({});
    const defaultBtnVisiblity = { editBtn: false, saveBtn: false, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn: false, formBtnActive: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const [isViewModeVisible, setIsViewModeVisible] = useState(false);

    const ADD_ACTION = FROM_ACTION_TYPE?.ADD;
    const EDIT_ACTION = FROM_ACTION_TYPE?.EDIT;
    const VIEW_ACTION = FROM_ACTION_TYPE?.VIEW;

    const handleButtonClick = ({ record = null, buttonAction }) => {
        form.resetFields();
        setFormData([]);

        setFormActionType({ addMode: buttonAction === ADD_ACTION, editMode: buttonAction === EDIT_ACTION, viewMode: buttonAction === VIEW_ACTION });
        setButtonData(btnVisiblity({ defaultBtnVisiblity, buttonAction, saveAndNewBtn: false }));

        record && setFormData(record);
        // setIsFormVisible(true);
    };

    const handleAdd = () => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.ADD });

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
        handleButtonClick,
        onFinish,
        isViewModeVisible,
        setIsViewModeVisible,
    };

    return <AddEditForm {...formProps} />;
};

export const CompanyProfile = connect(mapStateToProps, mapDispatchToProps)(CompanyProfileBase);
