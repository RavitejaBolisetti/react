/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useReducer, useEffect } from 'react';
import { Row, Col, Form, Typography, Button, Card, Divider } from 'antd';
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
import { NoDataFound } from 'utils/noDataFound';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';
import { withSpinner } from 'components/withSpinner';

const { Text } = Typography;

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        customer: {
            customerContacts: { isLoaded: isCustomerDataLoaded = false, isLoading: isCustomerDataLoading, data: customerData = [], isLoadingOnSave: isCorporateContactsFormSaving = false },
            customerContactsIndividual: { isLoaded: isCustomerIndDataLoaded = false, isLoading: isCustomerIndDataLoading, data: customerIndData = [], isLoadingOnSave: isIndividualFormSaveLoading = false },
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

        isLoadingOnSave: isCorporateContactsFormSaving || isIndividualFormSaveLoading,
        isLoading: isCustomerDataLoading || isCustomerIndDataLoading,
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
            saveFormCorporateLoading: customerDetailDataActions.saveFormShowLoading,
            resetData: customerDetailDataActions.reset,

            fetchContactIndividualDetailsList: customerDetailIndividualDataActions.fetchList,
            listContactIndividualDetailsShowLoading: customerDetailIndividualDataActions.listShowLoading,
            saveIndividualData: customerDetailIndividualDataActions.saveData,
            saveFormIndividualLoading: customerDetailIndividualDataActions.saveFormShowLoading,
            resetIndividualData: customerDetailIndividualDataActions.reset,

            showGlobalNotification,
        },
        dispatch
    ),
});

const ContactMain = (props) => {
    const { form, section, userId, customerType, resetData, fetchContactDetailsList, customerData, customerIndData, listContactDetailsShowLoading, saveData, showGlobalNotification, typeData } = props;
    const { isCustomerIndDataLoading, isCustomerDataLoading, selectedCustomer, selectedCustomerId, fetchContactIndividualDetailsList, saveIndividualData, resetIndividualData } = props;
    const { buttonData, setButtonData, formActionType, handleButtonClick, NEXT_ACTION } = props;
    const { saveFormIndividualLoading, saveFormCorporateLoading } = props;

    const [contactform] = Form.useForm();
    const [contactData, setContactData] = useState([]);
    const [showAddEditForm, setShowAddEditForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingData, setEditingData] = useState({});
    const [isAdding, setIsAdding] = useState(false);
    const [, forceUpdate] = useReducer((x) => x + 1, 0);

    const addDataTitle = (
        <p className={styles.textCenter}>
            Please add new contact using <br /> <strong>“Add”</strong> button at top
        </p>
    );

    const extraParams = [
        {
            key: 'customerId',
            title: 'customerId',
            value: selectedCustomerId,
            name: 'customerId',
        },
    ];

    useEffect(() => {
        return () => {
            resetData();
            resetIndividualData();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (userId && selectedCustomerId) {
            if (customerType === CUSTOMER_TYPE?.INDIVIDUAL?.id) {
                fetchContactIndividualDetailsList({ setIsLoading: listContactDetailsShowLoading, extraParams });
            } else if (customerType === CUSTOMER_TYPE?.CORPORATE?.id) {
                fetchContactDetailsList({ setIsLoading: listContactDetailsShowLoading, extraParams });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedCustomerId]);

    useEffect(() => {
        if (customerType === CUSTOMER_TYPE?.INDIVIDUAL?.id && selectedCustomerId && customerIndData?.customerContact) {
            setContactData(customerIndData?.customerContact || []);
        } else if (customerData?.customerContact && selectedCustomerId) {
            setContactData(customerData?.customerContact || []);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [customerData, customerIndData]);

    const onSuccessAction = (res) => {
        showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
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
                    return showGlobalNotification({ message: translateContent('customerMaster.notification.contact') });
                }

                if (isEditing) {
                    setContactData((prev) => {
                        let formData = prev?.length ? [...prev] : [];
                        const index = formData?.findIndex((el) => el?.purposeOfContact === editingData?.purposeOfContact && el?.mobileNumber === editingData?.mobileNumber && el?.FirstName === editingData?.FirstName);
                        formData.splice(index, 1, { relationCode: '', ...value });
                        return [...formData];
                    });
                } else {
                    setContactData((prev) => {
                        let formData = prev?.length ? [...prev] : [];
                        if (value?.defaultaddress && formData?.length >= 1) {
                            return [...formData, { relationCode: '', ...value }];
                        } else {
                            const updVal = prev?.length ? [...prev, { relationCode: '', ...value }] : [{ relationCode: '', ...value }];
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
            let updetedData = prev?.map((contact) => ({ ...contact, status: true, defaultContactIndicator: false, continueWith: false }));
            const index = updetedData?.findIndex((el) => el?.purposeOfContact === value?.purposeOfContact && el?.firstName === value?.firstName && el?.mobileNumber === value?.mobileNumber);
            updetedData.splice(index, 1, { ...value, defaultContactIndicator: e.target.checked });
            return [...updetedData];
        });
        setButtonData({ ...buttonData, formBtnActive: true });
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
        userId,
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
        handleFormValueChange,

        customerType,
        isAdding,
        setIsAdding,
        buttonData,

        showGlobalNotification,
        selectedCustomer,
    };

    const onFinish = () => {
        if (contactData.findIndex((i) => i?.defaultContactIndicator) === -1) {
            return showGlobalNotification({ message: translateContent('global.generalMessage.atLeastOneContactShouldDefault') });
        }

        let data = { customerId: selectedCustomerId, customerContact: contactData };
        const isIndividualCustomer = customerType === CUSTOMER_TYPE?.INDIVIDUAL?.id;
        const saveFinalData = isIndividualCustomer ? saveIndividualData : saveData;
        const saveLoading = isIndividualCustomer ? saveFormCorporateLoading : saveFormIndividualLoading;

        const onSuccess = (res) => {
            contactform.resetFields();
            showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
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

        setShowAddEditForm(false);
        setIsEditing(false);
        setIsAdding(false);
        setEditingData({});
        contactform.resetFields();

        saveFinalData({
            data: data,
            method: customerData?.customerContact ? 'put' : 'post',
            setIsLoading: saveLoading,
            userId,
            onError,
            onSuccess,
        });
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
            <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormValueChange} onFinish={onFinish}>
                <Row gutter={20} className={styles.drawerBodyRight}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <h2>{translateContent(section?.translateKey)} </h2>
                        <Card className="">
                            {isCustomerIndDataLoading || isCustomerDataLoading ? (
                                formSkeleton
                            ) : (
                                <>
                                    <Row type="flex" align="middle">
                                        <Text strong> {customerType === CUSTOMER_TYPE?.INDIVIDUAL?.id ? translateContent('customerMaster.drawerSubHeading.contactTitle') : 'Company Contact'}</Text>
                                        {!formActionType?.viewMode && (
                                            <Button onClick={addBtnContactHandeler} icon={<PlusOutlined />} type="primary" disabled={isEditing || isAdding}>
                                                {translateContent('global.buttons.add')}
                                            </Button>
                                        )}
                                    </Row>
                                    <Divider className={styles.marT20} />
                                    {!formActionType?.viewMode && showAddEditForm && <AddEditForm {...formProps} />}
                                    {!contactData?.length && !isAdding ? <NoDataFound information={formActionType?.viewMode ? translateContent('global.generalMessage.noRecordsFoundAddNew') : addDataTitle} /> : <ViewContactList {...formProps} />}
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

export const IndividualContact = connect(mapStateToProps, mapDispatchToProps)(withSpinner(ContactMain));
