/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useReducer, useEffect } from 'react';
import { Row, Col, Collapse, Form, Space, Typography, Button, Empty, Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { customerDetailDataActions } from 'store/actions/customer/customerContacts';
import { customerDetailIndividualDataActions } from 'store/actions/customer/customerContactsIndividual';
import { showGlobalNotification } from 'store/actions/notification';

import AddEditForm from './AddEditForm';
import ViewContactList from './ViewContactList';
import { CustomerFormButton } from '../../CustomerFormButton';
import { InputSkeleton } from 'components/common/Skeleton';
import { CUSTOMER_TYPE } from 'constants/CustomerType';
import { LANGUAGE_EN } from 'language/en';

import { FROM_ACTION_TYPE } from 'constants/formActionType';

import styles from 'components/common/Common.module.css';

const { Panel } = Collapse;
const { Text } = Typography;

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        customer: {
            customerContacts: { isLoaded: isCustomerDataLoaded = false, isLoading: isCustomerDataLoading, data: customerData = [] },
            customerContactsIndividual: { isLoaded: isCustomerIndDataLoaded = false, isLoading: isCustomerIndDataLoading, data: customerIndData = [] },
        },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
        },
    } = state;

    let returnValue = {
        userId,
        isCustomerDataLoaded,
        isCustomerDataLoading,
        typeData: typeData,
        customerData,

        isCustomerIndDataLoaded,
        isCustomerIndDataLoading,
        customerIndData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchContactDetailsList: customerDetailDataActions.fetchList,
            listContactDetailsShowLoading: customerDetailDataActions.listShowLoading,
            saveData: customerDetailDataActions.saveData,
            resetData: customerDetailDataActions.reset,

            fetchContactIndividualDetailsList: customerDetailIndividualDataActions.fetchList,
            listContactIndividualDetailsShowLoading: customerDetailIndividualDataActions.listShowLoading,
            saveIndividualData: customerDetailIndividualDataActions.saveData,
            resetIndividualData: customerDetailIndividualDataActions.reset,

            showGlobalNotification,
        },
        dispatch
    ),
});

const ContactMain = (props) => {
    const { form, section, userId, customerType, resetData, fetchContactDetailsList, customerData, customerIndData, listContactDetailsShowLoading, isCustomerDataLoaded, saveData, showGlobalNotification, typeData } = props;
    const { isCustomerDataLoading, selectedCustomer, fetchContactIndividualDetailsList, saveIndividualData, resetIndividualData } = props;
    const { buttonData, setButtonData, formActionType, handleButtonClick, setSelectedCustomer, setSelectedCustomerId, NEXT_ACTION } = props;

    const [contactform] = Form.useForm();
    const [contactData, setContactData] = useState([]);
    const [openAccordian, setOpenAccordian] = useState('1');
    const [showAddEditForm, setShowAddEditForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingData, setEditingData] = useState({});
    const [uploadImgDocId, setUploadImgDocId] = useState('');
    const [continueWithOldMobNo, setContinueWithOldMobNo] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [, forceUpdate] = useReducer((x) => x + 1, 0);

    const NEXT_EDIT_ACTION = FROM_ACTION_TYPE?.NEXT_EDIT;
    const noDataTitle = LANGUAGE_EN.GENERAL.NO_DATA_EXIST.TITLE;

    const extraParams = [
        {
            key: 'customerId',
            title: 'customerId',
            value: selectedCustomer?.customerId,
            name: 'customerId',
        },
    ];

    useEffect(() => {
        if (userId && selectedCustomer?.customerId) {
            if (customerType === CUSTOMER_TYPE?.INDIVIDUAL?.id) {
                fetchContactIndividualDetailsList({ setIsLoading: listContactDetailsShowLoading, extraParams, onSuccessAction, onErrorAction });
            } else {
                fetchContactDetailsList({ setIsLoading: listContactDetailsShowLoading, extraParams, onSuccessAction, onErrorAction });
            }
        }

        return () => {
            resetData();
            resetIndividualData();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedCustomer?.customerId]);

    useEffect(() => {
        if (customerType === CUSTOMER_TYPE?.INDIVIDUAL?.id) {
            setContactData(customerIndData?.customerContact || []);
        } else {
            setContactData(customerData?.customerContact || []);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [customerData, customerIndData]);

    const onSuccessAction = (res) => {
        showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
    };

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
    };

    const handleCollapse = (key) => {
        setOpenAccordian(key);
    };

    const onSaveFormData = () => {
        contactform
            .validateFields()
            .then((value) => {
                if (isEditing) {
                    setContactData((prev) => {
                        let formData = prev?.length ? [...prev] : [];
                        formData?.forEach((contact) => {
                            if (contact?.defaultContactIndicator === true) {
                                contact.defaultContactIndicator = false;
                            }
                        });
                        const index = formData?.findIndex((el) => el?.purposeOfContact === editingData?.purposeOfContact && el?.mobileNumber === editingData?.mobileNumber && el?.FirstName === editingData?.FirstName);
                        formData.splice(index, 1, { ...value });
                        return [...formData];
                    });
                } else {
                    setContactData((prev) => {
                        let formData = prev?.length ? [...prev] : [];
                        if (value?.defaultaddress && formData?.length >= 1) {
                            formData?.forEach((contact) => {
                                if (contact?.defaultaddress === true) {
                                    contact.defaultaddress = false;
                                }
                            });
                            return [...formData, value];
                        } else {
                            const updVal = prev?.length ? [...prev, { ...value }] : [{ ...value }];
                            return updVal;
                        }
                    });
                }
                setShowAddEditForm(false);
                setIsEditing(false);
                setEditingData({});
                setIsAdding(false);
                contactform.resetFields();
            })
            .catch((err) => console.error(err));
    };

    const onCheckdefaultAddClick = (e, value) => {
        e.stopPropagation();
        setContactData((prev) => {
            let updetedData = prev?.map((contact) => ({ ...contact, status: true, defaultContactIndicator: false, continueWith: continueWithOldMobNo }));
            const index = updetedData?.findIndex((el) => el?.purposeOfContact === value?.purposeOfContact);
            updetedData.splice(index, 1, { ...value, defaultContactIndicator: e.target.checked });
            return [...updetedData];
        });
        forceUpdate();
    };

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const addBtnContactHandeler = (e) => {
        e.stopPropagation();
        setIsAdding(true);
        contactform.resetFields();
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
        contactform,
        isEditing,
        setIsEditing,
        formActionType,
        setEditingData,
        typeData,
        onCheckdefaultAddClick,
        setButtonData,
        setUploadImgDocId,
        uploadImgDocId,
        handleFormValueChange,
        setContinueWithOldMobNo,

        customerType,
        isAdding,
        setIsAdding,
        buttonData,
    };

    const onSubmit = () => {
        let data = { customerId: selectedCustomer?.customerId, customerContact: contactData?.map((el) => ({ ...el, docId: uploadImgDocId || el?.docId })) };

        const onSuccess = (res) => {
            contactform.resetFields();
            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            setButtonData({ ...buttonData, formBtnActive: false });
            handleButtonClick({ record: res?.data, buttonAction: NEXT_ACTION });
            setSelectedCustomer({ ...res.data, customerName: res?.data?.firstName + ' ' + res?.data?.middleName + ' ' + res?.data?.lastName });
            setSelectedCustomerId(res?.data?.customerId);
            if (customerType === CUSTOMER_TYPE?.INDIVIDUAL?.id) {
                fetchContactIndividualDetailsList({ setIsLoading: listContactDetailsShowLoading, extraParams, onSuccessAction, onErrorAction });
            } else {
                fetchContactDetailsList({ setIsLoading: listContactDetailsShowLoading, extraParams, onSuccessAction, onErrorAction });
            }
        };

        const onError = (message) => {
            showGlobalNotification({ message });
        };

        const requestData = {
            data: data,
            method: 'post',
            setIsLoading: listContactDetailsShowLoading,
            userId,
            onError,
            onSuccess,
        };

        if (customerType === CUSTOMER_TYPE?.INDIVIDUAL?.id) {
            saveIndividualData(requestData);
        } else {
            saveData(requestData);
        }

        setShowAddEditForm(false);
        setIsEditing(false);
        setIsAdding(false);
        setEditingData({});
        contactform.resetFields();
    };

    const onFinishFailed = (err) => {
        console.error(err);
    };

    return (
        <>
            <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormValueChange} onFinish={onSubmit} onFinishFailed={onFinishFailed}>
                <Row gutter={20} className={styles.drawerBodyRight}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <h2>{section?.title} </h2>
                        <Collapse onChange={() => handleCollapse(1)} activeKey={openAccordian}>
                            <Panel
                                header={
                                    <Space>
                                        <Text strong> {customerType === CUSTOMER_TYPE?.INDIVIDUAL?.id ? 'Individual Contact' : 'Company Contact'}</Text>
                                        {!formActionType?.viewMode && (
                                            <Button onClick={addBtnContactHandeler} icon={<PlusOutlined />} type="primary" disabled={isEditing || isAdding}>
                                                Add
                                            </Button>
                                        )}
                                    </Space>
                                }
                                showArrow={false}
                                key="1"
                            >
                                {!formActionType?.viewMode && showAddEditForm && <AddEditForm {...formProps} />}
                                {!contactData?.length && !isAdding ? (
                                    <>
                                        <Divider />
                                        <Empty
                                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                                            imageStyle={{
                                                height: 60,
                                            }}
                                            description={
                                                <span>
                                                    {noDataTitle} <br />
                                                </span>
                                            }
                                        ></Empty>
                                    </>
                                ) : (
                                    <ViewContactList {...formProps} />
                                )}
                            </Panel>
                        </Collapse>{' '}
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

export const IndividualContact = connect(mapStateToProps, mapDispatchToProps)(ContactMain);
