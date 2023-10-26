/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Typography, Button, Card, Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { vehicleContactDataActions } from 'store/actions/data/vehicle/contacts';
import { showGlobalNotification } from 'store/actions/notification';

import { VehicleDetailFormButton } from '../VehicleDetailFormButton';
import AddEditForm from './AddEditForm';
import ViewList from './ViewList';

import { CardSkeleton } from 'components/common/Skeleton';
import { VEHICLE_DETAIL_SECTION } from 'constants/VehicleDetailSection';
import { LANGUAGE_EN } from 'language/en';
import { NoDataFound } from 'utils/noDataFound';

import styles from 'assets/sass/app.module.scss';

const { Text } = Typography;

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            Vehicle: {
                Contacts: { isLoaded: isContactDataLoaded = false, isLoading: isContactDataLoading, data: vehicleContactData = [] },
            },
        },
    } = state;

    let returnValue = {
        userId,
        typeData: typeData,

        isContactDataLoaded,
        isContactDataLoading,
        vehicleContactData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: vehicleContactDataActions.fetchList,
            listShowLoading: vehicleContactDataActions.listShowLoading,
            saveData: vehicleContactDataActions.saveData,
            resetData: vehicleContactDataActions.reset,

            showGlobalNotification,
        },
        dispatch
    ),
});

const ContactMasterMain = (props) => {
    const { form, section, userId, searchType, vehicleContactData, resetData, listShowLoading, showGlobalNotification, typeData } = props;
    const { isContactDataLoading, selectedRecordId, fetchList, saveData } = props;
    const { buttonData, setButtonData, formActionType, handleButtonClick, NEXT_ACTION } = props;

    const [contactform] = Form.useForm();
    const [contactData, setContactData] = useState([]);
    const [showAddEditForm, setShowAddEditForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingData, setEditingData] = useState({});
    const [isAdding, setIsAdding] = useState(false);

    const noDataTitle = LANGUAGE_EN.GENERAL.NO_DATA_EXIST.TITLE;

    const extraParams = [
        {
            key: 'vin',
            title: 'vin',
            value: selectedRecordId,
            name: 'vin',
        },
    ];

    useEffect(() => {
        return () => {
            resetData();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (selectedRecordId && userId) {
            fetchList({ setIsLoading: listShowLoading, extraParams });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedRecordId]);

    useEffect(() => {
        if (selectedRecordId && vehicleContactData?.contact) {
            setContactData(vehicleContactData?.contact || []);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vehicleContactData]);

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
                let preferredContactTimeFrom = value?.preferredContactTime?.[0]?.format('HH:mm');
                let preferredContactTimeTo = value?.preferredContactTime?.[1]?.format('HH:mm');

                if (isEditing) {
                    setContactData((prev) => {
                        let formData = prev?.length ? [...prev] : [];
                        const index = formData?.findIndex((el) => el?.purposeOfContact === editingData?.purposeOfContact && el?.mobileNumber === editingData?.mobileNumber && el?.FirstName === editingData?.FirstName);
                        formData.splice(index, 1, { ...value, preferredContactTimeFrom, preferredContactTimeTo });
                        return [...formData];
                    });
                } else {
                    setContactData((prev) => {
                        const updVal = prev?.length ? [{ ...value, preferredContactTimeFrom, preferredContactTimeTo }, ...prev] : [{ ...value, preferredContactTimeFrom, preferredContactTimeTo }];
                        return updVal;
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
        isEditing,
        setIsEditing,
        formActionType,
        setEditingData,
        typeData,
        setButtonData,
        handleFormValueChange,
        searchType,
        isAdding,
        setIsAdding,
        buttonData,
    };

    const onFinish = () => {
        let data = {
            vehicleIdentificationNumber: selectedRecordId,
            contact: contactData?.map(({ preferredContactTime, ...rest }) => rest),
        };
        const onSuccess = (res) => {
            contactform.resetFields();
            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            setButtonData({ ...buttonData, formBtnActive: false });
            handleButtonClick({ record: res?.data, buttonAction: NEXT_ACTION });
            if (searchType === VEHICLE_DETAIL_SECTION) {
                fetchList({ setIsLoading: listShowLoading, extraParams, onSuccessAction, onErrorAction });
            }
        };

        const onError = (message) => {
            showGlobalNotification({ message });
        };

        const requestData = {
            data: data,
            method: vehicleContactData?.contact ? 'put' : 'post',
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
        };

        saveData(requestData);

        setShowAddEditForm(false);
        setIsEditing(false);
        setIsAdding(false);
        setEditingData({});
        contactform.resetFields();
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
                        <h2>{section?.title} </h2>
                        <Card className="">
                            {isContactDataLoading ? (
                                formSkeleton
                            ) : (
                                <>
                                    <Row type="flex" align="middle">
                                        <Text strong> Contacts</Text>
                                        {!formActionType?.viewMode && (
                                            <Button onClick={addBtnContactHandeler} icon={<PlusOutlined />} type="primary" disabled={isEditing || isAdding}>
                                                Add
                                            </Button>
                                        )}
                                    </Row>
                                    <Divider className={styles.marT20} />
                                    <div className={styles.headerBox}>
                                        {!formActionType?.viewMode && showAddEditForm && <AddEditForm {...formProps} />}
                                        {!contactData?.length && !isAdding ? <NoDataFound informtion={noDataTitle} /> : <ViewList {...formProps} />}
                                    </div>
                                </>
                            )}
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <VehicleDetailFormButton {...props} />
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export const ContactMaster = connect(mapStateToProps, mapDispatchToProps)(ContactMasterMain);
