/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useReducer, useEffect } from 'react';
import { Row, Col, Form, Space, Typography, Button, Empty, Card, Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { customerDetailDataActions } from 'store/actions/customer/customerContacts';
import { customerDetailIndividualDataActions } from 'store/actions/customer/customerContactsIndividual';
import { showGlobalNotification } from 'store/actions/notification';

import AddEditForm from './AddEditForm';
import ViewContactList from './ViewContactList';

import { CustomerFormButton } from '../../CustomerFormButton';
import { CardSkeleton } from 'components/common/Skeleton';
import { CUSTOMER_TYPE } from 'constants/CustomerType';
import { LANGUAGE_EN } from 'language/en';

import styles from 'components/common/Common.module.css';

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
    const { form, section, userId, customerType, resetData, fetchContactDetailsList, customerData, customerIndData, listContactDetailsShowLoading, saveData, showGlobalNotification, typeData } = props;
    const { isCustomerIndDataLoading, isCustomerDataLoading, selectedCustomer, fetchContactIndividualDetailsList, saveIndividualData, resetIndividualData } = props;
    const { buttonData, setButtonData, formActionType, handleButtonClick, NEXT_ACTION } = props;

    const [contactform] = Form.useForm();
    const [contactData, setContactData] = useState([]);
    const [showAddEditForm, setShowAddEditForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingData, setEditingData] = useState({});
    const [uploadImgDocId, setUploadImgDocId] = useState('');
    const [continueWithOldMobNo, setContinueWithOldMobNo] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [, forceUpdate] = useReducer((x) => x + 1, 0);

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
        return () => {
            setUploadImgDocId('');
            resetData();
            resetIndividualData();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (userId && selectedCustomer?.customerId) {
            if (customerType === CUSTOMER_TYPE?.INDIVIDUAL?.id) {
                fetchContactIndividualDetailsList({ setIsLoading: listContactDetailsShowLoading, extraParams });
            } else if (customerType === CUSTOMER_TYPE?.CORPORATE?.id) {
                fetchContactDetailsList({ setIsLoading: listContactDetailsShowLoading, extraParams });
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedCustomer?.customerId]);

    useEffect(() => {
        if (customerType === CUSTOMER_TYPE?.INDIVIDUAL?.id && selectedCustomer?.customerId && customerIndData?.customerContact) {
            setContactData(customerIndData?.customerContact || []);
            // setUploadImgDocId(customerIndData?.customerContact[0].docId);
        } else if (customerData?.customerContact && selectedCustomer?.customerId) {
            setContactData(customerData?.customerContact || []);
            // setUploadImgDocId(customerData?.customerContact[0]['docId']);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [customerData, customerIndData]);

    const onSuccessAction = (res) => {
        showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
    };

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
    };

    const onSaveFormData = () => {
        contactform
            .validateFields()
            .then((value) => {
                
                const defaultAdddress = contactData.find((i) => i?.defaultContactIndicator && i?.purposeOfContact !== value?.purposeOfContact) && value?.defaultContactIndicator;
                if (defaultAdddress) {
                    return showGlobalNotification({ message: 'Only one contact can be default' });
                }

                if (isEditing) {
                    setContactData((prev) => {
                        let formData = prev?.length ? [...prev] : [];
                        const index = formData?.findIndex((el) => el?.purposeOfContact === editingData?.purposeOfContact && el?.mobileNumber === editingData?.mobileNumber && el?.firstName === editingData?.firstName);
                        formData.splice(index, 1, { relationCode: '', ...value, docId: uploadImgDocId });
                        return [...formData];
                    });
                } else {
                    setContactData((prev) => {
                        let formData = prev?.length ? [...prev] : [];
                        if (value?.defaultaddress && formData?.length >= 1) {
                            return [...formData, { relationCode: '', ...value, docId: uploadImgDocId }];
                        } else {
                            const updVal = prev?.length ? [...prev, { relationCode: '', ...value, docId: uploadImgDocId }] : [{ relationCode: '', ...value, docId: uploadImgDocId }];
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
            const index = updetedData?.findIndex((el) => el?.purposeOfContact === value?.purposeOfContact && el?.firstName === value?.firstName && el?.mobileNumber === value?.mobileNumber);
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
    };

    const formProps = {
        setShowAddEditForm,
        showAddEditForm,
        setContactData,
        contactData,
        onSaveFormData,
        styles,
        form,
        contactform,
        editingData,
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

    const onFinish = () => {
        let data = { customerId: selectedCustomer?.customerId, customerContact: contactData };

        const onSuccess = (res) => {
            contactform.resetFields();
            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            setButtonData({ ...buttonData, formBtnActive: false });
            handleButtonClick({ record: res?.data, buttonAction: NEXT_ACTION });
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
    const formSkeleton = (
        <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <CardSkeleton height={'100vh'} />
            </Col>
        </Row>
    );

    return (
        <>
            <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormValueChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Row gutter={20} className={styles.drawerBodyRight}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <h2>{section?.title} </h2>
                        <Card className="">
                            {isCustomerIndDataLoading || isCustomerDataLoading ? (
                                formSkeleton
                            ) : (
                                <>
                                    <Row type="flex" align="middle">
                                        <Text strong> {customerType === CUSTOMER_TYPE?.INDIVIDUAL?.id ? 'Individual Contact' : 'Company Contact'}</Text>
                                        {!formActionType?.viewMode && (
                                            <Button onClick={addBtnContactHandeler} icon={<PlusOutlined />} type="primary" disabled={isEditing || isAdding}>
                                                Add
                                            </Button>
                                        )}
                                    </Row>
                                    <Divider className={styles.marT20} />
                                    <Space direction="vertical" style={{ width: '100%' }} className={styles.accordianContainer}>
                                        <div className={styles.headerBox}>
                                            {!formActionType?.viewMode && showAddEditForm && <AddEditForm {...formProps} />}
                                            {!contactData?.length && !isAdding ? (
                                                <>
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
                                        </div>
                                    </Space>
                                </>
                            )}
                        </Card>
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
