import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { Space, Form, Card } from 'antd';

import { bindActionCreators } from 'redux';

import { corporateAccountsRelatedDataActions } from 'store/actions/data/customerMaster/corporateAccountRelated';

import { FROM_ACTION_TYPE } from 'constants/formActionType';

import { showGlobalNotification } from 'store/actions/notification';

import { btnVisiblity } from 'utils/btnVisiblity';

import styles from 'components/common/Common.module.css';

import { ViewDetail } from './ViewAccountDetails';
import { AddEditForm } from './AddEditForm';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            CustomerMaster: {
                CorporateAccounts: { isLoaded = false, isLoading, data },
            },
        },
    } = state;

    const moduleTitle = 'Accounts Related';

    let returnValue = {
        userId,
        isLoaded,
        data,
        isLoading,
        moduleTitle,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: corporateAccountsRelatedDataActions.fetchList,
            saveData: corporateAccountsRelatedDataActions.saveData,
            resetData: corporateAccountsRelatedDataActions.reset,
            listShowLoading: corporateAccountsRelatedDataActions.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

export const AccountRelatedBase = (props) => {
    const { saveData, fetchList, userId, listShowLoading, isLoaded, data, showGlobalNotification, moduleTitle } = props;

    const [showDataLoading, setShowDataLoading] = useState(true);
    const [refershData, setRefershData] = useState(false);

    const [form] = Form.useForm();

    const [formData, setFormData] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const defaultBtnVisiblity = { editBtn: false, saveBtn: false, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn: false, formBtnActive: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });

    const ADD_ACTION = FROM_ACTION_TYPE?.ADD;
    const EDIT_ACTION = FROM_ACTION_TYPE?.EDIT;
    const VIEW_ACTION = FROM_ACTION_TYPE?.VIEW;

    const selectedCustomer = 'CUS1686812277115';
    const extraParams = [
        {
            key: 'customerId',
            title: 'customerId',
            value: selectedCustomer,
            name: 'Customer ID',
        },
    ];

    const errorAction = (message) => {
        showGlobalNotification(message);
    };
    const onSuccessAction = (res) => {
        refershData && showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
        setRefershData(false);
        setShowDataLoading(false);
    };

    useEffect(() => {
        if (userId && !isLoaded) {
            fetchList({ setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, errorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isLoaded]);

    const handleButtonClick = ({ record = null, buttonAction }) => {
        form.resetFields();
        setFormData([]);

        setFormActionType({ addMode: buttonAction === ADD_ACTION, editMode: buttonAction === EDIT_ACTION, viewMode: buttonAction === VIEW_ACTION });
        setButtonData(btnVisiblity({ defaultBtnVisiblity, buttonAction }));

        record && setFormData(record);
        setIsFormVisible(true);
    };

    const onFinish = (values) => {
        const data = { ...values, customerId: 'CUS1686815155017' };
        console.log(form.getFieldValue(), 'KARTIK ');

        const onSuccess = (res) => {
            form.resetFields();
            setShowDataLoading(true);

            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });

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
            method: formActionType?.editMode ? 'put' : 'post',
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
        };
        console.log(requestData, 'KARTIK Gupta');
        saveData(requestData);
    };

    const onFinishFailed = (errorInfo) => {
        return;
    };

    const onCloseAction = () => {
        form.resetFields();
        setIsFormVisible(false);
        setButtonData({ ...defaultBtnVisiblity });
    };

    const drawerTitle = useMemo(() => {
        if (formActionType?.viewMode) {
            return 'View ';
        } else if (formActionType?.editMode) {
            return 'Edit ';
        } else {
            return 'Add ';
        }
    }, [formActionType]);

    const formProps = {
        form,
        formData: data['0'],
        formActionType,
        setFormActionType,
        onFinish,
        onFinishFailed,
        isVisible: isFormVisible,
        onCloseAction,
        titleOverride: drawerTitle.concat(moduleTitle),
        tableData: data,

        ADD_ACTION,
        EDIT_ACTION,
        VIEW_ACTION,
        buttonData,
        setButtonData,
        handleButtonClick,
    };
    const viewProps = {
        formData: data['0'],
        styles,
    };

    return (
        <>
            {!formActionType?.viewMode ? (
                <Space direction="vertical" size="small" style={{ display: 'flex' }}>
                    <Card style={{ backgroundColor: '#F2F2F2' }}>
                        <AddEditForm {...formProps} />
                    </Card>
                </Space>
            ) : (
                <Card style={{ backgroundColor: '#F2F2F2' }}>
                    <ViewDetail {...viewProps} />
                </Card>
            )}
        </>
    );
};

export const AccountRelatedMaster = connect(mapStateToProps, mapDispatchToProps)(AccountRelatedBase);
