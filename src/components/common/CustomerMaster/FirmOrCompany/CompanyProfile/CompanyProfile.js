import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col, Form } from 'antd';
import { showGlobalNotification } from 'store/actions/notification';
import { ViewDetail } from './ViewDetails';
import { AddEditForm } from './AddEditForm';
import { CustomerFormButton } from '../../CustomerFormButton';

import { btnVisiblity } from 'utils/btnVisiblity';
import { configParamEditActions } from 'store/actions/data/configurableParamterEditing';
import { PARAM_MASTER } from 'constants/paramMaster';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import styles from 'components/common/Common.module.css';

import { corporateCompanyProfileDataActions } from 'store/actions/data/customerMaster/corporateCompanyProfileAction';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { isLoaded: isAppCategoryDataLoaded = false, paramdata: appCategoryData = [] },
            CustomerMaster: {
                CompanyProfile: { isLoaded: isDataLoaded = false, data: companyProfileData = [] },
            },
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
        isDataLoaded,
        companyProfileData,
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
            fetchApplicationSubCategory: configParamEditActions.fetchList,
            fetchCustomerCategory: configParamEditActions.fetchList,
            resetData: corporateCompanyProfileDataActions.reset,
            listShowLoading: corporateCompanyProfileDataActions.listShowLoading,

            fetchCompanyProfileData: corporateCompanyProfileDataActions.fetchList,

            saveData: corporateCompanyProfileDataActions.saveData,
            showGlobalNotification,
        },
        dispatch
    ),
});

const CompanyProfileBase = (props) => {
    const { listShowLoading, section, saveData, userId, fetchApplicationCategorization, fetchApplicationSubCategory, fetchCustomerCategory, fetchCompanyProfileData, isAppCategoryDataLoaded, appCategoryData, isDataLoaded, companyProfileData } = props;
    const { selectedCustomerId, buttonData, setButtonData, formActionType, setFormActionType, defaultBtnVisiblity } = props;
    const [form] = Form.useForm();
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [customerType, setCustomerType] = useState('Yes');
    const [formData, setFormData] = useState();
    const ADD_ACTION = FROM_ACTION_TYPE?.ADD;
    const EDIT_ACTION = FROM_ACTION_TYPE?.EDIT;
    const VIEW_ACTION = FROM_ACTION_TYPE?.VIEW;

    useEffect(() => {
        fetchApplicationCategorization({ setIsLoading: listShowLoading, userId, parameterType: PARAM_MASTER.CUST_APP_CAT.id });
        fetchApplicationSubCategory({ setIsLoading: listShowLoading, userId, parameterType: PARAM_MASTER.CUST_APP_SUB_CAT.id });
        fetchCustomerCategory({ setIsLoading: listShowLoading, userId, parameterType: PARAM_MASTER.CUST_CAT.id });
        // eslint-disable-next-line react-hooks/exhaustive-deps
        // console.log('Record:', selectedCustomerId);
    }, [userId, isAppCategoryDataLoaded]);

    const extraParams = [
        {
            key: 'customerId',
            title: 'customerId',
            value: selectedCustomerId,
            name: 'customerId',
        },
    ];

    useEffect(() => {
        fetchCompanyProfileData({ setIsLoading: listShowLoading, userId, extraParams });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formActionType?.viewMode]);

    useEffect(() => {
        setFormData(companyProfileData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded, companyProfileData]);

    const handleButtonClick = ({ record = null, buttonAction }) => {
        form.resetFields();
        setFormData([]);
        setFormActionType({ addMode: buttonAction === ADD_ACTION, editMode: buttonAction === EDIT_ACTION, viewMode: buttonAction === VIEW_ACTION });
        setButtonData(btnVisiblity({ defaultBtnVisiblity, buttonAction }));
        record && setFormData(record);
        setIsFormVisible(true);
    };

    const onChange = (value) => {
        setCustomerType(value);
    };

    const onFinish = (values) => {
        const recordId = formData?.id || '';
        const { accountCode, accountName, accountSegment, accountClientName, accountMappingDate, personName, postion, companyName, remarks, ...rest } = values;
        const data = { ...rest, customerId: 'CUS1686810869696', keyAccountDetails: { customerId: 'CUS1686810869696', accountCode: values.accountCode, accountName: values.accountName, accountSegment: values.accountSegment, accountClientName: values.accountClientName, accountMappingDate: values.accountMappingDate }, authorityRequest: { customerId: 'CUS1686810869696', personName: values.personName, postion: values.postion, companyName: values.companyName }, id: recordId };

        const onSuccess = (res) => {
            listShowLoading(false);
            form.resetFields();
            // setSelectedRecord({});
            // setIsFormVisible(false);
            showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
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

    const onFinishFailed = (errorInfo) => {
        return;
    };

    const onCloseAction = () => {
        form.resetFields();
        setIsFormVisible(false);
        setButtonData({ ...defaultBtnVisiblity });
    };

    const formProps = {
        handleButtonClick,
        buttonData,
        onChange,
        onFinish,
        formActionType,
        appCategoryData,
        styles,
    };

    const viewProps = {
        onChange,
        onCloseAction,
        styles,
        formData,
    };

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    return (
        <>
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
        </>
    );
};

export const CompanyProfile = connect(mapStateToProps, mapDispatchToProps)(CompanyProfileBase);
