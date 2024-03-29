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

import { viewVehicleDetailDataActions } from 'store/actions/data/vehicle/viewVehicleDetails';

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
import { otfLoyaltyModelGroupDataActions } from 'store/actions/data/otf/loyaltyModelGroup';
import { productHierarchyDataActions } from 'store/actions/data/productHierarchy';
import { otfModelFamilyDetailDataActions } from 'store/actions/data/otf/modelFamily';
import { AMC_REGISTRATION_SECTION } from 'constants/AMCRegistrationSection';
import { getCodeValue } from 'utils/getCodeValue';

const { Text } = Typography;

const mapStateToProps = (state) => {
    const {
        auth: { userId },

        data: {
            Vehicle: {
                ViewVehicleDetail: { isLoaded = false, isLoading, data: vehicleData = [] },
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
            fetchVehicleData: viewVehicleDetailDataActions.fetchList,
            listVehicleShowLoading: viewVehicleDetailDataActions.listShowLoading,

            resetFamily: otfModelFamilyDetailDataActions.reset,
            resetProductData: productHierarchyDataActions.resetData,
            resetModel: otfLoyaltyModelGroupDataActions.reset,

            showGlobalNotification,
        },
        dispatch
    ),
});

const VehicleDetailsMasterBase = (props) => {
    const { form, section, userId, showGlobalNotification, typeData, handleModelData } = props;
    const { isLoaded, isLoading, setLastSection, AMConFinish, setRequestPayload, fetchVehicleData, listVehicleShowLoading, requestPayload, buttonData, setButtonData, formActionType, FormActionButton, vehicleData, modelGroupData, modelFamilyData, productAttributeData } = props;
    const { resetFamily, resetProductData, resetModel, isLoyaltyLoading, isModelLoading, isProductLoading } = props;
    const [contactform] = Form.useForm();
    const [contactData, setContactData] = useState([]);
    const [showAddEditForm, setShowAddEditForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingData, setEditingData] = useState({});
    const [isAdding, setIsAdding] = useState(false);
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [vehicleSearchVisible, setVehicleSearchVisible] = useState(false);
    const disabledProps = { disabled: isReadOnly };
    const resetVehicleData = () => {
        resetFamily();
        resetProductData();
        resetModel();
    };
    useEffect(() => {
        if (formActionType?.viewMode) {
            setContactData(requestPayload?.amcVehicleDetails);
            handleModelData({});
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [requestPayload, section]);

    useEffect(() => {
        if ((formActionType?.addMode || !isLoaded) && !formActionType?.viewMode && requestPayload?.amcRegistration?.priceType === AMC_CONSTANTS?.MNM_FOC?.key && section?.id === AMC_REGISTRATION_SECTION.VEHICLE_DETAILS.id) {
            handleVinSearch();
            setIsReadOnly(true);
            setShowAddEditForm(true);
            setButtonData({ ...buttonData, formBtnActive: true });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [section]);

    useEffect(() => {
        if (modelGroupData?.length > 0 || modelFamilyData?.length > 0 || productAttributeData?.length > 0) {
            contactform.setFieldsValue({
                modelGroupDesc: getCodeValue(modelGroupData, contactform.getFieldValue('modelGroup'), 'modelGroupDescription', true, 'modelGroupCode'),
                modelFamilyDesc: getCodeValue(modelFamilyData, contactform.getFieldValue('modelFamily'), 'familyDescription', true, 'familyCode'),
                productDescription: getCodeValue(productAttributeData, contactform.getFieldValue('modelDescription'), 'prodctShrtName', true, 'prodctCode'),
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modelGroupData, modelFamilyData, productAttributeData]);

    useEffect(() => {
        return () => {
            resetVehicleData();
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
        contactform.resetFields(['vehicleRegistrationNumber', 'orignallyWarrantyStartDate', 'modelGroup', 'modelFamily', 'modelDescription', 'modelGroupDesc', 'modelFamilyDesc', 'productDescription']);
    };
    const checkDuplicate = (vin) => contactData.find((value) => value?.vin === vin);

    const onSaveFormData = () => {
        contactform
            .validateFields()
            .then((value) => {
                if (checkDuplicate(value?.vin)) {
                    showGlobalNotification({ title: translateContent('global.notificationSuccess.error'), notificationType: 'error', message: translateContent('amcRegistration.validation.duplicateVehicle') });
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
                resetVehicleData();
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
        resetVehicleData();
        contactform.resetFields(['vehicleRegistrationNumber', 'orignallyWarrantyStartDate', 'modelGroupDesc', 'modelFamilyDesc', 'productDescription']);
    };

    const fnSetData = (data) => {
        handleModelData({ ...data });
        contactform.setFieldsValue({ ...data, modelDescription: data?.modelCode, vehicleRegistrationNumber: data?.registrationNumber, orignallyWarrantyStartDate: formattedCalendarDate(data?.orignallyWarrantyStartDate) });
    };

    const handleVinSearch = (value) => {
        if (!value && formActionType?.addMode && requestPayload?.amcRegistration?.priceType === AMC_CONSTANTS?.PAID?.key) {
            return false;
        } else if (checkDuplicate(value)) {
            showGlobalNotification({ title: translateContent('global.notificationSuccess.error'), notificationType: 'error', message: translateContent('amcRegistration.validation.duplicateVehicle') });
            return false;
        }
        const onVehicleSearchSuccessAction = (data) => {
            fnSetData(data?.data?.vehicleDetails);

            if (requestPayload?.amcRegistration?.priceType === AMC_CONSTANTS?.MNM_FOC?.key) {
                setRequestPayload({ ...requestPayload, amcVehicleDetails: [{ ...data?.data?.vehicleDetails, vin: requestPayload?.amcRegistration?.vin, modelDescription: data?.data?.vehicleDetails?.modelCode, vehicleRegistrationNumber: data?.data?.vehicleDetails?.registrationNumber }] });
            }
        };
        const vehicleExtraParams = [
            {
                key: 'vin',
                title: 'vin',
                value: value || requestPayload?.amcRegistration?.vin,
                name: 'VIN',
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
        modelGroupData,
        modelFamilyData,
        productAttributeData,
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
                            {isLoading || isLoyaltyLoading || isModelLoading || isProductLoading ? (
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
                                    {!contactData?.length && !isAdding && !(formActionType?.addMode && requestPayload?.amcRegistration?.priceType === AMC_CONSTANTS?.MNM_FOC?.key) ? <NoDataFound information={formActionType?.viewMode ? noDataTitle : addDataTitle} /> : <ViewVehicleList {...formProps} />}
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
