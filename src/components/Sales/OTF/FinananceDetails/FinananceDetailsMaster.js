import React, { useState, useMemo, useEffect } from 'react';
import { connect } from 'react-redux';
import { Form } from 'antd';
import { bindActionCreators } from 'redux';

import { otfFinanceDetailDataActions } from 'store/actions/data/otf/financeDetail';
import { financeLovDataActions } from 'store/actions/data/otf/financeLov';
import { showGlobalNotification } from 'store/actions/notification';

import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { btnVisiblity } from 'utils/btnVisiblity';
import { AddEditForm } from './AddEditForm';
import { ViewDetail } from './ViewDetail';
import styles from 'components/common/Common.module.css';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            OTF: {
                FinanceDetail: { isLoaded, isLoading, data },
                FinanceLov: { isLoaded: isFinanceLovDataLoaded = false, isloading: isFinanceLovLoading, data: FinanceLovData = [] },
            },
        },
    } = state;

    const moduleTitle = 'Finance Detail';

    let returnValue = {
        userId,
        isLoaded,
        data,
        isLoading,
        moduleTitle,

        isFinanceLovDataLoaded,
        isFinanceLovLoading,
        FinanceLovData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchFinanceLovList: financeLovDataActions.fetchList,
            listFinanceLovShowLoading: financeLovDataActions.listShowLoading,

            fetchList: otfFinanceDetailDataActions.fetchList,
            saveData: otfFinanceDetailDataActions.saveData,
            resetData: otfFinanceDetailDataActions.reset,
            listShowLoading: otfFinanceDetailDataActions.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

export const FinananceDetailsMasterBase = (props) => {
    const { saveData, fetchList, userId, listShowLoading, isLoaded, data, showGlobalNotification, moduleTitle, isFinanceLovDataLoaded, formActionType, setFormActionType, isFinanceLovLoading, FinanceLovData, fetchFinanceLovList, listFinanceLovShowLoading } = props;

    const [form] = Form.useForm();

    const [isFormVisible, setIsFormVisible] = useState(false);

    const defaultBtnVisiblity = { editBtn: false, saveBtn: false, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn: false, formBtnActive: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const defaultFormActionType = { addMode: false, editMode: false, viewMode: true };
    // const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });

    const ADD_ACTION = FROM_ACTION_TYPE?.ADD;
    const EDIT_ACTION = FROM_ACTION_TYPE?.EDIT;
    const VIEW_ACTION = FROM_ACTION_TYPE?.VIEW;

    const selectedOTP = 'OTF001';
    const extraParams = [
        {
            key: 'otfNumber',
            title: 'otfNumber',
            value: selectedOTP,
            name: 'OTF Number',
        },
        {
            key: 'id',
            title: 'id',
            value: 'a0368e0e-ac87-4beb-b0f5-f4f8b69ff8f7',
            name: 'OTF ID',
        },
    ];

    useEffect(() => {
        if (!isLoaded && userId) {
            fetchList({ setIsLoading: listShowLoading, extraParams, onSuccessAction, errorAction, userId });
        }
        if (userId && !isFinanceLovDataLoaded) {
            fetchFinanceLovList({ setIsLoading: listFinanceLovShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoaded, userId]);

    const onSuccessAction = (res) => {
        showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
    };

    const errorAction = (message) => {
        showGlobalNotification(message);
    };

    const handleButtonClick = ({ record = null, buttonAction }) => {
        form.resetFields();

        setFormActionType({ addMode: buttonAction === ADD_ACTION, editMode: buttonAction === EDIT_ACTION, viewMode: buttonAction === VIEW_ACTION });
        setButtonData(btnVisiblity({ defaultBtnVisiblity, buttonAction }));

        setIsFormVisible(true);
    };

    const onFinish = (values) => {
        const data = { ...values, otfNumber: 'OTF001', id: 'a0368e0e-ac87-4beb-b0f5-f4f8b69ff8f7' };

        const onSuccess = (res) => {
            form.resetFields();

            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, extraParams, userId, onSuccessAction });

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

        saveData(requestData);
    };

    const onFinishFailed = () => {};

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
        formData: data,
        formActionType,
        setFormActionType,
        fetchList,
        onFinish,
        onFinishFailed,
        isVisible: isFormVisible,
        onCloseAction,
        titleOverride: drawerTitle.concat(moduleTitle),
        tableData: data,

        isFinanceLovDataLoaded,
        isFinanceLovLoading,
        FinanceLovData,
        fetchFinanceLovList,
        listFinanceLovShowLoading,

        ADD_ACTION,
        EDIT_ACTION,
        VIEW_ACTION,
        buttonData,
        setButtonData,
        handleButtonClick,
    };

    const viewProps = {
        formData: data,
        styles,
    };

    return <>{formActionType?.viewMode ? <ViewDetail {...viewProps} /> : <AddEditForm {...formProps} />}</>;
};

const FinananceDetailsMaster = connect(mapStateToProps, mapDispatchToProps)(FinananceDetailsMasterBase);
export default FinananceDetailsMaster;
