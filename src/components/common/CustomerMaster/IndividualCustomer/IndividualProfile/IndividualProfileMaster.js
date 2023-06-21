/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import AddEditForm from './AddEditForm';
import { Form } from 'antd';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { configParamEditActions } from 'store/actions/data/configurableParamterEditing';
import { PARAM_MASTER } from 'constants/paramMaster';

import { showGlobalNotification } from 'store/actions/notification';
import { indiviualProfileDataActions } from 'store/actions/data/customerMaster/individual/individualProfile/indiviualProfile';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            CustomerMaster: {
                IndiviualProfile: { isLoaded: isIndiviualProfileLoaded = false, isLoading: isIndiviualLoading, data: indiviualData = [] },
            },
            ConfigurableParameterEditing: { isLoaded: isAppCategoryDataLoaded = false, paramdata: appCategoryData = [] },
        },
    } = state;

    let returnValue = {
        userId,
        isIndiviualProfileLoaded,
        isIndiviualLoading,
        isAppCategoryDataLoaded,
        appCategoryData,
        indiviualData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchIndiviualList: indiviualProfileDataActions.fetchList,
            listIndiviualShowLoading: indiviualProfileDataActions.listShowLoading,
            saveData: indiviualProfileDataActions.saveData,
            fetchApplicationCategorization: configParamEditActions.fetchList,
            fetchApplicationSubCategory: configParamEditActions.fetchList,
            fetchCustomerCategory: configParamEditActions.fetchList,
            fetchGenderCategory: configParamEditActions.fetchList,
            fetchMartialStatus: configParamEditActions.fetchList,
            fetchOccupationList: configParamEditActions.fetchList,
            fetchAnnualIncome: configParamEditActions.fetchList,
            showGlobalNotification,
        },
        dispatch
    ),
});
const IndividualProfileBase = (props) => {
    const { userId, fetchIndiviualList, formData, onFieldsChange, fetchAnnualIncome, fetchOccupationList, listIndiviualShowLoading, fetchGenderCategory, fetchMartialStatus, fetchApplicationCategorization, fetchApplicationSubCategory, fetchCustomerCategory, isAppCategoryDataLoaded, appCategoryData, isIndiviualProfileLoaded, formActionType, indiviualData, saveData, showGlobalNotification } = props;
    const [indiviualForm] = Form.useForm();

    useEffect(() => {
        if (userId && !isIndiviualProfileLoaded) {
            fetchIndiviualList({ setIsLoading: listIndiviualShowLoading, userId, extraParams });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isIndiviualProfileLoaded]);

    useEffect(() => {
        fetchApplicationCategorization({ setIsLoading: listIndiviualShowLoading, userId, parameterType: PARAM_MASTER.CUST_APP_CAT.id });
        fetchApplicationSubCategory({ setIsLoading: listIndiviualShowLoading, userId, parameterType: PARAM_MASTER.CUST_APP_SUB_CAT.id });
        fetchCustomerCategory({ setIsLoading: listIndiviualShowLoading, userId, parameterType: PARAM_MASTER.CUST_CAT.id });
        fetchGenderCategory({ setIsLoading: listIndiviualShowLoading, userId, parameterType: PARAM_MASTER.GENDER_CD.id });
        fetchMartialStatus({ setIsLoading: listIndiviualShowLoading, userId, parameterType: PARAM_MASTER.MARITAL_STATUS.id });
        fetchOccupationList({ setIsLoading: listIndiviualShowLoading, userId, parameterType: PARAM_MASTER.OCC_TYPE.id });
        fetchAnnualIncome({ setIsLoading: listIndiviualShowLoading, userId, parameterType: PARAM_MASTER.ANL_INCM.id });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isAppCategoryDataLoaded]);

    const extraParams = [
        {
            key: 'customerId',
            title: 'Customer',
            value: 'CUS1686811036620',
            name: 'customerId',
        },
    ];
    const onIndiviualFinish = (values) => {
        const recordId = formData?.id || '';
        const { accountCode, accountName, accountSegment, accountClientName, accountMappingDate, personName, postion, companyName, remarks, ...rest } = values;
        const data = { ...rest, customerId: 'CUS1686810869696', keyAccountDetails: { customerId: 'CUS1686810869696', accountCode: values.accountCode, accountName: values.accountName, accountSegment: values.accountSegment, accountClientName: values.accountClientName, accountMappingDate: values.accountMappingDate }, authorityRequest: { customerId: 'CUS1686810869696', personName: values.personName, postion: values.postion, companyName: values.companyName }, id: recordId };

        const onSuccess = (res) => {
            indiviualForm.resetFields();
            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            fetchIndiviualList({ setIsLoading: listIndiviualShowLoading, userId });
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
        indiviualForm.validateFields().then((values) => {});
    };
    const formProps = {
        indiviualForm,
        onIndiviualFinish,
        indiviualData,
        onFieldsChange,
        onFinishFailed,
        props,
        formActionType,
        formData,
        appCategoryData,
    };
    return (
        <>
            <AddEditForm {...formProps} />
        </>
    );
};

export const IndividualProfileMaster = connect(mapStateToProps, mapDispatchToProps)(IndividualProfileBase);
