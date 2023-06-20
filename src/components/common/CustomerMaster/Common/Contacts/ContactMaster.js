/*
 *   Copyright (c) 2023
 *   All rights reserved.
 */
import React, { useState, useEffect } from 'react';
import { Collapse, Form, Space, Typography, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { expandIcon } from 'utils/accordianExpandIcon';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { PARAM_MASTER } from 'constants/paramMaster';
import { configParamEditActions } from 'store/actions/data/configurableParamterEditing';
import { customerDetailDataActions } from 'store/actions/customer/customerContacts';
import { showGlobalNotification } from 'store/actions/notification';

import AddEditForm from './AddEditForm';
import ViewContactList from './ViewContactList';
import styles from 'components/common/Common.module.css';

const { Panel } = Collapse;
const { Text } = Typography;

const mapStateToProps = (state) => {
    console.log('data', state);

    const {
        auth: { userId },
        customer: {
            customerContacts: { isLoaded: isCustomerDataLoaded = false, isLoading: isCustomerDataLoading, data: customerData = [] },
        },
        data: {
            ConfigurableParameterEditing: { isLoaded: isConfigDataLoaded = false, isLoading: isConfigLoading, paramdata: typeData = [] },
        },
    } = state;

    let returnValue = {
        userId,
        isConfigDataLoaded,
        isConfigLoading,
        isCustomerDataLoaded,
        isCustomerDataLoading,
        // typeData: typeData && typeData[PARAM_MASTER.FAMLY_RELTN.id],
        typeData: typeData,
        customerData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchConfigList: configParamEditActions.fetchList,
            listConfigShowLoading: configParamEditActions.listShowLoading,

            fetchContactDetailsList: customerDetailDataActions.fetchList,
            listContactDetailsShowLoading: customerDetailDataActions.listShowLoading,
            saveData: customerDetailDataActions.saveData,
            resetData: customerDetailDataActions.reset,

            showGlobalNotification,
        },
        dispatch
    ),
});

const extraParams = [
    {
        key: 'customerId',
        title: 'customerId',
        value: 'CUS1686833188888',
        name: 'customerId',
    },
];

const ContactMain = ({ userId, isViewModeVisible, toggleButton, fetchConfigList, resetData, listConfigShowLoading, fetchContactDetailsList, customerData, listContactDetailsShowLoading, isCustomerDataLoaded, saveData, showGlobalNotification, typeData, isConfigDataLoaded, isConfigLoading }) => {
    const [form] = Form.useForm();
    const [contactData, setContactData] = useState([]);
    const [openAccordian, setOpenAccordian] = useState('1');
    const [showAddEditForm, setShowAddEditForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingData, setEditingData] = useState({});

    console.log('typeData', typeData, "customerData", customerData?.customerContact);

    useEffect(() => {
        if (userId && !isCustomerDataLoaded && !isConfigLoading) {
            fetchContactDetailsList({ setIsLoading: listContactDetailsShowLoading, extraParams, onSuccessAction, onErrorAction })
        } else if( userId && customerData?.length ) {
            setContactData(customerData[0]?.customerContact);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, customerData]);

    useEffect(() => {
        if (userId && !isConfigDataLoaded && !isConfigLoading) {
            fetchConfigList({ setIsLoading: listConfigShowLoading, userId, parameterType: PARAM_MASTER.GENDER_CD.id });
            fetchConfigList({ setIsLoading: listConfigShowLoading, userId, parameterType: PARAM_MASTER.TITLE.id });
            fetchConfigList({ setIsLoading: listConfigShowLoading, userId, parameterType: PARAM_MASTER.FAMLY_RELTN.id });
            fetchConfigList({ setIsLoading: listConfigShowLoading, userId, parameterType: PARAM_MASTER.PURPOSE.id });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    const onSuccessAction = (res) => {
        showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
    };

    const onErrorAction = (message) => {
        resetData();
        showGlobalNotification({ message });
    };

    const handleCollapse = (key) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };


    const onFinish = (value) => {
        if (isEditing) {
            setContactData((prev) => {
                let formData = [...prev];
                // if (value?.defaultaddress && formData?.length > 1) {
                formData?.forEach((contact) => {
                    if (contact?.defaultaddress === true) {
                        contact.defaultaddress = false;
                    }
                });
                const index = formData?.findIndex((el) => el?.purposeOfContact === editingData?.purposeOfContact && el?.mobileNumber === editingData?.mobileNumber && el?.FirstName === editingData?.FirstName);
                formData.splice(index, 1, { ...value });
                return [...formData];
                // } else {
                //     return [...prev, { ...value }];
                // }
            });
        } else {
            setContactData((prev) => {
                let formData = [...prev];
                if (value?.defaultaddress && formData?.length >= 1) {
                    formData?.forEach((contact) => {
                        if (contact?.defaultaddress === true) {
                            contact.defaultaddress = false;
                        }
                    });
                    return [...formData, value];
                } else {
                    return [...prev, { ...value }];
                }
            });
        }
        setShowAddEditForm(false);
        setIsEditing(false);
        setEditingData({});
        form.resetFieldsValue();
    };

    const deleteContactHandeler = (data) => {
        console.log('delete Data', data);
        setContactData((prev) => {
            const updatedList = [...prev];
            const index = prev?.findIndex((el) => el?.contactMobileNumber === data?.contactMobileNumber && el?.contactNameFirstName === data?.contactNameFirstName);
            updatedList.splice(index, 1);
            return [...updatedList];
        });
    };

    const addBtnContactHandeler = (e) => {
        e.stopPropagation();
        form.resetFields();
        setShowAddEditForm(true);
        setOpenAccordian('1');
    };

    const formProps = {
        setShowAddEditForm,
        showAddEditForm,
        setContactData,
        contactData,
        onFinish,
        styles,
        form,
        isEditing,
        setIsEditing,
        deleteContactHandeler,
        isViewModeVisible,
        setEditingData,
        typeData,
    };

    return (
        <>
            <Collapse onChange={() => handleCollapse(1)} expandIconPosition="end" expandIcon={({ isActive }) => expandIcon(isActive)} activeKey={openAccordian}>
                <Panel
                    header={
                        <Space>
                            <Text strong> {toggleButton === 'Individual' ? 'Individual Contact' : 'Company Contact'}</Text>
                            {!isViewModeVisible && (
                                <Button onClick={addBtnContactHandeler} icon={<PlusOutlined />} type="primary">
                                    Add Contact
                                </Button>
                            )}
                        </Space>
                    }
                    key="1"
                >
                    {!isViewModeVisible && (showAddEditForm || !contactData?.length > 0) && <AddEditForm {...formProps} />}
                    <ViewContactList {...formProps} />
                </Panel>
            </Collapse>
        </>
    );
};

export const IndividualContact = connect(mapStateToProps, mapDispatchToProps)(ContactMain);