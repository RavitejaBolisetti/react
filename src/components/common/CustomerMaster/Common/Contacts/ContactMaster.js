/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Row, Col, Collapse, Form, Space, Typography, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { expandIcon } from 'utils/accordianExpandIcon';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { PARAM_MASTER } from 'constants/paramMaster';
import { FROM_ACTION_TYPE } from 'constants/formActionType';

import { configParamEditActions } from 'store/actions/data/configurableParamterEditing';
import { customerDetailDataActions } from 'store/actions/customer/customerContacts';
import { showGlobalNotification } from 'store/actions/notification';

import AddEditForm from './AddEditForm';
import ViewContactList from './ViewContactList';
import { CustomerFormButton } from '../../CustomerFormButton';

import styles from 'components/common/Common.module.css';

const { Panel } = Collapse;
const { Text } = Typography;

const mapStateToProps = (state) => {
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

const ContactMain = (props) => {
    const { section, userId, isViewModeVisible, toggleButton, fetchConfigList, resetData, listConfigShowLoading, fetchContactDetailsList, customerData, listContactDetailsShowLoading, isCustomerDataLoaded, saveData, showGlobalNotification, typeData, isConfigDataLoaded, isConfigLoading } = props;
    const { buttonData, setButtonData, selectedCustomer, formActionType, setFormActionType, defaultBtnVisiblity } = props;

    const [form] = Form.useForm();
    const [contactData, setContactData] = useState([]);
    const [openAccordian, setOpenAccordian] = useState('1');
    const [showAddEditForm, setShowAddEditForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingData, setEditingData] = useState({});

    const ADD_ACTION = FROM_ACTION_TYPE?.ADD;
    const EDIT_ACTION = FROM_ACTION_TYPE?.EDIT;
    const VIEW_ACTION = FROM_ACTION_TYPE?.VIEW;

    const extraParams = [
        {
            key: 'customerId',
            title: 'customerId',
            value: 'CUS1686833188888',
            // value: selectedCustomer?.customerId,
            name: 'customerId',
        },
    ];


    useEffect(() => {
        if (userId && !isCustomerDataLoaded && !isConfigLoading) {
            fetchContactDetailsList({ setIsLoading: listContactDetailsShowLoading, extraParams, onSuccessAction, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    useEffect(() => {
        if (userId && !isConfigDataLoaded && !isConfigLoading) {
            fetchConfigList({ setIsLoading: listConfigShowLoading, userId, parameterType: PARAM_MASTER.GENDER_CD.id });
            fetchConfigList({ setIsLoading: listConfigShowLoading, userId, parameterType: PARAM_MASTER.TITLE.id });
            fetchConfigList({ setIsLoading: listConfigShowLoading, userId, parameterType: PARAM_MASTER.FAMLY_RELTN.id });
            fetchConfigList({ setIsLoading: listConfigShowLoading, userId, parameterType: PARAM_MASTER.PURPOSE.id });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    useEffect(() => {
        if (userId && customerData?.customerContact?.length) {
            setContactData(customerData?.customerContact);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [customerData]);

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

    const onSaveFormData = (value) => {
        if (isEditing) {
            setContactData((prev) => {
                let formData = [...prev];
                formData?.forEach((contact) => {
                    if (contact?.defaultaddress === true) {
                        contact.defaultaddress = false;
                    }
                });
                const index = formData?.findIndex((el) => el?.purposeOfContact === editingData?.purposeOfContact && el?.mobileNumber === editingData?.mobileNumber && el?.FirstName === editingData?.FirstName);
                formData.splice(index, 1, { ...value });
                return [...formData];
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

    const onFinishFailed = (errorInfo) => {
        return;
    };

    const deleteContactHandeler = (data) => {
        setContactData((prev) => {
            const updatedList = [...prev];
            const index = prev?.findIndex((el) => el?.contactMobileNumber === data?.contactMobileNumber && el?.contactNameFirstName === data?.contactNameFirstName);
            updatedList.splice(index, 1);
            return [...updatedList];
        });
    };

    const onCheckdefaultAddClick = (e, value) => {
        e.stopPropagation();
        setContactData((prev) => {
            let formData = [...prev];
            formData?.forEach((contact) => {
                if (contact?.defaultaddress === true) {
                    contact.defaultaddress = false;
                };
            });
            const index = formData?.findIndex((el) => el?.purposeOfContact === value?.purposeOfContact && el?.mobileNumber === value?.mobileNumber && el?.FirstName === value?.FirstName);
            formData.splice(index, 1, { ...value, defaultContactIndicator: e.target.checked});
            return [...formData];
        })
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
        onFinish: onSaveFormData,
        styles,
        form,
        isEditing,
        setIsEditing,
        deleteContactHandeler,
        isViewModeVisible,
        setEditingData,
        typeData,
        onCheckdefaultAddClick,
    };

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    return (<>
        {/* <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormValueChange} onFinish={onSaveFormData} onFinishFailed={onFinishFailed}> */}
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <h2>{section?.title} </h2>
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
                    </Collapse>{' '}
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <CustomerFormButton {...props} />
                </Col>
            </Row>
        {/* </Form> */}
        </>
    );
};

export const IndividualContact = connect(mapStateToProps, mapDispatchToProps)(ContactMain);
