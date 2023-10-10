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
import { vehicleDetailDataActions } from 'store/actions/data/vehicle/vehicleDetail';

import { showGlobalNotification } from 'store/actions/notification';

import AddEditForm from './AddEditForm';
import ViewVehicleList from './ViewVehicleList';

import { CardSkeleton } from 'components/common/Skeleton';
import { CUSTOMER_TYPE } from 'constants/CustomerType';
import { LANGUAGE_EN } from 'language/en';
import { NoDataFound } from 'utils/noDataFound';

import styles from 'assets/sass/app.module.scss';

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
            Vehicle: {
                VehicleDetail: { vehicleData },
            },
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
        vehicleData,
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

            fetchVehicleData: vehicleDetailDataActions.fetchList,
            listVehicleShowLoading: vehicleDetailDataActions.listShowLoading,

            showGlobalNotification,
        },
        dispatch
    ),
});

const VehicleDetailsMasterBase = (props) => {
    const { form, section, userId, customerType, resetData, fetchContactDetailsList, customerData, customerIndData, listContactDetailsShowLoading, saveData, showGlobalNotification, typeData } = props;
    const { isCustomerIndDataLoading, isCustomerDataLoading, selectedCustomer, fetchContactIndividualDetailsList, saveIndividualData, resetIndividualData } = props;
    const { selectedAMC, setLastSection, AMConFinish, setRequestPayload, fetchVehicleData, listVehicleShowLoading, vehicleData, requestPayload, buttonData, setButtonData, formActionType, handleButtonClick, NEXT_ACTION, FormActionButton } = props;

    const [contactform] = Form.useForm();
    const [contactData, setContactData] = useState([]);
    const [showAddEditForm, setShowAddEditForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingData, setEditingData] = useState({});
    const [continueWithOldMobNo, setContinueWithOldMobNo] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    console.log('requestPayloadrequestPayloadrequestPayload', requestPayload);
    useEffect(() => {
        if (formActionType?.viewMode) {
            setContactData(requestPayload?.amcVehicleDetails);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [requestPayload]);

    useEffect(() => {
        if (formActionType?.addMode) {
            console.log('formActionType?.addMode', formActionType?.addMode);
            setLastSection(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [section, formActionType]);

    const noDataTitle = LANGUAGE_EN.GENERAL.NO_DATA_EXIST.TITLE;
    const addDataTitle = (
        <p className={styles.textCenter}>
            Please add new contact using <br /> <strong>“Add”</strong> button at top
        </p>
    );

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
            resetData();
            resetIndividualData();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!formActionType?.viewMode) {
            setRequestPayload({ ...requestPayload, amcVehicleDetails: contactData });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contactData]);

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
                // if (isEditing) {
                //     setContactData((prev) => {
                //         let formData = prev?.length ? [...prev] : [];
                //         const index = formData?.findIndex((el) => el?.purposeOfContact === editingData?.purposeOfContact && el?.mobileNumber === editingData?.mobileNumber && el?.FirstName === editingData?.FirstName);
                //         formData.splice(index, 1, { relationCode: '', ...value });
                //         return [...formData];
                //     });
                // } else {
                //     setContactData((prev) => {
                //         let formData = prev?.length ? [...prev] : [];
                //         if (value?.defaultaddress && formData?.length >= 1) {
                //             return [...formData, { relationCode: '', ...value }];
                //         } else {
                //             const updVal = prev?.length ? [...prev, { relationCode: '', ...value }] : [{ relationCode: '', ...value }];
                //             return updVal;
                //         }
                //     });
                // }

                setContactData((prev) => {
                    if (prev) {
                        return [...prev, value];
                    } else {
                        return [{ value }];
                    }
                    console.log('prev', prev);
                    // return false;
                });
                console.log('constatvt data', contactData);
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

    const handleVinSearch = (value) => {
        console.log('value', value);

        const onVehicleSearchSuccessAction = (data) => {
            console.log('data', data?.data?.vehicleSearch[0]);
            contactform.setFieldsValue({ ...data?.data?.vehicleSearch[0], modelDescription: data?.data?.vehicleSearch[0].chassisNumber });
        };
        const vehicleExtraParams = [
            {
                key: 'searchType',
                value: 'vehicleIdentificationNumber',
            },
            {
                key: 'searchParam',
                value: value,
            },
            {
                key: 'pageSize',
                value: '10',
            },
            {
                key: 'pageNumber',
                value: '1',
            },
            {
                key: 'status',
                value: 'C',
            },
        ];

        fetchVehicleData({ setIsLoading: listVehicleShowLoading, userId, extraParams: vehicleExtraParams, onSuccessAction: onVehicleSearchSuccessAction, onErrorAction });
    };

    const formProps = {
        requestPayload,
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
        setContinueWithOldMobNo,

        customerType,
        isAdding,
        setIsAdding,
        buttonData,
        handleVinSearch,
    };

    const onFinish = () => {
        AMConFinish(requestPayload);
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
                                        <Text strong> {'Vehicle Details'}</Text>
                                        {!formActionType?.viewMode && (
                                            <Button onClick={addBtnContactHandeler} icon={<PlusOutlined />} type="primary" disabled={isEditing || isAdding}>
                                                Add
                                            </Button>
                                        )}
                                    </Row>
                                    <Divider className={styles.marT20} />
                                    {!formActionType?.viewMode && showAddEditForm && <AddEditForm {...formProps} />}
                                    {!contactData?.length ? <NoDataFound informtion={formActionType?.viewMode ? noDataTitle : addDataTitle} /> : <ViewVehicleList {...formProps} />}
                                </>
                            )}
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <FormActionButton {...props} />
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export const VehicleDetailsMaster = connect(mapStateToProps, mapDispatchToProps)(VehicleDetailsMasterBase);
export default VehicleDetailsMaster;
