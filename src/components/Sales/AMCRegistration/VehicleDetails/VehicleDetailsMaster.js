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

import { vehicleDetailDataActions } from 'store/actions/data/vehicle/vehicleDetail';

import { showGlobalNotification } from 'store/actions/notification';

import AddEditForm from './AddEditForm';
import ViewVehicleList from './ViewVehicleList';

import { CardSkeleton } from 'components/common/Skeleton';
import { LANGUAGE_EN } from 'language/en';
import { NoDataFound } from 'utils/noDataFound';

import { AMC_CONSTANTS } from '../utils/AMCConstants';
import { formattedCalendarDate } from 'utils/formatDateTime';
import { translateContent } from 'utils/translateContent';
import styles from 'assets/sass/app.module.scss';

const { Text } = Typography;

const mapStateToProps = (state) => {
    const {
        auth: { userId },

        data: {
            Vehicle: {
                VehicleDetail: { isLoaded = false, isLoading, data: vehicleData = [] },
            },
        },
    } = state;

    let returnValue = {
        userId,
        isLoading,
        vehicleData,
        isLoaded,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchVehicleData: vehicleDetailDataActions.fetchList,
            listVehicleShowLoading: vehicleDetailDataActions.listShowLoading,

            showGlobalNotification,
        },
        dispatch
    ),
});

const VehicleDetailsMasterBase = (props) => {
    const { form, section, userId, showGlobalNotification, typeData } = props;
    const { isLoaded, isLoading, setLastSection, AMConFinish, setRequestPayload, fetchVehicleData, listVehicleShowLoading, requestPayload, buttonData, setButtonData, formActionType, FormActionButton, vehicleData } = props;
    const [contactform] = Form.useForm();
    const [contactData, setContactData] = useState([]);
    const [showAddEditForm, setShowAddEditForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingData, setEditingData] = useState({});
    const [isAdding, setIsAdding] = useState(false);
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [vehicleSearchVisible, setVehicleSearchVisible] = useState(false);

    const disabledProps = { disabled: isReadOnly };

    useEffect(() => {
        if (formActionType?.viewMode) {
            setContactData(requestPayload?.amcVehicleDetails);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [requestPayload, section]);

    useEffect(() => {
        if ((formActionType?.addMode || !isLoaded) && requestPayload?.amcRegistration?.priceType === AMC_CONSTANTS?.MNM_FOC?.key) {
            handleVinSearch();
            setIsReadOnly(true);
            setShowAddEditForm(true);
            setButtonData({ ...buttonData, formBtnActive: true });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [section]);

    useEffect(() => {
        if (formActionType?.addMode) {
            setLastSection(true);

            setButtonData({ ...buttonData, formBtnActive: true });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [section, formActionType]);

    const noDataTitle = LANGUAGE_EN.GENERAL.NO_DATA_EXIST.TITLE;
    const addDataTitle = (
        <p className={styles.textCenter}>
            {translateContent('amcRegistration.label.addNewVehicleMsg')} <br /> <strong>“{translateContent('global.drawerTitle.add')}”</strong> {translateContent('amcRegistration.label.buttonAtTop')}
        </p>
    );

    useEffect(() => {
        if (!formActionType?.viewMode && requestPayload?.amcVehicleDetails?.length > 0 && !(requestPayload?.amcRegistration?.priceType === AMC_CONSTANTS?.MNM_FOC?.key)) {
            setContactData([...requestPayload?.amcVehicleDetails]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [section, requestPayload?.amcVehicleDetails, requestPayload?.amcVehicleDetails?.length, formActionType]);

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
        contactform.resetFields(['vehicleRegistrationNumber', 'orignallyWarrantyStartDate', 'modelGroup', 'modelFamily', 'modelDescription']);
    };
    const checkDuplicate = (vehicleRegistrationNumber) => contactData.find((value) => value?.vehicleRegistrationNumber === vehicleRegistrationNumber);

    const onSaveFormData = () => {
        contactform
            .validateFields()
            .then((value) => {
                if (checkDuplicate(value?.vehicleRegistrationNumber)) {
                    showGlobalNotification({ title: translateContent('global.notificationSuccess.error'), notificationType: 'error', message: translateContent('amcRegistration.validation.duplicateVehicle') });
                    return false;
                } else if (!value?.vehicleRegistrationNumber) {
                    showGlobalNotification({ title: translateContent('global.notificationSuccess.error'), notificationType: 'error', message: translateContent('amcRegistration.validation.vehicleRegistrationNoMandatory') });
                    return false;
                } else {
                    const newArr = [...contactData, value];
                    setRequestPayload({ ...requestPayload, amcVehicleDetails: newArr || { vin: requestPayload?.amcRegistration?.vin } });
                    setContactData(newArr);
                    setShowAddEditForm(false);
                    setIsEditing(false);
                    setEditingData({});
                    setIsAdding(false);
                    handleFormValueChange();
                    contactform.resetFields();
                }
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

    const handleVINChange = () => {
        contactform.resetFields(['vehicleRegistrationNumber', 'orignallyWarrantyStartDate', 'modelGroup', 'modelFamily', 'modelDescription']);
    };

    const fnSetData = (data) => {
        contactform.setFieldsValue({ ...data, vin: data?.vehicleIdentificationNumber, modelDescription: data?.modelDescription, vehicleRegistrationNumber: data?.registrationNumber, orignallyWarrantyStartDate: formattedCalendarDate(data?.orignallyWarrantyStartDate) });
    };

    const handleVinSearch = (value) => {
        if (!value && formActionType?.addMode && requestPayload?.amcRegistration?.priceType === AMC_CONSTANTS?.PAID?.key) {
            return false;
        }
        const onVehicleSearchSuccessAction = (data) => {
            if (data?.data?.vehicleSearch?.length === 1) {
                fnSetData(data?.data?.vehicleSearch[0]);
                if (requestPayload?.amcRegistration?.priceType === AMC_CONSTANTS?.MNM_FOC?.key) {
                    setRequestPayload({ ...requestPayload, amcVehicleDetails: [{ vin: requestPayload?.amcRegistration?.vin }] });
                }
            } else if (data?.data?.vehicleSearch?.length > 1) {
                setVehicleSearchVisible(true);
            }
        };
        const vehicleExtraParams = [
            {
                key: 'searchType',
                value: 'vehicleIdentificationNumber',
            },
            {
                key: 'searchParam',
                value: value || requestPayload?.amcRegistration?.vin,
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
                value: 'D',
            },
        ];

        fetchVehicleData({ setIsLoading: listVehicleShowLoading, userId, extraParams: vehicleExtraParams, onSuccessAction: onVehicleSearchSuccessAction, onErrorAction });
    };

    const formProps = {
        requestPayload,
        setRequestPayload,
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
        setButtonData,
        buttonData,
        handleFormValueChange,
        isAdding,
        setIsAdding,
        handleVinSearch,
        disabledProps,
        handleVINChange,
        vehicleSearchVisible,
        setVehicleSearchVisible,
        vehicleSelectedData: vehicleData?.vehicleSearch,
        fnSetData,
     
    };

    const onFinish = () => {
        if (requestPayload?.amcVehicleDetails?.length > 0) {
            requestPayload?.amcVehicleDetails?.length > 0 && AMConFinish(requestPayload);
        } else {
            showGlobalNotification({ message: translateContent('amcRegistration.validation.atLeastOneVehicle') });
        }
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
                        <Card>
                            {isLoading ? (
                                formSkeleton
                            ) : (
                                <>
                                    <Row type="flex" align="middle">
                                        <Text strong> {translateContent('amcRegistration.label.vehicleDetails')}</Text>
                                        {!formActionType?.viewMode && !(formActionType?.addMode && requestPayload?.amcRegistration?.priceType === AMC_CONSTANTS?.MNM_FOC?.key) && !(requestPayload?.amcSchemeDetails?.amcType === AMC_CONSTANTS?.AMC_TYPE_COMPREHENSIVE?.key && contactData?.length) && (
                                            <Button onClick={addBtnContactHandeler} icon={<PlusOutlined />} type="primary" disabled={isEditing || isAdding}>
                                                {translateContent('global.drawerTitle.add')}
                                            </Button>
                                        )}
                                    </Row>
                                    {!(formActionType?.addMode && requestPayload?.amcRegistration?.priceType === AMC_CONSTANTS?.MNM_FOC?.key) && <Divider className={styles.marT20} />}
                                    {!formActionType?.viewMode && showAddEditForm && <AddEditForm {...formProps} />}
                                    {!contactData?.length && !isAdding && !(formActionType?.addMode && requestPayload?.amcRegistration?.priceType === AMC_CONSTANTS?.MNM_FOC?.key) ? <NoDataFound informtion={formActionType?.viewMode ? noDataTitle : addDataTitle} /> : <ViewVehicleList {...formProps} />}
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
