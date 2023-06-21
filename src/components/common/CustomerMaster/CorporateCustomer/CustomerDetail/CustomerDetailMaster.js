/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useMemo, useState } from 'react';
import { Row, Col, Form } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { configParamEditActions } from 'store/actions/data/configurableParamterEditing';
import { customerDetailsDataActions } from 'store/actions/data/customerMaster/customerDetails';
import { showGlobalNotification } from 'store/actions/notification';

import { ViewDetail } from './ViewDetail';
import { AddEditForm } from './AddEditForm';
import { CustomerFormButton } from '../../CustomerFormButton';

import { btnVisiblity } from 'utils/btnVisiblity';

import { PARAM_MASTER } from 'constants/paramMaster';
import { FROM_ACTION_TYPE } from 'constants/formActionType';

import styles from 'components/common/Common.module.css';
import { corporateDataActions } from 'store/actions/data/customerMaster/corporate';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            CustomerMaster: {
                CustomerDetails: { isLoaded: isDataLoaded = false, isLoading, data: customerDetailsData = [] },
                Corporate: { isFilteredListLoaded: isCorporateLovDataLoaded = false, isLoading: isCorporateLovLoading, filteredListData: corporateLovData },
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
        customerDetailsData,
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

            fetchCorporateLovList: corporateDataActions.fetchFilteredList,
            listCorporateLovShowLoading: corporateDataActions.listShowLoading,

            fetchList: customerDetailsDataActions.fetchList,
            listShowLoading: customerDetailsDataActions.listShowLoading,
            saveData: customerDetailsDataActions.saveData,
            resetData: customerDetailsDataActions.reset,
            showGlobalNotification,
        },
        dispatch
    ),
});

const CompanyCustomerDetailsMasterBase = (props) => {
    const { userId, isDataLoaded, isLoading, isTypeDataLoaded, isTypeDataLoading, showGlobalNotification, customerDetailsData, section, fetchConfigList, listConfigShowLoading, fetchList, listShowLoading, moduleTitle, typeData, saveData,fetchCorporateLovList,listCorporateLovShowLoading,isCorporateLovDataLoaded,corporateLovData } = props;
    const { buttonData, setButtonData, formActionType, setFormActionType, defaultBtnVisiblity } = props;
    const { sectionName, currentSection, setCurrentSection, selectedCustomer } = props;

    const [form] = Form.useForm();

    const [customerDetailsList, setCustomerDetailsList] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const [isFormVisible, setIsFormVisible] = useState(false);
    const [configurableTypedata, setConfigurableTypedata] = useState({});
    const [formData, setFormData] = useState();
    const [refershData, setRefershData] = useState(false);

    const [showDataLoading, setShowDataLoading] = useState(true);

    const ADD_ACTION = FROM_ACTION_TYPE?.ADD;
    const EDIT_ACTION = FROM_ACTION_TYPE?.EDIT;
    const VIEW_ACTION = FROM_ACTION_TYPE?.VIEW;

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
    };

    useEffect(() => {
        if (userId) {
            if (!isTypeDataLoaded && !isTypeDataLoading) {
                fetchConfigList({ setIsLoading: listConfigShowLoading, userId, parameterType: PARAM_MASTER.CUST_TYPE.id });
                fetchConfigList({ setIsLoading: listConfigShowLoading, userId, parameterType: PARAM_MASTER.CORP_TYPE.id });
                fetchConfigList({ setIsLoading: listConfigShowLoading, userId, parameterType: PARAM_MASTER.CORP_CATE.id });
                fetchConfigList({ setIsLoading: listConfigShowLoading, userId, parameterType: PARAM_MASTER.MEM_TYPE.id });
            }
            if (!isDataLoaded && !isLoading && !formActionType?.addMode) {
                fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction, extraParams, onErrorAction });
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isDataLoaded]);
    useEffect(() => {
        if (userId && !isCorporateLovDataLoaded) {
            fetchCorporateLovList({ setIsLoading: listCorporateLovShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isCorporateLovDataLoaded]);
    useEffect(() => {
        if (typeData) {
            setConfigurableTypedata({ CUST_TYPE: typeData['CUST_TYPE'], CORP_TYPE: typeData['CORP_TYPE'], CORP_CATE: typeData['CORP_CATE'], TITLE: typeData['TITLE'], MEM_TYPE: typeData['MEM_TYPE'] });
        }
        if(customerDetailsData && isDataLoaded)
        {
            setFormData(customerDetailsData)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [typeData,customerDetailsData,isDataLoaded]);
    useEffect(() => {
        if (!isDataLoaded && userId) {
            const extraParams = [
                {
                    key: 'customerId',
                    title: 'customerId',
                    value: selectedCustomer?.customerId,
                    name: 'Customer ID',
                },
            ];
            fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction, extraParams, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isDataLoaded, selectedCustomer]);

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
        const recordId = customerDetailsData?.id || '';
        const data = { ...values, customerId: customerDetailsData.customerId, id: recordId };

        const onSuccess = (res) => {
            form.resetFields();
            setShowDataLoading(true);
            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            setButtonData({ ...buttonData, formBtnActive: false });
            const section = Object.values(sectionName)?.find((i) => i.id > currentSection);
            section && setCurrentSection(section?.id);
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

    const extraParams = [
        {
            key: 'customerId',
            title: 'customerId',
            value:  selectedCustomer?.customerId,
            name: 'Customer Id',
        },
    ];

    const formProps = {
        form,
        formData,
        buttonData,
        onFinish,
        onCloseAction,
        onFinishFailed,
        customerDetailsList,
        titleOverride: drawerTitle.concat(moduleTitle),
        saveData,
        showForm,
        setShowForm,
        formActionType,
        typeData,
        configurableTypedata,
        handleButtonClick,
        styles,
    };

    const viewProps = {
        formData:customerDetailsData,
        onCloseAction,
        styles,
    };

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    return (
        <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormValueChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
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
    );
};
export const CustomerDetailMaster = connect(mapStateToProps, mapDispatchToProps)(CompanyCustomerDetailsMasterBase);