/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useMemo, useState } from 'react';
import { AddEditForm } from './AddEditForm';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form } from 'antd';
import { configParamEditActions } from 'store/actions/data/configurableParamterEditing';
import { PARAM_MASTER } from 'constants/paramMaster';
import { showGlobalNotification } from 'store/actions/notification';
import { customerDetailsIndividualDataActions } from 'store/actions/data/customerMaster/customerDetailsIndividual';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { btnVisiblity } from 'utils/btnVisiblity';
import { corporateLovDataActions } from 'store/actions/data/customerMaster/corporateLov';
import { productHierarchyDataActions } from 'store/actions/data/productHierarchy';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            CustomerMaster: {
                CustomerDetailsIndividual:{isLoaded: isDataLoaded = false, isLoading,  data: customerDetailsIndividualData = []  },
                CorporateLov: {isLoaded: isCorporateLovDataLoaded = false, isloading: isCorporateLovLoading, data: corporateLovData = []}
            },
            ConfigurableParameterEditing: { isLoaded: isTypeDataLoaded = false, isTypeDataLoading, paramdata: typeData = [] },
        },
    } = state;

    const moduleTitle = 'Customer Details';

    let returnValue = {
        userId,
        isTypeDataLoaded,
        isTypeDataLoading,
        moduleTitle,

    isDataLoaded,
    isLoading,
    customerDetailsIndividualData,
    typeData: typeData,

    isCorporateLovDataLoaded,
    isCorporateLovLoading,
    corporateLovData,
};
return returnValue;
};
const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchConfigList: configParamEditActions.fetchList,
            listConfigShowLoading: configParamEditActions.listShowLoading,


            fetchCorporateLovList: corporateLovDataActions.fetchList,
            listCorporateLovShowLoading: corporateLovDataActions.listShowLoading,

            fetchList: customerDetailsIndividualDataActions.fetchList,
            listShowLoading: customerDetailsIndividualDataActions.listShowLoading,
            saveData: customerDetailsIndividualDataActions.saveData,
            resetData: customerDetailsIndividualDataActions.reset,
            showGlobalNotification,
        },
        dispatch
    ),
});

const IndivisualCustomerDetailsMasterBase = (props) => {
    const { userId, isDataLoaded, isLoading, isTypeDataLoaded, isTypeDataLoading, showGlobalNotification, customerDetailsIndividualData, typeData, saveData, fetchConfigList, listConfigShowLoading, fetchList, listShowLoading, moduleTitle, fetchCorporateLovList, isCorporateLovLoading, isCorporateLovDataLoaded, listCorporateLovShowLoading, corporateLovData } = props;
    const [form] = Form.useForm();
    const [customerDetailsList, setCustomerDetailsList] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [customerType, setCustomerType] = useState('Yes');
    const [editedMode, setEditedMode] = useState(false);
    const [formData, setFormData] = useState();
    const [configurableTypedata, setConfigurableTypedata] = useState({});
    const [refershData, setRefershData] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const defaultBtnVisiblity = { editBtn: false, saveBtn: false, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn: false, formBtnActive: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });
    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });
    const [showDataLoading, setShowDataLoading] = useState(true);
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

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
    };

    useEffect(() => {
        if (userId) {
            if (!isTypeDataLoaded && !isTypeDataLoading) {
                fetchConfigList({ setIsLoading: listConfigShowLoading, userId, parameterType: PARAM_MASTER.CUST_TYPE.id });
                fetchConfigList({ setIsLoading: listConfigShowLoading, userId, parameterType: PARAM_MASTER.CORP_TYPE.id });
                fetchConfigList({ setIsLoading: listConfigShowLoading, userId, parameterType: PARAM_MASTER.CORP_CATE.id });
                fetchConfigList({ setIsLoading: listConfigShowLoading, userId, parameterType: PARAM_MASTER.TITLE.id });
                fetchConfigList({ setIsLoading: listConfigShowLoading, userId, parameterType: PARAM_MASTER.MEM_TYPE.id });
            }
        }
        if (userId) {
            if (!isDataLoaded && !isLoading && userId) {
                fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction, extraParams, onErrorAction });
            }
            if (userId && !isCorporateLovDataLoaded) {
                fetchCorporateLovList({ setIsLoading: listCorporateLovShowLoading, userId });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isDataLoaded]);

    useEffect(() => {
        if (typeData) {
            setConfigurableTypedata({ CUST_TYPE: typeData['CUST_TYPE'], CORP_TYPE: typeData['CORP_TYPE'], CORP_CATE: typeData['CORP_CATE'], TITLE: typeData['TITLE'], MEM_TYPE: typeData['MEM_TYPE'] });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [typeData]);
    const onChange = (value) => {
        setCustomerType(value);
    };
    const onSuccessAction = (res) => {
        refershData && showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
        setRefershData(false);
        setShowDataLoading(false);
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
       console.log(formData,'FORMDATA')
        const data = { ...values, customerId: 'CUS1686812277115' };

        console.log(form.getFieldValue(), 'Aman ');

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

        console.log(requestData, 'Aman');
        saveData(requestData);
        console.log('buttonClick',buttonData)
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
    console.log(formData,'FORMDATA222');
    const formProps = {
        formActionType,
        formData,
        form,
        onFinish,
        onCloseAction,
        titleOverride: drawerTitle.concat(moduleTitle),
        saveData,
        onChange,
        corporateLovData,
        setFormActionType,
        onFinishFailed,
        handleButtonClick,
        customerDetailsList,
        showForm,
        fetchCorporateLovList,
        setShowForm,
        customerType,
        editedMode,
        setButtonData,
        setEditedMode,
        setCustomerType,
        typeData,
        customerDetailsIndividualData,
        configurableTypedata,
    };

    return <AddEditForm {...formProps} />;
};
export const IndivisualCustomerDetailsMaster = connect(mapStateToProps, mapDispatchToProps)(IndivisualCustomerDetailsMasterBase);
