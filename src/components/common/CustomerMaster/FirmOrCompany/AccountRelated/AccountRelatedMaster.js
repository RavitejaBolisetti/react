// import React from 'react';

// import { Col, Row, Button, Space, Card } from 'antd';
// import { AddEditForm } from './AddEditForm';
// import { ViewDetail } from './ViewAccountDetails';

// import styles from 'components/common/Common.module.css';

// const AccountRelatedBase = (props) => {
//     const { onCloseAction, isViewModeVisible } = props;

//     const viewProps = {
//         styles,
//     };

//     return (
//         <>
//             {!isViewModeVisible ? (
//                 <Space direction="vertical" size="small" style={{ display: 'flex' }}>
//                     <Card style={{ backgroundColor: '#F2F2F2' }}>
//                         <AddEditForm {...props} />
//                     </Card>
//                 </Space>
//             ) : (
//                 <Card style={{ backgroundColor: '#F2F2F2' }}>
//                     <ViewDetail {...viewProps} />
//                 </Card>
//             )}
//         </>
//     );
// };

// export const AccountRelatedMaster = AccountRelatedBase;

import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { Space, Form, Card } from 'antd';

import { bindActionCreators } from 'redux';

import { corporateAccountsRelatedDataActions } from 'store/actions/data/customerMaster/corporateAccountRelated';

import { FROM_ACTION_TYPE } from 'constants/formActionType';

import { showGlobalNotification } from 'store/actions/notification';

import { filterFunction } from 'utils/filterFunction';
import { btnVisiblity } from 'utils/btnVisiblity';

import styles from 'components/common/Common.module.css';

import { ViewDetail } from './ViewAccountDetails';
import { AddEditForm } from './AddEditForm';

import { FilterIcon } from 'Icons';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            CUSTOMERMASTER: {
                CorporateAccounts: { isLoaded: isDataLoaded = false, isLoading, data: accountsData = [] },
            },
        },
    } = state;

    console.log(state);

    const moduleTitle = 'Accounts Related';

    let returnValue = {
        userId,
        isDataLoaded,
        accountsData,
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
    const { accountsData, saveData, fetchList, userId, isDataLoaded, listShowLoading, resetData, showGlobalNotification, moduleTitle, isViewModeVisible } = props;

    const [showDataLoading, setShowDataLoading] = useState(true);
    const [searchData, setSearchdata] = useState('');
    const [refershData, setRefershData] = useState(false);

    const [form] = Form.useForm();

    const [formData, setFormData] = useState([]);
    const [filterString, setFilterString] = useState();
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isAdvanceSearchVisible, setAdvanceSearchVisible] = useState(false);

    const defaultBtnVisiblity = { editBtn: false, saveBtn: false, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn: false, formBtnActive: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });

    const ADD_ACTION = FROM_ACTION_TYPE?.ADD;
    const EDIT_ACTION = FROM_ACTION_TYPE?.EDIT;
    const VIEW_ACTION = FROM_ACTION_TYPE?.VIEW;

    const viewProps = {
        styles,
    };

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
        if (userId && !isDataLoaded) {
            fetchList({ setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, errorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isDataLoaded]);

    const handleReferesh = () => {
        setShowDataLoading(true);
        setRefershData(!refershData);
    };

    const handleButtonClick = ({ record = null, buttonAction }) => {
        form.resetFields();
        setFormData([]);

        setFormActionType({ addMode: buttonAction === ADD_ACTION, editMode: buttonAction === EDIT_ACTION, viewMode: buttonAction === VIEW_ACTION });
        setButtonData(btnVisiblity({ defaultBtnVisiblity, buttonAction }));

        record && setFormData(record);
        setIsFormVisible(true);
    };

    const onFinish = (values) => {
        let data = { ...values };

        const onSuccess = (res) => {
            form.resetFields();
            setShowDataLoading(true);

            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction });

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
            data: accountsData,
            method: formActionType?.editMode ? 'put' : 'post',
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
        };

        saveData(requestData);
    };

    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => {});
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
        formData,
        formActionType,
        setFormActionType,
        onFinish,
        onFinishFailed,
        isVisible: isFormVisible,
        onCloseAction,
        titleOverride: drawerTitle.concat(moduleTitle),
        tableData: searchData,

        ADD_ACTION,
        EDIT_ACTION,
        VIEW_ACTION,
        buttonData,

        setButtonData,
        handleButtonClick,
    };

    const title = 'State Name';

    return (
        <>
            {!isViewModeVisible ? (
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
