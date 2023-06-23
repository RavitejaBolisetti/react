/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useReducer, useEffect } from 'react';
import { Row, Col, Collapse, Form, Space, Typography, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { PARAM_MASTER } from 'constants/paramMaster';

import { configParamEditActions } from 'store/actions/data/configurableParamterEditing';
import { customerDetailDataActions } from 'store/actions/customer/customerContacts';
import { customerDetailIndividualDataActions } from 'store/actions/customer/customerContactsIndividual';
import { showGlobalNotification } from 'store/actions/notification';

import AddEditForm from './AddEditForm';
import ViewContactList from './ViewContactList';
import { CustomerFormButton } from '../../CustomerFormButton';
import { InputSkeleton } from 'components/common/Skeleton';

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
            ConfigurableParameterEditing: { isLoaded: isConfigDataLoaded = false, isLoading: isConfigLoading, filteredListData: typeData = [] },
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
    const { form, onFinish, section, userId, customerType, fetchConfigList, resetData, listConfigShowLoading, fetchContactDetailsList, customerData, listContactDetailsShowLoading, isCustomerDataLoaded, saveData, showGlobalNotification, typeData, isConfigDataLoaded, isConfigLoading } = props;
    const { isCustomerDataLoading, selectedCustomer, fetchContactIndividualDetailsList, saveIndividualData } = props;
    const { buttonData, setButtonData, formActionType } = props;

    const [contactform] = Form.useForm();
    const [contactData, setContactData] = useState([]);
    const [openAccordian, setOpenAccordian] = useState('1');
    const [showAddEditForm, setShowAddEditForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingData, setEditingData] = useState({});
    const [uploadImgDocId, setUploadImgDocId] = useState('');
    const [, forceUpdate] = useReducer((x) => x + 1, 0);

    const extraParams = [
        {
            key: 'customerId',
            title: 'customerId',
            // value: 'CUS1686833188888',
            value: selectedCustomer?.customerId,
            name: 'customerId',
        },
    ];

    useEffect(() => {
        if (userId && selectedCustomer?.customerId && !isCustomerDataLoaded && !isConfigLoading) {
            if (customerType === 'IND') {
                fetchContactIndividualDetailsList({ setIsLoading: listContactDetailsShowLoading, extraParams, onSuccessAction, onErrorAction });
            } else {
                fetchContactDetailsList({ setIsLoading: listContactDetailsShowLoading, extraParams, onSuccessAction, onErrorAction });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedCustomer?.customerId]);

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

    const onSaveFormData = () => {
        contactform
            .validateFields()
            .then((value) => {
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
                contactform.resetFieldsValue();
            })
            .catch((err) => console.error(err));
    };

    const onCheckdefaultAddClick = (e, value) => {
        e.stopPropagation();
        setContactData((prev) => {
            let updetedData = prev?.map((contact) => ({ ...contact, defaultContactIndicator: false }));
            const index = updetedData?.findIndex((el) => el?.purposeOfContact === value?.purposeOfContact && el?.mobileNumber === value?.mobileNumber && el?.FirstName === value?.FirstName);
            updetedData.splice(index, 1, { ...value, defaultContactIndicator: e.target.checked });
            return [...updetedData];
        });
        forceUpdate();
    };

    const addBtnContactHandeler = (e) => {
        e.stopPropagation();
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
        form: contactform,
        isEditing,
        setIsEditing,
        formActionType,
        setEditingData,
        typeData,
        onCheckdefaultAddClick,
        setButtonData,
        setUploadImgDocId,
    };

    const onSubmit = () => {
        let data = { customerId: selectedCustomer?.customerId, customerContact: { ...contactData, docId: uploadImgDocId } };

        const onSuccess = (res) => {
            contactform.resetFields();
            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            fetchContactDetailsList({ setIsLoading: listContactDetailsShowLoading, extraParams, onSuccessAction, onErrorAction });
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

        if (customerType === 'IND') {
            saveIndividualData(requestData);
        } else {
            saveData(requestData);
        }

        setShowAddEditForm(false);
        setIsEditing(false);
        setEditingData({});
        contactform.resetFields();
    };

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };
    const onFinishFailed = (err) => {
        console.error(err);
    };

    const formSkeleton = (
        <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <InputSkeleton height={'100vh'} />
            </Col>
        </Row>
    );

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
                                        <Text strong> {customerType === 'IND' ? 'Individual Contact' : 'Company Contact'}</Text>
                                        {!formActionType?.viewMode && (
                                            <Button onClick={addBtnContactHandeler} icon={<PlusOutlined />} type="primary">
                                                Add Contact
                                            </Button>
                                        )}
                                    </Space>
                                }
                                showArrow={false}
                                key="1"
                            >
                                {!formActionType?.viewMode && showAddEditForm && <AddEditForm {...formProps} />}
                                {isCustomerDataLoading ? formSkeleton : <ViewContactList {...formProps} />}
                                {/* { !formActionType?.viewMode && (showAddEditForm || !contactData?.length > 0) && <AddEditForm {...formProps} />} */}
                                {/* {isCustomerDataLoading ? formSkeleton : formContainer} */}
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
